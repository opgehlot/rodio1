import  truck from "../assets/oppp.jpg"; 
import { motion } from "framer-motion";// Replace with your own image

export  function About() {
  return (
    <section className=" rounded-4xl mt-10 relative w-full h-200 overflow-hidden">

  {/* Background Image */}
<motion.img
  src={truck}
  alt="Truck"
 className="absolute bottom-0 right-0 w-[100%] h-auto object-contain"
  initial={{
    x: 500,   // Screen ke right bahar
    y: 300,   // Neeche
    opacity: 0,
  }}
  whileInView={{
    x: 0,
    y: 0,
    opacity: 1,
  }}
  transition={{
    duration: 1.5,
    ease: "easeOut",
  }}
  viewport={{ once: true }}
/>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-transparent"></div>

  {/* Blue Curved Overlay */}
  <div className="absolute right-0 top-0 h-full w-full lg:w-[48%] bg-blue-900/85 rounded-l-[300px] flex items-center">

    <div className="px-10 lg:px-20 text-white">

      <p className="font-bold uppercase tracking-[5px] text-amber-300 mb-3">
        About Rodio
      </p>

      <h1 className="text-6xl font-bold leading-tight">
        India's Smart <br />
        Transport Platform
      </h1>

      <p className="mt-8 text-lg leading-9 text-blue-100">
        Rodio is India's digital transport platform connecting
        customers with verified transporters, truck owners,
        fleet owners and logistics companies.

        <br /><br />

        Our mission is to make transportation easy,
        transparent and affordable while helping transport
        businesses grow across India.
      </p>

    </div>

  </div>

  {/* Bottom Statistics */}
  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%]">

    <div className="grid md:grid-cols-3 gap-8">

      <div className="bg-white rounded-full shadow-2xl px-8 py-6 flex items-center justify-center gap-5">

        <h2 className="text-4xl font-bold text-blue-700">
          500+
        </h2>

        <p className="text-gray-600 text-lg">
          Verified Transporters
        </p>

      </div>

      <div className="bg-white rounded-full shadow-2xl px-8 py-6 flex items-center justify-center gap-5">

        <h2 className="text-4xl font-bold text-blue-700">
          10K+
        </h2>

        <p className="text-gray-600 text-lg">
          Happy Customers
        </p>

      </div>

      <div className="bg-white rounded-full shadow-2xl px-8 py-6 flex items-center justify-center gap-5">

        <h2 className="text-4xl font-bold text-blue-700">
          100%
        </h2>

        <p className="text-gray-600 text-lg">
          Trusted Platform
        </p>

      </div>

    </div>

  </div>

</section>
  );
}
export default About;