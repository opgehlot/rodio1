// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useContext,
//   useCallback,
//   useMemo,
// } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import API from "../api/api";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Filter,
//   X,
//   Truck,
//   Phone,
//   CheckCircle2,
//   Globe,
//   RotateCcw,
//   Star,
//   CircleDot ,
//   User as UserIcon,
//   Building2,
// } from "lucide-react";
// import { AuthContext } from "../context/AuthContext";
// import DirectoryMarquee from "./DirectoryMarquee";

// // ==========================================
// // 1. LOCATION SEARCH INPUT (Debounced & Clean)
// // ==========================================
// const LocationSearchInput = ({
//   placeholder,
//   selectedValue,
//   onSelectLocation,
// }) => {
//   const [searchTerm, setSearchTerm] = useState(selectedValue || "");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);

//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     setSearchTerm(selectedValue || "");
//   }, [selectedValue]);

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
//         API.get(
//           `/location/search?query=${encodeURIComponent(searchTerm.trim())}`,
//         )
//           .then((res) => {
//             if (res.data && res.data.success) {
//               setSuggestions(res.data.data || []);
//               setIsOpen(true);
//             }
//           })
//           .catch((err) => console.error("Location Error:", err))
//           .finally(() => setLoading(false));
//       } else {
//         setSuggestions([]);
//         setIsOpen(false);
//       }
//     }, 250);

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   const handleSelect = (item) => {
//     setSearchTerm(item.name);
//     setIsOpen(false);
//     onSelectLocation(item);
//   };

//   const handleClear = () => {
//     setSearchTerm("");
//     setSuggestions([]);
//     setIsOpen(false);
//     onSelectLocation(null);
//   };

//   return (
//     <div ref={dropdownRef} className="relative w-full">
//       <div className="relative flex items-center">
//         <input
//           type="text"
//           value={searchTerm}
//           placeholder={placeholder}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setTimeout(() => setIsFocused(false), 200)}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             if (!e.target.value) onSelectLocation(null);
//           }}
//           className={`w-full h-[48px] pl-4 pr-10 bg-gray-50/80 border ${
//             isFocused
//               ? "border-blue-500 ring-2 ring-blue-500/20 bg-white"
//               : "border-gray-200"
//           } rounded-2xl text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400`}
//         />

//         {searchTerm && (
//           <button
//             type="button"
//             onClick={handleClear}
//             className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition p-1"
//           >
//             <X size={16} />
//           </button>
//         )}
//       </div>

//       {isOpen && (
//         <ul className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-60 overflow-y-auto z-[1000] p-1.5 custom-scrollbar">
//           {loading && suggestions.length === 0 ? (
//             <li className="px-4 py-3 text-xs sm:text-sm text-center text-gray-400">
//               Loading routes...
//             </li>
//           ) : suggestions.length === 0 ? (
//             <li className="px-4 py-3 text-xs sm:text-sm text-center text-gray-400">
//               No locations found
//             </li>
//           ) : (
//             suggestions.map((item, i) => (
//               <li
//                 key={item._id || i}
//                 onClick={() => handleSelect(item)}
//                 className="px-3.5 py-2.5 rounded-xl cursor-pointer hover:bg-blue-50/80 hover:text-blue-600 text-sm flex justify-between items-center transition"
//               >
//                 <div>
//                   <strong className="font-semibold text-gray-800">
//                     {item.name}
//                   </strong>
//                   {item.state && (
//                     <span className="text-gray-500 text-xs ml-1.5 font-normal">
//                       ({item.state})
//                     </span>
//                   )}
//                 </div>
//               </li>
//             ))
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

// // ==========================================
// // 2. MAIN DIRECTORY COMPONENT
// // ==========================================
// const Directory = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const isLoggedIn = !!user;

//   // TOGGLE STATE: "location" OR "business"
//   const [searchMode, setSearchMode] = useState("location");

//   // FILTER STATES
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [category, setCategory] = useState("");
//   const [searchBy, setSearchBy] = useState("firmName");
//   const [searchValue, setSearchValue] = useState("");

//   // DIRECTORY DATA
//   const [directoryData, setDirectoryData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const transportCategories = useMemo(
//     () => [
//       { label: "All Categories", value: "" },
//       { label: "Transporter", value: "transporter" },
//       { label: "Broker", value: "broker" },
//       { label: "Fleet Owner", value: "fleet_owner" },
//       { label: "Truck Owner", value: "truck_owner" },
//       { label: "Logistics Company", value: "logistics_company" },
//       { label: "Warehouse", value: "warehouse" },
//       { label: "Courier", value: "courier" },
//       { label: "Packers & Movers", value: "packers_and_movers" },
//       { label: "Commission Agent", value: "commission_agent" },
//       { label: "RTO Agent", value: "rto_agent" },
//       { label: "Finance Agent", value: "finance_company" },
//       { label: "Travel & Taxi", value: "travel_taxi" },
//       { label: "Others", value: "others" },
//     ],
//     [],
//   );

//   // UNIFIED FETCH FUNCTION
//   const fetchDirectoryData = useCallback(
//     async (filters = {}) => {
//       try {
//         setLoading(true);
//         const params = {};
//         const stateVal =
//           filters.state !== undefined ? filters.state : selectedState;
//         const cityVal =
//           filters.city !== undefined ? filters.city : selectedCity;
//         const catVal =
//           filters.category !== undefined ? filters.category : category;

//         if (stateVal) params.state = stateVal;
//         if (cityVal) params.city = cityVal;
//         if (catVal) params.category = catVal;

//         const response = await API.get("/directory", { params });

//         if (response.data && response.data.success) {
//           setDirectoryData(response.data.data || []);
//         } else if (Array.isArray(response.data)) {
//           setDirectoryData(response.data);
//         } else {
//           setDirectoryData([]);
//         }
//       } catch (error) {
//         console.error("Directory Fetch Error:", error);
//         setDirectoryData([]);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [selectedState, selectedCity, category],
//   );

//   useEffect(() => {
//     fetchDirectoryData();
//   }, [fetchDirectoryData]);

//   // SEARCH BY LOCATION & CATEGORY
//   const handleLocationSearch = (e) => {
//     e.preventDefault();
//     fetchDirectoryData({
//       state: selectedState,
//       city: selectedCity,
//       category: category,
//     });
//   };

//   // SEARCH BY FIRM / OWNER / NUMBER
//   const handleBusinessSearch = async (e) => {
//     e.preventDefault();
//     if (!searchValue.trim()) return;

//     try {
//       setLoading(true);
//       const response = await API.get("/businesses/search-by", {
//         params: {
//           searchBy,
//           searchValue: searchValue.trim(),
//         },
//       });

//       if (response.data?.success) {
//         setDirectoryData(response.data.data || []);
//       } else {
//         setDirectoryData([]);
//       }
//     } catch (error) {
//       console.error("Business Search Error:", error);
//       setDirectoryData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // RESET FILTERS
//   const handleResetFilters = () => {
//     setSelectedState("");
//     setSelectedCity("");
//     setCategory("");
//     setSearchBy("firmName");
//     setSearchValue("");

//     fetchDirectoryData({
//       state: "",
//       city: "",
//       category: "",
//     });
//   };

//   // PHONE NUMBER MASKING
//   const maskPhoneNumber = (number) => {
//     if (!number) return "Not Provided";
//     const str = String(number).trim();
//     if (str.length >= 10) {
//       return "XXXXXX" + str.slice(-4);
//     }
//     return "XXXXXXXXXX";
//   };

//   return (
//     <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 mb-16">
//       <DirectoryMarquee />

//       {/* ==========================================
//           SEARCH FILTERS BOX WITH SLIDING TOGGLE
//       ========================================== */}
//       <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 mb-8 sm:mb-10">
//         {/* Header & Reset Button */}
//         <div className="flex items-center justify-between gap-2 mb-5 sm:mb-6">
//           <div className="flex items-center gap-2.5">
//             <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
//               <Filter size={20} className="sm:w-[22px] sm:h-[22px]" />
//             </div>
//             <div>
//               <h2 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
//                 Find Transport Directory
//               </h2>
//               <p className="hidden sm:block text-xs text-gray-500">
//                 Filter verified transporters, brokers & routes across India
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleResetFilters}
//             className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition border border-gray-200 cursor-pointer shrink-0 active:scale-95"
//           >
//             <RotateCcw size={14} />
//             <span className="hidden sm:inline">Reset All</span>
//             <span className="sm:hidden">Reset</span>
//           </button>
//         </div>

//         {/* 🎛️ ANIMATED SLIDING SEGMENTED CONTROL */}
//         <div className="w-full max-w-lg mx-auto mb-6 sm:mb-8">
//           <div className="relative p-1 bg-gray-100/90 rounded-2xl flex items-center border border-gray-200/80">
//             {/* Tab 1 */}
//             <button
//               type="button"
//               onClick={() => setSearchMode("location")}
//               className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer select-none ${
//                 searchMode === "location"
//                   ? "text-blue-700"
//                   : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               <MapPin
//                 size={16}
//                 className={
//                   searchMode === "location" ? "text-blue-600" : "text-gray-400"
//                 }
//               />
//               <span>Location Search</span>
//               {searchMode === "location" && (
//                 <motion.div
//                   layoutId="activeSearchTab"
//                   transition={{ type: "spring", stiffness: 400, damping: 35 }}
//                   className="absolute inset-0 bg-white rounded-xl shadow-md border border-gray-100 -z-10"
//                 />
//               )}
//             </button>

//             {/* Tab 2 */}
//             <button
//               type="button"
//               onClick={() => setSearchMode("business")}
//               className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer select-none ${
//                 searchMode === "business"
//                   ? "text-purple-700"
//                   : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               <Building2
//                 size={16}
//                 className={
//                   searchMode === "business"
//                     ? "text-purple-600"
//                     : "text-gray-400"
//                 }
//               />
//               <span>Firm / Owner No.</span>
//               {searchMode === "business" && (
//                 <motion.div
//                   layoutId="activeSearchTab"
//                   transition={{ type: "spring", stiffness: 400, damping: 35 }}
//                   className="absolute inset-0 bg-white rounded-xl shadow-md border border-gray-100 -z-10"
//                 />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* FORMS WITH ANIMATION TRANSITION */}
//         <AnimatePresence mode="wait">
//           {searchMode === "location" ? (
//             <motion.form
//               key="location-form"
//               initial={{ opacity: 0, y: 6 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -6 }}
//               transition={{ duration: 0.2 }}
//               onSubmit={handleLocationSearch}
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 items-end"
//             >
//               <div>
//                 <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
//                   <MapPin size={14} className="text-blue-600" />
//                   State
//                 </label>
//                 <LocationSearchInput
//                   placeholder="Search State..."
//                   selectedValue={selectedState}
//                   onSelectLocation={(loc) =>
//                     setSelectedState(loc ? loc.name : "")
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
//                   <MapPin size={14} className="text-green-600" />
//                   City
//                 </label>
//                 <LocationSearchInput
//                   placeholder="Search City..."
//                   selectedValue={selectedCity}
//                   onSelectLocation={(loc) =>
//                     setSelectedCity(loc ? loc.name : "")
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
//                   <Briefcase size={14} className="text-orange-500" />
//                   Category
//                 </label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full h-[48px] bg-gray-50/80 border border-gray-200 rounded-2xl px-4 text-sm text-gray-800 outline-none focus:border-blue-500 focus:bg-white transition cursor-pointer"
//                 >
//                   {transportCategories.map((cat, index) => (
//                     <option key={index} value={cat.value}>
//                       {cat.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full h-[48px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition shadow-lg shadow-blue-500/25 cursor-pointer text-sm"
//               >
//                 <Search size={18} />
//                 Search Directory
//               </button>
//             </motion.form>
//           ) : (
//             <motion.form
//               key="business-form"
//               initial={{ opacity: 0, y: 6 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -6 }}
//               transition={{ duration: 0.2 }}
//               onSubmit={handleBusinessSearch}
//               className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 items-end"
//             >
//               <div>
//                 <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
//                  <CircleDot size={14} className="text-purple-600" />
//                   Select category (Firm/Owenr/Number)
//                 </label>
//                 <select
//                   value={searchBy}
//                   onChange={(e) => setSearchBy(e.target.value)}
//                   className="w-full h-[48px] bg-gray-50/80 border border-gray-200 rounded-2xl px-4 text-sm text-gray-800 outline-none focus:border-purple-500 focus:bg-white transition cursor-pointer"
//                 >
//                   <option value="firmName">Firm Name</option>
//                   <option value="ownerName">Owner Name</option>
//                   <option value="phoneNumber">Phone Number</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
//                   <Search size={14} className="text-purple-600" />
//                   Search Keyword / Number
//                 </label>
//                 <input
//                   type={searchBy === "phoneNumber" ? "tel" : "text"}
//                   value={searchValue}
//                   onChange={(e) => setSearchValue(e.target.value)}
//                   placeholder={
//                     searchBy === "firmName"
//                       ? "Enter Firm Name..."
//                       : searchBy === "ownerName"
//                         ? "Enter Owner Name..."
//                         : "Enter Phone Number..."
//                   }
//                   className="w-full h-[48px] bg-gray-50/80 border border-gray-200 rounded-2xl px-4 text-sm text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition placeholder:text-gray-400"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full h-[48px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition shadow-lg shadow-purple-500/25 cursor-pointer text-sm"
//               >
//                 <Search size={18} />
//                 Search Business
//               </button>
//             </motion.form>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* ==========================================
//           DIRECTORY RESULT SECTION
//       ========================================== */}
//       <div className="flex items-center justify-between mb-5 sm:mb-6">
//         <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
//           Directory Results
//           <span className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
//             {directoryData.length}{" "}
//             {directoryData.length === 1 ? "Partner" : "Partners"}
//           </span>
//         </h3>
//       </div>

