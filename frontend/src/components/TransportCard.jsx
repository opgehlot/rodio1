import {
  Building2,
  MapPin,
  Truck,
  Star,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

export function TransportCard({ item }) {
  
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border">
      {/* Header */}
      <div className="bg-blue-600 text-white p-5">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{item.company}</h2>

            <p className="flex items-center gap-2 text-blue-100 mt-1">
              <Building2 size={16} />
              {item.role}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
            <Star size={16} fill="currentColor" />
            <span>{item.rating}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-gray-500 text-sm">From</p>
            <h3 className="font-semibold">{item.from}</h3>
          </div>

          <ArrowRight className="text-blue-600" />

          <div className="text-right">
            <p className="text-gray-500 text-sm">To</p>
            <h3 className="font-semibold">{item.to}</h3>
          </div>
        </div>

        <hr />

        <div className="space-y-3 mt-5">
          <div className="flex items-center gap-3">
            <Truck className="text-blue-600" size={18} />
            <span>{item.vehicle}</span>
          </div>

          <div className="flex items-center gap-3">
            <BadgeCheck className="text-green-600" size={18} />
            <span>Verified Company</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="text-red-500" size={18} />
            <span>{item.from} → {item.to}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-xl">
            View Profile
          </button>

          <button className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-xl">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}