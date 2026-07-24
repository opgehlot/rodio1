import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/api";

import {
  Building2,
  CreditCard,
  User,
  Truck,
  ArrowRight,
  CheckCircle2,
  Clock,
  CalendarDays,
  AlertCircle,
  RefreshCw,
  Share2,
  Activity,
  Star,
  Layers,
} from "lucide-react";

const DashboardHome = () => {
  const navigate = useNavigate();

  // ============================
  // API DATA
  // ============================
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================
  // FETCH DASHBOARD DATA
  // ============================
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

        if (!response.data?.success) {
          throw new Error(
            response.data?.message || "Failed to load dashboard"
          );
        }

        setBusiness(response.data.data);
      } catch (err) {
        console.error(
          "Dashboard API Error:",
          err.response?.data || err
        );

        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
          return;
        }

        if (err.response?.status === 403) {
          setError("You are not authorized to access dashboard.");
          return;
        }

        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // ============================
  // COMPUTED VALUES
  // ============================
  const isProfileComplete = business?.profileCompleted === true;
  const subscriptionStatus = business?.subscription?.status || "inactive";
  const subscriptionPlan = business?.subscription?.plan || "-";
  const subscriptionStartDate = business?.subscription?.startDate;
  const subscriptionEndDate = business?.subscription?.endDate;

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

  // ============================
  // LOADING STATE
  // ============================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 max-w-sm w-full border border-slate-100">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
            <Truck className="absolute text-orange-500" size={20} />
          </div>
          <p className="text-slate-700 font-semibold text-lg animate-pulse">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  // ============================
  // ERROR STATE
  // ============================
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl max-w-md w-full border border-red-100 text-center">
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Unable to Load</h2>
          <p className="text-slate-600 mt-2 text-sm md:text-base">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-200"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/80 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* ================= HEADER ================= */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-orange-950 to-orange-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-orange-900/10">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
            <Truck size={280} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-orange-200 mb-3">
                <span className="capitalize">{business?.role || "User"} Account</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Welcome back, {business?.name || "User"} 👋
              </h1>
              <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-xl">
                Manage your business profile, operational status, and active subscriptions seamlessly.
              </p>
            </div>

            {business?.referralCode && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3.5 rounded-2xl flex items-center justify-between md:justify-end gap-4 min-w-[220px]">
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-slate-300">
                    Your Referral Code
                  </p>
                  <p className="text-lg font-mono font-bold text-orange-300 tracking-wider">
                    {business.referralCode}
                  </p>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(business.referralCode)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition text-white"
                  title="Copy Code"
                >
                  <Share2 size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= MAIN METRIC CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* 1. BUSINESS DETAILS CARD */}
          <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Business Details</h2>
                    <p className="text-xs text-slate-400">Company specifications</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Firm Name</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[160px]">
                    {business?.firmName || "Not Added"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Owner</span>
                  <span className="font-semibold text-slate-800">
                    {business?.ownerName || business?.name || "-"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Role</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 capitalize">
                    {business?.role || "-"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-slate-500 font-medium">Email</span>
                  <span className="font-medium text-slate-700 text-xs truncate max-w-[170px]" title={business?.email}>
                    {business?.email || "-"}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500 font-medium">Mobile</span>
                  <span className="font-semibold text-slate-800">
                    {business?.mobile || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. PROFILE STATUS CARD */}
          <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <User size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Profile Status</h2>
                  <p className="text-xs text-slate-400">Account completion</p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                {isProfileComplete ? (
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={22} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-emerald-900 text-sm">Profile Completed</p>
                      <p className="text-xs text-emerald-600/80 mt-0.5">Your services and setup are fully configured.</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <Clock size={22} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-amber-900 text-sm">Profile Pending</p>
                      <p className="text-xs text-amber-600/80 mt-0.5">Complete your details to unlock full features.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!isProfileComplete && (
              <button
                onClick={() => navigate("/dashboard/addservices")}
                className="mt-6 w-full bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-2"
              >
                Complete Profile
                <ArrowRight size={16} />
              </button>
            )}
          </div>

          {/* 3. SUBSCRIPTION CARD */}
          <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-slate-100 flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                    <CreditCard size={24} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Subscription</h2>
                    <p className="text-xs text-slate-400">Plan details & validity</p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    isSubscriptionActive
                      ? "bg-emerald-100 text-emerald-700"
                      : isSubscriptionExpired
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {subscriptionStatus}
                </span>
              </div>

              {/* Active Plan Content */}
              {isSubscriptionActive && (
                <div className="space-y-3 text-sm">
                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Active Plan</span>
                    <span className="font-bold text-emerald-900 text-base">{subscriptionPlan}</span>
                  </div>

                  <div className="space-y-2 pt-1 text-xs text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <CalendarDays size={14} /> Start Date
                      </span>
                      <span className="font-semibold text-slate-700">{formatDate(subscriptionStartDate)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <CalendarDays size={14} /> Valid Until
                      </span>
                      <span className="font-semibold text-slate-700">{formatDate(subscriptionEndDate)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Inactive Content */}
              {subscriptionStatus === "inactive" && (
                <div className="p-4 rounded-2xl bg-slate-50 text-center">
                  <p className="font-semibold text-slate-700 text-sm">No Active Subscription</p>
                  <p className="text-xs text-slate-500 mt-1">Choose a plan to get access to leads and quotes.</p>
                </div>
              )}

              {/* Expired Content */}
              {isSubscriptionExpired && (
                <div className="p-4 rounded-2xl bg-red-50 text-center">
                  <p className="font-semibold text-red-800 text-sm">Subscription Expired</p>
                  <p className="text-xs text-red-600/80 mt-1">Please renew to continue using operational tools.</p>
                </div>
              )}
            </div>

            {(subscriptionStatus === "inactive" || isSubscriptionExpired) && (
              <button
                onClick={() => navigate("/dashboard/planselection")}
                className={`mt-6 w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                  isSubscriptionExpired
                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20"
                    : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20"
                }`}
              >
                {isSubscriptionExpired ? "Renew Subscription" : "Choose Plan"}
                <ArrowRight size={16} />
              </button>
            )}
          </div>

        </div>

        {/* ================= STATS SECTION ================= */}
        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-orange-500" />
            Overview & Metrics
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Stat 1 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-orange-200 transition-colors">
              <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-3">
                <Truck size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Leads</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">0</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                <Layers size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Bids</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">0</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-emerald-200 transition-colors">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
                <CheckCircle2 size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Completed Jobs</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">0</p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-amber-200 transition-colors">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-3">
                <Star size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Reviews</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">0</p>
            </div>
          </div>
        </div>

        {/* ================= RECENT ACTIVITY ================= */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
              <p className="text-xs text-slate-400">Track your latest updates & actions</p>
            </div>

            <button className="text-slate-400 hover:text-slate-600 transition p-2 hover:bg-slate-50 rounded-xl">
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="py-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-3">
              <Activity size={28} />
            </div>
            <p className="text-slate-600 font-medium text-sm">No recent activity found</p>
            <p className="text-slate-400 text-xs mt-1">New updates and notifications will appear here.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;