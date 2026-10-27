// import { Link } from "react-router-dom";
// import { FaWhatsapp } from "react-icons/fa";
// import {
//   Truck,
//   MapPin,
//   Mail,
//   Phone,
//   MessageCircle, // Using MessageCircle for WhatsApp
// } from "lucide-react";
// import {
//   FaFacebook,
//   FaInstagram,
//   FaLinkedin,
//   FaXTwitter,
// } from "react-icons/fa6";

// export default function Footer() {
//   // Social media links configuration
//   const socialLinks = [
//     {
//       name: "Facebook",
//       icon: FaFacebook,
//       url: "https://www.facebook.com/people/Rodio-Tradelink/61555783336993/",
//       color: "text-blue-600",
//     },
//     {
//       name: "Instagram",
//       icon: FaInstagram,
//       url: "https://www.instagram.com/rodiotradelink/",
//       color: "text-pink-600",
//     },
//     {
//       name: "X",
//       icon: FaXTwitter,
//       url: "https://x.com/rodiotradelink",
//       color: "text-gray-800",
//     },
//     {
//       name: "LinkedIn",
//       icon: FaLinkedin,
//       url: "https://www.linkedin.com/company/rodio-tradelink/",
//       color: "text-blue-700",
//     },
//    {
//   name: "WhatsApp Group",
//   icon: FaWhatsapp,
//   url: "https://chat.whatsapp.com/DoIcWaIOFPz7qGTssjOm9g?s=sh&p=a&ilr=1",
//   color: "text-green-500",
// },
//   ];

//   return (
//     <>
//       <footer className="bg-gray-100 text-gray-700 border-t border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
//           <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
//             {/* Logo */}
//             <div>
//               <div className="flex items-center gap-3">
//                 {/* <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
//                   <Truck className="w-6 h-6 text-white" />
//                 </div> */}
//                <h2 className="text-2xl font-bold text-gray-800"><i>
//    Welcome To Rodio <span className="text-orange-500">Tradelink</span></i>
// </h2>
//               </div>
//               <p className="mt-2 text-gray-600 leading-7 text-[15px">
//                 <i>
//                 "India's Smart Transport Platform connecting transporters,
//                 brokers and customers across India with trusted logistics
//                 solutions."</i>
//               </p>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h3 className="font-semibold text-gray-800 text-xl mb-4">
//                 Quick Links
//               </h3>
//               <ul className="space-y-2 text-gray-600">
//                 <li>
//                   <Link
//                     to="/" 
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/about" 
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     About
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/services" 
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     Services
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/register" 
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     Search Transport
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/queryform" 
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     Contact Us
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             {/* Policies */}
//             <div>
//               <h3 className="font-semibold text-gray-800 text-xl mb-4">
//                 Policies
//               </h3>
//               <ul className="space-y-2 text-gray-600">
//                 <li>
//                   <Link
//                     to="/termscondition" 
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     Terms & Conditions
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/refundpolicy" 
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     Refund Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/privaceypolicy" 
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </li>
//               </ul>
//             </div>




//             {/* Company */}
//             <div>
//               <h3 className="font-semibold text-gray-800 text-xl mb-4">
//                 Company
//               </h3>
//               <ul className="space-y-2 text-gray-600">
//                 <li>
                  
//                     Become Transporter
           
//                 </li>
//                 <li>
//                   {/* <Link
//                     to="/register" 
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     Become Broker
//                   </Link> */}
//                 </li>
//                 <li>
                 
//                     Ship with Rodio
             
