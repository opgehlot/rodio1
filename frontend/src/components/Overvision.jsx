import {
  Truck,
  ShieldCheck,
  Globe,
  Users,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";
export function Overvision() {
  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
       <motion.div
  className="text-center mb-16"
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>
  <span className="text-blue-600 font-semibold uppercase tracking-widest">
    Our Vision & Mission
  </span>

  <h2 className="text-5xl font-bold text-gray-800 mt-3">
    Building the Future of Transport
  </h2>

  <p className="max-w-3xl mx-auto mt-5 text-gray-600 text-lg">
    Rodio is creating a smart platform where transporters and customers
    connect quickly, transparently, and without unnecessary brokerage.
    Our goal is to simplify transportation across India.
  </p>
</motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Vision */}
          <motion.div
  className="bg-gradient-to-br from-lime-300 to-green-400 rounded-3xl p-10 shadow-xl"
  initial={{ x: -150, opacity: 0 }}
  whileInView={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
>

            <div className="flex items-center gap-5 mb-8">

              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                <Globe className="text-green-600" size={40} />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Our Vision
                </h2>

                <p className="text-gray-700">
                  Transforming India's transport ecosystem.
                </p>
              </div>

            </div>

            <div className="space-y-6">

              <div className="flex gap-4">
                <CheckCircle className="text-green-700 mt-1" />
                <div>
                  <h3 className="font-bold text-xl">
                    Free Transport Network
                  </h3>
                  <p>
                    We aim to provide customers with trusted transporters
                    without charging unnecessary brokerage or hidden fees.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle className="text-green-700 mt-1" />
                <div>
                  <h3 className="font-bold text-xl">
                    Digital India Transport
                  </h3>
                  <p>
                    Our vision is to connect every transporter, truck owner,
                    broker, and logistics company on one powerful platform.
                  </p>
                </div>
              </div>

            </div>

        </motion.div>

          {/* Mission */}
         <motion.div
  className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 shadow-xl text-white"
  initial={{ x: 200, opacity: 0 }}
  whileInView={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.90 }}
  viewport={{ once: true }}
>
            <div className="flex items-center gap-5 mb-8">

              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                <Truck className="text-blue-600" size={40} />
              </div>

              <div>
                <h2 className="text-3xl font-bold">
                  Our Mission
                </h2>

                <p className="text-blue-100">
                  Making transport faster, smarter and more transparent.
                </p>
              </div>

            </div>

            <div className="space-y-6">

              <div className="flex gap-4">
                <ShieldCheck className="text-green-300 mt-1" />
                <div>
                  <h3 className="font-bold text-xl">
                    Verified Transporters
                  </h3>
                  <p className="text-blue-100">
                    Every transporter on Rodio is verified so customers can
                    book with confidence and peace of mind.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="text-green-300 mt-1" />
                <div>
                  <h3 className="font-bold text-xl">
                    One Platform for Everyone
                  </h3>
                  <p className="text-blue-100">
                    We connect truck owners, fleet owners, brokers,
                    transporters and customers on a single digital platform,
                    making transport easy, affordable and accessible.
                  </p>
                </div>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
export default Overvision;