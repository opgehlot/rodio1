
// import React, { useState, useEffect, useRef } from "react";
// import API from "../../api/api";
// import { Plus, Trash2, MapPin, Map, Loader2, ShieldCheck, CheckCircle2, Globe2, ArrowRight } from "lucide-react";

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

// // ===============================
// // StateSearchInput Component
// // ===============================
// const StateSearchInput = ({ placeholder, onSelectState, zIndex, value }) => {
//   const [searchTerm, setSearchTerm] = useState(value || "");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const dropdownRef = useRef(null);

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
//     if (searchTerm.trim().length > 0) {
//       const filtered = INDIAN_STATES.filter((state) =>
//         state.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setSuggestions(filtered);
//       setIsOpen(true);
//     } else {
//       setSuggestions([]);
//       setIsOpen(false);
//     }
//   }, [searchTerm]);

//   const handleSelect = (stateName) => {
//     setSearchTerm(stateName);
//     setIsOpen(false);
//     onSelectState(stateName);
//   };

//   return (
//     <div ref={dropdownRef} style={{ position: "relative", width: "100%", zIndex: isFocused ? zIndex : 1 }}>
//       <div className="relative flex items-center">
//         <Map size={18} className="absolute left-3.5 text-slate-400" />
//         <input
//           type="text"
//           value={searchTerm}
//           placeholder={placeholder}
//           onFocus={() => {
//             setIsFocused(true);
//             if (searchTerm.trim().length > 0) setIsOpen(true);
//           }}
//           onBlur={() => setIsFocused(false)}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             onSelectState(e.target.value);
//             setIsOpen(true);
//           }}
//           className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all placeholder:font-normal placeholder:text-slate-400"
//           required
//         />
//       </div>

//       {isOpen && suggestions.length > 0 && (
//         <ul className="suggestions-list absolute top-full left-0 right-0 bg-white border border-slate-200 shadow-lg rounded-xl mt-1.5 max-h-60 overflow-y-auto z-50 list-none m-0 p-0">
//           {suggestions.map((state, i) => (
//             <li
//               key={i}
//               onMouseDown={(e) => e.preventDefault()}
//               onClick={() => handleSelect(state)}
//               className="px-4 py-3 cursor-pointer hover:bg-orange-50/50 text-sm transition font-medium text-slate-700 border-b border-slate-100 last:border-b-0"
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
// // LocationSearchInput Component (For Cities)
// // ===============================
// const LocationSearchInput = ({ placeholder, onSelectLocation, zIndex, value }) => {
//   const [searchTerm, setSearchTerm] = useState(value || "");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const dropdownRef = useRef(null);

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
//     const timer = setTimeout(() => {
//       if (searchTerm.trim().length >= 2) {
//         setLoading(true);
//         API.get(`/location/search?query=${searchTerm}`)
//           .then((res) => {
//             if (res.data.success) {
//               setSuggestions(res.data.data);
//               setIsOpen(true);
//             }
//           })
//           .catch((err) => {
//             console.error("Location search error:", err);
//           })
//           .finally(() => setLoading(false));
//       } else {
//         setSuggestions([]);
//         setIsOpen(false);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   const handleSelect = (item) => {
//     setSearchTerm(item.name);
//     setIsOpen(false);
//     onSelectLocation(item);
//   };

//   return (
//     <div ref={dropdownRef} style={{ position: "relative", width: "100%", zIndex: isFocused ? zIndex : 1 }}>
//       <div className="relative flex items-center">
//         <MapPin size={18} className="absolute left-3.5 text-slate-400" />
//         <input
//           type="text"
//           value={searchTerm}
//           placeholder={placeholder}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             if (!isOpen) setIsOpen(true);
//           }}
//           className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all placeholder:font-normal placeholder:text-slate-400"
//           required
//         />
//       </div>

//       {loading && (
//         <div className="absolute right-3.5 top-3.5 text-slate-400 text-xs">
//           Loading...
//         </div>
//       )}

//       {isOpen && (suggestions.length > 0 || !loading) && (
//         <ul className="suggestions-list absolute top-full left-0 right-0 bg-white border border-slate-200 shadow-lg rounded-xl mt-1.5 max-h-60 overflow-y-auto z-50 list-none m-0 p-0">
//           {suggestions.length > 0 ? (
//             suggestions.map((item, i) => (
//               <li
//                 key={item._id || i}
//                 onMouseDown={(e) => e.preventDefault()}
//                 onClick={() => handleSelect(item)}
//                 className="px-4 py-3 cursor-pointer hover:bg-orange-50/50 text-sm flex justify-between items-center transition border-b border-slate-100 last:border-b-0"
//               >
//                 <div>
//                   <span className="font-semibold text-slate-800">{item.name}</span>, <small className="text-slate-500 font-medium">{item.state}</small>
//                 </div>
//                 <span className="text-[11px] font-semibold bg-orange-50 text-orange-600 px-2.5 py-1 rounded-lg border border-orange-100">Select</span>
//               </li>
//             ))
//           ) : (
//             <li className="px-4 py-4 text-slate-500 text-center text-xs font-medium">
//               No matching cities found in registry
//             </li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// // ===============================
// // Main WorkingArea Component
// // ===============================
// const WorkingArea = () => {
//   const [formData, setFormData] = useState({
//     workingAreas: [
//       {
//         state: "",
//         cities: [""],
//       },
//     ],
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

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
//       workingAreas: [
//         ...formData.workingAreas,
//         { state: "", cities: [""] },
//       ],
//     });
//   };

//   const removeWorkingArea = (index) => {
//     const updated = [...formData.workingAreas];
//     updated.splice(index, 1);
//     setFormData({ ...formData, workingAreas: updated });
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

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage({ type: "", text: "" });

//     try {
//       const response = await API.put("/business/working-areas", formData);
      
//       if (response.data) {
//         setMessage({
//           type: "success",
//           text: "Working areas successfully saved!",
//         });
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       setMessage({
//         type: "error",
//         text: error.response?.data?.message || "Something went wrong. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50/50 pb-20">
      
//       {/* Enterprise Header Banner */}
//       <div className="bg-white border-b border-slate-200 px-6 lg:px-12 py-6 mb-8">
//         <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 mb-1">
//               <span className="w-2 h-2 rounded-full bg-orange-600 inline-block"></span>
//               Rodio Tradelink Logistics Enterprise
//             </div>
//             <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
//               Operational Working Areas
//             </h1>
//             <p className="text-slate-500 text-sm mt-0.5">
//               Specify the commercial states and service hubs where your transport fleet operates.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 flex items-center gap-2">
//               <ShieldCheck className="text-orange-600 w-4 h-4" />
//               <span>Coverage Registry: <strong className="text-slate-900">Active</strong></span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Fluid Container (Fully spanning layout with grid integration) */}
//       <div className="w-full px-6 lg:px-12">
        
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
//           {/* Left Form Section (Spans 8 columns on large screens) */}
//           <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
            
//             <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
//               <div className="flex items-center gap-3.5">
//                 <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-sm">
//                   <Globe2 size={22} />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-bold text-slate-900">
//                     Territory Mapping Configuration
//                   </h3>
//                   <p className="text-xs text-slate-500">
//                     Add state sectors and specific city nodes for freight distribution.
//                   </p>
//                 </div>
//               </div>
//               <div className="hidden sm:flex items-center gap-1.5 text-xs text-orange-600 font-semibold bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
//                 <CheckCircle2 size={14} /> Multi-State Network
//               </div>
//             </div>

//             {/* Status Message Display */}
//             {message.text && (
//               <div
//                 className={`p-4 mb-6 rounded-xl text-sm font-semibold border flex items-center gap-2 ${
//                   message.type === "success"
//                     ? "bg-emerald-50 text-emerald-800 border-emerald-200"
//                     : "bg-rose-50 text-rose-800 border-rose-200"
//                 }`}
//               >
//                 {message.text}
//               </div>
//             )}

//             <div className="space-y-6">
//               {formData.workingAreas.map((area, areaIndex) => (
//                 <div
//                   key={areaIndex}
//                   className="border border-slate-200 rounded-2xl p-6 bg-slate-50/40 relative space-y-5"
//                 >
//                   {/* Row Header */}
//                   <div className="flex justify-between items-center pb-3 border-b border-slate-200/80">
//                     <span className="font-bold text-slate-800 text-sm tracking-wide uppercase">
//                       Territory Zone #{areaIndex + 1}
//                     </span>

//                     {formData.workingAreas.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeWorkingArea(areaIndex)}
//                         className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-semibold border border-rose-200 transition cursor-pointer"
//                       >
//                         <Trash2 size={14} />
//                         Remove Zone
//                       </button>
//                     )}
//                   </div>

//                   {/* State */}
//                   <div>
//                     <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
//                       State Territory <span className="text-rose-500">*</span>
//                     </label>
//                     <StateSearchInput
//                       placeholder="Type or select state..."
//                       value={area.state}
//                       zIndex={200 - areaIndex}
//                       onSelectState={(stateName) => handleStateChange(areaIndex, stateName)}
//                     />
//                   </div>

//                   {/* Cities */}
//                   <div>
//                     <div className="flex justify-between items-center mb-3">
//                       <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                         Operating City Nodes
//                       </label>
//                       <button
//                         type="button"
//                         onClick={() => addCity(areaIndex)}
//                         className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
//                       >
//                         <Plus size={14} />
//                         Add City Hub
//                       </button>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-3">
//                       {area.cities.map((city, cityIndex) => (
//                         <div
//                           key={cityIndex}
//                           className="flex gap-2 items-center relative"
//                         >
//                           <div className="flex-1">
//                             <LocationSearchInput
//                               placeholder="Search city hub..."
//                               value={city}
//                               zIndex={100 - cityIndex}
//                               onSelectLocation={(locationItem) =>
//                                 handleCitySelect(areaIndex, cityIndex, locationItem)
//                               }
//                             />
//                           </div>

//                           {area.cities.length > 1 && (
//                             <button
//                               type="button"
//                               onClick={() => removeCity(areaIndex, cityIndex)}
//                               className="bg-white hover:bg-rose-50 hover:text-rose-600 border border-slate-200 p-3 rounded-xl text-slate-500 transition cursor-pointer"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           )}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               {/* Action buttons */}
//               <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-slate-100 gap-4">
//                 <button
//                   type="button"
//                   onClick={addWorkingArea}
//                   className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-xl text-xs font-semibold border border-slate-200 flex items-center justify-center gap-2 transition cursor-pointer"
//                 >
//                   <Plus size={16} />
//                   Add Another State Zone
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
//                 >
//                   {loading && <Loader2 size={16} className="animate-spin" />}
//                   {loading ? "Synchronizing..." : "Save Working Areas"}
//                   {!loading && <ArrowRight size={16} />}
//                 </button>
//               </div>
//             </div>

//           </div>

//           {/* Right Information Column (Spans 4 columns for dashboard symmetry) */}
//           <div className="lg:col-span-4 space-y-6">
            
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//               <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
//                 <CheckCircle2 className="text-orange-600" size={18} />
//                 Network Coverage Rules
//               </h4>
//               <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
//                 <li className="flex items-start gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
//                   Accurate territory selection improves matching precision with high-intent enterprise shippers.
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
//                   List all major logistics centers and transit hubs where active vehicle positioning occurs.
//                 </li>
//                 <li className="flex items-start gap-2">
//                   <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
//                   Modifications update instantly across our national carrier dispatch registry.
//                 </li>
//               </ul>
//             </div>

//             <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white p-6 shadow-sm">
//               <h4 className="font-bold text-base mb-1">Territory Desk Support</h4>
//               <p className="text-slate-300 text-xs mb-4">
//                 Need assistance adding multi-state networks or updating operational regions?
//               </p>
//               <div className="text-xs font-mono bg-white/10 px-3 py-2 rounded-xl inline-block border border-white/10">
//                 Network Ops: coverage@rodiotradelink.com
//               </div>
//             </div>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// };

// export default WorkingArea;
import React, { useState, useEffect, useRef } from "react";
import API from "../../api/api";
import { Plus, Trash2, MapPin, Map as MapIcon, Loader2, RefreshCw, Navigation } from "lucide-react";

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

// ===============================
// State Search Input
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
        <MapIcon size={16} className="absolute left-3 text-slate-400" />
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
          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400"
          required
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-slate-200 shadow-lg rounded-lg mt-1 max-h-48 overflow-y-auto z-50 list-none m-0 p-0">
          {suggestions.map((state, i) => (
            <li
              key={i}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(state);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-orange-50 text-xs sm:text-sm font-medium text-slate-700 border-b border-slate-50 last:border-b-0"
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
// Location/City Search Input
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
        API.get(`/location/search?query=${searchTerm}`)
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
        <MapPin size={16} className="absolute left-3 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onChange={(e) => {
            isSelectingRef.current = false;
            setSearchTerm(e.target.value);
          }}
          className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all placeholder:text-slate-400"
          required
        />
        {loading && (
          <Loader2 size={14} className="absolute right-3 text-slate-400 animate-spin" />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-slate-200 shadow-lg rounded-lg mt-1 max-h-48 overflow-y-auto z-50 list-none m-0 p-0">
          {suggestions.map((item, i) => (
            <li
              key={item._id || i}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(item);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-orange-50 text-xs sm:text-sm flex justify-between items-center border-b border-slate-50 last:border-b-0"
            >
              <span className="font-medium text-slate-800">
                {item.name}, <span className="text-slate-400 text-xs">{item.state}</span>
              </span>
              <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-semibold">
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
// Main Component
// ===============================
const WorkingArea = () => {
  const [formData, setFormData] = useState({
    workingAreas: [{ state: "", cities: [""] }],
  });

  const [savedAreas, setSavedAreas] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [deletingKey, setDeletingKey] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchWorkingAreas = async () => {
    try {
      setInitialLoading(true);
      const res = await API.get("/business/working-areas");
      if (res.data?.success && Array.isArray(res.data.data)) {
        setSavedAreas(res.data.data);
      }
    } catch (error) {
      console.error("Fetch areas error:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkingAreas();
  }, []);

  const handleDeleteArea = async (area) => {
    const identifier = area._id || area.state;
    if (!identifier) return;

    if (!window.confirm(`Delete ${area.state} from your saved routes?`)) return;

    try {
      setDeletingKey(identifier);
      const res = await API.delete("/business/working-areas", {
        data: { areaId: area._id, state: area.state },
      });

      if (res.data?.success) {
        setMessage({ type: "success", text: `${area.state} removed.` });
        setSavedAreas(res.data.data || []);
      }
    } catch (error) {
      console.error("Delete Error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to remove route.",
      });
    } finally {
      setDeletingKey(null);
    }
  };

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

  const removeFormWorkingArea = (index) => {
    const updated = [...formData.workingAreas];
    updated.splice(index, 1);
    setFormData({ ...formData, workingAreas: updated });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const newValidAreas = formData.workingAreas
      .filter((area) => area.state.trim() !== "")
      .map((area) => ({
        ...area,
        cities: area.cities.filter((c) => c.trim() !== ""),
      }));

    if (newValidAreas.length === 0) {
      setMessage({ type: "error", text: "Please enter at least one state." });
      setLoading(false);
      return;
    }

    const mergedMap = new window.Map();
    savedAreas.forEach((area) => mergedMap.set(area.state.toLowerCase(), area));
    newValidAreas.forEach((area) => mergedMap.set(area.state.toLowerCase(), area));

    try {
      const response = await API.put("/business/working-areas", {
        workingAreas: Array.from(mergedMap.values()),
      });

      if (response.data) {
        setMessage({ type: "success", text: "Routes updated successfully!" });
        setSavedAreas(response.data.data || []);
        setFormData({ workingAreas: [{ state: "", cities: [""] }] });
      }
    } catch (error) {
      console.error("Save Error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to save routes.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Status Message */}
        {message.text && (
          <div
            className={`p-3 rounded-lg text-sm font-medium border ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* 1. ADD ROUTE FORM */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
            <Navigation className="text-orange-600 w-5 h-5" />
            <h2 className="text-lg font-bold text-slate-800">Add Operating Route</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formData.workingAreas.map((area, areaIndex) => (
              <div
                key={areaIndex}
                className="bg-slate-50 border border-slate-200 rounded-lg p-3 sm:p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-600 uppercase">
                    Route #{areaIndex + 1}
                  </span>
                  {formData.workingAreas.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFormWorkingArea(areaIndex)}
                      className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold"
                    >
                      <Trash2 size={13} /> Remove
                    </button>
                  )}
                </div>

                {/* State Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    State Name *
                  </label>
                  <StateSearchInput
                    placeholder="Enter or select state..."
                    value={area.state}
                    zIndex={30 - areaIndex}
                    onSelectState={(name) => handleStateChange(areaIndex, name)}
                  />
                </div>

                {/* Cities Input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-slate-600">
                      Operating Cities / Hubs
                    </label>
                    <button
                      type="button"
                      onClick={() => addCity(areaIndex)}
                      className="text-xs text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1"
                    >
                      <Plus size={13} /> Add City
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {area.cities.map((city, cityIndex) => (
                      <div key={cityIndex} className="flex gap-1.5 items-center">
                        <LocationSearchInput
                          placeholder="Search city..."
                          value={city}
                          zIndex={20 - cityIndex}
                          onSelectLocation={(loc) =>
                            handleCitySelect(areaIndex, cityIndex, loc)
                          }
                        />
                        {area.cities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCity(areaIndex, cityIndex)}
                            className="p-2 text-slate-400 hover:text-rose-600 border border-slate-200 rounded-lg bg-white shrink-0"
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

            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={addWorkingArea}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition"
              >
                <Plus size={14} /> Add Another State
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white text-xs font-semibold px-6 py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                {loading && <Loader2 size={14} className="animate-spin" />}
                {loading ? "Saving..." : "Save Routes"}
              </button>
            </div>
          </form>
        </div>

        {/* 2. SAVED ROUTES LIST */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">
              Saved Routes ({savedAreas.length})
            </h3>
            <button
              type="button"
              onClick={fetchWorkingAreas}
              className="text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg px-2.5 py-1 flex items-center gap-1 font-medium bg-slate-50"
            >
              <RefreshCw size={12} className={initialLoading ? "animate-spin" : ""} /> Refresh
            </button>
          </div>

          {initialLoading ? (
            <div className="py-8 text-center text-slate-400 text-xs flex justify-center items-center gap-2">
              <Loader2 size={16} className="animate-spin text-orange-600" />
              Loading saved routes...
            </div>
          ) : savedAreas.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-lg">
              No routes added yet. Use the form above to add routes.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {savedAreas.map((area, idx) => {
                const identifier = area._id || area.state;
                const isDeleting = deletingKey === identifier;
                const validCities = area.cities?.filter(Boolean) || [];

                return (
                  <div
                    key={identifier || idx}
                    className="border border-slate-200 rounded-lg p-3.5 bg-slate-50/50 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <span className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                          <MapIcon size={14} className="text-orange-600 shrink-0" />
                          {area.state}
                        </span>
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDeleteArea(area)}
                          className="text-rose-600 hover:text-rose-700 text-xs p-1 disabled:opacity-50"
                          title="Delete route"
                        >
                          {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                        </button>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {validCities.length > 0 ? (
                          validCities.map((city, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-medium"
                            >
                              {city}
                            </span>
                          ))
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">All Cities Covered</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkingArea;