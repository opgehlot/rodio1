import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Phone, Mail, Calendar, Eye, CheckCircle, XCircle, User } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../../api/api";

function BidList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check login status helper
  const checkUserLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const isLoggedIn = checkUserLoggedIn();

  useEffect(() => {
    getBids();
  }, []);

  const getBids = async () => {
    try {
      const res = await API.get(`/bids/booking/${id}`);
      setBids(res.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch bids");
    } finally {
      setLoading(false);
    }
  };

  const acceptBid = async (bidId) => {
    try {
      if (!isLoggedIn) {
        toast.error("Please login first to accept bids!");
        navigate("/login", { state: { from: location } });
        return;
      }

      const res = await API.put(`/bids/accept/${bidId}`);
      toast.success(res.data.message || "Bid accepted successfully");

      // Refresh bids
      const bidRes = await API.get(`/bids/booking/${id}`);
      setBids(bidRes.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Unable to accept bid");
    }
  };

  const acceptedBid = bids.find((item) => item.status === "Accepted");
  const displayBids = acceptedBid ? [acceptedBid] : bids;

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center font-bold text-slate-500 uppercase tracking-widest text-xs">
        Loading Bids...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-4">
        <h2 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
          Transporter Bids
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition active:scale-95"
        >
          Back
        </button>
      </div>

      {bids.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 text-center">
          <div className="text-5xl mb-4">🚚</div>
          <h3 className="text-lg font-black text-slate-800 uppercase">
            No Bids Yet
          </h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
            Waiting for transporters to place bids.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {displayBids.map((bid) => {
            // bid.transporter backend se populated object hai
            const transporterObj = bid.transporter || {};
            
            // Dynamic data extraction from actual database object
            const transporterId = transporterObj._id || transporterObj.id;
            const firmName = transporterObj.firmName || transporterObj.name || "Transport Firm";
            const ownerName = transporterObj.ownerName || transporterObj.contactPerson || transporterObj.name || "Owner";
            const mobile = transporterObj.mobile || transporterObj.phoneNumber || "N/A";
            const email = transporterObj.email || "N/A";
            const rating = transporterObj.averageRating || transporterObj.rating || "0.0";

            return (
              <div
                key={bid._id}
                className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between"
              >
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#2263F1] via-[#395DEF] to-[#4758EE] p-5 text-white">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-black text-lg backdrop-blur-md uppercase">
                        {firmName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-black uppercase tracking-tight truncate max-w-[180px]">
                          {firmName}
                        </h3>
                        <p className="text-blue-100 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                          <User size={12} /> {ownerName}
                        </p>
                        <p className="text-blue-200 text-[10px] font-bold tracking-wider mt-0.5">
                          ★ {rating} Rating
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-200 bg-emerald-600/30 border border-emerald-400/30 px-2 py-0.5 rounded-md">
                        Verified
                      </span>
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                          bid.status === "Accepted"
                            ? "bg-emerald-500 text-white"
                            : bid.status === "Rejected"
                            ? "bg-red-500 text-white"
                            : "bg-amber-400 text-slate-900"
                        }`}
                      >
                        {bid.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body Details Section */}
                <div className="p-5 space-y-4 flex-1 text-xs">
                  <div className="space-y-1.5 pb-3 border-b border-slate-100">
                    <p className="font-bold text-slate-600 flex items-center gap-2">
                      <Mail size={14} className="text-blue-600" /> {email}
                    </p>
                    <p className="font-bold text-slate-600 flex items-center gap-2">
                      <Phone size={14} className="text-emerald-600" /> {mobile}
                    </p>
                  </div>

                  {/* Remarks / Message Box */}
                  <div className="space-y-1">
                    <span className="font-black uppercase tracking-widest text-[10px] text-slate-400">
                      Remark / Message
                    </span>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 text-slate-700 font-medium">
                      {bid.message || "No Message Provided"}
                    </div>
                  </div>

                  {/* Bid Amount Box */}
                  <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between">
                    <span className="font-black uppercase tracking-widest text-[10px] text-emerald-800">
                      Bid Amount
                    </span>
                    <span className="text-xl font-black text-emerald-600 tracking-tight">
                      ₹ {bid.amount}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 pt-1">
                    <Calendar size={13} /> Bid Date: {new Date(bid.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-5 pt-0 space-y-3">
                  {bid.status === "Accepted" && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                      <p className="text-emerald-700 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5">
                        <CheckCircle size={16} /> Transporter Selected Successfully
                      </p>
                    </div>
                  )}

                  {bid.status === "Rejected" && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                      <p className="text-red-700 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5">
                        <XCircle size={16} /> Bid Rejected
                      </p>
                    </div>
                  )}

                  {/* Bottom Action Grid: View Profile & Accept */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    {/* View Profile Button */}
                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          navigate("/login", { state: { from: location } });
                          return;
                        }

                        if (transporterId) {
                          navigate(`/dashboard/transporters/${transporterId}`);
                        } else {
                          console.error("Transporter ID missing for bid:", bid);
                          toast.error("Transporter profile ID not found");
                        }
                      }}
                      className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/20 active:scale-95"
                    >
                      <Eye size={14} />
                      <span>View Profile</span>
                    </button>

                    {/* Accept Button or Status Indicator */}
                    {bid.status === "Pending" ? (
                      <button
                        onClick={() => acceptBid(bid._id)}
                        className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-600/20 active:scale-95"
                      >
                        <span>Accept</span>
                      </button>
                    ) : (
                      <div
                        className={`py-2.5 px-4 rounded-xl text-center font-bold text-xs flex items-center justify-center ${
                          bid.status === "Accepted"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {bid.status}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BidList;