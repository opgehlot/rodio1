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
import toast from "react-hot-toast";
import API from "../../../api/api";

const VEHICLE_OPTIONS = [
  "Pickup / Auto",
  "LCV",
  "HCV / Truck",
  "Container",
  "Trailer",
  "Crane / JCB",
  "Hydra",
  "Mining Vehicle",
];

function ShowEnquiry() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    _id: "",
    service: "",
    vehicleType: "",
    pickupLocation: "",
    loading_point: "",
    goodsType: "",
    weight: "",
    contactPerson: "",
    contactNumber: "",
    expectedBudget: "",
    pickupDate: "",
  });

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      setLoading(true);
      const res = await API.get("/booking/my-bookings");
      setBookings(res.data?.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch enquiries", {
        id: "fetch-enquiry-error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (booking) => {
    setEditFormData({
      _id: booking._id,
      service: booking.service || "",
      vehicleType: booking.vehicleType || "",
      pickupLocation: booking.pickupLocation || "",
      loading_point: booking.loading_point || "",
      goodsType: booking.goodsType || "",
      weight: booking.weight || "",
      contactPerson: booking.contactPerson || "",
      contactNumber: booking.contactNumber || "",
      expectedBudget: booking.expectedBudget || "",
      pickupDate: booking.pickupDate || "",
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "contactNumber") {
      setEditFormData({ ...editFormData, [name]: value.replace(/\D/g, "").slice(0, 10) });
    } else {
      setEditFormData({ ...editFormData, [name]: value });
    }
  };

  // Submit Edit API
  const handleUpdateLoad = async (e) => {
    e.preventDefault();

    if (editFormData.contactNumber && editFormData.contactNumber.length !== 10) {
      toast.error("Contact number must be exactly 10 digits", { id: "edit-phone-error" });
      return;
    }

    setEditLoading(true);
    try {
      const res = await API.patch(`/booking/${editFormData._id}`, editFormData);
      if (res.data?.success || res.status === 200) {
        toast.success("Enquiry updated successfully!", { id: "edit-enquiry-success" });
        setShowEditModal(false);
        getBookings();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update enquiry", {
        id: "edit-enquiry-error",
      });
    } finally {
      setEditLoading(false);
    }
  };

  // Delete API Call
  const handleDeleteLoad = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const res = await API.delete(`/booking/${id}`);
      if (res.data?.success || res.status === 200) {
        toast.success("Enquiry deleted successfully", { id: "delete-enquiry-success" });
        setBookings((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete enquiry", {
        id: "delete-enquiry-error",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h2 className="text-lg font-semibold text-slate-700">Loading Enquiries...</h2>
      </div>
    );
  }

  return (
    <div className="p-0 sm:p-6 min-h-[calc(100vh-2rem)] flex flex-col">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1 flex flex-col">
        {/* Header with Mobile Left-Aligned Add Load Button */}
        <div className="bg-slate-900 text-white p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold">My Enquiries</h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage and track your published load requests</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/dashboard/userform")}
            className="self-end sm:self-auto bg-green-700 hover:bg-orange-700 active:scale-95 text-white px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>+</span> Add Load
          </button>
        </div>

        {/* Scrollable Responsive Table View */}
        <div className="overflow-x-auto flex-1 w-full">
          <table className="w-full text-sm min-w-[1050px] border-collapse">
            <thead className="bg-slate-800 text-white text-xs uppercase tracking-wider sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left w-12">#</th>
                <th className="px-4 py-3 text-left">Service</th>
                <th className="px-4 py-3 text-left">Vehicle</th>
                <th className="px-4 py-3 text-left">Pickup</th>
                <th className="px-4 py-3 text-left">Destination</th>
                <th className="px-4 py-3 text-left">Goods</th>
                <th className="px-4 py-3 text-left">Weight</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Budget</th>
                <th className="px-4 py-3 text-left">Pickup Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr key={booking._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3.5 text-slate-500 font-semibold">{index + 1}</td>
                    <td className="px-4 py-3.5 font-medium text-slate-900 whitespace-nowrap">{booking.service || "-"}</td>
                    <td className="px-4 py-3.5 font-medium text-slate-800 whitespace-nowrap">{booking.vehicleType || "-"}</td>
                    <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">{booking.pickupLocation || "-"}</td>
                    <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">{booking.loading_point || "-"}</td>
                    <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">{booking.goodsType || "-"}</td>
                    <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">{booking.weight || "-"}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <p className="font-semibold text-slate-900 leading-tight">{booking.contactPerson || "-"}</p>
                      <p className="text-xs text-slate-500">{booking.contactNumber || "-"}</p>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-emerald-600 whitespace-nowrap">
                      ₹ {booking.expectedBudget || "0"}
                    </td>
                    <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">{booking.pickupDate || "-"}</td>
                    <td className="px-4 py-3.5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => navigate(`/dashboard/bid-list/${booking._id}`)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer"
                        >
                          Bids
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(booking)}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLoad(booking._id)}
                          className="bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200 px-2.5 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer"
                          title="Delete load enquiry"
                        >
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center py-16 text-slate-400 text-sm">
                    No load enquiries found. Click "+ Add Load" to create one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= EDIT LOAD MODAL ================= */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="text-base font-bold text-slate-800">Edit Load Enquiry</h3>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateLoad} className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[65vh] overflow-y-auto pr-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Service Type</label>
                  <input
                    type="text"
                    name="service"
                    value={editFormData.service}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:border-blue-600"
                    placeholder="e.g. Full Truck Load"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Vehicle Type</label>
                  <select
                    name="vehicleType"
                    value={editFormData.vehicleType}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="">Select Vehicle Classification</option>
                    {VEHICLE_OPTIONS.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pickup Location</label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={editFormData.pickupLocation}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Destination Location</label>
                  <input
                    type="text"
                    name="loading_point"
                    value={editFormData.loading_point}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Goods Type</label>
                  <input
                    type="text"
                    name="goodsType"
                    value={editFormData.goodsType}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Weight</label>
                  <input
                    type="text"
                    name="weight"
                    value={editFormData.weight}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:border-blue-600"
                    placeholder="e.g. 15 Tons"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={editFormData.contactPerson}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Number (10 Digits)</label>
                  <input
                    type="text"
                    name="contactNumber"
                    maxLength="10"
                    value={editFormData.contactNumber}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Expected Budget (₹)</label>
                  <input
                    type="number"
                    name="expectedBudget"
                    value={editFormData.expectedBudget}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pickup Date</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={editFormData.pickupDate}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  disabled={editLoading}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-2 rounded-lg text-sm font-semibold transition shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {editLoading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowEnquiry;