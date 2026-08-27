import {
  Truck,
  ShieldCheck,
  Globe,
  Users,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

export function Overvision() {
  const visionPoints = [
    {
      title: "Free Transport Network",
      text: "We aim to provide customers with trusted transporters without unnecessary brokerage or hidden charges.",
    },
    {
      title: "Digital India Transport",
      text: "Our vision is to connect transporters, truck owners, brokers and logistics companies on one powerful platform.",
    },
  ];

  const missionPoints = [
    {
      title: "Verified Transporters",
      text: "Every transporter on Rodio is verified so customers can connect with confidence and peace of mind.",
    },
    {
      title: "One Platform for Everyone",
      text: "We connect truck owners, fleet owners, brokers, transporters and customers on a single digital platform.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-purple-50/40 px-5 py-20">
      
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold uppercase tracking-widest text-blue-700">
            Our Vision & Mission
          </span>

         <h2 className="mt-4 text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:text-5xl">
  Building the Future of{" "}
  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
    Transport
  </span>
</h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
            Rodio is creating a smart platform where transporters and
            customers connect quickly, transparently, and without unnecessary
            brokerage. Our goal is to simplify transportation across India.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl sm:p-10"
          >
            {/* Top Gradient */}
            <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-blue-500 to-purple-600" />

            {/* Glow */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-100 opacity-60 blur-2xl transition-transform duration-500 group-hover:scale-150" />

            <div className="relative z-10 flex items-center gap-5">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ duration: 0.25 }}
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200"
              >
                <Globe className="text-white" size={38} />
              </motion.div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Our Vision
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Transforming India's transport ecosystem.
                </p>
              </div>
            </div>

            {/* Vision Points */}
            <div className="relative z-10 mt-10 space-y-7">
              {visionPoints.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.25 + index * 0.15,
                  }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <CheckCircle
                    className="mt-1 shrink-0 text-blue-600"
                    size={22}
                  />

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl border border-purple-100 bg-white p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl sm:p-10"
          >
            {/* Top Gradient */}
            <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-purple-600 to-blue-600" />

            {/* Glow */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-purple-100 opacity-60 blur-2xl transition-transform duration-500 group-hover:scale-150" />

            <div className="relative z-10 flex items-center gap-5">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ duration: 0.25 }}
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-200"
              >
                <Truck className="text-white" size={38} />
              </motion.div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Our Mission
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Making transport faster, smarter and transparent.
                </p>
              </div>
            </div>

            {/* Mission Points */}
            <div className="relative z-10 mt-10 space-y-7">
              {missionPoints.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.25 + index * 0.15,
                  }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  {index === 0 ? (
                    <ShieldCheck
                      className="mt-1 shrink-0 text-purple-600"
                      size={22}
                    />
                  ) : (
                    <Users
                      className="mt-1 shrink-0 text-purple-600"
                      size={22}
                    />
                  )}

                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Overvision;