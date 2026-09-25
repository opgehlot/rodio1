// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   MapPin,
//   Truck,
//   Phone,
//   MapPinned,
//   User,
//   Loader2,
//   Building2,
//   Eye,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";

// import API from "../api/api";
// import LocationSearchInput from "../Dashboard/user/LocationSearchInput";

// const TransportSearch = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [fromLocation, setFromLocation] = useState(null);
//   const [toLocation, setToLocation] = useState(null);
//   const [vehicleType, setVehicleType] = useState("");

//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   // Check login status helper
//   const checkUserLoggedIn = () => {
//     return !!localStorage.getItem("token");
//   };

//   const isLoggedIn = checkUserLoggedIn();

//   useEffect(() => {
//     fetchAllVehicles();
//   }, []);

//   const fetchAllVehicles = async () => {
//     try {
//       setInitialLoading(true);
//       const { data } = await API.get("/vehicles/search");

//       if (data.success) {
//         setVehicles(data.data || []);
//       }
//     } catch (error) {
//       console.error("Fetch Default Vehicles Error:", error);
//       setVehicles([]);
//     } finally {
//       setInitialLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       if (!isLoggedIn) {
//         toast.error("Please login or register first to search routes!", {
//           id: "login-required",
//         });
//         navigate("/login", { state: { from: location } });
//         return;
//       }

//       if (!fromLocation || !toLocation) {
//         toast.error("Please select Origin & Destination", {
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

//       const { data } = await API.get("/vehicles/search", { params });

//       setLoading(false);

//       if (!data.success) {
//         toast.error(data.message || "No Vehicles Found");
//         setVehicles([]);
//         return;
//       }

//       toast.success(`Found ${data.count} Vehicles`);
//       setVehicles(data.data);
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.response?.data?.message || "Unable to Search Vehicles");
//       setVehicles([]);
//     }
//   };

//   // Helper functions for masking sensitive data
//   const maskPhoneNumber = (number) => {
//     if (!number) return "XXXXXX";
//     const str = String(number);
//     if (str.length >= 4) {
//       return "XXXXXX" + str.slice(-4);
//     }
//     return "XXXXXX";
//   };

//   const maskVehicleNumber = (number) => {
//     if (!number) return "DL-XX-XXXX";
//     const str = String(number);
//     if (str.length >= 4) {
//       return str.slice(0, 4) + "XX" + str.slice(-4);
//     }
//     return "DL-XX-XXXX";
//   };

//   // Restrict items to 6 if user is not logged in
//   const displayedVehicles = isLoggedIn ? vehicles : vehicles.slice(0, 6);

//   return (
//     <div className="w-full bg-slate-50 min-h-screen pb-16">
//       {/* Hero Header Section */}
//       <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-12 px-4 shadow-md mb-8">
//         <div className="max-w-6xl mx-auto text-center space-y-3">
//           <span className="bg-blue-600 text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-light uppercase tracking-widest inline-block backdrop-blur-md">
//             India's Trusted Transport Network
//           </span>
//           <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
//             Find Verified Transport Services
//           </h1>
//           <p className="text-blue-100 text-xs md:text-sm font-bold uppercase tracking-wider max-w-xl mx-auto">
//             Search trucks, commercial vehicles, and reliable transport services
//             seamlessly across India.
//           </p>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4">
//         {/* Search Control Card */}
//         <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 -mt-16 mb-12 relative z-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
//           {/* From */}
//           <div className="space-y-1.5">
//             <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
//               <MapPin size={16} className="text-blue-600" />
//               Origin / From
//             </label>
//             <LocationSearchInput
//               placeholder="Enter Origin City"
//               onSelectLocation={setFromLocation}
//             />
//           </div>

//           {/* To */}
//           <div className="space-y-1.5">
//             <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
//               <MapPin size={16} className="text-emerald-600" />
//               Destination / To
//             </label>
//             <LocationSearchInput
//               placeholder="Enter Destination City"
//               onSelectLocation={setToLocation}
//             />
//           </div>

//           {/* Vehicle Type */}
//           <div className="space-y-1.5">
//             <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
//               <Truck size={16} className="text-orange-500" />
//               Vehicle Type
//             </label>
//             <select
//               value={vehicleType}
//               onChange={(e) => setVehicleType(e.target.value)}
//               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-900 transition"
//             >
//               <option value="">All Vehicles</option>
//               <option value="Pickup / Auto">Pickup / Auto</option>
//               <option value="LCV">LCV / MINITRUCK / EICHER</option>
//               <option value="HCV">HCV / TRUCK</option>
//               <option value="Container">Container</option>
//               <option value="Trailer">Trailer</option>
//               <option value="Refrigerated Van">Refrigerated Van</option>
//               <option value="Hydra">Hydra / JCB / CRANES</option>
//               <option value="Mining Vehicle">Mining Vehicle</option>
//             </select>
//           </div>

