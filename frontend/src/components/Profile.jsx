import { User, Mail, Phone, ShieldCheck } from "lucide-react";

export  function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className=" mt-20 min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          My Profile
        </h1>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 h-40 relative">

            <div className="absolute left-8 -bottom-14">

              <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center shadow-lg border-4 border-white">

                <User size={60} className="text-blue-700" />

              </div>

            </div>

          </div>

          {/* Body */}
          <div className="pt-20 pb-8 px-8">

            <h2 className="text-2xl font-bold text-gray-800">
              {user.name || "No Name"}
            </h2>

            <p className="text-gray-500 capitalize">
              {user.role || "User"}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              {/* Email */}
              <div className="border rounded-xl p-5 flex items-center gap-4">

                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="text-blue-700" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold">
                    {user.email || "Not Available"}
                  </p>
                </div>

              </div>

              {/* Mobile */}
              <div className="border rounded-xl p-5 flex items-center gap-4">

                <div className="bg-green-100 p-3 rounded-full">
                  <Phone className="text-green-700" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Mobile</p>
                  <p className="font-semibold">
                    {user.mobile || "Not Available"}
                  </p>
                </div>

              </div>

              {/* Role */}
              <div className="border rounded-xl p-5 flex items-center gap-4">

                <div className="bg-purple-100 p-3 rounded-full">
                  <ShieldCheck className="text-purple-700" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-semibold capitalize">
                    {user.role || "User"}
                  </p>
                </div>

              </div>

              {/* Status */}
              <div className="border rounded-xl p-5 flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">

                  <div className="w-4 h-4 rounded-full bg-green-500"></div>

                </div>

                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <p className="font-semibold text-green-600">
                    Active
                  </p>
                </div>

              </div>

            </div>

            {/* Button */}
            <div className="mt-10">

              <button
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl transition"
              >
                Edit Profile
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
export default Profile