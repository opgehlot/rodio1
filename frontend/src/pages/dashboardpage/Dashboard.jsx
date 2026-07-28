// src/pages/dashboard/Dashboard.jsx

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
  Edit,
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

  // FETCH RECEIPT API CALL (/receipt/latest)
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
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1117]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#2dd4bf] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-black text-[#2dd4bf] uppercase tracking-widest">
            LOADING DASHBOARD...
          </p>
        </div>
      </div>
    );
  }

  // Fixed unlocked check: depends primarily on an active subscription status
  const isUnlocked = subscription?.status === "active";

  // Correctly fetching referral code from nested referral object
  const referralCode = referralObj?.referralCode || "RODIO2026";

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 p-4 md:p-8 lg:p-12 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* PAGE HEADER */}
        <div className="bg-[#161b22] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] text-xs font-semibold tracking-wide mb-3 border border-[#2dd4bf]/20">
              <Sparkles size={14} /> ENTERPRISE CONTROL PANEL
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase">
              DASHBOARD OVERVIEW
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="bg-gradient-to-r from-[#2dd4bf] to-[#38bdf8] hover:opacity-90 text-[#0d1117] px-5 py-2.5 rounded-2xl text-xs font-black tracking-widest uppercase flex items-center gap-2 transition-all shadow-lg active:scale-95"
            >
              <Edit size={16} />
              <span>EDIT PROFILE</span>
            </button>
            <div className="hidden lg:block text-right border-l border-gray-800 pl-4">
              <span className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">PORTAL</span>
              <span className="text-xs font-black text-[#2dd4bf] uppercase">RODIO v2.0</span>
            </div>
          </div>
        </div>

        {/* STATE 1: USER HAS NOT REGISTERED BUSINESS */}
        {!business || !business?.firmName ? (
          <div className="bg-[#161b22] border border-gray-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#1f2937] via-[#111827] to-[#0f172a] p-8 md:p-12 text-white relative overflow-hidden border-b border-gray-800">
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#2dd4bf]/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="max-w-2xl space-y-5 relative z-10">
                <div className="w-14 h-14 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#2dd4bf] border border-white/10 shadow-inner">
                  <Building2 size={28} />
                </div>

                <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
                  REGISTER YOUR BUSINESS
                </h2>

                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider leading-relaxed">
                  PLEASE REGISTER YOUR ENTERPRISE PROFILE TO UNLOCK SERVICES, ADD VEHICLES, ROUTES, AND ACCESS OUR SECURE SUBSCRIPTION PLANS.
                </p>

                <button
                  onClick={() => navigate("/dashboard/addservices")}
                  className="bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#0d1117] px-7 py-4 rounded-2xl font-black text-xs tracking-widest uppercase flex items-center gap-3 transition-all shadow-lg active:scale-[0.99]"
                >
                  <span>ADD YOUR SERVICES & REGISTER</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <div className="p-8 md:p-12 bg-[#161b22]">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
                COMPLETE REGISTRATION TO UNLOCK:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<Truck size={20} />}
                  title="ADD VEHICLES"
                  description="MANAGE YOUR TRANSPORT FLEET SEAMLESSLY."
                />
                <FeatureCard
                  icon={<Route size={20} />}
                  title="ADD ROUTES"
                  description="SETUP ROUTES WHERE YOUR VEHICLES OPERATE."
                />
                <FeatureCard
                  icon={<Building2 size={20} />}
                  title="BUSINESS PROFILE"
                  description="SHOWCASE YOUR ENTERPRISE TO CLIENTS."
                />
              </div>
            </div>
          </div>
        ) : null}

        {/* STATE 2: BUSINESS EXISTS BUT PAYMENT PENDING */}
        {business && business?.firmName && !isUnlocked && (
          <div className="bg-[#161b22] border border-gray-800 rounded-3xl p-8 md:p-10 shadow-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center shrink-0">
                  <LockKeyhole size={26} />
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black tracking-widest uppercase">
                    <ShieldAlert size={12} /> PAYMENT PENDING
                  </div>
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                    COMPLETE YOUR SUBSCRIPTION
                  </h2>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider leading-relaxed max-w-xl">
                    YOUR BUSINESS DETAILS ARE SAVED SECURELY. COMPLETE THE PAYMENT TO UNLOCK VEHICLES, ROUTES, AND FULL DASHBOARD SERVICES.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/dashboard/addservices")}
                className="bg-gradient-to-r from-[#2dd4bf] to-[#38bdf8] text-[#0d1117] px-8 py-4 rounded-2xl font-black text-xs tracking-widest uppercase whitespace-nowrap flex items-center justify-center gap-3 transition-all shadow-lg active:scale-[0.99]"
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
            
            {/* LEFT CARD: SUBSCRIPTION & REFERRAL */}
            <div className="lg:col-span-4 bg-[#161b22] border border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden space-y-6">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                  <h3 className="text-lg font-black text-white tracking-wider uppercase">Performance</h3>
                  <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse"></span>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-b border-gray-800">
                  <div>
                    <span className="text-2xl md:text-3xl font-black text-white uppercase">{subscription?.status || "ACTIVE"}</span>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Status</span>
                  </div>
                  <div className="border-l border-gray-800 pl-4">
                    <span className="text-2xl md:text-3xl font-black text-[#2dd4bf] uppercase">{subscription?.plan || "PRO"}</span>
                    <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">Tier</span>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-300 uppercase">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                      ✓
                    </div>
                    <span>Subscription active & verified</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-300 uppercase">
                    <div className="w-7 h-7 rounded-full bg-[#2dd4bf]/20 text-[#2dd4bf] flex items-center justify-center shrink-0 border border-[#2dd4bf]/30">
                      ✓
                    </div>
                    <span>Deposit programs setup</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-300 uppercase">
                    <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                      ✓
                    </div>
                    <span>Cashback program activated</span>
                  </div>
                </div>
              </div>

              {/* Referral Code Box */}
              <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-black text-gray-400 uppercase tracking-widest">
                  <span>REFERRAL CODE</span>
                  <div 
                    onClick={() => handleCopyReferral(referralCode)}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-xl cursor-pointer transition border border-white/10 text-[#2dd4bf]"
                  >
                    <span className="font-mono font-bold text-xs">{referralCode}</span>
                    <Copy size={12} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT CARD: BUSINESS PROFILE */}
            <div className="lg:col-span-8 bg-gradient-to-br from-[#115e59] via-[#0f766e] to-[#042f2e] border border-teal-600/30 rounded-3xl p-6 md:p-8 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 text-teal-200 text-[10px] font-black tracking-widest uppercase border border-white/10">
                      <Zap size={12} /> ENTERPRISE PROFILE
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mt-2">
                      {business.firmName}
                    </h2>
                  </div>
                  
                  <button
                    onClick={handleViewReceipt}
                    disabled={loadingReceipt}
                    className="bg-white hover:bg-teal-50 text-[#0f766e] px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition shadow-lg active:scale-95 disabled:opacity-50 whitespace-nowrap"
                  >
                    <Download size={15} />
                    <span>{loadingReceipt ? "FETCHING..." : "VIEW RECEIPT"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider">
                  <div className="bg-black/20 border border-white/10 p-4 rounded-2xl space-y-1 backdrop-blur-sm">
                    <span className="text-teal-200/70 text-[10px] block">Role / Category</span>
                    <span className="text-white font-black text-sm">{business.role || "Transporter"}</span>
                  </div>
                  <div className="bg-black/20 border border-white/10 p-4 rounded-2xl space-y-1 backdrop-blur-sm">
                    <span className="text-teal-200/70 text-[10px] block">Active Plan</span>
                    <span className="text-teal-300 font-black text-sm">{subscription?.plan || "Monthly"}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-teal-100 bg-black/20 border border-white/10 px-3.5 py-2 rounded-2xl">
                      <Phone size={14} className="text-teal-300" />
                      <span>{business.mobile || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-teal-100 bg-black/20 border border-white/10 px-3.5 py-2 rounded-2xl">
                      <Mail size={14} className="text-teal-300" />
                      <span>{business.email || "No Email Provided"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider text-teal-100">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-teal-300" />
                  <span>START: <strong className="text-white">{subscription?.startDate ? new Date(subscription.startDate).toLocaleDateString() : "N/A"}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-teal-300" />
                  <span>END: <strong className="text-white">{subscription?.endDate ? new Date(subscription.endDate).toLocaleDateString() : "ACTIVE"}</strong></span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* RECEIPT MODAL */}
      {showReceipt && receipt && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-[#161b22] border border-gray-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl p-6 md:p-8 space-y-6 text-gray-100">
            
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <span className="text-[10px] font-black text-[#2dd4bf] tracking-widest uppercase">SECURE INVOICE</span>
                <h3 className="text-xl font-black text-white uppercase">Payment Receipt</h3>
              </div>
              <button
                onClick={() => setShowReceipt(false)}
                className="w-9 h-9 bg-white/5 hover:bg-white/10 text-gray-300 rounded-full flex items-center justify-center transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-5 space-y-4 text-xs font-bold uppercase tracking-wider text-gray-300">
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500">Receipt Number</span>
                <span className="font-black text-white">{receipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500">Razorpay Payment ID</span>
                <span className="font-mono text-white">{receipt.razorpayPaymentId}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500">Order ID</span>
                <span className="font-mono text-white">{receipt.orderId}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-black text-[#2dd4bf] text-sm">₹{receipt.amount} {receipt.currency}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500">Payment Method</span>
                <span className="text-white">{receipt.method}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500">Status</span>
                <span className="text-emerald-400 font-black">{receipt.paymentStatus}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500">Payment Date</span>
                <span className="text-white">{new Date(receipt.paymentDate).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-500">Subscription Start</span>
                <span className="text-white">{new Date(receipt.subscriptionStart).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-gray-500">Subscription End</span>
                <span className="text-white">{new Date(receipt.subscriptionEnd).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full bg-gradient-to-r from-[#2dd4bf] to-[#38bdf8] hover:opacity-90 text-[#0d1117] py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition shadow-lg"
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

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-[#0d1117] border border-gray-800 rounded-2xl p-6 space-y-3 shadow-sm hover:border-gray-700 transition-all">
      <div className="w-11 h-11 bg-white/5 border border-white/10 text-[#2dd4bf] rounded-xl flex items-center justify-center">
        {icon}
      </div>

      <h3 className="text-sm font-black text-white uppercase tracking-wide">
        {title}
      </h3>

      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider leading-relaxed">
        {description}
      </p>

      <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-500 uppercase tracking-widest pt-3 border-t border-gray-800">
        <LockKeyhole size={12} />
        REGISTRATION REQUIRED
      </div>
    </div>
  );
}

export default Dashboard;