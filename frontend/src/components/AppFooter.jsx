import { Link } from "react-router-dom";
import {
  Truck,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function AppFooter() {
  return (
    <>
    <div className="-mb-1 overflow-hidden">
  <svg
    viewBox="0 0 1440 320"
    className="w-full h-28 md:h-36"
    preserveAspectRatio="none"
  >
    <path
      fill="#1E3A8A"
      fillOpacity="0.4"
      d="M0,224L80,202.7C160,181,320,139,480,144C640,149,800,203,960,208C1120,213,1280,171,1360,149.3L1440,128L1440,320L0,320Z"
    />

    <path
      fill="#020617"
      d="M0,256L80,245.3C160,235,320,213,480,197.3C640,181,800,171,960,186.7C1120,203,1280,245,1360,266.7L1440,288L1440,320L0,320Z"
    />
  </svg>
</div>
   <footer className="bg-gradient-to-r from-slate-950 via-blue-950 to-black text-white pt-20 pb-12">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left */}

          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                <Truck className="text-white" />
              </div>

              <h2 className="text-3xl font-bold">
                Rodio
              </h2>

            </div>

            <p className="mt-5 text-gray-300 leading-8 max-w-md">
              India's Smart Transport Platform connecting
              customers, transporters, brokers and logistics
              companies on one trusted network.
            </p>

          </div>

          {/* Right */}

          <div className="grid grid-cols-2 gap-8">

            {/* Column 1 */}

            <div className="space-y-3">

              <Link
                to="/"
                className="flex items-center gap-2 hover:text-yellow-400 transition"
              >
                <ArrowRight size={16} />
                Home
              </Link>

              <Link
                to="/about"
                className="ml-6 hover:text-yellow-400 transition"
              >
                About
              </Link>

              <Link
                to="/services"
                className="hover:text-yellow-400 transition"
              >
                Services
              </Link>

              <Link
                to="/search"
                className="ml-6 hover:text-yellow-400 transition"
              >
                Search Transport
              </Link>

              <Link
                to="/contact"
                className="hover:text-yellow-400 transition"
              >
                Contact
              </Link>

            </div>

            {/* Column 2 */}

            <div className="space-y-3">

              <Link
                to="/register"
                className="ml-6 hover:text-yellow-400 transition"
              >
                Become Transporter
              </Link>

              <Link
                to="/broker"
                className="hover:text-yellow-400 transition"
              >
                Become Broker
              </Link>

              <Link
                to="/customer"
                className="ml-6 hover:text-yellow-400 transition"
              >
                Ship with Rodio
              </Link>

              <Link
                to="/privacy"
                className="hover:text-yellow-400 transition"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="ml-6 hover:text-yellow-400 transition"
              >
                Terms & Conditions
              </Link>

            </div>

          </div>

        </div>

        {/* Contact */}

        <div className="border-t border-gray-700 mt-8 pt-6">

          <div className="flex flex-col md:flex-row justify-between gap-5 text-sm">

            <Link
              to="/contact"
              className="flex items-center gap-2 hover:text-yellow-400"
            >
              <Mail size={16} />
              rodiotransport@gmail.com
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-2 hover:text-yellow-400"
            >
              <Phone size={16} />
              +91 8319501708
            </Link>

            <Link
              to="/contact"
              className="flex items-center gap-2 hover:text-yellow-400"
            >
              <MapPin size={16} />
              Indore, Madhya Pradesh
            </Link>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-gray-800 mt-6 pt-5 text-center text-sm text-gray-400">

          © {new Date().getFullYear()} Rodio Transport System.
          All Rights Reserved.

        </div>

      </div>

    </footer>
    </>
  );
}