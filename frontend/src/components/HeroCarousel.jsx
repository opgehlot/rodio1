// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { Carousel as FlowbiteCarousel } from "flowbite-react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// // ==========================================
// // 1. DESKTOP IMAGES (Laptop / PC ke liye)
// // ==========================================
// import desktopSlide1 from "../assets/newimg.png";
// import desktopSlide2 from "../assets/newimg.png";

// // ==========================================
// // 2. MOBILE IMAGES (Mobile ke liye)
// // ==========================================
// import mobileSlide1 from "../assets/newimg.png";
// import mobileSlide2 from "../assets/newimg.png";

// // Flowbite Carousel ki default image rounding hatane ke liye custom theme
// const customCarouselTheme = {
//   root: {
//     base: "relative h-full w-full rounded-none overflow-hidden",
//     leftControl: "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
//     rightControl: "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none"
//   },
//   item: {
//     base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 rounded-none",
//     wrapper: {
//       off: "w-full flex-shrink-0 transform cursor-default snap-center rounded-none",
//       on: "w-full flex-shrink-0 transform cursor-grab snap-center rounded-none"
//     }
//   },
//   scrollContainer: {
//     base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none",
//     snap: "snap-x"
//   }
// };

// export function HeroCarousel({ setActiveTab }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // लॉगिन / लॉगआउट स्टेटस चेक
//   useEffect(() => {
//     const checkAuthStatus = () => {
//       const token =
//         localStorage.getItem("token") ||
//         localStorage.getItem("user") ||
//         localStorage.getItem("authToken");
//       setIsLoggedIn(!!token);
//     };

//     checkAuthStatus();
//     window.addEventListener("storage", checkAuthStatus);
//     window.addEventListener("authChange", checkAuthStatus);

//     return () => {
//       window.removeEventListener("storage", checkAuthStatus);
//       window.removeEventListener("authChange", checkAuthStatus);
//     };
//   }, [location]);

//   // स्क्रॉल हैंडलर
//   const handleScroll = (tab) => {
//     setActiveTab(tab);
//     setTimeout(() => {
//       document.getElementById("dynamic-home")?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }, 100);
//   };

//   // Add Load के लिए लॉगिन चेक
//   const handlePostLoad = () => {
//     const token =
//       localStorage.getItem("token") ||
//       localStorage.getItem("user") ||
//       localStorage.getItem("authToken");

//     if (token) {
//       navigate("/dashboard/userform");
//     } else {
//       navigate("/register", {
//         state: { returnTo: "/dashboard/userform" },
//       });
//     }
//   };

//   return (
//     <section className="w-full pt-18 sm:pt-18 overflow-hidden">

//       {/* ######################################################################### */}
//       {/* 💻 1. DESKTOP / LAPTOP HERO SECTION (Screen size >= 640px)                */}
//       {/* ######################################################################### */}
//       <div className="hidden sm:block w-full h-[calc(100vh-64px)] relative">
//         <FlowbiteCarousel
//           theme={customCarouselTheme}
//           slideInterval={5000}
//           indicators={false}
//           className="rounded-none"
//         >
//           {/* ----- Desktop Slide 1 ----- */}
//           <div className="relative w-full h-full">
//             <img
//               src={desktopSlide1}
//               alt="Desktop Transport Slide 1"
//               className="w-full h-full object-cover rounded-none"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

//             <div className="absolute inset-0 max-w-7xl mx-auto px-4 py-8 flex flex-col justify-between text-white">
//               <div className="max-w-2xl mt-4">
//                 <h1 className="font-inter text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
//                   India's Trusted Transport Network
//                 </h1>
//                 <p className="font-inter mt-3 text-base lg:text-lg text-gray-200 leading-relaxed drop-shadow">
//                   Find verified transporters, brokers, contractors and logistics partners across India. Connect faster and grow your business.
//                 </p>
//               </div>

//               {/* Bottom Row */}
//               <div className="flex items-end justify-between w-full pb-2">
//                 <div className="flex flex-col gap-4">
                  
//                   {/* Desktop Action Buttons (Rounded Corners Added) */}
//                   <div className="flex flex-wrap gap-3">
//                     <Link to="/directory">
//                       <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
//                         📂 Directory
//                       </button>
//                     </Link>
//                     <button
//                       onClick={() => handleScroll("search")}
//                       className="px-5 py-2.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
//                     >
//                       🚛 Search Transport
//                     </button>
//                     <button
//                       onClick={() => handleScroll("leads")}
//                       className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
//                     >
//                       📦 Available Leads
//                     </button>
//                     <button
//                       onClick={handlePostLoad}
//                       className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
//                     >
//                       ➕ Add Load
//                     </button>
//                   </div>

//                   {/* Desktop Stats */}
//                   <div className="grid grid-cols-3 gap-6 max-w-sm">
//                     <div>
//                       <h3 className="text-xl font-bold">500+</h3>
//                       <p className="text-xs text-gray-300">Verified Businesses</p>
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold">28+</h3>
//                       <p className="text-xs text-gray-300">States Covered</p>
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold">24/7</h3>
//                       <p className="text-xs text-gray-300">Support</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right Bottom Corner: Register Button */}
//                 {!isLoggedIn && (
//                   <div>
//                     <Link to="/register">
//                       <motion.button
//                         animate={{ scale: [1, 1.06, 1] }}
//                         transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
//                         className="bg-[#3dc13c] hover:bg-[#65a30d] text-gray-900 text-sm font-bold py-3 px-6 rounded-full shadow-[0_0_18px_rgba(61,193,60,0.7)] border border-[#bef264] flex items-center gap-2 cursor-pointer"
//                       >
//                         {/* <span className="relative flex h-2.5 w-2.5">
//                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1e3a1e] opacity-75"></span>
//                           <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1e3a1e]"></span>
//                         </span> */}
//                         ⚡ Register For FREE / फ्री रजिस्टर करें
//                       </motion.button>
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* ----- Desktop Slide 2 ----- */}
//           <div className="relative w-full h-full">
//             <img
//               src={desktopSlide2}
//               alt="Desktop Transport Slide 2"
//               className="w-full h-full object-cover rounded-none"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

//             <div className="absolute inset-0 max-w-7xl mx-auto px-4 py-8 flex flex-col justify-between text-white">
//               <div className="max-w-2xl mt-4">
//                 <h1 className="font-inter text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
//                   Find Right Transporter Anywhere In India
//                 </h1>
//                 <p className="font-inter mt-3 text-base lg:text-lg text-gray-200 leading-relaxed drop-shadow">
//                   Discover trusted transport companies, freight brokers and logistics experts for every route across India.
//                 </p>
//               </div>

//               <div className="flex items-end justify-between w-full pb-2">
//                 <div className="flex flex-col gap-4">
//                   {/* Desktop Action Buttons (Rounded Corners Added) */}
//                   <div className="flex flex-wrap gap-3">
//                     <Link to="/directory">
//                       <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
//                         📂 Directory
//                       </button>
//                     </Link>
//                     <button
//                       onClick={() => handleScroll("search")}
//                       className="px-5 py-2.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
//                     >
//                       🚛 Search Transport
//                     </button>
//                     <button
//                       onClick={() => handleScroll("leads")}
//                       className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
//                     >
//                       📦 Available Leads
//                     </button>
//                     <button
//                       onClick={handlePostLoad}
//                       className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
//                     >
//                       ➕ Add Load
//                     </button>
//                   </div>

//                   <div className="flex flex-wrap gap-2.5">
//                     <span className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs">
//                       ✔ Verified Companies
//                     </span>
//                     <span className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs">
//                       ✔ Trusted Brokers
//                     </span>
//                     <span className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs">
//                       ✔ PAN India Network
//                     </span>
//                   </div>
//                 </div>

//                 {!isLoggedIn && (
//                   <div>
//                     <Link to="/register">
//                       <motion.button
//                         animate={{ scale: [1, 1.06, 1] }}
//                         transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
//                         className="bg-[#3dc13c] hover:bg-[#65a30d] text-gray-900 text-sm font-bold py-3 px-6 rounded-full shadow-[0_0_18px_rgba(61,193,60,0.7)] border border-[#bef264] flex items-center gap-2 cursor-pointer"
//                       >
//                         {/* <span className="relative flex h-2.5 w-2.5">
//                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1e3a1e] opacity-75"></span>
//                           <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1e3a1e]"></span>
//                         </span> */}
//                         ⚡ Register For FREE / फ्री रजिस्टर करें
//                       </motion.button>
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </FlowbiteCarousel>
//       </div>


//       {/* ######################################################################### */}
//       {/* 📱 2. MOBILE HERO SECTION (Screen size < 640px)                           */}
//       {/* ######################################################################### */}
//       <div className="sm:hidden w-full flex flex-col">
        
//         {/* Mobile Carousel Area */}
//         <div className="w-full h-[60vh] relative">
//           <FlowbiteCarousel
//             theme={customCarouselTheme}
//             slideInterval={5000}
//             indicators={false}
//             className="rounded-none"
//           >
//             {/* ----- Mobile Slide 1 ----- */}
//             <div className="relative w-full h-full">
//               <img
//                 src={mobileSlide1}
//                 alt="Mobile Transport Slide 1"
//                 className="w-full h-full object-cover rounded-none"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

//               <div className="absolute inset-0 px-4 pt-4 flex flex-col justify-between text-white">
//                 <div className="mt-8">
//                   <h1 className="font-inter text-2xl font-bold leading-snug drop-shadow-md">
//                     India's Trusted Transport Network
//                   </h1>
//                 </div>

//                 {!isLoggedIn && (
//                   <div className="w-full flex justify-center pb-3 z-20">
//                     <Link to="/register">
//                       <motion.button
//                         animate={{ scale: [1, 1.06, 1] }}
//                         transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
//                         className="bg-[#3dc13c] text-gray-900 text-xs font-bold py-2 px-4 rounded-full shadow-[0_0_15px_rgba(61,193,60,0.6)] border border-[#bef264] flex items-center gap-2"
//                       >
//                         ⚡ Register For FREE / फ्री रजिस्टर करें
//                       </motion.button>
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* ----- Mobile Slide 2 ----- */}
//             <div className="relative w-full h-full">
//               <img
//                 src={mobileSlide2}
//                 alt="Mobile Transport Slide 2"
//                 className="w-full h-full object-cover rounded-none"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

//               <div className="absolute inset-0 px-4 pt-4 flex flex-col justify-between text-white">
//                 <div className="mt-8">
//                   <h1 className="font-inter text-2xl font-bold leading-snug drop-shadow-md">
//                     Find Right Transporter Anywhere In India
//                   </h1>
//                 </div>

//                 {!isLoggedIn && (
//                   <div className="w-full flex justify-center pb-3 z-20">
//                     <Link to="/register">
//                       <motion.button
//                         animate={{ scale: [1, 1.06, 1] }}
//                         transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
//                         className="bg-[#3dc13c] text-gray-900 text-xs font-bold py-2 px-4 rounded-full shadow-[0_0_15px_rgba(61,193,60,0.6)] border border-[#bef264] flex items-center gap-2"
//                       >
//                         ⚡ Register For FREE / फ्री रजिस्टर करें
//                       </motion.button>
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </FlowbiteCarousel>
//         </div>

//         {/* Mobile Action Buttons & Stats Footer */}
//         <div className="w-full bg-[#0d1b2a] text-white px-3 py-2.5 flex flex-col justify-between shadow-2xl border-t border-gray-800 shrink-0">
          
//           {/* Mobile Buttons with rounded-xl */}
//           <div className="grid grid-cols-2 gap-2 w-full">
//             <Link to="/directory" className="w-full">
//               <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold shadow-md text-center">
//                 📂 Directory
//               </button>
//             </Link>

//             <button
//               onClick={() => handleScroll("search")}
//               className="w-full py-2.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-xs font-bold shadow-md text-center"
//             >
//               🚛 Search Transport
//             </button>

//             <button
//               onClick={() => handleScroll("leads")}
//               className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-xs font-bold shadow-md text-center"
//             >
//               📦 Leads
//             </button>

//             <button
//               onClick={handlePostLoad}
//               className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md text-center"
//             >
//               ➕ Add Load
//             </button>
//           </div>

//           {/* Mobile Stats */}
//           <div className="mt-2.5 grid grid-cols-3 gap-1 text-center pt-2 border-t border-gray-800">
//             <div>
//               <h3 className="text-xs font-bold">500+</h3>
//               <p className="text-[9px] text-gray-300">Verified Businesses</p>
//             </div>
//             <div>
//               <h3 className="text-xs font-bold">28+</h3>
//               <p className="text-[9px] text-gray-300">States Covered</p>
//             </div>
//             <div>
//               <h3 className="text-xs font-bold">24/7</h3>
//               <p className="text-[9px] text-gray-300">Support</p>
//             </div>
//           </div>
//         </div>

//       </div>

//     </section>
//   );
// }

// export default HeroCarousel;
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Carousel as FlowbiteCarousel } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// ==========================================
// 1. DESKTOP IMAGES (Laptop / PC ke liye)
// ==========================================
import desktopSlide1 from "../assets/newimg.png";
import desktopSlide2 from "../assets/newimg.png";

// ==========================================
// 2. MOBILE IMAGES (Mobile ke liye)
// ==========================================
import mobileSlide1 from "../assets/newimg.png";
import mobileSlide2 from "../assets/newimg.png";

// Flowbite Carousel theme
const customCarouselTheme = {
  root: {
    base: "relative h-full w-full rounded-none overflow-hidden",
    leftControl: "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl: "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none"
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 rounded-none",
    wrapper: {
      off: "w-full flex-shrink-0 transform cursor-default snap-center rounded-none",
      on: "w-full flex-shrink-0 transform cursor-grab snap-center rounded-none"
    }
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-none",
    snap: "snap-x"
  }
};

export function HeroCarousel({ setActiveTab }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // लॉगिन / लॉगआउट स्टेटस चेक
  useEffect(() => {
    const checkAuthStatus = () => {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("user") ||
        localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();
    window.addEventListener("storage", checkAuthStatus);
    window.addEventListener("authChange", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
      window.removeEventListener("authChange", checkAuthStatus);
    };
  }, [location]);

  // स्क्रॉल हैंडलर
  const handleScroll = (tab) => {
    setActiveTab(tab);
    setTimeout(() => {
      document.getElementById("dynamic-home")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  // Add Load के लिए लॉगिन चेक
  const handlePostLoad = () => {
    const token =
      localStorage.getItem("token") ||
      localStorage.getItem("user") ||
      localStorage.getItem("authToken");

    if (token) {
      navigate("/dashboard/userform");
    } else {
      navigate("/register", {
        state: { returnTo: "/dashboard/userform" },
      });
    }
  };

  return (
    <section className="w-full pt-18 sm:pt-18 overflow-hidden">

      {/* ######################################################################### */}
      {/* 💻 1. DESKTOP / LAPTOP HERO SECTION (Screen size >= 640px)                */}
      {/* ######################################################################### */}
      <div className="hidden sm:block w-full h-[calc(100vh-64px)] relative">
        <FlowbiteCarousel
          theme={customCarouselTheme}
          slideInterval={5000}
          indicators={false}
          className="rounded-none"
        >
          {/* ----- Desktop Slide 1 ----- */}
          <div className="relative w-full h-full">
            <img
              src={desktopSlide1}
              alt="Desktop Transport Slide 1"
              className="w-full h-full object-cover rounded-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <div className="absolute inset-0 max-w-7xl mx-auto px-4 py-8 flex flex-col justify-between text-white pointer-events-none">
              <div className="max-w-2xl mt-4 pointer-events-auto">
                <h1 className="font-inter text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
                  India's Trusted Transport Network
                </h1>
                <p className="font-inter mt-3 text-base lg:text-lg text-gray-200 leading-relaxed drop-shadow">
                  Find verified transporters, brokers, contractors and logistics partners across India. Connect faster and grow your business.
                </p>
              </div>

              {/* Bottom Row Controls */}
              <div className="flex items-end justify-between w-full pb-2 pointer-events-auto">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-3">
                    <Link to="/directory">
                      <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                        📂 Directory
                      </button>
                    </Link>
                    <button
                      onClick={() => handleScroll("search")}
                      className="px-5 py-2.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      🚛 Search Transport
                    </button>
                    <button
                      onClick={() => handleScroll("leads")}
                      className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      📦 Available Leads
                    </button>
                    <button
                      onClick={handlePostLoad}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      ➕ Add Load
                    </button>
                  </div>

                  {/* Desktop Stats */}
                  <div className="grid grid-cols-3 gap-6 max-w-sm">
                    <div>
                      <h3 className="text-xl font-bold">5000+</h3>
                      <p className="text-xs text-gray-300">Verified Businesses</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">28+</h3>
                      <p className="text-xs text-gray-300">States Covered</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">24/7</h3>
                      <p className="text-xs text-gray-300">Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ----- Desktop Slide 1 ----- */}
          <div className="relative w-full h-full">
            <img
              src={desktopSlide1}
              alt="Desktop Transport Slide 1"
              className="w-full h-full object-cover rounded-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <div className="absolute inset-0 max-w-7xl mx-auto px-4 py-8 flex flex-col justify-between text-white pointer-events-none">
              <div className="max-w-2xl mt-4 pointer-events-auto">
                <h1 className="font-inter text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
                  India's Trusted Transport Network
                </h1>
                <p className="font-inter mt-3 text-base lg:text-lg text-gray-200 leading-relaxed drop-shadow">
                  Find verified transporters, brokers, contractors and logistics partners across India. Connect faster and grow your business.
                </p>
              </div>

              {/* Bottom Row Controls */}
              <div className="flex items-end justify-between w-full pb-2 pointer-events-auto">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-3">
                    <Link to="/directory">
                      <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                        📂 Directory
                      </button>
                    </Link>
                    <button
                      onClick={() => handleScroll("search")}
                      className="px-5 py-2.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      🚛 Search Transport
                    </button>
                    <button
                      onClick={() => handleScroll("leads")}
                      className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      📦 Available Leads
                    </button>
                    <button
                      onClick={handlePostLoad}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      ➕ Add Load
                    </button>
                  </div>

                  {/* Desktop Stats */}
                  <div className="grid grid-cols-3 gap-6 max-w-sm">
                    <div>
                      <h3 className="text-xl font-bold">5000+</h3>
                      <p className="text-xs text-gray-300">Verified Businesses</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">28+</h3>
                      <p className="text-xs text-gray-300">States Covered</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">24/7</h3>
                      <p className="text-xs text-gray-300">Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ----- Desktop Slide 2 ----- */}
          <div className="relative w-full h-full">
            <img
              src={desktopSlide2}
              alt="Desktop Transport Slide 2"
              className="w-full h-full object-cover rounded-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

            <div className="absolute inset-0 max-w-7xl mx-auto px-4 py-8 flex flex-col justify-between text-white pointer-events-none">
              <div className="max-w-2xl mt-4 pointer-events-auto">
                <h1 className="font-inter text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
                  Find Right Transporter Anywhere In India
                </h1>
                <p className="font-inter mt-3 text-base lg:text-lg text-gray-200 leading-relaxed drop-shadow">
                  Discover trusted transport companies, freight brokers and logistics experts for every route across India.
                </p>
              </div>

              <div className="flex items-end justify-between w-full pb-2 pointer-events-auto">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-3">
                    <Link to="/directory">
                      <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                        📂 Directory
                      </button>
                    </Link>
                    <button
                      onClick={() => handleScroll("search")}
                      className="px-5 py-2.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      🚛 Search Transport
                    </button>
                    <button
                      onClick={() => handleScroll("leads")}
                      className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      📦 Available Leads
                    </button>
                    <button
                      onClick={handlePostLoad}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      ➕ Add Load
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    <span className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs">
                      ✔ Verified Companies
                    </span>
                    <span className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs">
                      ✔ Trusted Brokers
                    </span>
                    <span className="bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs">
                      ✔ PAN India Network
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FlowbiteCarousel>

        {/* 🌟 FIXED DESKTOP REGISTER BUTTON */}
        {!isLoggedIn && (
          <div className="absolute bottom-10 right-8 z-30 pointer-events-auto">
            <Link to="/register">
              <motion.button
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#3dc13c] hover:bg-[#65a30d] text-gray-900 text-sm font-bold py-3 px-6 rounded-full shadow-[0_0_18px_rgba(61,193,60,0.7)] border border-[#bef264] flex items-center gap-2 cursor-pointer"
              >
                ⚡ Register For FREE / फ्री रजिस्टर करें
              </motion.button>
            </Link>
          </div>
        )}
      </div>

      {/* ######################################################################### */}
      {/* 📱 2. MOBILE HERO SECTION (Screen size < 640px)                           */}
      {/* ######################################################################### */}
      <div className="sm:hidden w-full flex flex-col">
        
        {/* Mobile Carousel Area */}
        <div className="w-full h-[60vh] relative">
          <FlowbiteCarousel
            theme={customCarouselTheme}
            slideInterval={5000}
            indicators={false}
            className="rounded-none"
          >
            {/* ----- Mobile Slide 1 ----- */}
            <div className="relative w-full h-full">
              <img
                src={mobileSlide1}
                alt="Mobile Transport Slide 1"
                className="w-full h-full object-cover rounded-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute inset-0 px-4 pt-4 flex flex-col justify-between text-white">
                <div className="mt-8">
                  <h1 className="font-inter text-2xl font-bold leading-snug drop-shadow-md">
                    India's Trusted Transport Network
                  </h1>
                </div>
              </div>
            </div>
            <div className="relative w-full h-full">
              <img
                src={mobileSlide1}
                alt="Mobile Transport Slide 1"
                className="w-full h-full object-cover rounded-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute inset-0 px-4 pt-4 flex flex-col justify-between text-white">
                <div className="mt-8">
                  <h1 className="font-inter text-2xl font-bold leading-snug drop-shadow-md">
                   India's Digital Trade &  <br /> Transport Directory
                  </h1>
                </div>
              </div>
            </div>

            {/* ----- Mobile Slide 2 ----- */}
            <div className="relative w-full h-full">
              <img
                src={mobileSlide2}
                alt="Mobile Transport Slide 2"
                className="w-full h-full object-cover rounded-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute inset-0 px-4 pt-4 flex flex-col justify-between text-white">
                <div className="mt-8">
                  <h1 className="font-inter text-2xl font-bold leading-snug drop-shadow-md">
                    Find Right Transporter Anywhere In India
                  </h1>
                </div>
              </div>
            </div>
          </FlowbiteCarousel>

          {/* 🌟 FIXED MOBILE REGISTER BUTTON */}
          {!isLoggedIn && (
            <div className="absolute bottom-4 left-0 w-full flex justify-center pb-3 z-30 pointer-events-auto">
              <Link to="/register">
                <motion.button
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="bg-[#3dc13c] text-gray-900 text-xs font-bold py-2 px-4 rounded-full shadow-[0_0_15px_rgba(61,193,60,0.6)] border border-[#bef264] flex items-center gap-2"
                >
                  ⚡ Register For FREE / फ्री रजिस्टर करें
                </motion.button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Action Buttons & Stats Footer */}
        <div className="w-full bg-[#0d1b2a] text-white px-3 py-2.5 flex flex-col justify-between shadow-2xl border-t border-gray-800 shrink-0">
          <div className="grid grid-cols-2 gap-2 w-full">
            <Link to="/directory" className="w-full">
              <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold shadow-md text-center">
                📂 Directory
              </button>
            </Link>

            <button
              onClick={() => handleScroll("search")}
              className="w-full py-2.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-xs font-bold shadow-md text-center"
            >
              🚛 Search Transport
            </button>

            <button
              onClick={() => handleScroll("leads")}
              className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-xs font-bold shadow-md text-center"
            >
              📦 Leads
            </button>

            <button
              onClick={handlePostLoad}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md text-center"
            >
              ➕ Add Load
            </button>
          </div>

          {/* Mobile Stats */}
          <div className="mt-2.5 grid grid-cols-3 gap-1 text-center pt-2 border-t border-gray-800">
            <div>
              <h3 className="text-xs font-bold">5000+</h3>
              <p className="text-[9px] text-gray-300">Verified Businesses</p>
            </div>
            <div>
              <h3 className="text-xs font-bold">28+</h3>
              <p className="text-[9px] text-gray-300">States Covered</p>
            </div>
            <div>
              <h3 className="text-xs font-bold">24/7</h3>
              <p className="text-[9px] text-gray-300">Support</p>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

export default HeroCarousel;