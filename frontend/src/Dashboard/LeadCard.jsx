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
import api from "../api/api"; //
import axios from "axios";
import toast from "react-hot-toast";
import React, { useState } from "react";

const LeadCard = ({ lead }) => {
 const [openBid, setOpenBid] = useState(false);
const [bidAmount, setBidAmount] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  const handleSubmitBid = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await api.post(
  `/bids/create/${lead._id}`,
  {
    amount: Number(bidAmount),
    message,
  }
  
);
console.log(response)
    toast.success("Your bid was successfully sent.");

    setBidAmount("");
    setMessage("");
    setOpenBid(false);
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to send bid."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FaTruck />
              {lead.vehicleType}
            </h2>

            <p className="text-blue-100 mt-2 text-sm">{lead.service}</p>
          </div>

          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm">
            #{lead._id.slice(-5)}
          </span>
        </div>
      </div>

      {/* Body */}

      <div className="p-5 space-y-4">
        {/* Route */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-600" />

            <div>
              <p className="text-xs text-gray-500">Pickup</p>

              <p className="font-semibold">{lead.pickupLocation}</p>
            </div>
          </div>

          <FaArrowRight className="text-blue-500" />

          <div className="text-right">
            <p className="text-xs text-gray-500">Destination</p>

            <p className="font-semibold">{lead.loading_point}</p>
          </div>
        </div>

        {/* Goods */}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-blue-600">
              <FaBoxOpen />

              <span className="text-sm">Goods</span>
            </div>

            <p className="font-semibold mt-2">{lead.goodsType}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center gap-2 text-orange-600">
              <FaWeightHanging />

              <span className="text-sm">Weight</span>
            </div>

            <p className="font-semibold mt-2">{lead.weight} ton</p>
          </div>
        </div>

        {/* Date */}

        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-indigo-600" />

          <div>
            <p className="text-xs text-gray-500">Pickup Date</p>

            <p className="font-medium">{formatDate(lead.pickupDate)}</p>
          </div>
        </div>

        {/* Contact */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <FaUser className="text-gray-600" />

            <div>
              <p className="text-xs text-gray-500">Contact Person</p>

              <p className="font-medium">{lead.contactPerson}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-green-600" />

            <div>
              <p className="text-xs text-gray-500">Contact Number</p>

              <p className="font-medium">{lead.contactNumber}</p>
            </div>
          </div>
        </div>

        {/* Budget */}

        <div className="bg-green-50 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Expected Budget</p>

            <h2 className="text-2xl font-bold text-green-700">
              ₹ {lead.expectedBudget}
            </h2>
          </div>

          <FaMoneyBillWave size={35} className="text-green-600" />
        </div>

        {/* Remarks */}

        {lead.remarks && (
          <div className="bg-yellow-50 rounded-xl p-3">
            <p className="text-sm font-semibold mb-1">Remarks</p>

            <p className="text-gray-600 text-sm">{lead.remarks}</p>
          </div>
        )}
      </div>

      {/* Footer */}

      <div className="border-t p-5 flex gap-3">
        <a
          href={`tel:${lead.contactNumber}`}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-center font-semibold transition"
        >
          📞 Call
        </a>

        <button
          onClick={() => setOpenBid(true)}
          className="flex-1 bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition"
        >
          ADD YOUR BID
        </button>
      </div>
      {openBid && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Place Your Bid
        </h2>

        <button
          onClick={() => setOpenBid(false)}
          className="text-2xl font-bold"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmitBid}>

 <input
  type="number"
  value={bidAmount}
  onChange={(e) => setBidAmount(e.target.value)}
  placeholder="Enter Bid Amount"
/>
  <textarea
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Message"
    className="w-full border rounded-lg p-3 mt-3"
  />

  <button
  type="submit"
  disabled={loading}
  className="w-full bg-orange-500 text-white py-3 rounded-xl"
>
  {loading ? "Sending..." : "Submit Bid"}
</button>

</form>

    </div>
  </div>
)}
    </div>
  );
};

export default LeadCard;
