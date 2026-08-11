import React from "react";

const BusinessOverview = () => {
  const data = [
    { month: "Jan", loads: 18, bids: 25, accepted: 10 },
    { month: "Feb", loads: 24, bids: 32, accepted: 14 },
    { month: "Mar", loads: 20, bids: 28, accepted: 12 },
    { month: "Apr", loads: 32, bids: 41, accepted: 18 },
    { month: "May", loads: 28, bids: 38, accepted: 16 },
    { month: "Jun", loads: 36, bids: 48, accepted: 22 },
  ];

  const maxValue = 50;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Business Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your business performance over the last 6 months
          </p>
        </div>

        <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none focus:border-gray-400">
          <option>Last 6 Months</option>
          <option>Last 12 Months</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Legend */}
      <div className="mb-5 flex flex-wrap gap-5 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
          <span className="text-gray-600">Loads Added</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-purple-500"></span>
          <span className="text-gray-600">Bids Placed</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
          <span className="text-gray-600">Accepted Bids</span>
        </div>
      </div>

      {/* Chart */}
      <div className="overflow-x-auto">
        <div className="min-w-[650px]">
          <div className="flex h-[280px]">
            {/* Y Axis */}
            <div className="flex w-10 flex-col justify-between pb-7 text-xs text-gray-400">
              <span>50</span>
              <span>40</span>
              <span>30</span>
              <span>20</span>
              <span>10</span>
              <span>0</span>
            </div>

            {/* Chart Area */}
            <div className="relative flex-1">
              {/* Horizontal Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pb-7">
                {[50, 40, 30, 20, 10, 0].map((value) => (
                  <div
                    key={value}
                    className="border-t border-dashed border-gray-100"
                  />
                ))}
              </div>

              {/* Bars */}
              <div className="relative flex h-full items-end justify-between gap-4 pb-7">
                {data.map((item) => (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 items-end justify-center gap-1.5"
                  >
                    {/* Loads */}
                    <div
                      className="w-3 rounded-t-md bg-blue-500 transition-all hover:opacity-80"
                      style={{
                        height: `${(item.loads / maxValue) * 100}%`,
                      }}
                      title={`Loads: ${item.loads}`}
                    />

                    {/* Bids */}
                    <div
                      className="w-3 rounded-t-md bg-purple-500 transition-all hover:opacity-80"
                      style={{
                        height: `${(item.bids / maxValue) * 100}%`,
                      }}
                      title={`Bids: ${item.bids}`}
                    />

                    {/* Accepted */}
                    <div
                      className="w-3 rounded-t-md bg-green-500 transition-all hover:opacity-80"
                      style={{
                        height: `${(item.accepted / maxValue) * 100}%`,
                      }}
                      title={`Accepted: ${item.accepted}`}
                    />

                    {/* Month */}
                    <span className="absolute bottom-0 text-xs text-gray-400">
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="mt-5 grid grid-cols-1 gap-3 border-t border-gray-100 pt-5 sm:grid-cols-3">
        <div>
          <p className="text-xs text-gray-500">Total Loads</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">158</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Total Bids</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">212</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Accepted Bids</p>
          <p className="mt-1 text-lg font-semibold text-green-600">92</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessOverview;