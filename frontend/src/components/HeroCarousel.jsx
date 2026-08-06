// import { Carousel as FlowbiteCarousel } from "flowbite-react";
// import { Link } from "react-router-dom";

// import truckImage from "../assets/pexels-shantumsingh-29057947.jpg";
// import truckImagee from "../assets/pexels-m-javad-nemati-116278374-30037629.jpg";

// export function HeroCarousel({ setActiveTab }) {
//   const handleScroll = (tab) => {
//     setActiveTab(tab);

//     setTimeout(() => {
//       document.getElementById("dynamic-home")?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }, 15000);
//   };
//   return (
//     <section className="w-full overflow-hidden">
//       <div className="h-[520px] sm:h-[500px] lg:h-[600px]">
//         <FlowbiteCarousel slideInterval={5000} indicators={false}>
//           {/* ====================== Slide 1 ====================== */}
//           <div className="relative h-full">
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="w-full h-full object-cover"
//             />

//             <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 flex items-center">
//               <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 text-white pt-6 sm:pt-0">
//                 <div className="max-w-3xl">
//                   {/* <span className="inline-block bg-blue-600/90 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
//                     🇮🇳 Trusted Across India
//                   </span> */}

//                   <h1 className="font-inter mt-3 sm:mt-5 text-2xl sm:text-4xl lg:text-6xl font-bold leading-snug sm:leading-tight">
//                     India's Trusted Transport Network
//                   </h1>
//                   <p className="font-inter mt-4 text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl leading-8">
//                    Reliable Transport Starts Here.
//                   </p>

//                   <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4">
//                     {/* Directory */}
//                     <Link to="/directory" className="w-full sm:w-auto">
//                       <button className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-center">
//                         📂 Directory
//                       </button>
//                     </Link>

//                     {/* Search Transport */}
//                     <button
//                       onClick={() => handleScroll("search")}
//                       className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-center"
//                     >
//                       🚛 Search Transport
//                     </button>

//                     {/* Post Lead */}
//                     <button
//                       onClick={() => handleScroll("leads")}
//                       className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-green-600 hover:bg-green-700 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-center"
//                     >
//                       📦 View Leads
//                     </button>
//                   </div>

//                   <div className="mt-6 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-5 max-w-md">
//                     <div>
//                       <h3 className="text-xl sm:text-2xl font-bold">500+</h3>
//                       <p className="text-[11px] sm:text-sm text-gray-300">
//                         Verified Businesses
//                       </p>
//                     </div>

//                     <div>
//                       <h3 className="text-xl sm:text-2xl font-bold">28+</h3>
//                       <p className="text-[11px] sm:text-sm text-gray-300">
//                         States Covered
//                       </p>
//                     </div>

//                     <div>
//                       <h3 className="text-xl sm:text-2xl font-bold">24/7</h3>
//                       <p className="text-[11px] sm:text-sm text-gray-300">
//                         Support
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ====================== Slide 2 ====================== */}
//           <div className="relative h-full">
//             <img
//               src={truckImagee}
//               alt="Logistics"
//               className="w-full h-full object-cover"
//             />

//             <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 flex items-center">
//               <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 text-white pt-6 sm:pt-0">
//                 <div className="max-w-3xl">
//                   {/* <span className="inline-block bg-green-600/90 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
//                     🚚 Smart Logistics Platform
//                   </span> */}

//                   <h1 className="mt-3 sm:mt-5 text-2xl sm:text-4xl lg:text-6xl font-bold leading-snug sm:leading-tight">
//                     Fast, Secure & Reliable Transport Solutions
//                   </h1>

//                   <p className="mt-3 sm:mt-5 text-xs sm:text-lg text-gray-200 max-w-2xl leading-relaxed line-clamp-3 sm:line-clamp-none">
//                  One Network. Endless Routes.
//                   </p>

//                   <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4">
//                     {/* Directory */}
//                     <Link to="/directory" className="w-full sm:w-auto">
//                       <button className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-center">
//                         📂 Directory
//                       </button>
//                     </Link>

//                     {/* Search Transport */}
//                     <button
//                       onClick={() => handleScroll("search")}
//                       className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-center"
//                     >
//                       🚛 Search Transport
//                     </button>

//                     {/* Post Lead */}
//                     <button
//                       onClick={() => handleScroll("leads")}
//                       className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-green-600 hover:bg-green-700 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-center"
//                     >
//                       📦 View Leads
//                     </button>
//                   </div>

//                   <div className="mt-6 sm:mt-10 flex flex-wrap gap-2 sm:gap-3">
//                     <span className="bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
//                       ✔ Verified Companies
//                     </span>

//                     <span className="bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
//                       ✔ Trusted Brokers
//                     </span>

//                     <span className="bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
//                       ✔ PAN India Network
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </FlowbiteCarousel>
//       </div>
//     </section>
//   );
// }

// export default HeroCarousel;
import { Carousel as FlowbiteCarousel } from "flowbite-react";
import { Link } from "react-router-dom";

import truckImage from "../assets/pexels-shantumsingh-29057947.jpg";
import truckImagee from "../assets/pexels-m-javad-nemati-116278374-30037629.jpg";

