import React, { useState, useEffect, useMemo, useCallback } from "react";
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
} from "react-icons/fa";

// =========================================================================
// 1. SINGLE LEAD CARD (Original Theme & Exact Styling)
// =========================================================================
const SingleLeadCard = ({ lead, onBidSuccess }) => {
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

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleProtectedAction = (type) => {
    if (!isLoggedIn) {
      toast.error("Please login first.", { id: "login first" });
      navigate("/register", {
        state: {
          redirectTo: "/dashboard/leads",
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
      navigate("/dashboard/addservices");
      return;
    }

    if (!isAvailable) {
      toast.error("This lead is closed or sold out.", { id: "lead closed" });
      return;
    }

    if (type === "bid") {
      setOpenBid(true);
    }
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
        id: "faild to submit bid",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`group rounded-2xl shadow-md transition duration-300 overflow-hidden border flex flex-col justify-between ${
        isAvailable
          ? "bg-white hover:shadow-2xl border-gray-100"
          : "bg-gray-100 opacity-75 grayscale-[20%] border-gray-200"
      }`}
    >
      {/* Header */}
      <div
        className={`p-5 text-white ${
          isAvailable
            ? "bg-gradient-to-r from-blue-700 to-indigo-700"
            : "bg-gradient-to-r from-gray-500 to-gray-600"
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-blue-200 font-semibold mr-2">
                  Required
                </span>
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              
              <FaTruck className="text-blue-200" />

              <span>
                

                {lead?.vehicleType || "Transport Lead"}
              </span>
            </h2>

            <p className="text-blue-100 mt-2 text-sm">
              {lead?.service || "Standard Delivery"}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            {/* <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
              #{lead?._id ? lead._id.slice(-5) : "-----"}
            </span> */}

            {/* Backend status badges */}
            {isAvailable ? (
              <span className="bg-green-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide whitespace-nowrap shrink-0">
  ACTIVE ({lead?.bidCount || 0}/10 BIDS)
</span>
            ) : (
              <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wide">
                {lead?.displayStatus === "ACCEPTED" ||
                lead?.status === "Assigned" ||
                lead?.status === "Accepted"
                  ? "ACCEPTED"
                  : lead?.displayStatus === "LIMIT_REACHED" ||
                      (lead?.bidCount || 0) >= 10
                    ? "LIMIT REACHED"
                    : lead?.availabilityReason || "INACTIVE"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-5 flex-1">
        {/* Route */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Pickup</p>
              <p className="font-semibold">{lead?.pickupLocation || "N/A"}</p>
            </div>
          </div>
          <FaArrowRight className="text-blue-600" />
          <div className="text-right">
            <p className="text-xs text-gray-500">Destination</p>
            <p className="font-semibold">
              {lead?.dropLocation || lead?.loading_point || "N/A"}
            </p>
          </div>
        </div>

        {/* Goods */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/60 rounded-xl p-3 border border-gray-100">
            <div className="flex items-center gap-2 text-blue-600 text-sm">
              <FaBoxOpen />
              <span>Goods</span>
            </div>
            <p className="font-semibold mt-2">{lead?.goodsType || "N/A"}</p>
          </div>
          <div className="bg-white/60 rounded-xl p-3 border border-gray-100">
            <div className="flex items-center gap-2 text-orange-600 text-sm">
              <FaWeightHanging />
              <span>Weight</span>
            </div>
            <p className="font-semibold mt-2">{lead?.weight || 0}</p>
          </div>
        </div>

        {/* Pickup Date */}
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-indigo-600" />
          <div>
            <p className="text-xs text-gray-500">Pickup Date</p>
            <p className="font-medium">{formatDate(lead?.pickupDate)}</p>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-green-50 rounded-2xl p-4 flex justify-between items-center border border-green-100">
          <div>
            <p className="text-sm text-gray-500">Expected Budget</p>
            <h2 className="text-2xl font-bold text-green-700">
              ₹ {lead?.expectedBudget || 0}
            </h2>
          </div>
          <FaMoneyBillWave size={35} className="text-green-600" />
        </div>

        {!isSubscribed && isAvailable && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-yellow-700">
              🔒 Bidding options are restricted to active subscribers.
            </p>
          </div>
        )}

        {/* Remarks */}
        {lead?.remarks && (
          <div className="bg-yellow-50/50 rounded-xl p-3 border border-yellow-100">
            <p className="text-sm font-semibold mb-1">Remarks</p>
            <p className="text-gray-600 text-sm">{lead.remarks}</p>
          </div>
        )}
      </div>

      {/* Footer - Full Width Bid Button */}
      <div className="border-t p-5 bg-white/40">
        <button
          onClick={() => handleProtectedAction("bid")}
          disabled={!isAvailable}
          className={`w-full py-3 rounded-xl font-semibold transition text-sm shadow-md cursor-pointer ${
            !isAvailable
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800 text-white active:scale-95"
          }`}
        >
          {!isAvailable
            ? lead?.displayStatus === "ACCEPTED" ||
              lead?.status === "Assigned" ||
              lead?.status === "Accepted"
              ? "ACCEPTED"
              : lead?.displayStatus === "LIMIT_REACHED" ||
                  (lead?.bidCount || 0) >= 10
                ? "BID LIMIT REACHED (10/10)"
                : "NO LONGER AVAILABLE"
            : !isLoggedIn
              ? "Login to Bid"
              : !isSubscribed
                ? "Upgrade to Bid"
                : "Add Your Bid"}
        </button>
      </div>

      {/* Bid Modal */}
      {openBid && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">Place Your Bid</h2>
              <button
                onClick={() => setOpenBid(false)}
                className="text-3xl text-gray-500 hover:text-black cursor-pointer"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitBid} className="p-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Bid Amount
                </label>
                <input
                  type="number"
                  required
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter your bid amount"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message..."
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl mt-6 font-bold transition disabled:opacity-60 cursor-pointer"
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
// 2. MAIN LEADS COMPONENT (Exact Original Theme + Max-W-7xl + Scrollbar)
// =========================================================================
const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("All");

  const getAllLeads = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/booking/all");
      setLeads(res.data?.data || []);
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

  const vehicleTypes = useMemo(() => {
    const list = leads.map((item) => item.vehicleType).filter(Boolean);
    return ["All", ...new Set(list)];
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        lead.pickupLocation?.toLowerCase().includes(keyword) ||
        lead.loading_point?.toLowerCase().includes(keyword) ||
        lead.dropLocation?.toLowerCase().includes(keyword) ||
        lead.goodsType?.toLowerCase().includes(keyword) ||
        lead.vehicleType?.toLowerCase().includes(keyword) ||
        lead.service?.toLowerCase().includes(keyword);

      const matchVehicle =
        vehicleFilter === "All" || lead.vehicleType === vehicleFilter;

      return matchSearch && matchVehicle;
    });
  }, [leads, search, vehicleFilter]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r  from-blue-700 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white">Transport Leads</h1>
              <p className="text-blue-100 mt-2">
                Browse available transport requirements
              </p>
            </div>
            <button
              onClick={getAllLeads}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="relative lg:col-span-2">
              <FaSearch className="absolute top-4 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Pickup, Destination, Goods..."
                className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <select
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none cursor-pointer"
              >
                {vehicleTypes.map((vehicle) => (
                  <option key={vehicle} value={vehicle}>
                    {vehicle}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Count */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Available Leads</h2>
          <div className="bg-blue-700 text-white px-5 py-2 rounded-full flex items-center gap-2 text-sm font-semibold">
            <FaTruckMoving />
            {filteredLeads.length} Leads
          </div>
        </div>
      </div>

      {/* Cards Grid with Internal Scrollbar */}
      <div className="max-w-7xl mx-auto px-0 sm:px-4 py-8">
        <div className="max-h-[750px] overflow-y-auto pr-2 rounded-3xl">
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
              <h2 className="text-3xl font-bold text-gray-700">
                No Leads Found
              </h2>
              <p className="text-gray-500 mt-4">
                No transport leads match your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setVehicleFilter("All");
                }}
                className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 pb-4">
              {filteredLeads.map((lead) => (
                <SingleLeadCard
                  key={lead._id}
                  lead={lead}
                  onBidSuccess={getAllLeads}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leads;
  