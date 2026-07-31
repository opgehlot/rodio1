import { Carousel as FlowbiteCarousel } from "flowbite-react";
import { Link } from "react-router-dom";

import truckImage from "../assets/pexels-shantumsingh-29057947.jpg";
import truckImagee from "../assets/pexels-m-javad-nemati-116278374-30037629.jpg";

export function HeroCarousel({ setActiveTab }) {
  return (
    <section className="w-full overflow-hidden">
      <div className="h-[520px] sm:h-[500px] lg:h-[600px]">
        <FlowbiteCarousel slideInterval={5000} indicators={false}>
          {/* ====================== Slide 1 ====================== */}
          <div className="relative h-full">
            <img
              src={truckImage}
              alt="Truck"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 flex items-center">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 text-white pt-6 sm:pt-0">
                <div className="max-w-3xl">
                  <span className="inline-block bg-blue-600/90 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    🇮🇳 Trusted Across India
                  </span>

                  <h1 className="mt-3 sm:mt-5 text-2xl sm:text-4xl lg:text-6xl font-bold leading-snug sm:leading-tight">
                    India's Trusted Transport Network
                  </h1>

                  <p className="mt-3 sm:mt-5 text-xs sm:text-lg text-gray-200 max-w-2xl leading-relaxed line-clamp-3 sm:line-clamp-none">
                    Find verified transporters, brokers, contractors and
                    logistics partners across India. Connect faster and grow
                    your business.
                  </p>

                  <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4">
                    {/* Directory */}
                    <Link to="/directory" className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-center">
                        📂 Directory
                      </button>
                    </Link>

                    {/* Search Transport */}
                    <button
                      onClick={() => setActiveTab && setActiveTab("search")}
                      className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-center"
                    >
                      🚛 Search Transport
                    </button>

                    {/* Post Lead */}
                    <button
                      onClick={() => setActiveTab && setActiveTab("leads")}
                      className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-green-600 hover:bg-green-700 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-center"
                    >
                      📦 Available Leads
                    </button>
                  </div>

                  <div className="mt-6 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-5 max-w-md">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold">500+</h3>
                      <p className="text-[11px] sm:text-sm text-gray-300">
                        Verified Businesses
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold">28+</h3>
                      <p className="text-[11px] sm:text-sm text-gray-300">
                        States Covered
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold">24/7</h3>
                      <p className="text-[11px] sm:text-sm text-gray-300">Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ====================== Slide 2 ====================== */}
          <div className="relative h-full">
            <img
              src={truckImagee}
              alt="Logistics"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 flex items-center">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 text-white pt-6 sm:pt-0">
                <div className="max-w-3xl">
                  <span className="inline-block bg-green-600/90 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    🚚 Smart Logistics Platform
                  </span>

                  <h1 className="mt-3 sm:mt-5 text-2xl sm:text-4xl lg:text-6xl font-bold leading-snug sm:leading-tight">
                    Fast, Secure & Reliable Transport Solutions
                  </h1>

                  <p className="mt-3 sm:mt-5 text-xs sm:text-lg text-gray-200 max-w-2xl leading-relaxed line-clamp-3 sm:line-clamp-none">
                    Discover trusted transport companies, freight brokers and
                    logistics experts for every route across India.
                  </p>

                  <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4">
                    {/* Directory */}
                    <Link to="/directory" className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-center">
                        📂 Directory
                      </button>
                    </Link>

                    {/* Search Transport */}
                    <button
                      onClick={() => setActiveTab && setActiveTab("search")}
                      className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-center"
                    >
                      🚛 Search Transport
                    </button>

                    {/* Post Lead */}
                    <button
                      onClick={() => setActiveTab && setActiveTab("leads")}
                      className="w-full sm:w-auto px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-green-600 hover:bg-green-700 text-sm sm:text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105 text-center"
                    >
                      📦 Available Leads
                    </button>
                  </div>

                  <div className="mt-6 sm:mt-10 flex flex-wrap gap-2 sm:gap-3">
                    <span className="bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                      ✔ Verified Companies
                    </span>

                    <span className="bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                      ✔ Trusted Brokers
                    </span>

                    <span className="bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
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