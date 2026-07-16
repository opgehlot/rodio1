import {
  Phone,
  Mail,
  MapPin,
  Building2,
  User,
  ArrowRight,
} from "lucide-react";
        import { Link } from "react-router-dom";

function DirectoryCard({ business }) {
  return ( 
    
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Header */}
      <div className="p-6 border-b">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center">
            <Building2 className="text-gray-700" size={28} />
          </div>

          <div className="flex-1">

            <h2 className="text-xl font-bold text-blue-600 dark:text-sky-600">
              {business.firmName}
            </h2>

            <p className=" text-blue-600 dark:text-sky-600 flex items-center gap-2 mt-1">
              <User size={16} />
              {business.ownerName}
            </p>

          </div>

          <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-blue-600 dark:text-sky-600">
            {business.category}
          </span>

        </div>

      </div>

      {/* Body */}

      <div className="p-6 space-y-5">

        <div className="flex gap-3">

          <MapPin className="  text-blue-600 dark:text-sky-600 text-gray-500 mt-1" size={18} />

          <div>
            <p className="text-sm font-semibold text-gray-700">
              Address
            </p>
            <p className="text-gray-500 text-sm">
              {business.address}
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <MapPin className="  text-blue-600 dark:text-sky-600 text-gray-500 mt-1" size={18} />

          <div>
            <p className="text-sm font-semibold text-gray-700">
              Location
            </p>
            <p className="text-gray-500 text-sm">
              {business.currentCity}, {business.currentState}
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <Phone className=" text-blue-600 dark:text-sky-600 text-gray-500 mt-1" size={18} />

          <div>
            <p className="  text-blue-600 text-sm font-semibold text-gray-700">
              Phone
            </p>
            <p className="text-gray-500 text-sm">
              {business.phoneNumber}
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <Mail className="text-gray-500 mt-1  text-blue-600 dark:text-sky-600" size={18} />

          <div>
            <p className=" text-sm font-semibold text-gray-700">
              Email
            </p>
            <p className="text-gray-500 text-sm break-all">
              {business.email}
            </p>
          </div>

        </div>

      </div>

      {/* Footer */}

      <div className=" border-t p-5">



<Link to={`/dashboard/transporter/${business._id}`}>
  View More
</Link>
      </div>

    </div>
  );
}

export default DirectoryCard;