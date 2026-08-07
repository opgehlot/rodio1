

import { Carousel as FlowbiteCarousel } from "flowbite-react";
import { Link } from "react-router-dom";

import truckImage from "../assets/frontpageee.avif";
import truckImagee from "../assets/pexels-m-javad-nemati-116278374-30037629.jpg";

export function HeroCarousel({ setActiveTab }) {
  const handleScroll = (tab) => {
    setActiveTab(tab);

    setTimeout(() => {
      document.getElementById("dynamic-home")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <section className="w-full h-[90vh] sm:h-auto overflow-hidden flex flex-col justify-between">
      {/* Carousel Container */}
      <div className="w-full flex-1 sm:h-[500px] lg:h-[600px]">
        <FlowbiteCarousel slideInterval={5000} indicators={false}>
          {/* ====================== Slide 1 ====================== */}
          <div className="relative h-full">
            <img
              src={truckImage}
              alt="Truck"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 flex items-start sm:items-center pt-3 sm:pt-0">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 text-white">
                <div className="max-w-3xl">
                  {/* Heading */}
                  <h1 className="font-inter text-2xl sm:text-4xl lg:text-6xl font-bold leading-snug sm:leading-tight">
                    India's Trusted Transport Network
                  </h1>

                  {/* Paragraph: Desktop only */}
                  <p className="font-inter hidden sm:block mt-4 text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl leading-8">
                    Find verified transporters, brokers, contractors and
                    logistics partners across India. Connect faster and grow
                    your business.
                  </p>

                  {/* Buttons: Desktop only */}
                  <div className="hidden sm:mt-10 sm:flex flex-wrap gap-4">
                    <Link to="/directory">
                      <button className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                        📂 Directory
                      </button>
                    </Link>
                    <button
                      onClick={() => handleScroll("search")}
                      className="px-7 py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-100 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      🚛 Search Transport
                    </button>
                    <button
                      onClick={() => handleScroll("leads")}
                      className="px-7 py-3 rounded-xl bg-green-600 hover:bg-green-700 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      📦 Available Leads
                    </button>
                  </div>

                  {/* Stats: Desktop only */}
                  <div className="hidden sm:mt-10 sm:grid grid-cols-3 gap-5 max-w-md">
                    <div>
                      <h3 className="text-2xl font-bold">500+</h3>
                      <p className="text-sm text-gray-300">Verified Businesses</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">28+</h3>
                      <p className="text-sm text-gray-300">States Covered</p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">24/7</h3>
                      <p className="text-sm text-gray-300">Support</p>
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

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30 flex items-start sm:items-center pt-3 sm:pt-0">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-10 text-white">
                <div className="max-w-3xl">
                  {/* Heading */}
                  <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-snug sm:leading-tight">
                    Fast, Secure & Reliable Transport Solutions
                  </h1>

                  {/* Paragraph: Desktop only */}
                  <p className="hidden sm:block mt-5 text-lg text-gray-200 max-w-2xl leading-relaxed">
                    Discover trusted transport companies, freight brokers and
                    logistics experts for every route across India.
                  </p>

                  {/* Buttons: Desktop only */}
                  <div className="hidden sm:mt-8 sm:flex flex-wrap gap-4">
                    <Link to="/directory">
                      <button className="px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                        📂 Directory
                      </button>
                    </Link>
                    <button
                      onClick={() => handleScroll("search")}
                      className="px-7 py-3 rounded-xl bg-white text-gray-900 hover:bg-gray-100 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      🚛 Search Transport
                    </button>
                    <button
                      onClick={() => handleScroll("leads")}
                      className="px-7 py-3 rounded-xl bg-green-600 hover:bg-green-700 font-semibold shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      📦 Available Leads
                    </button>
                  </div>

                  {/* Badges: Desktop only */}
                  <div className="hidden sm:mt-10 sm:flex flex-wrap gap-3">
                    <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
                      ✔ Verified Companies
                    </span>
                    <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
                      ✔ Trusted Brokers
                    </span>
                    <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
                      ✔ PAN India Network
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FlowbiteCarousel>
      </div>

      {/* ====================== Mobile Footer Action Area (Only for Mobile) ====================== */}
      <div className="sm:hidden w-full bg-[#0d1b2a] text-white px-3 py-2.5 flex flex-col justify-between shadow-2xl border-t border-gray-800 shrink-0">
        {/* Buttons (Bade Size ke sath) */}
        <div className="flex flex-col gap-2 w-full">
          <Link to="/directory" className="w-full">
            <button className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-sm font-bold shadow-md text-center">
              📂 Directory
            </button>
          </Link>

          <button
            onClick={() => handleScroll("search")}
            className="w-full py-2.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 text-sm font-bold shadow-md text-center"
          >
            🚛 Search Transport
          </button>

          <button
            onClick={() => handleScroll("leads")}
            className="w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-sm font-bold shadow-md text-center"
          >
            📦 Available Leads
          </button>
        </div>

        {/* Stats Below Buttons */}
        <div className="mt-1.5 grid grid-cols-3 gap-1 text-center pt-1.5 border-t border-gray-800">
          <div>
            <h3 className="text-xs font-bold">500+</h3>
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
    </section>
  );
}

export default HeroCarousel;
