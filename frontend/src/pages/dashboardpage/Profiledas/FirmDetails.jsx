// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const DAYS_LIST = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// const EMPLOYEE_RANGES = ["1-10", "11-25", "26-50", "51-100", "100+"];

// const FirmDetails = ({ profileData, onUpdateSuccess }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     firmName: "",
//     address: "",
//     currentCity: "",
//     currentState: "",
//     pincode: "",
//     addresses: [""],
//     landlineNumbers: [""],
//     website: "",
//     employeeRange: "",
//     workingHoursStart: "",
//     workingHoursEnd: "",
//     officeWorkingDays: [],
//     workingAreas: [{ state: "", cities: "" }],
//   });

//   useEffect(() => {
//     if (profileData) {
//       setFormData({
//         firmName: profileData.firmName || "",
//         address: profileData.address || "",
//         currentCity: profileData.currentCity || "",
//         currentState: profileData.currentState || "",
//         pincode: profileData.pincode || "",
//         addresses:
//           Array.isArray(profileData.addresses) && profileData.addresses.length > 0
//             ? profileData.addresses
//             : [""],
//         landlineNumbers:
//           Array.isArray(profileData.landlineNumbers) && profileData.landlineNumbers.length > 0
//             ? profileData.landlineNumbers
//             : [""],
//         website: profileData.website || "",
//         employeeRange: profileData.employeeRange || "",
//         workingHoursStart: profileData.officeWorkingHours?.start || "",
//         workingHoursEnd: profileData.officeWorkingHours?.end || "",
//         officeWorkingDays: Array.isArray(profileData.officeWorkingDays)
//           ? profileData.officeWorkingDays
//           : [],
//         workingAreas:
//           Array.isArray(profileData.workingAreas) && profileData.workingAreas.length > 0
//             ? profileData.workingAreas.map((item) => ({
//                 state: item.state || "",
//                 cities: Array.isArray(item.cities) ? item.cities.join(", ") : "",
//               }))
//             : [{ state: "", cities: "" }],
//       });
//     }
//   }, [profileData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Multiple Addresses
//   const handleAddressChange = (index, value) => {
//     const updated = [...formData.addresses];
//     updated[index] = value;
//     setFormData({ ...formData, addresses: updated });
//   };
//   const addAddress = () => {
//     setFormData({ ...formData, addresses: [...formData.addresses, ""] });
//   };
//   const removeAddress = (index) => {
//     const updated = formData.addresses.filter((_, i) => i !== index);
//     setFormData({ ...formData, addresses: updated.length > 0 ? updated : [""] });
//   };

//   // Multiple Landlines
//   const handleLandlineChange = (index, value) => {
//     const updated = [...formData.landlineNumbers];
//     updated[index] = value;
//     setFormData({ ...formData, landlineNumbers: updated });
//   };
//   const addLandline = () => {
//     setFormData({ ...formData, landlineNumbers: [...formData.landlineNumbers, ""] });
//   };
//   const removeLandline = (index) => {
//     const updated = formData.landlineNumbers.filter((_, i) => i !== index);
//     setFormData({ ...formData, landlineNumbers: updated.length > 0 ? updated : [""] });
//   };

//   // Working Days Multi-Select
//   const toggleWorkingDay = (day) => {
//     if (!isEditing) return;
//     const exists = formData.officeWorkingDays.includes(day);
//     setFormData({
//       ...formData,
//       officeWorkingDays: exists
//         ? formData.officeWorkingDays.filter((d) => d !== day)
//         : [...formData.officeWorkingDays, day],
//     });
//   };

//   // Working Areas
//   const handleWorkingAreaChange = (index, field, value) => {
//     const updated = [...formData.workingAreas];
//     updated[index][field] = value;
//     setFormData({ ...formData, workingAreas: updated });
//   };
//   const addWorkingArea = () => {
//     setFormData({
//       ...formData,
//       workingAreas: [...formData.workingAreas, { state: "", cities: "" }],
//     });
//   };
//   const removeWorkingArea = (index) => {
//     const updated = formData.workingAreas.filter((_, i) => i !== index);
//     setFormData({
//       ...formData,
//       workingAreas: updated.length > 0 ? updated : [{ state: "", cities: "" }],
//     });
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");

//       const payload = {
//         firmName: formData.firmName,
//         address: formData.address,
//         currentCity: formData.currentCity,
//         currentState: formData.currentState,
//         pincode: formData.pincode,
//         website: formData.website,
//         employeeRange: formData.employeeRange,
//         addresses: formData.addresses.map((a) => a.trim()).filter(Boolean),
//         landlineNumbers: formData.landlineNumbers.map((l) => l.trim()).filter(Boolean),
//         officeWorkingHours: {
//           start: formData.workingHoursStart,
//           end: formData.workingHoursEnd,
//         },
//         officeWorkingDays: formData.officeWorkingDays,
//         workingAreas: formData.workingAreas
//           .filter((item) => item.state.trim() !== "")
//           .map((item) => ({
//             state: item.state.trim(),
//             cities: item.cities
//               .split(",")
//               .map((c) => c.trim())
//               .filter(Boolean),
//           })),
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
//       alert(err.response?.data?.message || "Failed to update firm details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
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
//               backgroundColor: "#0891b2",
//               color: "#ffffff",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               fontWeight: "bold",
//               fontSize: "15px",
//             }}
//           >
//             FD
//           </div>
//           <div>
//             <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>
//               Firm Details
//             </h3>
//             <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>
//               Company address, operations & office timing
//             </p>
//           </div>
//         </div>

//         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//           <span
//             style={{
//               fontSize: "12px",
//               fontWeight: "600",
//               color: "#0891b2",
//               backgroundColor: "#ecfeff",
//               padding: "4px 10px",
//               borderRadius: "20px",
//             }}
//           >
//             {isOpen ? "Collapse" : "Open"}
//           </span>
//           <span style={{ fontSize: "14px", color: "#64748b" }}>{isOpen ? "▲" : "▼"}</span>
//         </div>
//       </div>

//       {/* Content Area */}
//       {isOpen && (
//         <div style={{ padding: "24px" }}>
//           {!isEditing ? (
//             /* ================= READ-ONLY VIEW ================= */
//             <div>
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//                   gap: "16px",
//                   marginBottom: "20px",
//                 }}
//               >
//                 {/* Firm Name */}
//                 <div style={{ backgroundColor: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
//                     Firm / Company Name
//                   </span>
//                   <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>
//                     {formData.firmName || <span style={{ color: "#94a3b8" }}>Not Added</span>}
//                   </span>
//                 </div>

//                 {/* Website */}
//                 <div style={{ backgroundColor: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
//                     Website
//                   </span>
//                   {formData.website ? (
//                     <a href={formData.website} target="_blank" rel="noreferrer" style={{ fontSize: "14px", fontWeight: "600", color: "#2563eb", textDecoration: "underline" }}>
//                       {formData.website}
//                     </a>
//                   ) : (
//                     <span style={{ color: "#94a3b8", fontSize: "14px" }}>Not Added</span>
//                   )}
//                 </div>

//                 {/* Employee Count */}
//                 <div style={{ backgroundColor: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
//                     Total Employees
//                   </span>
//                   <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>
//                     {formData.employeeRange ? `${formData.employeeRange} Employees` : <span style={{ color: "#94a3b8" }}>Not Specified</span>}
//                   </span>
//                 </div>

//                 {/* Working Hours */}
//                 <div style={{ backgroundColor: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
//                     Working Hours
//                   </span>
//                   <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>
//                     {formData.workingHoursStart && formData.workingHoursEnd
//                       ? `${formData.workingHoursStart} to ${formData.workingHoursEnd}`
//                       : <span style={{ color: "#94a3b8" }}>Not Set</span>}
//                   </span>
//                 </div>

//                 {/* Primary Address */}
//                 <div style={{ backgroundColor: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0", gridColumn: "1 / -1" }}>
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase" }}>
//                     Registered Primary Address
//                   </span>
//                   <span style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}>
//                     {formData.address ? `${formData.address}, ${formData.currentCity}, ${formData.currentState} - ${formData.pincode}` : <span style={{ color: "#94a3b8" }}>Not Added</span>}
//                   </span>
//                 </div>

//                 {/* Additional Addresses */}
//                 <div style={{ backgroundColor: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0", gridColumn: "1 / -1" }}>
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
//                     Branch / Alternate Addresses
//                   </span>
//                   <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//                     {formData.addresses.filter(Boolean).length > 0 ? (
//                       formData.addresses.filter(Boolean).map((addr, idx) => (
//                         <div key={idx} style={{ fontSize: "13px", fontWeight: "500", color: "#334155" }}>
//                           🏢 {addr}
//                         </div>
//                       ))
//                     ) : (
//                       <span style={{ color: "#94a3b8", fontSize: "13px" }}>No Alternate Addresses</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Landline Numbers */}
//                 <div style={{ backgroundColor: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
//                     Landline Numbers
//                   </span>
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
//                     {formData.landlineNumbers.filter(Boolean).length > 0 ? (
//                       formData.landlineNumbers.filter(Boolean).map((l, idx) => (
//                         <span key={idx} style={{ backgroundColor: "#e2e8f0", padding: "2px 8px", borderRadius: "4px", fontSize: "13px", fontWeight: "600" }}>
//                           ☎️ {l}
//                         </span>
//                       ))
//                     ) : (
//                       <span style={{ color: "#94a3b8", fontSize: "13px" }}>Not Added</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Working Days */}
//                 <div style={{ backgroundColor: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
//                     Working Days
//                   </span>
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
//                     {formData.officeWorkingDays.length > 0 ? (
//                       formData.officeWorkingDays.map((d, idx) => (
//                         <span key={idx} style={{ backgroundColor: "#dbeafe", color: "#1e40af", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "600" }}>
//                           {d}
//                         </span>
//                       ))
//                     ) : (
//                       <span style={{ color: "#94a3b8", fontSize: "13px" }}>Not Added</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Working Areas */}
//                 <div style={{ backgroundColor: "#f8fafc", padding: "14px", borderRadius: "8px", border: "1px solid #e2e8f0", gridColumn: "1 / -1" }}>
//                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", marginBottom: "6px" }}>
//                     Working Areas (States & Cities)
//                   </span>
//                   <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//                     {formData.workingAreas.filter((w) => w.state).length > 0 ? (
//                       formData.workingAreas
//                         .filter((w) => w.state)
//                         .map((w, idx) => (
//                           <div key={idx} style={{ backgroundColor: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "6px 12px" }}>
//                             <strong style={{ fontSize: "13px", color: "#0f172a" }}>{w.state}:</strong>{" "}
//                             <span style={{ fontSize: "13px", color: "#475569" }}>{w.cities || "All Cities"}</span>
//                           </div>
//                         ))
//                     ) : (
//                       <span style={{ color: "#94a3b8", fontSize: "13px" }}>No Working Areas Specified</span>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Edit Button */}
//               <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(true)}
//                   style={{
//                     backgroundColor: "#0891b2",
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
//             /* ================= EDIT FORM ================= */
//             <form onSubmit={handleSave}>
//               <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "20px" }}>
//                 <div>
//                   <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
//                     Firm Name
//                   </label>
//                   <input
//                     type="text"
//                     name="firmName"
//                     value={formData.firmName}
//                     onChange={handleChange}
//                     style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
//                   />
//                 </div>

//                 <div>
//                   <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
//                     Website URL
//                   </label>
//                   <input
//                     type="text"
//                     name="website"
//                     value={formData.website}
//                     onChange={handleChange}
//                     placeholder="https://..."
//                     style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
//                   />
//                 </div>

//                 <div>
//                   <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
//                     Number of Employees
//                   </label>
//                   <select
//                     name="employeeRange"
//                     value={formData.employeeRange}
//                     onChange={handleChange}
//                     style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
//                   >
//                     <option value="">Select Range</option>
//                     {EMPLOYEE_RANGES.map((r) => (
//                       <option key={r} value={r}>
//                         {r} Employees
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
//                     Working Hours (Start - End)
//                   </label>
//                   <div style={{ display: "flex", gap: "8px" }}>
//                     <input
//                       type="time"
//                       name="workingHoursStart"
//                       value={formData.workingHoursStart}
//                       onChange={handleChange}
//                       style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
//                     />
//                     <input
//                       type="time"
//                       name="workingHoursEnd"
//                       value={formData.workingHoursEnd}
//                       onChange={handleChange}
//                       style={{ flex: 1, padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Primary Address */}
//               <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
//                 <span style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#1e293b", marginBottom: "10px" }}>
//                   Primary Address Details
//                 </span>
//                 <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" }}>
//                   <input
//                     type="text"
//                     name="address"
//                     placeholder="Street / Behind Area"
//                     value={formData.address}
//                     onChange={handleChange}
//                     style={{ gridColumn: "1 / -1", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
//                   />
//                   <input
//                     type="text"
//                     name="currentCity"
//                     placeholder="City"
//                     value={formData.currentCity}
//                     onChange={handleChange}
//                     style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
//                   />
//                   <input
//                     type="text"
//                     name="currentState"
//                     placeholder="State"
//                     value={formData.currentState}
//                     onChange={handleChange}
//                     style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
//                   />
//                   <input
//                     type="text"
//                     name="pincode"
//                     placeholder="Pincode"
//                     value={formData.pincode}
//                     onChange={handleChange}
//                     style={{ padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
//                   />
//                 </div>
//               </div>

//               {/* Alternate Addresses */}
//               <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
//                   <span style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b" }}>Branch / Alternate Addresses</span>
//                   <button
//                     type="button"
//                     onClick={addAddress}
//                     style={{ backgroundColor: "#0284c7", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", cursor: "pointer" }}
//                   >
//                     + Add Address
//                   </button>
//                 </div>
//                 {formData.addresses.map((addr, idx) => (
//                   <div key={idx} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
//                     <input
//                       type="text"
//                       placeholder={`Alternate Address ${idx + 1}`}
//                       value={addr}
//                       onChange={(e) => handleAddressChange(idx, e.target.value)}
//                       style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff" }}
//                     />
//                     {formData.addresses.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeAddress(idx)}
//                         style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", padding: "0 12px", cursor: "pointer" }}
//                       >
//                         ✕
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Landline Numbers */}
//               <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
//                   <span style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b" }}>Office Landline Numbers</span>
//                   <button
//                     type="button"
//                     onClick={addLandline}
//                     style={{ backgroundColor: "#0284c7", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", cursor: "pointer" }}
//                   >
//                     + Add Landline
//                   </button>
//                 </div>
//                 {formData.landlineNumbers.map((num, idx) => (
//                   <div key={idx} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
//                     <input
//                       type="text"
//                       placeholder="e.g. 0731-2456789"
//                       value={num}
//                       onChange={(e) => handleLandlineChange(idx, e.target.value)}
//                       style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff" }}
//                     />
//                     {formData.landlineNumbers.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeLandline(idx)}
//                         style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", padding: "0 12px", cursor: "pointer" }}
//                       >
//                         ✕
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Working Days */}
//               <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "16px" }}>
//                 <span style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
//                   Office Working Days
//                 </span>
//                 <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//                   {DAYS_LIST.map((day) => {
//                     const isSelected = formData.officeWorkingDays.includes(day);
//                     return (
//                       <button
//                         key={day}
//                         type="button"
//                         onClick={() => toggleWorkingDay(day)}
//                         style={{
//                           padding: "6px 14px",
//                           borderRadius: "6px",
//                           border: isSelected ? "1px solid #2563eb" : "1px solid #cbd5e1",
//                           backgroundColor: isSelected ? "#2563eb" : "#ffffff",
//                           color: isSelected ? "#ffffff" : "#334155",
//                           fontWeight: "600",
//                           fontSize: "13px",
//                           cursor: "pointer",
//                         }}
//                       >
//                         {day}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Working Areas */}
//               <div style={{ backgroundColor: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", marginBottom: "20px" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
//                   <span style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b" }}>Working Areas</span>
//                   <button
//                     type="button"
//                     onClick={addWorkingArea}
//                     style={{ backgroundColor: "#0284c7", color: "#fff", border: "none", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", cursor: "pointer" }}
//                   >
//                     + Add State
//                   </button>
//                 </div>
//                 {formData.workingAreas.map((area, idx) => (
//                   <div key={idx} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
//                     <input
//                       type="text"
//                       placeholder="State (e.g. Madhya Pradesh)"
//                       value={area.state}
//                       onChange={(e) => handleWorkingAreaChange(idx, "state", e.target.value)}
//                       style={{ flex: 1, padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff" }}
//                     />
//                     <input
//                       type="text"
//                       placeholder="Cities (comma separated: Indore, Bhopal)"
//                       value={area.cities}
//                       onChange={(e) => handleWorkingAreaChange(idx, "cities", e.target.value)}
//                       style={{ flex: 2, padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#fff" }}
//                     />
//                     {formData.workingAreas.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeWorkingArea(idx)}
//                         style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "6px", padding: "0 12px", cursor: "pointer" }}
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
//                   style={{ backgroundColor: "#f1f5f9", color: "#475569", border: "1px solid #cbd5e1", padding: "10px 18px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   style={{ backgroundColor: "#16a34a", color: "#ffffff", border: "none", padding: "10px 22px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
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

// export default FirmDetails;
// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { Plus, Trash2, MapPin, Map as MapIcon, Loader2 } from "lucide-react";

// // ===============================
// // List of Indian States for Autocomplete
// // ===============================
// const INDIAN_STATES = [
//   "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
//   "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
//   "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
//   "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
//   "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
//   "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
//   "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
//   "Ladakh", "Lakshadweep", "Puducherry"
// ];

// const DAYS_LIST = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// const EMPLOYEE_RANGES = ["1-10", "11-25", "26-50", "51-100", "100+"];

// // ===============================
// // State Search Input Component
// // ===============================
// const StateSearchInput = ({ placeholder, onSelectState, zIndex = 20, value }) => {
//   const [searchTerm, setSearchTerm] = useState(value || "");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const isSelectingRef = useRef(false);

//   useEffect(() => {
//     setSearchTerm(value || "");
//   }, [value]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleInputChange = (e) => {
//     const val = e.target.value;
//     setSearchTerm(val);
//     onSelectState(val);

//     if (val.trim().length > 0) {
//       const filtered = INDIAN_STATES.filter((state) =>
//         state.toLowerCase().includes(val.toLowerCase())
//       );
//       setSuggestions(filtered);
//       setIsOpen(true);
//     } else {
//       setSuggestions([]);
//       setIsOpen(false);
//     }
//   };

//   const handleSelect = (stateName) => {
//     isSelectingRef.current = true;
//     setSearchTerm(stateName);
//     setSuggestions([]);
//     setIsOpen(false);
//     onSelectState(stateName);
//     setTimeout(() => {
//       isSelectingRef.current = false;
//     }, 100);
//   };

//   return (
//     <div ref={dropdownRef} className="relative w-full" style={{ zIndex }}>
//       <div className="relative flex items-center">
//         <MapIcon size={15} className="absolute left-3 text-slate-400" />
//         <input
//           type="text"
//           value={searchTerm}
//           placeholder={placeholder}
//           onFocus={() => {
//             if (searchTerm.trim().length > 0 && !isSelectingRef.current) {
//               const filtered = INDIAN_STATES.filter((state) =>
//                 state.toLowerCase().includes(searchTerm.toLowerCase())
//               );
//               setSuggestions(filtered);
//               setIsOpen(true);
//             }
//           }}
//           onChange={handleInputChange}
//           className="w-full bg-white border border-[#cbd5e1] rounded-[6px] pl-9 pr-3 py-[8px] text-[#0f172a] text-[13px] outline-none focus:border-[#0891b2] transition-colors"
//           required
//         />
//       </div>

//       {isOpen && suggestions.length > 0 && (
//         <ul className="absolute top-full left-0 right-0 bg-white border border-[#e2e8f0] shadow-lg rounded-[6px] mt-1 max-h-48 overflow-y-auto z-50 list-none m-0 p-0">
//           {suggestions.map((state, i) => (
//             <li
//               key={i}
//               onMouseDown={(e) => {
//                 e.preventDefault();
//                 handleSelect(state);
//               }}
//               className="px-3 py-2 cursor-pointer hover:bg-slate-50 text-[13px] font-medium text-slate-700 border-b border-slate-100 last:border-b-0"
//             >
//               {state}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// // ===============================
// // Location/City Search Input Component
// // ===============================
// const LocationSearchInput = ({ placeholder, onSelectLocation, zIndex = 10, value }) => {
//   const [searchTerm, setSearchTerm] = useState(value || "");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const dropdownRef = useRef(null);
//   const isSelectingRef = useRef(false);

//   useEffect(() => {
//     setSearchTerm(value || "");
//   }, [value]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (isSelectingRef.current) return;

