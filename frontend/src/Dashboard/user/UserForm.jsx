// import React, { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import API from "../../api/api";
// import toast from "react-hot-toast";
// import {
//   Truck,
//   Package,
//   MapPin,
//   Calendar,
//   User,
//   Phone,
//   IndianRupee,
//   FileText,
//   CheckCircle2,
//   ChevronRight,
//   ChevronLeft,
//   Weight,
//   Layers
// } from "lucide-react";

// export default function UserForm() {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     trigger,
//     control,
//     formState: { errors },
//   } = useForm({
//     mode: "onTouched",
//     defaultValues: {
//       category: "",
//       vehicleType: "",
//       service: "",
//       goodsType: "",
//       weight: "",
//       pickupLocation: "",
//       loading_point: "",
//       pickupDate: "",
//       contactPerson: "",
//       contactNumber: "",
//       expectedBudget: "",
//       remarks: "",
//     },
//   });

//   const categories = [
//     "Transporter", "Broker", "Fleet Owner", "Truck Owner",
//     "Logistics Company", "Warehouse", "Courier", "Packing & Moving",
//     "Commission Agent", "RTO Agent", "Finance Agent", "Others"
//   ];

//   const vehicleTypes = [
//     "Mini Truck", "Pickup", "Tata Ace", "Bolero Pickup", "Mahindra Jeeto",
//     "Ashok Leyland Dost", "Tempo", "Canter", "Eicher", "Truck", "LCV",
//     "HCV", "14 Feet Truck", "17 Feet Truck", "19 Feet Truck", "22 Feet Truck",
//     "32 Feet Truck", "Open Body Truck", "Closed Body Truck", "Container",
//     "Trailer", "Tipper", "Tanker", "Refrigerated Truck", "Tractor Trolley"
//   ];

//   const formData = watch();

//   const formatDateToDDMMYYYY = (dateString) => {
//     if (!dateString) return "-";
//     const parts = dateString.split("-");
//     if (parts.length !== 3) return dateString;
//     const [year, month, day] = parts;
//     return `${day}-${month}-${year}`;
//   };

//   const nextStep = async () => {
//     let fields = [];
//     if (step === 1) {
//       fields = ["service", "vehicleType", "goodsType", "weight", "pickupLocation", "loading_point", "pickupDate"];
//     } else if (step === 2) {
//       fields = ["contactPerson", "contactNumber", "expectedBudget"];
//     } else if (step === 3) {
//       fields = ["remarks"];
//     }

//     const valid = await trigger(fields);
//     if (valid) setStep((prev) => prev + 1);
//   };

//   const prevStep = () => setStep((prev) => prev - 1);

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);
//       const payload = {
//         ...data,
//         formattedPickupDate: formatDateToDDMMYYYY(data.pickupDate),
//       };

//       const res = await API.post("/booking/create", payload);
//       toast.success(res.data.message || "Load created successfully");
//       reset();
//       setStep(1);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") e.preventDefault();
//   };

//   return (
//     <div className="w-full bg-slate-50/50 min-h-screen py-6 px-3 sm:px-6 font-sans">
//       <div className="max-w-6xl mx-auto space-y-6">

//         {/* Header Section */}
//         <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div>
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-600 mb-2">
//               <Truck size={14} /> New Transport Order
//             </div>
//             <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Create Shipment Request</h1>
//             <p className="text-xs sm:text-sm text-slate-500 mt-1">Fill in the details to publish your load to network carriers.</p>
//           </div>

//           {/* Step Indicator Badges */}
//           <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto justify-center">
//             {[1, 2, 3].map((item) => (
//               <div
//                 key={item}
//                 className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
//                   step === item
//                     ? "bg-slate-900 text-white shadow-md"
//                     : step > item
//                     ? "bg-emerald-500 text-white"
//                     : "text-slate-400"
//                 }`}
//               >
//                 {step > item ? <CheckCircle2 size={14} /> : <span>0{item}</span>}
//                 <span className={step === item ? "inline" : "hidden sm:inline"}>
//                   {item === 1 ? "Details" : item === 2 ? "Contact" : "Finalize"}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="grid lg:grid-cols-3 gap-6">

//           {/* Main Form Box */}
//           <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">

//             {/* STEP 1: Shipment Details */}
//             {step === 1 && (
//               <div className="space-y-6">
//                 <div className="border-b border-slate-100 pb-4">
//                   <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
//                     <Layers className="text-orange-500" size={20} /> Shipment Specifications
//                   </h2>
//                   <p className="text-xs text-slate-500">Provide material type, vehicle requirement and route information.</p>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-5">
//                   {/* Service */}
//                   <div>
//                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Service Category</label>
//                     <select
//                       {...register("service", { required: "Service category is required" })}
//                       className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl px-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
//                     >
//                       <option value="">Select Service Category</option>
//                       {categories.map((cat) => (
//                         <option key={cat} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                     {errors.service && <p className="text-red-500 text-xs font-semibold mt-1">{errors.service.message}</p>}
//                   </div>

//                   {/* Vehicle Type */}
//                   <div>
//                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Vehicle Type</label>
//                     <select
//                       {...register("vehicleType", { required: "Vehicle Type is required" })}
//                       className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl px-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
//                     >
//                       <option value="">Select Vehicle Type</option>
//                       {vehicleTypes.map((v) => (
//                         <option key={v} value={v}>{v}</option>
//                       ))}
//                     </select>
//                     {errors.vehicleType && <p className="text-red-500 text-xs font-semibold mt-1">{errors.vehicleType.message}</p>}
//                   </div>

//                   {/* Goods Type */}
//                   <div>
//                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Goods Type</label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="e.g. Industrial Equipment"
//                         {...register("goodsType", { required: "Goods Type Required" })}
//                         className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
//                       />
//                       <Package size={18} className="absolute left-3 top-3 text-slate-400" />
//                     </div>
//                     {errors.goodsType && <p className="text-red-500 text-xs font-semibold mt-1">{errors.goodsType.message}</p>}
//                   </div>

//                   {/* Weight */}
//                   <div>
//                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Weight </label>
//                     <div className="relative">
//                       <input
//                         type="string"
//                         placeholder="e.g. 15"
//                         {...register("weight", { required: "Weight Required" })}
//                         className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
//                       />
//                       <Weight size={18} className="absolute left-3 top-3 text-slate-400" />
//                     </div>
//                     {errors.weight && <p className="text-red-500 text-xs font-semibold mt-1">{errors.weight.message}</p>}
//                   </div>

//                   {/* Pickup Location */}
//                   <div>
//                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Pickup / Loading Point</label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="e.g. Mumbai Port, MH"
//                         {...register("pickupLocation", { required: "Pickup Location Required" })}
//                         className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
//                       />
//                       <MapPin size={18} className="absolute left-3 top-3 text-emerald-500" />
//                     </div>
//                     {errors.pickupLocation && <p className="text-red-500 text-xs font-semibold mt-1">{errors.pickupLocation.message}</p>}
//                   </div>

//                   {/* Destination */}
//                   <div>
//                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Unloading / Destination</label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="e.g. Indore Hub, MP"
//                         {...register("loading_point", { required: "Destination Required" })}
//                         className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
//                       />
//                       <MapPin size={18} className="absolute left-3 top-3 text-rose-500" />
//                     </div>
//                     {errors.loading_point && <p className="text-red-500 text-xs font-semibold mt-1">{errors.loading_point.message}</p>}
//                   </div>

//                   {/* Date Picker */}
//                   <div className="md:col-span-2">
//                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Loading Date</label>
//                     <div className="relative">
//                       <Controller
//                         control={control}
//                         name="pickupDate"
//                         rules={{ required: "Pickup Date Required" }}
//                         render={({ field }) => (
//                           <DatePicker
//                             selected={field.value && !isNaN(new Date(field.value)) ? new Date(field.value) : null}
//                             onChange={(date) => {
//                               if (!date || isNaN(date)) {
//                                 field.onChange("");
//                                 return;
//                               }
//                               const year = date.getFullYear();
//                               const month = String(date.getMonth() + 1).padStart(2, "0");
//                               const day = String(date.getDate()).padStart(2, "0");
//                               field.onChange(`${year}-${month}-${day}`);
//                             }}
//                             dateFormat="dd/MM/yyyy"
//                             placeholderText="Select Loading Date"
//                             className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 cursor-pointer transition-all"
//                             onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
//                           />
//                         )}
//                       />
//                       <Calendar size={18} className="absolute left-3 top-3 text-orange-500 pointer-events-none" />
//                     </div>
//                     {errors.pickupDate && <p className="text-red-500 text-xs font-semibold mt-1">{errors.pickupDate.message}</p>}
//                   </div>
//                 </div>

//                 <div className="flex justify-end pt-4 border-t border-slate-100">
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="bg-slate-900 hover:bg-orange-600 text-white font-bold px-7 h-11 rounded-2xl transition-all duration-200 flex items-center gap-2 text-sm shadow-md"
//                   >
//                     Next Step <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 2: Contact Details */}
//             {step === 2 && (
//               <div className="space-y-6">
//                 <div className="border-b border-slate-100 pb-4">
//                   <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
//                     <User className="text-orange-500" size={20} /> Contact & Budget Info
//                   </h2>
//                   <p className="text-xs text-slate-500">Provide point-of-contact details and estimated freight budget.</p>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-5">
//                   <div>
//                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Contact Person Name</label>
//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="e.g. Rajesh Kumar"
//                         {...register("contactPerson", { required: "Contact Person is required" })}
//                         className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
//                       />
//                       <User size={18} className="absolute left-3 top-3 text-slate-400" />
//                     </div>
//                     {errors.contactPerson && <p className="text-red-500 text-xs font-semibold mt-1">{errors.contactPerson.message}</p>}
//                   </div>

//                   <div>
//                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Contact Mobile Number</label>
//                     <div className="relative">
//                       <input
//                         type="tel"
//                         maxLength={10}
//                         placeholder="10-digit mobile number"
//                         {...register("contactNumber", {
//                           required: "Contact Number is required",
//                           pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
//                         })}
//                         className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
//                       />
//                       <Phone size={18} className="absolute left-3 top-3 text-slate-400" />
//                     </div>
//                     {errors.contactNumber && <p className="text-red-500 text-xs font-semibold mt-1">{errors.contactNumber.message}</p>}
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Target Freight Budget (₹)</label>
//                     <div className="relative">
//                       <input
//                         type="number"
//                         placeholder="Enter estimated budget amount"
//                         {...register("expectedBudget", {
//                           required: "Budget is required",
//                           min: { value: 100, message: "Minimum budget should be ₹100" },
//                         })}
//                         className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm font-bold text-emerald-600 outline-none focus:bg-white focus:border-orange-500 transition-all"
//                       />
//                       <IndianRupee size={18} className="absolute left-3 top-3 text-emerald-600" />
//                     </div>
//                     {errors.expectedBudget && <p className="text-red-500 text-xs font-semibold mt-1">{errors.expectedBudget.message}</p>}
//                   </div>
//                 </div>

//                 <div className="flex justify-between pt-4 border-t border-slate-100">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 h-11 rounded-2xl transition-all duration-200 flex items-center gap-2 text-sm"
//                   >
//                     <ChevronLeft size={16} /> Previous
//                   </button>
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="bg-slate-900 hover:bg-orange-600 text-white font-bold px-7 h-11 rounded-2xl transition-all duration-200 flex items-center gap-2 text-sm shadow-md"
//                   >
//                     Next Step <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STEP 3: Remarks */}
//             {step === 3 && (
//               <div className="space-y-6">
//                 <div className="border-b border-slate-100 pb-4">
//                   <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
//                     <FileText className="text-orange-500" size={20} /> Additional Instructions
//                   </h2>
//                   <p className="text-xs text-slate-500">Mention special requirements or handling instructions for driver/transporter.</p>
//                 </div>

//                 <div>
//                   <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Remarks & Instructions</label>
//                   <textarea
//                     rows={5}
//                     placeholder="Write instructions regarding loading time, tarp requirement, driver details needed, etc."
//                     {...register("remarks")}
//                     className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 resize-none transition-all"
//                   />
//                 </div>

//                 <div className="flex justify-between pt-4 border-t border-slate-100">
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 h-11 rounded-2xl transition-all duration-200 flex items-center gap-2 text-sm"
//                   >
//                     <ChevronLeft size={16} /> Previous
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-11 rounded-2xl transition-all duration-200 flex items-center gap-2 text-sm shadow-md shadow-orange-500/20 disabled:opacity-50"
//                   >
//                     {loading ? (
//                       <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         Submitting...
//                       </div>
//                     ) : (
//                       "Publish Transport Request"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}

//           </div>

//           {/* Right Live Booking Summary Panel */}
//           <div className="lg:col-span-1">
//             <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl sticky top-6 space-y-5 border border-slate-800">
//               <div className="flex items-center justify-between border-b border-slate-800 pb-4">
//                 <h3 className="font-bold text-base text-white flex items-center gap-2">
//                   <FileText size={18} className="text-orange-500" /> Order Summary
//                 </h3>
//                 <span className="text-[10px] uppercase tracking-wider bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold px-2.5 py-0.5 rounded-full">
//                   Live Preview
//                 </span>
//               </div>

//               <div className="space-y-3.5 text-xs">
//                 <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
//                   <span className="text-slate-400 font-medium">Category</span>
//                   <span className="font-bold text-slate-200">{formData.service || "—"}</span>
//                 </div>

//                 <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
//                   <span className="text-slate-400 font-medium">Vehicle Needed</span>
//                   <span className="font-bold text-slate-200">{formData.vehicleType || "—"}</span>
//                 </div>

//                 <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
//                   <span className="text-slate-400 font-medium">Goods & Weight</span>
//                   <span className="font-bold text-slate-200">
//                     {formData.goodsType || " "} {formData.weight ? `(${formData.weight} )` : ""}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
//                   <span className="text-slate-400 font-medium">Pickup Point</span>
//                   <span className="font-bold text-emerald-400 text-right max-w-[140px] truncate">{formData.pickupLocation || "—"}</span>
//                 </div>

//                 <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
//                   <span className="text-slate-400 font-medium">Destination</span>
//                   <span className="font-bold text-rose-400 text-right max-w-[140px] truncate">{formData.loading_point || "—"}</span>
//                 </div>

//                 <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
//                   <span className="text-slate-400 font-medium">Loading Date</span>
//                   <span className="font-bold text-orange-400">{formatDateToDDMMYYYY(formData.pickupDate)}</span>
//                 </div>

//                 <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
//                   <span className="text-slate-400 font-medium">Contact Person</span>
//                   <span className="font-bold text-slate-200">{formData.contactPerson || "—"}</span>
//                 </div>

//                 <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
//                   <span className="text-slate-400 font-medium">Phone</span>
//                   <span className="font-bold text-slate-200">{formData.contactNumber || "—"}</span>
//                 </div>

//                 <div className="flex justify-between items-center pt-2">
//                   <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Target Budget</span>
//                   <span className="text-lg font-black text-emerald-400">
//                     ₹ {formData.expectedBudget ? Number(formData.expectedBudget).toLocaleString("en-IN") : "0"}
//                   </span>
//                 </div>

//                 <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700/60 space-y-1">
//                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Remarks</span>
//                   <p className="text-slate-300 text-[11px] leading-relaxed break-words">
//                     {formData.remarks || "No additional instructions added."}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useEffect, useRef } from "react";
// import { useForm, Controller } from "react-hook-form";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import API from "../../api/api";
// import toast from "react-hot-toast";

// import {
//   Package,
//   MapPin,
//   Calendar,
//   User,
//   Phone,
//   IndianRupee,
//   FileText,
//   Check,
//   ChevronRight,
//   ChevronLeft,
//   Weight,
//   Layers,
// } from "lucide-react";

// export default function UserForm() {
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // ==========================================
//   // LOCATION SEARCH STATE
//   // No LocationSearchInput.jsx required
//   // ==========================================
//   const [locationSuggestions, setLocationSuggestions] = useState([]);
//   const [locationLoading, setLocationLoading] = useState(false);
//   const [openLocation, setOpenLocation] = useState(null);

//   const pickupLocationRef = useRef(null);
//   const destinationRef = useRef(null);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     trigger,
//     control,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     mode: "onTouched",

//     defaultValues: {
//       category: "",
//       vehicleType: "",
//       service: "",
//       goodsType: "",
//       weight: "",
//       pickupLocation: "",
//       loading_point: "",
//       pickupDate: "",
//       contactPerson: "",
//       contactNumber: "",
//       expectedBudget: "",
//       remarks: "",
//     },
//   });

//   // ==========================================
//   // DATA
//   // ==========================================

//   const categories = [
//     "Transporter",
//     "Broker",
//     "Fleet Owner",
//     "Truck Owner",
//     "Logistics Company",
//     "Warehouse",
//     "Courier",
//     "Packing & Moving",
//     "Commission Agent",
//     "RTO Agent",
//     "Finance Agent",
//     "Others",
//   ];

//   const vehicleTypes = [
//     "Pickup / Auto",
//     "LCV",
//     "HCV/TRUCK",
//     "Container",
//     "Trailer",
//     "Refrigerated Van",
//     "Crane / JCB",
//     "Hydra",
//     "Mining Vehicle",
//   ];

//   const stepsInfo = [
//     {
//       id: 1,
//       label: "Shipment Details",
//     },
//     {
//       id: 2,
//       label: "Contact & Budget",
//     },
//     {
//       id: 3,
//       label: "Final Instructions",
//     },
//   ];

//   const formData = watch();

//   const pickupValue = watch("pickupLocation");
//   const destinationValue = watch("loading_point");

//   // ==========================================
//   // CLOSE LOCATION DROPDOWN
//   // ==========================================

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       const insidePickup = pickupLocationRef.current?.contains(e.target);

//       const insideDestination = destinationRef.current?.contains(e.target);

//       if (!insidePickup && !insideDestination) {
//         setOpenLocation(null);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // ==========================================
//   // LOCATION SEARCH API
//   // Directly inside UserForm.jsx
//   // ==========================================

//   useEffect(() => {
//     const searchTerm =
//       openLocation === "pickup"
//         ? pickupValue
//         : openLocation === "destination"
//           ? destinationValue
//           : "";

//     // Less than 2 characters = no API call
//     if (!openLocation || !searchTerm || searchTerm.trim().length < 2) {
//       setLocationSuggestions([]);
//       setLocationLoading(false);
//       return;
//     }

//     // 300ms debounce
//     const timer = setTimeout(async () => {
//       try {
//         setLocationLoading(true);

//         const res = await API.get(
//           `/location/search?query=${encodeURIComponent(searchTerm.trim())}`,
//         );

//         if (res.data?.success) {
//           setLocationSuggestions(res.data.data || []);
//         } else {
//           setLocationSuggestions([]);
//         }
//       } catch (error) {
//         console.error("Location search error:", error);

//         setLocationSuggestions([]);
//       } finally {
//         setLocationLoading(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [pickupValue, destinationValue, openLocation]);

//   // ==========================================
//   // SELECT LOCATION
//   // ==========================================

//   const selectLocation = (fieldName, item) => {
//     const value = item?.name || item?.label || "";

//     setValue(fieldName, value, {
//       shouldValidate: true,
//       shouldDirty: true,
//       shouldTouch: true,
//     });

//     setLocationSuggestions([]);
//     setOpenLocation(null);
//   };

//   // ==========================================
//   // LOCATION SUGGESTIONS UI
//   // ==========================================

//   const renderLocationSuggestions = (fieldName) => {
//     const activeLocation =
//       fieldName === "pickupLocation" ? "pickup" : "destination";

//     if (openLocation !== activeLocation) {
//       return null;
//     }

//     return (
//       <div className="absolute left-0 right-0 top-full mt-2 z-[9999]">
        
//         <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
//           {/* Loading */}
//           {locationLoading ? (
//             <div className="px-4 py-3 text-sm text-slate-500">
//               Searching locations...
//             </div>
//           ) : locationSuggestions.length > 0 ? (
//             /* Suggestions */
//             <ul className="max-h-56 overflow-y-auto">
//               {locationSuggestions.map((item, index) => (
//                 <li
//                   key={item._id || `${item.name}-${item.state}-${index}`}
//                   onMouseDown={(e) => e.preventDefault()}
//                   onClick={() => selectLocation(fieldName, item)}
//                   className="
//                       px-4
//                       py-3
//                       cursor-pointer
//                       border-b
//                       border-slate-100
//                       last:border-b-0
//                       hover:bg-orange-50
//                       transition
//                     "
//                 >
//                   <div className="flex items-center gap-2">
//                     <MapPin
//                       size={16}
//                       className="
//                           text-orange-500
//                           shrink-0
//                         "
//                     />

//                     <div>
//                       <p className="text-sm font-bold text-slate-800">
//                         {item.name}
//                       </p>

//                       <p className="text-xs text-slate-500">
//                         {item.state || "India"}
//                       </p>
//                     </div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             /* No Results */
//             <div className="px-4 py-3 text-sm text-slate-500 text-center">
//               No results found
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // ==========================================
//   // DATE FORMAT
//   // ==========================================

//   const formatDateToDDMMYYYY = (dateString) => {
//     if (!dateString) return "-";

//     const parts = dateString.split("-");

//     if (parts.length !== 3) {
//       return dateString;
//     }

//     const [year, month, day] = parts;

//     return `${day}-${month}-${year}`;
//   };

//   // ==========================================
//   // NEXT STEP
//   // ==========================================

//   const nextStep = async () => {
//     let fields = [];

//     if (step === 1) {
//       fields = [
//         "service",
//         "vehicleType",
//         "goodsType",
//         "weight",
//         "pickupLocation",
//         "loading_point",
//         "pickupDate",
//       ];
//     }

//     if (step === 2) {
//       fields = ["contactPerson", "contactNumber", "expectedBudget"];
//     }

//     if (step === 3) {
//       fields = ["remarks"];
//     }

//     const valid = await trigger(fields);

//     if (valid) {
//       setStep((prev) => prev + 1);

//       // On mobile, move the form back to the top
//       // after changing the step.
//       if (window.innerWidth < 1024) {
//         setTimeout(() => {
//           window.scrollTo({
//             top: 0,
//             left: 0,
//             behavior: "smooth",
//           });
//         }, 50);
//       }
//     }
//   };

//   // ==========================================
//   // PREVIOUS STEP
//   // ==========================================

//   const prevStep = () => {
//     setStep((prev) => prev - 1);

//     // Keep Previous button consistent on mobile.
//     if (window.innerWidth < 1024) {
//       setTimeout(() => {
//         window.scrollTo({
//           top: 0,
//           left: 0,
//           behavior: "smooth",
//         });
//       }, 50);
//     }
//   };

//   // ==========================================
//   // SUBMIT
//   // ==========================================

//   const onSubmit = async (data) => {
//     try {
//       setLoading(true);

//       const payload = {
//         ...data,

//         formattedPickupDate: formatDateToDDMMYYYY(data.pickupDate),
//       };

//       const res = await API.post("/booking/create", payload);

//       toast.success(res.data.message || "Load created successfully");

//       reset();

//       setStep(1);

//       setLocationSuggestions([]);

//       setOpenLocation(null);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // ENTER KEY
//   // ==========================================

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//     }
//   };

//   // ==========================================
//   // RETURN UI
//   // ==========================================

//   return (
    
//     <div className="w-full bg-slate-50/50 min-h-screen py-8 px-3 sm:px-6 font-sans">
      
      
//       <div className="max-w-6xl mx-auto">
        
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           onKeyDown={handleKeyDown}
//           className="grid lg:grid-cols-3 gap-6"
//         >
          
