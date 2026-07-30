import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  LockKeyhole,
  Route,
  Truck,
  Calendar,
  Zap,
  Sparkles,
  ShieldAlert,
  Copy,
  Download,
  Mail,
  Phone,
  X
} from "lucide-react";
import toast from "react-hot-toast";

import API from "../../api/api";

export function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Receipt Modal States
  const [receipt, setReceipt] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [loadingReceipt, setLoadingReceipt] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await API.get("/dashboard");
      setDashboard(response.data?.data || null);
    } catch (error) {
      console.log("Dashboard Error:", error);
      if (error.response?.status === 404) {
        setDashboard(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReferral = (code) => {
    if (!code || code === "N/A") return;
    navigator.clipboard.writeText(code);
    toast.success("Referral code copied!");
  };

  const business = dashboard; 
  const subscription = dashboard?.subscription;
  const referralObj = dashboard?.referral;

  const handleViewReceipt = async () => {
    try {
      setLoadingReceipt(true);
      const { data } = await API.get("/receipt/latest");

      if (data.success) {
        setReceipt(data.receipt);
        setShowReceipt(true);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Receipt not found");
    } finally {
      setLoadingReceipt(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-black text-slate-900 uppercase tracking-widest">
            LOADING DASHBOARD...
          </p>
        </div>
      </div>
    );
  }

  const isUnlocked = subscription?.status === "active";
  const referralCode = referralObj?.referralCode || "RODIO2026";

  return (
    <div className="w-full bg-white text-slate-900 px-4 md:px-10 py-8 my-0 relative">
      <div className="w-full space-y-6">
        
        {/* STATE 1: USER HAS NOT REGISTERED BUSINESS */}
        {!business || !business?.firmName ? (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl shadow-sm overflow-hidden p-8 md:p-12">
            <div className="max-w-2xl space-y-5">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 border border-slate-200 shadow-sm">
                <Building2 size={28} />
              </div>

              <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase text-slate-900">
                REGISTER YOUR BUSINESS
              </h2>

              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider leading-relaxed">
                PLEASE REGISTER YOUR ENTERPRISE PROFILE TO UNLOCK SERVICES, ADD VEHICLES, ROUTES, AND ACCESS OUR SECURE SUBSCRIPTION PLANS.
              </p>

              <button
                onClick={() => navigate("/dashboard/addservices")}
                className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-4 rounded-2xl font-black text-xs tracking-widest uppercase flex items-center gap-3 transition-all shadow-sm active:scale-[0.99]"
              >
                <span>ADD YOUR SERVICES & REGISTER</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : null}

        {/* STATE 2: BUSINESS EXISTS BUT PAYMENT PENDING */}
        {business && business?.firmName && !isUnlocked && (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-amber-50 border border-amber-200 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                  <LockKeyhole size={26} />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-black tracking-widest uppercase">
                    <ShieldAlert size={12} /> PAYMENT PENDING
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                    COMPLETE YOUR SUBSCRIPTION
                  </h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider leading-relaxed max-w-xl">
                    YOUR BUSINESS DETAILS ARE SAVED SECURELY. COMPLETE THE PAYMENT TO UNLOCK VEHICLES, ROUTES, AND FULL DASHBOARD SERVICES.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/dashboard/addservices")}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase whitespace-nowrap flex items-center justify-center gap-3 transition-all shadow-sm active:scale-[0.99]"
              >
                <span>CONTINUE TO ADD SERVICES</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STATE 3: ACTIVE BUSINESS & SUBSCRIPTION */}
        {business && business?.firmName && isUnlocked && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT CARD: PERFORMANCE & REFERRAL */}
           <div className="lg:col-span-4 bg-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl space-y-6">

  {/* Header */}
  <div>
    <div className="flex items-center justify-between pb-4 border-b border-slate-700">
      <h3 className="text-sm font-black text-white tracking-wider uppercase">
        Subscription Card
      </h3>

      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
    </div>

    {/* Status */}
    <div className="py-6 border-b border-slate-700">
      <span className="text-3xl font-black text-emerald-400 uppercase">
        {subscription?.status || "ACTIVE"}
      </span>

      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-400">
        Subscription Status
      </p>
    </div>

    {/* Features */}
    <div className="space-y-4 pt-6">

      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          ✓
        </div>

        <span className="text-sm font-semibold text-white">
          Subscription Active & Verified
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          ✓
        </div>

        <span className="text-sm font-semibold text-white">
          Unlimited Directory Access
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          ✓
        </div>

        <span className="text-sm font-semibold text-white">
          View Phone Numbers & Email Addresses
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
          ✓
        </div>

        <span className="text-sm font-semibold text-white">
          Connect Directly with Verified Businesses
        </span>
      </div>

    </div>
  </div>

  {/* Referral Code */}
  <div className="border-t border-slate-700 pt-5">
    <div className="flex items-center justify-between">

      <span className="text-sm font-bold uppercase tracking-wider text-white">
        Referral Code
      </span>

      <button
        onClick={() => handleCopyReferral(referralCode)}
        className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-600 bg-slate-800 hover:bg-slate-700 hover:border-blue-500 transition-all duration-200 shadow-md"
      >
        <span className="font-mono text-lg font-bold tracking-[0.2em] text-white">
          {referralCode}
        </span>

        <Copy size={18} className="text-slate-300" />
      </button>

    </div>
  </div>

</div>

            {/* RIGHT CARD: BUSINESS PROFILE */}
            <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-sm flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-[10px] font-black tracking-widest uppercase border border-white/10">
                      <Zap size={12} /> ENTERPRISE PROFILE
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-2">
                      {business.firmName}
                    </h2>
                  </div>
                  
                  <button
                    onClick={handleViewReceipt}
                    disabled={loadingReceipt}
                    className="bg-white hover:bg-slate-100 text-slate-900 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition shadow-sm active:scale-95 disabled:opacity-50 whitespace-nowrap"
                  >
                    <Download size={15} />
                    <span>{loadingReceipt ? "FETCHING..." : "VIEW RECEIPT"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                    <span className="text-slate-400 text-[10px] block">Role / Category</span>
                    <span className="text-white font-black text-sm">{business.role || "Transporter"}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                    <span className="text-slate-400 text-[10px] block">Active Plan</span>
                    <span className="text-white font-black text-sm">{subscription?.plan || "Monthly"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                    <Phone size={14} className="text-slate-400" />
                    <span>{business.mobile || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
                    <Mail size={14} className="text-slate-400" />
                    <span>{business.email || "No Email Provided"}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider text-slate-300">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-slate-400" />
                  <span>START: <strong className="text-white">{subscription?.startDate ? new Date(subscription.startDate).toLocaleDateString() : "N/A"}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-slate-400" />
                  <span>END: <strong className="text-white">{subscription?.endDate ? new Date(subscription.endDate).toLocaleDateString() : "ACTIVE"}</strong></span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* RECEIPT MODAL */}
      {showReceipt && receipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-xl p-6 md:p-8 space-y-6 text-slate-900">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">SECURE INVOICE</span>
                <h3 className="text-xl font-black text-slate-900 uppercase">Payment Receipt</h3>
              </div>
              <button
                onClick={() => setShowReceipt(false)}
                className="w-9 h-9 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full flex items-center justify-center transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 text-xs font-bold uppercase tracking-wider text-slate-700">
              <div className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-400">Receipt Number</span>
                <span className="font-black text-slate-900">{receipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-400">Payment ID</span>
                <span className="font-mono text-slate-900">{receipt.razorpayPaymentId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-400">Amount Paid</span>
                <span className="font-black text-slate-900 text-sm">₹{receipt.amount} {receipt.currency}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-600 font-black">{receipt.paymentStatus}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-400">Payment Date</span>
                <span className="text-slate-900">{new Date(receipt.paymentDate).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition shadow-sm"
              >
                <Download size={15} />
                <span>PRINT / SAVE PDF</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;