export function HeroCarousel({ setActiveTab }) {
  const handleScroll = (tab) => {
    setActiveTab(tab);

    setTimeout(() => {
      document.getElementById("dynamic-home")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 15000);
  };

  return (
    <section className="w-full overflow-hidden bg-black">
      {/* Custom styles for Carousel Navigation */}
      <style>{`
        .glass-carousel [data-testid="carousel-left-control"],
        .glass-carousel [data-testid="carousel-right-control"] {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          color: white;
          top: 35%;
        }
        .glass-carousel [data-testid="carousel-left-control"]:hover,
        .glass-carousel [data-testid="carousel-right-control"]:hover {
          background: rgba(37, 99, 235, 0.8);
        }
      `}</style>

      {/* Screen ki height pehle jaisi lambi rakhi gayi hai */}
      <div className="h-[520px] sm:h-[520px] lg:h-[620px] glass-carousel relative">
        <FlowbiteCarousel slideInterval={5000} indicators={false}>
          {/* ====================== Slide 1 ====================== */}
          <div className="relative h-full w-full flex items-center justify-center bg-black">
            <img
              src={truckImage}
              alt="Truck"
              className="w-full h-full object-cover filter brightness-95"
            />

            {/* Bottom Footer Section: Buttons & Stats */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end pb-5 sm:pb-0 sm:justify-center">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 text-white">
                <div className="max-w-3xl">

                  {/* Desktop पर दिखेगा, Mobile पर hidden */}
                  <h1 className="font-inter hidden sm:block mt-3 sm:mt-5 text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight tracking-tight drop-shadow-md">
                    India's Trusted Transport Network
                  </h1>

                  <p className="font-inter hidden sm:block mt-3 text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl leading-relaxed drop-shadow">
                    Reliable Transport Starts Here.
                  </p>

                  {/* Buttons */}
                  <div className="mt-2 sm:mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-4">
                    <Link to="/directory" className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600/90 hover:bg-blue-600 border border-blue-400/40 backdrop-blur-xl text-white text-sm font-semibold shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center">
                        📂 Directory
                      </button>
                    </Link>

                    <button
                      onClick={() => handleScroll("search")}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 backdrop-blur-xl text-white text-sm font-semibold shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center"
                    >
                      🚛 Search Transport
                    </button>

                    <button
                      onClick={() => handleScroll("leads")}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 border border-emerald-400/40 backdrop-blur-xl text-white text-sm font-semibold shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center"
                    >
                      📦 Available Leads
                    </button>
                  </div>

                  {/* Stats Box (अब मोबाइल और डेस्कटॉप दोनों पर बटन्स के नीचे दिखेगा) */}
                  <div className="mt-4 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-5 max-w-md bg-white/10 border border-white/15 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-lg text-center sm:text-left">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-blue-300">500+</h3>
                      <p className="text-xs sm:text-sm text-gray-200">Verified Businesses</p>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-blue-300">28+</h3>
                      <p className="text-xs sm:text-sm text-gray-200">States Covered</p>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-blue-300">24/7</h3>
                      <p className="text-xs sm:text-sm text-gray-200">Support</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          {/* ====================== Slide 2 ====================== */}
          <div className="relative h-full w-full flex items-center justify-center bg-black">
            <img
              src={truckImagee}
              alt="Logistics"
              className="w-full h-full object-cover filter brightness-95"
            />

            {/* Bottom Footer Section: Buttons & Badges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end pb-5 sm:pb-0 sm:justify-center">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 text-white">
                <div className="max-w-3xl">

                  {/* Desktop पर दिखेगा, Mobile पर hidden */}
                  <h1 className="hidden sm:block mt-3 sm:mt-5 text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight tracking-tight drop-shadow-md">
                    Fast, Secure & Reliable Transport Solutions
                  </h1>

                  <p className="hidden sm:block mt-3 sm:mt-4 text-sm sm:text-lg text-gray-200 max-w-2xl leading-relaxed drop-shadow">
                    One Network. Endless Routes.
                  </p>

                  {/* Buttons */}
                  <div className="mt-2 sm:mt-8 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-4">
                    <Link to="/directory" className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600/90 hover:bg-blue-600 border border-blue-400/40 backdrop-blur-xl text-white text-sm font-semibold shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center">
                        📂 Directory
                      </button>
                    </Link>

                    <button
                      onClick={() => handleScroll("search")}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 backdrop-blur-xl text-white text-sm font-semibold shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center"
                    >
                      🚛 Search Transport
                    </button>

                    <button
                      onClick={() => handleScroll("leads")}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 border border-emerald-400/40 backdrop-blur-xl text-white text-sm font-semibold shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center"
                    >
                      📦 Available Leads
                    </button>
                  </div>

                  <div className="mt-4 sm:mt-10 flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                    <span className="bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium shadow-md">
                      ✔ Verified Companies
                    </span>
                    <span className="bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium shadow-md">
                      ✔ Trusted Brokers
                    </span>
                    <span className="bg-white/15 backdrop-blur-md border border-white/20 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium shadow-md">
                      ✔ PAN India Network
                    </span>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </FlowbiteCarousel>
      </div>
    </section>
  );
}

export default HeroCarousel;