//       {loading ? (
//         <div className="text-center py-24 sm:py-28 font-medium text-gray-500 animate-pulse">
//           Loading Directory Details...
//         </div>
//       ) : directoryData.length === 0 ? (
//         <div className="bg-white rounded-2xl p-10 sm:p-16 text-center text-gray-500 font-medium shadow-sm border border-gray-100">
//           No Transport Found matching your criteria.
//         </div>
//       ) : (
//         <div className="w-full space-y-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
//             {directoryData.map((item, index) => {
//               const displayPhone = isLoggedIn
//                 ? item.phoneNumber
//                 : maskPhoneNumber(item.phoneNumber);
//               const formattedRole = item.role
//                 ? item.role.replace(/_/g, " ")
//                 : "Transporter";
//               const rating = Number(item.averageRating || 0).toFixed(1);
//               const reviews = item.totalReviews || 0;

//               return (
//                 <div
//                   key={item._id || index}
//                   className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col justify-between relative group"
//                 >
//                   {/* CARD HEADER */}
//                   <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-5 text-white relative">
                   
                   
//                  {item.isVerified && (
//   <div className="absolute top-3.5 right-3.5 bg-white/20 backdrop-blur-md border border-white/30 text-white px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 shadow-sm">
//     <CheckCircle2
//       size={12}
//       className="text-emerald-300"
//     />
//     <span>Verified</span>
//   </div>
// )}


//                     <div className="flex items-center gap-3 pr-14">
//                       {/* Avatar */}
//                       <div className="relative shrink-0 w-12 h-12 sm:w-13 sm:h-13 rounded-4xl overflow-hidden bg-white/10 border-2 border-white/40 shadow-inner flex items-center justify-center">
//                         {item.photo ? (
//                           <img
//                             src={item.photo}
//                             alt={item.firmName || "Profile"}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.currentTarget.style.display = "none";
//                               e.currentTarget.nextElementSibling.style.display =
//                                 "flex";
//                             }}
//                           />
//                         ) : null}
//                         <div
//                           className={`w-full h-full flex items-center justify-center font-bold text-base sm:text-lg text-white bg-blue-700/80 ${
//                             item.photo ? "hidden" : "flex"
//                           }`}
//                         >
//                           {item.firmName ? (
//                             item.firmName.charAt(0).toUpperCase()
//                           ) : (
//                             <UserIcon size={20} />
//                           )}
//                         </div>
//                       </div>

//                       {/* Firm Info */}
//                       <div className="overflow-hidden">
//                         <h4 className="font-bold text-sm sm:text-base capitalize truncate leading-snug drop-shadow-sm">
//                           {item.firmName || "Unnamed Firm"}
//                         </h4>
//                         <p className="text-blue-100 text-[11px] sm:text-xs capitalize truncate font-medium">
//                           {item.ownerName && item.ownerName !== item.firmName
//                             ? `${item.ownerName} • `
//                             : ""}
//                           {formattedRole}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* CARD BODY */}
//                   <div className="p-4 sm:p-5 space-y-3.5 sm:space-y-4 flex-1">
//                     {/* Location */}
//                     <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 bg-gray-50 p-2.5 sm:p-3 rounded-2xl border border-gray-100/80">
//                       <MapPin size={16} className="text-red-500 shrink-0" />
//                       <span className="font-medium capitalize truncate">
//                         {item.city || "Not Specified"},{" "}
//                         {item.state || "Not Specified"}
//                       </span>
//                     </div>

//                     {/* Stats Grid */}
//                     <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
//                       <div className="bg-gray-50 p-2.5 sm:p-3 rounded-2xl border border-gray-100">
//                         <span className="text-[10px] font-semibold text-gray-400 block mb-0.5 uppercase tracking-wider">
//                           Rating
//                         </span>
//                         <div className="flex items-center gap-1 text-gray-900 font-bold text-xs sm:text-sm">
//                           <Star
//                             size={14}
//                             className="text-amber-500 fill-amber-400 shrink-0"
//                           />
//                           <span>
//                             {rating}{" "}
//                             <span className="text-[10px] sm:text-[11px] font-normal text-gray-500">
//                               ({reviews})
//                             </span>
//                           </span>
//                         </div>
//                       </div>

//                       <div className="bg-gray-50 p-2.5 sm:p-3 rounded-2xl border border-gray-100">
//                         <span className="text-[10px] font-semibold text-gray-400 block mb-0.5 uppercase tracking-wider">
//                           Contact
//                         </span>
//                         <div className="flex items-center gap-1 text-gray-900 font-bold text-xs sm:text-sm truncate">
//                           <Phone
//                             size={13}
//                             className="text-emerald-600 shrink-0"
//                           />
//                           <span className="truncate">{displayPhone}</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Vehicles */}
//                     {item.totalVehicles > 0 && (
//                       <div className="flex items-center gap-2 text-xs text-gray-600 bg-blue-50/40 border border-blue-100/60 p-2.5 rounded-xl">
//                         <Truck size={14} className="text-blue-600 shrink-0" />
//                         <span className="font-medium truncate">
//                           {item.totalVehicles}{" "}
//                           {item.totalVehicles === 1 ? "Vehicle" : "Vehicles"}:{" "}
//                           <span className="text-gray-800 font-bold">
//                             {item.vehicleTypes?.join(", ")}
//                           </span>
//                         </span>
//                       </div>
//                     )}

//                     {/* Working Routes */}
//                     {Array.isArray(item.workingAreas) &&
//                       item.workingAreas.length > 0 && (
//                         <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-2xl">
//                           <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 mb-1.5">
//                             <Globe size={13} />
//                             <span>Working Routes:</span>
//                           </div>
//                           <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
//                             {item.workingAreas.map((area, i) => (
//                               <span
//                                 key={area._id || i}
//                                 className="bg-white border border-blue-200 text-blue-800 px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-medium"
//                               >
//                                 {Array.isArray(area?.cities) &&
//                                 area.cities.filter(Boolean).length > 0
//                                   ? `${area.cities.filter(Boolean).join(", ")} (${area.state || ""})`
//                                   : area.state || "All Regions"}
//                               </span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                   </div>

//                   {/* CARD FOOTER ACTIONS */}
//                   <div className="p-4 sm:p-5 pt-0 border-t border-gray-100 mt-auto bg-white grid grid-cols-2 gap-2 sm:gap-3">
//                     <a
//                       href={`tel:${item.phoneNumber}`}
//                       onClick={(e) => {
//                         if (!isLoggedIn) {
//                           e.preventDefault();
//                           navigate("/register", {
//                             state: {
//                               returnTo: `/dashboard/transporters/${item._id}`,
//                             },
//                           });
//                         }
//                       }}
//                       className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition shadow-md shadow-emerald-600/20 cursor-pointer"
//                     >
//                       <Phone size={14} />
//                       Call
//                     </a>

//                     <button
//                       type="button"
//                       onClick={() => {
//                         if (!isLoggedIn) {
//                           navigate("/register", {
//                             state: {
//                               returnTo: `/dashboard/transporters/${item._id}`,
//                             },
//                           });
//                           return;
//                         }
//                         navigate(`/dashboard/transporters/${item._id}`);
//                       }}
//                       className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition shadow-md shadow-blue-600/20 cursor-pointer"
//                     >
//                       View Profile
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Directory;
import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/api";
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  X,
  Truck,
  Phone,
  CheckCircle2,
  Globe,
  RotateCcw,
  Star,
  CircleDot,
  User as UserIcon,
  Building2,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import DirectoryMarquee from "./DirectoryMarquee";

