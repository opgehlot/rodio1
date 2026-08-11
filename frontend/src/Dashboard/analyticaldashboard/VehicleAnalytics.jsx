import React from "react";
import {
  Truck,
  CheckCircle,
  CircleOff,
  Container,
} from "lucide-react";

const VehicleAnalytics = () => {
  const vehicleTypes = [
    {
      name: "Truck",
      count: 5,
      percentage: 42,
      icon: Truck,
      bg: "bg-blue-50",
      color: "text-blue-600",
      bar: "bg-blue-500",
    },
    {
      name: "Trailer",
      count: 3,
      percentage: 25,
      icon: Container,
      bg: "bg-purple-50",
      color: "text-purple-600",
      bar: "bg-purple-500",
    },
    {
      name: "Tanker",
      count: 2,
      percentage: 17,
      icon: Truck,
      bg: "bg-orange-50",
      color: "text-orange-600",
      bar: "bg-orange-500",
    },
    {
      name: "Other",
      count: 2,
      percentage: 16,
      icon: Truck,
      bg: "bg-green-50",
      color: "text-green-600",
      bar: "bg-green-500",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Vehicle Analytics
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of your registered vehicles
        </p>
      </div>

      {/* Main Stats */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Truck className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Total Vehicles
              </p>

              <p className="text-xl font-bold text-gray-900">
                12
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Active
              </p>

              <p className="text-xl font-bold text-gray-900">
                10
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <CircleOff className="h-5 w-5 text-gray-500" />
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Inactive
              </p>

              <p className="text-xl font-bold text-gray-900">
                2
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Types */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-800">
            Vehicle Types
          </h3>

          <span className="text-xs text-gray-400">
            12 vehicles
          </span>
        </div>

        <div className="space-y-4">
          {vehicleTypes.map((vehicle) => {
            const Icon = vehicle.icon;

            return (
              <div key={vehicle.name}>
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${vehicle.bg}`}
                    >
                      <Icon
                        className={`h-4 w-4 ${vehicle.color}`}
                      />
                    </div>

                    <span className="text-sm font-medium text-gray-700">
                      {vehicle.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {vehicle.count}
                    </span>

                    <span className="text-xs text-gray-400">
                      ({vehicle.percentage}%)
                    </span>
                  </div>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${vehicle.bar}`}
                    style={{
                      width: `${vehicle.percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
        <div>
          <p className="text-xs text-gray-500">
            Fleet utilization
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-900">
            83%
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Available vehicles
          </p>

          <p className="mt-1 text-lg font-semibold text-green-600">
            10 / 12
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleAnalytics;