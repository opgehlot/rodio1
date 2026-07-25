import {
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function DirectoryCard({ business, isLoggedIn }) {
  const navigate = useNavigate();

  // Mask Phone
  const maskedPhone = business.phoneNumber
    ? `${business.phoneNumber.slice(0, 5)}XXXXX`
    : "";

  // Mask Email
  const maskedEmail = business.email
    ? business.email.replace(/^(.{2}).*(@.*)$/, "$1*****$2")
    : "";

  // Call Handler
  const handleCall = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate("/login");
    }
  };

  // View Details Handler
  const handleViewDetails = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <Truck size={24} />
              <h2 className="text-2xl font-bold">
                {business.firmName}
              </h2>
            </div>

            <p className="text-blue-100 mt-2">
              {business.category}
            </p>
          </div>

          <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <BadgeCheck size={15} />
            Verified
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Route */}
        <div className="grid grid-cols-3 items-center mb-6">
          <div>
            <p className="text-xs text-gray-500">Pickup</p>

            <h3 className="font-bold text-lg">
              {business.from}
            </h3>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="text-blue-600" size={30} />
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">
              Destination
            </p>

            <h3 className="font-bold text-lg">
              {business.to}
            </h3>
          </div>
        </div>

        {/* Vehicle & Location */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-gray-50 rounded-2xl p-4">
            <Truck className="text-blue-600 mb-2" size={18} />

            <p className="text-xs text-gray-500">
              Vehicles
            </p>

            <h3 className="font-semibold mt-1">
              {business.vehicleTypes?.join(", ")}
            </h3>
          </div>

          <div className="bg-gray-50 rounded-2xl p-4">
            <MapPin className="text-red-500 mb-2" size={18} />

            <p className="text-xs text-gray-500">
              Location
            </p>

            <h3 className="font-semibold mt-1">
              {business.currentCity}
            </h3>
          </div>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="flex gap-3">
            <Phone className="text-green-600 mt-1" size={20} />

            <div>
              <p className="text-xs text-gray-500">
                Contact
              </p>

              <p className="font-semibold">
                {isLoggedIn
                  ? business.phoneNumber
                  : maskedPhone}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Mail className="text-orange-500 mt-1" size={20} />

            <div>
              <p className="text-xs text-gray-500">
                Email
              </p>

              <p className="font-semibold break-all">
                {isLoggedIn
                  ? business.email
                  : maskedEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-xs text-gray-500">
            Address
          </p>

          <p className="font-medium text-gray-700 mt-1">
            {business.address}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-5 flex gap-4">
        <a
          href={
            isLoggedIn
              ? `tel:${business.phoneNumber}`
              : "#"
          }
          onClick={handleCall}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-center font-semibold transition"
        >
          📞 {isLoggedIn ? "Call" : "Login to Call"}
        </a>

        <Link
          to={`/dashboard/transporter/${business._id}`}
          onClick={handleViewDetails}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center font-semibold transition"
        >
          {isLoggedIn
            ? "View Details"
            : "Login to View"}
        </Link>
      </div>
    </div>
  );
}

export default DirectoryCard;