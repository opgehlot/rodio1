import { Link } from "react-router-dom";
import {
  Truck,
  MapPin,
  Mail,
  Phone,
  MessageCircle, // Using MessageCircle for WhatsApp
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  // Social media links configuration
  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      url: "https://www.facebook.com/people/Rodio-Tradelink/61555783336993/",
      color: "text-blue-600",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/rodiotradelink/",
      color: "text-pink-600",
    },
    {
      name: "X",
      icon: FaXTwitter,
      url: "https://x.com/rodiotradelink",
      color: "text-gray-800",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/company/rodio-tradelink/",
      color: "text-blue-700",
    },
    {
      name: "WhatsApp Group",
      icon: MessageCircle,
      url: "https://chat.whatsapp.com/F2j64qVFR3L90s52vUv3cR",
      color: "text-green-500",
    },
  ];

  return (
    <>
      <footer className="bg-gray-100 text-gray-700 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-800">Rodio</h2>
              </div>
              <p className="mt-2 text-gray-600 leading-7 text-sm">
                India's Smart Transport Platform connecting transporters,
                brokers and customers across India with trusted logistics
                solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-gray-800 text-xl mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link
                    to="/" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    Search Transport
                  </Link>
                </li>
                <li>
                  <Link
                    to="/queryform" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="font-semibold text-gray-800 text-xl mb-4">
                Policies
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link
                    to="/termscondition" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refundpolicy" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privaceypolicy" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-gray-800 text-xl mb-4">
                Company
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <Link
                    to="/register" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    Become Transporter
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    Become Broker
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    Ship with Rodio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login" 
                    className="hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Social Section Combined */}
          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col lg:flex-row justify-between gap-8">
             {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-base break-all font-medium text-gray-800">
                    support.rodiotradelink@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-base font-medium text-gray-800">
                    +91 9993738255
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-base font-medium text-gray-800">
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-col items-center lg:items-end gap-3">
              <p className="text-base font-medium text-gray-800">Follow Us</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300 ring-1 ring-gray-200"
                      aria-label={link.name}
                    >
                      <Icon className={`w-6 h-6 ${link.color}`} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-gray-800">RODIO Tradelink</span>
              . All Rights Reserved.
            </p>
            <p className="text-sm text-gray-500 text-center">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}