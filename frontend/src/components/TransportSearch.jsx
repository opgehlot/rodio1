// import React, { useState, useEffect, useRef } from "react";
// import {
//   Search,
//   MapPin,
//   Truck,
//   Phone,
//   Building2,
//   Eye,
//   Loader2,
//   CheckCircle2,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
// import { useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";

// import API from "../api/api";
// import LocationSearchInput from "../Dashboard/user/LocationSearchInput";

// const PAGE_SIZE = 10;

// const TransportSearch = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [fromLocation, setFromLocation] = useState(null);
//   const [toLocation, setToLocation] = useState(null);
//   const [vehicleType, setVehicleType] = useState("");

//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   // Pagination (wapas aane par last page restore hota hai)
//   const [currentPage, setCurrentPage] = useState(() => {
//     return Number(sessionStorage.getItem("lastViewedPage")) || 1;
//   });

//   const resultsRef = useRef(null);

//   const isLoggedIn = !!localStorage.getItem("token");

//   useEffect(() => {
//     fetchAllVehicles();
//   }, []);

//   // Profile se wapas aane par same card par scroll restore
//   useEffect(() => {
//     if (!initialLoading && !loading && vehicles.length > 0) {
//       const lastCardId = sessionStorage.getItem("lastViewedCardId");

//       if (lastCardId) {
//         const timer = setTimeout(() => {
//           const element = document.getElementById(lastCardId);

//           if (element) {
//             const yOffset = -90;
//             const y =
//               element.getBoundingClientRect().top +
//               window.pageYOffset +
//               yOffset;
//             window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
//           }

//           sessionStorage.removeItem("lastViewedCardId");
//           sessionStorage.removeItem("lastViewedPage");
//         }, 350);

//         return () => clearTimeout(timer);
//       }
//     }
//   }, [initialLoading, loading, vehicles]);

//   const fetchAllVehicles = async () => {
//     try {
//       setInitialLoading(true);

//       const { data } = await API.get("/vehicles/search", {
//         headers: {
//           "X-API-KEY": "ashu@rodio",
//         },
//       });

//       if (data.success) {
//         setVehicles(data.data || []);
//       } else {
//         setVehicles([]);
//       }
//     } catch (error) {
//       console.error(
//         "Fetch Default Vehicles Error:",
//         error.response?.data || error.message
//       );
//       setVehicles([]);
//     } finally {
//       setInitialLoading(false);
//     }
//   };

//   const scrollToResults = () => {
//     window.setTimeout(() => {
//       const el = resultsRef.current;
//       if (!el) return;

//       const top = el.getBoundingClientRect().top + window.pageYOffset - 40;

//       window.scrollTo({
//         top: Math.max(0, top),
//         behavior: "smooth",
//       });
//     }, 150);
//   };

//   const handleSearch = async () => {
//     try {
//       if (!isLoggedIn) {
//         toast.error("Please login to search transport routes", {
//           id: "login-required",
//         });
//         navigate("/login", { state: { from: location } });
//         return;
//       }

//       if (!fromLocation || !toLocation) {
//         toast.error("Please select both Pickup and Drop locations", {
//           id: "location-required",
//         });
//         return;
//       }

//       const from =
//         typeof fromLocation === "object"
//           ? fromLocation.name || fromLocation.label
//           : fromLocation;

//       const to =
//         typeof toLocation === "object"
//           ? toLocation.name || toLocation.label
//           : toLocation;

//       const params = { from, to };

//       if (vehicleType) {
//         params.vehicleType = vehicleType;
//       }

//       setLoading(true);
//       const { data } = await API.get("/vehicles/search", {
//         params,
//         headers: {
//           "X-API-KEY": "ashu@rodio",
//         },
//       });
//       setLoading(false);

//       if (!data.success) {
//         toast.error(data.message || "No matching vehicles found");
//         setVehicles([]);
//         setCurrentPage(1);
//         return;
//       }

//       toast.success(`Found ${data.count} verified partners`);
//       setVehicles(data.data || []);
//       setCurrentPage(1); // naye search par hamesha page 1

//       if (Array.isArray(data.data) && data.data.length > 0) {
//         scrollToResults();
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.response?.data?.message || "Unable to complete search");
//       setVehicles([]);
//       setCurrentPage(1);
//     }
//   };

//   const maskPhoneNumber = (number) => {
//     if (!number) return "+91 ••••• •••••";
//     const str = String(number);
//     if (str.length >= 4) {
//       return `+91 ••••• •${str.slice(-4)}`;
//     }
//     return "+91 ••••• •••••";
//   };

//   // ---------- Pagination values ----------
//   const totalPages = Math.max(1, Math.ceil(vehicles.length / PAGE_SIZE));
//   const safePage = Math.min(currentPage, totalPages);

//   const paginatedVehicles = vehicles.slice(
//     (safePage - 1) * PAGE_SIZE,
//     safePage * PAGE_SIZE
//   );

//   const goToPage = (page) => {
//     const next = Math.min(Math.max(1, page), totalPages);
//     setCurrentPage(next);
//     scrollToResults();
//   };

//   return (
//     <div className="w-full bg-[#f8fafc] min-h-screen text-slate-800 pb-20 antialiased selection:bg-blue-100 selection:text-blue-900">
//       {/* Top Banner */}
//       <section className="bg-blue-700 text-white pt-10 pb-24 px-4 sm:px-6 relative overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

//         <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
//           <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
//             Find & Book Reliable Freight Transporters
//           </h1>

//           <p className="text-slate-300 text-xl sm:text-sm md:text-base max-w-2xl mx-auto font-normal leading-relaxed">
//             Search trucks, commercial vehicles, and reliable transport services
//             seamlessly across India.
//           </p>
//         </div>
//       </section>

//       {/* Main Container */}
//       <main className="max-w-6xl mx-auto px-4 sm:px-6">
//         {/* Search Panel */}
//         <section className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4 sm:p-6 md:p-8 -mt-14 mb-10 relative z-20">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-end">
//             {/* Origin */}
//             <div className="space-y-1.5">
//               <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
//                 <MapPin size={15} className="text-blue-600" />
//                 Pickup STATION
//               </label>
//               <LocationSearchInput
//                 placeholder="City or State"
//                 onSelectLocation={setFromLocation}
//               />
//             </div>

//             {/* Destination */}
//             <div className="space-y-1.5">
//               <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
//                 <MapPin size={15} className="text-emerald-600" />
//                 DELIVERY STATION
//               </label>
//               <LocationSearchInput
//                 placeholder="City or State"
//                 onSelectLocation={setToLocation}
//               />
//             </div>

//             {/* Vehicle Type */}
//             <div className="space-y-1.5">
//               <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
//                 <Truck size={15} className="text-indigo-600" />
//                 Vehicle Category
//               </label>
//               <select
//                 value={vehicleType}
//                 onChange={(e) => setVehicleType(e.target.value)}
//                 className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
//               >
//                 <option value="">All Vehicle Categories</option>
//                 <option value="Pickup / Auto">Pickup / Auto</option>
//                 <option value="LCV">LCV / Minitruck / Eicher</option>
//                 <option value="HCV">HCV / Heavy Truck</option>
//                 <option value="Container">Container</option>
//                 <option value="Trailer">Trailer</option>
//                 <option value="Refrigerated Van">Refrigerated Van</option>
//                 <option value="Hydra">Hydra / JCB / Crane</option>
//                 <option value="Mining Vehicle">Mining Vehicle</option>
//               </select>
//             </div>

//             {/* Submit */}
//             <div>
//               <button
//                 onClick={handleSearch}
//                 disabled={loading}
//                 className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl py-3 px-4 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition duration-200 shadow-md shadow-blue-500/20 disabled:opacity-50 h-[46px]"
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin" size={16} />
//                     <span>Searching...</span>
//                   </>
//                 ) : (
//                   <>
//                     <Search size={16} />
//                     <span>Find Transport</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* Loading State */}
//         {(initialLoading || loading) && (
//           <div className="py-20 w-full flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-sm">
//             <Loader2 className="animate-spin text-blue-600 mb-3" size={32} />
//             <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
//               {initialLoading
//                 ? "Fetching registered fleets..."
//                 : "Scanning route availability..."}
//             </p>
//           </div>
//         )}

//         {/* Empty State */}
//         {!initialLoading && !loading && vehicles.length === 0 && (
//           <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center max-w-lg mx-auto">
//             <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-400">
//               <Truck size={28} />
//             </div>
//             <h3 className="text-base font-bold text-slate-800">
//               No Transport Partners Found
//             </h3>
//             <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
//               We couldn't find vehicles on this route right now. Try broader
//               origin/destination keywords or select all vehicle types.
//             </p>
//           </div>
//         )}

//         {/* Results */}
//         {!initialLoading && !loading && vehicles.length > 0 && (
//           <div ref={resultsRef}>
//             {/* Result count */}
//             <div className="flex items-center justify-between mb-4 px-1">
//               <p className="text-xs sm:text-sm font-semibold text-slate-500">
//                 Showing{" "}
//                 <span className="text-slate-900">
//                   {(safePage - 1) * PAGE_SIZE + 1}–
//                   {Math.min(safePage * PAGE_SIZE, vehicles.length)}
//                 </span>{" "}
//                 of <span className="text-slate-900">{vehicles.length}</span>{" "}
//                 transporters
//               </p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pb-6">
//               {paginatedVehicles.map((vehicle) => {
//                 const role =
//                   vehicle.business?.role || vehicle.role || "Transporter";
//                 const rawPhoneNumber =
//                   vehicle.business?.phoneNumber || vehicle.phoneNumber || "";
//                 const firmName =
//                   vehicle.business?.firmName || "Verified Transporter";
//                 const phoneNumber = isLoggedIn
//                   ? rawPhoneNumber
//                   : maskPhoneNumber(rawPhoneNumber);

//                 const transporterId =
//                   vehicle.business?._id || vehicle.business || vehicle.user;

//                 const vehicleNames = (vehicle.business?.vehicles || [])
//                   .map((v) => v.vehicleType)
//                   .filter(Boolean)
//                   .join(", ");

//                 const whatsappMessage = `Rodio Tradelink\nHello ${firmName},\nI found your transport profile on Rodio Tradelink.\nAvailable Types: ${vehicleNames || "Commercial Fleet"}\nLooking forward to booking a shipment.`;

//                 const whatsappUrl = `https://wa.me/91${rawPhoneNumber}?text=${encodeURIComponent(
//                   whatsappMessage
//                 )}`;

//                 return (
//                   <div
//                     key={vehicle._id}
//                     id={`vehicle-card-${vehicle._id}`}
//                     className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
//                   >
//                     {/* Header */}
//                     <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white">
//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shrink-0">
//                           <Building2 size={21} />
//                         </div>