//     const timer = setTimeout(() => {
//       if (searchTerm.trim().length >= 2) {
//         setLoading(true);
//         axios
//           .get(`https://rodio-tradelink.onrender.com/api/location/search?query=${searchTerm}`)
//           .then((res) => {
//             if (res.data?.success) {
//               setSuggestions(res.data.data || []);
//               setIsOpen(true);
//             }
//           })
//           .catch((err) => console.error("City search error:", err))
//           .finally(() => setLoading(false));
//       } else {
//         setSuggestions([]);
//         setIsOpen(false);
//       }
//     }, 250);

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   const handleSelect = (item) => {
//     isSelectingRef.current = true;
//     setSearchTerm(item.name);
//     setSuggestions([]);
//     setIsOpen(false);
//     onSelectLocation(item);
//     setTimeout(() => {
//       isSelectingRef.current = false;
//     }, 100);
//   };

//   return (
//     <div ref={dropdownRef} className="relative w-full" style={{ zIndex }}>
//       <div className="relative flex items-center">
//         <MapPin size={15} className="absolute left-3 text-slate-400" />
//         <input
//           type="text"
//           value={searchTerm}
//           placeholder={placeholder}
//           onChange={(e) => {
//             isSelectingRef.current = false;
//             setSearchTerm(e.target.value);
//           }}
//           className="w-full bg-white border border-[#cbd5e1] rounded-[6px] pl-9 pr-8 py-[8px] text-[#0f172a] text-[13px] outline-none focus:border-[#0891b2] transition-colors"
//           required
//         />
//         {loading && (
//           <Loader2 size={13} className="absolute right-3 text-slate-400 animate-spin" />
//         )}
//       </div>

//       {isOpen && suggestions.length > 0 && (
//         <ul className="absolute top-full left-0 right-0 bg-white border border-[#e2e8f0] shadow-lg rounded-[6px] mt-1 max-h-48 overflow-y-auto z-50 list-none m-0 p-0">
//           {suggestions.map((item, i) => (
//             <li
//               key={item._id || i}
//               onMouseDown={(e) => {
//                 e.preventDefault();
//                 handleSelect(item);
//               }}
//               className="px-3 py-2 cursor-pointer hover:bg-slate-50 text-[13px] flex justify-between items-center border-b border-slate-100 last:border-b-0"
//             >
//               <span className="font-medium text-slate-800">
//                 {item.name}, <span className="text-slate-400 text-xs">{item.state}</span>
//               </span>
//               <span className="text-[11px] bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded font-semibold">
//                 Select
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// // ===============================
// // Main FirmDetails Component
// // ===============================
// const FirmDetails = ({ profileData, onUpdateSuccess }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     firmName: "",
//     address: "",
//     currentCity: "",
//     currentState: "",
//     pincode: "",
//     addresses: [""],
//     landlineNumbers: [""],
//     website: "",
//     employeeRange: "",
//     workingHoursStart: "",
//     workingHoursEnd: "",
//     officeWorkingDays: [],
//     workingAreas: [{ state: "", cities: [""] }],
//   });

//   useEffect(() => {
//     if (profileData) {
//       setFormData({
//         firmName: profileData.firmName || "",
//         address: profileData.address || "",
//         currentCity: profileData.currentCity || "",
//         currentState: profileData.currentState || "",
//         pincode: profileData.pincode || "",
//         addresses:
//           Array.isArray(profileData.addresses) && profileData.addresses.length > 0
//             ? profileData.addresses
//             : [""],
//         landlineNumbers:
//           Array.isArray(profileData.landlineNumbers) && profileData.landlineNumbers.length > 0
//             ? profileData.landlineNumbers
//             : [""],
//         website: profileData.website || "",
//         employeeRange: profileData.employeeRange || "",
//         workingHoursStart: profileData.officeWorkingHours?.start || "",
//         workingHoursEnd: profileData.officeWorkingHours?.end || "",
//         officeWorkingDays: Array.isArray(profileData.officeWorkingDays)
//           ? profileData.officeWorkingDays
//           : [],
//         workingAreas:
//           Array.isArray(profileData.workingAreas) && profileData.workingAreas.length > 0
//             ? profileData.workingAreas.map((item) => ({
//                 state: item.state || "",
//                 cities: Array.isArray(item.cities) && item.cities.length > 0 ? item.cities : [""],
//               }))
//             : [{ state: "", cities: [""] }],
//       });
//     }
//   }, [profileData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Addresses
//   const handleAddressChange = (index, value) => {
//     const updated = [...formData.addresses];
//     updated[index] = value;
//     setFormData({ ...formData, addresses: updated });
//   };
//   const addAddress = () => {
//     setFormData({ ...formData, addresses: [...formData.addresses, ""] });
//   };
//   const removeAddress = (index) => {
//     const updated = formData.addresses.filter((_, i) => i !== index);
//     setFormData({ ...formData, addresses: updated.length > 0 ? updated : [""] });
//   };

//   // Landlines
//   const handleLandlineChange = (index, value) => {
//     const updated = [...formData.landlineNumbers];
//     updated[index] = value;
//     setFormData({ ...formData, landlineNumbers: updated });
//   };
//   const addLandline = () => {
//     setFormData({ ...formData, landlineNumbers: [...formData.landlineNumbers, ""] });
//   };
//   const removeLandline = (index) => {
//     const updated = formData.landlineNumbers.filter((_, i) => i !== index);
//     setFormData({ ...formData, landlineNumbers: updated.length > 0 ? updated : [""] });
//   };

//   // Working Days
//   const toggleWorkingDay = (day) => {
//     if (!isEditing) return;
//     const exists = formData.officeWorkingDays.includes(day);
//     setFormData({
//       ...formData,
//       officeWorkingDays: exists
//         ? formData.officeWorkingDays.filter((d) => d !== day)
//         : [...formData.officeWorkingDays, day],
//     });
//   };

//   // Dynamic Working Areas Form Handlers
//   const handleStateChange = (index, value) => {
//     const updated = [...formData.workingAreas];
//     updated[index].state = value;
//     setFormData({ ...formData, workingAreas: updated });
//   };

//   const handleCitySelect = (areaIndex, cityIndex, selectedLocation) => {
//     const updated = [...formData.workingAreas];
//     updated[areaIndex].cities[cityIndex] = selectedLocation.name;

//     if (!updated[areaIndex].state && selectedLocation.state) {
//       updated[areaIndex].state = selectedLocation.state;
//     }

//     setFormData({ ...formData, workingAreas: updated });
//   };

//   const addWorkingArea = () => {
//     setFormData({
//       ...formData,
//       workingAreas: [...formData.workingAreas, { state: "", cities: [""] }],
//     });
//   };

//   const removeWorkingArea = (index) => {
//     const updated = [...formData.workingAreas];
//     updated.splice(index, 1);
//     setFormData({
//       ...formData,
//       workingAreas: updated.length > 0 ? updated : [{ state: "", cities: [""] }],
//     });
//   };

//   const addCity = (index) => {
//     const updated = [...formData.workingAreas];
//     updated[index].cities.push("");
//     setFormData({ ...formData, workingAreas: updated });
//   };

//   const removeCity = (areaIndex, cityIndex) => {
//     const updated = [...formData.workingAreas];
//     updated[areaIndex].cities.splice(cityIndex, 1);
//     if (updated[areaIndex].cities.length === 0) {
//       updated[areaIndex].cities.push("");
//     }
//     setFormData({ ...formData, workingAreas: updated });
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();

//     if (!formData.firmName.trim()) {
//       toast.error("Firm / Company Name is required", { id: "firm-name-error" });
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");

//       const payload = {
//         firmName: formData.firmName,
//         address: formData.address,
//         currentCity: formData.currentCity,
//         currentState: formData.currentState,
//         pincode: formData.pincode,
//         website: formData.website,
//         employeeRange: formData.employeeRange,
//         addresses: formData.addresses.map((a) => a.trim()).filter(Boolean),
//         landlineNumbers: formData.landlineNumbers.map((l) => l.trim()).filter(Boolean),
//         officeWorkingHours: {
//           start: formData.workingHoursStart,
//           end: formData.workingHoursEnd,
//         },
//         officeWorkingDays: formData.officeWorkingDays,
//         workingAreas: formData.workingAreas
//           .filter((item) => item.state.trim() !== "")
//           .map((item) => ({
//             state: item.state.trim(),
//             cities: item.cities.filter((c) => c.trim() !== "").map((c) => c.trim()),
//           })),
//       };

//       const res = await axios.put(
//         "https://rodio-tradelink.onrender.com/api/profile",
//         payload,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success) {
//         toast.success("Firm details updated successfully!", { id: "firm-update-success" });
//         setIsEditing(false);
//         if (onUpdateSuccess) onUpdateSuccess(res.data.profile);
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to update firm details", {
//         id: "firm-update-error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     if (profileData) {
//       setFormData({
//         firmName: profileData.firmName || "",
//         address: profileData.address || "",
//         currentCity: profileData.currentCity || "",
//         currentState: profileData.currentState || "",
//         pincode: profileData.pincode || "",
//         addresses:
//           Array.isArray(profileData.addresses) && profileData.addresses.length > 0
//             ? profileData.addresses
//             : [""],
//         landlineNumbers:
//           Array.isArray(profileData.landlineNumbers) && profileData.landlineNumbers.length > 0
//             ? profileData.landlineNumbers
//             : [""],
//         website: profileData.website || "",
//         employeeRange: profileData.employeeRange || "",
//         workingHoursStart: profileData.officeWorkingHours?.start || "",
//         workingHoursEnd: profileData.officeWorkingHours?.end || "",
//         officeWorkingDays: Array.isArray(profileData.officeWorkingDays)
//           ? profileData.officeWorkingDays
//           : [],
//         workingAreas:
//           Array.isArray(profileData.workingAreas) && profileData.workingAreas.length > 0
//             ? profileData.workingAreas.map((item) => ({
//                 state: item.state || "",
//                 cities: Array.isArray(item.cities) && item.cities.length > 0 ? item.cities : [""],
//               }))
//             : [{ state: "", cities: [""] }],
//       });
//     }
//     setIsEditing(false);
//   };

//   return (
//     <div className="bg-white rounded-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-[#e2e8f0] mb-[20px] overflow-hidden">
//       {/* Header Bar */}
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         className={`flex justify-between items-center px-[20px] py-[16px] bg-[#f8fafc] cursor-pointer ${
//           isOpen ? "border-b border-[#e2e8f0]" : ""
//         }`}
//       >
//         <div className="flex items-center gap-[12px]">
//           <div className="w-[40px] h-[40px] rounded-[10px] bg-[#0891b2] text-white flex items-center justify-center font-bold text-[15px]">
//             FD
//           </div>
//           <div>
//             <h3 className="m-0 text-[16px] font-bold text-[#1e293b]">Firm Details</h3>
//             <p className="m-0 text-[12px] text-[#64748b]">
//               Company address, operations & office timing
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-[8px]">
//           <span className="text-[12px] font-semibold text-[#0891b2] bg-[#ecfeff] px-[10px] py-[4px] rounded-[20px]">
//             {isOpen ? "Collapse" : "Open"}
//           </span>
//           <span className="text-[14px] text-[#64748b]">{isOpen ? "▲" : "▼"}</span>
//         </div>
//       </div>

//       {/* Content Area */}
//       {isOpen && (
//         <div className="p-[24px]">
//           {!isEditing ? (
//             /* ================= READ-ONLY VIEW ================= */
//             <div>
//               <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[16px] mb-[20px]">
//                 {/* Firm Name */}
//                 <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
//                   <span className="block text-[11px] font-bold text-[#64748b] uppercase">
//                     Firm / Company Name
//                   </span>
//                   <span className="text-[14px] font-semibold text-[#0f172a]">
//                     {formData.firmName || <span className="text-[#94a3b8]">Not Added</span>}
//                   </span>
//                 </div>

//                 {/* Website */}
//                 <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
//                   <span className="block text-[11px] font-bold text-[#64748b] uppercase">
//                     Website
//                   </span>
//                   {formData.website ? (
//                     <a
//                       href={formData.website}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-[14px] font-semibold text-[#2563eb] underline"
//                     >
//                       {formData.website}
//                     </a>
//                   ) : (
//                     <span className="text-[#94a3b8] text-[14px]">Not Added</span>
//                   )}
//                 </div>

//                 {/* Employee Count */}
//                 <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
//                   <span className="block text-[11px] font-bold text-[#64748b] uppercase">
//                     Total Employees
//                   </span>
//                   <span className="text-[14px] font-semibold text-[#0f172a]">
//                     {formData.employeeRange ? `${formData.employeeRange} Employees` : <span className="text-[#94a3b8]">Not Specified</span>}
//                   </span>
//                 </div>

//                 {/* Working Hours */}
//                 <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
//                   <span className="block text-[11px] font-bold text-[#64748b] uppercase">
//                     Working Hours
//                   </span>
//                   <span className="text-[14px] font-semibold text-[#0f172a]">
//                     {formData.workingHoursStart && formData.workingHoursEnd
//                       ? `${formData.workingHoursStart} to ${formData.workingHoursEnd}`
//                       : <span className="text-[#94a3b8]">Not Set</span>}
//                   </span>
//                 </div>

//                 {/* Primary Address */}
//                 <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0] col-span-full">
//                   <span className="block text-[11px] font-bold text-[#64748b] uppercase">
//                     Registered Primary Address
//                   </span>
//                   <span className="text-[14px] font-semibold text-[#0f172a]">
//                     {formData.address ? `${formData.address}, ${formData.currentCity}, ${formData.currentState} - ${formData.pincode}` : <span className="text-[#94a3b8]">Not Added</span>}
//                   </span>
//                 </div>

//                 {/* Additional Addresses */}
//                 <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0] col-span-full">
//                   <span className="block text-[11px] font-bold text-[#64748b] uppercase mb-[6px]">
//                     Branch / Alternate Addresses
//                   </span>
//                   <div className="flex flex-col gap-[6px]">
//                     {formData.addresses.filter(Boolean).length > 0 ? (
//                       formData.addresses.filter(Boolean).map((addr, idx) => (
//                         <div key={idx} className="text-[13px] font-medium text-[#334155]">
//                           🏢 {addr}
//                         </div>
//                       ))
//                     ) : (
//                       <span className="text-[#94a3b8] text-[13px]">No Alternate Addresses</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Landline Numbers */}
//                 <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
//                   <span className="block text-[11px] font-bold text-[#64748b] uppercase mb-[6px]">
//                     Landline Numbers
//                   </span>
//                   <div className="flex flex-wrap gap-[6px]">
//                     {formData.landlineNumbers.filter(Boolean).length > 0 ? (
//                       formData.landlineNumbers.filter(Boolean).map((l, idx) => (
//                         <span key={idx} className="bg-[#e2e8f0] px-[8px] py-[2px] rounded-[4px] text-[13px] font-semibold">
//                           ☎️ {l}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-[#94a3b8] text-[13px]">Not Added</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Working Days */}
//                 <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
//                   <span className="block text-[11px] font-bold text-[#64748b] uppercase mb-[6px]">
//                     Working Days
//                   </span>
//                   <div className="flex flex-wrap gap-[4px]">
//                     {formData.officeWorkingDays.length > 0 ? (
//                       formData.officeWorkingDays.map((d, idx) => (
//                         <span key={idx} className="bg-[#dbeafe] text-[#1e40af] px-[8px] py-[2px] rounded-[4px] text-[12px] font-semibold">
//                           {d}
//                         </span>
//                       ))
//                     ) : (
//                       <span className="text-[#94a3b8] text-[13px]">Not Added</span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Working Areas (Horizontal Excel Sheet Format) */}
//                 <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] col-span-full">
//                   <div className="flex justify-between items-center mb-[10px]">
//                     <span className="block text-[11px] font-bold text-[#64748b] uppercase">
//                       Working Areas Registry (State / City Matrix)
//                     </span>
//                     <span className="text-[11px] font-semibold text-[#0891b2] bg-[#ecfeff] px-[8px] py-[2px] rounded border border-[#cffafe]">
//                       {formData.workingAreas.filter((w) => w.state).length} States Connected
//                     </span>
//                   </div>

//                   {formData.workingAreas.filter((w) => w.state).length > 0 ? (
//                     <div className="overflow-x-auto border border-[#cbd5e1] rounded-[6px] bg-white">
//                       <table className="w-full text-left border-collapse">
//                         <thead>
//                           <tr className="bg-[#f1f5f9] border-b border-[#cbd5e1] text-[12px] text-[#475569] font-bold uppercase">
//                             <th className="p-[10px] w-[60px] border-r border-[#cbd5e1] text-center">#</th>
//                             <th className="p-[10px] w-[220px] border-r border-[#cbd5e1]">Operating State</th>
//                             <th className="p-[10px]">Assigned Cities / Operating Nodes</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {formData.workingAreas
//                             .filter((w) => w.state)
//                             .map((w, idx) => {
//                               const validCities = Array.isArray(w.cities)
//                                 ? w.cities.filter(Boolean)
//                                 : String(w.cities || "")
//                                     .split(",")
//                                     .map((c) => c.trim())
//                                     .filter(Boolean);

//                               return (
//                                 <tr
//                                   key={idx}
//                                   className="border-b border-[#e2e8f0] last:border-b-0 hover:bg-[#f8fafc] text-[13px]"
//                                 >
//                                   <td className="p-[10px] border-r border-[#cbd5e1] text-center font-bold text-[#64748b] bg-[#f8fafc]">
//                                     {idx + 1}
//                                   </td>
//                                   <td className="p-[10px] border-r border-[#cbd5e1] font-bold text-[#0f172a] whitespace-nowrap">
//                                     🗺️ {w.state}
//                                   </td>
//                                   <td className="p-[10px]">
//                                     <div className="flex flex-wrap gap-[6px]">
//                                       {validCities.length > 0 ? (
//                                         validCities.map((city, cIdx) => (
//                                           <span
//                                             key={cIdx}
//                                             className="bg-[#f1f5f9] border border-[#cbd5e1] text-[#334155] px-[8px] py-[2px] rounded-[4px] text-[12px] font-semibold"
//                                           >
//                                             {city}
//                                           </span>
//                                         ))
//                                       ) : (
//                                         <span className="text-[#94a3b8] italic text-[12px]">
//                                           All Cities Covered
//                                         </span>
//                                       )}
//                                     </div>
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                         </tbody>
//                       </table>
//                     </div>
//                   ) : (
//                     <span className="text-[#94a3b8] text-[13px]">No Working Areas Specified</span>
//                   )}
//                 </div>
//               </div>

//               {/* Edit Button */}
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(true)}
//                   className="flex items-center gap-[6px] bg-[#0891b2] text-white px-[20px] py-[10px] rounded-[8px] border-none font-semibold text-[14px] cursor-pointer"
//                 >
//                   ✏️ Edit Details
//                 </button>
//               </div>
//             </div>
//           ) : (
//             /* ================= EDIT FORM ================= */
//             <form onSubmit={handleSave}>
//               <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[16px] mb-[20px]">
//                 <div>
//                   <label className="block text-[12px] font-bold text-[#334155] mb-[6px]">
//                     Firm Name
//                   </label>
//                   <input
//                     type="text"
//                     name="firmName"
//                     value={formData.firmName}
//                     onChange={handleChange}
//                     className="w-full px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none box-border"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-[12px] font-bold text-[#334155] mb-[6px]">
//                     Website URL
//                   </label>
//                   <input
//                     type="text"
//                     name="website"
//                     value={formData.website}
//                     onChange={handleChange}
//                     placeholder="https://..."
//                     className="w-full px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none box-border"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-[12px] font-bold text-[#334155] mb-[6px]">
//                     Number of Employees
//                   </label>
//                   <select
//                     name="employeeRange"
//                     value={formData.employeeRange}
//                     onChange={handleChange}
//                     className="w-full px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none box-border bg-white"
//                   >
//                     <option value="">Select Range</option>
//                     {EMPLOYEE_RANGES.map((r) => (
//                       <option key={r} value={r}>
//                         {r} Employees
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-[12px] font-bold text-[#334155] mb-[6px]">
//                     Working Hours (Start - End)
//                   </label>
//                   <div className="flex gap-[8px]">
//                     <input
//                       type="time"
//                       name="workingHoursStart"
//                       value={formData.workingHoursStart}
//                       onChange={handleChange}
//                       className="flex-1 px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none"
//                     />
//                     <input
//                       type="time"
//                       name="workingHoursEnd"
//                       value={formData.workingHoursEnd}
//                       onChange={handleChange}
//                       className="flex-1 px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Primary Address */}
//               <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] mb-[16px]">
//                 <span className="block text-[13px] font-bold text-[#1e293b] mb-[10px]">
//                   Primary Address Details
//                 </span>
//                 <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[12px]">
//                   <input
//                     type="text"
//                     name="address"
//                     placeholder="Street / Behind Area"
//                     value={formData.address}
//                     onChange={handleChange}
//                     className="col-span-full px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
//                   />
//                   <input
//                     type="text"
//                     name="currentCity"
//                     placeholder="City"
//                     value={formData.currentCity}
//                     onChange={handleChange}
//                     className="px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
//                   />
//                   <input
//                     type="text"
//                     name="currentState"
//                     placeholder="State"
//                     value={formData.currentState}
//                     onChange={handleChange}
//                     className="px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
//                   />
//                   <input
//                     type="text"
//                     name="pincode"
//                     placeholder="Pincode"
//                     value={formData.pincode}
//                     onChange={handleChange}
//                     className="px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
//                   />
//                 </div>
//               </div>

//               {/* Alternate Addresses */}
//               <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] mb-[16px]">
//                 <div className="flex justify-between items-center mb-[10px]">
//                   <span className="text-[13px] font-bold text-[#1e293b]">
//                     Branch / Alternate Addresses
//                   </span>
//                   <button
//                     type="button"
//                     onClick={addAddress}
//                     className="bg-[#0284c7] text-white border-none rounded-[6px] px-[12px] py-[6px] text-[12px] font-semibold cursor-pointer"
//                   >
//                     + Add Address
//                   </button>
//                 </div>
//                 {formData.addresses.map((addr, idx) => (
//                   <div key={idx} className="flex gap-[8px] mb-[8px]">
//                     <input
//                       type="text"
//                       placeholder={`Alternate Address ${idx + 1}`}
//                       value={addr}
//                       onChange={(e) => handleAddressChange(idx, e.target.value)}
//                       className="flex-1 px-[12px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
//                     />
//                     {formData.addresses.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeAddress(idx)}
//                         className="bg-[#ef4444] text-white border-none rounded-[6px] px-[12px] py-0 cursor-pointer text-[14px]"
//                       >
//                         ✕
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Landline Numbers */}
//               <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] mb-[16px]">
//                 <div className="flex justify-between items-center mb-[10px]">
//                   <span className="text-[13px] font-bold text-[#1e293b]">Office Landline Numbers</span>
//                   <button
//                     type="button"
//                     onClick={addLandline}
//                     className="bg-[#0284c7] text-white border-none rounded-[6px] px-[12px] py-[6px] text-[12px] font-semibold cursor-pointer"
//                   >
//                     + Add Landline
//                   </button>
//                 </div>
//                 {formData.landlineNumbers.map((num, idx) => (
//                   <div key={idx} className="flex gap-[8px] mb-[8px]">
//                     <input
//                       type="text"
//                       placeholder="e.g. 0731-2456789"
//                       value={num}
//                       onChange={(e) => handleLandlineChange(idx, e.target.value)}
//                       className="flex-1 px-[12px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
//                     />
//                     {formData.landlineNumbers.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeLandline(idx)}
//                         className="bg-[#ef4444] text-white border-none rounded-[6px] px-[12px] py-0 cursor-pointer text-[14px]"
//                       >
//                         ✕
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* Working Days Multi-Select */}
//               <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] mb-[16px]">
//                 <span className="block text-[13px] font-bold text-[#1e293b] mb-[8px]">
//                   Office Working Days
//                 </span>
//                 <div className="flex flex-wrap gap-[8px]">
//                   {DAYS_LIST.map((day) => {
//                     const isSelected = formData.officeWorkingDays.includes(day);
//                     return (
//                       <button
//                         key={day}
//                         type="button"
//                         onClick={() => toggleWorkingDay(day)}
//                         className={`px-[14px] py-[6px] rounded-[6px] text-[13px] font-semibold cursor-pointer transition-all ${
//                           isSelected
//                             ? "bg-[#2563eb] text-white border border-[#2563eb]"
//                             : "bg-white text-[#334155] border border-[#cbd5e1]"
//                         }`}
//                       >
//                         {day}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Integrated Working Area Custom Component */}
//               <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] mb-[20px]">
//                 <div className="flex justify-between items-center mb-[12px]">
//                   <div>
//                     <span className="text-[13px] font-bold text-[#1e293b] block">
//                       Working Areas / State Zones
//                     </span>
//                     <span className="text-[11px] text-[#64748b]">
//                       Search state and specify operating city hubs
//                     </span>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={addWorkingArea}
//                     className="bg-[#0284c7] text-white border-none rounded-[6px] px-[12px] py-[6px] text-[12px] font-semibold cursor-pointer flex items-center gap-[4px]"
//                   >
//                     <Plus size={14} /> Add Another State
//                   </button>
//                 </div>

