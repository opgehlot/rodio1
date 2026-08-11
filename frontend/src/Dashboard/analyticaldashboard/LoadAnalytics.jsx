import React from "react";
import {
  PackagePlus,
  Gavel,
  CheckCircle,
  Truck,
  PackageCheck,
} from "lucide-react";

const LoadAnalytics = () => {
  const loadStats = [
    {
      title: "Loads Added",
      value: 36,
      percentage: 100,
      icon: PackagePlus,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      bar: "bg-blue-500",
    },
    {
      title: "Bidding",
      value: 18,
      percentage: 50,
      icon: Gavel,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
      bar: "bg-purple-500",
    },
    {
      title: "Accepted",
      value: 12,
      percentage: 33,
      icon: CheckCircle,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      bar: "bg-green-500",
    },
    {
      title: "In Transit",
      value: 8,
      percentage: 22,
      icon: Truck,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      bar: "bg-orange-500",
    },
    {
      title: "Completed",
      value: 6,
      percentage: 17,
      icon: PackageCheck,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      bar: "bg-emerald-500",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Load Analytics
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Track your loads from enquiry to completion
        </p>
      </div>

      {/* Stats */}
      <div className="space-y-5">
        {loadStats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.iconBg}`}
                  >
                    <Icon className={`h-4 w-4 ${item.iconColor}`} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {item.title}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {item.value}
                  </p>

                  <p className="text-xs text-gray-400">
                    {item.percentage}%
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${item.bar} transition-all duration-500`}
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary */}
      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-4">
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">36</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Active</p>
          <p className="mt-1 text-lg font-semibold text-purple-600">18</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">In Transit</p>
          <p className="mt-1 text-lg font-semibold text-orange-600">8</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Completed</p>
          <p className="mt-1 text-lg font-semibold text-green-600">6</p>
        </div>
      </div>
    </div>
  );
};

export default LoadAnalytics;