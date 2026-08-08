
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
  Lock,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

function AcceptedBid() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBid, setSelectedBid] = useState(null);

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
          dot: "bg-emerald-500",
        };

      case "Rejected":
        return {
          label: "Rejected",
          icon: XCircle,
          color: "text-red-700",
          bg: "bg-red-50",
          border: "border-red-200",
          dot: "bg-red-500",
        };

      default:
        return {
          label: "Pending",
          icon: Clock,
          color: "text-amber-700",
          bg: "bg-amber-50",
          border: "border-amber-200",
          dot: "bg-amber-500",
        };
    }
  };

  /* --------------------------------
     STATUS BADGE
  -------------------------------- */
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

  /* --------------------------------
     LOADING
  -------------------------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] text-slate-900 font-sans">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="border-b border-slate-200 pb-6 mb-8">
            <div className="h-8 w-40 bg-slate-200 rounded-md animate-pulse" />
            <div className="h-4 w-72 bg-slate-100 rounded-md mt-3 animate-pulse" />
          </div>

          <div className="space-y-1">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="border-b border-slate-200 py-6 animate-pulse"
              >
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

  /* --------------------------------
     EMPTY STATE
  -------------------------------- */
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

  /* --------------------------------
     MAIN
  -------------------------------- */
  return (
    <div className="min-h-screen w-full bg-[#f7f9fc] text-slate-900 font-sans">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* ================================
            PAGE HEADER
        ================================= */}
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
                <span className="font-bold text-slate-950">
                  {bids.length}
                </span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setSelectedBid(null)}
                className="inline-flex items-center justify-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700 hover:bg-blue-50/40 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to My Bids
              </button>
            )}
          </div>
        </header>

        {/* =================================
            BID LIST
        ================================== */}
        {!selectedBid ? (
          <section className="mt-3">

            {/* Table heading - desktop */}
            <div className="hidden lg:grid grid-cols-[minmax(320px,1.7fr)_minmax(170px,0.8fr)_150px_130px] gap-6 px-3 py-4 border-b border-slate-200 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
              <span>Route</span>
              <span>Load</span>
              <span>Your Bid</span>
              <span>Status</span>
            </div>

            <div>
              {bids.map((bid) => {
                const pickupAddr =
                  bid.booking?.pickupLocation ||
                  bid.booking?.loadingPoint ||
                  bid.booking?.fromAddress ||
                  bid.booking?.from;

                const dropAddr =
                  bid.booking?.dropLocation ||
                  bid.booking?.unloadingPoint ||
                  bid.booking?.loading_point ||
                  bid.booking?.toAddress ||
                  bid.booking?.to;

                return (
                  <button
                    key={bid._id}
                    type="button"
                    onClick={() => setSelectedBid(bid)}
                    className="group w-full text-left border-b border-slate-200 py-5 sm:py-6 px-2 sm:px-3 hover:bg-white/80 transition-colors duration-200"
                  >
                    {/* Desktop */}
                    <div className="hidden lg:grid grid-cols-[minmax(320px,1.7fr)_minmax(170px,0.8fr)_150px_130px] gap-6 items-center">

                      {/* Route */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="min-w-0">
                            <p className="text-[15px] font-bold text-slate-950 truncate">
                              {pickupAddr || "Source"}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              Pickup
                            </p>
                          </div>

                          <div className="flex-1 max-w-16 h-px bg-slate-300 relative">
                            <ArrowRight
                              size={15}
                              className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-600 bg-[#f7f9fc]"
                            />
                          </div>

                          <div className="min-w-0">
                            <p className="text-[15px] font-bold text-slate-950 truncate">
                              {dropAddr || "Destination"}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              Destination
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Load */}
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <Package
                            size={15}
                            className="text-blue-600 shrink-0"
                          />

                          <span className="text-sm font-medium text-slate-700 truncate">
                            {bid.booking?.goodsType ||
                              bid.booking?.materialType ||
                              "Standard Load"}
                          </span>
                        </div>
                      </div>

                      {/* Amount */}
                      <div>
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">
                          Offered
                        </p>

                        <p className="mt-1 text-lg font-bold text-slate-950">
                          ₹{" "}
                          {bid.amount
                            ? Number(bid.amount).toLocaleString("en-IN")
                            : "0"}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="flex items-center justify-between gap-3">
                        <StatusBadge status={bid.status} />

                        <ChevronRight
                          size={17}
                          className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all"
                        />
                      </div>
                    </div>

                    {/* Mobile / Tablet */}
                    <div className="lg:hidden">

                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0 flex-1">

                          <div className="flex items-center gap-2">
                            <MapPin
                              size={15}
                              className="text-blue-600 shrink-0"
                            />

                            <span className="font-bold text-slate-950 truncate">
                              {pickupAddr || "Source"}
                            </span>

                            <ArrowRight
                              size={14}
                              className="text-slate-400 shrink-0"
                            />

                            <span className="font-bold text-slate-950 truncate">
                              {dropAddr || "Destination"}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                            <span className="inline-flex items-center gap-1.5">
                              <Package
                                size={13}
                                className="text-blue-600"
                              />

                              {bid.booking?.goodsType ||
                                bid.booking?.materialType ||
                                "Standard Load"}
                            </span>

                            <span className="font-bold text-slate-900">
                              ₹{" "}
                              {bid.amount
                                ? Number(bid.amount).toLocaleString("en-IN")
                                : "0"}
                            </span>
                          </div>
                        </div>

                        <ChevronRight
                          size={18}
                          className="text-slate-300 shrink-0 mt-1"
                        />
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <StatusBadge status={bid.status} />

                        <span className="text-xs font-semibold text-blue-600">
                          View Details
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ) : (

          /* =================================
             BID DETAIL VIEW
          ================================== */
          <section className="mt-7 sm:mt-8">

            {/* Detail top route */}
            <div className="pb-7 border-b border-slate-200">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-blue-600">
                    Submitted Load Proposal
                  </p>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                        Pickup
                      </p>

                      <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 break-words">
                        {selectedBid.booking?.pickupLocation ||
                          selectedBid.booking?.loadingPoint ||
                          selectedBid.booking?.fromAddress ||
                          selectedBid.booking?.from ||
                          "Source"}
                      </h2>
                    </div>

                    <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 shrink-0">
                      <ArrowRight size={20} />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                        Destination
                      </p>

                      <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 break-words">
                        {selectedBid.booking?.dropLocation ||
                          selectedBid.booking?.unloadingPoint ||
                          selectedBid.booking?.loading_point ||
                          selectedBid.booking?.toAddress ||
                          selectedBid.booking?.to ||
                          "Destination"}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  <StatusBadge status={selectedBid.status} />
                </div>
              </div>
            </div>

            {/* =================================
                DETAIL CONTENT
            ================================== */}
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-0 xl:gap-14">

              {/* Main information */}
              <div>

                {/* LOCATIONS */}
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
                        <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                            Pickup Location
                          </p>

                          <p className="mt-2 text-sm sm:text-[15px] leading-6 font-semibold text-slate-800 break-words">
                            {selectedBid.booking?.pickupLocation ||
                              selectedBid.booking?.loadingPoint ||
                              selectedBid.booking?.fromAddress ||
                              selectedBid.booking?.from ||
                              "Not Specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-start gap-3">
                        <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />

                        <div>
                          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                            Unloading / Destination
                          </p>

                          <p className="mt-2 text-sm sm:text-[15px] leading-6 font-semibold text-slate-800 break-words">
                            {selectedBid.booking?.dropLocation ||
                              selectedBid.booking?.unloadingPoint ||
                              selectedBid.booking?.loading_point ||
                              selectedBid.booking?.toAddress ||
                              selectedBid.booking?.to ||
                              "Not Specified"}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

                {/* LOAD INFORMATION */}
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
                          {selectedBid.booking?.goodsType ||
                            selectedBid.booking?.materialType ||
                            "Standard Load"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="text-blue-600 pt-0.5">
                        <Scale size={21} strokeWidth={1.8} />
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                          Total Load
                        </p>

                        <p className="mt-1.5 text-base font-semibold text-slate-900">
                          {selectedBid.booking?.weight
                            ? `${selectedBid.booking.weight}`
                            : selectedBid.booking?.loadType || "N/A"}
                        </p>
                      </div>
                    </div>

                  </div>
                </section>

                {/* MESSAGE */}
                <section className="py-7 sm:py-8 border-b border-slate-200">

                  <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                    Note / Remarks
                  </p>

                  <p className="mt-3 text-sm sm:text-[15px] leading-7 text-slate-600 break-words">
                    {selectedBid.message
                      ? `"${selectedBid.message}"`
                      : "No custom message provided."}
                  </p>
                </section>

                {/* CUSTOMER INFORMATION */}
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
                        Details unlock after acceptance
                      </span>
                    )}
                  </div>

                  <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-7">

                    <div className="flex items-start gap-3">
                      <User
                        size={19}
                        className="text-blue-600 mt-0.5 shrink-0"
                      />

                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                          Customer
                        </p>

                        <p
                          className={`mt-1.5 font-semibold text-sm sm:text-[15px] break-words ${
                            selectedBid.status !== "Accepted"
                              ? "filter blur-[4px] select-none text-slate-400"
                              : "text-slate-900"
                          }`}
                        >
                          {selectedBid.booking?.contactPerson || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone
                        size={19}
                        className="text-blue-600 mt-0.5 shrink-0"
                      />

                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400">
                          Mobile
                        </p>

                        <p
                          className={`mt-1.5 font-semibold text-sm sm:text-[15px] break-words ${
                            selectedBid.status !== "Accepted"
                              ? "filter blur-[4px] select-none text-slate-400"
                              : "text-slate-900"
                          }`}
                        >
                          {selectedBid.booking?.contactNumber || "N/A"}
                        </p>
                      </div>
                    </div>

                  </div>
                </section>
              </div>

              {/* =================================
                  RIGHT SUMMARY
              ================================== */}
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
                      {selectedBid.amount
                        ? Number(selectedBid.amount).toLocaleString("en-IN")
                        : "0"}
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

                  {/* Accepted */}
                  {selectedBid.status === "Accepted" && (
                    <div className="py-6">
                      <div className="flex items-start gap-3 text-emerald-700">
                        <CheckCircle2
                          size={19}
                          className="shrink-0 mt-0.5"
                        />

                        <div>
                          <p className="text-sm font-bold">
                            Bid Accepted
                          </p>

                          <p className="mt-1.5 text-xs leading-5 text-emerald-700/80">
                            Congratulations! Customer has accepted your bid
                            proposal.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Rejected */}
                  {selectedBid.status === "Rejected" && (
                    <div className="py-6">
                      <div className="flex items-start gap-3 text-red-700">
                        <XCircle
                          size={19}
                          className="shrink-0 mt-0.5"
                        />

                        <div>
                          <p className="text-sm font-bold">
                            Bid Declined
                          </p>

                          <p className="mt-1.5 text-xs leading-5 text-red-700/80">
                            This bid proposal was declined by the customer.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pending */}
                  {selectedBid.status === "Pending" && (
                    <div className="py-6">
                      <div className="flex items-start gap-3 text-amber-700">
                        <Clock
                          size={19}
                          className="shrink-0 mt-0.5"
                        />

                        <div>
                          <p className="text-sm font-bold">
                            Awaiting Customer
                          </p>

                          <p className="mt-1.5 text-xs leading-5 text-amber-700/80">
                            Waiting for the customer to review your bid.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Privacy */}
                  {selectedBid.status !== "Accepted" && (
                    <div className="pt-5 border-t border-slate-200">
                      <div className="flex items-start gap-3">
                        <ShieldCheck
                          size={18}
                          className="text-blue-600 shrink-0 mt-0.5"
                        />

                        <p className="text-xs leading-5 text-slate-500">
                          Customer contact information is protected and
                          becomes available after the bid is accepted.
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
  );
}

export default AcceptedBid;