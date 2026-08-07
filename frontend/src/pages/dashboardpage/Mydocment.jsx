
import React, { useState, useEffect } from "react";
import { FileText, Trash2, RefreshCw, Loader2, FileCheck, ExternalLink, ShieldCheck, AlertCircle, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/api";

export function MyDocuments() {
  const navigate = useNavigate();
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
              Corporate Compliance Vault
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Review, verify, and manage all your active business credentials and legal transport licenses.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDocuments}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border border-slate-200 cursor-pointer"
            >
              <RefreshCw size={14} />
              Refresh Vault
            </button>
            <button
              onClick={() => navigate("/dashboard/upload-documents")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <PlusCircle size={14} />
              Upload New Document
            </button>
          </div>
        </div>
      </div>

      {/* Main Fluid Container (Fully spanning layout with grid integration) */}
      <div className="w-full px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Documents List Section (Spans 8 columns on large screens) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
            
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-sm">
                  <FileCheck size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Registered Credentials ({documents.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Active verification status across your logistics vendor portfolio
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-orange-600 font-semibold bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                <ShieldCheck size={14} /> Secure Vault
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col justify-center items-center py-20 text-slate-500 gap-3 text-sm">
                <Loader2 size={24} className="animate-spin text-orange-600" />
                <span>Synchronizing vault records...</span>
              </div>
            ) : documents.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <FileText size={48} className="mx-auto text-slate-400 mb-3" />
                <p className="text-sm font-bold text-slate-800">No verification documents found</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  You haven't uploaded any business or transport documents yet. Click the button above to begin.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc, index) => {
                  const docId = doc._id || doc.id || index;
                  const fileLink = doc.documentUrl || doc.fileUrl || doc.url || doc.filePath;

                  return (
                    <div
                      key={docId}
                      className="border border-slate-200 rounded-2xl p-5 bg-slate-50/40 hover:bg-slate-50 transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                    >
                      {/* Document Info */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center shrink-0 mt-0.5">
                          <FileText size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide">
                            {doc.documentType || "Official Document"}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-slate-500">
                              Status: <strong className="text-emerald-600 font-semibold capitalize">{doc.verificationStatus || "Uploaded"}</strong>
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-1.5">
                            File:{" "}
                            {fileLink ? (
                              <a
                                href={fileLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1 transition-colors"
                              >
                                View Attachment <ExternalLink size={12} />
                              </a>
                            ) : (
                              <span className="text-rose-500 font-medium">URL not available</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Delete Action */}
                      <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                        <button
                          onClick={() => handleDelete(docId)}
                          disabled={actionLoading === docId}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 px-3.5 py-2 rounded-xl text-xs font-semibold border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                        >
                          {actionLoading === docId ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Right Information Column (Spans 4 columns for dashboard balance) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <AlertCircle className="text-orange-600" size={18} />
                Vault Security Policy
              </h4>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                  All submitted documents are encrypted at rest using high-grade enterprise protocols.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                  Expiring transport licenses or permits require re-submission prior to dispatch assignment.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                  For regulatory compliance inquiries, reach out to our legal verification desk.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white p-6 shadow-sm">
              <h4 className="font-bold text-base mb-1">Compliance Assistance</h4>
              <p className="text-slate-300 text-xs mb-4">
                Need help updating corporate credentials or managing carrier documentation?
              </p>
              <div className="text-xs font-mono bg-white/10 px-3 py-2 rounded-xl inline-block border border-white/10">
                Desk: compliance@rodiotradelink.com
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MyDocuments;