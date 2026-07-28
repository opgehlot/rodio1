import React, { useState, useEffect } from "react";
import { FileText, Trash2, RefreshCw, Loader2, FileCheck, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../api/api";

export function MyDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  // Fetch all uploaded documents
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/documents/my?t=${new Date().getTime()}`);
      
      const result = response.data;
      let docsArray = [];

      if (Array.isArray(result)) {
        docsArray = result;
      } else if (result && Array.isArray(result.data)) {
        docsArray = result.data;
      } else if (result && Array.isArray(result.documents)) {
        docsArray = result.documents;
      }

      setDocuments(docsArray);
    } catch (error) {
      console.error("FETCH ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Delete Document
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      setActionLoading(id);
      await API.delete(`/documents/${id}`);
      toast.success("Document deleted successfully");
      setDocuments(documents.filter((doc) => (doc._id || doc.id) !== id));
    } catch (error) {
      console.error("DELETE ERROR:", error);
      toast.error(error.response?.data?.message || "Failed to delete document");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white border border-gray-200 p-8">
        {/* HEADER */}
        <div className="border-b border-gray-200 pb-5 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Uploaded Documents</h1>
            <p className="text-sm text-gray-600 mt-0.5">
              View or delete your submitted business verification documents.
            </p>
          </div>
          <button
            onClick={fetchDocuments}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 text-xs font-medium border border-gray-300 flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-500 gap-2 text-sm">
            <Loader2 size={20} className="animate-spin text-orange-600" />
            Loading documents...
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-gray-300 bg-gray-50/50">
            <FileText size={40} className="mx-auto text-gray-400 mb-2" />
            <p className="text-sm font-semibold text-gray-800">No documents found</p>
            <p className="text-xs text-gray-500 mt-1">Please upload your documents first.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map((doc, index) => {
              const docId = doc._id || doc.id || index;
              // Using documentUrl based on your API response structure
              const fileLink = doc.documentUrl || doc.fileUrl || doc.url || doc.filePath;

              return (
                <div
                  key={docId}
                  className="border border-gray-300 p-4 bg-gray-50/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  {/* Document Info */}
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 text-orange-600 p-2.5 mt-0.5">
                      <FileCheck size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-gray-900 uppercase">
                        {doc.documentType || "Document"}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Status: <span className="text-green-600 font-medium capitalize">{doc.verificationStatus || "Uploaded"}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        File:{" "}
                        {fileLink ? (
                          <a
                            href={fileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                          >
                            View Document <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span className="text-red-500">URL not available</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Delete Action */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-gray-200">
                    <button
                      onClick={() => handleDelete(docId)}
                      disabled={actionLoading === docId}
                      className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-1.5 text-xs font-medium border border-red-200 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                    >
                      {actionLoading === docId ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyDocuments;