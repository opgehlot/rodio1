import {
  FaTruck,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaWeightHanging,
  FaPhoneAlt,
  FaUser,
  FaMoneyBillWave,
  FaBoxOpen,
  FaArrowRight,
} from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/api";

const LeadCard = ({ lead }) => {
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

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const maskPhone = (phone) => {
    if (!phone) return "XXXXXXXXXX";
    const phoneStr = String(phone);
    if (phoneStr.length < 4) return "XXXXXXXXXX";
    return (
      phoneStr.substring(0, 2) + "XXXXXX" + phoneStr.substring(phoneStr.length - 2)
    );
  };

  const handleProtectedAction = (type) => {
    if (!isLoggedIn) {
      toast.error("Please login first.");
      navigate("/login", {
        state: { redirectTo: "/dashboard/leads" },
      });
      return;
    }

    if (!isSubscribed) {
      toast.error("Premium subscription required.");
      navigate("/dashboard/addservices");
      return;
    }

    if (type === "bid") {
      setOpenBid(true);
    }

    if (type === "call") {
      window.location.href = `tel:${lead?.contactNumber}`;
    }
  };

  const handleSubmitBid = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/bids/create/${lead._id}`, {
        amount: Number(bidAmount),
        message,
      });

      toast.success("Bid submitted successfully.");
      setBidAmount("");
      setMessage("");
      setOpenBid(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit bid."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <FaTruck />
              {lead?.vehicleType || "Transport Lead"}
            </h2>
            <p className="text-blue-100 mt-2 text-sm">
              {lead?.service || "Standard Delivery"}
            </p>
          </div>
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
            #{lead?._id ? lead._id.slice(-5) : "-----"}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-5">
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
            <p className="font-semibold">{lead?.loading_point || "N/A"}</p>
          </div>
        </div>

        {/* Goods */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-blue-600 text-sm">
              <FaBoxOpen />
              <span>Goods</span>
            </div>
            <p className="font-semibold mt-2">{lead?.goodsType || "N/A"}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-orange-600 text-sm">
              <FaWeightHanging />
              <span>Weight</span>
            </div>
            <p className="font-semibold mt-2">{lead?.weight || 0} Ton</p>
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

        {/* Contact */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <FaUser className="text-gray-600" />
            <div>
              <p className="text-xs text-gray-500">Contact Person</p>
              <p className="font-medium">
                {isSubscribed ? lead?.contactPerson || "N/A" : "XXXXXXXX"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Contact Number</p>
              <p className="font-medium">
                {isSubscribed
                  ? lead?.contactNumber || "N/A"
                  : maskPhone(lead?.contactNumber)}
              </p>
            </div>
          </div>
        </div>

        {/* Budget */}
        <div className="bg-green-50 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Expected Budget</p>
            <h2 className="text-2xl font-bold text-green-700">
              ₹ {lead?.expectedBudget || 0}
            </h2>
          </div>
          <FaMoneyBillWave size={35} className="text-green-600" />
        </div>

        {!isSubscribed && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-yellow-700">
              🔒 Contact details & bidding options are restricted to active subscribers.
            </p>
          </div>
        )}

        {/* Remarks */}
        {lead?.remarks && (
          <div className="bg-yellow-50 rounded-xl p-3">
            <p className="text-sm font-semibold mb-1">Remarks</p>
            <p className="text-gray-600 text-sm">{lead.remarks}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t p-5 flex gap-3">
        <button
          onClick={() => handleProtectedAction("call")}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition text-sm"
        >
          {isSubscribed ? "📞 Call Now" : "🔒 Unlock Contact"}
        </button>

        <button
          onClick={() => handleProtectedAction("bid")}
          className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition text-sm"
        >
          {!isLoggedIn
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
                className="text-3xl text-gray-500 hover:text-black"
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
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl mt-6 font-bold transition disabled:opacity-60"
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

export default LeadCard;