//                         <div className="min-w-0 flex-1">
//                           <h3
//                             className="text-base font-extrabold truncate"
//                             title={firmName}
//                           >
//                             {firmName}
//                           </h3>
//                           <p className="text-xs text-blue-100 truncate">
//                             {vehicle.business?.ownerName || "Transport Partner"}{" "}
//                             · {role}
//                           </p>
//                         </div>

//                         <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-white/20 border border-white/30 px-2 py-1 text-[10px] font-bold">
//                           <CheckCircle2 size={12} />
//                           Rodio Verified
//                         </span>
//                       </div>
//                     </div>

//                     {/* Card Details */}
//                     <div className="p-3.5 space-y-2.5 flex-1">
//                       {/* Location */}
//                       <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 border border-slate-100 p-3">
//                         <MapPin size={17} className="text-rose-500 shrink-0" />
//                         <span className="text-sm font-medium text-slate-800">
//                           {[
//                             vehicle.business?.currentCity,
//                             vehicle.business?.currentState,
//                           ]
//                             .filter(Boolean)
//                             .join(", ") || "Location Not Set"}
//                         </span>
//                       </div>

//                       {/* Rating and Contact */}
//                       <div className="grid grid-cols-2 gap-2.5">
//                         <div className="rounded-xl bg-slate-50 border border-slate-100 p-2.5 min-w-0">
//                           <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-1">
//                             Rating
//                           </p>
//                           <div className="flex items-center gap-1 flex-wrap">
//                             <span className="text-amber-500 text-lg">★</span>
//                             <span className="text-sm font-extrabold text-slate-900">
//                               {Number(vehicle.business?.rating || 0).toFixed(1)}
//                             </span>
//                             <span className="text-xs text-slate-500">
//                               ({vehicle.business?.reviewCount || 0})
//                             </span>
//                           </div>
//                         </div>

//                         <div className="rounded-xl bg-slate-50 border border-slate-100 p-2.5 min-w-0">
//                           <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mb-1">
//                             Contact
//                           </p>
//                           <div className="flex items-center gap-1.5 min-w-0">
//                             <Phone
//                               size={15}
//                               className="text-emerald-600 shrink-0"
//                             />
//                             <span className="text-xs font-extrabold text-slate-900 truncate">
//                               {phoneNumber}
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Vehicles */}
//                       <div className="flex items-start gap-2 rounded-xl bg-blue-50/60 border border-blue-100 p-2.5">
//                         <Truck
//                           size={15}
//                           className="text-blue-600 shrink-0 mt-0.5"
//                         />
//                         <p className="text-xs text-slate-700 leading-5">
//                           <span className="font-semibold">
//                             {(vehicle.business?.vehicles || []).length || 1}{" "}
//                             Vehicles:
//                           </span>{" "}
//                           <span className="font-medium">
//                             {vehicleNames || "Commercial Fleet"}
//                           </span>
//                         </p>
//                       </div>

//                       {/* Working Routes */}
//                       <div className="rounded-xl bg-blue-50/70 border border-blue-100 p-2.5">
//                         <div className="flex items-center gap-2 text-blue-700 font-bold text-xs mb-1.5">
//                           <MapPin size={14} />
//                           <span>Working Routes:</span>
//                         </div>

//                         <div className="flex flex-wrap gap-2">
//                           <span className="rounded-full border border-blue-200 bg-white px-2.5 py-1 text-[11px] font-medium text-blue-700">
//                             {vehicle.business?.currentCity || "India"}
//                             {vehicle.business?.currentState
//                               ? ` (${vehicle.business.currentState})`
//                               : ""}
//                           </span>
//                           <span className="rounded-full border border-blue-200 bg-white px-2.5 py-1 text-[11px] font-medium text-blue-700">
//                             India
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Footer Actions */}
//                     <div className="border-t border-slate-100 p-5 space-y-2.5">
//                       <button
//                         onClick={() => {
//                           sessionStorage.setItem(
//                             "lastViewedCardId",
//                             `vehicle-card-${vehicle._id}`
//                           );
//                           sessionStorage.setItem(
//                             "lastViewedPage",
//                             String(safePage)
//                           );

//                           if (isLoggedIn) {
//                             if (transporterId) {
//                               navigate(`/dashboard/transporters/${transporterId}`);
//                             } else {
//                               toast.error(
//                                 "Transporter profile details not available"
//                               );
//                             }
//                           } else {
//                             toast.error("Please login to access profile details");
//                             navigate("/login", {
//                               state: {
//                                 returnTo: `/dashboard/transporters/${transporterId}`,
//                                 fromSearch: true,
//                               },
//                             });
//                           }
//                         }}
//                         className="w-full min-h-[48px] rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98]"
//                       >
//                         <Eye size={17} />
//                         View Profile
//                       </button>

//                       <div className="grid grid-cols-2 gap-2.5">
//                         {isLoggedIn ? (
//                           <a
//                             href={`tel:${rawPhoneNumber}`}
//                             className="min-h-[48px] rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
//                           >
//                             <Phone size={16} />
//                             Call Now
//                           </a>
//                         ) : (
//                           <button
//                             onClick={() => {
//                               toast.error("Please login to call transporter");
//                               navigate("/login", {
//                                 state: {
//                                   returnTo: "/dashboard/transportsearch",
//                                 },
//                               });
//                             }}
//                             className="min-h-[48px] rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
//                           >
//                             <Phone size={16} />
//                             Call Now
//                           </button>
//                         )}

