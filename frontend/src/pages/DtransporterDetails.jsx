import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  User,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

export default function TransporterDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const transporter = state || {
    company: "Gosawami Logistics",
    owner: "Jitendra Gosawami",
    address: "Plot No. 27, Transport Nagar, MR-10 Road",
    city: "Indore, Madhya Pradesh",
    phone: "9111705787",
    email: "jitu@gmail.com",
    role: "Transporter",
  };

  const hidePhone = (phone) => phone.slice(0, 5) + "XXXXX";

  const hideEmail = (email) => {
    const [name, domain] = email.split("@");
    return name.substring(0, 4) + "***@" + domain;
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Banner */}

      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500">

        <div className="max-w-7xl mx-auto px-5 py-10">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white mb-8 hover:opacity-90"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">

            <div className="flex flex-col lg:flex-row justify-between gap-8">

              <div className="flex gap-6">

                <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center shadow-lg">
                  <Building2
                    size={50}
                    className="text-blue-600"
                  />
                </div>

                <div>

                  <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-white text-sm">

                    <ShieldCheck size={18} />

                    VERIFIED {transporter.role.toUpperCase()}

                  </span>

                  <h1 className="text-4xl md:text-5xl font-bold text-white mt-5">
                    {transporter.company}
                  </h1>

                  <div className="flex items-center gap-3 mt-4 text-white">

                    <User size={20} />

                    <span className="text-xl">
                      {transporter.owner}
                    </span>

                  </div>

                  <div className="flex items-center gap-2 mt-4">

                    <BadgeCheck
                      className="text-green-300"
                      size={20}
                    />

                    <span className="text-white">
                      Trusted Transport Partner
                    </span>

                  </div>

                </div>

              </div>

              <div className="flex flex-col justify-center">

                <div className="bg-white rounded-2xl p-6 shadow-xl">

                  <h2 className="font-bold text-xl mb-5">
                    Company Status
                  </h2>

                  <div className="space-y-4">

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Role
                      </span>

                      <span className="font-semibold text-blue-600">
                        {transporter.role}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Verification
                      </span>

                      <span className="text-green-600 font-semibold">
                        Verified
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Status
                      </span>

                      <span className="text-green-600 font-semibold">
                        Active
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-5 py-10">

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">
                    {/* Contact Information */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-8">
                Contact Information
              </h2>

              <div className="grid md:grid-cols-2 gap-8">

                <div className="flex gap-4">

                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <MapPin className="text-blue-600" size={22} />
                  </div>

                  <div>

                    <h4 className="font-semibold text-lg">
                      Address
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {transporter.address}
                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <MapPin className="text-green-600" size={22} />
                  </div>

                  <div>

                    <h4 className="font-semibold text-lg">
                      Location
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {transporter.city}
                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                    <Phone className="text-yellow-600" size={22} />
                  </div>

                  <div>

                    <h4 className="font-semibold text-lg">
                      Mobile Number
                    </h4>

                    <p className="text-gray-600 mt-1">
                      {hidePhone(transporter.phone)}
                    </p>

                    <p className="text-sm text-red-500 mt-1">
                      Register to view full mobile number.
                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                    <Mail className="text-red-600" size={22} />
                  </div>

                  <div>

                    <h4 className="font-semibold text-lg">
                      Email Address
                    </h4>

                    <p className="text-gray-600 mt-1 break-all">
                      {hideEmail(transporter.email)}
                    </p>

                    <p className="text-sm text-red-500 mt-1">
                      Register to unlock email address.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* About Company */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                About Company
              </h2>

              <p className="text-gray-600 leading-8">
                {transporter.company} is a verified transporter providing
                reliable logistics and transportation services across India.
                The company is committed to timely delivery, professional
                service, and customer satisfaction. Complete contact details
                become available after registration.
              </p>

            </div>
                      </div>

          {/* Right Sidebar */}

          <div className="space-y-8">

            {/* Quick Information */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                Quick Information
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">Company</span>
                  <span className="font-semibold text-right">
                    {transporter.company}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">Owner</span>
                  <span className="font-semibold text-right">
                    {transporter.owner}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">Role</span>
                  <span className="font-semibold text-blue-600">
                    {transporter.role}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500">City</span>
                  <span className="font-semibold">
                    {transporter.city}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className="text-green-600 font-semibold">
                    Active
                  </span>
                </div>

              </div>

            </div>

            {/* Business Statistics */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-6">
                Business Statistics
              </h2>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-slate-100 p-5 text-center">
                  <h3 className="text-3xl font-bold text-blue-600">
                    10+
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Years
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-100 p-5 text-center">
                  <h3 className="text-3xl font-bold text-blue-600">
                    500+
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Clients
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-100 p-5 text-center">
                  <h3 className="text-3xl font-bold text-blue-600">
                    PAN India
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Service
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-100 p-5 text-center">
                  <h3 className="text-3xl font-bold text-green-600">
                    ✓
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Verified
                  </p>
                </div>

              </div>

            </div>

            {/* Unlock Card */}

            <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white p-8 shadow-xl">

              <h2 className="text-2xl font-bold">
                Unlock Complete Details
              </h2>

              <p className="mt-4 leading-7 text-blue-100">
                Register now to view complete mobile number, email address,
                company profile and connect directly with this transporter.
              </p>

              <button
                onClick={() => navigate("/register")}
                className="mt-8 w-full bg-white text-blue-700 font-semibold py-4 rounded-xl hover:bg-slate-100 transition"
              >
                Register Now
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}