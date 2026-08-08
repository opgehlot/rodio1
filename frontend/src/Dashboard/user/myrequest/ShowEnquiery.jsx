// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../../api/api";

// function ShowEnquiry() {
//   const navigate = useNavigate();

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getBookings();
//   }, []);

//   const getBookings = async () => {
//     try {
//       const res = await API.get("/booking/my-bookings");
//       setBookings(res.data.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-60">
//         <h2 className="text-lg font-semibold">Loading...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">

//       <div className="bg-white rounded-xl shadow overflow-hidden">

//         <div className="bg-slate-900 text-white px-6 py-4">
//           <h2 className="text-xl font-bold">My Enquiries</h2>
//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead className="bg-slate-900 text-white">

//               <tr>

//                 <th className="px-4 py-3 text-left">#</th>

//                 <th className="px-4 py-3 text-left">Service</th>

//                 <th className="px-4 py-3 text-left">Vehicle</th>

//                 <th className="px-4 py-3 text-left">Pickup</th>

//                 <th className="px-4 py-3 text-left">Destination</th>

//                 <th className="px-4 py-3 text-left">Goods</th>

//                 <th className="px-4 py-3 text-left">Weight</th>

//                 <th className="px-4 py-3 text-left">Contact</th>

//                 <th className="px-4 py-3 text-left">Budget</th>

//                 <th className="px-4 py-3 text-left">Pickup Date</th>

//                 <th className="px-4 py-3 text-center">Action</th>

//               </tr>

//             </thead>

//             <tbody>

//               {bookings.length > 0 ? (

//                 bookings.map((booking, index) => (

//                   <tr
//                     key={booking._id}
//                     className="border-b hover:bg-gray-50"
//                   >

//                     <td className="px-4 py-4">{index + 1}</td>

//                     <td className="px-4 py-4">
//                       {booking.service}
//                     </td>

//                     <td className="px-4 py-4 font-medium">
//                       {booking.vehicleType}
//                     </td>

//                     <td className="px-4 py-4">
//                       {booking.pickupLocation}
//                     </td>

//                     <td className="px-4 py-4">
//                       {booking.loading_point}
//                     </td>

//                     <td className="px-4 py-4">
//                       {booking.goodsType}
//                     </td>

//                     <td className="px-4 py-4">
//                       {booking.weight} 
//                     </td>

//                     <td className="px-4 py-4">
//                       <p className="font-medium">
//                         {booking.contactPerson}
//                       </p>

//                       <p className="text-sm text-gray-500">
//                         {booking.contactNumber}
//                       </p>
//                     </td>

//                     <td className="px-4 py-4 font-semibold text-green-600">
//                       ₹ {booking.expectedBudget}
//                     </td>

//                     <td className="px-4 py-4">
//                       {booking.pickupDate}
//                     </td>

//                     <td className="px-4 py-4 text-center">

//                       <button
//                         onClick={() =>
//                          navigate(`/dashboard/bid-list/${booking._id}`)
//                         }
//                         className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
//                       >
//                         View Bids
//                       </button>

//                     </td>

//                   </tr>

//                 ))

//               ) : (

//                 <tr>

//                   <td
//                     colSpan="11"
//                     className="text-center py-10 text-gray-500"
//                   >
//                     No Enquiries Found
//                   </td>

//                 </tr>

//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default ShowEnquiry;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/api";
import toast from "react-hot-toast";
import {
  Search,
  Truck,
  Package,
  MapPin,
  CalendarDays,
  User,
  Pencil,
  Trash2,
  ArrowRight,
  ChevronRight,
  ClipboardList,
  IndianRupee,
  X,
  AlertTriangle,
} from "lucide-react";

function ShowEnquiry() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Delete confirmation modal
  const [deleteBooking, setDeleteBooking] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getBookings();
  }, []);

  // =========================================================
  // GET MY ENQUIRIES
  // =========================================================

  const getBookings = async () => {
    try {
      setLoading(true);

      const res = await API.get("/booking/my-bookings");

      setBookings(res.data.data || []);
    } catch (error) {
      console.log("Error fetching enquiries:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to load your enquiries."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // EDIT ENQUIRY
  // =========================================================

  const handleEdit = (booking) => {
    navigate(`/dashboard/edit-enquiry/${booking._id}`);
  };

  // =========================================================
  // OPEN DELETE CONFIRMATION
  // =========================================================

  const handleDeleteClick = (booking) => {
    setDeleteBooking(booking);
  };

  // =========================================================
  // DELETE ENQUIRY
  // =========================================================

  const confirmDelete = async () => {
    if (!deleteBooking?._id) return;

    try {
      setDeleting(true);

      await API.delete(`/booking/${deleteBooking._id}`);

      // Remove deleted enquiry immediately from UI
      setBookings((prev) =>
        prev.filter(
          (booking) => booking._id !== deleteBooking._id
        )
      );

      toast.success("Enquiry deleted successfully.");

      setDeleteBooking(null);
    } catch (error) {
      console.log("Delete enquiry error:", error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete enquiry. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredBookings = bookings.filter((booking) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      booking.service?.toLowerCase().includes(query) ||
      booking.vehicleType?.toLowerCase().includes(query) ||
      booking.pickupLocation?.toLowerCase().includes(query) ||
      booking.loading_point?.toLowerCase().includes(query) ||
      booking.goodsType?.toLowerCase().includes(query) ||
      booking.contactPerson?.toLowerCase().includes(query)
    );
  });

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#f7f9fc] text-slate-900 font-sans">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="border-b border-slate-200 pb-6">
            <div className="h-3 w-32 bg-slate-200 rounded animate-pulse" />

            <div className="h-9 w-52 bg-slate-200 rounded mt-4 animate-pulse" />

            <div className="h-4 w-72 bg-slate-100 rounded mt-3 animate-pulse" />
          </div>

          <div className="mt-6 space-y-1">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="border-b border-slate-200 py-6 animate-pulse"
              >
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="h-5 w-56 bg-slate-200 rounded" />
                  <div className="h-5 w-40 bg-slate-100 rounded" />
                  <div className="h-5 w-32 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f7f9fc] text-slate-900 font-sans">

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="border-b border-slate-200 pb-6">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            <div>

              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                RODIO TRADELINK
              </p>

              <h1 className="mt-2 text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-slate-950">
                My Enquiries
              </h1>

              <p className="mt-2 text-sm sm:text-[15px] text-slate-500">
                Manage your transport enquiries and track incoming bids.
              </p>

            </div>

            <div className="flex items-center gap-3 text-sm">

              <span className="text-slate-500">
                Total Enquiries
              </span>

              <span className="font-bold text-slate-950">
                {bookings.length}
              </span>

            </div>

          </div>

        </header>

        {/* =====================================================
            SEARCH
        ====================================================== */}

        <div className="py-5 sm:py-6 border-b border-slate-200">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div className="relative w-full sm:max-w-sm">

              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search enquiries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
              />

            </div>

            <div className="text-xs text-slate-500">

              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredBookings.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {bookings.length}
              </span>

            </div>

          </div>

        </div>

        {/* =====================================================
            DESKTOP TABLE HEADER
        ====================================================== */}

        <div className="hidden xl:grid grid-cols-[45px_minmax(120px,0.8fr)_minmax(140px,1fr)_minmax(180px,1.3fr)_minmax(180px,1.3fr)_minmax(140px,1fr)_90px_140px_120px_190px] gap-5 px-3 py-4 border-b border-slate-200 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">

          <span>#</span>
          <span>Service</span>
          <span>Vehicle</span>
          <span>Pickup</span>
          <span>Destination</span>
          <span>Goods</span>
          <span>Weight</span>
          <span>Budget</span>
          <span>Date</span>
          <span>Actions</span>

        </div>

        {/* =====================================================
            NO RESULTS
        ====================================================== */}

        {filteredBookings.length === 0 ? (

          <div className="min-h-[45vh] flex items-center justify-center">

            <div className="text-center max-w-md">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">

                <ClipboardList
                  size={30}
                  strokeWidth={1.8}
                />

              </div>

              <h2 className="mt-5 text-xl sm:text-2xl font-bold text-slate-950">
                No Enquiries Found
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {search
                  ? "No enquiry matches your search."
                  : "You have not created any transport enquiries yet."}
              </p>

            </div>

          </div>

        ) : (

          /* =====================================================
             ENQUIRY LIST
          ====================================================== */

          <div>

            {filteredBookings.map((booking, index) => (

              <div
                key={booking._id}
                className="group border-b border-slate-200 hover:bg-white/80 transition-colors duration-200"
              >

                {/* =================================================
                    DESKTOP
                ================================================== */}

                <div className="hidden xl:grid grid-cols-[45px_minmax(120px,0.8fr)_minmax(140px,1fr)_minmax(180px,1.3fr)_minmax(180px,1.3fr)_minmax(140px,1fr)_90px_140px_120px_190px] gap-5 items-center px-3 py-6">

                  {/* # */}

                  <div className="text-xs font-semibold text-slate-400">
                    {index + 1}
                  </div>

                  {/* Service */}

                  <div className="min-w-0">

                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {booking.service || "Transport"}
                    </p>

                  </div>

                  {/* Vehicle */}

                  <div className="flex items-center gap-2 min-w-0">

                    <Truck
                      size={16}
                      className="text-blue-600 shrink-0"
                    />

                    <span className="text-sm font-medium text-slate-700 truncate">
                      {booking.vehicleType || "N/A"}
                    </span>

                  </div>

                  {/* Pickup */}

                  <div className="min-w-0">

                    <div className="flex items-start gap-2">

                      <MapPin
                        size={15}
                        className="text-blue-600 shrink-0 mt-0.5"
                      />

                      <span
                        title={booking.pickupLocation}
                        className="text-sm text-slate-700 truncate"
                      >
                        {booking.pickupLocation || "Not specified"}
                      </span>

                    </div>

                  </div>

                  {/* Destination */}

                  <div className="min-w-0">

                    <div className="flex items-start gap-2">

                      <ArrowRight
                        size={15}
                        className="text-slate-400 shrink-0 mt-0.5"
                      />

                      <span
                        title={booking.loading_point}
                        className="text-sm text-slate-700 truncate"
                      >
                        {booking.loading_point || "Not specified"}
                      </span>

                    </div>

                  </div>

                  {/* Goods */}

                  <div className="flex items-center gap-2 min-w-0">

                    <Package
                      size={15}
                      className="text-blue-600 shrink-0"
                    />

                    <span className="text-sm text-slate-700 truncate">
                      {booking.goodsType || "Standard"}
                    </span>

                  </div>

                  {/* Weight */}

                  <div className="text-sm text-slate-700">
                    {booking.weight || "N/A"}
                  </div>

                  {/* Budget */}

                  <div>

                    <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                      Budget
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-950">
                      ₹{" "}
                      {booking.expectedBudget
                        ? Number(
                            booking.expectedBudget
                          ).toLocaleString("en-IN")
                        : "0"}
                    </p>

                  </div>

                  {/* Date */}

                  <div className="flex items-center gap-2">

                    <CalendarDays
                      size={14}
                      className="text-slate-400"
                    />

                    <span className="text-xs text-slate-600">
                      {booking.pickupDate || "N/A"}
                    </span>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex items-center gap-1.5">

                    {/* VIEW BIDS */}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/dashboard/bid-list/${booking._id}`
                        )
                      }
                      title="View Bids"
                      className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                    >
                      View Bids
                      <ChevronRight size={14} />
                    </button>

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() => handleEdit(booking)}
                      title="Edit Enquiry"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors"
                    >
                      <Pencil size={15} />
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteClick(booking)
                      }
                      title="Delete Enquiry"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>

                </div>

                {/* =================================================
                    MOBILE / TABLET
                ================================================== */}

                <div className="xl:hidden p-4 sm:p-5">

                  {/* TOP */}

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-blue-600">
                        Enquiry #{index + 1}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-950 truncate">
                        {booking.service || "Transport Service"}
                      </h3>

                    </div>

                    <div className="text-right shrink-0">

                      <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                        Budget
                      </p>

                      <p className="mt-1 text-base font-bold text-slate-950">
                        ₹{" "}
                        {booking.expectedBudget
                          ? Number(
                              booking.expectedBudget
                            ).toLocaleString("en-IN")
                          : "0"}
                      </p>

                    </div>

                  </div>

                  {/* ROUTE */}

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div className="flex items-start gap-3">

                      <MapPin
                        size={17}
                        className="text-blue-600 shrink-0 mt-0.5"
                      />

                      <div className="min-w-0">

                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                          Pickup
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800 break-words">
                          {booking.pickupLocation ||
                            "Not specified"}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-start gap-3">

                      <ArrowRight
                        size={17}
                        className="text-slate-400 shrink-0 mt-0.5"
                      />

                      <div className="min-w-0">

                        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                          Destination
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800 break-words">
                          {booking.loading_point ||
                            "Not specified"}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* DETAILS */}

                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-4 border-t border-slate-100 pt-5">

                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        Vehicle
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-800">
                        {booking.vehicleType || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        Goods
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-800">
                        {booking.goodsType || "Standard"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        Weight
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-800">
                        {booking.weight || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        Pickup Date
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-800">
                        {booking.pickupDate || "N/A"}
                      </p>
                    </div>

                  </div>

                  {/* CONTACT */}

                  <div className="mt-5 border-t border-slate-100 pt-5 flex items-start gap-3">

                    <User
                      size={17}
                      className="text-blue-600 mt-0.5 shrink-0"
                    />

                    <div>

                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                        Contact
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {booking.contactPerson || "N/A"}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {booking.contactNumber || "N/A"}
                      </p>

                    </div>

                  </div>

                  {/* MOBILE ACTIONS */}

                  <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2">

                    {/* VIEW BIDS */}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/dashboard/bid-list/${booking._id}`
                        )
                      }
                      className="flex-1 min-w-[130px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
                    >
                      View Bids
                      <ChevronRight size={16} />
                    </button>

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() => handleEdit(booking)}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors text-sm font-semibold"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteClick(booking)
                      }
                      className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                      title="Delete Enquiry"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ====================================================== */}

      {deleteBooking && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => {
            if (!deleting) {
              setDeleteBooking(null);
            }
          }}
        >

          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close */}

            <div className="flex items-start justify-between">

              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>

              <button
                type="button"
                disabled={deleting}
                onClick={() =>
                  setDeleteBooking(null)
                }
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-50"
              >
                <X size={19} />
              </button>

            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-950">
              Delete this enquiry?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This action will permanently remove this enquiry.
              Any associated information may no longer be available.
            </p>

            {/* Enquiry preview */}

            <div className="mt-5 py-4 border-y border-slate-100">

              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Enquiry
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {deleteBooking.service || "Transport Service"}
              </p>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">

                <span className="truncate">
                  {deleteBooking.pickupLocation ||
                    "Pickup"}
                </span>

                <ArrowRight size={14} />

                <span className="truncate">
                  {deleteBooking.loading_point ||
                    "Destination"}
                </span>

              </div>

            </div>

            {/* Buttons */}

            <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">

              <button
                type="button"
                disabled={deleting}
                onClick={() =>
                  setDeleteBooking(null)
                }
                className="px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
              >

                {deleting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={15} />
                    Delete Enquiry
                  </>
                )}

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ShowEnquiry;