//                         {isLoggedIn ? (
//                           <a
//                             href={whatsappUrl}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="min-h-[48px] rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
//                           >
//                             <FaWhatsapp size={18} />
//                             WhatsApp
//                           </a>
//                         ) : (
//                           <button
//                             onClick={() => {
//                               toast.error("Please login to message transporter");
//                               navigate("/login", {
//                                 state: {
//                                   returnTo: "/dashboard/transportsearch",
//                                 },
//                               });
//                             }}
//                             className="min-h-[48px] rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
//                           >
//                             <FaWhatsapp size={18} />
//                             WhatsApp
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Pagination: Prev / Next */}
//             {vehicles.length > PAGE_SIZE && (
//               <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
//                 <button
//                   onClick={() => goToPage(safePage - 1)}
//                   disabled={safePage === 1}
//                   className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
//                 >
//                   <ChevronLeft size={16} />
//                   Prev
//                 </button>

//                 <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">
//                   Page {safePage} of {totalPages}
//                 </span>

//                 <button
//                   onClick={() => goToPage(safePage + 1)}
//                   disabled={safePage === totalPages}
//                   className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition disabled:opacity-40 disabled:cursor-not-allowed"
//                 >
//                   Next
//                   <ChevronRight size={16} />
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default TransportSearch;
import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  MapPin,
  Truck,
  Phone,
  Loader2,
  ChevronLeft,
  ChevronRight,
  User as UserIcon,
  Star,
  Megaphone,
  RefreshCw,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import RodioVerified from "../assets/rodio-verified.png";
import API from "../api/api";
import LocationSearchInput from "../Dashboard/user/LocationSearchInput";

const PAGE_SIZE = 10;

// LEFT ADS STRIP ke ads. Abhi khaali -> placeholders dikhte hain.
// Admin panel se ads aane par { _id, image, link, title } ki list daalo.
const ADMIN_ADS = [];

// ==========================================
// LEFT ADS STRIP (Directory jaisi)
// ==========================================
const AD_PLACEHOLDER_COUNT = 8;

const AdsStrip = ({ ads = [] }) => {
  const hasAds = ads.length > 0;
  const shouldScroll = !hasAds || ads.length >= 3;

  const slots = hasAds
    ? ads
    : Array.from({ length: AD_PLACEHOLDER_COUNT }, (_, i) => ({
        _id: `placeholder-${i}`,
        placeholder: true,
      }));

  const loopSlots = shouldScroll ? [...slots, ...slots] : slots;
  const duration = Math.max(20, slots.length * 6);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <style>{`
        @keyframes adsScrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .ads-track-run { animation: adsScrollUp ${duration}s linear infinite; will-change: transform; }
        .ads-viewport:hover .ads-track-run { animation-play-state: paused; }
      `}</style>

      <div className="flex shrink-0 items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2.5 text-white">
        <Megaphone size={16} />
        <span className="text-sm font-bold">Featured Ads</span>
      </div>

      <div className="ads-viewport relative min-h-0 flex-1 overflow-hidden bg-gray-50/60">
        <div
          className={`flex flex-col px-3 ${
            shouldScroll ? "ads-track-run" : "pb-3"
          }`}
        >
          {loopSlots.map((ad, i) =>
            ad.placeholder ? (
              <div
                key={`${ad._id}-${i}`}
                className="mt-3 flex aspect-[3/4] w-full shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-blue-200 bg-white text-center"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                  <Megaphone size={18} />
                </span>
                <p className="text-xs font-bold text-blue-600">Ad Space</p>
                <p className="text-[11px] text-gray-400">Your Ad Here</p>
              </div>
            ) : (
              <a
                key={`${ad._id}-${i}`}
                href={ad.link || undefined}
                target="_blank"
                rel="noreferrer"
                className="group relative mt-3 block aspect-[3/4] w-full shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <img
                  src={ad.image}
                  alt={ad.title || "Ad"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// HELPER
// ==========================================
const getTransporterId = (vehicle) =>
  vehicle.business?._id ||
  (typeof vehicle.business === "string" ? vehicle.business : null) ||
  vehicle.user?._id ||
  (typeof vehicle.user === "string" ? vehicle.user : null);

const TransportSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Dashboard ke andar sidebar jagah leta hai, isliye ads strip chhoti rakhi hai
  const inDashboard = location.pathname.startsWith("/dashboard");

  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [vehicleType, setVehicleType] = useState("");

  const [vehicles, setVehicles] = useState([]);
  const [profileAssets, setProfileAssets] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Pagination (wapas aane par last page restore hota hai)
  const [currentPage, setCurrentPage] = useState(() => {
    return Number(sessionStorage.getItem("lastViewedPage")) || 1;
  });

  const resultsRef = useRef(null);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    let cancelled = false;

    const loadProfileAssets = async () => {
      const currentPageVehicles = vehicles.slice(
        (Math.min(currentPage, Math.max(1, Math.ceil(vehicles.length / PAGE_SIZE))) - 1) * PAGE_SIZE,
        Math.min(currentPage, Math.max(1, Math.ceil(vehicles.length / PAGE_SIZE))) * PAGE_SIZE
      );

      const missingVehicles = currentPageVehicles.filter((vehicle) => {
        const transporterId = getTransporterId(vehicle);
        const business = vehicle.business || {};
        const hasRating =
          business.averageRating != null ||
          business.rating != null ||
          business.totalReviews != null ||
          business.reviewCount != null ||
          vehicle.averageRating != null ||
          vehicle.totalReviews != null;

        const hasImage =
          business.profile?.adImage || business.adImage;

        return (
          transporterId &&
          !Object.prototype.hasOwnProperty.call(profileAssets, transporterId) &&
          (!hasImage || !hasRating)
        );
      });

      if (!missingVehicles.length) return;

      const results = await Promise.allSettled(
        missingVehicles.map(async (vehicle) => {
          const transporterId = getTransporterId(vehicle);

          const response = await API.get(`/transporters/${transporterId}`);
          const details = response.data?.data || {};
          const business = details.business || details;

          return {
            id: transporterId,
            adImage:
              details?.profile?.adImage ||
              details?.adImage ||
              business?.profile?.adImage ||
              business?.adImage ||
              vehicle.business?.profile?.adImage ||
              vehicle.business?.adImage ||
              "",
            averageRating:
              details?.averageRating ??
              details?.business?.averageRating ??
              details?.rating ??
              details?.business?.rating ??
              business?.averageRating ??
              business?.rating ??
              vehicle.business?.averageRating ??
              vehicle.business?.rating ??
              vehicle.averageRating ??
              0,
            totalReviews:
              details?.totalReviews ??
              details?.business?.totalReviews ??
              details?.reviewCount ??
              details?.business?.reviewCount ??
              business?.totalReviews ??
              business?.reviewCount ??
              vehicle.business?.totalReviews ??
              vehicle.business?.reviewCount ??
              vehicle.totalReviews ??
              0,
          };
        })
      );

      if (cancelled) return;

      setProfileAssets((previous) => {
        const next = { ...previous };
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            next[result.value.id] = result.value;
          }
        });
        return next;
      });
    };

    loadProfileAssets();

    return () => {
      cancelled = true;
    };
  }, [vehicles, currentPage, profileAssets]);

  useEffect(() => {
    fetchAllVehicles();
  }, []);

  // Profile se wapas aane par same card par scroll restore
  useEffect(() => {
    if (!initialLoading && !loading && vehicles.length > 0) {
      const lastCardId = sessionStorage.getItem("lastViewedCardId");

      if (lastCardId) {
        const timer = setTimeout(() => {
          const element = document.getElementById(lastCardId);

          if (element) {
            const yOffset = -90;
            const y =
              element.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
          }

          sessionStorage.removeItem("lastViewedCardId");
          sessionStorage.removeItem("lastViewedPage");
        }, 350);

        return () => clearTimeout(timer);
      }
    }
  }, [initialLoading, loading, vehicles]);

  const fetchAllVehicles = async () => {
    try {
      setInitialLoading(true);

      const { data } = await API.get("/vehicles/search", {
        headers: {
          "X-API-KEY": "ashu@rodio",
        },
      });

      if (data.success) {
        setVehicles(data.data || []);
      } else {
        setVehicles([]);
      }
    } catch (error) {
      console.error(
        "Fetch Default Vehicles Error:",
        error.response?.data || error.message
      );
      setVehicles([]);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleRefresh = async () => {
    setCurrentPage(1);
    if (fromLocation && toLocation) {
      await handleSearch();
    } else {
      await fetchAllVehicles();
    }
  };

  const scrollToResults = () => {
    window.setTimeout(() => {
      const el = resultsRef.current;
      if (!el) return;

      const top = el.getBoundingClientRect().top + window.pageYOffset - 40;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    }, 150);
  };

  const handleSearch = async () => {
    try {
      if (!isLoggedIn) {
        toast.error("Please login to search transport routes", {
          id: "login-required",
        });
        navigate("/login", { state: { from: location } });
        return;
      }

      if (!fromLocation || !toLocation) {
        toast.error("Please select both Pickup and Drop locations", {
          id: "location-required",
        });
        return;
      }

      const from =
        typeof fromLocation === "object"
          ? fromLocation.name || fromLocation.label
          : fromLocation;

      const to =
        typeof toLocation === "object"
          ? toLocation.name || toLocation.label
          : toLocation;

      const params = { from, to };

      if (vehicleType) {
        params.vehicleType = vehicleType;
      }

      setLoading(true);
      const { data } = await API.get("/vehicles/search", {
        params,
        headers: {
          "X-API-KEY": "ashu@rodio",
        },
      });
      setLoading(false);

      if (!data.success) {
        toast.error(data.message || "No matching vehicles found");
        setVehicles([]);
        setCurrentPage(1);
        return;
      }

      toast.success(`Found ${data.count} verified partners`);
      setVehicles(data.data || []);
      setCurrentPage(1); // naye search par hamesha page 1

      if (Array.isArray(data.data) && data.data.length > 0) {
        scrollToResults();
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Unable to complete search");
      setVehicles([]);
      setCurrentPage(1);
    }
  };

  const maskPhoneNumber = (number) => {
    if (!number) return "+91 ••••• •••••";
    const str = String(number);
    if (str.length >= 4) {
      return `+91 ••••• •${str.slice(-4)}`;
    }
    return "+91 ••••• •••••";
  };

  // ---------- Pagination values ----------
  const totalPages = Math.max(1, Math.ceil(vehicles.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedVehicles = vehicles.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const getAdImage = (vehicle) => {
    const transporterId = getTransporterId(vehicle);

    return (
      vehicle.business?.profile?.adImage ||
      vehicle.business?.adImage ||
      profileAssets[transporterId]?.adImage ||
      ""
    );
  };

  const goToPage = (page) => {
    const next = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(next);
    scrollToResults();
  };

  // ==========================================
  // CARD HELPERS
  // ==========================================
  const getCardId = (vehicle) => `vehicle-card-${vehicle._id}`;

  const openProfile = (vehicle, cardId) => {
    const transporterId =
      vehicle.business?._id || vehicle.business || vehicle.user;

    sessionStorage.setItem("lastViewedCardId", cardId);
    sessionStorage.setItem("lastViewedPage", String(safePage));

    if (isLoggedIn) {
      if (transporterId) {
        navigate(`/dashboard/transporters/${transporterId}`);
      } else {
        toast.error("Transporter profile details not available");
      }
    } else {
      toast.error("Please login to access profile details");
      navigate("/login", {
        state: {
          returnTo: `/dashboard/transporters/${transporterId}`,
          fromSearch: true,
        },
      });
    }
  };

  const getCardMeta = (vehicle) => {
    const role = vehicle.business?.role || vehicle.role || "Transporter";
    const rawPhoneNumber =
      vehicle.business?.phoneNumber || vehicle.phoneNumber || "";
    const firmName = vehicle.business?.firmName || "Verified Transporter";
    const vehicleNames = (vehicle.business?.vehicles || [])
      .map((v) => v.vehicleType)
      .filter(Boolean)
      .join(", ");

    return {
      role: String(role).replace(/_/g, " "),
      rawPhoneNumber,
      phoneNumber: isLoggedIn ? rawPhoneNumber : maskPhoneNumber(rawPhoneNumber),
      firmName,
      ownerName: vehicle.business?.ownerName || "",
      vehicleNames,
      vehicleCount: (vehicle.business?.vehicles || []).length || 1,
      rating: Number(
        vehicle.business?.averageRating ??
          vehicle.business?.rating ??
          vehicle.averageRating ??
          profileAssets[getTransporterId(vehicle)]?.averageRating ??
          0
      ).toFixed(1),
      reviews:
        vehicle.business?.totalReviews ??
        vehicle.business?.reviewCount ??
        vehicle.totalReviews ??
        profileAssets[getTransporterId(vehicle)]?.totalReviews ??
        0,
      location:
        [vehicle.business?.currentCity, vehicle.business?.currentState]
          .filter(Boolean)
          .join(", ") || "Location Not Set",
    };
  };

  // Call / WhatsApp / View Profile (ek row)
  const renderActionButtons = (vehicle, cardId) => {
    const { firmName, rawPhoneNumber, vehicleNames } = getCardMeta(vehicle);

    const whatsappMessage = `Rodio Tradelink\nHello ${firmName},\nI found your transport profile on Rodio Tradelink.\nAvailable Types: ${vehicleNames || "Commercial Fleet"}\nLooking forward to booking a shipment.`;
    const whatsappUrl = `https://wa.me/91${rawPhoneNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    const handleLoginRequired = (message) => {
      sessionStorage.setItem("lastViewedCardId", cardId);
      sessionStorage.setItem("lastViewedPage", String(safePage));
      toast.error(message);
      navigate("/login", {
        state: { returnTo: "/dashboard/transportsearch" },
      });
    };

    return (
      <div className="flex flex-nowrap gap-2">
        {isLoggedIn ? (
          <a
            href={`tel:${rawPhoneNumber}`}
            className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-2 py-2.5 text-sm font-bold text-white shadow-md shadow-green-600/20 transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
          >
            <Phone size={16} fill="currentColor" /> Call
          </a>
        ) : (
          <button
            type="button"
            onClick={() => handleLoginRequired("Please login to call transporter")}
            className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-2 py-2.5 text-sm font-bold text-white shadow-md shadow-green-600/20 transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
          >
            <Phone size={16} fill="currentColor" /> Call
          </button>
        )}

        {isLoggedIn ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1DA851] px-2 py-2.5 text-sm font-bold text-white shadow-md shadow-green-500/20 transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
          >
            <FaWhatsapp size={18} className="shrink-0" />
            <span className="truncate">WhatsApp</span>
          </a>
        ) : (
          <button
            type="button"
            onClick={() =>
              handleLoginRequired("Please login to message transporter")
            }
            className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1DA851] px-2 py-2.5 text-sm font-bold text-white shadow-md shadow-green-500/20 transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
          >
            <FaWhatsapp size={18} className="shrink-0" />
            <span className="truncate">WhatsApp</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => openProfile(vehicle, cardId)}
          className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-2 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
        >
          <UserIcon size={16} />
          <span className="truncate">View Profile</span>
        </button>
      </div>
    );
  };

  // Blue header: [circle] firm name / owner name / Rodio Verified
  const renderCardHeader = (vehicle) => {
    const { firmName, ownerName, role } = getCardMeta(vehicle);

    return (
      <div className="relative flex w-full shrink-0 items-center gap-3 overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white sm:p-4">
        <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-12 left-1/3 h-24 w-24 rounded-full bg-white/5" />

        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/70 bg-white/20 text-xl font-bold shadow-md ring-4 ring-white/10 sm:h-14 sm:w-14">
          {(firmName || "T").charAt(0).toUpperCase()}
        </div>

        <div className="relative flex min-w-0 flex-1 items-center justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold leading-snug [overflow-wrap:break-word] sm:text-lg">
              {firmName}
            </p>

            <p className="mt-0.5 truncate text-sm text-white/90">
              {ownerName || role}
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-emerald-200 bg-white px-2.5 py-1.5 text-[11px] font-extrabold text-blue-800 shadow-lg sm:px-3 sm:py-2 sm:text-xs">
            <img
              src={RodioVerified}
              alt="Rodio Verified"
              className="h-6 w-6 shrink-0 object-contain"
            />
            <span className="whitespace-nowrap">Rodio Verified</span>
          </span>
        </div>
      </div>
    );
  };

  // Card data: location + rating/contact + vehicles
  const renderCardData = (vehicle) => {
    const {
      location: locationText,
      rating,
      reviews,
      phoneNumber,
      vehicleCount,
      vehicleNames,
    } = getCardMeta(vehicle);

    return (
      <div className="flex min-h-0 w-full flex-1 flex-col gap-2.5 p-3 sm:p-4">
        <div className="flex items-start gap-2 text-sm text-gray-700">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
            <MapPin size={15} />
          </span>
          <span className="line-clamp-2 leading-snug">{locationText}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* <div className="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Rating
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-base font-bold text-gray-800">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              {rating}
              <span className="text-sm font-normal text-gray-500">
                ({reviews})
              </span>
            </p>
          </div> */}

          <div className="rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Contact
            </p>
            <p className="mt-0.5 flex items-center gap-1 truncate text-base font-bold text-gray-800">
              <Phone size={14} className="shrink-0 text-green-600" />
              <span className="truncate">{phoneNumber}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-2.5 text-sm text-blue-800">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Truck size={15} />
          </span>
          <span className="line-clamp-2 font-medium">
            {vehicleCount} Vehicles: {vehicleNames || "Commercial Fleet"}
          </span>
        </div>

        {/* Working Routes
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-2.5">
          <div className="mb-1.5 flex items-center gap-2 text-xs font-bold text-blue-700">
            <MapPin size={14} />
            <span>Working Routes:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-blue-200 bg-white px-2.5 py-1 text-[11px] font-medium text-blue-700">
              {vehicle.business?.currentCity || "India"}
              {vehicle.business?.currentState
                ? ` (${vehicle.business.currentState})`
                : ""}
            </span>
            <span className="rounded-full border border-blue-200 bg-white px-2.5 py-1 text-[11px] font-medium text-blue-700">
              India
            </span>
          </div>
        </div> */}

        {/* Working Routes */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-2.5">
          <div className="mb-1.5 flex items-center gap-2 text-xs font-bold text-blue-700">
            <MapPin size={14} />
            <span>Working Routes:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-blue-200 bg-white px-2.5 py-1 text-[11px] font-medium text-blue-700">
              {vehicle.business?.currentCity || "India"}
              {vehicle.business?.currentState
                ? ` (${vehicle.business.currentState})`
                : ""}
            </span>
            <span className="rounded-full border border-blue-200 bg-white px-2.5 py-1 text-[11px] font-medium text-blue-700">
              India
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Header + data ek panel me (bina-ad wale pair cards ke liye)
  const renderInfoPanel = (vehicle, cardId) => (
    <div
      role="button"
      tabIndex={0}
      onClick={() => openProfile(vehicle, cardId)}
      onKeyDown={(e) => {
        if (e.key === "Enter") openProfile(vehicle, cardId);
      }}
      className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-blue-500 bg-white shadow-sm transition-shadow duration-300 hover:border-blue-800 hover:shadow-xl hover:shadow-blue-100/60"
      aria-label={`View profile of ${getCardMeta(vehicle).firmName}`}
    >
      {renderCardHeader(vehicle)}
      {renderCardData(vehicle)}
    </div>
  );

  // ROW TYPE 1: AD CARD (image left, data right, buttons neeche)
  const renderAdRow = (vehicle) => {
    const cardId = getCardId(vehicle);
    const adImage = getAdImage(vehicle);
    const { firmName } = getCardMeta(vehicle);

    return (
      <motion.article
        key={vehicle._id}
        id={cardId}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="group flex w-full flex-col overflow-hidden rounded-2xl border-4 border-blue-500 bg-white shadow-sm transition-shadow duration-300 hover:border-blue-700 hover:shadow-xl hover:shadow-blue-100/60"
      >
        <div className="grid grid-cols-1 sm:[grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          {/* AD IMAGE */}
          <div className="relative h-[220px] w-full overflow-hidden bg-gray-50 sm:h-auto sm:min-h-[300px]">
            <img
              src={adImage}
              alt={`${firmName} advertisement`}
              className="absolute inset-0 h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
              onClick={() => openProfile(vehicle, cardId)}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
          </div>

          {/* RIGHT: blue header + card data */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => openProfile(vehicle, cardId)}
            onKeyDown={(e) => {
              if (e.key === "Enter") openProfile(vehicle, cardId);
            }}
            className="flex min-w-0 cursor-pointer flex-col"
            aria-label={`View profile of ${firmName}`}
          >
            {renderCardHeader(vehicle)}
            <div className="flex flex-1 flex-col justify-center">
              {renderCardData(vehicle)}
            </div>
          </div>
        </div>

        {/* BOTTOM: buttons ki ek row */}
        <div className="border-t border-gray-100 p-3 sm:p-4">
          {renderActionButtons(vehicle, cardId)}
        </div>
      </motion.article>
    );
  };

  // ROW TYPE 2: PAIR CARD (bina ad image wale)
  const renderPairCard = (vehicle) => {
    const cardId = getCardId(vehicle);

    return (
      <motion.article
        key={vehicle._id}
        id={cardId}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60 sm:p-4"
      >
        <div className="flex-1">{renderInfoPanel(vehicle, cardId)}</div>
        <div className="mt-3">{renderActionButtons(vehicle, cardId)}</div>
      </motion.article>
    );
  };

  // ROWS: ad wala item = poori row, baaki 2-2 ki row
  const rows = useMemo(() => {
    const result = [];
    let buffer = [];

    const flush = () => {
      if (buffer.length) {
        result.push({ type: "pair", items: buffer });
        buffer = [];
      }
    };

    paginatedVehicles.forEach((vehicle) => {
      if (getAdImage(vehicle)) {
        flush();
        result.push({ type: "ad", items: [vehicle] });
      } else {
        buffer.push(vehicle);
        if (buffer.length === 2) flush();
      }
    });
    flush();

    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginatedVehicles, profileAssets]);

  const renderRow = (row, rowIndex) => {
    if (row.type === "ad") {
      return renderAdRow(row.items[0]);
    }
    return (
      <div
        key={`pair-${rowIndex}-${row.items[0]._id}`}
        className="grid gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fill,minmax(340px,1fr))]"
      >
        {row.items.map(renderPairCard)}
      </div>
    );
  };

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen text-slate-800 pb-20 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Banner */}
      <section className="bg-blue-700 text-white pt-10 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Find & Book Reliable Freight Transporters
          </h1>

          <p className="text-slate-300 text-xl sm:text-sm md:text-base max-w-2xl mx-auto font-normal leading-relaxed">
            Search trucks, commercial vehicles, and reliable transport services
            seamlessly across India.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-[1550px] px-3 sm:px-6 lg:px-8">
        {/* Search Panel */}
        <section className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4 sm:p-6 md:p-8 -mt-14 mb-10 relative z-20 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-end">
            {/* Origin */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <MapPin size={15} className="text-blue-600" />
                Pickup STATION
              </label>
              <LocationSearchInput
                placeholder="City or State"
                onSelectLocation={setFromLocation}
              />
            </div>

            {/* Destination */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <MapPin size={15} className="text-emerald-600" />
                DELIVERY STATION
              </label>
              <LocationSearchInput
                placeholder="City or State"
                onSelectLocation={setToLocation}
              />
            </div>

            {/* Vehicle Type */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Truck size={15} className="text-indigo-600" />
                Vehicle Category
              </label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition"
              >
                <option value="">All Vehicle Categories</option>
                <option value="Pickup / Auto">Pickup / Auto</option>
                <option value="LCV">LCV / Minitruck / Eicher</option>
                <option value="HCV">HCV / Heavy Truck</option>
                <option value="Container">Container</option>
                <option value="Trailer">Trailer</option>
                <option value="Refrigerated Van">Refrigerated Van</option>
                <option value="Hydra">Hydra / JCB / Crane</option>
                <option value="Mining Vehicle">Mining Vehicle</option>
              </select>
            </div>

            {/* Submit */}
            <div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl py-3 px-4 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition duration-200 shadow-md shadow-blue-500/20 disabled:opacity-50 h-[46px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    <span>Find Transport</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={initialLoading || loading}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 text-sm font-bold text-blue-700 shadow-sm transition hover:border-blue-300 hover:bg-blue-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={16}
                className={initialLoading || loading ? "animate-spin" : ""}
              />
              {initialLoading || loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </section>

        {/* Loading State */}
        {(initialLoading || loading) && (
          <div className="py-20 w-full flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-sm">
            <Loader2 className="animate-spin text-blue-600 mb-3" size={32} />
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {initialLoading
                ? "Fetching registered fleets..."
                : "Scanning route availability..."}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!initialLoading && !loading && vehicles.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Truck size={28} />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No Transport Partners Found
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              We couldn't find vehicles on this route right now. Try broader
              origin/destination keywords or select all vehicle types.
            </p>
          </div>
        )}

        {/* Results: LEFT = ADS SCROLLER | RIGHT = CARDS */}
        {!initialLoading && !loading && vehicles.length > 0 && (
          <div ref={resultsRef}>
            {/* Result count */}
            <div className="flex items-center justify-between mb-4 px-1">
              <p className="text-xs sm:text-sm font-semibold text-slate-500">
                Showing{" "}
                <span className="text-slate-900">
                  {(safePage - 1) * PAGE_SIZE + 1}–
                  {Math.min(safePage * PAGE_SIZE, vehicles.length)}
                </span>{" "}
                of <span className="text-slate-900">{vehicles.length}</span>{" "}
                transporters
              </p>
            </div>

            <div className="flex items-stretch gap-5">
              {/* LEFT: ads strip (sirf lg+ screen par) */}
              <aside
                className={
                  inDashboard
                    ? "relative hidden w-[220px] shrink-0 lg:block xl:w-[240px]"
                    : "relative hidden w-[500px] shrink-0 lg:block"
                }
              >
                <div className="absolute inset-0">
                  <AdsStrip ads={ADMIN_ADS} />
                </div>
              </aside>

              {/* RIGHT: cards */}
              <div className="min-w-0 flex-1">
                <div className="flex w-full flex-col gap-4 sm:gap-5 pb-6">
                  {rows.map(renderRow)}
                </div>
              </div>
            </div>

            {/* Pagination: Prev / Next */}
            {vehicles.length > PAGE_SIZE && (
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
                <button
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                  Prev
                </button>

                <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">
                  Page {safePage} of {totalPages}
                </span>

                <button
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default TransportSearch;