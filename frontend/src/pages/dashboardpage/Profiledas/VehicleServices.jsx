// // // import React, { useState } from "react";
// // // import axios from "axios";

// // // const VehicleServices = ({ profileData, onUpdateSuccess }) => {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     serviceType: profileData?.serviceType || "",
// // //     vehicleCount: profileData?.vehicleCount || "",
// // //     operatingRoutes: profileData?.operatingRoutes || "",
// // //   });

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const handleSave = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     try {
// // //       const token = localStorage.getItem("token");
// // //       const res = await axios.put(
// // //         "https://rodio-tradelink.onrender.com/api/profile",
// // //         formData,
// // //         { headers: { Authorization: `Bearer ${token}` } }
// // //       );
// // //       if (res.data.success) {
// // //         setIsEditing(false);
// // //         if (onUpdateSuccess) onUpdateSuccess(res.data.profile);
// // //       }
// // //     } catch (err) {
// // //       alert(err.response?.data?.message || "Update failed");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="border border-gray-300 rounded-lg shadow-sm mb-4 bg-white overflow-hidden">
// // //       <button
// // //         type="button"
// // //         onClick={() => setIsOpen(!isOpen)}
// // //         className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 font-semibold text-gray-800"
// // //       >
// // //         <span>Services / Vehicles</span>
// // //         <span>{isOpen ? "▲" : "▼"}</span>
// // //       </button>

// // //       {isOpen && (
// // //         <div className="p-4 border-t border-gray-200">
// // //           <form onSubmit={handleSave} className="space-y-4">
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700">Service / Vehicle Type</label>
// // //               <input
// // //                 type="text"
// // //                 name="serviceType"
// // //                 disabled={!isEditing}
// // //                 value={formData.serviceType}
// // //                 onChange={handleChange}
// // //                 placeholder="e.g. Full Truck Load, Container, Trailer"
// // //                 className="mt-1 w-full border border-gray-300 rounded-md p-2 disabled:bg-gray-100"
// // //               />
// // //             </div>
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700">Total Vehicles</label>
// // //               <input
// // //                 type="number"
// // //                 name="vehicleCount"
// // //                 disabled={!isEditing}
// // //                 value={formData.vehicleCount}
// // //                 onChange={handleChange}
// // //                 placeholder="e.g. 5"
// // //                 className="mt-1 w-full border border-gray-300 rounded-md p-2 disabled:bg-gray-100"
// // //               />
// // //             </div>
// // //             <div>
// // //               <label className="block text-sm font-medium text-gray-700">Operating Routes</label>
// // //               <input
// // //                 type="text"
// // //                 name="operatingRoutes"
// // //                 disabled={!isEditing}
// // //                 value={formData.operatingRoutes}
// // //                 onChange={handleChange}
// // //                 placeholder="e.g. All India / MP to Maharashtra"
// // //                 className="mt-1 w-full border border-gray-300 rounded-md p-2 disabled:bg-gray-100"
// // //               />
// // //             </div>

// // //             <div className="flex justify-end gap-2 pt-2">
// // //               {!isEditing ? (
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setIsEditing(true)}
// // //                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// // //                 >
// // //                   Edit
// // //                 </button>
// // //               ) : (
// // //                 <>
// // //                   <button
// // //                     type="button"
// // //                     onClick={() => setIsEditing(false)}
// // //                     className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
// // //                   >
// // //                     Cancel
// // //                   </button>
// // //                   <button
// // //                     type="submit"
// // //                     disabled={loading}
// // //                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
// // //                   >
// // //                     {loading ? "Saving..." : "Save"}
// // //                   </button>
// // //                 </>
// // //               )}
// // //             </div>
// // //           </form>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default VehicleServices;
// // import React, { useState, useEffect } from "react";
// // import { toast } from "react-toastify";
// // import {
// //   FaTruck,
// //   FaIdCard,
// //   FaWeightHanging,
// //   FaBoxes,
// //   FaTrash,
// //   FaEdit,
// //   FaPlus,
// //   FaTimes,
// //   FaSearch,
// //   FaShieldAlt,
// //   FaCheckCircle,
// // } from "react-icons/fa";
// // import API from "../../api/api";

// // const VEHICLE_CLASSIFICATIONS = [
// //   "Mini Truck", "Pickup", "Tata Ace", "Bolero Pickup", "Mahindra Jeeto",
// //   "Ashok Leyland Dost", "Tempo", "Canter", "Eicher", "Truck", "LCV", "HCV",
// //   "14 Feet Truck", "17 Feet Truck", "19 Feet Truck", "22 Feet Truck",
// //   "24 Feet Truck", "32 Feet Truck", "Open Body", "Closed Body",
// //   "20 Feet Container", "32 Feet Container", "Trailer", "Flat Bed Trailer",
// //   "Low Bed Trailer", "Semi Trailer", "Hydraulic Trailer", "Tipper",
// //   "Dumper", "Tanker", "Water Tanker", "Fuel Tanker", "Cement Bulker",
// //   "Refrigerated Truck", "Car Carrier", "Bike Carrier", "Auto Carrier",
// //   "ODC Trailer", "Multi Axle Trailer", "Crane", "Hyva", "Transit Mixer"
// // ];

// // const VehicleServices = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [vehicles, setVehicles] = useState([]);
// //   const [filteredVehicles, setFilteredVehicles] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [filterType, setFilterType] = useState("All");

// //   // Add Vehicle Form View Toggle
// //   const [showAddForm, setShowAddForm] = useState(false);
// //   const [addLoading, setAddLoading] = useState(false);
// //   const [addForm, setAddForm] = useState({
// //     vehicleType: "",
// //     vehicleNumber: "",
// //     capacity: "",
// //     bodyType: "",
// //   });

// //   // Edit Modal State
// //   const [showModal, setShowModal] = useState(false);
// //   const [saving, setSaving] = useState(false);
// //   const [editForm, setEditForm] = useState({
// //     _id: "",
// //     vehicleType: "",
// //     vehicleNumber: "",
// //     capacity: "",
// //     bodyType: "",
// //   });

// //   // Fetch Vehicles
// //   const fetchVehicles = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await API.get("/vehicles/my");
// //       const list =
// //         res.data.data ||
// //         res.data.vehicles ||
// //         res.data.vehicle ||
// //         [];

// //       const validList = Array.isArray(list) ? list : [];
// //       setVehicles(validList);
// //       setFilteredVehicles(validList);
// //     } catch (err) {
// //       toast.error(
// //         err?.response?.data?.message || "Failed to load vehicles."
// //       );
// //       setVehicles([]);
// //       setFilteredVehicles([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (isOpen) {
// //       fetchVehicles();
// //     }
// //   }, [isOpen]);

// //   // Search & Filter
// //   useEffect(() => {
// //     let result = vehicles;

// //     if (filterType !== "All") {
// //       result = result.filter(
// //         (v) => v.vehicleType?.toLowerCase() === filterType.toLowerCase()
// //       );
// //     }

// //     if (searchQuery.trim() !== "") {
// //       const query = searchQuery.toLowerCase();
// //       result = result.filter(
// //         (v) =>
// //           v.vehicleNumber?.toLowerCase().includes(query) ||
// //           v.vehicleType?.toLowerCase().includes(query) ||
// //           v.bodyType?.toLowerCase().includes(query)
// //       );
// //     }

// //     setFilteredVehicles(result);
// //   }, [searchQuery, filterType, vehicles]);

// //   // Handle Add Vehicle Form Change
// //   const handleAddChange = (e) => {
// //     setAddForm({
// //       ...addForm,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   // Submit Add Vehicle
// //   const handleAddSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       setAddLoading(true);
// //       const response = await API.post("/vehicles", addForm);
// //       toast.success(response.data.message || "Vehicle added successfully");
// //       setAddForm({
// //         vehicleType: "",
// //         vehicleNumber: "",
// //         capacity: "",
// //         bodyType: "",
// //       });
// //       setShowAddForm(false);
// //       fetchVehicles();
// //     } catch (error) {
// //       toast.error(
// //         error?.response?.data?.message || "Failed to register vehicle"
// //       );
// //     } finally {
// //       setAddLoading(false);
// //     }
// //   };

// //   // Delete Vehicle
// //   const deleteVehicle = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this vehicle from your fleet?")) return;

// //     try {
// //       await API.delete(`/vehicles/${id}`);
// //       toast.success("Vehicle deleted successfully");
// //       setVehicles((prev) => prev.filter((item) => item._id !== id));
// //     } catch (err) {
// //       toast.error(err?.response?.data?.message || "Failed to delete vehicle");
// //     }
// //   };

// //   // Edit Vehicle Modal Open
// //   const openUpdate = (vehicle) => {
// //     setEditForm({
// //       _id: vehicle._id,
// //       vehicleType: vehicle.vehicleType || "",
// //       vehicleNumber: vehicle.vehicleNumber || "",
// //       capacity: vehicle.capacity || "",
// //       bodyType: vehicle.bodyType || "",
// //     });
// //     setShowModal(true);
// //   };

// //   const handleEditChange = (e) => {
// //     setEditForm({
// //       ...editForm,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   // Submit Edit Vehicle
// //   const updateVehicle = async (e) => {
// //     e.preventDefault();
// //     try {
// //       setSaving(true);
// //       await API.patch(`/vehicles/${editForm._id}`, {
// //         vehicleType: editForm.vehicleType,
// //         vehicleNumber: editForm.vehicleNumber,
// //         capacity: editForm.capacity,
// //         bodyType: editForm.bodyType,
// //       });

// //       toast.success("Vehicle details updated successfully");
// //       setShowModal(false);
// //       fetchVehicles();
// //     } catch (err) {
// //       toast.error(err?.response?.data?.message || "Failed to update vehicle");
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   return (
// //     <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-5 overflow-hidden transition-all duration-200">
      
// //       {/* Dropdown Accordion Header */}
// //       <button
// //         type="button"
// //         onClick={() => setIsOpen(!isOpen)}
// //         className="w-full flex justify-between items-center px-6 py-4 bg-slate-50/70 hover:bg-slate-100/80 transition-colors"
// //       >
// //         <div className="flex items-center space-x-3">
// //           <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
// //             <FaTruck />
// //           </div>
// //           <div className="text-left">
// //             <h3 className="font-semibold text-slate-800 text-base">
// //               Services / Vehicles
// //             </h3>
// //             <p className="text-xs text-slate-500">
// //               Fleet management, capacity specs & vehicle registration
// //             </p>
// //           </div>
// //         </div>

// //         <div className="flex items-center space-x-3">
// //           <span className="text-xs font-semibold bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100">
// //             {vehicles.length} Units
// //           </span>
// //           <span className="text-xs font-medium text-slate-500">
// //             {isOpen ? "Collapse ▲" : "Expand ▼"}
// //           </span>
// //         </div>
// //       </button>

// //       {/* Accordion Content Body */}
// //       {isOpen && (
// //         <div className="p-6 border-t border-slate-200 bg-slate-50/40">
          
// //           {/* Header Action Toolbar */}
// //           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
// //             <div>
// //               <h4 className="text-base font-bold text-slate-800">
// //                 Verified Fleet Portfolio
// //               </h4>
// //               <p className="text-xs text-slate-500">
// //                 Manage all operational commercial transport units
// //               </p>
// //             </div>

// //             <button
// //               type="button"
// //               onClick={() => setShowAddForm(!showAddForm)}
// //               className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all shadow-xs ${
// //                 showAddForm
// //                   ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
// //                   : "bg-blue-600 text-white hover:bg-blue-700"
// //               }`}
// //             >
// //               {showAddForm ? <FaTimes /> : <FaPlus />}
// //               {showAddForm ? "Close Add Form" : "Add New Vehicle"}
// //             </button>
// //           </div>

// //           {/* ======================================================== */}
// //           {/* ADD VEHICLE FORM SECTION (TOGGLED)                       */}
// //           {/* ======================================================== */}
// //           {showAddForm && (
// //             <div className="bg-white rounded-2xl border border-blue-200 shadow-sm p-6 mb-8 animate-fade-in">
// //               <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
// //                 <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
// //                   <FaPlus className="text-blue-600" />
// //                   Register New Fleet Unit
// //                 </div>
// //                 <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 flex items-center gap-1.5">
// //                   <FaShieldAlt /> Verified Entry
// //                 </span>
// //               </div>

// //               <form onSubmit={handleAddSubmit} className="space-y-4">
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   {/* Vehicle Type */}
// //                   <div>
// //                     <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
// //                       Vehicle Classification <span className="text-rose-500">*</span>
// //                     </label>
// //                     <select
// //                       name="vehicleType"
// //                       value={addForm.vehicleType}
// //                       onChange={handleAddChange}
// //                       required
// //                       className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
// //                     >
// //                       <option value="">Select Classification</option>
// //                       {VEHICLE_CLASSIFICATIONS.map((type) => (
// //                         <option key={type} value={type}>
// //                           {type}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>

// //                   {/* Vehicle Number */}
// //                   <div>
// //                     <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
// //                       Registration Number <span className="text-rose-500">*</span>
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="vehicleNumber"
// //                       value={addForm.vehicleNumber}
// //                       onChange={handleAddChange}
// //                       placeholder="e.g. RJ19AB1234"
// //                       required
// //                       className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono font-semibold uppercase text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:normal-case placeholder:font-normal"
// //                     />
// //                   </div>

// //                   {/* Capacity */}
// //                   <div>
// //                     <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
// //                       Load Capacity
// //                     </label>
// //                     <input
// //                       type="text"
// //                       name="capacity"
// //                       value={addForm.capacity}
// //                       onChange={handleAddChange}
// //                       placeholder="e.g. 20 Tons / 400 Boxes"
// //                       className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
// //                     />
// //                   </div>

// //                   {/* Body Type */}
// //                   <div>
// //                     <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
// //                       Body Configuration
// //                     </label>
// //                     <select
// //                       name="bodyType"
// //                       value={addForm.bodyType}
// //                       onChange={handleAddChange}
// //                       className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
// //                     >
// //                       <option value="">Select Configuration</option>
// //                       <option value="Open">Open</option>
// //                       <option value="Closed">Closed</option>
// //                       <option value="Container">Container</option>
// //                     </select>
// //                   </div>
// //                 </div>

// //                 <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
// //                   <button
// //                     type="button"
// //                     onClick={() => setShowAddForm(false)}
// //                     className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     disabled={addLoading}
// //                     className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-xl font-semibold text-xs shadow-sm transition-all disabled:opacity-50 flex items-center gap-2"
// //                   >
// //                     {addLoading ? "Enrolling..." : "Enroll Vehicle"}
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           )}

// //           {/* Search & Filter Toolbar */}
// //           <div className="bg-white rounded-xl border border-slate-200 p-3 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
// //             <div className="relative flex-1">
// //               <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
// //               <input
// //                 type="text"
// //                 placeholder="Search fleet by number, type, body..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600"
// //               />
// //             </div>

// //             <div className="flex items-center gap-1.5 overflow-x-auto">
// //               {["All", "Truck", "Trailer", "Container", "Pickup"].map((type) => (
// //                 <button
// //                   key={type}
// //                   onClick={() => setFilterType(type)}
// //                   className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
// //                     filterType === type
// //                       ? "bg-slate-900 text-white"
// //                       : "bg-slate-100 text-slate-600 hover:bg-slate-200"
// //                   }`}
// //                 >
// //                   {type}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* ======================================================== */}
// //           {/* VEHICLES GRID / LIST                                     */}
// //           {/* ======================================================== */}
// //           {loading ? (
// //             <div className="py-12 text-center text-slate-500 font-medium text-sm">
// //               Loading Fleet Units...
// //             </div>
// //           ) : filteredVehicles.length === 0 ? (
// //             <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
// //               <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center mx-auto mb-3">
// //                 <FaTruck size={20} />
// //               </div>
// //               <h5 className="font-bold text-slate-800 text-sm mb-1">
// //                 No Vehicles Found
// //               </h5>
// //               <p className="text-slate-500 text-xs max-w-sm mx-auto">
// //                 {searchQuery || filterType !== "All"
// //                   ? "No transport units match your active filter or search."
// //                   : "No fleet registered yet. Click 'Add New Vehicle' to create one."}
// //               </p>
// //             </div>
// //           ) : (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //               {filteredVehicles.map((vehicle) => (
// //                 <div
// //                   key={vehicle._id}
// //                   className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between hover:shadow-md transition-shadow"
// //                 >
// //                   <div>
// //                     <div className="flex items-start justify-between gap-2 mb-3">
// //                       <div>
// //                         <div className="flex items-center gap-1.5">
// //                           <h5 className="font-bold text-slate-900 text-sm">
// //                             {vehicle.vehicleType || "Commercial Unit"}
// //                           </h5>
// //                           <FaCheckCircle className="text-blue-600 text-[10px]" title="Verified Unit" />
// //                         </div>
// //                         <span className="inline-block bg-slate-100 text-slate-700 text-xs font-mono font-semibold px-2 py-0.5 rounded mt-1 border border-slate-200">
// //                           {vehicle.vehicleNumber || "N/A"}
// //                         </span>
// //                       </div>
// //                       <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs">
// //                         <FaTruck />
// //                       </div>
// //                     </div>

// //                     <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 mb-3 text-xs">
// //                       <div>
// //                         <span className="block text-[10px] uppercase font-semibold text-slate-400">Capacity</span>
// //                         <span className="font-medium text-slate-800">{vehicle.capacity || "Standard"}</span>
// //                       </div>
// //                       <div>
// //                         <span className="block text-[10px] uppercase font-semibold text-slate-400">Body Type</span>
// //                         <span className="font-medium text-slate-800">{vehicle.bodyType || "Standard"}</span>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Actions */}
// //                   <div className="flex items-center gap-2 pt-1">
// //                     <button
// //                       type="button"
// //                       onClick={() => openUpdate(vehicle)}
// //                       className="flex-1 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 hover:border-transparent py-1.5 rounded-lg font-semibold text-xs flex justify-center items-center gap-1.5 transition-colors"
// //                     >
// //                       <FaEdit /> Edit
// //                     </button>
// //                     <button
// //                       type="button"
// //                       onClick={() => deleteVehicle(vehicle._id)}
// //                       className="w-8 h-8 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 hover:border-transparent rounded-lg flex justify-center items-center transition-colors"
// //                       title="Delete Unit"
// //                     >
// //                       <FaTrash size={11} />
// //                     </button>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //         </div>
// //       )}

