// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const OwnerDetails = ({ profileData, onUpdateSuccess }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     phoneNumber: "",
//     alternatePhoneNumbers: [""],
//     email: "",
//     whatsappNumber: "",
//     role: "",
//   });

//   useEffect(() => {
//     if (profileData) {
//       setFormData({
//         name: profileData.name || "",
//         phoneNumber: profileData.phoneNumber || profileData.mobile || "",
//         alternatePhoneNumbers:
//           Array.isArray(profileData.alternatePhoneNumbers) &&
//           profileData.alternatePhoneNumbers.length > 0
//             ? profileData.alternatePhoneNumbers
//             : [""],
//         email: profileData.email || "",
//         whatsappNumber: profileData.whatsappNumber || "",
//         role: profileData.role || "",
//       });
//     }
//   }, [profileData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Dynamic Alternate Number Handlers
//   const handleAltNumberChange = (index, value) => {
//     const updated = [...formData.alternatePhoneNumbers];
//     updated[index] = value;
//     setFormData({ ...formData, alternatePhoneNumbers: updated });
//   };

//   const addAlternateNumber = () => {
//     setFormData({
//       ...formData,
//       alternatePhoneNumbers: [...formData.alternatePhoneNumbers, ""],
//     });
//   };

//   const removeAlternateNumber = (index) => {
//     const updated = formData.alternatePhoneNumbers.filter((_, i) => i !== index);
//     setFormData({
//       ...formData,
//       alternatePhoneNumbers: updated.length > 0 ? updated : [""],
//     });
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");

//       const payload = {
//         name: formData.name,
//         email: formData.email,
//         phoneNumber: formData.phoneNumber,
//         whatsappNumber: formData.whatsappNumber,
//         alternatePhoneNumbers: formData.alternatePhoneNumbers
//           .map((n) => String(n).trim())
//           .filter(Boolean),
//       };

//       const res = await axios.put(
//         "https://rodio-tradelink.onrender.com/api/profile",
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success) {
//         setIsEditing(false);
//         if (onUpdateSuccess) onUpdateSuccess(res.data.profile);
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     if (profileData) {
//       setFormData({
//         name: profileData.name || "",
//         phoneNumber: profileData.phoneNumber || profileData.mobile || "",
//         alternatePhoneNumbers:
//           Array.isArray(profileData.alternatePhoneNumbers) &&
//           profileData.alternatePhoneNumbers.length > 0
//             ? profileData.alternatePhoneNumbers
//             : [""],
//         email: profileData.email || "",
//         whatsappNumber: profileData.whatsappNumber || "",
//         role: profileData.role || "",
//       });
//     }
//     setIsEditing(false);
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
//       {/* Header Bar */}
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
//               backgroundColor: "#2563eb",
//               color: "#ffffff",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: "bold",
//               fontSize: "15px",
//             }}
//           >
//             OD
//           </div>
//           <div>
//             <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>
//               Owner Details
//             </h3>
//             <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
//               Personal contact and communication info
//             </p>
//           </div>
//         </div>

//         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//           <span
//             style={{
//               fontSize: "12px",
//               fontWeight: "600",
//               color: "#2563eb",
//               backgroundColor: "#eff6ff",
//               padding: "4px 10px",
//               borderRadius: "20px",
//             }}
//           >
//             {isOpen ? "Collapse" : "Open"}
//           </span>
//           <span style={{ fontSize: "14px", color: "#64748b" }}>{isOpen ? "▲" : "▼"}</span>
//         </div>
//       </div>

//       {/* Accordion Body */}
//       {isOpen && (
//         <div style={{ padding: "24px" }}>
//           {!isEditing ? (
//             /* ================= VIEW MODE ================= */
//             <div>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//                   gap: "16px",
//                   marginBottom: "24px",
//                 }}
//               >
//                 {/* Name */}
//                 <div
//                   style={{
//                     backgroundColor: "#f8fafc",
//                     padding: "14px",
//                     borderRadius: "8px",
//                     border: "1px solid #e2e8f0",
//                   }}
//                 >
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
//                     Owner Name
//                   </span>
//                   <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>
//                     {formData.name || <span style={{ color: "#94a3b8" }}>Not Added</span>}
//                   </span>
//                 </div>

//                 {/* Role */}
//                 <div
//                   style={{
//                     backgroundColor: "#f8fafc",
//                     padding: "14px",
//                     borderRadius: "8px",
//                     border: "1px solid #e2e8f0",
//                   }}
//                 >
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
//                     Role
//                   </span>
//                   <span
//                     style={{
//                       display: "inline-block",
//                       marginTop: "2px",
//                       fontSize: "12px",
//                       fontWeight: "700",
//                       color: "#1d4ed8",
//                       backgroundColor: "#dbeafe",
//                       padding: "2px 8px",
//                       borderRadius: "4px",
//                       textTransform: "uppercase",
//                     }}
//                   >
//                     {formData.role || "User"}
//                   </span>
//                 </div>

//                 {/* Primary Contact */}
//                 <div
//                   style={{
//                     backgroundColor: "#f8fafc",
//                     padding: "14px",
//                     borderRadius: "8px",
//                     border: "1px solid #e2e8f0",
//                   }}
//                 >
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
//                     Primary Mobile
//                   </span>
//                   <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>
//                     {formData.phoneNumber || <span style={{ color: "#94a3b8" }}>Not Added</span>}
//                   </span>
//                 </div>

//                 {/* WhatsApp */}
//                 <div
//                   style={{
//                     backgroundColor: "#f8fafc",
//                     padding: "14px",
//                     borderRadius: "8px",
//                     border: "1px solid #e2e8f0",
//                   }}
//                 >
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
//                     WhatsApp Number
//                   </span>
//                   <span style={{ fontSize: "14px", fontWeight: "600", color: "#16a34a" }}>
//                     {formData.whatsappNumber || <span style={{ color: "#94a3b8" }}>Not Added</span>}
//                   </span>
//                 </div>

//                 {/* Email */}
//                 <div
//                   style={{
//                     backgroundColor: "#f8fafc",
//                     padding: "14px",
//                     borderRadius: "8px",
//                     border: "1px solid #e2e8f0",
//                     gridColumn: "1 / -1",
//                   }}
//                 >
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
//                     Email ID
//                   </span>
//                   <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>
//                     {formData.email || <span style={{ color: "#94a3b8" }}>Not Added</span>}
//                   </span>
//                 </div>

//                 {/* Alternate Numbers */}
//                 <div
//                   style={{
//                     backgroundColor: "#f8fafc",
//                     padding: "14px",
//                     borderRadius: "8px",
//                     border: "1px solid #e2e8f0",
//                     gridColumn: "1 / -1",
//                   }}
//                 >
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
//                     Alternate Mobile Numbers
//                   </span>
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//                     {formData.alternatePhoneNumbers.filter(Boolean).length > 0 ? (
//                       formData.alternatePhoneNumbers
//                         .filter(Boolean)
//                         .map((num, idx) => (
//                           <span
//                             key={idx}
//                             style={{
//                               backgroundColor: "#e2e8f0",
//                               color: "#1e293b",
//                               padding: "4px 10px",
//                               borderRadius: "6px",
//                               fontSize: "13px",
//                               fontWeight: "600",
//                             }}
//                           >
//                             📞 {num}
//                           </span>
//                         ))
//                     ) : (
//                       <span style={{ color: "#94a3b8", fontSize: "13px" }}>No Alternate Numbers Added</span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Edit Trigger Button */}
//               <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(true)}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "6px",
//                     backgroundColor: "#2563eb",
//                     color: "#ffffff",
//                     padding: "10px 20px",
//                     borderRadius: "8px",
//                     border: "none",
//                     fontWeight: "600",
//                     fontSize: "14px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   ✏️ Edit Details
//                 </button>
//               </div>
//             </div>
//           ) : (
//             /* ================= EDIT FORM MODE ================= */
//             <form onSubmit={handleSave}>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//                   gap: "16px",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <div>
//                   <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
//                     Owner Name
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     style={{
//                       width: "100%",
//                       padding: "10px 12px",
//                       borderRadius: "6px",
//                       border: "1px solid #cbd5e1",
//                       fontSize: "14px",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
//                     Email ID
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     style={{
//                       width: "100%",
//                       padding: "10px 12px",
//                       borderRadius: "6px",
//                       border: "1px solid #cbd5e1",
//                       fontSize: "14px",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
//                     Primary Mobile Number
//                   </label>
//                   <input
//                     type="text"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     style={{
//                       width: "100%",
//                       padding: "10px 12px",
//                       borderRadius: "6px",
//                       border: "1px solid #cbd5e1",
//                       fontSize: "14px",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                   />
//                 </div>

//                 <div>
//                   <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
//                     WhatsApp Number
//                   </label>
//                   <input
//                     type="text"
//                     name="whatsappNumber"
//                     value={formData.whatsappNumber}
//                     onChange={handleChange}
//                     style={{
//                       width: "100%",
//                       padding: "10px 12px",
//                       borderRadius: "6px",
//                       border: "1px solid #cbd5e1",
//                       fontSize: "14px",
//                       outline: "none",
//                       boxSizing: "border-box",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Dynamic Alternate Numbers List */}
//               <div
//                 style={{
//                   backgroundColor: "#f8fafc",
//                   padding: "16px",
//                   borderRadius: "8px",
//                   border: "1px solid #e2e8f0",
//                   marginBottom: "20px",
//                 }}
//               >
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
//                   <label style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b" }}>
//                     Alternate Mobile Numbers
//                   </label>
//                   <button
//                     type="button"
//                     onClick={addAlternateNumber}
//                     style={{
//                       backgroundColor: "#0284c7",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       padding: "6px 12px",
//                       fontSize: "12px",
//                       fontWeight: "600",
//                       cursor: "pointer",
//                     }}
//                   >
//                     + Add Another Number
//                   </button>
//                 </div>

//                 {formData.alternatePhoneNumbers.map((number, idx) => (
//                   <div key={idx} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
//                     <input
//                       type="text"
//                       placeholder={`Alternate Number ${idx + 1}`}
//                       value={number}
//                       onChange={(e) => handleAltNumberChange(idx, e.target.value)}
//                       style={{
//                         flex: 1,
//                         padding: "8px 12px",
//                         borderRadius: "6px",
//                         border: "1px solid #cbd5e1",
//                         fontSize: "14px",
//                         outline: "none",
//                         backgroundColor: "#ffffff",
//                       }}
//                     />
//                     {formData.alternatePhoneNumbers.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeAlternateNumber(idx)}
//                         style={{
//                           backgroundColor: "#ef4444",
//                           color: "#ffffff",
//                           border: "none",
//                           borderRadius: "6px",
//                           padding: "0 12px",
//                           cursor: "pointer",
//                           fontSize: "14px",
//                         }}
//                       >
//                         ✕
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Actions */}
//               <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   disabled={loading}
//                   style={{
//                     backgroundColor: "#f1f5f9",
//                     color: "#475569",
//                     border: "1px solid #cbd5e1",
//                     padding: "10px 18px",
//                     borderRadius: "8px",
//                     fontWeight: "600",
//                     fontSize: "14px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{
//                     backgroundColor: "#16a34a",
//                     color: "#ffffff",
//                     border: "none",
//                     padding: "10px 22px",
//                     borderRadius: "8px",
//                     fontWeight: "600",
//                     fontSize: "14px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {loading ? "Saving..." : "Save Changes"}
//                 </button>
//               </div>
//             </form>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default OwnerDetails;
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUserTie } from "react-icons/fa";

const OwnerDetails = ({ profileData, onUpdateSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    alternatePhoneNumbers: [""],
    email: "",
    whatsappNumber: "",
    role: "",
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        phoneNumber: (profileData.phoneNumber || profileData.mobile || "")
          .replace(/\D/g, "")
          .slice(0, 10),
        alternatePhoneNumbers:
          Array.isArray(profileData.alternatePhoneNumbers) &&
          profileData.alternatePhoneNumbers.length > 0
            ? profileData.alternatePhoneNumbers.map((num) =>
                String(num).replace(/\D/g, "").slice(0, 10),
              )
            : [""],
        email: profileData.email || "",
        whatsappNumber: (profileData.whatsappNumber || "")
          .replace(/\D/g, "")
          .slice(0, 10),
        role: profileData.role || "",
      });
    }
  }, [profileData]);

  // Sirf numbers allow karega aur maximum 10 digits limit karega
  const handleNumericInput = (val) => {
    return val.replace(/\D/g, "").slice(0, 10);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" || name === "whatsappNumber") {
      setFormData({ ...formData, [name]: handleNumericInput(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleEdit = () => {
    setIsEditing(true);

    setTimeout(() => {
      window.scrollTo({
        top: 400,
        behavior: "smooth",
      });
    }, 100);
  };

  // Dynamic Alternate Number Handlers
  const handleAltNumberChange = (index, value) => {
    const updated = [...formData.alternatePhoneNumbers];
    updated[index] = handleNumericInput(value);
    setFormData({ ...formData, alternatePhoneNumbers: updated });
  };

  const addAlternateNumber = () => {
    setFormData({
      ...formData,
      alternatePhoneNumbers: [...formData.alternatePhoneNumbers, ""],
    });
  };

  const removeAlternateNumber = (index) => {
    const updated = formData.alternatePhoneNumbers.filter(
      (_, i) => i !== index,
    );
    setFormData({
      ...formData,
      alternatePhoneNumbers: updated.length > 0 ? updated : [""],
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Owner name is required", { id: "name-error" });
      return;
    }

    if (formData.phoneNumber && formData.phoneNumber.length !== 10) {
      toast.error("Primary mobile number must be exactly 10 digits", {
        id: "phone-error",
      });
      return;
    }

    if (formData.whatsappNumber && formData.whatsappNumber.length !== 10) {
      toast.error("WhatsApp number must be exactly 10 digits", {
        id: "whatsapp-error",
      });
      return;
    }

    for (let i = 0; i < formData.alternatePhoneNumbers.length; i++) {
      const altNum = formData.alternatePhoneNumbers[i];
      if (altNum && altNum.length !== 10) {
        toast.error(`Alternate number ${i + 1} must be exactly 10 digits`, {
          id: "alt-phone-error",
        });
        return;
      }
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        whatsappNumber: formData.whatsappNumber,
        alternatePhoneNumbers: formData.alternatePhoneNumbers
          .map((n) => String(n).trim())
          .filter(Boolean),
        role: formData.role,
      };

      const res = await axios.put(
        "https://rodio-tradelink.onrender.com/api/profile",
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.data.success) {
        toast.success("Profile updated successfully!", {
          id: "profile-update-success",
        });
        setIsEditing(false);
        if (onUpdateSuccess) onUpdateSuccess(res.data.profile);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile", {
        id: "profile-update-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (profileData) {
      setFormData({
        name: profileData.name || "",
        phoneNumber: (profileData.phoneNumber || profileData.mobile || "")
          .replace(/\D/g, "")
          .slice(0, 10),
        alternatePhoneNumbers:
          Array.isArray(profileData.alternatePhoneNumbers) &&
          profileData.alternatePhoneNumbers.length > 0
            ? profileData.alternatePhoneNumbers.map((num) =>
                String(num).replace(/\D/g, "").slice(0, 10),
              )
            : [""],
        email: profileData.email || "",
        whatsappNumber: (profileData.whatsappNumber || "")
          .replace(/\D/g, "")
          .slice(0, 10),
        role: profileData.role || "",
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-[#e2e8f0] mb-[20px] overflow-hidden">
      {/* Header Bar */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex justify-between items-center px-[20px] py-[16px] bg-[#f8fafc] cursor-pointer ${
          isOpen ? "border-b border-[#e2e8f0]" : ""
        }`}
      >
        <div className="flex items-center gap-[12px]">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-[#4f46e5] text-white flex items-center justify-center">
            <FaUserTie size={20} />
          </div>
          <div>
            <h3 className="m-0 text-[16px] font-bold text-[#1e293b]">
              Owner Details
            </h3>
            <p className="m-0 text-[12px] text-[#64748b]">
              Personal contact and communication info
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[8px]">
          <span className="text-[12px] font-semibold text-[#2563eb] bg-[#eff6ff] px-[10px] py-[4px] rounded-[20px]">
            {isOpen ? "Collapse" : "Open"}
          </span>
          <span className="text-[14px] text-[#64748b]">
            {isOpen ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-[24px]">
          {!isEditing ? (
            /* ================= VIEW MODE ================= */
            <div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[16px] mb-[24px]">
                {/* Name */}
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase">
                    Owner Name
                  </span>
                  <span className="text-[14px] font-semibold text-[#0f172a]">
                    {formData.name || (
                      <span className="text-[#94a3b8]">Not Added</span>
                    )}
                  </span>
                </div>

                {/* Role */}
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase">
                    Role
                  </span>
                  <span className="inline-block mt-[2px] text-[12px] font-bold text-[#1d4ed8] bg-[#dbeafe] px-[8px] py-[2px] rounded-[4px] uppercase">
                    {formData.role || "User"}
                  </span>
                </div>

                {/* Primary Contact */}
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase">
                    Primary Mobile
                  </span>
                  <span className="text-[14px] font-semibold text-[#0f172a]">
                    {formData.phoneNumber || (
                      <span className="text-[#94a3b8]">Not Added</span>
                    )}
                  </span>
                </div>
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0] col-span-full">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase mb-[6px]">
                    Alternate Mobile Numbers
                  </span>
                  <div className="flex flex-wrap gap-[8px]">
                    {formData.alternatePhoneNumbers.filter(Boolean).length >
                    0 ? (
                      formData.alternatePhoneNumbers
                        .filter(Boolean)
                        .map((num, idx) => (
                          <span
                            key={idx}
                            className="bg-[#e2e8f0] text-[#1e293b] px-[10px] py-[4px] rounded-[6px] text-[13px] font-semibold"
                          >
                            📞 {num}
                          </span>
                        ))
                    ) : (
                      <span className="text-[#94a3b8] text-[13px]">
                        No Alternate Numbers Added
                      </span>
                    )}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase">
                    WhatsApp Number
                  </span>
                  <span className="text-[14px] font-semibold text-[#16a34a]">
                    {formData.whatsappNumber || (
                      <span className="text-[#94a3b8]">Not Added</span>
                    )}
                  </span>
                </div>

                {/* Email */}
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0] col-span-full">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase">
                    Email ID
                  </span>
                  <span className="text-[14px] font-semibold text-[#0f172a]">
                    {formData.email || (
                      <span className="text-[#94a3b8]">Not Added</span>
                    )}
                  </span>
                </div>

                {/* Alternate Numbers */}
              </div>

              {/* Edit Trigger Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex items-center gap-[6px] bg-[#2563eb] text-white px-[20px] py-[10px] rounded-[8px] border-none font-semibold text-[14px] cursor-pointer"
                >
                  ✏️ Edit Details
                </button>
              </div>
            </div>
          ) : (
            /* ================= EDIT FORM MODE ================= */
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[16px] mb-[20px]">
                <div>
                  <label className="block text-[12px] font-bold text-[#334155] mb-[6px]">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none box-border"
                  />
                </div>

                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase mb-1">
                    Role
                  </span>

                  <select
                    value={formData.role || "user"}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                    className="w-full text-[12px] font-bold text-[#1d4ed8] bg-[#dbeafe] px-[8px] py-[6px] rounded-[4px] uppercase outline-none cursor-pointer border-none"
                  >
                    <option value="user">User</option>
                    <option value="transporter">Transporter</option>
                    <option value="fleet_owner">Fleet Owner</option>
                    <option value="cha_agent">CHA Agent</option>
                    <option value="courier">Courier</option>
                    <option value="bus_service">Bus Service</option>
                    <option value="travel_taxi">Travel / Taxi</option>
                    <option value="truck_body_builder">
                      Truck Body Builder
                    </option>
                    <option value="rto_agent">RTO Agent</option>
                    <option value="finance_company">Finance Company</option>
                    <option value="finance_agent">Finance Agent</option>
                    <option value="packers_movers">Packers & Movers</option>
                    <option value="insurance_company">Insurance Company</option>
                    <option value="car_carrier">Car Carrier</option>
                    <option value="miningvehicle_supplier">
                      Mining Vehicle Supplier
                    </option>
                    <option value="partstypesbettry_supplier">
                      Parts / Tyres / Battery Supplier
                    </option>
                    <option value="mechanic and service center">
                      Mechanic & Service Center
                    </option>
                    <option value="biketexiauto">Bike / Taxi / Auto</option>
                    <option value="candfagent">C&F Agent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#334155] mb-[6px]">
                    Primary Mobile Number (10 Digits)
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    maxLength="10"
                    placeholder="Enter 10 digit number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none box-border"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#334155] mb-[6px]">
                    WhatsApp Number (10 Digits)
                  </label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    maxLength="10"
                    placeholder="Enter 10 digit number"
                    value={formData.whatsappNumber}
                    onChange={handleChange}
                    className="w-full px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none box-border"
                  />
                </div>
              </div>

              {/* Dynamic Alternate Numbers List */}
              <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] mb-[20px]">
                <div className="flex justify-between items-center mb-[12px]">
                  <label className="text-[13px] font-bold text-[#1e293b]">
                    Alternate Mobile Numbers (10 Digits)
                  </label>
                  <button
                    type="button"
                    onClick={addAlternateNumber}
                    className="bg-[#0284c7] text-white border-none rounded-[6px] px-[12px] py-[6px] text-[12px] font-semibold cursor-pointer"
                  >
                    + Add Another Number
                  </button>
                </div>

                {formData.alternatePhoneNumbers.map((number, idx) => (
                  <div key={idx} className="flex gap-[8px] mb-[8px]">
                    <input
                      type="text"
                      maxLength="10"
                      placeholder={`Alternate 10 digit number ${idx + 1}`}
                      value={number}
                      onChange={(e) =>
                        handleAltNumberChange(idx, e.target.value)
                      }
                      className="flex-1 px-[12px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
                    />
                    {formData.alternatePhoneNumbers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAlternateNumber(idx)}
                        className="bg-[#ef4444] text-white border-none rounded-[6px] px-[12px] py-0 cursor-pointer text-[14px]"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#334155] mb-[6px]">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none box-border"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-[10px]">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1] px-[18px] py-[10px] rounded-[8px] font-semibold text-[14px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#16a34a] text-white border-none px-[22px] py-[10px] rounded-[8px] font-semibold text-[14px] cursor-pointer"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default OwnerDetails;
