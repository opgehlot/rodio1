import { motion } from "framer-motion";
import truck from "../assets/oppp.jpg";

export default function About() {
  return (
    <>
      {/* About Section */}
      <section className="relative overflow-hidden bg-white rounded-3xl mt-10">

        {/* Truck Image */}
        <motion.img
          src={truck}
          alt="Truck"
          className="absolute bottom-0 left-0 w-full lg:w-1/2 object-contain z-0"
          initial={{
            x: 400,
            y: 200,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.3,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
        />

        {/* Blue Side */}
        <div className="relative z-10 ml-auto w-full lg:w-1/2 bg-blue-900/90 rounded-none lg:rounded-l-[250px]">

          <div className="px-6 sm:px-10 lg:px-16 py-16 lg:py-24">

            <p className="uppercase tracking-[4px] text-amber-300 font-semibold mb-4">
              About Rodio
            </p>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              India's Smart
              <br />
              Transport Platform
            </h2>

            <p className="mt-8 text-blue-100 leading-8 text-base lg:text-lg">
              Rodio is India's digital transport platform connecting
              customers with verified transporters, truck owners,
              fleet owners and logistics companies.

              <br />
              <br />

              Our mission is to make transportation simple,
              transparent and affordable while helping transport
              businesses grow across India.
            </p>

          </div>

        </div>
      </section>

      {/* Statistics */}
      <section className="max-w-7xl mx-auto px-5 -mt-10 lg:-mt-14 relative z-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-2xl lg:rounded-full shadow-xl p-6 flex items-center justify-center gap-4">

            <h3 className="text-3xl lg:text-4xl font-bold text-blue-700">
              5000+
            </h3>

            <p className="text-gray-700 text-base lg:text-lg">
              Verified Transporters
            </p>

          </div>

          <div className="bg-white rounded-2xl lg:rounded-full shadow-xl p-6 flex items-center justify-center gap-4">

            <h3 className="text-3xl lg:text-4xl font-bold text-blue-700">
              10K+
            </h3>

            <p className="text-gray-700 text-base lg:text-lg">
              Happy Customers
            </p>

          </div>

          <div className="bg-white rounded-2xl lg:rounded-full shadow-xl p-6 flex items-center justify-center gap-4">

            <h3 className="text-3xl lg:text-4xl font-bold text-blue-700">
              100%
            </h3>

            <p className="text-gray-700 text-base lg:text-lg">
              Trusted Platform
            </p>

          </div>

        </div>

      </section>
    </>
  );
}