// //       {/* ======================================================== */}
// //       {/* EDIT MODAL POPUP                                         */}
// //       {/* ======================================================== */}
// //       {showModal && (
// //         <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex justify-center items-center z-50 p-4">
// //           <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 overflow-hidden">
            
// //             <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
// //               <div>
// //                 <h4 className="font-bold text-slate-900 text-base">
// //                   Update Fleet Unit
// //                 </h4>
// //                 <p className="text-xs text-slate-500">
// //                   License: {editForm.vehicleNumber}
// //                 </p>
// //               </div>
// //               <button
// //                 type="button"
// //                 onClick={() => setShowModal(false)}
// //                 className="w-7 h-7 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 flex items-center justify-center"
// //               >
// //                 <FaTimes size={12} />
// //               </button>
// //             </div>

// //             <form onSubmit={updateVehicle} className="p-6 space-y-4">
// //               <div>
// //                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
// //                   Classification
// //                 </label>
// //                 <select
// //                   name="vehicleType"
// //                   value={editForm.vehicleType}
// //                   onChange={handleEditChange}
// //                   className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800"
// //                 >
// //                   {VEHICLE_CLASSIFICATIONS.map((t) => (
// //                     <option key={t} value={t}>
// //                       {t}
// //                     </option>
// //                   ))}
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
// //                   Registration Number
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="vehicleNumber"
// //                   value={editForm.vehicleNumber}
// //                   onChange={handleEditChange}
// //                   className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-mono uppercase text-slate-800"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
// //                   Capacity
// //                 </label>
// //                 <input
// //                   type="text"
// //                   name="capacity"
// //                   value={editForm.capacity}
// //                   onChange={handleEditChange}
// //                   className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
// //                   Body Configuration
// //                 </label>
// //                 <select
// //                   name="bodyType"
// //                   value={editForm.bodyType}
// //                   onChange={handleEditChange}
// //                   className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800"
// //                 >
// //                   <option value="">Select Configuration</option>
// //                   <option value="Open">Open</option>
// //                   <option value="Closed">Closed</option>
// //                   <option value="Container">Container</option>
// //                 </select>
// //               </div>

// //               <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowModal(false)}
// //                   className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-semibold text-xs"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   disabled={saving}
// //                   className="flex-1 bg-slate-900 hover:bg-blue-600 text-white py-2.5 rounded-xl font-semibold text-xs disabled:opacity-50"
// //                 >
// //                   {saving ? "Saving..." : "Save Changes"}
// //                 </button>
// //               </div>
// //             </form>

// //           </div>
// //         </div>
// //       )}

// //     </div>
// //   );
// // };

// // export default ServicesVehicles;
// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import API from "../../../api/api";

// const VEHICLE_CLASSIFICATIONS = [
//   "Pickup / Auto",
//   "LCV",
//   "HCV / Truck",
//   "Container",
//   "Trailer",
//   "Crane / JCB",
//   "Hydra",
//   "Mining Vehicle",
// ];

// const VehicleServices = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [vehicles, setVehicles] = useState([]);
//   const [filteredVehicles, setFilteredVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterType, setFilterType] = useState("All");

//   // Add Vehicle Form View Toggle
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [addLoading, setAddLoading] = useState(false);
//   const [addForm, setAddForm] = useState({
//     vehicleType: "",
//     capacity: "",
//     bodyType: "",
//   });

//   // Edit Modal State
//   const [showModal, setShowModal] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [editForm, setEditForm] = useState({
//     _id: "",
//     vehicleType: "",
//     capacity: "",
//     bodyType: "",
//   });

//   // Fetch Vehicles
//   const fetchVehicles = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/vehicles/my");
//       const list =
//         res.data?.data ||
//         res.data?.vehicles ||
//         res.data?.vehicle ||
//         [];

//       const validList = Array.isArray(list) ? list : [];
//       setVehicles(validList);
//       setFilteredVehicles(validList);
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to load vehicles", {
//         id: "vehicle-fetch-error",
//       });
//       setVehicles([]);
//       setFilteredVehicles([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       fetchVehicles();
//     }
//   }, [isOpen]);

//   // Search & Filter
//   useEffect(() => {
//     let result = vehicles;

//     if (filterType !== "All") {
//       result = result.filter(
//         (v) => v.vehicleType?.toLowerCase() === filterType.toLowerCase()
//       );
//     }

//     if (searchQuery.trim() !== "") {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(
//         (v) =>
//           v.vehicleType?.toLowerCase().includes(query) ||
//           v.bodyType?.toLowerCase().includes(query) ||
//           v.capacity?.toLowerCase().includes(query)
//       );
//     }

//     setFilteredVehicles(result);
//   }, [searchQuery, filterType, vehicles]);

//   // Handle Add Form Change
//   const handleAddChange = (e) => {
//     setAddForm({
//       ...addForm,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Submit Add Vehicle
//   const handleAddSubmit = async (e) => {
//     e.preventDefault();
//     if (!addForm.vehicleType) {
//       toast.error("Please select a vehicle classification", {
//         id: "vehicle-type-required",
//       });
//       return;
//     }

//     try {
//       setAddLoading(true);
//       const response = await API.post("/vehicles", addForm);
//       toast.success(response.data?.message || "Vehicle added successfully", {
//         id: "vehicle-add-success",
//       });
//       setAddForm({
//         vehicleType: "",
//         capacity: "",
//         bodyType: "",
//       });
//       setShowAddForm(false);
//       fetchVehicles();
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Failed to register vehicle", {
//         id: "vehicle-add-error",
//       });
//     } finally {
//       setAddLoading(false);
//     }
//   };

//   // Delete Vehicle
//   const deleteVehicle = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this vehicle entry?")) return;

//     try {
//       await API.delete(`/vehicles/${id}`);
//       toast.success("Vehicle deleted successfully", {
//         id: "vehicle-delete-success",
//       });
//       setVehicles((prev) => prev.filter((item) => item._id !== id));
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to delete vehicle", {
//         id: "vehicle-delete-error",
//       });
//     }
//   };

//   // Edit Vehicle Modal Open
//   const openUpdate = (vehicle) => {
//     setEditForm({
//       _id: vehicle._id,
//       vehicleType: vehicle.vehicleType || "",
//       capacity: vehicle.capacity || "",
//       bodyType: vehicle.bodyType || "",
//     });
//     setShowModal(true);
//   };

