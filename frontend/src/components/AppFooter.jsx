import { Link } from "react-router-dom";
import { Truck, Mail, Phone, MapPin, ArrowRight } from "lucide-react";

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

                <h2 className="text-3xl font-bold">Rodio</h2>
              </div>

              <p className="mt-5 text-gray-300 leading-8 max-w-md">
                India's Smart Transport Platform connecting customers,
                transporters, brokers and logistics companies on one trusted
                network.
              </p>
            </div>

            {/* Right */}

            <div className="flex gap-35">
              {/* First Column */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-white">
                  Quick Links
                </h3>

                <ul className="space-y-3 text-gray-300">
                  <li>Home</li>
                  <li>About</li>
                  <li>Services</li>
                  <li>Search Transport</li>
                  <li>Contact</li>
                </ul>
              </div>

              {/* Second Column */}
              <div>
                <h3 className="text-white text-xl font-semibold mb-4">
                  Policies
                </h3>

                <div className="flex flex-col gap-3">
                  <Link
                    to="/termscondition"
                    className="text-gray-300 hover:text-blue-400"
                  >
                    Terms & Conditions
                  </Link>

                  <Link
                    to="/refundpolicy"
                    className="text-gray-300 hover:text-blue-400"
                  >
                    Refund Policy
                  </Link>

                  <Link
                    to="/contectus"
                    className="text-gray-300 hover:text-blue-400"
                  >
                    Contact Us
                  </Link>

                  <Link
                    to="/privaceypolicy"
                    className="text-gray-300 hover:text-blue-400"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-white">Company</h3>

              <ul className="space-y-3 text-gray-300">
                <li>Become Transporter</li>
                <li>Become Broker</li>
                <li>Ship with Rodio</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            <div>
              {/* Column 2 */}

              <div className="border-t border-gray-700 mt-10 pt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <Mail size={18} className="text-white" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white break-all">
                        rodiotransport@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <Phone size={18} className="text-white" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white">+91 8319501708</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <MapPin size={18} className="text-white" />
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Address</p>
                      <p className="text-white">Indore, Madhya Pradesh</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Meet Our Developers */}
            </div>
          </div>

          {/* Contact */}

          {/* Bottom */}

          <div className="border-t border-gray-800 mt-6 pt-5 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} RODIO. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
