// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import API from "../../api/api";
// import {
//   FaSearch,
//   FaTruckMoving,
//   FaSyncAlt,
//   FaTruck,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaWeightHanging,
//   FaMoneyBillWave,
//   FaBoxOpen,
//   FaArrowRight,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";

// const PAGE_SIZE = 10;

// // =========================================================================
// // 1. SINGLE LEAD CARD (Compact profile-card style; one Bid button)
// // =========================================================================
// const SingleLeadCard = ({ lead, onBidSuccess, page }) => {
//   const navigate = useNavigate();

//   const [openBid, setOpenBid] = useState(false);
//   const [bidAmount, setBidAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");
//   let user = {};
//   try {
//     user = JSON.parse(localStorage.getItem("user") || "{}");
//   } catch (err) {
//     user = {};
//   }

//   const isLoggedIn = !!token;
//   const isSubscribed =
//     user?.isSubscriptionActive === true ||
//     user?.subscription?.status === "active";

//   const isAvailable =
//     (lead?.isAvailable === true || lead?.isAvailable === undefined) &&
//     (lead?.bidCount || 0) < 10;

//   const handleProtectedAction = () => {
//     if (!isLoggedIn) {
//       sessionStorage.setItem("lastViewedLeadId", `lead-card-${lead._id}`);
//       sessionStorage.setItem("lastViewedLeadPage", String(page || 1));
//       sessionStorage.setItem("authRedirectUrl", "/dashboard/leads");

//       toast.error("Please login first.", { id: "login first" });
//       navigate("/login", {
//         state: {
//           returnTo: "/dashboard/leads",
//           leadId: lead._id,
//           action: "bid",
//         },
//       });
//       return;
//     }

//     if (!isSubscribed) {
//       toast.error("Premium subscription required.", {
//         id: "premium subscription required",
//       });
//       navigate("/dashboard/planselection");
//       return;
//     }

//     if (!isAvailable) {
//       toast.error("This lead is closed or sold out.", { id: "lead closed" });
//       return;
//     }

//     setOpenBid(true);
//   };

//   const handleSubmitBid = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await API.post(`/bids/create/${lead._id}`, {
//         amount: Number(bidAmount),
//         message,
//       });

//       toast.success("Bid submitted successfully.", {
//         id: "bid submitted successfully",
//       });
//       setBidAmount("");
//       setMessage("");
//       setOpenBid(false);
//       if (onBidSuccess) onBidSuccess();
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to submit bid.", {
//         id: "failed to submit bid",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) return "N/A";
//     return new Date(date).toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <div
//       id={`lead-card-${lead._id}`}
//       className={`group h-full min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-200 hover:shadow-lg flex flex-col ${
//         !isAvailable ? "opacity-80" : ""
//       }`}
//     >
//       {/* Compact blue-purple header */}
//       <div
//         className={`px-3 py-2.5 text-white ${
//           isAvailable
//             ? "bg-gradient-to-r from-blue-600 to-indigo-600"
//             : "bg-gradient-to-r from-gray-500 to-gray-600"
//         }`}
//       >
//         <div className="flex items-start justify-between gap-3">
//           <div className="min-w-0">
//             <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-100">
//               Transport requirement
//             </span>
//             <h2 className="mt-0.5 flex items-center gap-2 text-base font-bold leading-tight">
//               <FaTruck className="shrink-0 text-blue-100" />
//               <span className="truncate">{lead?.vehicleType || "Transport Lead"}</span>
//             </h2>
//             <p className="mt-0.5 truncate text-xs text-blue-100">
//               {lead?.service || "Standard Delivery"}
//             </p>
//           </div>
//           <span
//             className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
//               isAvailable ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
//             }`}
//           >
//             {isAvailable
//               ? `Active (${lead?.bidCount || 0}/10)`
//               : lead?.displayStatus === "ACCEPTED" ||
//                   lead?.status === "Assigned" ||
//                   lead?.status === "Accepted"
//                 ? "Accepted"
//                 : (lead?.bidCount || 0) >= 10
//                   ? "Limit reached"
//                   : lead?.availabilityReason || "Inactive"}
//           </span>
//         </div>
//       </div>

//       {/* Compact details */}
//       <div className="flex flex-col gap-2 p-2.5">
//         {/* Route */}
//         <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
//           <div className="min-w-0">
//             <p className="text-[11px] text-gray-500">Pickup</p>
//             <p className="break-words text-sm font-semibold text-gray-900">
//               {lead?.pickupLocation || lead?.loading_point || "N/A"}
//             </p>
//           </div>
//           <FaArrowRight className="text-sm text-blue-600" />
//           <div className="min-w-0 text-right">
//             <p className="text-[11px] text-gray-500">Destination</p>
//             <p className="break-words text-sm font-semibold text-gray-900">
//               {lead?.dropLocation || "N/A"}
//             </p>
//           </div>
//         </div>

//         {/* Goods and weight */}
//         <div className="grid grid-cols-2 gap-2">
//           <div className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
//             <div className="flex items-center gap-2 text-sm text-blue-600">
//               <FaBoxOpen />
//               <span>Goods</span>
//             </div>
//             <p className="mt-1 break-words text-sm font-semibold text-gray-900">
//               {lead?.goodsType || "N/A"}
//             </p>
//           </div>
//           <div className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
//             <div className="flex items-center gap-2 text-sm text-orange-600">
//               <FaWeightHanging />
//               <span>Weight</span>
//             </div>
//             <p className="mt-1 break-words text-sm font-semibold text-gray-900">
//               {lead?.weight || 0}
//             </p>
//           </div>
//         </div>

//         {/* Budget */}
//         <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2">
//           <div>
//             <p className="text-xs text-gray-500">Expected Budget</p>
//             <p className="mt-0.5 text-lg font-bold text-emerald-700">
//               ₹ {lead?.expectedBudget || 0}
//             </p>
//           </div>
//           <FaMoneyBillWave size={22} className="shrink-0 text-emerald-600" />
//         </div>

//         {lead?.pickupDate && (
//           <div className="flex items-center gap-2 text-xs text-gray-600">
//             <FaCalendarAlt className="text-indigo-600" />
//             <span>Pickup: {formatDate(lead.pickupDate)}</span>
//           </div>
//         )}

//         {/* Reserve equal space for Remarks on every card so Bid buttons align */}
//         <div className="min-h-[56px] rounded-xl border border-amber-100 bg-amber-50/70 p-2">
//           {lead?.remarks ? (
//             <>
//               <p className="text-xs font-semibold text-gray-800">Remarks</p>
//               <p className="mt-0.5 break-words text-xs text-gray-600">{lead.remarks}</p>
//             </>
//           ) : (
//             <p className="text-xs text-transparent select-none" aria-hidden="true">
//               Remarks
//             </p>
//           )}
//         </div>

//         {!isSubscribed && isAvailable && (
//           <p className="text-xs font-medium text-amber-700">
//             Bidding is available to active subscribers.
//           </p>
//         )}
//       </div>

//       {/* One single Bid button */}
//       <div className="border-t border-gray-100 p-2.5">
//         <button
//           type="button"
//           onClick={handleProtectedAction}
//           disabled={!isAvailable}
//           className={`w-full rounded-xl py-2.5 text-sm font-bold text-white shadow-sm transition ${
//             !isAvailable
//               ? "cursor-not-allowed bg-gray-400"
//               : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99]"
//           }`}
//         >
//           {!isAvailable
//             ? lead?.displayStatus === "ACCEPTED" ||
//               lead?.status === "Assigned" ||
//               lead?.status === "Accepted"
//               ? "ACCEPTED"
//               : (lead?.bidCount || 0) >= 10
//                 ? "BID LIMIT REACHED (10/10)"
//                 : "NO LONGER AVAILABLE"
//             : !isLoggedIn
//               ? "Login to Bid"
//               : !isSubscribed
//                 ? "Upgrade to Bid"
//                 : "Place Your Bid"}
//         </button>
//       </div>

//       {/* Bid modal */}
//       {openBid && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
//             <div className="flex items-center justify-between border-b p-5">
//               <h2 className="text-xl font-bold">Place Your Bid</h2>
//               <button
//                 type="button"
//                 onClick={() => setOpenBid(false)}
//                 className="text-2xl text-gray-500 hover:text-black"
//                 aria-label="Close bid form"
//               >
//                 ×
//               </button>
//             </div>
//             <form onSubmit={handleSubmitBid} className="p-5">
//               <label className="mb-2 block text-sm font-semibold">Bid Amount</label>
//               <input
//                 type="number"
//                 min="1"
//                 required
//                 value={bidAmount}
//                 onChange={(e) => setBidAmount(e.target.value)}
//                 placeholder="Enter your bid amount"
//                 className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
//               />
//               <label className="mb-2 mt-4 block text-sm font-semibold">Message</label>
//               <textarea
//                 rows={3}
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Write your message..."
//                 className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
//               />
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="mt-5 w-full rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600 disabled:opacity-60"
//               >
//                 {loading ? "Submitting..." : "Submit Bid"}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // =========================================================================
// // 2. MAIN LEADS COMPONENT (Pagination + Scroll Restoration)
// // =========================================================================
// const Leads = () => {
//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [vehicleFilter, setVehicleFilter] = useState("All");

//   // Pagination (login ke baad wapas aane par last page restore hota hai)
//   const [currentPage, setCurrentPage] = useState(() => {
//     return Number(sessionStorage.getItem("lastViewedLeadPage")) || 1;
//   });

//   const resultsRef = useRef(null);

//   const getAllLeads = useCallback(async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/booking/all", {
//         headers: {
//           "X-API-KEY": "ashu@rodio",
//         },
//       });
//       setLeads(res.data?.data || []);
//     } catch (error) {
//       console.error("Failed to fetch leads", error);
//       setLeads([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     getAllLeads();
//   }, [getAllLeads]);

//   // Back aane par usi card par screen settle karne ka logic
//   useEffect(() => {
//     if (!loading && leads.length > 0) {
//       const lastLeadId = sessionStorage.getItem("lastViewedLeadId");

//       if (lastLeadId) {
//         const timer = setTimeout(() => {
//           const element = document.getElementById(lastLeadId);
//           if (element) {
//             const yOffset = -90;
//             const y =
//               element.getBoundingClientRect().top +
//               window.pageYOffset +
//               yOffset;
//             window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
//           }
//           sessionStorage.removeItem("lastViewedLeadId");
//           sessionStorage.removeItem("lastViewedLeadPage");
//         }, 350);

//         return () => clearTimeout(timer);
//       }
//     }
//   }, [loading, leads]);

//   const vehicleTypes = useMemo(() => {
//     const list = leads.map((item) => item.vehicleType).filter(Boolean);
//     return ["All", ...new Set(list)]
//       .filter((vehicle) => vehicle === "All")
//       .concat(
//         [...new Set(list)].sort((a, b) =>
//           String(a).localeCompare(String(b), "en", { sensitivity: "base" })
//         )
//       );
//   }, [leads]);

//   const filteredLeads = useMemo(() => {
//     return leads.filter((lead) => {
//       const keyword = search.toLowerCase();

//       const matchSearch =
//         lead.pickupLocation?.toLowerCase().includes(keyword) ||
//         lead.loading_point?.toLowerCase().includes(keyword) ||
//         lead.dropLocation?.toLowerCase().includes(keyword) ||
//         lead.goodsType?.toLowerCase().includes(keyword) ||
//         lead.vehicleType?.toLowerCase().includes(keyword) ||
//         lead.service?.toLowerCase().includes(keyword);

//       const matchVehicle =
//         vehicleFilter === "All" || lead.vehicleType === vehicleFilter;

//       return matchSearch && matchVehicle;
//     });
//   }, [leads, search, vehicleFilter]);

//   // ---------- Pagination values ----------
//   const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
//   const safePage = Math.min(currentPage, totalPages);

//   const paginatedLeads = filteredLeads.slice(
//     (safePage - 1) * PAGE_SIZE,
//     safePage * PAGE_SIZE
//   );

//   const scrollToResults = () => {
//     window.setTimeout(() => {
//       const el = resultsRef.current;
//       if (!el) return;
//       const top = el.getBoundingClientRect().top + window.pageYOffset - 20;
//       window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
//     }, 100);
//   };

//   const goToPage = (page) => {
//     const next = Math.min(Math.max(1, page), totalPages);
//     setCurrentPage(next);
//     scrollToResults();
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//     setCurrentPage(1);
//   };

//   const handleVehicleChange = (e) => {
//     setVehicleFilter(e.target.value);
//     setCurrentPage(1);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-700 to-indigo-700">
//         <div className="max-w-7xl mx-auto px-4 py-10">
//           <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
//             <div>
//               <h1 className="text-4xl font-bold text-white">Transport Leads</h1>
//               <p className="text-blue-100 mt-2">
//                 Browse available transport requirements
//               </p>
//             </div>
//             <button
//               onClick={getAllLeads}
//               className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center gap-2 cursor-pointer active:scale-95"
//             >
//               <FaSyncAlt className={loading ? "animate-spin" : ""} />
//               Refresh new leads
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Search & Filters */}
//       <div className="max-w-7xl mx-auto px-4 -mt-8">
//         <div className="bg-white rounded-3xl shadow-lg p-5">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//             <div className="relative lg:col-span-2">
//               <FaSearch className="absolute top-4 left-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search Pickup, Destination, Goods..."
//                 className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
//                 value={search}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <div>
//               <select
//                 value={vehicleFilter}
//                 onChange={handleVehicleChange}
//                 className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
//               >
//                 {vehicleTypes.map((vehicle) => (
//                   <option key={vehicle} value={vehicle}>
//                     {vehicle}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Count */}
//       <div className="max-w-7xl mx-auto px-4 mt-8">
//         <div className="flex items-center justify-between">
//           <h2 className="text-2xl font-bold text-gray-800">Available Leads</h2>
//           {!loading && filteredLeads.length > 0 && (
//             <p className="text-xs sm:text-sm font-semibold text-gray-500">
//               Showing{" "}
//               <span className="text-gray-900">
//                 {(safePage - 1) * PAGE_SIZE + 1}–
//                 {Math.min(safePage * PAGE_SIZE, filteredLeads.length)}
//               </span>{" "}
//               of <span className="text-gray-900">{filteredLeads.length}</span>
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Cards Grid */}
//       <div ref={resultsRef} className="max-w-7xl mx-auto px-0 sm:px-4 py-5">
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
//             {[...Array(6)].map((_, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-3xl p-6 shadow animate-pulse"
//               >
//                 <div className="h-10 bg-gray-200 rounded mb-6"></div>
//                 <div className="space-y-4">
//                   <div className="h-4 bg-gray-200 rounded"></div>
//                   <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                   <div className="h-4 bg-gray-200 rounded"></div>
//                   <div className="h-24 bg-gray-200 rounded-xl"></div>
//                   <div className="h-12 bg-gray-200 rounded-xl"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : filteredLeads.length === 0 ? (
//           <div className="bg-white rounded-3xl shadow-lg py-20 px-8 text-center">
//             <div className="text-7xl mb-6">🚚</div>
//             <h2 className="text-3xl font-bold text-gray-700">No Leads Found</h2>
//             <p className="text-gray-500 mt-4">
//               No transport leads match your search criteria.
//             </p>
//             <button
//               onClick={() => {
//                 setSearch("");
//                 setVehicleFilter("All");
//                 setCurrentPage(1);
//               }}
//               className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition cursor-pointer"
//             >
//               Reset Filters
//             </button>
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4 items-stretch px-4 sm:px-0">
//               {paginatedLeads.map((lead) => (
//                 <SingleLeadCard
//                   key={lead._id}
//                   lead={lead}
//                   page={safePage}
//                   onBidSuccess={getAllLeads}
//                 />
//               ))}
//             </div>

//             {/* Pagination: Prev / Next */}
//             {filteredLeads.length > PAGE_SIZE && (
//               <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
//                 <button
//                   onClick={() => goToPage(safePage - 1)}
//                   disabled={safePage === 1}
//                   className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
//                 >
//                   <FaChevronLeft size={12} />
//                   Prev
//                 </button>

//                 <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
//                   Page {safePage} of {totalPages}
//                 </span>

//                 <button
//                   onClick={() => goToPage(safePage + 1)}
//                   disabled={safePage === totalPages}
//                   className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
//                 >
//                   Next
//                   <FaChevronRight size={12} />
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Leads;
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/api";
import {
  FaSearch,
  FaTruckMoving,
  FaSyncAlt,
  FaTruck,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWeightHanging,
  FaMoneyBillWave,
  FaBoxOpen,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const PAGE_SIZE = 10;

// =========================================================================
// 1. SINGLE LEAD CARD (Compact profile-card style; one Bid button)
// =========================================================================
const SingleLeadCard = ({ lead, onBidSuccess, page }) => {
  const navigate = useNavigate();

  const [openBid, setOpenBid] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (err) {
    user = {};
  }

  const isLoggedIn = !!token;
  const isSubscribed =
    user?.isSubscriptionActive === true ||
    user?.subscription?.status === "active";

  const isAvailable =
    (lead?.isAvailable === true || lead?.isAvailable === undefined) &&
    (lead?.bidCount || 0) < 10;

  const handleProtectedAction = () => {
    if (!isLoggedIn) {
      sessionStorage.setItem("lastViewedLeadId", `lead-card-${lead._id}`);
      sessionStorage.setItem("lastViewedLeadPage", String(page || 1));
      sessionStorage.setItem("authRedirectUrl", "/dashboard/leads");

      toast.error("Please login first.", { id: "login first" });
      navigate("/login", {
        state: {
          returnTo: "/dashboard/leads",
          leadId: lead._id,
          action: "bid",
        },
      });
      return;
    }

    if (!isSubscribed) {
      toast.error("Premium subscription required.", {
        id: "premium subscription required",
      });
      navigate("/dashboard/planselection");
      return;
    }

    if (!isAvailable) {
      toast.error("This lead is closed or sold out.", { id: "lead closed" });
      return;
    }

    setOpenBid(true);
  };

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post(`/bids/create/${lead._id}`, {
        amount: Number(bidAmount),
        message,
      });

      toast.success("Bid submitted successfully.", {
        id: "bid submitted successfully",
      });
      setBidAmount("");
      setMessage("");
      setOpenBid(false);
      if (onBidSuccess) onBidSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit bid.", {
        id: "failed to submit bid",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      id={`lead-card-${lead._id}`}
      className={`group h-full min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-200 hover:shadow-lg flex flex-col ${
        !isAvailable ? "opacity-80" : ""
      }`}
    >
      {/* Compact blue-purple header */}
      <div
        className={`px-3 py-2.5 text-white ${
          isAvailable
            ? "bg-gradient-to-r from-blue-600 to-indigo-600"
            : "bg-gradient-to-r from-gray-500 to-gray-600"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-100">
              Transport requirement
            </span>
            <h2 className="mt-0.5 flex items-center gap-2 text-base font-bold leading-tight">
              <FaTruck className="shrink-0 text-blue-100" />
              <span className="truncate">{lead?.vehicleType || "Transport Lead"}</span>
            </h2>
            <p className="mt-0.5 truncate text-xs text-blue-100">
              {lead?.service || "Standard Delivery"}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
              isAvailable ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {isAvailable
              ? `Active (${lead?.bidCount || 0}/10)`
              : lead?.displayStatus === "ACCEPTED" ||
                  lead?.status === "Assigned" ||
                  lead?.status === "Accepted"
                ? "Accepted"
                : (lead?.bidCount || 0) >= 10
                  ? "Limit reached"
                  : lead?.availabilityReason || "Inactive"}
          </span>
        </div>
      </div>

      {/* Compact details */}
      <div className="flex flex-col gap-2 p-2.5">
        {/* Route */}
      
{/* Route */}
<div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
  <div className="min-w-0">
    <p className="text-[11px] text-gray-500">Pickup</p>
    <p className="break-words text-sm font-semibold text-gray-900">
      {lead?.pickupLocation || lead?.loading_point || "N/A"}
    </p>
  </div>

  <FaArrowRight className="text-sm text-blue-600" />

  <div className="min-w-0 text-right">
    <p className="text-[11px] text-gray-500">Destination</p>
    <p className="break-words text-sm font-semibold text-gray-900">
      {lead?.dropLocation || lead?.unloading_point || lead?.unloadingPoint || lead?.toLocation || lead?.to || lead?.destination || lead?.loading_point || "N/A"}
    </p>
  </div>
</div>


        {/* Goods and weight */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <FaBoxOpen />
              <span>Goods</span>
            </div>
            <p className="mt-1 break-words text-sm font-semibold text-gray-900">
              {lead?.goodsType || "N/A"}
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-2.5">
            <div className="flex items-center gap-2 text-sm text-orange-600">
              <FaWeightHanging />
              <span>Weight</span>
            </div>
            <p className="mt-1 break-words text-sm font-semibold text-gray-900">
              {lead?.weight || 0}
            </p>
          </div>
        </div>

        {/* Budget */}
        <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2">
          <div>
            <p className="text-xs text-gray-500">Expected Budget</p>
            <p className="mt-0.5 text-lg font-bold text-emerald-700">
              ₹ {lead?.expectedBudget || 0}
            </p>
          </div>
          <FaMoneyBillWave size={22} className="shrink-0 text-emerald-600" />
        </div>

        {lead?.pickupDate && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <FaCalendarAlt className="text-indigo-600" />
            <span>Pickup: {formatDate(lead.pickupDate)}</span>
          </div>
        )}

        {/* Reserve equal space for Remarks on every card so Bid buttons align */}
        <div className="min-h-[56px] rounded-xl border border-amber-100 bg-amber-50/70 p-2">
          {lead?.remarks ? (
            <>
              <p className="text-xs font-semibold text-gray-800">Remarks</p>
              <p className="mt-0.5 break-words text-xs text-gray-600">{lead.remarks}</p>
            </>
          ) : (
            <p className="text-xs text-transparent select-none" aria-hidden="true">
              Remarks
            </p>
          )}
        </div>

        {!isSubscribed && isAvailable && (
          <p className="text-xs font-medium text-amber-700">
            Bidding is available to active subscribers.
          </p>
        )}
      </div>

      {/* One single Bid button */}
      <div className="border-t border-gray-100 p-2.5">
        <button
          type="button"
          onClick={handleProtectedAction}
          disabled={!isAvailable}
          className={`w-full rounded-xl py-2.5 text-sm font-bold text-white shadow-sm transition ${
            !isAvailable
              ? "cursor-not-allowed bg-gray-400"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99]"
          }`}
        >
          {!isAvailable
            ? lead?.displayStatus === "ACCEPTED" ||
              lead?.status === "Assigned" ||
              lead?.status === "Accepted"
              ? "ACCEPTED"
              : (lead?.bidCount || 0) >= 10
                ? "BID LIMIT REACHED (10/10)"
                : "NO LONGER AVAILABLE"
            : !isLoggedIn
              ? "Login to Bid"
              : !isSubscribed
                ? "Upgrade to Bid"
                : "Place Your Bid"}
        </button>
      </div>

      {/* Bid modal */}
      {openBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-5">
              <h2 className="text-xl font-bold">Place Your Bid</h2>
              <button
                type="button"
                onClick={() => setOpenBid(false)}
                className="text-2xl text-gray-500 hover:text-black"
                aria-label="Close bid form"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitBid} className="p-5">
              <label className="mb-2 block text-sm font-semibold">Bid Amount</label>
              <input
                type="number"
                min="1"
                required
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                placeholder="Enter your bid amount"
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
              />
              <label className="mb-2 mt-4 block text-sm font-semibold">Message</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-5 w-full rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600 disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Bid"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 2. MAIN LEADS COMPONENT (Pagination + Scroll Restoration)
// =========================================================================
const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("All");
  const [appliedFilters, setAppliedFilters] = useState({});
  const [activeLocationInput, setActiveLocationInput] = useState(null);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);

  // Pagination (login ke baad wapas aane par last page restore hota hai)
  const [currentPage, setCurrentPage] = useState(() => {
    return Number(sessionStorage.getItem("lastViewedLeadPage")) || 1;
  });

  const resultsRef = useRef(null);

  const getAllLeads = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      const res = await API.get("/booking/all", {
        params: {
          from: filters.from || undefined,
          to: filters.to || undefined,
          vehicleType: filters.vehicleType && filters.vehicleType !== "All" ? filters.vehicleType : undefined,
        },
        headers: { "X-API-KEY": "ashu@rodio" },
      });
      const data = res.data?.data || res.data?.bookings || res.data?.leads || [];
      setLeads(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch leads", error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllLeads();
  }, [getAllLeads]);

  // Back aane par usi card par screen settle karne ka logic
  useEffect(() => {
    if (!loading && leads.length > 0) {
      const lastLeadId = sessionStorage.getItem("lastViewedLeadId");

      if (lastLeadId) {
        const timer = setTimeout(() => {
          const element = document.getElementById(lastLeadId);
          if (element) {
            const yOffset = -90;
            const y =
              element.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
          }
          sessionStorage.removeItem("lastViewedLeadId");
          sessionStorage.removeItem("lastViewedLeadPage");
        }, 350);

        return () => clearTimeout(timer);
      }
    }
  }, [loading, leads]);

  const vehicleTypes = useMemo(() => {
    const list = leads.map((item) => item.vehicleType).filter(Boolean);
    return ["All", ...new Set(list)]
      .filter((vehicle) => vehicle === "All")
      .concat(
        [...new Set(list)].sort((a, b) =>
          String(a).localeCompare(String(b), "en", { sensitivity: "base" })
        )
      );
  }, [leads]);

  const filteredLeads = useMemo(() => leads, [leads]);

  useEffect(() => {
    const query = (activeLocationInput === "from" ? fromLocation :
      activeLocationInput === "to" ? toLocation : "").trim();
    if (!activeLocationInput || query.length < 2) {
      setLocationSuggestions([]);
      setLocationLoading(false);
      return undefined;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        setLocationLoading(true);
        const response = await API.get(
          `/location/search?query=${encodeURIComponent(query)}`,
          { headers: { "x-api-key": "ashu@rodio" } }
        );
        if (!cancelled) {
          const data = response?.data?.data;
          setLocationSuggestions(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        if (!cancelled) {
          setLocationSuggestions([]);
          console.error("LOCATION SUGGESTION ERROR:", error.response?.data || error.message);
        }
      } finally {
        if (!cancelled) setLocationLoading(false);
      }
    }, 300);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [activeLocationInput, fromLocation, toLocation]);

  const selectLocationSuggestion = (item) => {
    const name = item?.name || item?.city || item?.location || "";
    if (!name) return;
    if (activeLocationInput === "from") setFromLocation(name);
    if (activeLocationInput === "to") setToLocation(name);
    setLocationSuggestions([]);
    setActiveLocationInput(null);
  };

  const handleSearch = () => {
    setActiveLocationInput(null);
    setLocationSuggestions([]);
    const filters = { from: fromLocation.trim(), to: toLocation.trim(), vehicleType: vehicleFilter };
    setAppliedFilters(filters);
    setCurrentPage(1);
    getAllLeads(filters);
  };

  const resetFilters = () => {
    setActiveLocationInput(null);
    setLocationSuggestions([]);
    setFromLocation("");
    setToLocation("");
    setVehicleFilter("All");
    setAppliedFilters({});
    setCurrentPage(1);
    getAllLeads({});
  };

  // ---------- Pagination values ----------
  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedLeads = filteredLeads.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const scrollToResults = () => {
    window.setTimeout(() => {
      const el = resultsRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.pageYOffset - 20;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }, 100);
  };

  const goToPage = (page) => {
    const next = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(next);
    scrollToResults();
  };

  const handleVehicleChange = (e) => {
    setVehicleFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white">Transport Leads</h1>
              <p className="text-blue-100 mt-2">
                Browse available transport requirements
              </p>
            </div>
            <button
              onClick={() => getAllLeads(appliedFilters)}
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <FaSyncAlt className={loading ? "animate-spin" : ""} />
              Refresh new leads
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-3xl shadow-lg p-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {[
              { field: "from", value: fromLocation, setValue: setFromLocation, placeholder: "From city" },
              { field: "to", value: toLocation, setValue: setToLocation, placeholder: "To city" },
            ].map(({ field, value, setValue, placeholder }) => {
              const active = activeLocationInput === field;
              return (
                <div key={field} className="relative min-w-0">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" value={value}
                    onFocus={() => setActiveLocationInput(field)}
                    onChange={(e) => { setValue(e.target.value); setActiveLocationInput(field); }}
                    placeholder={placeholder} autoComplete="off"
                    className={`w-full min-h-[50px] rounded-xl border bg-white pl-11 pr-10 py-3 outline-none focus:ring-2 focus:ring-blue-600 ${active ? "border-blue-500" : "border-gray-200"}`} />
                  {!!value && <button type="button"
                    onClick={() => { setValue(""); setActiveLocationInput(field); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
                    aria-label={`Clear ${field} location`}>×</button>}
                  {active && (locationLoading || locationSuggestions.length > 0) && (
                    <div className="absolute left-0 right-0 top-[54px] z-50 max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
                      {locationLoading && locationSuggestions.length === 0
                        ? <div className="px-4 py-3 text-sm text-gray-500">Searching locations...</div>
                        : locationSuggestions.map((item, index) => (
                          <button type="button" key={`${item?._id || item?.name || item?.city || field}-${index}`}
                            onClick={() => selectLocationSuggestion(item)}
                            className="flex w-full items-center gap-3 border-b border-gray-100 px-4 py-3 text-left hover:bg-blue-50 last:border-b-0">
                            <FaMapMarkerAlt className="shrink-0 text-blue-700" />
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-semibold text-gray-800">{item?.name || item?.city || item?.location || "Unknown location"}</span>
                              {!!item?.state && <span className="block text-xs text-gray-500">{item.state}</span>}
                            </span>
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
            <select value={vehicleFilter} onChange={handleVehicleChange}
              className="w-full min-h-[50px] rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600">
              {vehicleTypes.map((vehicle) => <option key={vehicle} value={vehicle}>{vehicle}</option>)}
            </select>
            <div className="flex gap-3 lg:col-span-3">
              <button type="button" onClick={handleSearch} disabled={loading}
                className="flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60">
                <FaSearch /> Search Leads
              </button>
              <button type="button" onClick={resetFilters} disabled={loading}
                className="min-h-[46px] rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60">Reset</button>
            </div>
          </div>
        </div>
      </div>

      {/* Count */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Available Leads</h2>
          {!loading && filteredLeads.length > 0 && (
            <p className="text-xs sm:text-sm font-semibold text-gray-500">
              Showing{" "}
              <span className="text-gray-900">
                {(safePage - 1) * PAGE_SIZE + 1}–
                {Math.min(safePage * PAGE_SIZE, filteredLeads.length)}
              </span>{" "}
              of <span className="text-gray-900">{filteredLeads.length}</span>
            </p>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div ref={resultsRef} className="max-w-7xl mx-auto px-0 sm:px-4 py-5">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow animate-pulse"
              >
                <div className="h-10 bg-gray-200 rounded mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-24 bg-gray-200 rounded-xl"></div>
                  <div className="h-12 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg py-20 px-8 text-center">
            <div className="text-7xl mb-6">🚚</div>
            <h2 className="text-3xl font-bold text-gray-700">No Leads Found</h2>
            <p className="text-gray-500 mt-4">
              No transport leads match your search criteria.
            </p>
            <button
              onClick={resetFilters}
              className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4 items-stretch px-4 sm:px-0">
              {paginatedLeads.map((lead) => (
                <SingleLeadCard
                  key={lead._id}
                  lead={lead}
                  page={safePage}
                  onBidSuccess={getAllLeads}
                />
              ))}
            </div>

            {/* Pagination: Prev / Next */}
            {filteredLeads.length > PAGE_SIZE && (
              <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
                <button
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <FaChevronLeft size={12} />
                  Prev
                </button>

                <span className="text-sm font-semibold text-gray-600 whitespace-nowrap">
                  Page {safePage} of {totalPages}
                </span>

                <button
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                  <FaChevronRight size={12} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Leads;