//           {/* Search Button */}
//           <div>
//             <button
//               onClick={handleSearch}
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-[#2263F1] via-[#395DEF] to-[#4758EE] text-white rounded-xl py-3 px-4 text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 disabled:opacity-50 h-[46px]"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="animate-spin" size={16} />
//                   <span>Searching...</span>
//                 </>
//               ) : (
//                 <>
//                   <Search size={16} />
//                   <span>Search Transport</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Section Heading */}
//         {/* <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
//           <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
//             Available Vehicles / Search Results
//           </h2>
//           <span className="text-xs font-black bg-slate-200 text-slate-700 px-3 py-1 rounded-full uppercase tracking-wider">
//             {isLoggedIn
//               ? vehicles.length
//               : `${displayedVehicles.length} of ${vehicles.length}`}{" "}
//             Vehicles Shown
//           </span>
//         </div> */}

//         {/* Initial or Search Loading State */}
//         {(initialLoading || loading) && (
//           <div className="min-h-[30vh] w-full flex items-center justify-center bg-white rounded-3xl border border-slate-100 shadow-sm">
//             <div className="flex flex-col items-center gap-3">
//               <Loader2 className="animate-spin text-slate-900" size={32} />
//               <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
//                 {initialLoading
//                   ? "Loading Available Vehicles..."
//                   : "Searching Vehicles..."}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* No Result State */}
//         {!initialLoading && !loading && vehicles.length === 0 && (
//           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center">
//             <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
//               <Truck size={32} />
//             </div>
//             <h3 className="text-lg font-black text-slate-800 uppercase">
//               No Vehicles Found
//             </h3>
//             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1 max-w-sm mx-auto">
//               Try changing your origin, destination routes or searching with a
//               different vehicle category.
//             </p>
//           </div>
//         )}

//         {/* Vehicle Cards Container with Scrollable Box */}
//         {!initialLoading && !loading && displayedVehicles.length > 0 && (
//           <>
//             <div className="max-h-[750px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
//                 {displayedVehicles.map((vehicle) => {
//                   const role =
//                     vehicle.business?.role || vehicle.role || "Transporter";
//                   const rawPhoneNumber =
//                     vehicle.business?.phoneNumber ||
//                     vehicle.phoneNumber ||
//                     "N/A";

//                   const firmName =
//                     vehicle.business?.firmName || "Transport Firm";
//                   const ownerName = vehicle.business?.ownerName || "Owner";
//                   const phoneNumber = isLoggedIn
//                     ? rawPhoneNumber
//                     : maskPhoneNumber(rawPhoneNumber);
//                   const vehicleNumber = isLoggedIn
//                     ? vehicle.vehicleNumber
//                     : maskVehicleNumber(vehicle.vehicleNumber);
//                   const currentCity =
//                     vehicle.business?.currentCity || "Location Not Set";

//                   // Extract transporter ID safely from business or user reference
//                   const transporterId =
//                     vehicle.business?._id || vehicle.business || vehicle.user;

//                   const whatsappMessage = ` Rodio Tradelink
// Hello ${firmName},
// Your transport profile is listed on Rodio.
// Available Vehicle:
// ${vehicle.vehicleType}
// Connect with verified transporters across India.
// 🌐 https://rodiotradelink.com`;

//                   const whatsappUrl = `https://wa.me/91${rawPhoneNumber}?text=${encodeURIComponent(
//                     whatsappMessage,
//                   )}`;

//                   return (
//                     <div
//                       key={vehicle._id}
//                       id={`vehicle-card-${vehicle._id}`}
//                       className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
//                     >
//                       {/* Card Header */}
//                       <div className="bg-gradient-to-r from-[#2263F1] via-[#395DEF] to-[#4758EE] p-5 text-white">
//                         <div className="flex justify-between items-start">
//                           <h3 className="text-base font-black uppercase truncate max-w-[200px]">
//                             {firmName}
//                           </h3>
//                          <span className="inline-flex items-center gap-1.5 text-white whitespace-nowrap">
//   <Building2
//     size={13}
//     strokeWidth={2.5}
//     className="text-white shrink-0"
//   />
//   <span className="text-[8px] font-bold uppercase tracking-wide leading-none">
//     {role}
//   </span>
// </span>
//                         </div>
//                         {/* <div className="flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-wider mt-1.5">
//                           <User size={14} className="text-white" />
//                           <span>{ownerName}</span>
//                         </div> */}
//                       </div>

//                       {/* Card Specs Body */}
//                       <div className="p-5 space-y-3.5 flex-1 text-xs">
//                         <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
//                           <span className="font-bold uppercase tracking-widest text-slate-400">
//                             Vehicle Type
//                           </span>
//                           <span className="font-black uppercase text-slate-800">
//                             {vehicle.vehicleType}
//                           </span>
//                         </div>

//                         {/* <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
//                           <span className="font-bold uppercase tracking-widest text-slate-400">
//                             Vehicle Number
//                           </span>
//                           <span className="font-black uppercase text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
//                             {vehicleNumber}
//                           </span>
//                         </div> */}

//                         <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
//                           <span className="font-bold uppercase tracking-widest text-slate-400">
//                             Phone Number
//                           </span>
//                           <span className="font-black text-slate-800 flex items-center gap-1.5">
//                             <Phone size={13} className="text-emerald-600" />
//                             {phoneNumber}
//                           </span>
//                         </div>

//                         <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
//                           <span className="font-bold uppercase tracking-widest text-slate-400">
//                             Capacity
//                           </span>
//                           <span className="font-black uppercase text-slate-800">
//                             {vehicle.capacity || "N/A"}
//                           </span>
//                         </div>

//                         <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
//                           <span className="font-bold uppercase tracking-widest text-slate-400">
//                             Body Type
//                           </span>
//                           <span className="font-black uppercase text-slate-800">
//                             {vehicle.bodyType || "N/A"}
//                           </span>
//                         </div>

//                         <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
//                           <span className="font-bold uppercase tracking-widest text-slate-400">
//                             Status
//                           </span>
//                           <span className="font-black uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
//                             {vehicle.status || "Available"}
//                           </span>
//                         </div>

//                         {/* Current Location Info */}
//                         {/* <div className="flex items-start gap-2.5 pt-2">
//                           <div className="bg-blue-50 text-blue-600 p-2 rounded-xl mt-0.5 border border-blue-100">
//                             <MapPinned size={16} />
//                           </div>
//                           <div>
//                             <p className="font-black uppercase text-slate-800">
//                               {currentCity}
//                             </p>
//                             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
//                               {vehicle.business?.currentState || "India"}
//                             </p>
//                           </div>
//                         </div> */}
//                       </div>

//                       {/* Actions */}
//                       <div className="p-5 pt-0 space-y-2">
//                         {/* View Profile Button */}
//                         <div>
//                           {isLoggedIn ? (
//                             <button
//     onClick={() => {
//       if (transporterId) {
//         navigate(`/dashboard/transporters/${transporterId}`);
//       } else {
//         toast.error("Transporter profile ID not found");
//       }
//     }}
//                               className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95"
//                             >
//                               <Eye size={14} />
//                               <span>View Profile</span>
//                             </button>
//                           ) : (
//                             <button
//                               onClick={() => {
//                                 toast.error(
//                                   "Please login or register to view profile!",
//                                 );
//                                navigate("/login", {
//   state: {
//     returnTo: `/dashboard/transporters/${transporterId}`,
//   },
// });
//                               }}
//                               className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95"
//                             >
//                               <span>View Profile</span>
//                             </button>
//                           )}
//                         </div>

//                         {/* Call & WhatsApp Actions */}
//                         <div className="grid grid-cols-2 gap-2">
//                           {isLoggedIn ? (
//                             <>
//                               <a
//                                 href={`tel:${rawPhoneNumber}`}
//                                 className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95"
//                               >
//                                 <Phone size={14} />
//                                 <span>Call Now</span>
//                               </a>

//                               <a
//                                 href={whatsappUrl}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
//                               >
//                                 <span>WhatsApp</span>
//                               </a>
//                             </>
//                           ) : (
//                             <>
//                               <button
//                                 onClick={() => {
//                                   toast.error(
//                                     "Please login or register to call transporter!",
//                                   );
//                                   navigate("/login", {
//                                     state: {
//                                      returnTo: "/dashboard/transportsearch",
//                                     },
//                                   });
//                                 }}
//                                 className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95"
//                               >
//                                 <span>Call Now</span>
//                               </button>

//                               <button
//                                 onClick={() => {
//                                   toast.error(
//                                     "Please login or register to message transporter!",
//                                   );
//                                   navigate("/login", {
//                                     state: {
//                                      returnTo: "/dashboard/transportsearch",
//                                     },
//                                   });
//                                 }}
//                                 className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
//                               >
//                                 <span>WhatsApp</span>
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Login Prompt Banner for Logged Out Users
//             {!isLoggedIn && vehicles.length > 6 && (
//               <div className="mt-12 bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
//                 <h3 className="text-xl md:text-2xl font-black uppercase">
//                   Want to view all {vehicles.length} vehicles and get direct
//                   phone numbers?
//                 </h3>
//                 <p className="text-xs font-bold text-slate-300 uppercase tracking-wider max-w-lg mx-auto">
//                   Login or create an account to unlock complete transporter
//                   contacts, search routes freely, and book vehicles instantly.
//                 </p>
//                 <div>
//                   <button
//                     onClick={() =>
//                       navigate("/login", {
//                         state: {
//                           returnTo: location.pathname + location.search,
//                         },
//                       })
//                     }
//                     className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition active:scale-95 shadow-lg"
//                   >
//                     Login / Register Now
//                   </button>
//                 </div>
//               </div>
//             )} */}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TransportSearch;
// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   MapPin,
//   Truck,
//   Phone,
//   Building2,
//   Eye,
//   Loader2,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import toast from "react-hot-toast";

// import API from "../api/api";
// import LocationSearchInput from "../Dashboard/user/LocationSearchInput";

// const TransportSearch = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [fromLocation, setFromLocation] = useState(null);
//   const [toLocation, setToLocation] = useState(null);
//   const [vehicleType, setVehicleType] = useState("");

//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);

//   // Check login status
//   const checkUserLoggedIn = () => {
//     return !!localStorage.getItem("token");
//   };

//   const isLoggedIn = checkUserLoggedIn();

//   useEffect(() => {
//     fetchAllVehicles();
//   }, []);

//   // Laptop aur Mobile dono ke liye instant card position restoration
//   useEffect(() => {
//     if (!initialLoading && !loading && vehicles.length > 0) {
//       const lastCardId = sessionStorage.getItem("lastViewedCardId");

//       if (lastCardId) {
//         // Mobile rendering delay ke liye 350ms buffer
//         const timer = setTimeout(() => {
//           const element = document.getElementById(lastCardId);

//           if (element) {
//             // 1. Inner scroll container alignment
//             element.scrollIntoView({
//               behavior: "auto",
//               block: "center",
//               inline: "nearest",
//             });

//             // 2. Mobile window/browser screen alignment (navbar offset ke sath)
//             const yOffset = -80;
//             const y =
//               element.getBoundingClientRect().top +
//               window.pageYOffset +
//               yOffset;
//             window.scrollTo({ top: y, behavior: "auto" });
//           }

//           // Card par reach karne ke baad storage clear
//           sessionStorage.removeItem("lastViewedCardId");
//         }, 350);

//         return () => clearTimeout(timer);
//       }
//     }
//   }, [initialLoading, loading, vehicles]);

//   const fetchAllVehicles = async () => {
//     try {
//       setInitialLoading(true);
//       const { data } = await API.get("/vehicles/search");

//       if (data.success) {
//         setVehicles(data.data || []);
//       }
//     } catch (error) {
//       console.error("Fetch Default Vehicles Error:", error);
//       setVehicles([]);
//     } finally {
//       setInitialLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       if (!isLoggedIn) {
//         toast.error("Please login or register first to search routes!", {
//           id: "login-required",
//         });
//         navigate("/login", { state: { from: location } });
//         return;
//       }

//       if (!fromLocation || !toLocation) {
//         toast.error("Please select Origin & Destination", {
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

//       const { data } = await API.get("/vehicles/search", { params });

//       setLoading(false);

//       if (!data.success) {
//         toast.error(data.message || "No Vehicles Found");
//         setVehicles([]);
//         return;
//       }

//       toast.success(`Found ${data.count} Vehicles`);
//       setVehicles(data.data);
//     } catch (error) {
//       setLoading(false);
//       toast.error(error.response?.data?.message || "Unable to Search Vehicles");
//       setVehicles([]);
//     }
//   };

//   // Helper functions for masking sensitive data
//   const maskPhoneNumber = (number) => {
//     if (!number) return "XXXXXX";
//     const str = String(number);
//     if (str.length >= 4) {
//       return "XXXXXX" + str.slice(-4);
//     }
//     return "XXXXXX";
//   };

//   const maskVehicleNumber = (number) => {
//     if (!number) return "DL-XX-XXXX";
//     const str = String(number);
//     if (str.length >= 4) {
//       return str.slice(0, 4) + "XX" + str.slice(-4);
//     }
//     return "DL-XX-XXXX";
//   };

//   // Restrict items to 6 if user is not logged in
//   const displayedVehicles = isLoggedIn ? vehicles : vehicles.slice(0, 6);

//   return (
//     <div className="w-full bg-slate-50 min-h-screen pb-16">
//       {/* Hero Header Section */}
//       <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-12 px-4 shadow-md mb-8">
//         <div className="max-w-6xl mx-auto text-center space-y-3">
//           <span className="bg-blue-600 text-white border border-white/20 px-4 py-1.5 rounded-full text-xs font-light uppercase tracking-widest inline-block backdrop-blur-md">
//             India's Trusted Transport Network
//           </span>
//           <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
//             Find Verified Transport Services
//           </h1>
//           <p className="text-blue-100 text-xs md:text-sm font-bold uppercase tracking-wider max-w-xl mx-auto">
//             Search trucks, commercial vehicles, and reliable transport services
//             seamlessly across India.
//           </p>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4">
//         {/* Search Control Card */}
//         <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 -mt-16 mb-12 relative z-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
//           {/* From */}
//           <div className="space-y-1.5">
//             <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
//               <MapPin size={16} className="text-blue-600" />
//               Origin / From
//             </label>
//             <LocationSearchInput
//               placeholder="Enter Origin City"
//               onSelectLocation={setFromLocation}
//             />
//           </div>

//           {/* To */}
//           <div className="space-y-1.5">
//             <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
//               <MapPin size={16} className="text-emerald-600" />
//               Destination / To
//             </label>
//             <LocationSearchInput
//               placeholder="Enter Destination City"
//               onSelectLocation={setToLocation}
//             />
//           </div>

//           {/* Vehicle Type */}
//           <div className="space-y-1.5">
//             <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
//               <Truck size={16} className="text-orange-500" />
//               Vehicle Type
//             </label>
//             <select
//               value={vehicleType}
//               onChange={(e) => setVehicleType(e.target.value)}
//               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-900 transition"
//             >
//               <option value="">All Vehicles</option>
//               <option value="Pickup / Auto">Pickup / Auto</option>
//               <option value="LCV">LCV / MINITRUCK / EICHER</option>
//               <option value="HCV">HCV / TRUCK</option>
//               <option value="Container">Container</option>
//               <option value="Trailer">Trailer</option>
//               <option value="Refrigerated Van">Refrigerated Van</option>
//               <option value="Hydra">Hydra / JCB / CRANES</option>
//               <option value="Mining Vehicle">Mining Vehicle</option>
//             </select>
//           </div>

//           {/* Search Button */}
//           <div>
//             <button
//               onClick={handleSearch}
//               disabled={loading}
//               className="w-full bg-gradient-to-r from-[#2263F1] via-[#395DEF] to-[#4758EE] text-white rounded-xl py-3 px-4 text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 disabled:opacity-50 h-[46px]"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="animate-spin" size={16} />
//                   <span>Searching...</span>
//                 </>
//               ) : (
//                 <>
//                   <Search size={16} />
//                   <span>Search Transport</span>
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Loading State */}
//         {(initialLoading || loading) && (
//           <div className="min-h-[30vh] w-full flex items-center justify-center bg-white rounded-3xl border border-slate-100 shadow-sm">
//             <div className="flex flex-col items-center gap-3">
//               <Loader2 className="animate-spin text-slate-900" size={32} />
//               <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
//                 {initialLoading
//                   ? "Loading Available Vehicles..."
//                   : "Searching Vehicles..."}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* No Result State */}
//         {!initialLoading && !loading && vehicles.length === 0 && (
//           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center">
//             <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
//               <Truck size={32} />
//             </div>
//             <h3 className="text-lg font-black text-slate-800 uppercase">
//               No Vehicles Found
//             </h3>
//             <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1 max-w-sm mx-auto">
//               Try changing your origin, destination routes or searching with a
//               different vehicle category.
//             </p>
//           </div>
//         )}