//                 <div className="space-y-[12px]">
//                   {formData.workingAreas.map((area, areaIndex) => (
//                     <div
//                       key={areaIndex}
//                       className="bg-white border border-[#cbd5e1] rounded-[8px] p-[12px] space-y-[10px]"
//                     >
//                       <div className="flex justify-between items-center pb-[6px] border-b border-[#e2e8f0]">
//                         <span className="text-[11px] font-bold text-[#64748b] uppercase">
//                           Zone #{areaIndex + 1}
//                         </span>
//                         {formData.workingAreas.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeWorkingArea(areaIndex)}
//                             className="text-[#ef4444] text-[12px] font-semibold flex items-center gap-[4px] cursor-pointer"
//                           >
//                             <Trash2 size={13} /> Remove Zone
//                           </button>
//                         )}
//                       </div>

//                       {/* State Auto-Search */}
//                       <div>
//                         <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
//                           State Name *
//                         </label>
//                         <StateSearchInput
//                           placeholder="Search or select state..."
//                           value={area.state}
//                           zIndex={40 - areaIndex}
//                           onSelectState={(name) => handleStateChange(areaIndex, name)}
//                         />
//                       </div>

//                       {/* Cities Auto-Search */}
//                       <div>
//                         <div className="flex justify-between items-center mb-[6px]">
//                           <label className="block text-[11px] font-bold text-[#475569] uppercase">
//                             Operating Cities / Hubs
//                           </label>
//                           <button
//                             type="button"
//                             onClick={() => addCity(areaIndex)}
//                             className="text-[#0891b2] text-[11px] font-bold flex items-center gap-[2px] cursor-pointer"
//                           >
//                             <Plus size={12} /> Add City
//                           </button>
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px]">
//                           {area.cities.map((city, cityIndex) => (
//                             <div key={cityIndex} className="flex gap-[6px] items-center">
//                               <LocationSearchInput
//                                 placeholder="Search city..."
//                                 value={city}
//                                 zIndex={30 - cityIndex}
//                                 onSelectLocation={(loc) =>
//                                   handleCitySelect(areaIndex, cityIndex, loc)
//                                 }
//                               />
//                               {area.cities.length > 1 && (
//                                 <button
//                                   type="button"
//                                   onClick={() => removeCity(areaIndex, cityIndex)}
//                                   className="p-[8px] text-[#94a3b8] hover:text-[#ef4444] border border-[#cbd5e1] rounded-[6px] bg-white cursor-pointer"
//                                 >
//                                   <Trash2 size={14} />
//                                 </button>
//                               )}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="flex justify-end gap-[10px]">
//                 <button
//                   type="button"
//                   onClick={handleCancel}
//                   disabled={loading}
//                   className="bg-[#f1f5f9] text-[#475569] border border-[#cbd5e1] px-[18px] py-[10px] rounded-[8px] font-semibold text-[14px] cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-[#16a34a] text-white border-none px-[22px] py-[10px] rounded-[8px] font-semibold text-[14px] cursor-pointer"
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

// export default FirmDetails;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Plus, Trash2, MapPin, Map as MapIcon, Loader2,FileText } from "lucide-react";

// ===============================
// List of Indian States for Autocomplete
// ===============================
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];

const DAYS_LIST = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const EMPLOYEE_RANGES = ["1-10", "11-25", "26-50", "51-100", "100+"];

// ===============================
// State Search Input Component
// ===============================
const StateSearchInput = ({ placeholder, onSelectState, zIndex = 20, value }) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isSelectingRef = useRef(false);

  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    onSelectState(val);

    if (val.trim().length > 0) {
      const filtered = INDIAN_STATES.filter((state) =>
        state.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelect = (stateName) => {
    isSelectingRef.current = true;
    setSearchTerm(stateName);
    setSuggestions([]);
    setIsOpen(false);
    onSelectState(stateName);
    setTimeout(() => {
      isSelectingRef.current = false;
    }, 100);
  };

  return (
    <div ref={dropdownRef} className="relative w-full" style={{ zIndex }}>
      <div className="relative flex items-center">
        <MapIcon size={15} className="absolute left-3 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onFocus={() => {
            if (searchTerm.trim().length > 0 && !isSelectingRef.current) {
              const filtered = INDIAN_STATES.filter((state) =>
                state.toLowerCase().includes(searchTerm.toLowerCase())
              );
              setSuggestions(filtered);
              setIsOpen(true);
            }
          }}
          onChange={handleInputChange}
          className="w-full bg-white border border-[#cbd5e1] rounded-[6px] pl-9 pr-3 py-[8px] text-[#0f172a] text-[13px] outline-none focus:border-[#0891b2] transition-colors"
          required
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-[#e2e8f0] shadow-lg rounded-[6px] mt-1 max-h-48 overflow-y-auto z-50 list-none m-0 p-0">
          {suggestions.map((state, i) => (
            <li
              key={i}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(state);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-slate-50 text-[13px] font-medium text-slate-700 border-b border-slate-100 last:border-b-0"
            >
              {state}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ===============================
// Location/City Search Input Component
// ===============================
const LocationSearchInput = ({ placeholder, onSelectLocation, zIndex = 10, value }) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const isSelectingRef = useRef(false);

  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSelectingRef.current) return;

    const timer = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        setLoading(true);
        axios
          .get(`https://rodio-tradelink.onrender.com/api/location/search?query=${searchTerm}`)
          .then((res) => {
            if (res.data?.success) {
              setSuggestions(res.data.data || []);
              setIsOpen(true);
            }
          })
          .catch((err) => console.error("City search error:", err))
          .finally(() => setLoading(false));
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSelect = (item) => {
    isSelectingRef.current = true;
    setSearchTerm(item.name);
    setSuggestions([]);
    setIsOpen(false);
    onSelectLocation(item);
    setTimeout(() => {
      isSelectingRef.current = false;
    }, 100);
  };

  return (
    <div ref={dropdownRef} className="relative w-full" style={{ zIndex }}>
      <div className="relative flex items-center">
        <MapPin size={15} className="absolute left-3 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onChange={(e) => {
            isSelectingRef.current = false;
            setSearchTerm(e.target.value);
          }}
          className="w-full bg-white border border-[#cbd5e1] rounded-[6px] pl-9 pr-8 py-[8px] text-[#0f172a] text-[13px] outline-none focus:border-[#0891b2] transition-colors"
          required
        />
        {loading && (
          <Loader2 size={13} className="absolute right-3 text-slate-400 animate-spin" />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-[#e2e8f0] shadow-lg rounded-[6px] mt-1 max-h-48 overflow-y-auto z-50 list-none m-0 p-0">
          {suggestions.map((item, i) => (
            <li
              key={item._id || i}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(item);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-slate-50 text-[13px] flex justify-between items-center border-b border-slate-100 last:border-b-0"
            >
              <span className="font-medium text-slate-800">
                {item.name}, <span className="text-slate-400 text-xs">{item.state}</span>
              </span>
              <span className="text-[11px] bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded font-semibold">
                Select
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ===============================
// Main FirmDetails Component
// ===============================
const FirmDetails = ({ profileData, onUpdateSuccess }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  const [formData, setFormData] = useState({
    firmName: "",
    address: "",
    currentCity: "",
    currentState: "",
    pincode: "",
    addresses: [""],
    landlineNumbers: [""],
    website: "",
    employeeRange: "",
    workingHoursStart: "",
    workingHoursEnd: "",
    officeWorkingDays: [],
    workingAreas: [{ state: "", cities: [""] }],
  });

  // Background status check without automatic redirection
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

  useEffect(() => {
    if (profileData) {
      setFormData({
        firmName: profileData.firmName || "",
        address: profileData.address || "",
        currentCity: profileData.currentCity || "",
        currentState: profileData.currentState || "",
        pincode: profileData.pincode || "",
        addresses:
          Array.isArray(profileData.addresses) && profileData.addresses.length > 0
            ? profileData.addresses
            : [""],
        landlineNumbers:
          Array.isArray(profileData.landlineNumbers) && profileData.landlineNumbers.length > 0
            ? profileData.landlineNumbers
            : [""],
        website: profileData.website || "",
        employeeRange: profileData.employeeRange || "",
        workingHoursStart: profileData.officeWorkingHours?.start || "",
        workingHoursEnd: profileData.officeWorkingHours?.end || "",
        officeWorkingDays: Array.isArray(profileData.officeWorkingDays)
          ? profileData.officeWorkingDays
          : [],
        workingAreas:
          Array.isArray(profileData.workingAreas) && profileData.workingAreas.length > 0
            ? profileData.workingAreas.map((item) => ({
                state: item.state || "",
                cities: Array.isArray(item.cities) && item.cities.length > 0 ? item.cities : [""],
              }))
            : [{ state: "", cities: [""] }],
      });
    }
  }, [profileData]);

  // Click on Header Bar handler
  const handleToggleOpen = () => {
    if (checkingSubscription) return;

    // Agar subscription active nahi hai toh warning toast dikhayein aur plan selection page par redirect karein
    if (!subscriptionActive) {
      toast.error("Please activate a plan to access Firm Details", {
        id: "sub-warning",
      });
      navigate("/dashboard/planselection");
      return;
    }

    setIsOpen((prev) => !prev);
  };

const handleEdit = () => {
  setIsEditing(true);

  setTimeout(() => {
    window.scrollTo({
      top: 500,
      behavior: "smooth",
    });
  }, 100);
};
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Addresses
  const handleAddressChange = (index, value) => {
    const updated = [...formData.addresses];
    updated[index] = value;
    setFormData({ ...formData, addresses: updated });
  };
  const addAddress = () => {
    setFormData({ ...formData, addresses: [...formData.addresses, ""] });
  };
  const removeAddress = (index) => {
    const updated = formData.addresses.filter((_, i) => i !== index);
    setFormData({ ...formData, addresses: updated.length > 0 ? updated : [""] });
  };

  // Landlines
  const handleLandlineChange = (index, value) => {
    const updated = [...formData.landlineNumbers];
    updated[index] = value;
    setFormData({ ...formData, landlineNumbers: updated });
  };
  const addLandline = () => {
    setFormData({ ...formData, landlineNumbers: [...formData.landlineNumbers, ""] });
  };
  const removeLandline = (index) => {
    const updated = formData.landlineNumbers.filter((_, i) => i !== index);
    setFormData({ ...formData, landlineNumbers: updated.length > 0 ? updated : [""] });
  };

  // Working Days
  const toggleWorkingDay = (day) => {
    if (!isEditing) return;
    const exists = formData.officeWorkingDays.includes(day);
    setFormData({
      ...formData,
      officeWorkingDays: exists
        ? formData.officeWorkingDays.filter((d) => d !== day)
        : [...formData.officeWorkingDays, day],
    });
  };

  // Dynamic Working Areas Form Handlers
  const handleStateChange = (index, value) => {
    const updated = [...formData.workingAreas];
    updated[index].state = value;
    setFormData({ ...formData, workingAreas: updated });
  };

  const handleCitySelect = (areaIndex, cityIndex, selectedLocation) => {
    const updated = [...formData.workingAreas];
    updated[areaIndex].cities[cityIndex] = selectedLocation.name;

    if (!updated[areaIndex].state && selectedLocation.state) {
      updated[areaIndex].state = selectedLocation.state;
    }

    setFormData({ ...formData, workingAreas: updated });
  };

  const addWorkingArea = () => {
    setFormData({
      ...formData,
      workingAreas: [...formData.workingAreas, { state: "", cities: [""] }],
    });
  };

  const removeWorkingArea = (index) => {
    const updated = [...formData.workingAreas];
    updated.splice(index, 1);
    setFormData({
      ...formData,
      workingAreas: updated.length > 0 ? updated : [{ state: "", cities: [""] }],
    });
  };

  const addCity = (index) => {
    const updated = [...formData.workingAreas];
    updated[index].cities.push("");
    setFormData({ ...formData, workingAreas: updated });
  };

  const removeCity = (areaIndex, cityIndex) => {
    const updated = [...formData.workingAreas];
    updated[areaIndex].cities.splice(cityIndex, 1);
    if (updated[areaIndex].cities.length === 0) {
      updated[areaIndex].cities.push("");
    }
    setFormData({ ...formData, workingAreas: updated });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!formData.firmName.trim()) {
      toast.error("Firm / Company Name is required", { id: "firm-name-error" });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const payload = {
        firmName: formData.firmName,
        address: formData.address,
        currentCity: formData.currentCity,
        currentState: formData.currentState,
        pincode: formData.pincode,
        website: formData.website,
        employeeRange: formData.employeeRange,
        addresses: formData.addresses.map((a) => a.trim()).filter(Boolean),
        landlineNumbers: formData.landlineNumbers.map((l) => l.trim()).filter(Boolean),
        officeWorkingHours: {
          start: formData.workingHoursStart,
          end: formData.workingHoursEnd,
        },
        officeWorkingDays: formData.officeWorkingDays,
        workingAreas: formData.workingAreas
          .filter((item) => item.state.trim() !== "")
          .map((item) => ({
            state: item.state.trim(),
            cities: item.cities.filter((c) => c.trim() !== "").map((c) => c.trim()),
          })),
      };

      const res = await axios.put(
        "https://rodio-tradelink.onrender.com/api/profile",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        toast.success("Firm details updated successfully!", { id: "firm-update-success" });
        setIsEditing(false);
        if (onUpdateSuccess) onUpdateSuccess(res.data.profile);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update firm details", {
        id: "firm-update-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (profileData) {
      setFormData({
        firmName: profileData.firmName || "",
        address: profileData.address || "",
        currentCity: profileData.currentCity || "",
        currentState: profileData.currentState || "",
        pincode: profileData.pincode || "",
        addresses:
          Array.isArray(profileData.addresses) && profileData.addresses.length > 0
            ? profileData.addresses
            : [""],
        landlineNumbers:
          Array.isArray(profileData.landlineNumbers) && profileData.landlineNumbers.length > 0
            ? profileData.landlineNumbers
            : [""],
        website: profileData.website || "",
        employeeRange: profileData.employeeRange || "",
        workingHoursStart: profileData.officeWorkingHours?.start || "",
        workingHoursEnd: profileData.officeWorkingHours?.end || "",
        officeWorkingDays: Array.isArray(profileData.officeWorkingDays)
          ? profileData.officeWorkingDays
          : [],
        workingAreas:
          Array.isArray(profileData.workingAreas) && profileData.workingAreas.length > 0
            ? profileData.workingAreas.map((item) => ({
                state: item.state || "",
                cities: Array.isArray(item.cities) && item.cities.length > 0 ? item.cities : [""],
              }))
            : [{ state: "", cities: [""] }],
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-[#e2e8f0] mb-[20px] overflow-hidden">
      {/* Header Bar */}
      <div
        onClick={handleToggleOpen}
        className={`flex justify-between items-center px-[20px] py-[16px] bg-[#f8fafc] cursor-pointer select-none transition-colors hover:bg-slate-100 ${
          isOpen ? "border-b border-[#e2e8f0]" : ""
        }`}
      >
        <div className="flex items-center gap-[12px]">
          <div className="w-[40px] h-[40px] rounded-[10px] bg-[#0891b2] text-white flex items-center justify-center">
  <FileText size={20} />
</div>
          <div>
            <h3 className="m-0 text-[16px] font-bold text-[#1e293b]">Firm Details</h3>
            <p className="m-0 text-[12px] text-[#64748b]">
              Company Name, address, operations & office timing
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[8px]">
          <span className="text-[12px] font-semibold text-[#0891b2] bg-[#ecfeff] px-[10px] py-[4px] rounded-[20px]">
            {isOpen ? "Collapse" : "Open"}
          </span>
          <span className="text-[14px] text-[#64748b]">{isOpen ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Content Area */}
      {isOpen && (
        <div className="p-[24px]">
          {!isEditing ? (
            /* ================= READ-ONLY VIEW ================= */
            <div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[16px] mb-[20px]">
                {/* Firm Name */}
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase">
                    Firm / Company Name
                  </span>
                  <span className="text-[14px] font-semibold text-[#0f172a]">
                    {formData.firmName || <span className="text-[#94a3b8]">Not Added</span>}
                  </span>
                </div>
                    {/* Primary Address */}
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0] col-span-full">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase">
                    Registered Primary Address
                  </span>
                  <span className="text-[14px] font-semibold text-[#0f172a]">
                    {formData.address ? `${formData.address}, ${formData.currentCity}, ${formData.currentState} - ${formData.pincode}` : <span className="text-[#94a3b8]">Not Added</span>}
                  </span>
                </div>

                {/* Additional Addresses */}
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0] col-span-full">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase mb-[6px]">
                    Branch / Alternate Addresses
                  </span>
                  <div className="flex flex-col gap-[6px]">
                    {formData.addresses.filter(Boolean).length > 0 ? (
                      formData.addresses.filter(Boolean).map((addr, idx) => (
                        <div key={idx} className="text-[13px] font-medium text-[#334155]">
                          🏢 {addr}
                        </div>
                      ))
                    ) : (
                      <span className="text-[#94a3b8] text-[13px]">No Alternate Addresses</span>
                    )}
                  </div>
                </div>
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase mb-[6px]">
                    Landline Numbers / Office Number
                  </span>
                  <div className="flex flex-wrap gap-[6px]">
                    {formData.landlineNumbers.filter(Boolean).length > 0 ? (
                      formData.landlineNumbers.filter(Boolean).map((l, idx) => (
                        <span key={idx} className="bg-[#e2e8f0] px-[8px] py-[2px] rounded-[4px] text-[13px] font-semibold">
                          ☎️ {l}
                        </span>
                      ))
                    ) : (
                      <span className="text-[#94a3b8] text-[13px]">Not Added</span>
                    )}
                  </div>
                </div>
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase mb-[6px]">
                    Working Days
                  </span>
                  <div className="flex flex-wrap gap-[4px]">
                    {formData.officeWorkingDays.length > 0 ? (
                      formData.officeWorkingDays.map((d, idx) => (
                        <span key={idx} className="bg-[#dbeafe] text-[#1e40af] px-[8px] py-[2px] rounded-[4px] text-[12px] font-semibold">
                          {d}
                        </span>
                      ))
                    ) : (
                      <span className="text-[#94a3b8] text-[13px]">Not Added</span>
                    )}
                  </div>
                </div>
                 {/* Working Hours */}
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase">
                    Working Hours
                  </span>
                  <span className="text-[14px] font-semibold text-[#0f172a]">
                    {formData.workingHoursStart && formData.workingHoursEnd
                      ? `${formData.workingHoursStart} to ${formData.workingHoursEnd}`
                      : <span className="text-[#94a3b8]">Not Set</span>}
                  </span>
                </div>
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase">
                    Total Employees
                  </span>
                  <span className="text-[14px] font-semibold text-[#0f172a]">
                    {formData.employeeRange ? `${formData.employeeRange} Employees` : <span className="text-[#94a3b8]"></span>}
                  </span>
                </div>


                {/* Website */}
                <div className="bg-[#f8fafc] p-[14px] rounded-[8px] border border-[#e2e8f0]">
                  <span className="block text-[11px] font-bold text-[#64748b] uppercase">
                    Website (If/Any)
                  </span>
                  {formData.website ? (
                    <a
                      href={formData.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[14px] font-semibold text-[#2563eb] underline"
                    >
                      {formData.website}
                    </a>
                  ) : (
                    <span className="text-[#94a3b8] text-[14px]">Not Added</span>
                  )}
                </div>

                {/* Employee Count */}
                

               
            

                {/* Landline Numbers */}
                

                {/* Working Days */}
                

                {/* Working Areas */}
                <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] col-span-full">
                  <div className=" p-5 rounded-[8px]   bg-[#eed97b] flex justify-between items-center mb-[10px]">
                    <span className="block text-[11px] font-bold text-[#64748b] uppercase">
                      Working Areas Registry (State / City Matrix)
                    </span>
                    <span className="text-[11px] font-semibold text-[#0891b2] bg-[#ecfeff] px-[8px] py-[2px] rounded border border-[#cffafe]">
                      {formData.workingAreas.filter((w) => w.state).length} States Connected
                    </span>
                  </div>

                  {formData.workingAreas.filter((w) => w.state).length > 0 ? (
                    <div className="overflow-x-auto border border-[#cbd5e1] rounded-[6px] bg-white">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#f1f5f9] border-b border-[#cbd5e1] text-[12px] text-[#475569] font-bold uppercase">
                            <th className="p-[10px] w-[60px] border-r border-[#cbd5e1] text-center">#</th>
                            <th className="p-[10px] w-[220px] border-r border-[#cbd5e1]">Operating State</th>
                            <th className="p-[10px]">Assigned Cities / Operating Nodes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formData.workingAreas
                            .filter((w) => w.state)
                            .map((w, idx) => {
                              const validCities = Array.isArray(w.cities)
                                ? w.cities.filter(Boolean)
                                : String(w.cities || "")
                                    .split(",")
                                    .map((c) => c.trim())
                                    .filter(Boolean);

                              return (
                                <tr
                                  key={idx}
                                  className="border-b border-[#e2e8f0] last:border-b-0 hover:bg-[#f8fafc] text-[13px]"
                                >
                                  <td className="p-[10px] border-r border-[#cbd5e1] text-center font-bold text-[#64748b] bg-[#f8fafc]">
                                    {idx + 1}
                                  </td>
                                  <td className="p-[10px] border-r border-[#cbd5e1] font-bold text-[#0f172a] whitespace-nowrap">
                                    🗺️ {w.state}
                                  </td>
                                  <td className="p-[10px]">
                                    <div className="flex flex-wrap gap-[6px]">
                                      {validCities.length > 0 ? (
                                        validCities.map((city, cIdx) => (
                                          <span
                                            key={cIdx}
                                            className="bg-[#f1f5f9] border border-[#cbd5e1] text-[#334155] px-[8px] py-[2px] rounded-[4px] text-[12px] font-semibold"
                                          >
                                            {city}
                                          </span>
                                        ))
                                      ) : (
                                        <span className="text-[#94a3b8] italic text-[12px]">
                                          All Cities Covered
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <span className="text-[#94a3b8] text-[13px]">No Working Areas Specified</span>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex items-center gap-[6px] bg-[#0891b2] text-white px-[20px] py-[10px] rounded-[8px] border-none font-semibold text-[14px] cursor-pointer"
                >
                  ✏️ Edit Details
                </button>
              </div>
            </div>
          ) : (
            /* ================= EDIT FORM ================= */
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[16px] mb-[20px]">
                <div>
                  <label className="block text-[12px] font-bold text-[#334155] mb-[6px]">
                    Firm Name
                  </label>
                  <input
                    type="text"
                    name="firmName"
                    value={formData.firmName}
                    onChange={handleChange}
                    className="w-full px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none box-border"
                  />
                </div>
                 <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] mb-[16px]">
                <span className="block text-[13px] font-bold text-[#1e293b] mb-[10px]">
                  Primary Address Details
                </span>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[12px]">
                  <input
                    type="text"
                    name="address"
                    placeholder="Street / Behind Area"
                    value={formData.address}
                    onChange={handleChange}
                    className="col-span-full px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
                  />
                  <input
                    type="text"
                    name="currentCity"
                    placeholder="City"
                    value={formData.currentCity}
                    onChange={handleChange}
                    className="px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
                  />
                  <input
                    type="text"
                    name="currentState"
                    placeholder="State"
                    value={formData.currentState}
                    onChange={handleChange}
                    className="px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
                  />
                </div>
              </div>

              {/* Alternate Addresses */}
              <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] mb-[16px]">
                <div className="flex justify-between items-center mb-[10px]">
                  <span className="text-[13px] font-bold text-[#1e293b]">
                    Branch / Alternate Addresses
                  </span>
                  <button
                    type="button"
                    onClick={addAddress}
                    className="bg-[#0284c7] text-white border-none rounded-[6px] px-[12px] py-[6px] text-[12px] font-semibold cursor-pointer"
                  >
                    + Add Address
                  </button>
                </div>
                {formData.addresses.map((addr, idx) => (
                  <div key={idx} className="flex gap-[8px] mb-[8px]">
                    <input
                      type="text"
                      placeholder={`Alternate Address ${idx + 1}`}
                      value={addr}
                      onChange={(e) => handleAddressChange(idx, e.target.value)}
                      className="flex-1 px-[12px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
                    />
                    {formData.addresses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAddress(idx)}
                        className="bg-[#ef4444] text-white border-none rounded-[6px] px-[12px] py-0 cursor-pointer text-[14px]"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Landline Numbers */}
              <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] mb-[16px]">
                <div className="flex justify-between items-center mb-[10px]">
                  <span className="text-[13px] font-bold text-[#1e293b]">Office Landline Numbers</span>
                  <button
                    type="button"
                    onClick={addLandline}
                    className="bg-[#0284c7] text-white border-none rounded-[6px] px-[12px] py-[6px] text-[12px] font-semibold cursor-pointer"
                  >
                    + Add Landline
                  </button>
                </div>
                {formData.landlineNumbers.map((num, idx) => (
                  <div key={idx} className="flex gap-[8px] mb-[8px]">
                    <input
                      type="text"
                      placeholder="e.g. 0731-2456789"
                      value={num}
                      onChange={(e) => handleLandlineChange(idx, e.target.value)}
                      className="flex-1 px-[12px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none bg-white"
                    />
                    {formData.landlineNumbers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLandline(idx)}
                        className="bg-[#ef4444] text-white border-none rounded-[6px] px-[12px] py-0 cursor-pointer text-[14px]"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Working Days Multi-Select */}
              <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] mb-[16px]">
                <span className="block text-[13px] font-bold text-[#1e293b] mb-[8px]">
                  Office Working Days
                </span>
                <div className="flex flex-wrap gap-[8px]">
                  {DAYS_LIST.map((day) => {
                    const isSelected = formData.officeWorkingDays.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleWorkingDay(day)}
                        className={`px-[14px] py-[6px] rounded-[6px] text-[13px] font-semibold cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[#2563eb] text-white border border-[#2563eb]"
                            : "bg-white text-[#334155] border border-[#cbd5e1]"
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
               <div>
                  <label className="block text-[12px] font-bold text-[#334155] mb-[6px]">
                    Working Hours (Start - End)
                  </label>
                  <div className="flex gap-[8px]">
                    <input
                      type="time"
                      name="workingHoursStart"
                      value={formData.workingHoursStart}
                      onChange={handleChange}
                      className="flex-1 px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none"
                    />
                    <input
                      type="time"
                      name="workingHoursEnd"
                      value={formData.workingHoursEnd}
                      onChange={handleChange}
                      className="flex-1 px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none"
                    />
                  </div>
                </div>
                 <div>
                  <label className="block text-[12px] font-bold text-[#334155] mb-[6px]">
                    Number of Employees
                  </label>
                  <select
                    name="employeeRange"
                    value={formData.employeeRange}
                    onChange={handleChange}
                    className="w-full px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none box-border bg-white"
                  >
                    <option value="">Select Range</option>
                    {EMPLOYEE_RANGES.map((r) => (
                      <option key={r} value={r}>
                        {r} Employees
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#334155] mb-[6px]">
                    Website URL
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-[12px] py-[10px] rounded-[6px] border border-[#cbd5e1] text-[14px] outline-none box-border"
                  />
                </div>

               

               
              </div>

              {/* Primary Address */}
             

              {/* Integrated Working Area Custom Component */}
              <div className="bg-[#f8fafc] p-[16px] rounded-[8px] border border-[#e2e8f0] mb-[20px]">
                <div className="flex justify-between items-center mb-[12px]">
                  <div>
                    <span className="text-[13px] font-bold text-[#1e293b] block">
                      Working Areas / State Zones
                    </span>
                    <span className="text-[11px] text-[#64748b]">
                      Search state and specify operating city hubs
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={addWorkingArea}
                    className="bg-[#0284c7] text-white border-none rounded-[6px] px-[12px] py-[6px] text-[12px] font-semibold cursor-pointer flex items-center gap-[4px]"
                  >
                    <Plus size={14} /> Add Another State
                  </button>
                </div>

                <div className="space-y-[12px]">
                  {formData.workingAreas.map((area, areaIndex) => (
                    <div
                      key={areaIndex}
                      className="bg-white border border-[#cbd5e1] rounded-[8px] p-[12px] space-y-[10px]"
                    >
                      <div className="flex justify-between items-center pb-[6px] border-b border-[#e2e8f0]">
                        <span className="text-[11px] font-bold text-[#64748b] uppercase">
                          Zone #{areaIndex + 1}
                        </span>
                        {formData.workingAreas.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeWorkingArea(areaIndex)}
                            className="text-[#ef4444] text-[12px] font-semibold flex items-center gap-[4px] cursor-pointer"
                          >
                            <Trash2 size={13} /> Remove Zone
                          </button>
                        )}
                      </div>

                      {/* State Auto-Search */}
                      <div>
                        <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
                          State Name *
                        </label>
                        <StateSearchInput
                          placeholder="Search or select state..."
                          value={area.state}
                          zIndex={40 - areaIndex}
                          onSelectState={(name) => handleStateChange(areaIndex, name)}
                        />
                      </div>

                      {/* Cities Auto-Search */}
                      <div>
                        <div className="flex justify-between items-center mb-[6px]">
                          <label className="block text-[11px] font-bold text-[#475569] uppercase">
                            Operating Cities / Hubs
                          </label>
                          <button
                            type="button"
                            onClick={() => addCity(areaIndex)}
                            className="text-[#0891b2] text-[11px] font-bold flex items-center gap-[2px] cursor-pointer"
                          >
                            <Plus size={12} /> Add City
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[8px]">
                          {area.cities.map((city, cityIndex) => (
                            <div key={cityIndex} className="flex gap-[6px] items-center">
                              <LocationSearchInput
                                placeholder="Search city..."
                                value={city}
                                zIndex={30 - cityIndex}
                                onSelectLocation={(loc) =>
                                  handleCitySelect(areaIndex, cityIndex, loc)
                                }
                              />
                              {area.cities.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeCity(areaIndex, cityIndex)}
                                  className="p-[8px] text-[#94a3b8] hover:text-[#ef4444] border border-[#cbd5e1] rounded-[6px] bg-white cursor-pointer"
                                >
                                  <Trash2 size={14} />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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

export default FirmDetails;