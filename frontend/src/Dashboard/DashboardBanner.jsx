import { ArrowRight, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export  function DashboardBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-600 text-white p-8 lg:p-12">

      {/* Background Circle */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full"></div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">

        {/* Left */}

        <div className="max-w-2xl">

          <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm mb-5">
            🚚 India's Smart Transport Platform
          </span>

          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            Welcome to
            <br />
            <span className="text-yellow-300">
              Rodio TradLink
            </span>
          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-8">
            Connect with trusted transporters, brokers and logistics
            companies across India. Create transport requests, manage
            bookings and grow your business with Rodio TradLink.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">

            <Link
              to="/dashboard/userform"
              className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
            >
              Create Request
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/dashboard/searchtransport"
              className="border border-white hover:bg-white hover:text-blue-700 transition px-6 py-3 rounded-xl font-semibold"
            >
              Search Transport
            </Link>

          </div>

        </div>

        {/* Right */}

        <div className="hidden lg:flex">

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">

            <Truck
              size={140}
              className="text-yellow-300"
            />

            <h3 className="text-2xl font-bold mt-4 text-center">
              Rodio TradLink
            </h3>

            <p className="text-center text-blue-100 mt-2">
              Fast • Secure • Reliable
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
export default DashboardBanner;