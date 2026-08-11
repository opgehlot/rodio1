import React from "react";
import { ArrowRight, MapPin, TrendingUp } from "lucide-react";

const TopRoutes = () => {
  const routes = [
    {
      from: "Indore",
      to: "Delhi",
      loads: 18,
      bids: 32,
      bookings: 12,
    },
    {
      from: "Mumbai",
      to: "Ahmedabad",
      loads: 14,
      bids: 26,
      bookings: 10,
    },
    {
      from: "Indore",
      to: "Jaipur",
      loads: 11,
      bids: 21,
      bookings: 8,
    },
    {
      from: "Pune",
      to: "Mumbai",
      loads: 9,
      bids: 17,
      bookings: 7,
    },
    {
      from: "Delhi",
      to: "Indore",
      loads: 8,
      bids: 15,
      bookings: 6,
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Top Routes
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your most active transportation routes
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
          <TrendingUp className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {/* Routes */}
      <div className="space-y-4">
        {routes.map((route, index) => (
          <div
            key={`${route.from}-${route.to}`}
            className="rounded-xl border border-gray-100 p-4 transition hover:border-gray-200 hover:shadow-sm"
          >
            {/* Route */}
            <div className="flex items-center justify-between">
              <div className="flex min-w-0 items-center gap-3">
                {/* From */}
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>

                  <span className="truncate text-sm font-semibold text-gray-800">
                    {route.from}
                  </span>
                </div>

                <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" />

                {/* To */}
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50">
                    <MapPin className="h-4 w-4 text-green-600" />
                  </div>

                  <span className="truncate text-sm font-semibold text-gray-800">
                    {route.to}
                  </span>
                </div>
              </div>

              {/* Rank */}
              <span className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                #{index + 1}
              </span>
            </div>

            {/* Analytics */}
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-100 pt-3">
              <div>
                <p className="text-xs text-gray-400">
                  Loads
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {route.loads}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Bids
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {route.bids}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Bookings
                </p>

                <p className="mt-1 text-sm font-semibold text-green-600">
                  {route.bookings}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 border-t border-gray-100 pt-4">
        <button className="text-sm font-medium text-blue-600 transition hover:text-blue-700">
          View all routes →
        </button>
      </div>
    </div>
  );
};

export default TopRoutes;