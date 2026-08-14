import { ArrowRight, MapPinned } from "lucide-react";

const Indialogo = () => {
  return (
    <section className="w-full">
      <div
        className="
          relative overflow-hidden
          min-h-[190px] sm:min-h-[210px]
          rounded-3xl
          border border-blue-100
          bg-gradient-to-br from-blue-50 via-white to-slate-50
          shadow-sm
          hover:shadow-md
          transition-shadow duration-300
        "
      >
        {/* Background Illustration */}
        <div
          className="
            absolute
            right-0 bottom-0
            w-[48%] sm:w-[45%] lg:w-[42%]
            h-full
            pointer-events-none
          "
        >
          <img
            src="/images/directory-map.png"
            alt=""
            className="
              absolute right-0 bottom-0
              w-full h-full
              object-contain object-right-bottom
              opacity-90
            "
          />

          {/* Soft fade */}
          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-blue-50 via-blue-50/30 to-transparent
            "
          />
        </div>

        {/* Content */}
        <div
          className="
            relative z-10
            w-[68%] sm:w-[62%] lg:w-[58%]
            p-5 sm:p-6 lg:p-7
          "
        >
          {/* Small Label */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 text-blue-600">
              <MapPinned size={15} />
            </div>

            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-blue-600">
              Transport Network
            </span>
          </div>

          {/* Heading */}
          <h3
            className="
              text-lg sm:text-xl lg:text-2xl
              font-bold
              leading-tight
              text-slate-900
              max-w-[280px]
            "
          >
            Find Transport Businesses
            <span className="block">Near You</span>
          </h3>

          {/* Description */}
          <p
            className="
              mt-2
              text-xs sm:text-sm
              leading-5
              text-slate-500
              max-w-[280px]
            "
          >
            Search verified transporters, brokers and logistics providers
            across India.
          </p>

          {/* Button */}
          <button
            type="button"
            className="
              mt-4
              inline-flex items-center gap-2
              rounded-lg
              bg-slate-900
              px-4 py-2.5
              text-xs sm:text-sm
              font-semibold
              text-white
              shadow-sm
              hover:bg-blue-700
              active:scale-[0.98]
              transition-all duration-200
            "
          >
            Explore Directory
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Bottom Decorative Line */}
        <div
          className="
            absolute bottom-0 left-0
            h-1 w-24
            bg-blue-600
            rounded-r-full
          "
        />
      </div>
    </section>
  );
};


export default Indialogo;