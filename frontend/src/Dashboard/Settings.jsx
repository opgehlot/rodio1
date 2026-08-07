
// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import {
//   Phone,
//   Building2,
//   MapPin,
//   Map,
//   Navigation,
//   Hash,
//   ArrowRight,
//   Loader2,
//   Plus,
//   Trash2,
//   ShieldAlert,
// } from "lucide-react";

// import API from "../api/api";
// import { AuthContext } from "../context/AuthContext";

//  export default function Settings() {
//   const navigate = useNavigate();
//   const { user, registerData } = useContext(AuthContext);

//   const primaryMobile =
//     user?.mobile ||
//     user?.phoneNumber ||
//     registerData?.mobile ||
//     "";

//   const fixedCategory = user?.role || registerData?.role || "";
//   const fixedFirmName = user?.firmName || registerData?.firmName || user?.businessName || "";

//   const [loading, setLoading] = useState(false);
//   const [fetchingDraft, setFetchingDraft] = useState(true);

//   // Form State (Name & Email Removed, Alternate Numbers Array Added)
//   const [formData, setFormData] = useState({
//     category: fixedCategory,
//     firmName: fixedFirmName,
//     address: "",
//     currentCity: "",
//     currentState: "",
//     pincode: "",
//     alternatePhoneNumbers: [""],
//   });

//   // ======================================================
//   // LOAD BUSINESS DATA (GET)
//   // ======================================================
//   useEffect(() => {
//     const loadBusinessData = async () => {
//       try {
//         const { data } = await API.get("/business/me");
//         const business = data?.data;

//         if (business) {
//           setFormData({
//             category: business.category || fixedCategory,
//             firmName: business.firmName || fixedFirmName || "",
//             address: business.address || "",
//             currentCity: business.currentCity || "",
//             currentState: business.currentState || "",
//             pincode: business.pincode || "",
//             alternatePhoneNumbers:
//               business.alternatePhoneNumbers && business.alternatePhoneNumbers.length > 0
//                 ? business.alternatePhoneNumbers
//                 : [""],
//           });
//         }
//       } catch (error) {
//         if (error?.response?.status !== 404) {
//           console.error("LOAD BUSINESS ERROR:", error);
//         }
//       } finally {
//         setFetchingDraft(false);
//       }
//     };

//     loadBusinessData();
//   }, [navigate, user, registerData, fixedCategory, fixedFirmName]);

//   // ======================================================
//   // HANDLE INPUT CHANGE
//   // ======================================================
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handlePincode = (e) => {
//     const value = e.target.value.replace(/\D/g, "").slice(0, 6);
//     setFormData((prev) => ({
//       ...prev,
//       pincode: value,
//     }));
//   };

//   // ======================================================
//   // ALTERNATE PHONE NUMBERS HANDLERS (Add & Remove)
//   // ======================================================
//   const handleAlternatePhoneChange = (index, value) => {
//     const updatedNumbers = [...formData.alternatePhoneNumbers];
//     updatedNumbers[index] = value.replace(/\D/g, "").slice(0, 10);
//     setFormData((prev) => ({
//       ...prev,
//       alternatePhoneNumbers: updatedNumbers,
//     }));
//   };

//   const addAlternatePhoneField = () => {
//     setFormData((prev) => ({
//       ...prev,
//       alternatePhoneNumbers: [...prev.alternatePhoneNumbers, ""],
//     }));
//   };

//   const removeAlternatePhoneField = (index) => {
//     const updatedNumbers = formData.alternatePhoneNumbers.filter((_, i) => i !== index);
//     setFormData((prev) => ({
//       ...prev,
//       alternatePhoneNumbers: updatedNumbers.length > 0 ? updatedNumbers : [""],
//     }));
//   };

//   // ======================================================
//   // SUBMIT / UPDATE FORM (POST / PUT)
//   // ======================================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//      const payload = {
//   address: (formData.address || "").trim(),
//   currentCity: (formData.currentCity || "").trim(),
//   currentState: (formData.currentState || "").trim(),
//   pincode: (formData.pincode || "").trim(),
//   alternatePhoneNumbers: (formData.alternatePhoneNumbers || [])
//     .map((num) => (num || "").trim())
//     .filter((num) => num.length > 0),
// };
//       // ye wali pai cahnge kari he hamne palhe post thi ab patch he 
//       const { data } = await API.patch("/business/update-details", payload);

//       if (data?.data?.businessId) {
//         localStorage.setItem("businessId", data.data.businessId);
//       }

//       toast.success(data?.message || "Business details saved successfully");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("SAVE BUSINESS ERROR:", error);
//       toast.error(
//         error?.response?.data?.message || "Unable to save business details"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetchingDraft) {
//     return (
//       <div className="w-full h-[80vh] flex items-center justify-center bg-slate-50">
//         <Loader2 className="animate-spin text-blue-600" size={40} />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-full bg-slate-50/50 p-4 sm:p-6 lg:p-8">
//       <div className="max-w-5xl mx-auto space-y-6">
        
//         {/* TOP HEADER TITLE */}
//         <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
//               Business Contact & Location
//             </h1>
//             <p className="text-slate-500 text-sm mt-1 font-medium">
//               Update your operational address, city, state, and secondary communication lines.
//             </p>
//           </div>
//           <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
//             <Building2 size={14} />
//             {formData.category || "Business Profile"}
//           </div>
//         </div>

//         {/* MAIN FORM CONTAINER */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden"
//         >
//           {/* SECTION 1: CONTACT DETAILS */}
//           <div className="p-6 sm:p-8 border-b border-slate-100">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
//                 01
//               </div>
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900 tracking-tight">
//                   Phone Numbers Configuration
//                 </h2>
//                 <p className="text-xs text-slate-500 font-medium">
//                   Primary mobile number is locked. Add backup alternate numbers for customers.
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* PRIMARY MOBILE (Locked) */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//                   Primary Mobile Number <span className="text-slate-400 font-normal">(Registered)</span>
//                 </label>
//                 <div className="relative">
//                   <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                   <input
//                     type="text"
//                     value={primaryMobile}
//                     readOnly
//                     tabIndex={-1}
//                     className="w-full h-12 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 pl-11 pr-4 outline-none cursor-not-allowed font-semibold text-sm"
//                   />
//                 </div>
//               </div>

//               {/* EMPTY COLUMN FOR SPACING */}
//               <div className="hidden md:block"></div>

//               {/* ALTERNATE NUMBERS DYNAMIC SECTION */}
//               <div className="md:col-span-2 bg-slate-50/60 p-5 rounded-xl border border-slate-200/60">
//                 <div className="flex justify-between items-center mb-4">
//                   <div>
//                     <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
//                       Alternate Phone Numbers
//                     </label>
//                     <span className="text-[11px] text-slate-500 font-medium">
//                       Click the button on the right to add more numbers.
//                     </span>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={addAlternatePhoneField}
//                     className="h-9 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
//                   >
//                     <Plus size={15} /> Add Number
//                   </button>
//                 </div>

//                 <div className="space-y-3">
//                   {formData.alternatePhoneNumbers.map((altPhone, index) => (
//                     <div key={index} className="flex items-center gap-3">
//                       <div className="relative flex-1">
//                         <Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                         <input
//                           type="text"
//                           value={altPhone}
//                           onChange={(e) => handleAlternatePhoneChange(index, e.target.value)}
//                           placeholder="Enter 10-digit alternate mobile number"
//                           maxLength={10}
//                           className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-11 pr-4 outline-none focus:border-blue-600 text-sm font-semibold text-slate-800 placeholder:text-slate-400 shadow-2xs"
//                         />
//                       </div>
//                       {formData.alternatePhoneNumbers.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => removeAlternatePhoneField(index)}
//                           className="h-11 w-11 bg-rose-50 text-rose-600 rounded-xl border border-rose-200 flex items-center justify-center hover:bg-rose-100 transition shrink-0 cursor-pointer"
//                           title="Remove field"
//                         >
//                           <Trash2 size={17} />
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SECTION 2: LOCATION & ADDRESS */}
//           <div className="p-6 sm:p-8">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
//                 02
//               </div>
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900 tracking-tight">
//                   Location & Address Details
//                 </h2>
//                 <p className="text-xs text-slate-500 font-medium">
//                   Provide your precise physical dispatch or office address.
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
//               {/* ADDRESS */}
//               <div className="md:col-span-2">
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//                   Complete Street Address
//                 </label>
//                 <div className="relative">
//                   <MapPin size={18} className="absolute left-4 top-4 text-slate-400" />
//                   <textarea
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     rows={3}
//                     placeholder="Enter building name, street, landmark, area"
//                     className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3 outline-none resize-none focus:border-blue-600 focus:bg-white text-sm font-semibold text-slate-800 placeholder:text-slate-400 transition shadow-2xs"
//                   />
//                 </div>
//               </div>

//               {/* CITY */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//                   Current City
//                 </label>
//                 <div className="relative">
//                   <Navigation size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                   <input
//                     type="text"
//                     name="currentCity"
//                     value={formData.currentCity}
//                     onChange={handleChange}
//                     placeholder="e.g. Mumbai, Delhi"
//                     className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 outline-none focus:border-blue-600 focus:bg-white text-sm font-semibold text-slate-800 placeholder:text-slate-400 transition shadow-2xs"
//                   />
//                 </div>
//               </div>

//               {/* STATE */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//                   Current State
//                 </label>
//                 <div className="relative">
//                   <Map size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                   <input
//                     type="text"
//                     name="currentState"
//                     value={formData.currentState}
//                     onChange={handleChange}
//                     placeholder="e.g. Maharashtra"
//                     className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 outline-none focus:border-blue-600 focus:bg-white text-sm font-semibold text-slate-800 placeholder:text-slate-400 transition shadow-2xs"
//                   />
//                 </div>
//               </div>

//               {/* PINCODE */}
//               <div className="md:col-span-2">
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
//                   Pincode / Postal Code
//                 </label>
//                 <div className="relative">
//                   <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
//                   <input
//                     type="text"
//                     name="pincode"
//                     value={formData.pincode}
//                     onChange={handlePincode}
//                     maxLength={6}
//                     inputMode="numeric"
//                     placeholder="6-digit pincode"
//                     className="w-full md:w-1/2 h-12 rounded-xl border border-slate-200 bg-slate-50/50 pl-11 pr-4 outline-none focus:border-blue-600 focus:bg-white text-sm font-semibold text-slate-800 placeholder:text-slate-400 transition shadow-2xs"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* ACTION SUBMIT FOOTER */}
//             <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
//                 <ShieldAlert size={16} className="text-amber-500 shrink-0" />
//                 <span>Changes will be instantly reflected on your live company dashboard.</span>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full sm:w-auto h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-sm"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 size={18} className="animate-spin" />
//                     <span>Updating Details...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Save Changes</span>
//                     <ArrowRight size={18} />
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Phone,
  Building2,
  MapPin,
  Map,
  Navigation,
  Hash,
  ArrowRight,
  Loader2,
  Plus,
  Trash2,
  ShieldAlert,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Settings() {
  const navigate = useNavigate();
  const { user, registerData } = useContext(AuthContext);

  const primaryMobile =
    user?.mobile ||
    user?.phoneNumber ||
    registerData?.mobile ||
    "";

  const fixedCategory = user?.role || registerData?.role || "";
  const fixedFirmName = user?.firmName || registerData?.firmName || user?.businessName || "";

  const [loading, setLoading] = useState(false);
  const [fetchingDraft, setFetchingDraft] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    category: fixedCategory,
    firmName: fixedFirmName,
    address: "",
    currentCity: "",
    currentState: "",
    pincode: "",
    alternatePhoneNumbers: [""],
  });

  // ======================================================
  // LOAD BUSINESS DATA (GET)
  // ======================================================
  useEffect(() => {
    const loadBusinessData = async () => {
      try {
        const { data } = await API.get("/business/me");
        const business = data?.data;

        if (business) {
          setFormData({
            category: business.category || fixedCategory,
            firmName: business.firmName || fixedFirmName || "",
            address: business.address || "",
            currentCity: business.currentCity || "",
            currentState: business.currentState || "",
            pincode: business.pincode || "",
            alternatePhoneNumbers:
              business.alternatePhoneNumbers && business.alternatePhoneNumbers.length > 0
                ? business.alternatePhoneNumbers
                : [""],
          });
        }
      } catch (error) {
        if (error?.response?.status !== 404) {
          console.error("LOAD BUSINESS ERROR:", error);
        }
      } finally {
        setFetchingDraft(false);
      }
    };

    loadBusinessData();
  }, [navigate, user, registerData, fixedCategory, fixedFirmName]);

  // ======================================================
  // HANDLE INPUT CHANGE
  // ======================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePincode = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setFormData((prev) => ({
      ...prev,
      pincode: value,
    }));
  };

  // ======================================================
  // ALTERNATE PHONE NUMBERS HANDLERS (Add & Remove)
  // ======================================================
  const handleAlternatePhoneChange = (index, value) => {
    const updatedNumbers = [...formData.alternatePhoneNumbers];
    updatedNumbers[index] = value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({
      ...prev,
      alternatePhoneNumbers: updatedNumbers,
    }));
  };

  const addAlternatePhoneField = () => {
    setFormData((prev) => ({
      ...prev,
      alternatePhoneNumbers: [...prev.alternatePhoneNumbers, ""],
    }));
  };

  const removeAlternatePhoneField = (index) => {
    const updatedNumbers = formData.alternatePhoneNumbers.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      alternatePhoneNumbers: updatedNumbers.length > 0 ? updatedNumbers : [""],
    }));
  };

  // ======================================================
  // SUBMIT / UPDATE FORM (PATCH)
  // ======================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        address: (formData.address || "").trim(),
        currentCity: (formData.currentCity || "").trim(),
        currentState: (formData.currentState || "").trim(),
        pincode: (formData.pincode || "").trim(),
        alternatePhoneNumbers: (formData.alternatePhoneNumbers || [])
          .map((num) => (num || "").trim())
          .filter((num) => num.length > 0),
      };

      const { data } = await API.patch("/business/update-details", payload);

      if (data?.data?.businessId) {
        localStorage.setItem("businessId", data.data.businessId);
      }

      toast.success(data?.message || "Business details saved successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("SAVE BUSINESS ERROR:", error);
      toast.error(
        error?.response?.data?.message || "Unable to save business details"
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetchingDraft) {
    return (
      <div className="w-full h-[80vh] flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-orange-600" size={40} />
      </div>
    );
  }

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
              Business Contact & Location
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Update your operational address, city, state, and secondary communication lines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 flex items-center gap-2">
              <ShieldCheck className="text-orange-600 w-4 h-4" />
              <span>Registry Status: <strong className="text-slate-900">Active</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Fluid Container */}
      <div className="w-full px-6 lg:px-12">
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Section (Spans 8 columns) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8 space-y-8">
            
            {/* SECTION 1: CONTACT DETAILS */}
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-sm">
                    01
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                      Phone Numbers Configuration
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Primary mobile number is locked. Add backup alternate numbers for customers.
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-xs text-orange-600 font-semibold bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                  <CheckCircle2 size={14} /> Secure Line
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PRIMARY MOBILE (Locked) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Primary Mobile Number <span className="text-slate-400 font-normal">(Registered)</span>
                  </label>
                  <div className="relative flex items-center">
                    <Phone size={18} className="absolute left-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={primaryMobile}
                      readOnly
                      tabIndex={-1}
                      className="w-full h-12 rounded-xl border border-slate-200 bg-slate-100 text-slate-600 pl-10 pr-4 outline-none cursor-not-allowed font-semibold text-sm"
                    />
                  </div>
                </div>

                <div className="hidden md:block"></div>

                {/* ALTERNATE NUMBERS DYNAMIC SECTION */}
                <div className="md:col-span-2 bg-slate-50/60 p-5 rounded-xl border border-slate-200/60">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Alternate Phone Numbers
                      </label>
                      <span className="text-[11px] text-slate-500 font-medium">
                        Click the button on the right to add more numbers.
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={addAlternatePhoneField}
                      className="h-9 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                    >
                      <Plus size={15} /> Add Number
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.alternatePhoneNumbers.map((altPhone, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="relative flex-1 flex items-center">
                          <Phone size={17} className="absolute left-3.5 text-slate-400" />
                          <input
                            type="text"
                            value={altPhone}
                            onChange={(e) => handleAlternatePhoneChange(index, e.target.value)}
                            placeholder="Enter 10-digit alternate mobile number"
                            maxLength={10}
                            className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-10 pr-4 outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 text-sm font-semibold text-slate-800 placeholder:text-slate-400 transition"
                          />
                        </div>
                        {formData.alternatePhoneNumbers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAlternatePhoneField(index)}
                            className="h-11 w-11 bg-rose-50 text-rose-600 rounded-xl border border-rose-200 flex items-center justify-center hover:bg-rose-100 transition shrink-0 cursor-pointer"
                            title="Remove field"
                          >
                            <Trash2 size={17} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: LOCATION & ADDRESS */}
            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-sm">
                  02
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    Location & Address Details
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Provide your precise physical dispatch or office address.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* ADDRESS */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Complete Street Address
                  </label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-3.5 top-4 text-slate-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Enter building name, street, landmark, area"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 outline-none resize-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 focus:bg-white text-sm font-semibold text-slate-800 placeholder:text-slate-400 transition"
                    />
                  </div>
                </div>

                {/* CITY */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Current City
                  </label>
                  <div className="relative flex items-center">
                    <Navigation size={18} className="absolute left-3.5 text-slate-400" />
                    <input
                      type="text"
                      name="currentCity"
                      value={formData.currentCity}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai, Delhi"
                      className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 focus:bg-white text-sm font-semibold text-slate-800 placeholder:text-slate-400 transition"
                    />
                  </div>
                </div>

                {/* STATE */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Current State
                  </label>
                  <div className="relative flex items-center">
                    <Map size={18} className="absolute left-3.5 text-slate-400" />
                    <input
                      type="text"
                      name="currentState"
                      value={formData.currentState}
                      onChange={handleChange}
                      placeholder="e.g. Maharashtra"
                      className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 focus:bg-white text-sm font-semibold text-slate-800 placeholder:text-slate-400 transition"
                    />
                  </div>
                </div>

                {/* PINCODE */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Pincode / Postal Code
                  </label>
                  <div className="relative flex items-center">
                    <Hash size={18} className="absolute left-3.5 text-slate-400" />
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handlePincode}
                      maxLength={6}
                      inputMode="numeric"
                      placeholder="6-digit pincode"
                      className="w-full md:w-1/2 h-12 rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 outline-none focus:border-orange-600 focus:ring-2 focus:ring-orange-600/20 focus:bg-white text-sm font-semibold text-slate-800 placeholder:text-slate-400 transition"
                    />
                  </div>
                </div>
              </div>

              {/* ACTION SUBMIT FOOTER */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <ShieldAlert size={16} className="text-orange-600 shrink-0" />
                  <span>Changes will be instantly reflected on your live company dashboard.</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto h-12 px-8 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Updating Details...</span>
                    </>
                  ) : (
                    <>
                      <span>Save Changes</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Right Information Column (Spans 4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <CheckCircle2 className="text-orange-600" size={18} />
                Directory Guidelines
              </h4>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                  Ensure correct state and pincode mapping for accurate freight freight matching.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                  Alternate phone numbers allow dispatch teams to reach backup coordinators easily.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                  All changes comply with enterprise transport verification protocols.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white p-6 shadow-sm">
              <h4 className="font-bold text-base mb-1">Enterprise Support Desk</h4>
              <p className="text-slate-300 text-xs mb-4">
                Facing issues updating your primary contact lines or firm address?
              </p>
              <div className="text-xs font-mono bg-white/10 px-3 py-2 rounded-xl inline-block border border-white/10">
                Support: support@rodiotradelink.com
              </div>
            </div>

          </div>

        </form>

      </div>

    </div>
  );
}



