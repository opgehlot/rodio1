import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardReviews from "./DashboardReviews";

export function TranspoterDashboard() {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full rounded-3xl overflow-hidden shadow-xl">
        <div className="bg-gradient-to-r from-green-900 via-green-700 to-emerald-500 px-16 py-24">

          <p className="text-green-100 uppercase tracking-[8px] text-xl font-semibold">
            Welcome To
          </p>

          <h1 className="text-6xl md:text-7xl font-extrabold text-white mt-4">
            TRANSPORTER DASHBOARD
          </h1>

          <div className="w-40 h-1 bg-white rounded-full mt-6 mb-8"></div>

          <p className="text-xl md:text-2xl text-green-100 max-w-4xl leading-10">
            Manage your transport operations efficiently from one place.
            Track shipments, assign vehicles, monitor deliveries, manage
            drivers, and keep your logistics running smoothly with a simple
            and powerful dashboard designed for transporters.
          </p>

          <button
            onClick={() => navigate("/dashboard/addservices")}
            className="mt-10 px-8 py-4 bg-white text-green-700 font-bold rounded-xl hover:bg-green-100 transition duration-300"
          >
            Register Your Business →
          </button>

        </div>
      </div>

      <DashboardReviews />
    </>
  );
}

export default TranspoterDashboard;