import React from "react";
import {
  Gavel,
  Clock3,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react";

const BidAnalytics = () => {
  const bidStats = [
    {
      title: "Bids Placed",
      value: 48,
      percentage: 100,
      icon: Gavel,
      bg: "bg-blue-50",
      color: "text-blue-600",
      bar: "bg-blue-500",
    },
    {
      title: "Pending",
      value: 16,
      percentage: 33,
      icon: Clock3,
      bg: "bg-yellow-50",
      color: "text-yellow-600",
      bar: "bg-yellow-500",
    },
    {
      title: "Accepted",
      value: 22,
      percentage: 46,
      icon: CheckCircle,
      bg: "bg-green-50",
      color: "text-green-600",
      bar: "bg-green-500",
    },
    {
      title: "Rejected",
      value: 10,
      percentage: 21,
      icon: XCircle,
      bg: "bg-red-50",
      color: "text-red-600",
      bar: "bg-red-500",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Bid Analytics
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track your bidding performance
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
          <TrendingUp className="h-5 w-5 text-green-600" />
        </div>
      </div>

      {/* Bid Stats */}
      <div className="grid grid-cols-2 gap-4">
        {bidStats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.bg}`}
                >
                  <Icon className={`h-4 w-4 ${item.color}`} />
                </div>

                <span className="text-xs font-medium text-gray-400">
                  {item.percentage}%
                </span>
              </div>

              <p className="mt-4 text-sm text-gray-500">
                {item.title}
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-900">
                {item.value}
              </p>

              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${item.bar}`}
                  style={{
                    width: `${item.percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Success Rate */}
      <div className="mt-6 rounded-xl bg-gray-50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">
              Bid Success Rate
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900">
              46%
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">
              Accepted / Total
            </p>

            <p className="mt-1 text-sm font-semibold text-green-600">
              22 / 48
            </p>
          </div>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-green-500"
            style={{ width: "46%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default BidAnalytics;