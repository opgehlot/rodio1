import React from "react";
import rodioAppImage from "../assets/4.png";

const DownloadApp = () => {
  return (
    <section className="w-full bg-white px-5 py-14 sm:px-8 sm:py-18 md:px-12 md:py-24 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row lg:gap-16">
        
        {/* LEFT CONTENT */}
        <div className="w-full text-center lg:w-1/2 lg:text-left">
          
          <span className="inline-block rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#2D52D8] sm:text-sm">
            Download Rodio App
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[64px] lg:leading-[1.08]">
            Your transport business,
            <span className="block text-[#2D52D8]">
              always with you.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-7 text-slate-500 sm:text-lg sm:leading-8 md:text-xl lg:mx-0">
          Find Transporters, Add Loads, Search Transport, Manage Bids, and connect with the right transporte network — all in one easy-to-use app.
          </p>

          {/* STORE BUTTONS */}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            
            {/* Google Play */}
            <a
              href="https://rodiotradelink.com/download/Rodio.apk"
              className="group flex w-full max-w-[220px] items-center gap-3 rounded-xl bg-[#2D52D8] px-5 py-4 text-white shadow-lg shadow-blue-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#2445bb] hover:shadow-xl sm:w-auto"
            >
              <span className="text-2xl leading-none">▶</span>

              <div className="flex flex-col text-left">
                <span className="text-[11px] font-medium uppercase tracking-wider text-blue-100">
                  Get it on
                </span>
                <span className="text-base font-bold leading-tight">
                  Downlod Now
                </span>
              </div>
            </a>

            {/* App Store */}
            {/* <a
              href="#"
              className="group flex w-full max-w-[220px] items-center gap-3 rounded-xl bg-[#F7941D] px-5 py-4 text-white shadow-lg shadow-orange-100 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e7830d] hover:shadow-xl sm:w-auto"
            >
              <span className="text-2xl font-semibold leading-none"></span>

              <div className="flex flex-col text-left">
                <span className="text-[11px] font-medium uppercase tracking-wider text-orange-100">
                  Download on the
                </span>
                <span className="text-base font-bold leading-tight">
                  App Store
                </span>
              </div>
            </a> */}
          </div>

          {/* STATS */}
          <div className="mx-auto mt-12 flex max-w-md items-center justify-center gap-6 border-t border-slate-100 pt-8 sm:gap-10 lg:mx-0 lg:justify-start">
            
            <div className="flex flex-col text-left">
              <span className="text-2xl font-bold text-slate-900 sm:text-3xl">
                10K+
              </span>
              <span className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                Active Downloads
              </span>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            <div className="flex flex-col text-left">
              <span className="text-2xl font-bold text-slate-900 sm:text-3xl">
                4.8 ★
              </span>
              <span className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                App Rating
              </span>
            </div>

            <div className="h-10 w-px bg-slate-200" />

            <div className="flex flex-col text-left">
              <span className="text-2xl font-bold text-slate-900 sm:text-3xl">
                24/7
              </span>
              <span className="mt-1 text-xs font-medium text-slate-400 sm:text-sm">
                Access
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex w-full items-center justify-center lg:w-1/2">
          
          <div className="absolute h-64 w-64 rounded-full bg-blue-50 blur-3xl sm:h-80 sm:w-80 md:h-96 md:w-96" />

          <div className="relative w-full max-w-[320px] sm:max-w-md md:max-w-lg">
            <img
              src={rodioAppImage}
              alt="Rodio App"
              className="relative z-10 mx-auto w-full object-contain drop-shadow-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default DownloadApp;