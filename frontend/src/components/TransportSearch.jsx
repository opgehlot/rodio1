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
//   Lock,
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

//   // Restrict items to 6 if user is not logged in
//   const displayedVehicles = isLoggedIn ? vehicles : vehicles.slice(0, 6);

//   return (
//     <div className="w-full bg-slate-50 min-h-screen pb-16">
//       {/* Hero Header Section */}
//       <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-12 px-4 shadow-md mb-8">
//         <div className="max-w-6xl mx-auto text-center space-y-3">
//           <span className="bg-blue-400 text-blue-100 border border-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest inline-block backdrop-blur-md">
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
//               <option value="Mini Truck">Mini Truck</option>
//               <option value="Pickup">Pickup</option>
//               <option value="Tata Ace">Tata Ace</option>
//               <option value="Bolero Pickup">Bolero Pickup</option>
//               <option value="Mahindra Jeeto">Mahindra Jeeto</option>
//               <option value="Ashok Leyland Dost">Ashok Leyland Dost</option>
//               <option value="Tempo">Tempo</option>
//               <option value="Canter">Canter</option>
//               <option value="Eicher">Eicher</option>
//               <option value="Truck">Truck</option>
//               <option value="LCV">LCV</option>
//               <option value="HCV">HCV</option>
//               <option value="14 Feet Truck">14 Feet Truck</option>
//               <option value="17 Feet Truck">17 Feet Truck</option>
//               <option value="Open Body">Open Body</option>
//               <option value="20 Feet Container">20 Feet Container</option>
//               <option value="32 Feet Container">32 Feet Container</option>
//               <option value="Trailer">Trailer</option>
//               <option value="Flat Bed Trailer">Flat Bed Trailer</option>
//               <option value="Low Bed Trailer">Low Bed Trailer</option>
//               <option value="Semi Trailer">Semi Trailer</option>
//               <option value="Tipper">Tipper</option>
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
//         <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
//           <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
//             Available Vehicles / Search Results
//           </h2>
//           <span className="text-xs font-black bg-slate-200 text-slate-700 px-3 py-1 rounded-full uppercase tracking-wider">
//             {isLoggedIn
//               ? vehicles.length
//               : `${displayedVehicles.length} of ${vehicles.length}`}{" "}
//             Vehicles Shown
//           </span>
//         </div>

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

//                   const firmName = isLoggedIn
//                     ? vehicle.business?.firmName || "Transport Firm"
//                     : "🔒 Protected Transport Firm";

//                   const ownerName = isLoggedIn
//                     ? vehicle.business?.ownerName || "Owner"
//                     : "🔒 Hidden Owner";

//                   const phoneNumber = isLoggedIn
//                     ? rawPhoneNumber
//                     : "XXXXXXXXXX";

//                   // Extract transporter ID safely from business or user reference
//                   const transporterId =
//                     vehicle.business?._id || vehicle.business || vehicle.user;

//                   // 👇 Iske niche paste karo

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
//                       className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
//                     >
//                       {/* Card Header */}
//                       <div className="bg-gradient-to-r from-[#2263F1] via-[#395DEF] to-[#4758EE] p-5 text-white">
//                         <div className="flex justify-between items-start">
//                           <h3 className="text-base font-black uppercase truncate max-w-[200px]">
//                             {firmName}
//                           </h3>
//                           <span className="bg-blue-600/30 border border-blue-400/30 text-blue-300 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
//                             <Building2 size={12} />
//                             {role}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-wider mt-1.5">
//                           <User size={14} className="text-white" />
//                           <span>{ownerName}</span>
//                         </div>
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

//                         <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
//                           <span className="font-bold uppercase tracking-widest text-slate-400">
//                             Vehicle Number
//                           </span>
//                           <span className="font-black uppercase text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
//                             {isLoggedIn ? vehicle.vehicleNumber : "DL-XX-XXXX"}
//                           </span>
//                         </div>

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
//                         <div className="flex items-start gap-2.5 pt-2">
//                           <div className="bg-blue-50 text-blue-600 p-2 rounded-xl mt-0.5 border border-blue-100">
//                             <MapPinned size={16} />
//                           </div>
//                           <div>
//                             <p className="font-black uppercase text-slate-800">
//                               {isLoggedIn
//                                 ? vehicle.business?.currentCity ||
//                                   "Location Not Set"
//                                 : "🔒 Login to view location"}
//                             </p>
//                             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
//                               {vehicle.business?.currentState || "India"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Actions */}
//                       <div className="p-5 pt-0 space-y-2">
//                         {/* View Profile Button (Locked if logged out) */}
//                         <div>
//                           {isLoggedIn ? (
//                             <button
//                               onClick={() => {
//                                 if (transporterId) {
//                                   navigate(
//                                     `/dashboard/transporters/${transporterId}`,
//                                   );
//                                 } else {
//                                   toast.error(
//                                     "Transporter profile ID not found",
//                                   );
//                                 }
//                               }}
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
//                                 navigate("/login", {
//                                   state: { from: location },
//                                 });
//                               }}
//                               className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95"
//                             >
//                               <Lock size={12} />
//                               <span>Unlock Profile</span>
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
//                                     state: { from: location },
//                                   });
//                                 }}
//                                 className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95"
//                               >
//                                 <Lock size={12} />
//                                 <span>Unlock Call</span>
//                               </button>

//                               <button
//                                 onClick={() => {
//                                   toast.error(
//                                     "Please login or register to message transporter!",
//                                   );
//                                   navigate("/login", {
//                                     state: { from: location },
//                                   });
//                                 }}
//                                 className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
//                               >
//                                 <Lock size={12} />
//                                 <span>Unlock WA</span>
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

//             {/* Login Prompt Banner for Logged Out Users */}
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
//                       navigate("/login", { state: { from: location } })
//                     }
//                     className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition active:scale-95 shadow-lg"
//                   >
//                     Login / Register Now
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TransportSearch;
import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Truck,
  Phone,
  MapPinned,
  User,
  Loader2,
  Building2,
  Eye,
} from "lucide-react";
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

  // Check login status helper
  const checkUserLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const isLoggedIn = checkUserLoggedIn();

  useEffect(() => {
    fetchAllVehicles();
  }, []);

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
        toast.error("Please login or register first to search routes!", {
          id: "login-required",
        });
        navigate("/login", { state: { from: location } });
        return;
      }

      if (!fromLocation || !toLocation) {
        toast.error("Please select Origin & Destination", {
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
        toast.error(data.message || "No Vehicles Found");
        setVehicles([]);
        return;
      }

      toast.success(`Found ${data.count} Vehicles`);
      setVehicles(data.data);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Unable to Search Vehicles");
      setVehicles([]);
    }
  };

  // Helper functions for masking sensitive data
  const maskPhoneNumber = (number) => {
    if (!number) return "XXXXXX";
    const str = String(number);
    if (str.length >= 4) {
      return "XXXXXX" + str.slice(-4);
    }
    return "XXXXXX";
  };

  const maskVehicleNumber = (number) => {
    if (!number) return "DL-XX-XXXX";
    const str = String(number);
    if (str.length >= 4) {
      return str.slice(0, 4) + "XX" + str.slice(-4);
    }
    return "DL-XX-XXXX";
  };

  // Restrict items to 6 if user is not logged in
  const displayedVehicles = isLoggedIn ? vehicles : vehicles.slice(0, 6);

  return (
    <div className="w-full bg-slate-50 min-h-screen pb-16">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white py-12 px-4 shadow-md mb-8">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <span className="bg-blue-400 text-blue-100 border border-white/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest inline-block backdrop-blur-md">
            India's Trusted Transport Network
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            Find Verified Transport Services
          </h1>
          <p className="text-blue-100 text-xs md:text-sm font-bold uppercase tracking-wider max-w-xl mx-auto">
            Search trucks, commercial vehicles, and reliable transport services
            seamlessly across India.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Search Control Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 -mt-16 mb-12 relative z-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
          {/* From */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
              <MapPin size={16} className="text-blue-600" />
              Origin / From
            </label>
            <LocationSearchInput
              placeholder="Enter Origin City"
              onSelectLocation={setFromLocation}
            />
          </div>

          {/* To */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
              <MapPin size={16} className="text-emerald-600" />
              Destination / To
            </label>
            <LocationSearchInput
              placeholder="Enter Destination City"
              onSelectLocation={setToLocation}
            />
          </div>

          {/* Vehicle Type */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
              <Truck size={16} className="text-orange-500" />
              Vehicle Type
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-900 transition"
            >
              <option value="">All Vehicles</option>
              <option value="Mini Truck">Mini Truck</option>
              <option value="Pickup">Pickup</option>
              <option value="Tata Ace">Tata Ace</option>
              <option value="Bolero Pickup">Bolero Pickup</option>
              <option value="Mahindra Jeeto">Mahindra Jeeto</option>
              <option value="Ashok Leyland Dost">Ashok Leyland Dost</option>
              <option value="Tempo">Tempo</option>
              <option value="Canter">Canter</option>
              <option value="Eicher">Eicher</option>
              <option value="Truck">Truck</option>
              <option value="LCV">LCV</option>
              <option value="HCV">HCV</option>
              <option value="14 Feet Truck">14 Feet Truck</option>
              <option value="17 Feet Truck">17 Feet Truck</option>
              <option value="Open Body">Open Body</option>
              <option value="20 Feet Container">20 Feet Container</option>
              <option value="32 Feet Container">32 Feet Container</option>
              <option value="Trailer">Trailer</option>
              <option value="Flat Bed Trailer">Flat Bed Trailer</option>
              <option value="Low Bed Trailer">Low Bed Trailer</option>
              <option value="Semi Trailer">Semi Trailer</option>
              <option value="Tipper">Tipper</option>
            </select>
          </div>

          {/* Search Button */}
          <div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#2263F1] via-[#395DEF] to-[#4758EE] text-white rounded-xl py-3 px-4 text-xs font-black tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 disabled:opacity-50 h-[46px]"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search size={16} />
                  <span>Search Transport</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
            Available Vehicles / Search Results
          </h2>
          <span className="text-xs font-black bg-slate-200 text-slate-700 px-3 py-1 rounded-full uppercase tracking-wider">
            {isLoggedIn
              ? vehicles.length
              : `${displayedVehicles.length} of ${vehicles.length}`}{" "}
            Vehicles Shown
          </span>
        </div>

        {/* Initial or Search Loading State */}
        {(initialLoading || loading) && (
          <div className="min-h-[30vh] w-full flex items-center justify-center bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-slate-900" size={32} />
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
                {initialLoading
                  ? "Loading Available Vehicles..."
                  : "Searching Vehicles..."}
              </p>
            </div>
          </div>
        )}

        {/* No Result State */}
        {!initialLoading && !loading && vehicles.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Truck size={32} />
            </div>
            <h3 className="text-lg font-black text-slate-800 uppercase">
              No Vehicles Found
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1 max-w-sm mx-auto">
              Try changing your origin, destination routes or searching with a
              different vehicle category.
            </p>
          </div>
        )}

        {/* Vehicle Cards Container with Scrollable Box */}
        {!initialLoading && !loading && displayedVehicles.length > 0 && (
          <>
            <div className="max-h-[750px] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                {displayedVehicles.map((vehicle) => {
                  const role =
                    vehicle.business?.role || vehicle.role || "Transporter";
                  const rawPhoneNumber =
                    vehicle.business?.phoneNumber ||
                    vehicle.phoneNumber ||
                    "N/A";

                  const firmName = vehicle.business?.firmName || "Transport Firm";
                  const ownerName = vehicle.business?.ownerName || "Owner";
                  const phoneNumber = isLoggedIn
                    ? rawPhoneNumber
                    : maskPhoneNumber(rawPhoneNumber);
                  const vehicleNumber = isLoggedIn
                    ? vehicle.vehicleNumber
                    : maskVehicleNumber(vehicle.vehicleNumber);
                  const currentCity = vehicle.business?.currentCity || "Location Not Set";

                  // Extract transporter ID safely from business or user reference
                  const transporterId =
                    vehicle.business?._id || vehicle.business || vehicle.user;

                  const whatsappMessage = ` Rodio Tradelink
Hello ${firmName},
Your transport profile is listed on Rodio.
Available Vehicle:
${vehicle.vehicleType}
Connect with verified transporters across India.
🌐 https://rodiotradelink.com`;

                  const whatsappUrl = `https://wa.me/91${rawPhoneNumber}?text=${encodeURIComponent(
                    whatsappMessage,
                  )}`;

                  return (
                    <div
                      key={vehicle._id}
                      className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
                    >
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-[#2263F1] via-[#395DEF] to-[#4758EE] p-5 text-white">
                        <div className="flex justify-between items-start">
                          <h3 className="text-base font-black uppercase truncate max-w-[200px]">
                            {firmName}
                          </h3>
                          <span className="bg-blue-600/30 border border-blue-400/30 text-blue-300 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                            <Building2 size={12} />
                            {role}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-wider mt-1.5">
                          <User size={14} className="text-white" />
                          <span>{ownerName}</span>
                        </div>
                      </div>

                      {/* Card Specs Body */}
                      <div className="p-5 space-y-3.5 flex-1 text-xs">
                        <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                          <span className="font-bold uppercase tracking-widest text-slate-400">
                            Vehicle Type
                          </span>
                          <span className="font-black uppercase text-slate-800">
                            {vehicle.vehicleType}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                          <span className="font-bold uppercase tracking-widest text-slate-400">
                            Vehicle Number
                          </span>
                          <span className="font-black uppercase text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg">
                            {vehicleNumber}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                          <span className="font-bold uppercase tracking-widest text-slate-400">
                            Phone Number
                          </span>
                          <span className="font-black text-slate-800 flex items-center gap-1.5">
                            <Phone size={13} className="text-emerald-600" />
                            {phoneNumber}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                          <span className="font-bold uppercase tracking-widest text-slate-400">
                            Capacity
                          </span>
                          <span className="font-black uppercase text-slate-800">
                            {vehicle.capacity || "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                          <span className="font-bold uppercase tracking-widest text-slate-400">
                            Body Type
                          </span>
                          <span className="font-black uppercase text-slate-800">
                            {vehicle.bodyType || "N/A"}
                          </span>
                        </div>

                        <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
                          <span className="font-bold uppercase tracking-widest text-slate-400">
                            Status
                          </span>
                          <span className="font-black uppercase text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                            {vehicle.status || "Available"}
                          </span>
                        </div>

                        {/* Current Location Info */}
                        <div className="flex items-start gap-2.5 pt-2">
                          <div className="bg-blue-50 text-blue-600 p-2 rounded-xl mt-0.5 border border-blue-100">
                            <MapPinned size={16} />
                          </div>
                          <div>
                            <p className="font-black uppercase text-slate-800">
                              {currentCity}
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                              {vehicle.business?.currentState || "India"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="p-5 pt-0 space-y-2">
                        {/* View Profile Button */}
                        <div>
                          {isLoggedIn ? (
                            <button
                              onClick={() => {
                                if (transporterId) {
                                  navigate(
                                    `/dashboard/transporters/${transporterId}`,
                                  );
                                } else {
                                  toast.error(
                                    "Transporter profile ID not found",
                                  );
                                }
                              }}
                              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95"
                            >
                              <Eye size={14} />
                              <span>View Profile</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                toast.error(
                                  "Please login or register to view profile!",
                                );
                                navigate("/login", {
                                  state: { from: location },
                                });
                              }}
                              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95"
                            >
                              <span>View Profile</span>
                            </button>
                          )}
                        </div>

                        {/* Call & WhatsApp Actions */}
                        <div className="grid grid-cols-2 gap-2">
                          {isLoggedIn ? (
                            <>
                              <a
                                href={`tel:${rawPhoneNumber}`}
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95"
                              >
                                <Phone size={14} />
                                <span>Call Now</span>
                              </a>

                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
                              >
                                <span>WhatsApp</span>
                              </a>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  toast.error(
                                    "Please login or register to call transporter!",
                                  );
                                  navigate("/login", {
                                    state: { from: location },
                                  });
                                }}
                                className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95"
                              >
                                <span>Call Now</span>
                              </button>

                              <button
                                onClick={() => {
                                  toast.error(
                                    "Please login or register to message transporter!",
                                  );
                                  navigate("/login", {
                                    state: { from: location },
                                  });
                                }}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 transition active:scale-95 shadow-sm"
                              >
                                <span>WhatsApp</span>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Login Prompt Banner for Logged Out Users */}
            {!isLoggedIn && vehicles.length > 6 && (
              <div className="mt-12 bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
                <h3 className="text-xl md:text-2xl font-black uppercase">
                  Want to view all {vehicles.length} vehicles and get direct
                  phone numbers?
                </h3>
                <p className="text-xs font-bold text-slate-300 uppercase tracking-wider max-w-lg mx-auto">
                  Login or create an account to unlock complete transporter
                  contacts, search routes freely, and book vehicles instantly.
                </p>
                <div>
                  <button
                    onClick={() =>
                      navigate("/login", { state: { from: location } })
                    }
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition active:scale-95 shadow-lg"
                  >
                    Login / Register Now
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TransportSearch;