//                 </li>
//                 <li>
//                   <Link
//                     to="/login" 
//                     className="hover:text-blue-600 transition-colors"
//                   >
//                     Login
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           {/* Contact & Social Section Combined */}
//           <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col lg:flex-row justify-between gap-8">
//              {/* Contact Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
//                   <Mail size={18} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Email</p>
//                   <p className="text-base break-all font-medium text-gray-800">
//                     support.rodiotradelink@gmail.com
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
//                   <Phone size={18} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Phone</p>
//                   <p className="text-base font-medium text-gray-800">
//                     +91 9993738255,  +91 8319501708
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 md:col-span-2">
//                 <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
//                   <MapPin size={18} />
//                 </div>
//                 <div>
//                   <p className="text-sm text-gray-500">Address</p>
//                   <p className="text-base font-medium text-gray-800">
//                     EA-60, Scheme 94,Ring Road Indore 
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Social Media Links */}
//             <div className="flex flex-col items-center lg:items-end gap-3">
//               <p className="text-base font-medium text-gray-800">Follow Us</p>
//               <div className="flex items-center gap-3">
//                 {socialLinks.map((link) => {
//                   const Icon = link.icon;
//                   return (
//                     <a
//                       key={link.name}
//                       href={link.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="p-3.5 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-all duration-300 ring-1 ring-gray-200"
//                       aria-label={link.name}
//                     >
//                       <Icon className={`w-6 h-6 ${link.color}`} />
//                     </a>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Bottom */}
//           <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
//             <p className="text-sm text-gray-500 text-center md:text-left">
//               © {new Date().getFullYear()}{" "}
//               <span className="font-semibold text-gray-800">RODIO Tradelink</span>
//               . All Rights Reserved.
//             </p>
//             <p className="text-sm text-gray-500 text-center">
//               Made with ❤️ in India
//             </p>
//           </div>
//         </div>
//       </footer>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import {
  Truck,
  ChevronRight,
  ArrowUp,
} from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
      icon: FaWhatsapp,
      url: "https://chat.whatsapp.com/DoIcWaIOFPz7qGTssjOm9g?s=sh&p=a&ilr=1",
      color: "text-green-500",
    },
  ];

  const quickLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Services", to: "/services" },
    // { label: "Search Transport", to: "/transportsearch" },
    { label: "Contact Us", to: "/queryform" },
  ];

  const policyLinks = [
    { label: "Terms & Conditions", to: "/termscondition" },
    { label: "Refund Policy", to: "/refundpolicy" },
    { label: "Privacy Policy", to: "/privaceypolicy" },
  ];


  const LinkList = ({ title, items }) => (
    <div>
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <span className="block mt-2 mb-5 h-1 w-12 rounded-full bg-orange-500" />
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              className="group flex items-center gap-1 text-lg font-medium text-gray-600 hover:text-orange-500 transition-colors duration-200"
            >
              <ChevronRight
                size={18}
                className="text-orange-400 transition-transform duration-200 group-hover:translate-x-1"
              />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );


  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200">
      {/* Truck animation styles */}
      <style>{`
        @keyframes rodio-truck-drive {
          0%   { transform: translateX(-120px); }
          100% { transform: translateX(calc(100vw + 120px)); }
        }
        @keyframes rodio-truck-bounce {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2px); }
        }
        @keyframes rodio-road-move {
          from { background-position: 0 0; }
          to   { background-position: -48px 0; }
        }
        @keyframes rodio-blink {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(249, 115, 22, 0.7); }
          50%      { opacity: 0.55; box-shadow: 0 0 0 14px rgba(249, 115, 22, 0); }
        }
        .rodio-top-btn {
          animation: rodio-blink 1.2s ease-in-out infinite;
        }
        .rodio-truck {
          animation: rodio-truck-drive 9s linear infinite;
        }
        .rodio-truck-body {
          animation: rodio-truck-bounce 0.5s ease-in-out infinite;
        }
        .rodio-road {
          background-image: repeating-linear-gradient(
            to right,
            #fb923c 0,
            #fb923c 24px,
            transparent 24px,
            transparent 48px
          );
          background-size: 48px 2px;
          background-repeat: repeat-x;
          background-position: 0 0;
          animation: rodio-road-move 0.8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .rodio-truck, .rodio-truck-body, .rodio-road, .rodio-top-btn { animation: none; }
          .rodio-truck { transform: translateX(20px); }
        }
      `}</style>

      {/* Back to top button */}
      {showTop && (
       <button
  onClick={scrollToTop}
  aria-label="Back to top"
  className="rodio-top-btn fixed bottom-40 right-6 z-50 flex h-14 w-auto items-center justify-center gap-2 rounded-full bg-orange-500 px-4 text-white shadow-lg transition-colors hover:bg-orange-600"
>
  <ArrowUp size={24} strokeWidth={2.5} />
  <span className="text-sm font-bold">Top</span>
</button>
      )}

      {/* Truck road */}
      <div className="relative h-14 overflow-hidden bg-orange-50 border-b border-orange-100">
        <div className="rodio-truck absolute bottom-3 left-0">
          <div className="rodio-truck-body">
            <Truck className="w-10 h-10 text-orange-500" strokeWidth={1.8} />
          </div>
        </div>
        <div className="rodio-road absolute bottom-2 left-0 right-0 h-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-12 pb-8">
        {/* Row 1: Brand + link columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand + tagline + social */}
          <div className="sm:col-span-2 lg:col-span-5">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Rodio <span className="text-orange-500">Tradelink</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 leading-8">
              India's Smart Transport Platform connecting transporters, brokers
              and customers across India with trusted logistics solutions.
            </p>

            <p className="mt-6 mb-3 text-lg font-semibold text-gray-900">
              Follow Us
            </p>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-white rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ring-1 ring-gray-200"
                    aria-label={link.name}
                  >
                    <Icon className={`w-6 h-6 ${link.color}`} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <LinkList title="Quick Links" items={quickLinks} />
          </div>
          <div className="lg:col-span-4">
            <LinkList title="Policies" items={policyLinks} />
          </div>
        </div>


        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-base text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-gray-900">RODIO Tradelink</span>.
            All Rights Reserved.
          </p>
          <p className="text-base text-gray-600 text-center">
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}