//   const handleEditChange = (e) => {
//     setEditForm({
//       ...editForm,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Submit Edit Vehicle
//   const updateVehicle = async (e) => {
//     e.preventDefault();
//     try {
//       setSaving(true);
//       await API.patch(`/vehicles/${editForm._id}`, {
//         vehicleType: editForm.vehicleType,
//         capacity: editForm.capacity,
//         bodyType: editForm.bodyType,
//       });

//       toast.success("Vehicle details updated successfully", {
//         id: "vehicle-update-success",
//       });
//       setShowModal(false);
//       fetchVehicles();
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Failed to update vehicle", {
//         id: "vehicle-update-error",
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-[#e2e8f0] mb-[20px] overflow-hidden">
//       {/* Accordion Header */}
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         className={`flex justify-between items-center px-[20px] py-[16px] bg-[#f8fafc] cursor-pointer ${
//           isOpen ? "border-b border-[#e2e8f0]" : ""
//         }`}
//       >
//         <div className="flex items-center gap-[12px]">
//           <div className="w-[40px] h-[40px] rounded-[10px] bg-[#4f46e5] text-white flex items-center justify-center font-bold text-[15px]">
//             SV
//           </div>
//           <div>
//             <h3 className="m-0 text-[16px] font-bold text-[#1e293b]">
//               Services / Vehicles
//             </h3>
//             <p className="m-0 text-[12px] text-[#64748b]">
//               Fleet management & transport service specifications
//             </p>
//           </div>
//         </div>

//         <div className="flex items-center gap-[8px]">
//           <span className="text-[12px] font-semibold text-[#4f46e5] bg-[#eef2ff] px-[10px] py-[4px] rounded-[20px]">
//             {vehicles.length} Units
//           </span>
//           <span className="text-[14px] text-[#64748b]">{isOpen ? "▲" : "▼"}</span>
//         </div>
//       </div>

//       {/* Accordion Body */}
//       {isOpen && (
//         <div className="p-[24px]">
//           {/* Header Action Bar */}
//           <div className="flex justify-between items-center mb-[16px] flex-wrap gap-[10px]">
//             <div>
//               <h4 className="m-0 text-[15px] font-bold text-[#0f172a]">
//                 Fleet Records
//               </h4>
//               <p className="m-0 text-[12px] text-[#64748b]">
//                 Overview of available vehicle types and body configurations
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => setShowAddForm(!showAddForm)}
//               className={`px-[16px] py-[8px] rounded-[8px] font-semibold text-[13px] text-white border-none cursor-pointer transition-colors ${
//                 showAddForm ? "bg-[#64748b] hover:bg-[#475569]" : "bg-[#4f46e5] hover:bg-[#4338ca]"
//               }`}
//             >
//               {showAddForm ? "✕ Close Form" : "+ Add Vehicle"}
//             </button>
//           </div>

//           {/* ================= ADD FORM ================= */}
//           {showAddForm && (
//             <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-[10px] p-[16px] mb-[20px]">
//               <h5 className="m-0 mb-[12px] text-[14px] font-bold text-[#1e293b]">
//                 Register New Vehicle Type
//               </h5>
//               <form onSubmit={handleAddSubmit}>
//                 <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[12px] mb-[16px]">
//                   <div>
//                     <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
//                       Vehicle Classification *
//                     </label>
//                     <select
//                       name="vehicleType"
//                       value={addForm.vehicleType}
//                       onChange={handleAddChange}
//                       required
//                       className="w-full px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] bg-white outline-none focus:border-[#4f46e5]"
//                     >
//                       <option value="">Select Classification</option>
//                       {VEHICLE_CLASSIFICATIONS.map((type) => (
//                         <option key={type} value={type}>
//                           {type}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
//                       Load Capacity
//                     </label>
//                     <input
//                       type="text"
//                       name="capacity"
//                       value={addForm.capacity}
//                       onChange={handleAddChange}
//                       placeholder="e.g. 20 Tons / 400 Boxes"
//                       className="w-full px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] bg-white outline-none focus:border-[#4f46e5] box-border"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
//                       Body Configuration
//                     </label>
//                     <select
//                       name="bodyType"
//                       value={addForm.bodyType}
//                       onChange={handleAddChange}
//                       className="w-full px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] bg-white outline-none focus:border-[#4f46e5]"
//                     >
//                       <option value="">Select Configuration</option>
//                       <option value="Open">Open</option>
//                       <option value="Closed">Closed</option>
//                       <option value="Container">Container</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="flex justify-end gap-[8px]">
//                   <button
//                     type="button"
//                     onClick={() => setShowAddForm(false)}
//                     className="bg-[#e2e8f0] text-[#334155] hover:bg-[#cbd5e1] border-none px-[14px] py-[8px] rounded-[6px] text-[13px] font-semibold cursor-pointer transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={addLoading}
//                     className="bg-[#16a34a] text-white hover:bg-[#15803d] border-none px-[18px] py-[8px] rounded-[6px] text-[13px] font-semibold cursor-pointer transition-colors disabled:opacity-50"
//                   >
//                     {addLoading ? "Saving..." : "Save Record"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           )}

