import {
  Truck,
  MapPin,
  Calendar,
  Package,
  IndianRupee,
  Phone,
  User,
} from "lucide-react";

export function Enquiery({ request }) {
 console.log("Request:", request);

  if (!request) {
    return <div>No Request Data</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div className="flex items-center gap-3">

          <div className="bg-blue-100 p-3 rounded-xl">
            <Truck className="text-blue-700" size={22} />
          </div>

          <div>
            <h2 className="font-bold text-lg">
              {request.service}
            </h2>

            <p className="text-sm text-gray-500">
              {request.vehicleType}
            </p>
          </div>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold
          ${
            request.status === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : request.status === "Accepted"
              ? "bg-green-100 text-green-700"
              : request.status === "Completed"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {request.status}
        </span>

      </div>

      {/* Route */}

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-2">

          <MapPin size={18} className="text-red-500" />

          <span>
            <strong>Loading:</strong> {request.pickupLocation}
          </span>

        </div>

        <div className="flex items-center gap-2">

          <MapPin size={18} className="text-green-600" />

          <span>
            <strong>Destination:</strong> {request.loading_point}
          </span>

        </div>

      </div>

      {/* Details */}

      <div className="grid grid-cols-2 gap-4 mt-6">

        <div className="flex items-center gap-2">

          <Package size={18} />

          <span>{request.goodsType}</span>

        </div>

        <div className="flex items-center gap-2">

          <Truck size={18} />

          <span>{request.weight} Ton</span>

        </div>

        <div className="flex items-center gap-2">

          <IndianRupee size={18} />

          <span>₹ {request.expectedBudget}</span>

        </div>

        <div className="flex items-center gap-2">

          <Calendar size={18} />

          <span>{request.pickupDate}</span>

        </div>

      </div>

      {/* Contact */}

      <div className="border-t mt-6 pt-5">

        <div className="flex items-center gap-2 mb-2">

          <User size={18} />

          <span>{request.contactPerson}</span>

        </div>

        <div className="flex items-center gap-2">

          <Phone size={18} />

          <span>{request.contactNumber}</span>

        </div>

      </div>

    </div>
  );
}
export default Enquiery;