//         {/* Vehicle Cards Grid */}
//         {!initialLoading && !loading && displayedVehicles.length > 0 && (
//           <div className="max-h-[750px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
//               {displayedVehicles.map((vehicle) => {
//                 const role =
//                   vehicle.business?.role || vehicle.role || "Transporter";
//                 const rawPhoneNumber =
//                   vehicle.business?.phoneNumber ||
//                   vehicle.phoneNumber ||
//                   "N/A";

//                 const firmName =
//                   vehicle.business?.firmName || "Transport Firm";
//                 const phoneNumber = isLoggedIn
//                   ? rawPhoneNumber
//                   : maskPhoneNumber(rawPhoneNumber);

//                 const transporterId =
//                   vehicle.business?._id || vehicle.business || vehicle.user;

//                 const whatsappMessage = ` Rodio Tradelink
// Hello ${firmName},
// Your transport profile is listed on Rodio.
// Available Vehicle:
// ${vehicle.vehicleType}
// Connect with verified transporters across India.
// 🌐 https://rodiotradelink.com`;

//                 const whatsappUrl = `https://wa.me/91${rawPhoneNumber}?text=${encodeURIComponent(
//                   whatsappMessage
//                 )}`;

//                 return (
//                   <div
//                     key={vehicle._id}
//                     id={`vehicle-card-${vehicle._id}`}
//                     className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
//                   >
//                     {/* Card Header */}
//                     <div className="bg-gradient-to-r from-[#2263F1] via-[#395DEF] to-[#4758EE] p-5 text-white">
//                       <div className="flex justify-between items-start">
//                         <h3 className="text-base font-black uppercase truncate max-w-[200px]">
//                           {firmName}
//                         </h3>
//                         <span className="inline-flex items-center gap-1.5 text-white whitespace-nowrap">
//                           <Building2
//                             size={13}
//                             strokeWidth={2.5}
//                             className="text-white shrink-0"
//                           />
//                           <span className="text-[8px] font-bold uppercase tracking-wide leading-none">
//                             {role}
//                           </span>
//                         </span>
//                       </div>
//                     </div>

