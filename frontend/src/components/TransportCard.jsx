import {
  Building2,
  User,
  MapPin,
  Truck,
  Phone,
  Mail,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

export function TransportCard({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-5">
        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold">
              {item.firmName}
            </h2>

            <p className="flex items-center gap-2 mt-2 text-blue-100">
              <Building2 size={18} />
              {item.category}
            </p>
          </div>

          <div className="bg-white/20 px-3 py-2 rounded-full">
            <BadgeCheck size={24} className="text-green-300" />
          </div>

        </div>
      </div>

      {/* Body */}
      <div className="p-6">

        {/* Owner */}
        <div className="flex items-center gap-3 mb-4">
          <User className="text-blue-600" />
          <div>
            <p className="text-gray-500 text-sm">Owner</p>
            <p className="font-semibold">{item.ownerName}</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4 mb-5">

          <div>
            <p className="text-xs text-gray-500">From</p>
            <p className="font-bold">{item.from}</p>
          </div>

          <ArrowRight className="text-blue-600" />

          <div className="text-right">
            <p className="text-xs text-gray-500">To</p>
            <p className="font-bold">{item.to}</p>
          </div>

        </div>

        {/* Vehicle */}
        <div className="flex items-start gap-3 mb-4">
          <Truck className="text-blue-600 mt-1" />
          <div>
            <p className="text-gray-500 text-sm">Vehicle Types</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {item.vehicleTypes?.map((vehicle) => (
                <span
                  key={vehicle}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {vehicle}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="text-red-500 mt-1" />
          <div>
            <p className="text-gray-500 text-sm">Location</p>

            <p>
              {item.address}
            </p>

            <p className="text-sm text-gray-500">
              {item.currentCity}, {item.currentState}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 mb-3">
          <Phone className="text-green-600" />
          <span>{item.phoneNumber}</span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3 mb-6">
          <Mail className="text-blue-600" />
          <span>{item.email}</span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">

          <a
            href={`tel:${item.phoneNumber}`}
            className="text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
          >
            Call Now
          </a>

          <a
            href={`mailto:${item.email}`}
            className="text-center border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-semibold"
          >
            Email
          </a>

        </div>

      </div>
    </div>
  );
}
export default TransportCard;