//           {/* Search & Filter Bar */}
//           <div className="flex justify-between items-center gap-[10px] mb-[16px] flex-wrap">
//             <input
//               type="text"
//               placeholder="Search by vehicle type, body or capacity..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 min-w-[220px] px-[12px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] outline-none focus:border-[#4f46e5] bg-white"
//             />
//             <div className="flex gap-[6px] overflow-x-auto max-w-full pb-1">
//               {["All", ...VEHICLE_CLASSIFICATIONS].map((type) => (
//                 <button
//                   key={type}
//                   type="button"
//                   onClick={() => setFilterType(type)}
//                   className={`px-[12px] py-[6px] rounded-[6px] text-[12px] font-semibold whitespace-nowrap cursor-pointer transition-colors border ${
//                     filterType === type
//                       ? "border-[#4f46e5] bg-[#4f46e5] text-white"
//                       : "border-[#cbd5e1] bg-white text-[#475569] hover:bg-[#f1f5f9]"
//                   }`}
//                 >
//                   {type}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* ================= EXCEL SHEET / TABLE VIEW ================= */}
//           {loading ? (
//             <div className="text-center py-[30px] text-[#64748b] text-[14px]">
//               Loading Fleet Records...
//             </div>
//           ) : filteredVehicles.length === 0 ? (
//             <div className="text-center py-[30px] bg-[#f8fafc] rounded-[8px] border border-dashed border-[#cbd5e1] text-[#64748b] text-[13px]">
//               No vehicle records found.
//             </div>
//           ) : (
//             <div className="w-full overflow-x-auto border border-[#e2e8f0] rounded-[8px]">
//               <table className="w-full border-collapse text-left text-[13px]">
//                 <thead>
//                   <tr className="bg-[#f1f5f9] border-b border-[#e2e8f0] text-[#475569]">
//                     <th className="px-[14px] py-[10px] font-bold">#</th>
//                     <th className="px-[14px] py-[10px] font-bold">Vehicle Classification</th>
//                     <th className="px-[14px] py-[10px] font-bold">Load Capacity</th>
//                     <th className="px-[14px] py-[10px] font-bold">Body Configuration</th>
//                     <th className="px-[14px] py-[10px] font-bold text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredVehicles.map((v, index) => (
//                     <tr
//                       key={v._id || index}
//                       className={`border-b border-[#e2e8f0] last:border-b-0 ${
//                         index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
//                       } hover:bg-[#f1f5f9] transition-colors`}
//                     >
//                       <td className="px-[14px] py-[10px] text-[#64748b] font-semibold">
//                         {index + 1}
//                       </td>
//                       <td className="px-[14px] py-[10px] font-semibold text-[#0f172a]">
//                         {v.vehicleType || "-"}
//                       </td>
//                       <td className="px-[14px] py-[10px] text-[#334155]">
//                         {v.capacity || "Standard"}
//                       </td>
//                       <td className="px-[14px] py-[10px]">
//                         <span className="bg-[#e0e7ff] text-[#3730a3] px-[8px] py-[2px] rounded-[4px] text-[12px] font-semibold">
//                           {v.bodyType || "General"}
//                         </span>
//                       </td>
//                       <td className="px-[14px] py-[10px] text-right">
//                         <div className="inline-flex gap-[6px]">
//                           <button
//                             type="button"
//                             onClick={() => openUpdate(v)}
//                             className="bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] hover:bg-[#2563eb] hover:text-white px-[10px] py-[4px] rounded-[4px] text-[12px] font-semibold cursor-pointer transition-colors"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => deleteVehicle(v._id)}
//                             className="bg-[#fef2f2] text-[#dc2626] border border-[#fecaca] hover:bg-[#dc2626] hover:text-white px-[10px] py-[4px] rounded-[4px] text-[12px] font-semibold cursor-pointer transition-colors"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}

//       {/* ================= EDIT MODAL ================= */}
//       {showModal && (
//         <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] flex justify-center items-center z-[999] p-[16px]">
//           <div className="bg-white rounded-[12px] w-full max-w-[480px] overflow-hidden shadow-[0_20px_25px_-5px_rgba(0,0,0,0.2)] border border-[#e2e8f0]">
//             <div className="px-[20px] py-[14px] border-b border-[#e2e8f0] flex justify-between items-center bg-[#f8fafc]">
//               <h4 className="m-0 text-[15px] font-bold text-[#0f172a]">
//                 Edit Vehicle Details
//               </h4>
//               <button
//                 type="button"
//                 onClick={() => setShowModal(false)}
//                 className="bg-[#e2e8f0] hover:bg-[#cbd5e1] border-none rounded-[6px] px-[8px] py-[4px] cursor-pointer text-[12px] text-[#475569]"
//               >
//                 ✕
//               </button>
//             </div>

//             <form onSubmit={updateVehicle} className="p-[20px]">
//               <div className="mb-[14px]">
//                 <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
//                   Vehicle Classification
//                 </label>
//                 <select
//                   name="vehicleType"
//                   value={editForm.vehicleType}
//                   onChange={handleEditChange}
//                   className="w-full px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] bg-white outline-none focus:border-[#4f46e5]"
//                 >
//                   <option value="">Select Classification</option>
//                   {VEHICLE_CLASSIFICATIONS.map((t) => (
//                     <option key={t} value={t}>
//                       {t}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-[14px]">
//                 <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
//                   Load Capacity
//                 </label>
//                 <input
//                   type="text"
//                   name="capacity"
//                   value={editForm.capacity}
//                   onChange={handleEditChange}
//                   className="w-full px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] bg-white outline-none focus:border-[#4f46e5] box-border"
//                 />
//               </div>

//               <div className="mb-[20px]">
//                 <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
//                   Body Configuration
//                 </label>
//                 <select
//                   name="bodyType"
//                   value={editForm.bodyType}
//                   onChange={handleEditChange}
//                   className="w-full px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] bg-white outline-none focus:border-[#4f46e5]"
//                 >
//                   <option value="">Select Configuration</option>
//                   <option value="Open">Open</option>
//                   <option value="Closed">Closed</option>
//                   <option value="Container">Container</option>
//                 </select>
//               </div>

//               <div className="flex justify-end gap-[8px]">
//                 <button
//                   type="button"
//                   onClick={() => setShowModal(false)}
//                   className="bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#334155] border-none px-[14px] py-[8px] rounded-[6px] text-[13px] font-semibold cursor-pointer transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="bg-[#4f46e5] hover:bg-[#4338ca] text-white border-none px-[18px] py-[8px] rounded-[6px] text-[13px] font-semibold cursor-pointer transition-colors disabled:opacity-50"
//                 >
//                   {saving ? "Saving..." : "Save Modifications"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VehicleServices;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import API from "../../../api/api";
import { FaTruck } from "react-icons/fa";
const VEHICLE_CLASSIFICATIONS = [
  "Pickup / Auto",
  "LCV",
  "HCV / Truck",
  "Container",
  "Trailer",
  "Crane / JCB",
  "Hydra",
  "Mining Vehicle",
];