// ==========================================
// 1. LOCATION SEARCH INPUT (Debounced & Clean)
// ==========================================
const LocationSearchInput = ({
  placeholder,
  selectedValue,
  onSelectLocation,
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedValue || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    setSearchTerm(selectedValue || "");
  }, [selectedValue]);

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
    const timer = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        setLoading(true);
        API.get(
          `/location/search?query=${encodeURIComponent(searchTerm.trim())}`
        )
          .then((res) => {
            if (res.data && res.data.success) {
              setSuggestions(res.data.data || []);
              setIsOpen(true);
            }
          })
          .catch((err) => console.error("Location Error:", err))
          .finally(() => setLoading(false));
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSelect = (item) => {
    setSearchTerm(item.name);
    setIsOpen(false);
    onSelectLocation(item);
  };

  const handleClear = () => {
    setSearchTerm("");
    setSuggestions([]);
    setIsOpen(false);
    onSelectLocation(null);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!e.target.value) onSelectLocation(null);
          }}
          className={`w-full h-[48px] pl-4 pr-10 bg-gray-50/80 border ${
            isFocused
              ? "border-blue-500 ring-2 ring-blue-500/20 bg-white"
              : "border-gray-200"
          } rounded-2xl text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400`}
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition p-1"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && (
        <ul className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-60 overflow-y-auto z-[1000] p-1.5 custom-scrollbar">
          {loading && suggestions.length === 0 ? (
            <li className="px-4 py-3 text-xs sm:text-sm text-center text-gray-400">
              Loading routes...
            </li>
          ) : suggestions.length === 0 ? (
            <li className="px-4 py-3 text-xs sm:text-sm text-center text-gray-400">
              No locations found
            </li>
          ) : (
            suggestions.map((item, i) => (
              <li
                key={item._id || i}
                onClick={() => handleSelect(item)}
                className="px-3.5 py-2.5 rounded-xl cursor-pointer hover:bg-blue-50/80 hover:text-blue-600 text-sm flex justify-between items-center transition"
              >
                <div>
                  <strong className="font-semibold text-gray-800">
                    {item.name}
                  </strong>
                  {item.state && (
                    <span className="text-gray-500 text-xs ml-1.5 font-normal">
                      ({item.state})
                    </span>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

// ==========================================
// 2. MAIN DIRECTORY COMPONENT
// ==========================================
const Directory = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  // REFS FOR AUTO-SCROLL
  const resultsRef = useRef(null);

  // TOGGLE STATE: "location" OR "business"
  const [searchMode, setSearchMode] = useState("location");

  // FILTER STATES
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [category, setCategory] = useState("");
  const [searchBy, setSearchBy] = useState("firmName");
  const [searchValue, setSearchValue] = useState("");

  // DIRECTORY DATA
  const [directoryData, setDirectoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const transportCategories = useMemo(
    () => [
      { label: "All Categories", value: "" },
      { label: "Transporter", value: "transporter" },
      { label: "Broker", value: "broker" },
      { label: "Fleet Owner", value: "fleet_owner" },
      { label: "Truck Owner", value: "truck_owner" },
      { label: "Logistics Company", value: "logistics_company" },
      { label: "Warehouse", value: "warehouse" },
      { label: "Courier", value: "courier" },
      { label: "Packers & Movers", value: "packers_and_movers" },
      { label: "Commission Agent", value: "commission_agent" },
      { label: "RTO Agent", value: "rto_agent" },
      { label: "Finance Agent", value: "finance_company" },
      { label: "Travel & Taxi", value: "travel_taxi" },
      { label: "Others", value: "others" },
    ],
    []
  );

  // AUTO SCROLL TO RESULTS ON MOBILE
  const scrollToResults = () => {
    if (window.innerWidth < 768 && resultsRef.current) {
      setTimeout(() => {
        const yOffset = -70; // Top Navbar offset
        const y =
          resultsRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 100);
    }
  };

  // UNIFIED FETCH FUNCTION
  const fetchDirectoryData = useCallback(
    async (filters = {}) => {
      try {
        setLoading(true);
        const params = {};
        const stateVal =
          filters.state !== undefined ? filters.state : selectedState;
        const cityVal =
          filters.city !== undefined ? filters.city : selectedCity;
        const catVal =
          filters.category !== undefined ? filters.category : category;

        if (stateVal) params.state = stateVal;
        if (cityVal) params.city = cityVal;
        if (catVal) params.category = catVal;

        const response = await API.get("/directory", { params });

        if (response.data && response.data.success) {
          setDirectoryData(response.data.data || []);
        } else if (Array.isArray(response.data)) {
          setDirectoryData(response.data);
        } else {
          setDirectoryData([]);
        }
      } catch (error) {
        console.error("Directory Fetch Error:", error);
        setDirectoryData([]);
      } finally {
        setLoading(false);
      }
    },
    [selectedState, selectedCity, category]
  );

  useEffect(() => {
    fetchDirectoryData();
  }, [fetchDirectoryData]);

  // SEARCH BY LOCATION & CATEGORY
  const handleLocationSearch = (e) => {
    e.preventDefault();
    scrollToResults();
    fetchDirectoryData({
      state: selectedState,
      city: selectedCity,
      category: category,
    });
  };

  // SEARCH BY FIRM / OWNER / NUMBER
  const handleBusinessSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    scrollToResults();

    try {
      setLoading(true);
      const response = await API.get("/businesses/search-by", {
        params: {
          searchBy,
          searchValue: searchValue.trim(),
        },
      });

      if (response.data?.success) {
        setDirectoryData(response.data.data || []);
      } else {
        setDirectoryData([]);
      }
    } catch (error) {
      console.error("Business Search Error:", error);
      setDirectoryData([]);
    } finally {
      setLoading(false);
    }
  };

  // RESET FILTERS
  const handleResetFilters = () => {
    setSelectedState("");
    setSelectedCity("");
    setCategory("");
    setSearchBy("firmName");
    setSearchValue("");

    fetchDirectoryData({
      state: "",
      city: "",
      category: "",
    });
  };

  // PHONE NUMBER MASKING
  const maskPhoneNumber = (number) => {
    if (!number) return "Not Provided";
    const str = String(number).trim();
    if (str.length >= 10) {
      return "XXXXXX" + str.slice(-4);
    }
    return "XXXXXXXXXX";
  };

  return (
    <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 mb-16">
      <DirectoryMarquee />

      {/* ==========================================
          SEARCH FILTERS BOX WITH SLIDING TOGGLE
      ========================================== */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 mb-8 sm:mb-10">
        {/* Header & Reset Button */}
        <div className="flex items-center justify-between gap-2 mb-5 sm:mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Filter size={20} className="sm:w-[22px] sm:h-[22px]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
                Find Transport Directory
              </h2>
              <p className="hidden sm:block text-[15px] text-gray-500">
                Filter verified transporters, brokers & routes across India
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition border border-gray-200 cursor-pointer shrink-0 active:scale-95"
          >
            <RotateCcw size={15} />
            <span className="hidden sm:inline">Reset All</span>
            <span className="sm:hidden">Reset</span>
          </button>
        </div>

        {/* 🎛️ ANIMATED SLIDING SEGMENTED CONTROL */}
        <div className="w-full max-w-lg mx-auto mb-6 sm:mb-8">
          <div className="relative p-1 bg-gray-100/90 rounded-2xl flex items-center border border-gray-200/80">
            {/* Tab 1 */}
            <button
              type="button"
              onClick={() => setSearchMode("location")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer select-none ${
                searchMode === "location"
                  ? "text-blue-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <MapPin
                size={16}
                className={
                  searchMode === "location" ? "text-blue-600" : "text-gray-400"
                }
              />
              <span>Location Search</span>
              {searchMode === "location" && (
                <motion.div
                  layoutId="activeSearchTab"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  className="absolute inset-0 bg-white rounded-xl shadow-md border border-gray-100 -z-10"
                />
              )}
            </button>

            {/* Tab 2 */}
            <button
              type="button"
              onClick={() => setSearchMode("business")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer select-none ${
                searchMode === "business"
                  ? "text-purple-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Building2
                size={16}
                className={
                  searchMode === "business"
                    ? "text-purple-600"
                    : "text-gray-400"
                }
              />
              <span>Firm / Owner No.</span>
              {searchMode === "business" && (
                <motion.div
                  layoutId="activeSearchTab"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  className="absolute inset-0 bg-white rounded-xl shadow-md border border-gray-100 -z-10"
                />
              )}
            </button>
          </div>
        </div>

        {/* FORMS WITH ANIMATION TRANSITION */}
        <AnimatePresence mode="wait">
          {searchMode === "location" ? (
            <motion.form
              key="location-form"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleLocationSearch}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 items-end"
            >
              <div>
                <label className="text-[15px] font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <MapPin size={14} className="text-blue-600" />
                  State
                </label>
                <LocationSearchInput
                  placeholder="Search State..."
                  selectedValue={selectedState}
                  onSelectLocation={(loc) =>
                    setSelectedState(loc ? loc.name : "")
                  }
                />
              </div>

              <div>
                <label className="text-[15px] font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <MapPin size={14} className="text-green-600" />
                  City
                </label>
                <LocationSearchInput
                  placeholder="Search City..."
                  selectedValue={selectedCity}
                  onSelectLocation={(loc) =>
                    setSelectedCity(loc ? loc.name : "")
                  }
                />
              </div>

              <div>
                <label className="text-[15px] font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <Briefcase size={14} className="text-orange-500" />
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-[48px] bg-gray-50/80 border border-gray-200 rounded-2xl px-4 text-sm text-gray-800 outline-none focus:border-blue-500 focus:bg-white transition cursor-pointer"
                >
                  {transportCategories.map((cat, index) => (
                    <option key={index} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full h-[48px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition shadow-lg shadow-blue-500/25 cursor-pointer text-sm"
              >
                <Search size={18} />
                Search Directory
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="business-form"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleBusinessSearch}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 items-end"
            >
              <div>
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <CircleDot size={14} className="text-purple-600" />
                  Select category (Firm/Owner/Number)
                </label>
                <select
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                  className="w-full h-[48px] bg-gray-50/80 border border-gray-200 rounded-2xl px-4 text-sm text-gray-800 outline-none focus:border-purple-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="firmName">Firm Name</option>
                  <option value="ownerName">Owner Name</option>
                  <option value="phoneNumber">Phone Number</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <Search size={14} className="text-purple-600" />
                  Search Keyword / Number
                </label>
                <input
                  type={searchBy === "phoneNumber" ? "tel" : "text"}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={
                    searchBy === "firmName"
                      ? "Enter Firm Name..."
                      : searchBy === "ownerName"
                      ? "Enter Owner Name..."
                      : "Enter Phone Number..."
                  }
                  className="w-full h-[48px] bg-gray-50/80 border border-gray-200 rounded-2xl px-4 text-sm text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full h-[48px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition shadow-lg shadow-purple-500/25 cursor-pointer text-sm"
              >
                <Search size={18} />
                Search Business
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* ==========================================
          DIRECTORY RESULT SECTION (Ref added here)
      ========================================== */}
      <div ref={resultsRef} className="scroll-mt-24">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            Directory Results
            <span className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {directoryData.length}{" "}
              {directoryData.length === 1 ? "Partner" : "Partners"}
            </span>
          </h3>
        </div>

        {loading ? (
          <div className="text-center py-24 sm:py-28 font-medium text-gray-500 animate-pulse">
            Loading Directory Details...
          </div>
        ) : directoryData.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 sm:p-16 text-center text-gray-500 font-medium shadow-sm border border-gray-100">
            No Transport Found matching your criteria.
          </div>
        ) : (
          <div className="w-full space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {directoryData.map((item, index) => {
                const displayPhone = isLoggedIn
                  ? item.phoneNumber
                  : maskPhoneNumber(item.phoneNumber);
                const formattedRole = item.role
                  ? item.role.replace(/_/g, " ")
                  : "Transporter";
                const rating = Number(item.averageRating || 0).toFixed(1);
                const reviews = item.totalReviews || 0;

                return (
                  <div
                    key={item._id || index}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col justify-between relative group"
                  >
                    {/* CARD HEADER */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-5 text-white relative">
                      {item.isVerified && (
                        <div className="absolute top-3.5 right-3.5 bg-white/20 backdrop-blur-md border border-white/30 text-white px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                          <CheckCircle2
                            size={12}
                            className="text-emerald-300"
                          />
                          <span>Verified</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 pr-14">
                        {/* Avatar */}
                        <div className="relative shrink-0 w-12 h-12 sm:w-13 sm:h-13 rounded-4xl overflow-hidden bg-white/10 border-2 border-white/40 shadow-inner flex items-center justify-center">
                          {item.photo ? (
                            <img
                              src={item.photo}
                              alt={item.firmName || "Profile"}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextElementSibling.style.display =
                                  "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-full h-full flex items-center justify-center font-bold text-base sm:text-lg text-white bg-blue-700/80 ${
                              item.photo ? "hidden" : "flex"
                            }`}
                          >
                            {item.firmName ? (
                              item.firmName.charAt(0).toUpperCase()
                            ) : (
                              <UserIcon size={20} />
                            )}
                          </div>
                        </div>

                        {/* Firm Info */}
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-sm sm:text-base capitalize truncate leading-snug drop-shadow-sm">
                            {item.firmName || "Unnamed Firm"}
                          </h4>
                          <p className="text-blue-100 text-[11px] sm:text-xs capitalize truncate font-medium">
                            {item.ownerName &&
                            item.ownerName !== item.firmName
                              ? `${item.ownerName} • `
                              : ""}
                            {formattedRole}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CARD BODY */}
                    <div className="p-4 sm:p-5 space-y-3.5 sm:space-y-4 flex-1">
                      {/* Location */}
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 bg-gray-50 p-2.5 sm:p-3 rounded-2xl border border-gray-100/80">
                        <MapPin size={16} className="text-red-500 shrink-0" />
                        <span className="font-medium capitalize truncate">
                          {item.city || ""},{" "}
                          {item.state || ""}
                        </span>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <div className="bg-gray-50 p-2.5 sm:p-3 rounded-2xl border border-gray-100">
                          <span className="text-[10px] font-semibold text-gray-400 block mb-0.5 uppercase tracking-wider">
                            Rating
                          </span>
                          <div className="flex items-center gap-1 text-gray-900 font-bold text-xs sm:text-sm">
                            <Star
                              size={14}
                              className="text-amber-500 fill-amber-400 shrink-0"
                            />
                            <span>
                              {rating}{" "}
                              <span className="text-[10px] sm:text-[11px] font-normal text-gray-500">
                                ({reviews})
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-2.5 sm:p-3 rounded-2xl border border-gray-100">
                          <span className="text-[10px] font-semibold text-gray-400 block mb-0.5 uppercase tracking-wider">
                            Contact
                          </span>
                          <div className="flex items-center gap-1 text-gray-900 font-bold text-xs sm:text-sm truncate">
                            <Phone
                              size={13}
                              className="text-emerald-600 shrink-0"
                            />
                            <span className="truncate">{displayPhone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Vehicles */}
                      {item.totalVehicles > 0 && (
                        <div className="flex items-center gap-2 text-xs text-gray-600 bg-blue-50/40 border border-blue-100/60 p-2.5 rounded-xl">
                          <Truck size={14} className="text-blue-600 shrink-0" />
                          <span className="font-medium truncate">
                            {item.totalVehicles}{" "}
                            {item.totalVehicles === 1
                              ? "Vehicle"
                              : "Vehicles"}
                            :{" "}
                            <span className="text-gray-800 font-bold">
                              {item.vehicleTypes?.join(", ")}
                            </span>
                          </span>
                        </div>
                      )}

                      {/* Working Routes */}
                      {Array.isArray(item.workingAreas) &&
                        item.workingAreas.length > 0 && (
                          <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-2xl">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 mb-1.5">
                              <Globe size={13} />
                              <span>Working Routes:</span>
                            </div>
                            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                              {item.workingAreas.map((area, i) => (
                                <span
                                  key={area._id || i}
                                  className="bg-white border border-blue-200 text-blue-800 px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-medium"
                                >
                                  {Array.isArray(area?.cities) &&
                                  area.cities.filter(Boolean).length > 0
                                    ? `${area.cities
                                        .filter(Boolean)
                                        .join(", ")} (${area.state || ""})`
                                    : area.state || "All Regions"}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* CARD FOOTER ACTIONS */}
                    <div className="p-4 sm:p-5 pt-0 border-t border-gray-100 mt-auto bg-white grid grid-cols-2 gap-2 sm:gap-3">
                      <a
                        href={`tel:${item.phoneNumber}`}
                        onClick={(e) => {
                          if (!isLoggedIn) {
                            e.preventDefault();
                            navigate("/register", {
                              state: {
                                returnTo: `/dashboard/transporters/${item._id}`,
                              },
                            });
                          }
                        }}
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition shadow-md shadow-emerald-600/20 cursor-pointer"
                      >
                        <Phone size={14} />
                        Call
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          if (!isLoggedIn) {
                            navigate("/register", {
                              state: {
                                returnTo: `/dashboard/transporters/${item._id}`,
                              },
                            });
                            return;
                          }
                          navigate(`/dashboard/transporters/${item._id}`);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition shadow-md shadow-blue-600/20 cursor-pointer"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;
