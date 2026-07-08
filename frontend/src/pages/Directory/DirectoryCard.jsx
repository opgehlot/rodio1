import {

  Phone,

  Mail,

  MapPin,

} from "lucide-react";

function DirectoryCard({ business }) {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full">

        {business.category}

      </span>

      <h2 className="text-2xl font-bold mt-4">

        {business.firmName}

      </h2>

      <p className="text-gray-500">

        {business.ownerName}

      </p>

      <div className="mt-5 space-y-3">

        <p className="flex gap-2">

          <MapPin size={18} />

          {business.address}

        </p>

        <p className="flex gap-2">

          <MapPin size={18} />

          {business.currentCity}, {business.currentState}

        </p>

        <p className="flex gap-2">

          <Phone size={18} />

          {business.phoneNumber}

        </p>

        <p className="flex gap-2">

          <Mail size={18} />

          {business.email}

        </p>

      </div>

    </div>

  );

}

export default DirectoryCard;