const VehicleServices = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Subscription verification state
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  // Add Vehicle Form View Toggle
  const [showAddForm, setShowAddForm] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addForm, setAddForm] = useState({
    vehicleType: "",
    capacity: "",
    bodyType: "",
  });

  // Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    _id: "",
    vehicleType: "",
    capacity: "",
    bodyType: "",
  });

  // Subscription check in background
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

  // Fetch Vehicles
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await API.get("/vehicles/my");
      const list =
        res.data?.data ||
        res.data?.vehicles ||
        res.data?.vehicle ||
        [];

      const validList = Array.isArray(list) ? list : [];
      setVehicles(validList);
      setFilteredVehicles(validList);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load vehicles", {
        id: "vehicle-fetch-error",
      });
      setVehicles([]);
      setFilteredVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchVehicles();
    }
  }, [isOpen]);

  // Search & Filter
  useEffect(() => {
    let result = vehicles;

    if (filterType !== "All") {
      result = result.filter(
        (v) => v.vehicleType?.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.vehicleType?.toLowerCase().includes(query) ||
          v.bodyType?.toLowerCase().includes(query) ||
          v.capacity?.toLowerCase().includes(query)
      );
    }

    setFilteredVehicles(result);
  }, [searchQuery, filterType, vehicles]);

  // Click on Header Bar handler
  const handleToggleOpen = () => {
    if (checkingSubscription) return;

    if (!subscriptionActive) {
      toast.error("Please activate a plan to access Services & Vehicles", {
        id: "sub-warning",
      });
      navigate("/dashboard/planselection");
      return;
    }

    setIsOpen((prev) => !prev);
  };

  // Handle Add Form Change
  const handleAddChange = (e) => {
    setAddForm({
      ...addForm,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Add Vehicle
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!addForm.vehicleType) {
      toast.error("Please select a vehicle classification", {
        id: "vehicle-type-required",
      });
      return;
    }

    try {
      setAddLoading(true);
      const response = await API.post("/vehicles", addForm);
      toast.success(response.data?.message || "Vehicle added successfully", {
        id: "vehicle-add-success",
      });
      setAddForm({
        vehicleType: "",
        capacity: "",
        bodyType: "",
      });
      setShowAddForm(false);
      fetchVehicles();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to register vehicle", {
        id: "vehicle-add-error",
      });
    } finally {
      setAddLoading(false);
    }
  };

  // Delete Vehicle
  const deleteVehicle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle entry?")) return;

    try {
      await API.delete(`/vehicles/${id}`);
      toast.success("Vehicle deleted successfully", {
        id: "vehicle-delete-success",
      });
      setVehicles((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete vehicle", {
        id: "vehicle-delete-error",
      });
    }
  };

  // Edit Vehicle Modal Open
  const openUpdate = (vehicle) => {
    setEditForm({
      _id: vehicle._id,
      vehicleType: vehicle.vehicleType || "",
      capacity: vehicle.capacity || "",
      bodyType: vehicle.bodyType || "",
    });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Edit Vehicle
  const updateVehicle = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await API.patch(`/vehicles/${editForm._id}`, {
        vehicleType: editForm.vehicleType,
        capacity: editForm.capacity,
        bodyType: editForm.bodyType,
      });

      toast.success("Vehicle details updated successfully", {
        id: "vehicle-update-success",
      });
      setShowModal(false);
      fetchVehicles();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update vehicle", {
        id: "vehicle-update-error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-[12px] shadow-[0_4px_15px_rgba(0,0,0,0.06)] border border-[#e2e8f0] mb-[20px] overflow-hidden">
      {/* Accordion Header */}
      <div
        onClick={handleToggleOpen}
        className={`flex justify-between items-center px-[20px] py-[16px] bg-[#f8fafc] cursor-pointer select-none transition-colors hover:bg-slate-100 ${
          isOpen ? "border-b border-[#e2e8f0]" : ""
        }`}
      >
        <div className="flex items-center gap-[12px]">
         <div className="w-[40px] h-[40px] rounded-[10px] bg-[#4f46e5] text-white flex items-center justify-center">
  <FaTruck size={20} />
</div>
          <div>
            <h3 className="m-0 text-[16px] font-bold text-[#1e293b]">
              Services / Vehicles
            </h3>
            <p className="m-0 text-[12px] text-[#64748b]">
              Fleet management & transport service specifications
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[8px]">
          <span className="text-[12px] font-semibold text-[#4f46e5] bg-[#eef2ff] px-[10px] py-[4px] rounded-[20px]">
            {vehicles.length} Units
          </span>
          <span className="text-[14px] text-[#64748b]">{isOpen ? "▲" : "▼"}</span>
        </div>
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-[24px]">
          {/* Header Action Bar */}
          <div className="flex justify-between items-center mb-[16px] flex-wrap gap-[10px]">
            <div>
              <h4 className="m-0 text-[15px] font-bold text-[#0f172a]">
                Fleet Records
              </h4>
              <p className="m-0 text-[12px] text-[#64748b]">
                Overview of available vehicle types and body configurations
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddForm(!showAddForm)}
              className={`px-[16px] py-[8px] rounded-[8px] font-semibold text-[13px] text-white border-none cursor-pointer transition-colors ${
                showAddForm ? "bg-[#64748b] hover:bg-[#475569]" : "bg-[#4f46e5] hover:bg-[#4338ca]"
              }`}
            >
              {showAddForm ? "✕ Close Form" : "+ Add Vehicle"}
            </button>
          </div>

          {/* ================= ADD FORM ================= */}
          {showAddForm && (
            <div className="bg-[#f8fafc] border border-[#cbd5e1] rounded-[10px] p-[16px] mb-[20px]">
              <h5 className="m-0 mb-[12px] text-[14px] font-bold text-[#1e293b]">
                Register New Vehicle Type
              </h5>
              <form onSubmit={handleAddSubmit}>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[12px] mb-[16px]">
                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
                      Vehicle Classification *
                    </label>
                    <select
                      name="vehicleType"
                      value={addForm.vehicleType}
                      onChange={handleAddChange}
                      required
                      className="w-full px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] bg-white outline-none focus:border-[#4f46e5]"
                    >
                      <option value="">Select Classification</option>
                      {VEHICLE_CLASSIFICATIONS.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
                      Load Capacity
                    </label>
                    <input
                      type="text"
                      name="capacity"
                      value={addForm.capacity}
                      onChange={handleAddChange}
                      placeholder="e.g. 20 Tons / 400 Boxes"
                      className="w-full px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] bg-white outline-none focus:border-[#4f46e5] box-border"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
                      Body Configuration
                    </label>
                    <select
                      name="bodyType"
                      value={addForm.bodyType}
                      onChange={handleAddChange}
                      className="w-full px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] bg-white outline-none focus:border-[#4f46e5]"
                    >
                      <option value="">Select Configuration</option>
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                      <option value="Container">Container</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-[8px]">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="bg-[#e2e8f0] text-[#334155] hover:bg-[#cbd5e1] border-none px-[14px] py-[8px] rounded-[6px] text-[13px] font-semibold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addLoading}
                    className="bg-[#16a34a] text-white hover:bg-[#15803d] border-none px-[18px] py-[8px] rounded-[6px] text-[13px] font-semibold cursor-pointer transition-colors disabled:opacity-50"
                  >
                    {addLoading ? "Saving..." : "Save Record"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="flex justify-between items-center gap-[10px] mb-[16px] flex-wrap">
            <input
              type="text"
              placeholder="Search by vehicle type, body or capacity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 min-w-[220px] px-[12px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] outline-none focus:border-[#4f46e5] bg-white"
            />
            <div className="flex gap-[6px] overflow-x-auto max-w-full pb-1">
              {["All", ...VEHICLE_CLASSIFICATIONS].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFilterType(type)}
                  className={`px-[12px] py-[6px] rounded-[6px] text-[12px] font-semibold whitespace-nowrap cursor-pointer transition-colors border ${
                    filterType === type
                      ? "border-[#4f46e5] bg-[#4f46e5] text-white"
                      : "border-[#cbd5e1] bg-white text-[#475569] hover:bg-[#f1f5f9]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* ================= TABLE VIEW ================= */}
          {loading ? (
            <div className="text-center py-[30px] text-[#64748b] text-[14px]">
              Loading Fleet Records...
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="text-center py-[30px] bg-[#f8fafc] rounded-[8px] border border-dashed border-[#cbd5e1] text-[#64748b] text-[13px]">
              No vehicle records found.
            </div>
          ) : (
            <div className="w-full overflow-x-auto border border-[#e2e8f0] rounded-[8px]">
              <table className="w-full border-collapse text-left text-[13px]">
                <thead>
                  <tr className="bg-[#f1f5f9] border-b border-[#e2e8f0] text-[#475569]">
                    <th className="px-[14px] py-[10px] font-bold">#</th>
                    <th className="px-[14px] py-[10px] font-bold">Vehicle Classification</th>
                    <th className="px-[14px] py-[10px] font-bold">Load Capacity</th>
                    <th className="px-[14px] py-[10px] font-bold">Body Configuration</th>
                    <th className="px-[14px] py-[10px] font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map((v, index) => (
                    <tr
                      key={v._id || index}
                      className={`border-b border-[#e2e8f0] last:border-b-0 ${
                        index % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"
                      } hover:bg-[#f1f5f9] transition-colors`}
                    >
                      <td className="px-[14px] py-[10px] text-[#64748b] font-semibold">
                        {index + 1}
                      </td>
                      <td className="px-[14px] py-[10px] font-semibold text-[#0f172a]">
                        {v.vehicleType || "-"}
                      </td>
                      <td className="px-[14px] py-[10px] text-[#334155]">
                        {v.capacity || "Standard"}
                      </td>
                      <td className="px-[14px] py-[10px]">
                        <span className="bg-[#e0e7ff] text-[#3730a3] px-[8px] py-[2px] rounded-[4px] text-[12px] font-semibold">
                          {v.bodyType || "General"}
                        </span>
                      </td>
                      <td className="px-[14px] py-[10px] text-right">
                        <div className="inline-flex gap-[6px]">
                          <button
                            type="button"
                            onClick={() => openUpdate(v)}
                            className="bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe] hover:bg-[#2563eb] hover:text-white px-[10px] py-[4px] rounded-[4px] text-[12px] font-semibold cursor-pointer transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteVehicle(v._id)}
                            className="bg-[#fef2f2] text-[#dc2626] border border-[#fecaca] hover:bg-[#dc2626] hover:text-white px-[10px] py-[4px] rounded-[4px] text-[12px] font-semibold cursor-pointer transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] flex justify-center items-center z-[999] p-[16px]">
          <div className="bg-white rounded-[12px] w-full max-w-[480px] overflow-hidden shadow-[0_20px_25px_-5px_rgba(0,0,0,0.2)] border border-[#e2e8f0]">
            <div className="px-[20px] py-[14px] border-b border-[#e2e8f0] flex justify-between items-center bg-[#f8fafc]">
              <h4 className="m-0 text-[15px] font-bold text-[#0f172a]">
                Edit Vehicle Details
              </h4>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-[#e2e8f0] hover:bg-[#cbd5e1] border-none rounded-[6px] px-[8px] py-[4px] cursor-pointer text-[12px] text-[#475569]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={updateVehicle} className="p-[20px]">
              <div className="mb-[14px]">
                <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
                  Vehicle Classification
                </label>
                <select
                  name="vehicleType"
                  value={editForm.vehicleType}
                  onChange={handleEditChange}
                  className="w-full px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] bg-white outline-none focus:border-[#4f46e5]"
                >
                  <option value="">Select Classification</option>
                  {VEHICLE_CLASSIFICATIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-[14px]">
                <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
                  Load Capacity
                </label>
                <input
                  type="text"
                  name="capacity"
                  value={editForm.capacity}
                  onChange={handleEditChange}
                  className="w-full px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] bg-white outline-none focus:border-[#4f46e5] box-border"
                />
              </div>

              <div className="mb-[20px]">
                <label className="block text-[11px] font-bold text-[#475569] uppercase mb-[4px]">
                  Body Configuration
                </label>
                <select
                  name="bodyType"
                  value={editForm.bodyType}
                  onChange={handleEditChange}
                  className="w-full px-[10px] py-[8px] rounded-[6px] border border-[#cbd5e1] text-[13px] bg-white outline-none focus:border-[#4f46e5]"
                >
                  <option value="">Select Configuration</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Container">Container</option>
                </select>
              </div>

              <div className="flex justify-end gap-[8px]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-[#e2e8f0] hover:bg-[#cbd5e1] text-[#334155] border-none px-[14px] py-[8px] rounded-[6px] text-[13px] font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#4f46e5] hover:bg-[#4338ca] text-white border-none px-[18px] py-[8px] rounded-[6px] text-[13px] font-semibold cursor-pointer transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Modifications"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleServices;