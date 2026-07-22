import { Link } from "react-router-dom";
import { Truck, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Wave */}

      <div className="overflow-hidden">
        <svg
          viewBox="0 0 1440 220"
          className="w-full h-16 md:h-28"
          preserveAspectRatio="none"
        >
          <path
            fill="#1E3A8A"
            fillOpacity="0.35"
            d="M0,160L120,154.7C240,149,480,139,720,144C960,149,1200,171,1320,181.3L1440,192L1440,320L0,320Z"
          />

          <path
            fill="#020617"
            d="M0,190L120,176C240,160,480,128,720,133.3C960,139,1200,181,1320,202.7L1440,224L1440,320L0,320Z"
          />
        </svg>
      </div>

      <footer className="bg-gradient-to-r from-slate-950 via-blue-950 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
            {/* Logo */}

            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>

                <h2 className="text-3xl font-bold">Rodio</h2>
              </div>

              <p className="mt-2 text-gray-300 leading-7 text-sm">
                India's Smart Transport Platform connecting transporters,
                brokers and customers across India with trusted logistics
                solutions.
              </p>
            </div>

            {/* Quick Links */}

            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>

              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link to="/" className="hover:text-blue-400">
                    Home
                  </Link>
                </li>

                <li>
                  <Link to="/about" className="hover:text-blue-400">
                    About
                  </Link>
                </li>

                <li>
                  <Link to="/services" className="hover:text-blue-400">
                    Services
                  </Link>
                </li>

                <li>
                  <Link to="/register" className="hover:text-blue-400">
                    Search Transport
                  </Link>
                </li>

                <li>
                  <Link to="/queryform" className="hover:text-blue-400">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies */}

            <div>
              <h3 className="font-semibold text-lg mb-4">Policies</h3>

              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link to="/termscondition" className="hover:text-blue-400">
                    Terms & Conditions
                  </Link>
                </li>

                <li>
                  <Link to="/refundpolicy" className="hover:text-blue-400">
                    Refund Policy
                  </Link>
                </li>

                <li>
                  <Link to="/privaceypolicy" className="hover:text-blue-400">
                    Privacy Policy
                  </Link>
                </li>

                <li>
                  <Link to="/queryform" className="hover:text-blue-400">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            {/* Company */}

            <div>
              <h3 className="font-semibold text-lg mb-4">Company</h3>

              <ul className="space-y-2 text-gray-300">
                <li>
                  <Link to="/register" className="hover:text-blue-400">
                    Become Transporter
                  </Link>
                </li>

                <li>
                  <Link to="/register" className="hover:text-blue-400">
                    Become Broker
                  </Link>
                </li>

                <li>
                  <Link to="/register" className="hover:text-blue-400">
                    Ship with Rodio
                  </Link>
                </li>

                <li>
                  <Link to="/login" className="hover:text-blue-400">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}

          <div className="border-t border-slate-800 mt-3 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Email</p>

                  <p className="text-sm break-all">rodiotransport@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <Phone size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Phone</p>

                  <p className="text-sm">+91 8319501708</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">Address</p>

                  <p className="text-sm">Indore, Madhya Pradesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}

          <div className="border-t border-slate-800 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-white">RODIO</span>. All
              Rights Reserved.
            </p>

            <p className="text-xs text-gray-500 text-center">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
