import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import Profile from "../../Dashboard/Profile"; // Profile component import kiya gaya hai

import {
  Building2,
  CreditCard,
  User,
  Truck,
  ArrowRight,
  CalendarDays,
  AlertCircle,
  Copy,
  Check,
  ChevronDown,
  Gift,
  Mail,
  Phone,
  Briefcase,
  PlusCircle,
} from "lucide-react";

const DashboardHome = () => {
  const navigate = useNavigate();

  // API State
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI Interactive States
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Token not found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await API.get("/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.success) {
          setBusiness(response.data.data);
        } else {
          setBusiness(null);
        }
      } catch (err) {
        console.error("Dashboard API Error:", err.response?.data || err);

        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          return;
        }
        setBusiness(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const isProfileComplete = 
    business?.profileCompleted === true || 
    (Boolean(business?.firmName) && Boolean(business?.ownerName || business?.name) && Boolean(business?.mobile));

  const subscriptionStatus = business?.subscription?.status || "inactive";
  const subscriptionPlan = business?.subscription?.plan || "No Plan";
  const subscriptionStartDate = business?.subscription?.startDate;
  const subscriptionEndDate = business?.subscription?.endDate;
  const referralCode = business?.referral?.referralCode;

  const isSubscriptionActive = subscriptionStatus === "active";
  const isSubscriptionExpired = subscriptionStatus === "expired";

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleCopyCode = () => {
    if (referralCode) {
      navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100/80 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-5 max-w-sm w-full border border-slate-200">
          <div className="relative flex items-center justify-center">
            <div className="w-14 h-14 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
            <Truck className="absolute text-orange-500" size={22} />
          </div>
          <p className="text-slate-800 font-bold text-lg animate-pulse">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Critical Auth Error
  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full border border-red-100 text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={36} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Authentication Error</h2>
          <p className="text-slate-600 mt-2 text-base">{error}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base px-6 py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 p-4 sm:p-6 lg:p-10 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ================= PURANA DARK HEADER REMOVED ================= */}
        {/* Us purane header banner ki jagah ab aapka Naya Profile Component yahan hai */}
        <Profile />

        {/* ================= REFERRAL ACCORDION ================= */}
        {referralCode && (
          <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-white border border-orange-200/80 rounded-2xl p-5 shadow-sm">
            <button
              onClick={() => setIsReferralOpen(!isReferralOpen)}
              className="w-full flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Gift size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Invite & Earn Rewards</h3>
                  <p className="text-xs sm:text-sm text-slate-500">Share your referral code to unlock bonus benefits</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-orange-600 bg-orange-100/80 hover:bg-orange-200/80 px-4 py-2 rounded-xl transition">
                <span>{isReferralOpen ? "Hide Code" : "Show Code"}</span>
                <ChevronDown
                  size={18}
                  className={`transform transition-transform duration-300 ${
                    isReferralOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {/* Collapsible Content */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isReferralOpen
                  ? "grid-rows-[1fr] opacity-100 mt-5 pt-5 border-t border-orange-200/60"
                  : "grid-rows-[0fr] opacity-0 overflow-hidden"
              }`}
            >
              <div className="overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Your Referral Code
                    </span>
                    <p className="text-3xl font-mono font-black text-orange-600 tracking-wider mt-1">
                      {referralCode}
                    </p>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      copied
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/15"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check size={18} /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={18} /> Copy Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= MAIN CARDS SECTION ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* 1. BUSINESS PROFILE CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-orange-100/70 rounded-2xl flex items-center justify-center text-orange-600">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">Business Profile</h2>
                    <p className="text-xs sm:text-sm text-slate-400">Account info & details</p>
                  </div>
                </div>

                {!isProfileComplete && (
                  <button
                    onClick={() => navigate("/dashboard/addservices")}
                    className="text-xs sm:text-sm font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
                  >
                    Complete <ArrowRight size={16} />
                  </button>
                )}
              </div>

              {/* Information Table */}
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center text-base py-1">
                  <span className="text-slate-500 font-medium flex items-center gap-2.5 text-sm sm:text-base">
                    <Briefcase size={18} className="text-slate-400" /> Firm Name
                  </span>
                  <span className="font-bold text-slate-800 text-sm sm:text-base capitalize">
                    {business?.firmName || "Not Provided"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-base py-1">
                  <span className="text-slate-500 font-medium flex items-center gap-2.5 text-sm sm:text-base">
                    <User size={18} className="text-slate-400" /> Owner Name
                  </span>
                  <span className="font-bold text-slate-800 text-sm sm:text-base capitalize">
                    {business?.ownerName || business?.name || "Not Provided"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-base py-1">
                  <span className="text-slate-500 font-medium flex items-center gap-2.5 text-sm sm:text-base">
                    <Mail size={18} className="text-slate-400" /> Email
                  </span>
                  <span className="font-semibold text-slate-700 text-sm sm:text-base truncate max-w-[200px]" title={business?.email}>
                    {business?.email || "-"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-base py-1">
                  <span className="text-slate-500 font-medium flex items-center gap-2.5 text-sm sm:text-base">
                    <Phone size={18} className="text-slate-400" /> Mobile
                  </span>
                  <span className="font-bold text-slate-800 text-sm sm:text-base">
                    {business?.mobile || "-"}
                  </span>
                </div>
              </div>
            </div>

            {/* Warning only shows if Profile is genuinely incomplete */}
            {!isProfileComplete && (
              <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                <AlertCircle size={20} className="text-amber-600 shrink-0" />
                <p className="text-xs sm:text-sm font-semibold text-amber-800">
                  Your profile is incomplete. Complete setup to gain full access.
                </p>
              </div>
            )}
          </div>

          {/* 2. SUBSCRIPTION DETAILS CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-emerald-100/70 rounded-2xl flex items-center justify-center text-emerald-600">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">Subscription Status</h2>
                    <p className="text-xs sm:text-sm text-slate-400">Current plan & validity</p>
                  </div>
                </div>

                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                    isSubscriptionActive
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : isSubscriptionExpired
                      ? "bg-red-100 text-red-800 border border-red-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300 animate-pulse"
                  }`}
                >
                  {subscriptionStatus}
                </span>
              </div>

              {/* Active Plan View */}
              {isSubscriptionActive && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                    <span className="text-sm text-slate-500 font-bold">Active Plan</span>
                    <span className="font-black text-slate-900 text-base sm:text-lg">{subscriptionPlan}</span>
                  </div>

                  <div className="space-y-3 pt-2 text-sm sm:text-base">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-2 text-slate-500 font-medium">
                        <CalendarDays size={18} /> Start Date
                      </span>
                      <span className="font-bold text-slate-800">{formatDate(subscriptionStartDate)}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-2 text-slate-500 font-medium">
                        <CalendarDays size={18} /> Valid Until
                      </span>
                      <span className="font-bold text-slate-800">{formatDate(subscriptionEndDate)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Inactive / Expired View */}
              {!isSubscriptionActive && (
                <div className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <p className="font-extrabold text-slate-800 text-base">
                    {isSubscriptionExpired ? "Subscription Expired" : "No Active Subscription"}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Select a service plan to unlock full dashboard access & receive leads.
                  </p>
                </div>
              )}
            </div>

            {/* BUTTON LOGIC */}
            {subscriptionStatus === "inactive" && (
              <button
                onClick={() => navigate("/dashboard/addservices")}
                className="mt-8 w-full py-4 px-5 rounded-2xl font-black text-sm bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white transition-all shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 animate-bounce ring-4 ring-orange-400/20"
              >
                <PlusCircle size={20} />
                Add Services
              </button>
            )}

            {subscriptionStatus === "expired" && (
              <button
                onClick={() => navigate("/dashboard/planselection")}
                className="mt-8 w-full py-4 px-5 rounded-2xl font-black text-sm bg-red-600 hover:bg-red-700 text-white transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
              >
                Renew Your Plan
                <ArrowRight size={18} />
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardHome;