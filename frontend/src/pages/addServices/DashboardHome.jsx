import { useNavigate } from "react-router-dom";
import {
  Building2,
  CreditCard,
  User,
  Truck,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";

const DashboardHome = ({ business }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "User";

  const isProfileComplete = Boolean(business?.profileCompleted);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8 shadow">
        <h1 className="text-3xl font-bold">
          Welcome, {business?.ownerName || "User"}
        </h1>
        <p className="mt-2 opacity-90">
          Manage your business and subscription from one place.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">

        {/* Business Details */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="text-orange-500" size={28} />
            <h2 className="text-xl font-semibold">Business</h2>
          </div>
          <p className="text-gray-700">
            <strong>Name :</strong> {business?.firmName || "Not Added"}
          </p>
          <p className="text-gray-700 mt-1">
            <strong>Role :</strong> {role}
          </p>
        </div>

        {/* Profile Status */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <User className="text-blue-500" size={28} />
              <h2 className="text-xl font-semibold">Profile Status</h2>
            </div>

            {isProfileComplete ? (
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <CheckCircle2 size={20} />
                <span>Business Profile Completed</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-500 font-medium">
                <Clock size={20} />
                <span>Profile Not Completed</span>
              </div>
            )}
          </div>

          {/* Button Disabled if Profile Completed */}
          <button
            disabled={isProfileComplete}
            onClick={() => navigate("/dashboard/addservices")}
            className={`mt-5 w-full py-3 rounded-lg font-medium transition-all ${
              isProfileComplete
                ? "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
                : "bg-orange-500 hover:bg-orange-600 text-white shadow-md"
            }`}
          >
            {isProfileComplete ? "Services Already Added" : "Add Services"}
          </button>
        </div>

        {/* Subscription Status */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="text-green-500" size={28} />
              <h2 className="text-xl font-semibold">Subscription</h2>
            </div>

            {isProfileComplete ? (
              <p className="text-gray-700">
                <strong>Status :</strong>{" "}
                <span className="capitalize font-semibold text-orange-600">
                  {business?.subscriptionStatus || "Free"}
                </span>
              </p>
            ) : (
              <p className="text-gray-500 text-sm">
                Complete your business profile first to unlock subscriptions.
              </p>
            )}
          </div>

          {isProfileComplete && business?.subscriptionStatus === "Free" && (
            <button
              onClick={() => navigate("/dashboard/planselection")}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow-md transition-all"
            >
              Choose Plan
            </button>
          )}
        </div>

      </div>

      {/* Dashboard Widgets */}
      <div className="grid md:grid-cols-4 gap-5 mt-8">
        <div className="bg-white rounded-xl shadow p-6">
          <Truck className="text-orange-500 mb-3" />
          <h3 className="font-semibold text-gray-700">Total Leads</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <Truck className="text-blue-500 mb-3" />
          <h3 className="font-semibold text-gray-700">Active Bids</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <Truck className="text-green-500 mb-3" />
          <h3 className="font-semibold text-gray-700">Completed Jobs</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <Truck className="text-red-500 mb-3" />
          <h3 className="font-semibold text-gray-700">Reviews</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow p-6 mt-8">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Activity
          </h2>
          <ArrowRight size={20} className="text-gray-400" />
        </div>
        <div className="mt-5 text-gray-500">
          No recent activity available.
        </div>
      </div>

    </div>
  );
};

export default DashboardHome;