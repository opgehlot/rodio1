import React from "react";
import {
  Wallet,
  TrendingUp,
  ArrowUpRight,
  IndianRupee,
} from "lucide-react";

const EarningsSummary = () => {
  const earnings = [
    {
      title: "Today",
      value: "₹8,500",
      change: "+12.5%",
    },
    {
      title: "This Week",
      value: "₹48,750",
      change: "+8.2%",
    },
    {
      title: "This Month",
      value: "₹2,48,750",
      change: "+18.3%",
    },
    {
      title: "Total Earnings",
      value: "₹12,75,850",
      change: "+24.6%",
    },
  ];

  const monthlyData = [
    { month: "Jan", value: 145000 },
    { month: "Feb", value: 168000 },
    { month: "Mar", value: 152000 },
    { month: "Apr", value: 195000 },
    { month: "May", value: 218000 },
    { month: "Jun", value: 248750 },
  ];

  const maxValue = Math.max(
    ...monthlyData.map((item) => item.value)
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Earnings Summary
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track your earning performance
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
          <Wallet className="h-5 w-5 text-green-600" />
        </div>
      </div>

      {/* Earnings Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {earnings.map((item) => (
          <div
            key={item.title}
            className="rounded-xl bg-gray-50 p-4"
          >
            <p className="text-xs text-gray-500">
              {item.title}
            </p>

            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-lg font-bold text-gray-900">
                {item.value}
              </p>

              <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {item.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Performance */}
      <div className="mt-6 border-t border-gray-100 pt-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Monthly Earnings
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Earnings performance over the last 6 months
            </p>
          </div>

          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />

            <span className="text-sm font-semibold text-green-600">
              +18.3%
            </span>
          </div>
        </div>

        {/* Chart */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex h-[230px]">
              {/* Y Axis */}
              <div className="flex w-16 flex-col justify-between pb-7 text-xs text-gray-400">
                <span>₹2.5L</span>
                <span>₹2L</span>
                <span>₹1.5L</span>
                <span>₹1L</span>
                <span>₹0.5L</span>
                <span>₹0</span>
              </div>

              {/* Chart */}
              <div className="relative flex-1">
                {/* Grid */}
                <div className="absolute inset-0 flex flex-col justify-between pb-7">
                  {[0, 1, 2, 3, 4, 5].map((line) => (
                    <div
                      key={line}
                      className="border-t border-dashed border-gray-100"
                    />
                  ))}
                </div>

                {/* Bars */}
                <div className="relative flex h-full items-end justify-between gap-5 pb-7">
                  {monthlyData.map((item) => {
                    const height =
                      (item.value / maxValue) * 100;

                    return (
                      <div
                        key={item.month}
                        className="flex h-full flex-1 flex-col items-center justify-end"
                      >
                        <div className="mb-2 text-xs font-medium text-gray-600">
                          ₹{Math.round(item.value / 1000)}K
                        </div>

                        <div
                          className="w-8 rounded-t-lg bg-green-500 transition-all duration-300 hover:bg-green-600"
                          style={{
                            height: `${height}%`,
                          }}
                          title={`${item.month}: ₹${item.value.toLocaleString(
                            "en-IN"
                          )}`}
                        />

                        <span className="absolute bottom-0 text-xs text-gray-400">
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="mt-5 grid grid-cols-1 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
            <IndianRupee className="h-4 w-4 text-green-600" />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Average Monthly
            </p>

            <p className="text-sm font-semibold text-gray-900">
              ₹2,12,917
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Best Month
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-900">
            June
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Growth
          </p>

          <p className="mt-1 text-sm font-semibold text-green-600">
            +18.3%
          </p>
        </div>
      </div>
    </div>
  );
};

export default EarningsSummary;