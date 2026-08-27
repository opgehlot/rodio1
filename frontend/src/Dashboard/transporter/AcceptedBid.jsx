import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../../api/api";
import { toast } from "react-hot-toast";
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
  Lock,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";

function AcceptedBid() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBid, setSelectedBid] = useState(null);

  // Edit & Delete States
  const [editingBid, setEditingBid] = useState(false);
  const [targetBid, setTargetBid] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteConfirmBidId, setDeleteConfirmBidId] = useState(null);

  useEffect(() => {
    getMyBids();
  }, []);

  const getMyBids = async () => {
    try {
      setLoading(true);
      const res = await API.get("/bids/my-bids");
      const list = res.data?.data || res.data?.bids || res.data || [];
      const formattedList = Array.isArray(list) ? list : [];
      setBids(formattedList);

      const bidIdFromUrl = searchParams.get("bidId");
      if (bidIdFromUrl) {
        const found = formattedList.find((b) => b._id === bidIdFromUrl);
        if (found) setSelectedBid(found);
      }
    } catch (error) {
      console.error("Error fetching bids:", error);
      toast.error("Failed to load your bids.");
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------------
      HISTORY / BACK NAVIGATION FIX
  -------------------------------- */
  const handleSelectBid = (bid) => {
    setSelectedBid(bid);
    setSearchParams({ bidId: bid._id });
  };

  const handleBackToList = useCallback(() => {
    setSelectedBid(null);
    setSearchParams({});
  }, [setSearchParams]);

  useEffect(() => {
    const handlePopState = () => {
      const currentBidId = new URLSearchParams(window.location.search).get("bidId");
      if (!currentBidId) {
        setSelectedBid(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  /* --------------------------------
      DATA EXTRACTORS (Exact Reference Logic)
  -------------------------------- */
  const getPickupLocation = (bid) => {
    const b = bid?.booking || bid?.load || bid || {};
    return (
      b.pickupLocation ||
      b.loadingPoint ||
      b.pickup_location ||
      b.fromAddress ||
      b.fromLocation ||
      b.fromCity ||
      b.from ||
      "Pickup Point"
    );
  };

  const getDestinationLocation = (bid) => {
    const b = bid?.booking || bid?.load || bid || {};
    return (
      b.dropLocation ||
      b.unloadingPoint ||
      b.loading_point ||
      b.drop_location ||
      b.toAddress ||
      b.toLocation ||
      b.toCity ||
      b.destination ||
      b.to ||
      "Destination Point"
    );
  };

  const getGoodsInfo = (bid) => {
    const b = bid?.booking || bid?.load || bid || {};
    return (
      b.goodsType ||
      b.materialType ||
      b.goods_type ||
      b.service ||
      "Standard Load"
    );
  };

  const getWeightInfo = (bid) => {
    const b = bid?.booking || bid?.load || bid || {};
    return b.weight ? `${b.weight}` : b.loadType || b.quantity || b.vehicleType || "N/A";
  };

  const getCustomerName = (bid) => {
    const b = bid?.booking || bid?.load || bid || {};
    return b.contactPerson || b.customerName || b.name || "Customer";
  };

  const getCustomerMobile = (bid) => {
    const b = bid?.booking || bid?.load || bid || {};
    return b.contactNumber || b.phone || b.mobile || "N/A";
  };

  /* --------------------------------
      EDIT & DELETE HANDLERS
  -------------------------------- */
  const openEditModal = (bid, e) => {
    if (e) e.stopPropagation();
    if (!bid || bid.status !== "Pending") return;
    setTargetBid(bid);
    setEditAmount(bid.amount ?? "");
    setEditMessage(bid.message ?? "");
    setEditingBid(true);
  };

  const closeEditModal = () => {
    setEditingBid(false);
    setTargetBid(null);
    setEditAmount("");
    setEditMessage("");
  };

  const handleUpdateBid = async () => {
    if (!targetBid?._id) return;
    if (!editAmount || Number(editAmount) <= 0) {
      toast.error("Please enter a valid bid amount.");
      return;
    }

    try {
      setActionLoading(true);
      const res = await API.put(`/bids/update/${targetBid._id}`, {
        amount: Number(editAmount),
        message: editMessage,
      });

      const updatedBid = res.data?.data || {
        ...targetBid,
        amount: Number(editAmount),
        message: editMessage,
      };

      setBids((prev) =>
        prev.map((item) => (item._id === targetBid._id ? updatedBid : item))
      );

      if (selectedBid?._id === targetBid._id) {
        setSelectedBid(updatedBid);
      }

      toast.success(res.data?.message || "Bid updated successfully.");
      closeEditModal();
    } catch (error) {
      console.error("Update Bid Error:", error);
      toast.error(error.response?.data?.message || "Unable to update bid.");
    } finally {
      setActionLoading(false);
    }
  };

  const openDeleteModal = (bidId, e) => {
    if (e) e.stopPropagation();
    setDeleteConfirmBidId(bidId);
  };

  const handleDeleteBid = async () => {
    if (!deleteConfirmBidId) return;

    try {
      setActionLoading(true);
      const res = await API.delete(`/bids/delete/${deleteConfirmBidId}`);

      setBids((prev) => prev.filter((item) => item._id !== deleteConfirmBidId));

      if (selectedBid?._id === deleteConfirmBidId) {
        handleBackToList();
      }

      toast.success(res.data?.message || "Bid deleted successfully.");
      setDeleteConfirmBidId(null);
    } catch (error) {
      console.error("Delete Bid Error:", error);
      toast.error(error.response?.data?.message || "Unable to delete bid.");
    } finally {
      setActionLoading(false);
    }
  };

  /* --------------------------------
      STATUS CONFIG
  -------------------------------- */
  const getStatusConfig = (status) => {
    switch (status) {
      case "Accepted":
        return {
          label: "Accepted",
          icon: CheckCircle2,
          color: "text-emerald-700",
          bg: "bg-emerald-50",
          border: "border-emerald-200",
        };
      case "Rejected":
        return {
          label: "Rejected",
          icon: XCircle,
          color: "text-red-700",
          bg: "bg-red-50",
          border: "border-red-200",
        };
      default:
        return {
          label: "Pending",
          icon: Clock,
          color: "text-amber-700",
          bg: "bg-amber-50",
          border: "border-amber-200",
        };
    }
  };

  const StatusBadge = ({ status }) => {
    const config = getStatusConfig(status);
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold tracking-wide ${config.bg} ${config.color} ${config.border}`}
      >
        <Icon size={13} strokeWidth={2.4} />
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] text-slate-900 font-sans">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <div className="h-8 w-40 bg-slate-200 rounded-md animate-pulse" />
            <div className="h-4 w-72 bg-slate-100 rounded-md mt-3 animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="border-b border-slate-200 py-6 animate-pulse">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  <div className="space-y-3">
                    <div className="h-5 w-72 bg-slate-200 rounded" />
                    <div className="h-4 w-48 bg-slate-100 rounded" />
                  </div>
                  <div className="h-8 w-24 bg-slate-200 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (bids.length === 0) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] text-slate-900 font-sans">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <header className="border-b border-slate-200 pb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
              RODIO TRADELINK
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
              My Bids
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Track and manage your submitted load proposals.
            </p>
          </header>
          <div className="min-h-[55vh] flex items-center justify-center">
            <div className="text-center max-w-md px-4">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Truck size={30} strokeWidth={1.8} />
              </div>
              <h2 className="mt-5 text-xl sm:text-2xl font-bold text-slate-900">
                No Bids Found
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                You haven't placed any bids on active load enquiries yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* EDIT MODAL */}
      {editingBid && targetBid?.status === "Pending" && (
        <div className="fixed inset-0 z-[10000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit Bid Proposal</h3>
                <p className="text-xs text-slate-500 mt-0.5">Update your offered rate and remarks</p>
              </div>
              <button
                type="button"
                onClick={closeEditModal}
                disabled={actionLoading}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center text-lg font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Bid Amount (₹)
                </label>
                <input
                  type="number"
                  min="1"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="w-full h-11 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white px-4 text-sm font-bold text-emerald-600 outline-none focus:border-blue-500 transition-all"
                  placeholder="Enter bid amount"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Message / Remarks
                </label>
                <textarea
                  rows={4}
                  value={editMessage}
                  onChange={(e) => setEditMessage(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white p-4 text-sm text-slate-800 outline-none focus:border-blue-500 resize-none transition-all"
                  placeholder="Add any specific note for customer..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={actionLoading}
                  className="flex-1 h-11 rounded-2xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateBid}
                  disabled={actionLoading}
                  className="flex-1 h-11 rounded-2xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {actionLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM MODAL */}
      {deleteConfirmBidId && (
        <div className="fixed inset-0 z-[10001] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-slate-900">Delete Bid?</h3>
            <p className="text-sm text-slate-500 mt-2">
              Are you sure you want to delete this bid proposal?
            </p>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setDeleteConfirmBidId(null)}
                disabled={actionLoading}
                className="flex-1 h-11 rounded-2xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteBid}
                disabled={actionLoading}
                className="flex-1 h-11 rounded-2xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                {actionLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen w-full bg-[#f7f9fc] text-slate-900 font-sans">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

          {/* PAGE HEADER */}
          <header className="border-b border-slate-200 pb-6 sm:pb-7">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
              <div>
                <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                  RODIO TRADELINK
                </p>
                <h1 className="mt-2 text-3xl sm:text-4xl lg:text-[42px] leading-tight font-bold tracking-tight text-slate-950">
                  {selectedBid ? "Bid Details" : "My Bids"}
                </h1>
                <p className="mt-2 max-w-2xl text-sm sm:text-[15px] leading-6 text-slate-500">
                  {selectedBid
                    ? "Review the complete details of your submitted load proposal."
                    : "Track and manage your submitted transport proposals."}
                </p>
              </div>

              {!selectedBid ? (
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-slate-500">Total Bids</span>
                  <span className="font-bold text-slate-950">{bids.length}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleBackToList}
                  className="inline-flex items-center justify-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/40 transition-colors shadow-sm cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  Back to My Bids
                </button>
              )}
            </div>
          </header>

          {/* =================================
              LIST VIEW
          ================================== */}
          {!selectedBid ? (
            <section className="mt-3">
              <div className="hidden lg:grid grid-cols-[minmax(340px,1.7fr)_minmax(170px,0.8fr)_150px_170px] gap-6 px-3 py-4 border-b border-slate-200 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                <span>Route (Pickup → Drop)</span>
                <span>Load</span>
                <span>Your Bid</span>
                <span className="text-right pr-4">Status & Actions</span>
              </div>

              <div>
                {bids.map((bid) => {
                  const pickup = getPickupLocation(bid);
                  const drop = getDestinationLocation(bid);
                  const goods = getGoodsInfo(bid);

                  return (
                    <div
                      key={bid._id}
                      onClick={() => handleSelectBid(bid)}
                      className="group w-full cursor-pointer text-left border-b border-slate-200 py-5 sm:py-6 px-2 sm:px-3 hover:bg-white/80 transition-colors duration-200"
                    >
                      {/* Desktop */}
                      <div className="hidden lg:grid grid-cols-[minmax(340px,1.7fr)_minmax(170px,0.8fr)_150px_170px] gap-6 items-center">
                        <div className="min-w-0">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="min-w-0 flex-1">
                              <p className="text-[15px] font-bold text-slate-950 truncate" title={pickup}>
                                {pickup}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">Pickup</p>
                            </div>

                            <div className="flex-1 max-w-16 h-px bg-slate-300 relative shrink-0">
                              <ArrowRight
                                size={15}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-600 bg-[#f7f9fc]"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="text-[15px] font-bold text-slate-950 truncate" title={drop}>
                                {drop}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">Destination</p>
                            </div>
                          </div>
                        </div>

                        {/* Load */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <Package size={15} className="text-blue-600 shrink-0" />
                            <span className="text-sm font-medium text-slate-700 truncate">
                              {goods}
                            </span>
                          </div>
                        </div>

                        {/* Offered Amount */}
                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                            Offered
                          </p>
                          <p className="mt-1 text-lg font-bold text-slate-950">
                            ₹ {bid.amount ? Number(bid.amount).toLocaleString("en-IN") : "0"}
                          </p>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex items-center justify-end gap-3">
                          <StatusBadge status={bid.status} />

                          {bid.status === "Pending" && (
                            <div
                              className="flex items-center gap-1.5"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={(e) => openEditModal(bid, e)}
                                className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={(e) => openDeleteModal(bid._id, e)}
                                className="px-2.5 py-1 rounded-md bg-red-50 text-red-600 text-[11px] font-bold hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </div>
                          )}

                          <ChevronRight
                            size={17}
                            className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all ml-1"
                          />
                        </div>
                      </div>

                      {/* Mobile */}
                      <div className="lg:hidden">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="inline-flex items-center gap-1 font-bold text-slate-950 text-sm">
                                <MapPin size={14} className="text-emerald-600 shrink-0" />
                                {pickup}
                              </span>
                              <ArrowRight size={13} className="text-slate-400 shrink-0" />
                              <span className="inline-flex items-center gap-1 font-bold text-slate-950 text-sm">
                                <MapPin size={14} className="text-rose-600 shrink-0" />
                                {drop}
                              </span>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                              <span className="inline-flex items-center gap-1.5">
                                <Package size={13} className="text-blue-600" />
                                {goods}
                              </span>

                              <span className="font-bold text-slate-900">
                                ₹ {bid.amount ? Number(bid.amount).toLocaleString("en-IN") : "0"}
                              </span>
                            </div>
                          </div>

                          <ChevronRight size={18} className="text-slate-300 shrink-0 mt-1" />
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <StatusBadge status={bid.status} />

                          <div className="flex items-center gap-2">
                            {bid.status === "Pending" && (
                              <div
                                className="flex items-center gap-1.5"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  type="button"
                                  onClick={(e) => openEditModal(bid, e)}
                                  className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => openDeleteModal(bid._id, e)}
                                  className="px-2.5 py-1 rounded-md bg-red-50 text-red-600 text-xs font-bold hover:bg-red-600 hover:text-white cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                            <span className="text-xs font-semibold text-blue-600">
                              View Details
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ) : (

            /* =================================
                DETAIL VIEW
            ================================== */
            <section className="mt-7 sm:mt-8">
              {/* Route Summary */}
              <div className="pb-7 border-b border-slate-200">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-blue-600">
                      Submitted Load Proposal
                    </p>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                          Pickup Location
                        </p>
                        <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 break-words">
                          {getPickupLocation(selectedBid)}
                        </h2>
                      </div>

                      <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 shrink-0">
                        <ArrowRight size={20} />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                          Unloading / Destination
                        </p>
                        <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 break-words">
                          {getDestinationLocation(selectedBid)}
                        </h2>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3">
                    <StatusBadge status={selectedBid.status} />

                    {selectedBid.status === "Pending" && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(selectedBid)}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 cursor-pointer"
                        >
                          Edit Bid
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(selectedBid._id)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-bold hover:bg-red-100 cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-0 xl:gap-14">
                <div>
                  {/* Locations Detail */}
                  <section className="py-7 sm:py-8 border-b border-slate-200">
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin size={18} className="text-blue-600" />
                      <h3 className="text-lg font-bold text-slate-950">
                        Customer Requested Locations
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative md:pr-8 md:border-r border-slate-200">
                        <div className="flex items-start gap-3">
                          <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                              Pickup Location
                            </p>
                            <p className="mt-2 text-sm sm:text-[15px] leading-6 font-semibold text-slate-800 break-words">
                              {getPickupLocation(selectedBid)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-start gap-3">
                          <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                              Unloading / Destination
                            </p>
                            <p className="mt-2 text-sm sm:text-[15px] leading-6 font-semibold text-slate-800 break-words">
                              {getDestinationLocation(selectedBid)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Load Information */}
                  <section className="py-7 sm:py-8 border-b border-slate-200">
                    <div className="flex items-center gap-3 mb-6">
                      <Package size={18} className="text-blue-600" />
                      <h3 className="text-lg font-bold text-slate-950">
                        Load Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="flex items-start gap-4">
                        <div className="text-blue-600 pt-0.5">
                          <Package size={21} strokeWidth={1.8} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                            Goods Type
                          </p>
                          <p className="mt-1.5 text-base font-semibold text-slate-900 capitalize">
                            {getGoodsInfo(selectedBid)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="text-blue-600 pt-0.5">
                          <Scale size={21} strokeWidth={1.8} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                            Total Load / Weight
                          </p>
                          <p className="mt-1.5 text-base font-semibold text-slate-900">
                            {getWeightInfo(selectedBid)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Remarks */}
                  <section className="py-7 sm:py-8 border-b border-slate-200">
                    <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                      Note / Remarks
                    </p>
                    <p className="mt-3 text-sm sm:text-[15px] leading-7 text-slate-600 break-words">
                      {selectedBid.message ? `"${selectedBid.message}"` : "No custom message provided."}
                    </p>
                  </section>

                  {/* Customer Information (Name & Mobile are blurred until Accepted) */}
                  <section className="py-7 sm:py-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-slate-950">
                          Customer Information
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          Contact details for this load enquiry.
                        </p>
                      </div>

                      {selectedBid.status !== "Accepted" && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                          <Lock size={13} />
                          Contact details unlock after acceptance
                        </span>
                      )}
                    </div>

                    <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-7">
                      <div className="flex items-start gap-3">
                        <User size={19} className="text-blue-600 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                            Customer Name
                          </p>
                          <p
                            className={`mt-1.5 font-semibold text-sm sm:text-[15px] break-words ${
                              selectedBid.status !== "Accepted"
                                ? "filter blur-[5px] select-none text-slate-400"
                                : "text-slate-900"
                            }`}
                          >
                            {getCustomerName(selectedBid)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone size={19} className="text-blue-600 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                            Mobile Number
                          </p>
                          <p
                            className={`mt-1.5 font-semibold text-sm sm:text-[15px] break-words ${
                              selectedBid.status !== "Accepted"
                                ? "filter blur-[5px] select-none text-slate-400"
                                : "text-slate-900"
                            }`}
                          >
                            {getCustomerMobile(selectedBid)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Right Summary Sidebar */}
                <aside className="xl:border-l xl:border-slate-200 xl:pl-10">
                  <div className="xl:sticky xl:top-6 py-7 xl:py-8">
                    <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-blue-600">
                      Your Proposal
                    </p>

                    <p className="mt-5 text-sm font-medium text-slate-500">
                      Your Offered Bid
                    </p>

                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-950">
                        ₹
                      </span>
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-950">
                        {selectedBid.amount ? Number(selectedBid.amount).toLocaleString("en-IN") : "0"}
                      </span>
                    </div>

                    <div className="mt-6 h-px bg-slate-200" />

                    <div className="py-6 border-b border-slate-200">
                      <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                        Proposal Status
                      </p>
                      <div className="mt-3">
                        <StatusBadge status={selectedBid.status} />
                      </div>
                    </div>

                    {selectedBid.status === "Accepted" && (
                      <div className="py-6">
                        <div className="flex items-start gap-3 text-emerald-700">
                          <CheckCircle2 size={19} className="shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold">Bid Accepted</p>
                            <p className="mt-1.5 text-xs leading-5 text-emerald-700/80">
                              Congratulations! Customer has accepted your bid proposal.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedBid.status === "Rejected" && (
                      <div className="py-6">
                        <div className="flex items-start gap-3 text-red-700">
                          <XCircle size={19} className="shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold">Bid Declined</p>
                            <p className="mt-1.5 text-xs leading-5 text-red-700/80">
                              This bid proposal was declined by the customer.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedBid.status === "Pending" && (
                      <div className="py-6">
                        <div className="flex items-start gap-3 text-amber-700">
                          <Clock size={19} className="shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold">Awaiting Customer</p>
                            <p className="mt-1.5 text-xs leading-5 text-amber-700/80">
                              Waiting for the customer to review your bid.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedBid.status !== "Accepted" && (
                      <div className="pt-5 border-t border-slate-200">
                        <div className="flex items-start gap-3">
                          <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
                          <p className="text-xs leading-5 text-slate-500">
                            Customer contact information is protected and becomes available after the bid is accepted.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </aside>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

export default AcceptedBid;