import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Camera,
} from "lucide-react";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full bg-gray-100 min-h-screen">

      {/* Cover Banner */}

      <div className="relative overflow-hidden rounded-2xl bg-[url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1600')] bg-cover bg-center">

        {/* Overlay */}

        <div className="bg-black/65">

          <div className="flex flex-wrap items-center gap-10 px-8 py-10">

            {/* Profile Image */}

            <div className="relative">

              <img
                src={
                  user?.profileImage ||
                  `https://ui-avatars.com/api/?name=${user?.name}&background=2563eb&color=fff&size=256`
                }
                alt="Profile"
                className="w-28 h-28 rounded-xl border-4 border-white object-cover"
              />

              <button className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-full text-white shadow-lg">
                <Camera size={18} />
              </button>

            </div>

            {/* Name */}

            <div>

              <h1 className="text-3xl font-bold text-white">
                {user?.name}
              </h1>

              <p className="text-gray-300 mt-1 capitalize">
                {user?.role}
              </p>

            </div>

            {/* Mobile */}

            <div>

              <p className="text-gray-300 text-sm">
                Phone Number
              </p>

              <div className="flex items-center gap-2 text-white mt-1">

                <Phone size={18} />

                <span>{user?.mobile}</span>

              </div>

            </div>

            {/* Email */}

            <div>

              <p className="text-gray-300 text-sm">
                Email
              </p>

              <div className="flex items-center gap-2 text-white mt-1">

                <Mail size={18} />

                <span>{user?.email}</span>

              </div>

            </div>

            {/* Location */}

            <div>

              <p className="text-gray-300 text-sm">
                Location
              </p>

              <div className="flex items-center gap-2 text-white mt-1">

                <MapPin size={18} />

                <span>India</span>

              </div>

            </div>

            {/* Status */}

            <div>

              <p className="text-gray-300 text-sm">
                Account
              </p>

              <div className="flex items-center gap-2 text-green-300 mt-1">

                <ShieldCheck size={18} />

                <span>Verified</span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Extra Details */}

      {user?.role === "transporter" && (
        <div className="mt-8 bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            Business Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div>
              <p className="text-gray-500">Company Name</p>
              <h3 className="font-semibold">
                {user?.companyName || "Not Available"}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">GST Number</p>
              <h3 className="font-semibold">
                {user?.gstNumber || "Not Available"}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Address</p>
              <h3 className="font-semibold">
                {user?.address || "Not Available"}
              </h3>
            </div>

          </div>

        </div>
      )}

      {user?.role === "broker" && (
        <div className="mt-8 bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">
            Agency Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500">Agency Name</p>
              <h3 className="font-semibold">
                {user?.agencyName || "Not Available"}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Office Address</p>
              <h3 className="font-semibold">
                {user?.officeAddress || "Not Available"}
              </h3>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}