import { useRef, useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../api/api";

export function UploadDocuments() {
  const fileRef = useRef(null);

  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documentType) {
      toast.error("Please select document type");
      return;
    }

    if (!file) {
      toast.error("Please select document");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("documentType", documentType);
      formData.append("document", file);

      // Explicitly passing headers for multipart/form-data to prevent 400 Bad Request errors
      const { data } = await API.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(data.message || "Document uploaded successfully");

      setDocumentType("");
      setFile(null);

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      toast.error(
        error.response?.data?.message || "Document upload failed (400 Bad Request)"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 p-8"
      >
        {/* HEADER */}
        <div className="border-b border-gray-200 pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 text-white p-2">
              <Upload size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Upload Documents
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                Upload your business verification documents securely.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* DOCUMENT TYPE */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Document Type *
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full h-11 border border-gray-300 px-3 outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 bg-white text-sm"
              required
            >
              <option value="">Select Document Type</option>
              <option value="aadhaar">Aadhaar Card</option>
              <option value="pan">PAN Card</option>
              <option value="gst">GST Certificate</option>
              <option value="gumasta">Gumasta</option>
              <option value="rc">Vehicle RC</option>
              <option value="insurance">Insurance</option>
              <option value="permit">Permit</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* FILE */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
              Document File *
            </label>
            <label className="min-h-[160px] border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-orange-600 transition p-6 bg-gray-50/50">
              <FileText size={36} className="text-orange-600" />

              {file ? (
                <>
                  <p className="font-semibold text-sm text-gray-800 mt-3">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Click to change file
                  </p>
                </>
              ) : (
                <>
                  <p className="font-semibold text-sm text-gray-800 mt-3">
                    Click to browse file
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports PDF, JPG, or PNG formats
                  </p>
                </>
              )}

              <input
                ref={fileRef}
                type="file"
                accept=".pdf,image/jpeg,image/png,image/jpg"
                hidden
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                }}
              />
            </label>
          </div>

          {/* BUTTON */}
          <div className="pt-4 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-6 py-2.5 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Uploading..." : "Upload Document"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UploadDocuments;