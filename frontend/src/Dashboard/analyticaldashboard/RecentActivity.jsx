import React from "react";
import {
  PackagePlus,
  Gavel,
  CheckCircle,
  CalendarCheck,
  Clock3,
} from "lucide-react";

const RecentActivity = () => {
  const activities = [
    {
      title: "New Load Added",
      description: "Indore → Delhi",
      time: "10 min ago",
      icon: PackagePlus,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      title: "Bid Placed",
      description: "₹28,500 for Indore → Jaipur",
      time: "35 min ago",
      icon: Gavel,
      bg: "bg-purple-50",
      color: "text-purple-600",
    },
    {
      title: "Bid Accepted",
      description: "Mumbai → Ahmedabad",
      time: "1 hour ago",
      icon: CheckCircle,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      title: "Booking Created",
      description: "Truck • Delhi → Indore",
      time: "2 hours ago",
      icon: CalendarCheck,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
    {
      title: "Bid Pending",
      description: "Pune → Mumbai",
      time: "3 hours ago",
      icon: Clock3,
      bg: "bg-yellow-50",
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Latest activity on your account
          </p>
        </div>

        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-5">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              {/* Icon */}
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${activity.bg}`}
              >
                <Icon
                  className={`h-5 w-5 ${activity.color}`}
                />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-1 sm:flex-row">
                  <p className="text-sm font-semibold text-gray-800">
                    {activity.title}
                  </p>

                  <span className="text-xs text-gray-400">
                    {activity.time}
                  </span>
                </div>

                <p className="mt-1 truncate text-sm text-gray-500">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 border-t border-gray-100 pt-4">
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900">
          View complete activity history →
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;