//           {/* =====================================
//               MAIN FORM
//           ===================================== */}

//           <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
//             {/* =====================================
//                 STEP PROGRESS
//             ===================================== */}

//             <div className="mb-8 relative">
//               <div className="relative flex items-center justify-between">
//                 <div
//                   className="
//                   absolute
//                   left-0
//                   top-1/2
//                   -translate-y-1/2
//                   h-1
//                   bg-slate-200
//                   w-full
//                   z-0
//                   rounded-full
//                 "
//                 />

//                 <div
//                   className="
//                     absolute
//                     left-0
//                     top-1/2
//                     -translate-y-1/2
//                     h-1
//                     bg-orange-500
//                     z-0
//                     rounded-full
//                     transition-all
//                     duration-500
//                     ease-in-out
//                   "
//                   style={{
//                     width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
//                   }}
//                 />

//                 {stepsInfo.map((s) => (
//                   <div
//                     key={s.id}
//                     className="
//                         relative
//                         z-10
//                         flex
//                         flex-col
//                         items-center
//                       "
//                   >
//                     <div
//                       className={`
//                           w-9
//                           h-9
//                           rounded-full
//                           flex
//                           items-center
//                           justify-center
//                           font-bold
//                           text-xs
//                           transition-all
//                           duration-300
//                           border-2
//                           ${
//                             step > s.id
//                               ? "bg-orange-500 border-orange-500 text-white"
//                               : step === s.id
//                                 ? "bg-white border-orange-500 text-orange-600 ring-4 ring-orange-100"
//                                 : "bg-white border-slate-300 text-slate-400"
//                           }
//                         `}
//                     >
//                       {step > s.id ? (
//                         <Check size={16} strokeWidth={3} />
//                       ) : (
//                         `0${s.id}`
//                       )}
//                     </div>

//                     <span
//                       className={`
//                           text-[11px]
//                           font-semibold
//                           mt-2
//                           ${step >= s.id ? "text-slate-900" : "text-slate-400"}
//                         `}
//                     >
//                       {s.label}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* =====================================
//                 STEP 1
//             ===================================== */}

//             {step === 1 && (
//               <div className="space-y-6">
//                 <div className="border-b border-slate-100 pb-3">
//                   <h2
//                     className="
//                     text-lg
//                     font-bold
//                     text-slate-900
//                     flex
//                     items-center
//                     gap-2
//                   "
//                   >
//                     <Layers className="text-orange-500" size={20} />
//                     Shipment Specifications
//                   </h2>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-5">
//                   {/* SERVICE */}

//                   <div>
//                     <label
//                       className="
//                       text-xs
//                       font-bold
//                       text-slate-700
//                       uppercase
//                       tracking-wider
//                       mb-1.5
//                       block
//                     "
//                     >
//                       Service Category
//                     </label>

//                     <select
//                       {...register("service", {
//                         required: "Service category is required",
//                       })}
//                       className="
//                         w-full
//                         h-11
//                         bg-slate-50
//                         border
//                         border-slate-200
//                         rounded-2xl
//                         px-4
//                         text-sm
//                         text-slate-800
//                         outline-none
//                         focus:bg-white
//                         focus:border-orange-500
//                       "
//                     >
//                       <option value="">Select Service Category</option>

//                       {categories.map((cat) => (
//                         <option key={cat} value={cat}>
//                           {cat}
//                         </option>
//                       ))}
//                     </select>

//                     {errors.service && (
//                       <p className="text-red-500 text-xs font-semibold mt-1">
//                         {errors.service.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* VEHICLE */}

//                   <div>
//                     <label
//                       className="
//                       text-xs
//                       font-bold
//                       text-slate-700
//                       uppercase
//                       tracking-wider
//                       mb-1.5
//                       block
//                     "
//                     >
//                       Vehicle Type
//                     </label>

//                     <select
//                       {...register("vehicleType", {
//                         required: "Vehicle Type is required",
//                       })}
//                       className="
//                         w-full
//                         h-11
//                         bg-slate-50
//                         border
//                         border-slate-200
//                         rounded-2xl
//                         px-4
//                         text-sm
//                         text-slate-800
//                         outline-none
//                         focus:bg-white
//                         focus:border-orange-500
//                       "
//                     >
//                       <option value="">Select Vehicle Type</option>

//                       {vehicleTypes.map((vehicle) => (
//                         <option key={vehicle} value={vehicle}>
//                           {vehicle}
//                         </option>
//                       ))}
//                     </select>

//                     {errors.vehicleType && (
//                       <p className="text-red-500 text-xs font-semibold mt-1">
//                         {errors.vehicleType.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* GOODS */}

//                   <div>
//                     <label
//                       className="
//                       text-xs
//                       font-bold
//                       text-slate-700
//                       uppercase
//                       tracking-wider
//                       mb-1.5
//                       block
//                     "
//                     >
//                       Goods Type
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="e.g. Industrial Equipment"
//                         {...register("goodsType", {
//                           required: "Goods Type Required",
//                         })}
//                         className="
//                           w-full
//                           h-11
//                           bg-slate-50
//                           border
//                           border-slate-200
//                           rounded-2xl
//                           pl-10
//                           pr-4
//                           text-sm
//                           text-slate-800
//                           outline-none
//                           focus:bg-white
//                           focus:border-orange-500
//                         "
//                       />

//                       <Package
//                         size={18}
//                         className="
//                           absolute
//                           left-3
//                           top-3
//                           text-slate-400
//                         "
//                       />
//                     </div>

//                     {errors.goodsType && (
//                       <p className="text-red-500 text-xs font-semibold mt-1">
//                         {errors.goodsType.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* WEIGHT */}

//                   <div>
//                     <label
//                       className="
//                       text-xs
//                       font-bold
//                       text-slate-700
//                       uppercase
//                       tracking-wider
//                       mb-1.5
//                       block
//                     "
//                     >
//                       Weight
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="e.g. 15 Tons"
//                         {...register("weight", {
//                           required: "Weight Required",
//                         })}
//                         className="
//                           w-full
//                           h-11
//                           bg-slate-50
//                           border
//                           border-slate-200
//                           rounded-2xl
//                           pl-10
//                           pr-4
//                           text-sm
//                           text-slate-800
//                           outline-none
//                           focus:bg-white
//                           focus:border-orange-500
//                         "
//                       />

//                       <Weight
//                         size={18}
//                         className="
//                           absolute
//                           left-3
//                           top-3
//                           text-slate-400
//                         "
//                       />
//                     </div>

//                     {errors.weight && (
//                       <p className="text-red-500 text-xs font-semibold mt-1">
//                         {errors.weight.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* =================================
//                       PICKUP LOCATION
//                   ================================= */}

//                   <div ref={pickupLocationRef} className="relative">
//                     <label
//                       className="
//                       text-xs
//                       font-bold
//                       text-slate-700
//                       uppercase
//                       tracking-wider
//                       mb-1.5
//                       block
//                     "
//                     >
//                       Pickup / Loading Point
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="Search pickup location..."
//                         autoComplete="off"
//                         {...register("pickupLocation", {
//                           required: "Pickup location is required",

//                           onChange: (e) => {
//                             setOpenLocation("pickup");

//                             if (!e.target.value.trim()) {
//                               setLocationSuggestions([]);
//                             }
//                           },
//                         })}
//                         onFocus={() => setOpenLocation("pickup")}
//                         className="
//                           w-full
//                           h-11
//                           bg-slate-50
//                           border
//                           border-slate-200
//                           rounded-2xl
//                           pl-10
//                           pr-4
//                           text-sm
//                           text-slate-800
//                           outline-none
//                           focus:bg-white
//                           focus:border-orange-500
//                         "
//                       />

//                       <MapPin
//                         size={18}
//                         className="
//                           absolute
//                           left-3
//                           top-3
//                           text-orange-500
//                           pointer-events-none
//                         "
//                       />
//                     </div>

//                     {renderLocationSuggestions("pickupLocation")}

//                     {errors.pickupLocation && (
//                       <p className="text-red-500 text-xs font-semibold mt-1">
//                         {errors.pickupLocation.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* =================================
//                       DESTINATION
//                   ================================= */}

//                   <div ref={destinationRef} className="relative">
//                     <label
//                       className="
//                       text-xs
//                       font-bold
//                       text-slate-700
//                       uppercase
//                       tracking-wider
//                       mb-1.5
//                       block
//                     "
//                     >
//                       Unloading / Destination
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="Search destination..."
//                         autoComplete="off"
//                         {...register("loading_point", {
//                           required: "Destination is required",

//                           onChange: (e) => {
//                             setOpenLocation("destination");

//                             if (!e.target.value.trim()) {
//                               setLocationSuggestions([]);
//                             }
//                           },
//                         })}
//                         onFocus={() => setOpenLocation("destination")}
//                         className="
//                           w-full
//                           h-11
//                           bg-slate-50
//                           border
//                           border-slate-200
//                           rounded-2xl
//                           pl-10
//                           pr-4
//                           text-sm
//                           text-slate-800
//                           outline-none
//                           focus:bg-white
//                           focus:border-orange-500
//                         "
//                       />

//                       <MapPin
//                         size={18}
//                         className="
//                           absolute
//                           left-3
//                           top-3
//                           text-orange-500
//                           pointer-events-none
//                         "
//                       />
//                     </div>

//                     {renderLocationSuggestions("loading_point")}

//                     {errors.loading_point && (
//                       <p className="text-red-500 text-xs font-semibold mt-1">
//                         {errors.loading_point.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* =================================
//                       DATE
//                   ================================= */}

//                   <div className="md:col-span-2">
//                     <label
//                       className="
//                       text-xs
//                       font-bold
//                       text-slate-700
//                       uppercase
//                       tracking-wider
//                       mb-1.5
//                       block
//                     "
//                     >
//                       Loading Date
//                     </label>

//                     <div className="relative">
//                       <Controller
//                         control={control}
//                         name="pickupDate"
//                         rules={{
//                           required: "Pickup Date Required",
//                         }}
//                         render={({ field }) => (
//                           <DatePicker
//                             selected={
//                               field.value && !isNaN(new Date(field.value))
//                                 ? new Date(field.value)
//                                 : null
//                             }
//                             onChange={(date) => {
//                               if (!date || isNaN(date)) {
//                                 field.onChange("");
//                                 return;
//                               }

//                               const year = date.getFullYear();

//                               const month = String(
//                                 date.getMonth() + 1,
//                               ).padStart(2, "0");

//                               const day = String(date.getDate()).padStart(
//                                 2,
//                                 "0",
//                               );

//                               field.onChange(`${year}-${month}-${day}`);
//                             }}
//                             dateFormat="dd/MM/yyyy"
//                             placeholderText="Select Loading Date"
//                             className="
//                               w-full
//                               h-11
//                               bg-slate-50
//                               border
//                               border-slate-200
//                               rounded-2xl
//                               pl-10
//                               pr-4
//                               text-sm
//                               text-slate-800
//                               outline-none
//                               focus:bg-white
//                               focus:border-orange-500
//                               cursor-pointer
//                             "
//                             onKeyDown={(e) =>
//                               e.key === "Enter" && e.preventDefault()
//                             }
//                           />
//                         )}
//                       />

//                       <Calendar
//                         size={18}
//                         className="
//                           absolute
//                           left-3
//                           top-3
//                           text-orange-500
//                           pointer-events-none
//                         "
//                       />
//                     </div>

//                     {errors.pickupDate && (
//                       <p className="text-red-500 text-xs font-semibold mt-1">
//                         {errors.pickupDate.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* NEXT */}

//                 <div
//                   className="
//                   flex
//                   justify-end
//                   pt-4
//                   border-t
//                   border-slate-100
//                 "
//                 >
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="
//                       bg-slate-900
//                       hover:bg-orange-600
//                       text-white
//                       font-bold
//                       px-7
//                       h-11
//                       rounded-2xl
//                       flex
//                       items-center
//                       gap-2
//                       text-sm
//                     "
//                   >
//                     Next Step
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* =====================================
//                 STEP 2
//             ===================================== */}

//             {step === 2 && (
//               <div className="space-y-6">
//                 <div className="border-b border-slate-100 pb-3">
//                   <h2
//                     className="
//                     text-lg
//                     font-bold
//                     text-slate-900
//                     flex
//                     items-center
//                     gap-2
//                   "
//                   >
//                     <User className="text-orange-500" size={20} />
//                     Contact & Budget Info
//                   </h2>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-5">
//                   {/* NAME */}

//                   <div>
//                     <label
//                       className="
//                       text-xs
//                       font-bold
//                       text-slate-700
//                       uppercase
//                       tracking-wider
//                       mb-1.5
//                       block
//                     "
//                     >
//                       Contact Person Name
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="text"
//                         placeholder="e.g. Rajesh Kumar"
//                         {...register("contactPerson", {
//                           required: "Contact Person is required",
//                         })}
//                         className="
//                           w-full
//                           h-11
//                           bg-slate-50
//                           border
//                           border-slate-200
//                           rounded-2xl
//                           pl-10
//                           pr-4
//                           text-sm
//                           text-slate-800
//                           outline-none
//                           focus:bg-white
//                           focus:border-orange-500
//                         "
//                       />

//                       <User
//                         size={18}
//                         className="
//                           absolute
//                           left-3
//                           top-3
//                           text-slate-400
//                         "
//                       />
//                     </div>

//                     {errors.contactPerson && (
//                       <p className="text-red-500 text-xs font-semibold mt-1">
//                         {errors.contactPerson.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* MOBILE */}

//                   <div>
//                     <label
//                       className="
//                       text-xs
//                       font-bold
//                       text-slate-700
//                       uppercase
//                       tracking-wider
//                       mb-1.5
//                       block
//                     "
//                     >
//                       Contact Mobile Number
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="tel"
//                         maxLength={10}
//                         placeholder="10-digit mobile number"
//                         {...register("contactNumber", {
//                           required: "Contact Number is required",

//                           pattern: {
//                             value: /^[0-9]{10}$/,

//                             message: "Enter valid 10-digit number",
//                           },
//                         })}
//                         className="
//                           w-full
//                           h-11
//                           bg-slate-50
//                           border
//                           border-slate-200
//                           rounded-2xl
//                           pl-10
//                           pr-4
//                           text-sm
//                           text-slate-800
//                           outline-none
//                           focus:bg-white
//                           focus:border-orange-500
//                         "
//                       />

//                       <Phone
//                         size={18}
//                         className="
//                           absolute
//                           left-3
//                           top-3
//                           text-slate-400
//                         "
//                       />
//                     </div>

//                     {errors.contactNumber && (
//                       <p className="text-red-500 text-xs font-semibold mt-1">
//                         {errors.contactNumber.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* BUDGET */}

//                   <div className="md:col-span-2">
//                     <label
//                       className="
//                       text-xs
//                       font-bold
//                       text-slate-700
//                       uppercase
//                       tracking-wider
//                       mb-1.5
//                       block
//                     "
//                     >
//                       Target Freight Budget (₹)
//                     </label>

//                     <div className="relative">
//                       <input
//                         type="number"
//                         placeholder="Enter estimated budget amount"
//                         {...register("expectedBudget", {
//                           min: {
//                             value: 100,
//                             message: "Minimum budget should be ₹100",
//                           },
//                         })}
//                         className="
//                           w-full
//                           h-11
//                           bg-slate-50
//                           border
//                           border-slate-200
//                           rounded-2xl
//                           pl-10
//                           pr-4
//                           text-sm
//                           font-bold
//                           text-emerald-600
//                           outline-none
//                           focus:bg-white
//                           focus:border-orange-500
//                         "
//                       />

//                       <IndianRupee
//                         size={18}
//                         className="
//                           absolute
//                           left-3
//                           top-3
//                           text-emerald-600
//                         "
//                       />
//                     </div>

//                     {errors.expectedBudget && (
//                       <p className="text-red-500 text-xs font-semibold mt-1">
//                         {errors.expectedBudget.message}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* BUTTONS */}

//                 <div
//                   className="
//                   flex
//                   justify-between
//                   pt-4
//                   border-t
//                   border-slate-100
//                 "
//                 >
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     className="
//                       bg-slate-100
//                       hover:bg-slate-200
//                       text-slate-700
//                       font-bold
//                       px-6
//                       h-11
//                       rounded-2xl
//                       flex
//                       items-center
//                       gap-2
//                       text-sm
//                     "
//                   >
//                     <ChevronLeft size={16} />
//                     Previous
//                   </button>

//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="
//                       bg-slate-900
//                       hover:bg-orange-600
//                       text-white
//                       font-bold
//                       px-7
//                       h-11
//                       rounded-2xl
//                       flex
//                       items-center
//                       gap-2
//                       text-sm
//                     "
//                   >
//                     Next Step
//                     <ChevronRight size={16} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* =====================================
//                 STEP 3
//             ===================================== */}

//             {step === 3 && (
//               <div className="space-y-6">
//                 <div className="border-b border-slate-100 pb-3">
//                   <h2
//                     className="
//                     text-lg
//                     font-bold
//                     text-slate-900
//                     flex
//                     items-center
//                     gap-2
//                   "
//                   >
//                     <FileText className="text-orange-500" size={20} />
//                     Additional Instructions
//                   </h2>
//                 </div>

//                 <div>
//                   <label
//                     className="
//                     text-xs
//                     font-bold
//                     text-slate-700
//                     uppercase
//                     tracking-wider
//                     mb-1.5
//                     block
//                   "
//                   >
//                     Remarks & Instructions
//                   </label>

//                   <textarea
//                     rows={5}
//                     placeholder="Write instructions regarding loading time, tarp requirement, driver details needed, etc."
//                     {...register("remarks")}
//                     className="
//                       w-full
//                       bg-slate-50
//                       border
//                       border-slate-200
//                       rounded-2xl
//                       p-4
//                       text-sm
//                       text-slate-800
//                       outline-none
//                       focus:bg-white
//                       focus:border-orange-500
//                       resize-none
//                     "
//                   />
//                 </div>

//                 <div
//                   className="
//                   flex
//                   justify-between
//                   pt-4
//                   border-t
//                   border-slate-100
//                 "
//                 >
//                   <button
//                     type="button"
//                     onClick={prevStep}
//                     className="
//                       bg-slate-100
//                       hover:bg-slate-200
//                       text-slate-700
//                       font-bold
//                       px-6
//                       h-11
//                       rounded-2xl
//                       flex
//                       items-center
//                       gap-2
//                       text-sm
//                     "
//                   >
//                     <ChevronLeft size={16} />
//                     Previous
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="
//                       bg-orange-500
//                       hover:bg-orange-600
//                       text-white
//                       font-bold
//                       px-8
//                       h-11
//                       rounded-2xl
//                       flex
//                       items-center
//                       gap-2
//                       text-sm
//                       disabled:opacity-50
//                     "
//                   >
//                     {loading ? (
//                       <>
//                         <div
//                           className="
//                           w-4
//                           h-4
//                           border-2
//                           border-white
//                           border-t-transparent
//                           rounded-full
//                           animate-spin
//                         "
//                         />
//                         Submitting...
//                       </>
//                     ) : (
//                       "Submit"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* =====================================
//               RIGHT SUMMARY
//           ===================================== */}

//           <div className="lg:col-span-1">
//             <div
//               className="
//               bg-slate-900
//               text-white
//               rounded-3xl
//               p-6
//               shadow-xl
//               sticky
//               top-6
//               space-y-5
//               border
//               border-slate-800
//             "
//             >
//               <div
//                 className="
//                 flex
//                 items-center
//                 justify-between
//                 border-b
//                 border-slate-800
//                 pb-4
//               "
//               >
//                 <h3
//                   className="
//                   font-bold
//                   text-base
//                   flex
//                   items-center
//                   gap-2
//                 "
//                 >
//                   <FileText size={18} className="text-orange-500" />
//                   Order Summary
//                 </h3>

//                 <span
//                   className="
//                   text-[10px]
//                   uppercase
//                   tracking-wider
//                   bg-orange-500/10
//                   border
//                   border-orange-500/30
//                   text-orange-400
//                   font-bold
//                   px-2.5
//                   py-0.5
//                   rounded-full
//                 "
//                 >
//                   Live Preview
//                 </span>
//               </div>

//               <div
//                 className="
//                 space-y-3.5
//                 text-xs
//               "
//               >
//                 <div
//                   className="
//                   flex
//                   justify-between
//                   items-center
//                   py-1
//                   border-b
//                   border-slate-800/60
//                 "
//                 >
//                   <span className="text-slate-400">Category</span>

//                   <span className="font-bold">{formData.service || "—"}</span>
//                 </div>

//                 <div
//                   className="
//                   flex
//                   justify-between
//                   items-center
//                   py-1
//                   border-b
//                   border-slate-800/60
//                 "
//                 >
//                   <span className="text-slate-400">Vehicle Needed</span>

//                   <span className="font-bold">
//                     {formData.vehicleType || "—"}
//                   </span>
//                 </div>

//                 <div
//                   className="
//                   flex
//                   justify-between
//                   items-center
//                   py-1
//                   border-b
//                   border-slate-800/60
//                 "
//                 >
//                   <span className="text-slate-400">Goods & Weight</span>

//                   <span className="font-bold">
//                     {formData.goodsType || "—"}{" "}
//                     {formData.weight ? `(${formData.weight})` : ""}
//                   </span>
//                 </div>

//                 <div
//                   className="
//                   flex
//                   justify-between
//                   items-center
//                   py-1
//                   border-b
//                   border-slate-800/60
//                 "
//                 >
//                   <span className="text-slate-400">Pickup Point</span>

//                   <span
//                     className="
//                     font-bold
//                     text-emerald-400
//                     text-right
//                     max-w-[140px]
//                     truncate
//                   "
//                   >
//                     {formData.pickupLocation || "—"}
//                   </span>
//                 </div>

//                 <div
//                   className="
//                   flex
//                   justify-between
//                   items-center
//                   py-1
//                   border-b
//                   border-slate-800/60
//                 "
//                 >
//                   <span className="text-slate-400">Destination</span>

//                   <span
//                     className="
//                     font-bold
//                     text-rose-400
//                     text-right
//                     max-w-[140px]
//                     truncate
//                   "
//                   >
//                     {formData.loading_point || "—"}
//                   </span>
//                 </div>

//                 <div
//                   className="
//                   flex
//                   justify-between
//                   items-center
//                   py-1
//                   border-b
//                   border-slate-800/60
//                 "
//                 >
//                   <span className="text-slate-400">Loading Date</span>

//                   <span
//                     className="
//                     font-bold
//                     text-orange-400
//                   "
//                   >
//                     {formatDateToDDMMYYYY(formData.pickupDate)}
//                   </span>
//                 </div>

//                 <div
//                   className="
//                   flex
//                   justify-between
//                   items-center
//                   py-1
//                   border-b
//                   border-slate-800/60
//                 "
//                 >
//                   <span className="text-slate-400">Contact Person</span>

//                   <span className="font-bold">
//                     {formData.contactPerson || "—"}
//                   </span>
//                 </div>

//                 <div
//                   className="
//                   flex
//                   justify-between
//                   items-center
//                   py-1
//                   border-b
//                   border-slate-800/60
//                 "
//                 >
//                   <span className="text-slate-400">Phone</span>

//                   <span className="font-bold">
//                     {formData.contactNumber || "—"}
//                   </span>
//                 </div>

//                 <div
//                   className="
//                   flex
//                   justify-between
//                   items-center
//                   pt-2
//                 "
//                 >
//                   <span
//                     className="
//                     text-slate-400
//                     font-bold
//                     uppercase
//                     text-[10px]
//                   "
//                   >
//                     Target Budget
//                   </span>

//                   <span
//                     className="
//                     text-lg
//                     font-black
//                     text-emerald-400
//                   "
//                   >
//                     ₹{" "}
//                     {formData.expectedBudget
//                       ? Number(formData.expectedBudget).toLocaleString("en-IN")
//                       : "0"}
//                   </span>
//                 </div>

//                 <div
//                   className="
//                   bg-slate-800/80
//                   rounded-2xl
//                   p-3
//                   border
//                   border-slate-700/60
//                 "
//                 >
//                   <span
//                     className="
//                     text-[10px]
//                     font-bold
//                     text-slate-400
//                     uppercase
//                   "
//                   >
//                     Remarks
//                   </span>

//                   <p
//                     className="
//                     text-slate-300
//                     text-[11px]
//                     leading-relaxed
//                     break-words
//                   "
//                   >
//                     {formData.remarks || "No additional instructions added."}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
  
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../api/api";
import toast from "react-hot-toast";

import {
  Package,
  MapPin,
  Calendar,
  User,
  Phone,
  IndianRupee,
  FileText,
  Check,
  ChevronRight,
  ChevronLeft,
  Weight,
  Layers,
  ClipboardList,
} from "lucide-react";