//                     {/* Card Specs Body */}
//                     <div className="p-5 space-y-3.5 flex-1 text-xs">
//                       <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
//                         <span className="font-bold uppercase tracking-widest text-slate-400">
//                           Vehicle Type
//                         </span>
//                         <span className="font-black uppercase text-slate-800">
//                           {vehicle.vehicleType}
//                         </span>
//                       </div>

//                       <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
//                         <span className="font-bold uppercase tracking-widest text-slate-400">
//                           Phone Number
//                         </span>
//                         <span className="font-black text-slate-800 flex items-center gap-1.5">
//                           <Phone size={13} className="text-emerald-600" />
//                           {phoneNumber}
//                         </span>
//                       </div>

//                       <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
//                         <span className="font-bold uppercase tracking-widest text-slate-400">
//                           Capacity
//                         </span>
//                         <span className="font-black uppercase text-slate-800">
//                           {vehicle.capacity || "N/A"}
//                         </span>
//                       </div>

//                       <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
//                         <span className="font-bold uppercase tracking-widest text-slate-400">
//                           Body Type
//                         </span>
//                         <span className="font-black uppercase text-slate-800">
//                           {vehicle.bodyType || "N/A"}
//                         </span>
//                       </div>

//                       <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
//                         <span className="font-bold uppercase tracking-widest text-slate-400">
//                           Status
//                         </span>
//                         <span className="font-black uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
//                           {vehicle.status || "Available"}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Actions */}
//                     <div className="p-5 pt-0 space-y-2">
//                       <div>
//                         {isLoggedIn ? (
//                           <button
//                             onClick={() => {
//                               if (transporterId) {
//                                 sessionStorage.setItem(
//                                   "lastViewedCardId",
//                                   `vehicle-card-${vehicle._id}`
//                                 );
//                                 navigate(
//                                   `/dashboard/transporters/${transporterId}`
//                                 );
//                               } else {
//                                 toast.error("Transporter profile ID not found");
//                               }
//                             }}
//                             className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95"
//                           >
//                             <Eye size={14} />
//                             <span>View Profile</span>
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => {
//                               // Card ID save karna zaroori hai taaki login ke baad bhi memory me rahe
//                               sessionStorage.setItem(
//                                 "lastViewedCardId",
//                                 `vehicle-card-${vehicle._id}`
//                               );
//                               toast.error(
//                                 "Please login or register to view profile!"
//                               );
//                               navigate("/login", {
//                                 state: {
//                                   returnTo: `/dashboard/transporters/${transporterId}`,
//                                   fromSearch: true,
//                                 },
//                               });
//                             }}
//                             className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95"
//                           >
//                             <span>View Profile</span>
//                           </button>
//                         )}
//                       </div>

//                       {/* Call & WhatsApp Actions */}
//                       <div className="grid grid-cols-2 gap-2">
//                         {isLoggedIn ? (
//                           <>
//                             <a
//                               href={`tel:${rawPhoneNumber}`}
//                               className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95"
//                             >
//                               <Phone size={14} />
//                               <span>Call Now</span>
//                             </a>

//                             <a
//                               href={whatsappUrl}
//                               target="_blank"
//                               rel="noreferrer"
//                               className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
//                             >
//                               <span>WhatsApp</span>
//                             </a>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => {
//                                 toast.error(
//                                   "Please login or register to call transporter!"
//                                 );
//                                 navigate("/login", {
//                                   state: {
//                                     returnTo: "/dashboard/transportsearch",
//                                   },
//                                 });
//                               }}
//                               className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95"
//                             >
//                               <span>Call Now</span>
//                             </button>

//                             <button
//                               onClick={() => {
//                                 toast.error(
//                                   "Please login or register to message transporter!"
//                                 );
//                                 navigate("/login", {
//                                   state: {
//                                     returnTo: "/dashboard/transportsearch",
//                                   },
//                                 });
//                               }}
//                               className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
//                             >
//                               <span>WhatsApp</span>
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TransportSearch;
import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  Truck,
  Phone,
  Building2,
  Eye,
  Loader2,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api/api";
import LocationSearchInput from "../Dashboard/user/LocationSearchInput";

const TransportSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [vehicleType, setVehicleType] = useState("");

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const scrollContainerRef = useRef(null);

  const checkUserLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const isLoggedIn = checkUserLoggedIn();

  useEffect(() => {
    fetchAllVehicles();
  }, []);

  // Position restoration buffer
  useEffect(() => {
    if (!initialLoading && !loading && vehicles.length > 0) {
      const lastCardId = sessionStorage.getItem("lastViewedCardId");

      if (lastCardId) {
        const timer = setTimeout(() => {
          const element = document.getElementById(lastCardId);

          if (element) {
            element.scrollIntoView({
              behavior: "auto",
              block: "center",
              inline: "nearest",
            });

            const yOffset = -90;
            const y =
              element.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: y, behavior: "auto" });
          }

          sessionStorage.removeItem("lastViewedCardId");
        }, 350);

        return () => clearTimeout(timer);
      }
    }
  }, [initialLoading, loading, vehicles]);

  // Last card ke baad scroll ko window/page par transfer karne ke liye event handler
  const handleContainerWheel = (e) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 2;
    const isAtTop = el.scrollTop <= 0;

    // Agar last card par hai aur neeche scroll kar rahe hain to window scroll hone lagegi
    if (isAtBottom && e.deltaY > 0) {
      window.scrollBy({ top: e.deltaY, behavior: "auto" });
    }
    // Agar top par hai aur upar scroll kar rahe hain to window scroll hone lagegi
    else if (isAtTop && e.deltaY < 0) {
      window.scrollBy({ top: e.deltaY, behavior: "auto" });
    }
  };

  const fetchAllVehicles = async () => {
    try {
      setInitialLoading(true);
      const { data } = await API.get("/vehicles/search");

      if (data.success) {
        setVehicles(data.data || []);
      }
    } catch (error) {
      console.error("Fetch Default Vehicles Error:", error);
      setVehicles([]);
    } finally {
      setInitialLoading(false);
    }
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
      const { data } = await API.get("/vehicles/search", { params });
      setLoading(false);

      if (!data.success) {
        toast.error(data.message || "No matching vehicles found");
        setVehicles([]);
        return;
      }

      toast.success(`Found ${data.count} verified partners`);
      setVehicles(data.data);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Unable to complete search");
      setVehicles([]);
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

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen text-slate-800 pb-20 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Banner */}
      <section className=" bg-blue-700 text-white pt-10 pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          {/* <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 px-3.5 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md">
            <ShieldCheck size={14} className="text-blue-400" />
            <span>Pan-India Verified Logistics Network</span>
          </div> */}

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
      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Search Panel */}
        <section className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4 sm:p-6 md:p-8 -mt-14 mb-10 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-end">
            {/* Origin */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <MapPin size={15} className="text-blue-600" />
                Pickup 
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
                Drop 
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

        {/* Scrollable Container with Seamless Scroll-Chaining */}
        {!initialLoading && !loading && vehicles.length > 0 && (
          <div
            ref={scrollContainerRef}
            onWheel={handleContainerWheel}
            className="max-h-[750px] overflow-y-auto overscroll-y-auto pr-1 sm:pr-2.5 custom-scrollbar"
            style={{ overscrollBehaviorY: "auto" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 pb-6">
              {vehicles.map((vehicle) => {
                const role =
                  vehicle.business?.role || vehicle.role || "Transporter";
                const rawPhoneNumber =
                  vehicle.business?.phoneNumber || vehicle.phoneNumber || "";
                const firmName =
                  vehicle.business?.firmName || "Verified Transporter";
                const phoneNumber = isLoggedIn
                  ? rawPhoneNumber
                  : maskPhoneNumber(rawPhoneNumber);

                const transporterId =
                  vehicle.business?._id || vehicle.business || vehicle.user;

                const vehicleNames = (vehicle.business?.vehicles || [])
                  .map((v) => v.vehicleType)
                  .filter(Boolean)
                  .join(", ");

                const availableCount = (
                  vehicle.business?.vehicles || []
                ).filter((v) => v.status === "available").length;

                const whatsappMessage = `Rodio Tradelink\nHello ${firmName},\nI found your transport profile on Rodio Tradelink.\nAvailable Types: ${vehicleNames || "Commercial Fleet"}\nLooking forward to booking a shipment.`;

                const whatsappUrl = `https://wa.me/91${rawPhoneNumber}?text=${encodeURIComponent(
                  whatsappMessage
                )}`;

                return (
                  <div
                    key={vehicle._id}
                    id={`vehicle-card-${vehicle._id}`}
                    className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Card Header */}
                    <div className="p-5 pb-4 border-b border-slate-100 bg-white">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <CheckCircle2
                              size={13}
                              className="text-blue-600 shrink-0"
                            />
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                              Verified Fleet
                            </span>
                          </div>
                          <h3
                            className="text-base font-bold text-slate-900 truncate"
                            title={firmName}
                          >
                            {firmName}
                          </h3>
                        </div>
                        <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shrink-0">
                          <Building2 size={12} />
                          {role}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 py-4 space-y-3.5 flex-1 text-xs">
                      {/* Fleet Types */}
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                          Vehicle Types
                        </span>
                        <span className="font-bold text-slate-800 text-right line-clamp-2 max-w-[65%]">
                          {vehicleNames || "Standard Commercial Fleet"}
                        </span>
                      </div>

                      {/* Contact Number */}
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                          Phone
                        </span>
                        <span className="font-bold text-slate-800 font-mono tracking-tight flex items-center gap-1">
                          <Phone size={13} className="text-emerald-600" />
                          {phoneNumber}
                        </span>
                      </div>

                      {/* Live Status */}
                      <div className="flex items-center justify-between gap-3 pt-1">
                        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                          Availability
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {availableCount > 0
                            ? `${availableCount} Ready for Load`
                            : "In Transit / On Call"}
                        </span>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-4 pt-2 bg-slate-50/60 border-t border-slate-100 space-y-2">
                      {/* View Profile */}
                      <button
                        onClick={() => {
                          sessionStorage.setItem(
                            "lastViewedCardId",
                            `vehicle-card-${vehicle._id}`
                          );
                          if (isLoggedIn) {
                            if (transporterId) {
                              navigate(
                                `/dashboard/transporters/${transporterId}`
                              );
                            } else {
                              toast.error(
                                "Transporter profile details not available"
                              );
                            }
                          } else {
                            toast.error(
                              "Please login to access profile details"
                            );
                            navigate("/login", {
                              state: {
                                returnTo: `/dashboard/transporters/${transporterId}`,
                                fromSearch: true,
                              },
                            });
                          }
                        }}
                        className="w-full min-h-[40px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
                      >
                        <Eye size={14} />
                        <span>View Profile</span>
                      </button>

                      {/* Dual Action: Call & WhatsApp */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Call Button */}
                        {isLoggedIn ? (
                          <a
                            href={`tel:${rawPhoneNumber}`}
                            className="min-h-[40px] rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-[0.98] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition shadow-sm"
                          >
                            <Phone size={13} />
                            <span>Call Now</span>
                          </a>
                        ) : (
                          <button
                            onClick={() => {
                              toast.error("Please login to call transporter");
                              navigate("/login", {
                                state: {
                                  returnTo: "/dashboard/transportsearch",
                                },
                              });
                            }}
                            className="min-h-[40px] rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 active:scale-[0.98] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition shadow-sm"
                          >
                            <Phone size={13} />
                            <span>Call Now</span>
                          </button>
                        )}

                        {/* WhatsApp Button */}
                        {isLoggedIn ? (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="min-h-[40px] rounded-xl bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition shadow-sm"
                          >
                           <FaWhatsapp size={16} />
                            <span>WhatsApp</span>
                          </a>
                        ) : (
                          <button
                            onClick={() => {
                              toast.error(
                                "Please login to message transporter"
                              );
                              navigate("/login", {
                                state: {
                                  returnTo: "/dashboard/transportsearch",
                                },
                              });
                            }}
                            className="min-h-[40px] rounded-xl bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 transition shadow-sm"
                          >
                            <FaWhatsapp size={16} />
                            <span>WhatsApp</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TransportSearch;