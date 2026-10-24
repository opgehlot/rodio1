import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import truck from "../assets/oppp.jpg";
import { useEffect, useRef } from "react";
import Features from "../components/Features";
import { ShieldCheck, Zap, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="bg-white text-gray-800 pt-[70px]">
      {/* Hero Section */}
      <motion.section
        className="py-20 px-6"
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
            }}
          >
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
              ABOUT RODIO 
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold mt-6 leading-tight">
              India's Digital{" "}
              <span className="text-blue-600">Transport Platform</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-8">
              Rodio is India's digital transport platform connecting customers with verified transporters, truck owners, fleet owners, and logistics companies. Our mission is to make transportation simple, transparent, and affordable while helping transport businesses grow across India.
            </p>
          </motion.div>
          <motion.div
            className="flex justify-center items-center"
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } },
            }}
          >
            <img
              src={truck}
              alt="Transport Truck"
              className="rounded-3xl w-full"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics */}
      <motion.section
        className="max-w-7xl mx-auto px-6 pt-8 pb-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-gray-50 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { count: 5000, label: "Verified Transporters", suffix: "+" },
            { count: 10000, label: "Happy Customers", suffix: "+" },
            { count: 100, label: "Trusted Platform", suffix: "%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl lg:text-5xl font-bold text-blue-600">
                <AnimatedCounter from={0} to={stat.count} suffix={stat.suffix} />
              </h3>
              <p className="text-gray-600 text-base lg:text-lg mt-2 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="pt-0 pb-16 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
         
    
        </div>
      </motion.section>
          <Features />
    </div>
  );
}

function AnimatedCounter({ from, to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(to);
    }
  }, [motionValue, inView, to]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Intl.NumberFormat("en-IN").format(latest.toFixed(0))}${suffix || ""}`;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} />;
}