export default function UserForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // ==========================================
  // LOCATION SEARCH STATE
  // ==========================================
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [openLocation, setOpenLocation] = useState(null);

  const pickupLocationRef = useRef(null);
  const destinationRef = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      category: "",
      vehicleType: "",
      service: "",
      goodsType: "",
      weight: "",
      pickupLocation: "",
      loading_point: "",
      pickupDate: "",
      contactPerson: "",
      contactNumber: "",
      expectedBudget: "",
      remarks: "",
    },
  });

  const categories = [
    "Transporter",
    "Broker",
    "Fleet Owner",
    "Truck Owner",
    "Logistics Company",
    "Warehouse",
    "Courier",
    "Packing & Moving",
    "Commission Agent",
    "RTO Agent",
    "Finance Agent",
    "Others",
  ];

  const vehicleTypes = [
    "Pickup / Auto",
    "LCV",
    "HCV/TRUCK",
    "Container",
    "Trailer",
    "Refrigerated Van",
    "Crane / JCB",
    "Hydra",
    "Mining Vehicle",
  ];

  const stepsInfo = [
    { id: 1, label: "Shipment Details" },
    { id: 2, label: "Contact & Budget" },
    { id: 3, label: "Final Instructions" },
  ];

  const formData = watch();
  const pickupValue = watch("pickupLocation");
  const destinationValue = watch("loading_point");

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      const insidePickup = pickupLocationRef.current?.contains(e.target);
      const insideDestination = destinationRef.current?.contains(e.target);

      if (!insidePickup && !insideDestination) {
        setOpenLocation(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounced Location API Call
  useEffect(() => {
    const searchTerm =
      openLocation === "pickup"
        ? pickupValue
        : openLocation === "destination"
        ? destinationValue
        : "";

    if (!openLocation || !searchTerm || searchTerm.trim().length < 2) {
      setLocationSuggestions([]);
      setLocationLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLocationLoading(true);
        const res = await API.get(
          `/location/search?query=${encodeURIComponent(searchTerm.trim())}`
        );

        if (res.data?.success) {
          setLocationSuggestions(res.data.data || []);
        } else {
          setLocationSuggestions([]);
        }
      } catch (error) {
        console.error("Location search error:", error);
        setLocationSuggestions([]);
      } finally {
        setLocationLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [pickupValue, destinationValue, openLocation]);

  const selectLocation = (fieldName, item) => {
    const value = item?.name || item?.label || "";
    setValue(fieldName, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setLocationSuggestions([]);
    setOpenLocation(null);
  };

  const renderLocationSuggestions = (fieldName) => {
    const activeLocation =
      fieldName === "pickupLocation" ? "pickup" : "destination";

    if (openLocation !== activeLocation) return null;

    return (
      <div className="absolute left-0 right-0 top-full mt-2 z-[9999]">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          {locationLoading ? (
            <div className="px-4 py-3 text-sm text-slate-500">
              Searching locations...
            </div>
          ) : locationSuggestions.length > 0 ? (
            <ul className="max-h-56 overflow-y-auto">
              {locationSuggestions.map((item, index) => (
                <li
                  key={item._id || `${item.name}-${item.state}-${index}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectLocation(fieldName, item)}
                  className="px-4 py-3 cursor-pointer border-b border-slate-100 last:border-b-0 hover:bg-orange-50 transition"
                >
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-orange-500 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.state || "India"}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-slate-500 text-center">
              No results found
            </div>
          )}
        </div>
      </div>
    );
  };

  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return "-";
    const parts = dateString.split("-");
    if (parts.length !== 3) return dateString;
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  };

  const nextStep = async () => {
    let fields = [];
    if (step === 1) {
      fields = [
        "service",
        "vehicleType",
        "goodsType",
        "weight",
        "pickupLocation",
        "loading_point",
        "pickupDate",
      ];
    } else if (step === 2) {
      fields = ["contactPerson", "contactNumber", "expectedBudget"];
    } else if (step === 3) {
      fields = ["remarks"];
    }

    const valid = await trigger(fields);
    if (valid) {
      setStep((prev) => prev + 1);
      if (window.innerWidth < 1024) {
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }, 50);
      }
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 50);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        formattedPickupDate: formatDateToDDMMYYYY(data.pickupDate),
      };

      const res = await API.post("/booking/create", payload);
      toast.success(res.data.message || "Load created successfully");
      reset();
      setStep(1);
      setLocationSuggestions([]);
      setOpenLocation(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <div className="w-full bg-slate-50/50 min-h-screen py-6 sm:py-8 px-3 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* =====================================
            TOP BAR WITH INQUIRY STATUS BUTTON
        ===================================== */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">
              Create Shipment Load
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Fill details to request instant quotes from verified transporters
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/showenquiery")}
           className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 border border-green-600 hover:border-green-700 text-white rounded-2xl shadow-sm text-xs sm:text-sm font-bold transition-all shrink-0 active:scale-95"
          >
            <ClipboardList size={16} className="text-white" />
            <span> CHEAK ENQUIRY STATUS</span>
            <ChevronRight size={14} className="hidden sm:inline-block text-slate-400" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={handleKeyDown}
          className="grid lg:grid-cols-3 gap-6"
        >
          {/* =====================================
              MAIN FORM
          ===================================== */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            
            {/* STEP PROGRESS */}
            <div className="mb-8 relative">
              <div className="relative flex items-center justify-between">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full z-0 rounded-full" />
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-500 z-0 rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
                  }}
                />

                {stepsInfo.map((s) => (
                  <div key={s.id} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 border-2 ${
                        step > s.id
                          ? "bg-orange-500 border-orange-500 text-white"
                          : step === s.id
                          ? "bg-white border-orange-500 text-orange-600 ring-4 ring-orange-100"
                          : "bg-white border-slate-300 text-slate-400"
                      }`}
                    >
                      {step > s.id ? <Check size={16} strokeWidth={3} /> : `0${s.id}`}
                    </div>
                    <span
                      className={`text-[11px] font-semibold mt-2 ${
                        step >= s.id ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 1: Shipment Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="text-orange-500" size={20} /> Shipment Specifications
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                      Service Category
                    </label>
                    <select
                      {...register("service", {
                        required: "Service category is required",
                      })}
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl px-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                    >
                      <option value="">Select Service Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-red-500 text-xs font-semibold mt-1">
                        {errors.service.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                      Vehicle Type
                    </label>
                    <select
                      {...register("vehicleType", {
                        required: "Vehicle Type is required",
                      })}
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl px-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                    >
                      <option value="">Select Vehicle Type</option>
                      {vehicleTypes.map((vehicle) => (
                        <option key={vehicle} value={vehicle}>
                          {vehicle}
                        </option>
                      ))}
                    </select>
                    {errors.vehicleType && (
                      <p className="text-red-500 text-xs font-semibold mt-1">
                        {errors.vehicleType.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                      Goods Type
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Industrial Equipment"
                        {...register("goodsType", {
                          required: "Goods Type Required",
                        })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                      />
                      <Package
                        size={18}
                        className="absolute left-3 top-3 text-slate-400"
                      />
                    </div>
                    {errors.goodsType && (
                      <p className="text-red-500 text-xs font-semibold mt-1">
                        {errors.goodsType.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                      Weight
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. 15 Tons"
                        {...register("weight", {
                          required: "Weight Required",
                        })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                      />
                      <Weight
                        size={18}
                        className="absolute left-3 top-3 text-slate-400"
                      />
                    </div>
                    {errors.weight && (
                      <p className="text-red-500 text-xs font-semibold mt-1">
                        {errors.weight.message}
                      </p>
                    )}
                  </div>

                  {/* PICKUP LOCATION */}
                  <div ref={pickupLocationRef} className="relative">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                      Pickup / Loading Point
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search pickup location..."
                        autoComplete="off"
                        {...register("pickupLocation", {
                          required: "Pickup location is required",
                          onChange: (e) => {
                            setOpenLocation("pickup");
                            if (!e.target.value.trim()) {
                              setLocationSuggestions([]);
                            }
                          },
                        })}
                        onFocus={() => setOpenLocation("pickup")}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                      />
                      <MapPin
                        size={18}
                        className="absolute left-3 top-3 text-orange-500 pointer-events-none"
                      />
                    </div>
                    {renderLocationSuggestions("pickupLocation")}
                    {errors.pickupLocation && (
                      <p className="text-red-500 text-xs font-semibold mt-1">
                        {errors.pickupLocation.message}
                      </p>
                    )}
                  </div>

                  {/* DESTINATION */}
                  <div ref={destinationRef} className="relative">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                      Unloading / Destination
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search destination..."
                        autoComplete="off"
                        {...register("loading_point", {
                          required: "Destination is required",
                          onChange: (e) => {
                            setOpenLocation("destination");
                            if (!e.target.value.trim()) {
                              setLocationSuggestions([]);
                            }
                          },
                        })}
                        onFocus={() => setOpenLocation("destination")}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                      />
                      <MapPin
                        size={18}
                        className="absolute left-3 top-3 text-orange-500 pointer-events-none"
                      />
                    </div>
                    {renderLocationSuggestions("loading_point")}
                    {errors.loading_point && (
                      <p className="text-red-500 text-xs font-semibold mt-1">
                        {errors.loading_point.message}
                      </p>
                    )}
                  </div>

                  {/* DATE */}
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                      Loading Date
                    </label>
                    <div className="relative">
                      <Controller
                        control={control}
                        name="pickupDate"
                        rules={{
                          required: "Pickup Date Required",
                        }}
                        render={({ field }) => (
                          <DatePicker
                            selected={
                              field.value && !isNaN(new Date(field.value))
                                ? new Date(field.value)
                                : null
                            }
                            onChange={(date) => {
                              if (!date || isNaN(date)) {
                                field.onChange("");
                                return;
                              }
                              const year = date.getFullYear();
                              const month = String(date.getMonth() + 1).padStart(2, "0");
                              const day = String(date.getDate()).padStart(2, "0");
                              field.onChange(`${year}-${month}-${day}`);
                            }}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Loading Date"
                            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 cursor-pointer"
                            onKeyDown={(e) =>
                              e.key === "Enter" && e.preventDefault()
                            }
                          />
                        )}
                      />
                      <Calendar
                        size={18}
                        className="absolute left-3 top-3 text-orange-500 pointer-events-none"
                      />
                    </div>
                    {errors.pickupDate && (
                      <p className="text-red-500 text-xs font-semibold mt-1">
                        {errors.pickupDate.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-slate-900 hover:bg-orange-600 text-white font-bold px-7 h-11 rounded-2xl flex items-center gap-2 text-sm transition-all shadow-md"
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Contact & Budget */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <User className="text-orange-500" size={20} /> Contact & Budget Info
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                      Contact Person Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Rajesh Kumar"
                        {...register("contactPerson", {
                          required: "Contact Person is required",
                        })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                      />
                      <User
                        size={18}
                        className="absolute left-3 top-3 text-slate-400"
                      />
                    </div>
                    {errors.contactPerson && (
                      <p className="text-red-500 text-xs font-semibold mt-1">
                        {errors.contactPerson.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                      Contact Mobile Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        {...register("contactNumber", {
                          required: "Contact Number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Enter valid 10-digit number",
                          },
                        })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500"
                      />
                      <Phone
                        size={18}
                        className="absolute left-3 top-3 text-slate-400"
                      />
                    </div>
                    {errors.contactNumber && (
                      <p className="text-red-500 text-xs font-semibold mt-1">
                        {errors.contactNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                      Target Freight Budget (₹)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Enter estimated budget amount"
                        {...register("expectedBudget", {
                          min: {
                            value: 100,
                            message: "Minimum budget should be ₹100",
                          },
                        })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm font-bold text-emerald-600 outline-none focus:bg-white focus:border-orange-500"
                      />
                      <IndianRupee
                        size={18}
                        className="absolute left-3 top-3 text-emerald-600"
                      />
                    </div>
                    {errors.expectedBudget && (
                      <p className="text-red-500 text-xs font-semibold mt-1">
                        {errors.expectedBudget.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 h-11 rounded-2xl flex items-center gap-2 text-sm transition-all"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-slate-900 hover:bg-orange-600 text-white font-bold px-7 h-11 rounded-2xl flex items-center gap-2 text-sm transition-all shadow-md"
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Additional Instructions */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="text-orange-500" size={20} /> Additional Instructions
                  </h2>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">
                    Remarks & Instructions
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Write instructions regarding loading time, tarp requirement, driver details needed, etc."
                    {...register("remarks")}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 resize-none"
                  />
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 h-11 rounded-2xl flex items-center gap-2 text-sm transition-all"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-11 rounded-2xl flex items-center gap-2 text-sm disabled:opacity-50 transition-all shadow-md shadow-orange-500/20"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* =====================================
              RIGHT SUMMARY PANEL
          ===================================== */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl sticky top-6 space-y-5 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <FileText size={18} className="text-orange-500" /> Order Summary
                </h3>
                <span className="text-[10px] uppercase tracking-wider bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold px-2.5 py-0.5 rounded-full">
                  Live Preview
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Category</span>
                  <span className="font-bold">{formData.service || "—"}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Vehicle Needed</span>
                  <span className="font-bold">{formData.vehicleType || "—"}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Goods & Weight</span>
                  <span className="font-bold">
                    {formData.goodsType || "—"}{" "}
                    {formData.weight ? `(${formData.weight})` : ""}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Pickup Point</span>
                  <span className="font-bold text-emerald-400 text-right max-w-[140px] truncate">
                    {formData.pickupLocation || "—"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Destination</span>
                  <span className="font-bold text-rose-400 text-right max-w-[140px] truncate">
                    {formData.loading_point || "—"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Loading Date</span>
                  <span className="font-bold text-orange-400">
                    {formatDateToDDMMYYYY(formData.pickupDate)}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Contact Person</span>
                  <span className="font-bold">{formData.contactPerson || "—"}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Phone</span>
                  <span className="font-bold">{formData.contactNumber || "—"}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-400 font-bold uppercase text-[10px]">
                    Target Budget
                  </span>
                  <span className="text-lg font-black text-emerald-400">
                    ₹{" "}
                    {formData.expectedBudget
                      ? Number(formData.expectedBudget).toLocaleString("en-IN")
                      : "0"}
                  </span>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700/60">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Remarks
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed break-words mt-1">
                    {formData.remarks || "No additional instructions added."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
