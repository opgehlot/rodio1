
import { useRef, useState } from "react";
import { Upload, FileText, Loader2, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";
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
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* Enterprise Header Banner */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-12 py-6 mb-8">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 mb-1">
              <span className="w-2 h-2 rounded-full bg-orange-600 inline-block"></span>
              Rodio Tradelink Logistics Enterprise
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Compliance & Document Vault
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Securely upload, verify, and manage your statutory business and carrier credentials.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 flex items-center gap-2">
              <ShieldCheck className="text-orange-600 w-4 h-4" />
              <span>Encryption: <strong className="text-slate-900">TLS 256-bit Active</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Fluid Container (Fully spanning layout with grid integration) */}
      <div className="w-full px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Section (Spans 8 columns on large screens) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
            
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-sm">
                  <Upload size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Secure Credential Submission
                  </h3>
                  <p className="text-xs text-slate-500">
                    Select your credential classification and attach official files.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-orange-600 font-semibold bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                <CheckCircle2 size={14} /> Verified Gateway
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* DOCUMENT TYPE */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Document Classification <span className="text-rose-500">*</span>
                </label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all cursor-pointer"
                  required
                >
                  <option value="">Select Document Classification</option>
                  <option value="aadhaar">Government Issued ID (Verification / Identification)</option>
                  <option value="pan">PAN Card</option>
                  <option value="gst">GST Certificate</option>
                  <option value="gumasta">Gumasta License</option>
                  <option value="rc">Vehicle Registration Certificate (RC)</option>
                  <option value="insurance">Commercial Insurance Policy</option>
                  <option value="permit">Transport Permit</option>
                  <option value="other">Other Corporate Document</option>
                </select>
              </div>

              {/* FILE DROPZONE */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Document File Attachment <span className="text-rose-500">*</span>
                </label>
                <label className="min-h-[180px] border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-orange-600 hover:bg-orange-50/20 transition p-6 bg-slate-50/50 group">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <FileText size={28} />
                  </div>

                  {file ? (
                    <div className="text-center">
                      <p className="font-bold text-sm text-slate-900">
                        {file.name}
                      </p>
                      <p className="text-xs text-orange-600 font-semibold mt-1">
                        Click or drag to replace attached file
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="font-bold text-sm text-slate-800">
                        Click to browse file or drag & drop here
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Supports official PDF, JPEG, or PNG formats (Max size: 10MB)
                      </p>
                    </div>
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

              {/* ACTION FOOTER */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  {loading ? "Encrypting & Uploading..." : "Securely Upload Document"}
                </button>
              </div>

            </form>

          </div>

          {/* Right Information Column (Spans 4 columns for dashboard symmetry) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <AlertCircle className="text-orange-600" size={18} />
                Compliance Verification Rules
              </h4>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                  Ensure uploaded documents are fully legible, uncropped, and reflect current legal validity.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                  Files undergo automated verification followed by manual administrative audit within 24 business hours.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                  Confidential information is strictly safeguarded under enterprise compliance standards.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white p-6 shadow-sm">
              <h4 className="font-bold text-base mb-1">Need Upload Support?</h4>
              <p className="text-slate-300 text-xs mb-4">
                Facing issues with file formatting or document validation? Contact our verification helpdesk.
              </p>
              <div className="text-xs font-mono bg-white/10 px-3 py-2 rounded-xl inline-block border border-white/10">
                Compliance Desk: support@rodiotradelink.com
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default UploadDocuments;