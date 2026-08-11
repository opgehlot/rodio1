import React from "react";
import {
  Truck,
  Gavel,
  PackagePlus,
  CheckCircle,
  Wallet,
} from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Total Vehicles",
      value: "12",
      subtitle: "Active vehicles",
      change: "+2 this month",
      icon: Truck,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Loads Added",
      value: "36",
      subtitle: "This month",
      change: "+8 this month",
      icon: PackagePlus,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Bids Placed",
      value: "48",
      subtitle: "This month",
      change: "+12 this month",
      icon: Gavel,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      title: "Accepted Bids",
      value: "22",
      subtitle: "Successful bids",
      change: "46% success rate",
      icon: CheckCircle,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Total Earnings",
      value: "₹2,48,750",
      subtitle: "This month",
      change: "+18.3%",
      icon: Wallet,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon className={`h-5 w-5 ${stat.iconColor}`} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              {stat.subtitle}
            </p>

            <p className="mt-1 text-xs font-medium text-green-600">
              {stat.change}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;