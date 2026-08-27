// import React, { useState, useEffect } from "react";
// import { FaTrash, FaExternalLinkAlt, FaShieldAlt, FaFilePdf, FaFileImage, FaPlus, FaTimes } from "react-icons/fa";
// import toast from "react-hot-toast";
// import API from "../../../api/api";

// const DOCUMENT_TYPES = [
//   { label: "Identity / ID Proof", value: "aadhaar" },
//   { label: "PAN Card", value: "pan" },
//   { label: "GST Certificate", value: "gst" },
//   { label: "Gumasta License", value: "gumasta" },
//   { label: "Vehicle RC", value: "rc" },
//   { label: "Insurance Policy", value: "insurance" },
//   { label: "Transport Permit", value: "permit" },
//   { label: "Other Document", value: "other" },
// ];

// const MAX_FILE_SIZE_MB = 10;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

// const MyDocumentss = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [showUploadForm, setShowUploadForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [docLoading, setDocLoading] = useState(false);

//   // Exact fields needed by backend controller
//   const [documentType, setDocumentType] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);

//   // Uploaded documents list
//   const [uploadedDocs, setUploadedDocs] = useState([]);

//   // Fetch Documents via API.get
//   const fetchDocuments = async () => {
//     try {
//       setDocLoading(true);
//       const res = await API.get("/documents/my");
//       if (res.data?.success) {
//         setUploadedDocs(res.data.data || []);
//       }
//     } catch (err) {
//       console.error("Fetch Documents Error:", err);
//       toast.error(err?.response?.data?.message || "Failed to load uploaded documents", {
//         id: "doc-fetch-error",
//       });
//     } finally {
//       setDocLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       fetchDocuments();
//     }
//   }, [isOpen]);

//   // File Validation (Strictly Image/PDF, No Video, Max 10MB)
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "application/pdf"];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error("Please upload only Image (JPG, PNG) or PDF files. Video files are not permitted.", {
//         id: "file-type-error",
//       });
//       e.target.value = null;
//       setSelectedFile(null);
//       return;
//     }

//     if (file.size > MAX_FILE_SIZE_BYTES) {
//       toast.error(`File size must be less than ${MAX_FILE_SIZE_MB}MB.`, {
//         id: "file-size-error",
//       });
//       e.target.value = null;
//       setSelectedFile(null);
//       return;
//     }

//     setSelectedFile(file);
//   };

//   // Upload Document via API.post
//   const handleUploadSubmit = async (e) => {
//     e.preventDefault();

//     if (!documentType) {
//       toast.error("Please select a document type.", {
//         id: "doc-type-missing",
//       });
//       return;
//     }

//     if (!selectedFile) {
//       toast.error("Please select a document file to upload.", {
//         id: "file-missing",
//       });
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("documentType", documentType);
//       formData.append("document", selectedFile);

//       const res = await API.post("/documents/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (res.data?.success) {
//         toast.success(res.data.message || "Document uploaded successfully.", {
//           id: "doc-upload-success",
//         });
//         setDocumentType("");
//         setSelectedFile(null);
//         setShowUploadForm(false);
//         fetchDocuments();
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to upload document.", {
//         id: "doc-upload-error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete Document via API.delete
//   const handleDeleteDoc = async (id) => {
//     if (!window.confirm("Are you sure you want to permanently delete this document?")) return;

//     try {
//       const res = await API.delete(`/documents/${id}`);
//       if (res.data?.success) {
//         toast.success(res.data.message || "Document deleted successfully.", {
//           id: "doc-delete-success",
//         });
//         setUploadedDocs((prev) => prev.filter((doc) => doc._id !== id));
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to delete document.", {
//         id: "doc-delete-error",
//       });
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: "#ffffff",
//         borderRadius: "12px",
//         boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
//         border: "1px solid #e2e8f0",
//         marginBottom: "20px",
//         overflow: "hidden",
//       }}
//     >
//       {/* ================= ACCORDION HEADER ================= */}
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: "16px 20px",
//           backgroundColor: "#f8fafc",
//           cursor: "pointer",
//           borderBottom: isOpen ? "1px solid #e2e8f0" : "none",
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//           <div
//             style={{
//               width: "40px",
//               height: "40px",
//               borderRadius: "10px",
//               backgroundColor: "#d97706",
//               color: "#ffffff",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: "bold",
//               fontSize: "15px",
//             }}
//           >
//             MD
//           </div>
//           <div>
//             <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>
//               My Documents
//             </h3>
//             <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
//               Official verification documents, scan copies & legal proofs
//             </p>
//           </div>
//         </div>

//         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//           <span
//             style={{
//               fontSize: "12px",
//               fontWeight: "600",
//               color: "#d97706",
//               backgroundColor: "#fef3c7",
//               padding: "4px 10px",
//               borderRadius: "20px",
//             }}
//           >
//             {uploadedDocs.length} Uploaded
//           </span>
//           <span style={{ fontSize: "14px", color: "#64748b" }}>{isOpen ? "▲" : "▼"}</span>
//         </div>
//       </div>

//       {/* ================= ACCORDION BODY ================= */}
//       {isOpen && (
//         <div style={{ padding: "24px" }}>
          
//           {/* Info Banner */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "flex-start",
//               gap: "12px",
//               backgroundColor: "#eff6ff",
//               border: "1px solid #bfdbfe",
//               borderRadius: "8px",
//               padding: "12px 16px",
//               marginBottom: "20px",
//             }}
//           >
//             <span style={{ fontSize: "18px" }}>🛡️</span>
//             <div>
//               <strong style={{ display: "block", fontSize: "13px", color: "#1e40af", marginBottom: "2px" }}>
//                 Authentic Document Verification
//               </strong>
//               <p style={{ margin: 0, fontSize: "12px", color: "#3b82f6", lineHeight: "1.4" }}>
//                 Please upload only official Image (JPG, PNG) or PDF documents (Max 10MB). Verified credentials grant verified enterprise status to your account.
//               </p>
//             </div>
//           </div>

//           {/* Action Toolbar */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: "16px",
//               flexWrap: "wrap",
//               gap: "10px",
//             }}
//           >
//             <div>
//               <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>
//                 Vault Records
//               </h4>
//               <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
//                 Active statutory document records
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => setShowUploadForm(!showUploadForm)}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "6px",
//                 backgroundColor: showUploadForm ? "#64748b" : "#d97706",
//                 color: "#ffffff",
//                 border: "none",
//                 borderRadius: "8px",
//                 padding: "8px 16px",
//                 fontSize: "13px",
//                 fontWeight: "600",
//                 cursor: "pointer",
//               }}
//             >
//               {showUploadForm ? <FaTimes /> : <FaPlus />}
//               {showUploadForm ? "Close Form" : "Upload Document"}
//             </button>
//           </div>

//           {/* ================= UPLOAD FORM ================= */}
//           {showUploadForm && (
//             <div
//               style={{
//                 backgroundColor: "#f8fafc",
//                 border: "1px solid #cbd5e1",
//                 borderRadius: "10px",
//                 padding: "16px",
//                 marginBottom: "24px",
//               }}
//             >
//               <h5 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>
//                 Upload Document File
//               </h5>

//               <form onSubmit={handleUploadSubmit}>
//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//                     gap: "14px",
//                     marginBottom: "16px",
//                   }}
//                 >
//                   {/* Document Type Dropdown */}
//                   <div>
//                     <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
//                       Document Classification *
//                     </label>
//                     <select
//                       value={documentType}
//                       onChange={(e) => setDocumentType(e.target.value)}
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "9px 10px",
//                         borderRadius: "6px",
//                         border: "1px solid #cbd5e1",
//                         fontSize: "13px",
//                         backgroundColor: "#fff",
//                         boxSizing: "border-box",
//                       }}
//                     >
//                       <option value="">Select Document Classification</option>
//                       {DOCUMENT_TYPES.map((doc) => (
//                         <option key={doc.value} value={doc.value}>
//                           {doc.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* File Upload Input */}
//                   <div>
//                     <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
//                       Document File (Image / PDF, Max 10MB) *
//                     </label>
//                     <input
//                       type="file"
//                       accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
//                       onChange={handleFileChange}
//                       required
//                       style={{
//                         width: "100%",
//                         padding: "7px 10px",
//                         borderRadius: "6px",
//                         border: "1px dashed #94a3b8",
//                         backgroundColor: "#ffffff",
//                         fontSize: "12px",
//                         boxSizing: "border-box",
//                       }}
//                     />
//                   </div>
//                 </div>

//                 <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
//                   <button
//                     type="button"
//                     onClick={() => setShowUploadForm(false)}
//                     style={{
//                       backgroundColor: "#e2e8f0",
//                       color: "#334155",
//                       border: "none",
//                       padding: "8px 14px",
//                       borderRadius: "6px",
//                       fontSize: "13px",
//                       fontWeight: "600",
//                       cursor: "pointer",
//                     }}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     style={{
//                       backgroundColor: "#16a34a",
//                       color: "#fff",
//                       border: "none",
//                       padding: "8px 20px",
//                       borderRadius: "6px",
//                       fontSize: "13px",
//                       fontWeight: "600",
//                       cursor: "pointer",
//                     }}
//                   >
//                     {loading ? "Uploading File..." : "Confirm & Upload"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* ================= UPLOADED DOCUMENTS TABLE ================= */}
//           {docLoading ? (
//             <div style={{ textAlign: "center", padding: "30px", color: "#64748b", fontSize: "14px" }}>
//               Loading uploaded credentials...
//             </div>
//           ) : uploadedDocs.length === 0 ? (
//             <div
//               style={{
//                 textAlign: "center",
//                 padding: "30px",
//                 backgroundColor: "#f8fafc",
//                 borderRadius: "8px",
//                 border: "1px dashed #cbd5e1",
//                 color: "#64748b",
//                 fontSize: "13px",
//               }}
//             >
//               No documents recorded yet. Click "Upload Document" to register your credentials.
//             </div>
//           ) : (
//             <div
//               style={{
//                 width: "100%",
//                 overflowX: "auto",
//                 border: "1px solid #e2e8f0",
//                 borderRadius: "8px",
//               }}
//             >
//               <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
//                 <thead>
//                   <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "1px solid #e2e8f0", color: "#475569" }}>
//                     <th style={{ padding: "10px 14px", fontWeight: "700" }}>#</th>
//                     <th style={{ padding: "10px 14px", fontWeight: "700" }}>Document Classification</th>
//                     <th style={{ padding: "10px 14px", fontWeight: "700" }}>Verification Status</th>
//                     <th style={{ padding: "10px 14px", fontWeight: "700", textAlign: "right" }}>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {uploadedDocs.map((doc, index) => {
//                     const isPdf = doc.documentUrl?.toLowerCase().endsWith(".pdf");
//                     return (
//                       <tr
//                         key={doc._id || index}
//                         style={{
//                           borderBottom: "1px solid #e2e8f0",
//                           backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
//                         }}
//                       >
//                         <td style={{ padding: "10px 14px", color: "#64748b", fontWeight: "600" }}>
//                           {index + 1}
//                         </td>
//                         <td style={{ padding: "10px 14px", fontWeight: "600", color: "#0f172a" }}>
//                           <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                             <span style={{ color: isPdf ? "#dc2626" : "#2563eb", fontSize: "15px" }}>
//                               {isPdf ? <FaFilePdf /> : <FaFileImage />}
//                             </span>
//                             <span style={{ textTransform: "capitalize" }}>
//                               {doc.documentType}
//                             </span>
//                           </div>
//                         </td>
//                         <td style={{ padding: "10px 14px" }}>
//                           <span
//                             style={{
//                               fontSize: "12px",
//                               fontWeight: "600",
//                               color:
//                                 doc.verificationStatus === "verified"
//                                   ? "#16a34a"
//                                   : doc.verificationStatus === "rejected"
//                                   ? "#dc2626"
//                                   : "#d97706",
//                               textTransform: "capitalize",
//                             }}
//                           >
//                             ● {doc.verificationStatus || "pending"}
//                           </span>
//                         </td>
//                         <td style={{ padding: "10px 14px", textAlign: "right" }}>
//                           <div style={{ display: "inline-flex", gap: "6px" }}>
//                             <a
//                               href={doc.documentUrl}
//                               target="_blank"
//                               rel="noreferrer"
//                               style={{
//                                 backgroundColor: "#eff6ff",
//                                 color: "#2563eb",
//                                 border: "1px solid #bfdbfe",
//                                 padding: "4px 8px",
//                                 borderRadius: "4px",
//                                 fontSize: "11px",
//                                 fontWeight: "600",
//                                 textDecoration: "none",
//                                 display: "inline-flex",
//                                 alignItems: "center",
//                                 gap: "3px",
//                               }}
//                             >
//                               View <FaExternalLinkAlt size={9} />
//                             </a>
//                             <button
//                               type="button"
//                               onClick={() => handleDeleteDoc(doc._id)}
//                               style={{
//                                 backgroundColor: "#fef2f2",
//                                 color: "#dc2626",
//                                 border: "1px solid #fecaca",
//                                 padding: "4px 8px",
//                                 borderRadius: "4px",
//                                 fontSize: "11px",
//                                 fontWeight: "600",
//                                 cursor: "pointer",
//                               }}
//                             >
//                               Delete
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           )}

//         </div>
//       )}
//     </div>
//   );
// };

// export default MyDocumentss;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrash, FaExternalLinkAlt, FaShieldAlt, FaFilePdf, FaFileImage, FaPlus, FaTimes, FaBriefcase } from "react-icons/fa";
import toast from "react-hot-toast";
import API from "../../../api/api";

const DOCUMENT_TYPES = [
  { label: "Identity / ID Proof", value: "aadhaar" },
  { label: "PAN Card", value: "pan" },
  { label: "GST Certificate", value: "gst" },
  { label: "Gumasta License", value: "gumasta" },
  { label: "Vehicle RC", value: "rc" },
  { label: "Insurance Policy", value: "insurance" },
  { label: "Transport Permit", value: "permit" },
  { label: "Other Document", value: "other" },
];

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const MyDocumentss = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [docLoading, setDocLoading] = useState(false);

  // Subscription state
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  // Exact fields needed by backend controller
  const [documentType, setDocumentType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  // Uploaded documents list
  const [uploadedDocs, setUploadedDocs] = useState([]);

  // Check Subscription Status in background
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setSubscriptionActive(false);
          setCheckingSubscription(false);
          return;
        }

        const response = await axios.get(
          "https://rodio-tradelink.onrender.com/api/business/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const business = response.data?.data;
        const isActive =
          business?.subscriptionStatus?.toLowerCase() === "active" &&
          business?.profileUnlocked === true;

        setSubscriptionActive(isActive);
      } catch (error) {
        setSubscriptionActive(false);
      } finally {
        setCheckingSubscription(false);
      }
    };

    fetchSubscriptionStatus();
  }, []);

  // Fetch Documents via API.get
  const fetchDocuments = async () => {
    try {
      setDocLoading(true);
      const res = await API.get("/documents/my");
      if (res.data?.success) {
        setUploadedDocs(res.data.data || []);
      }
    } catch (err) {
      console.error("Fetch Documents Error:", err);
      toast.error(err?.response?.data?.message || "Failed to load uploaded documents", {
        id: "doc-fetch-error",
      });
    } finally {
      setDocLoading(false);
    }
  };   

  useEffect(() => {
    if (isOpen) {
      fetchDocuments();
    }
  }, [isOpen]);

  // Click on Header Bar handler
  const handleToggleOpen = () => {
    if (checkingSubscription) return;

    if (!subscriptionActive) {
      toast.error("Please activate a plan to access My Documents", {
        id: "sub-warning",
      });
      navigate("/dashboard/planselection");
      return;
    }

    setIsOpen((prev) => !prev);
  };

  // File Validation (Strictly Image/PDF, No Video, Max 10MB)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload only Image (JPG, PNG) or PDF files. Video files are not permitted.", {
        id: "file-type-error",
      });
      e.target.value = null;
      setSelectedFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File size must be less than ${MAX_FILE_SIZE_MB}MB.`, {
        id: "file-size-error",
      });
      e.target.value = null;
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  // Upload Document via API.post
  const handleUploadSubmit = async (e) => {
    e.preventDefault();

    if (!documentType) {
      toast.error("Please select a document type.", {
        id: "doc-type-missing",
      });
      return;
    }

    if (!selectedFile) {
      toast.error("Please select a document file to upload.", {
        id: "file-missing",
      });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("documentType", documentType);
      formData.append("document", selectedFile);

      const res = await API.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.success) {
        toast.success(res.data.message || "Document uploaded successfully.", {
          id: "doc-upload-success",
        });
        setDocumentType("");
        setSelectedFile(null);
        setShowUploadForm(false);
        fetchDocuments();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to upload document.", {
        id: "doc-upload-error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Delete Document via API.delete
  const handleDeleteDoc = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this document?")) return;

    try {
      const res = await API.delete(`/documents/${id}`);
      if (res.data?.success) {
        toast.success(res.data.message || "Document deleted successfully.", {
          id: "doc-delete-success",
        });
        setUploadedDocs((prev) => prev.filter((doc) => doc._id !== id));
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete document.", {
        id: "doc-delete-error",
      });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
        border: "1px solid #e2e8f0",
        marginBottom: "20px",
        overflow: "hidden",
      }}
    >
      {/* ================= ACCORDION HEADER ================= */}
      <div
        onClick={handleToggleOpen}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          backgroundColor: "#f8fafc",
          cursor: "pointer",
          borderBottom: isOpen ? "1px solid #e2e8f0" : "none",
          userSelect: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
         <div 
  style={{ 
    width: "40px", 
    height: "40px", 
    borderRadius: "10px", 
    backgroundColor: "#d97706", 
    color: "#ffffff", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
  }} 
>
  < FaBriefcase size={20} />
</div>
          <div>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>
              My Documents
            </h3>
            <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
              Official verification documents, scan copies & legal proofs
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              fontSize: "12px",
              fontWeight: "600",
              color: "#d97706",
              backgroundColor: "#fef3c7",
              padding: "4px 10px",
              borderRadius: "20px",
            }}
          >
            {uploadedDocs.length} Uploaded
          </span>
          <span style={{ fontSize: "14px", color: "#64748b" }}>{isOpen ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* ================= ACCORDION BODY ================= */}
      {isOpen && (
        <div style={{ padding: "24px" }}>
          
          {/* Info Banner */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              backgroundColor: "#eff6ff",
              border: "1px solid #bfdbfe",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "20px",
            }}
          >
            <span style={{ fontSize: "18px" }}>🛡️</span>
            <div>
              <strong style={{ display: "block", fontSize: "13px", color: "#1e40af", marginBottom: "2px" }}>
                Authentic Document Verification
              </strong>
              <p style={{ margin: 0, fontSize: "12px", color: "#3b82f6", lineHeight: "1.4" }}>
                Please upload only official Image (JPG, PNG) or PDF documents (Max 10MB). Verified credentials grant verified enterprise status to your account.
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div>
              <h4 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#0f172a" }}>
                Vault Records
              </h4>
              <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
                Active statutory document records
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowUploadForm(!showUploadForm)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                backgroundColor: showUploadForm ? "#64748b" : "#d97706",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                padding: "8px 16px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {showUploadForm ? <FaTimes /> : <FaPlus />}
              {showUploadForm ? "Close Form" : "Upload Document"}
            </button>
          </div>

          {/* ================= UPLOAD FORM ================= */}
          {showUploadForm && (
            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "24px",
              }}
            >
              <h5 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>
                Upload Document File
              </h5>

              <form onSubmit={handleUploadSubmit}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "14px",
                    marginBottom: "16px",
                  }}
                >
                  {/* Document Type Dropdown */}
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                      Document Classification *
                    </label>
                    <select
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "9px 10px",
                        borderRadius: "6px",
                        border: "1px solid #cbd5e1",
                        fontSize: "13px",
                        backgroundColor: "#fff",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="">Select Document Classification</option>
                      {DOCUMENT_TYPES.map((doc) => (
                        <option key={doc.value} value={doc.value}>
                          {doc.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* File Upload Input */}
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#475569", textTransform: "uppercase", marginBottom: "4px" }}>
                      Document File (Image / PDF, Max 10MB) *
                    </label>
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
                      onChange={handleFileChange}
                      required
                      style={{
                        width: "100%",
                        padding: "7px 10px",
                        borderRadius: "6px",
                        border: "1px dashed #94a3b8",
                        backgroundColor: "#ffffff",
                        fontSize: "12px",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    style={{
                      backgroundColor: "#e2e8f0",
                      color: "#334155",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: "#16a34a",
                      color: "#fff",
                      border: "none",
                      padding: "8px 20px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    {loading ? "Uploading File..." : "Confirm & Upload"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= UPLOADED DOCUMENTS TABLE ================= */}
          {docLoading ? (
            <div style={{ textAlign: "center", padding: "30px", color: "#64748b", fontSize: "14px" }}>
              Loading uploaded credentials...
            </div>
          ) : uploadedDocs.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "30px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
                border: "1px dashed #cbd5e1",
                color: "#64748b",
                fontSize: "13px",
              }}
            >
              No documents recorded yet. Click "Upload Document" to register your credentials.
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                overflowX: "auto",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f1f5f9", borderBottom: "1px solid #e2e8f0", color: "#475569" }}>
                    <th style={{ padding: "10px 14px", fontWeight: "700" }}>#</th>
                    <th style={{ padding: "10px 14px", fontWeight: "700" }}>Document Classification</th>
                    <th style={{ padding: "10px 14px", fontWeight: "700" }}>Verification Status</th>
                    <th style={{ padding: "10px 14px", fontWeight: "700", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {uploadedDocs.map((doc, index) => {
                    const isPdf = doc.documentUrl?.toLowerCase().endsWith(".pdf");
                    return (
                      <tr
                        key={doc._id || index}
                        style={{
                          borderBottom: "1px solid #e2e8f0",
                          backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                        }}
                      >
                        <td style={{ padding: "10px 14px", color: "#64748b", fontWeight: "600" }}>
                          {index + 1}
                        </td>
                        <td style={{ padding: "10px 14px", fontWeight: "600", color: "#0f172a" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ color: isPdf ? "#dc2626" : "#2563eb", fontSize: "15px" }}>
                              {isPdf ? <FaFilePdf /> : <FaFileImage />}
                            </span>
                            <span style={{ textTransform: "capitalize" }}>
                              {doc.documentType}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: "10px 14px" }}>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "600",
                              color:
                                doc.verificationStatus === "verified"
                                  ? "#16a34a"
                                  : doc.verificationStatus === "rejected"
                                  ? "#dc2626"
                                  : "#d97706",
                              textTransform: "capitalize",
                            }}
                          >
                            ● {doc.verificationStatus || "pending"}
                          </span>
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "6px" }}>
                            <a
                              href={doc.documentUrl}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                backgroundColor: "#eff6ff",
                                color: "#2563eb",
                                border: "1px solid #bfdbfe",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "11px",
                                fontWeight: "600",
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "3px",
                              }}
                            >
                              View <FaExternalLinkAlt size={9} />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleDeleteDoc(doc._id)}
                              style={{
                                backgroundColor: "#fef2f2",
                                color: "#dc2626",
                                border: "1px solid #fecaca",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "11px",
                                fontWeight: "600",
                                cursor: "pointer",
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default MyDocumentss;