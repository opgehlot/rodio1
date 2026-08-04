import React, { useEffect, useState } from "react";
import API from "../../api/api";
import {
  Truck,
  Package,
  Scale,
  User,
  Phone,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  MapPin,
} from "lucide-react";

function AcceptedBid() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBids();
  }, []);

  const getMyBids = async () => {
    try {
      const res = await API.get("/bids/my-bids");
      setBids(res.data.data || []);
    } catch (error) {
      console.log("Error fetching bids:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-9 h-9 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Title Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            My Bids
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Track and manage your submitted load proposals
          </p>
        </div>
        <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200">
          Total Bids: {bids.length}
        </span>
      </div>

      {/* Empty State */}
      {bids.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center max-w-md mx-auto my-8">
          <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-orange-100">
            <Truck size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No Bids Found</h3>
          <p className="text-xs text-slate-500 mt-1">
            You haven't placed any bids on active load enquiries yet.
          </p>
        </div>
      ) : (
        /* Bids Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bids.map((bid) => {
            // Customer ki requested pickup and drop location extraction
            const pickupAddr =
              bid.booking?.pickupLocation ||
              bid.booking?.loadingPoint ||
              bid.booking?.fromAddress ||
              bid.booking?.from;

            const dropAddr =
              bid.booking?.dropLocation ||
              bid.booking?.unloadingPoint ||
              bid.booking?.loading_point || // add this
              bid.booking?.loadingPoint ||
              bid.booking?.toAddress ||
              bid.booking?.to;

            return (
              <div
                key={bid._id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Route & Status Badge */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-slate-900 font-extrabold text-base sm:text-lg">
                      <span>{bid.booking?.pickupLocation || "Source"}</span>

                      <ArrowRight size={16} />

                      <span>
                        {bid.booking?.loading_point ||
                          bid.booking?.loadingPoint ||
                          "Destination"}
                      </span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 flex items-center gap-1.5 ${
                        bid.status === "Accepted"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : bid.status === "Rejected"
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {bid.status === "Accepted" && <CheckCircle2 size={13} />}
                      {bid.status === "Rejected" && <XCircle size={13} />}
                      {bid.status === "Pending" && <Clock size={13} />}
                      {bid.status}
                    </span>
                  </div>

                  {/* Customer Requested Exact Pickup & Drop Location */}
                  <div className="my-3 p-3 bg-orange-50/50 rounded-xl border border-orange-100/80 space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin
                        size={15}
                        className="text-orange-600 mt-0.5 shrink-0"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-500 block text-[10px] uppercase">
                        (Pickup Location):
                        </span>
                        <span className="font-semibold text-slate-800">
                          {pickupAddr || "Not Specified"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 pt-1 border-t border-orange-100/60">
                      <MapPin
                        size={15}
                        className="text-emerald-600 mt-0.5 shrink-0"
                      />
                      <div className="text-xs">
                        <span className="font-bold text-slate-500 block text-[10px] uppercase">
                           (Unloading/Destination Location):
                        </span>
                        <span className="font-semibold text-slate-800">
                          {dropAddr || "Not Specified"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Goods Type & Load Details Section */}
                  <div className="grid grid-cols-2 gap-3 mb-4 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                    {/* Goods / Material Type */}
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-white rounded-lg text-orange-600 border border-slate-200/60 shadow-2xs">
                        <Package size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Goods Type
                        </span>
                        <span className="text-xs font-bold text-slate-800 capitalize truncate block">
                          {bid.booking?.goodsType ||
                            bid.booking?.materialType ||
                            "Standard Load"}
                        </span>
                      </div>
                    </div>

                    {/* Load Weight / Quantity */}
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-white rounded-lg text-orange-600 border border-slate-200/60 shadow-2xs">
                        <Scale size={16} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Total Load
                        </span>
                        <span className="text-xs font-bold text-slate-800 capitalize truncate block">
                          {bid.booking?.weight
                            ? `${bid.booking.weight||"N/A"} `
                            : bid.booking?.loadType || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bid Amount */}
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Your Offered Bid
                      </span>
                      <h2 className="text-2xl font-black text-emerald-600 mt-0.5">
                        ₹{" "}
                        {bid.amount
                          ? Number(bid.amount).toLocaleString("en-IN")
                          : "0"}
                      </h2>
                    </div>
                  </div>

                  {/* Message Box */}
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-0.5">
                      Note / Remarks:
                    </span>
                    <p className="text-xs text-slate-600 italic break-words">
                      "{bid.message || "No custom message provided."}"
                    </p>
                  </div>

                  {/* Customer Details */}
                  <div className="pt-3 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-400" />
                      <span className="font-medium text-slate-500">
                        Customer:
                      </span>
                      <span className="font-bold text-slate-800">
                        {bid.booking?.contactPerson || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-slate-400" />
                      <span className="font-medium text-slate-500">
                        Mobile:
                      </span>
                      <span className="font-bold text-slate-800">
                        {bid.booking?.contactNumber || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Alert Footer */}
                <div className="mt-4 pt-2">
                  {bid.status === "Accepted" && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-emerald-600 shrink-0"
                      />
                      <p className="text-xs font-bold text-emerald-800">
                        Congratulations! Customer has accepted your bid
                        proposal.
                      </p>
                    </div>
                  )}

                  {bid.status === "Rejected" && (
                    <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center gap-2">
                      <XCircle size={16} className="text-rose-600 shrink-0" />
                      <p className="text-xs font-bold text-rose-800">
                        This bid proposal was declined by the customer.
                      </p>
                    </div>
                  )}

                  {bid.status === "Pending" && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
                      <Clock size={16} className="text-amber-600 shrink-0" />
                      <p className="text-xs font-bold text-amber-800">
                        Waiting for the customer to review your bid.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AcceptedBid;
