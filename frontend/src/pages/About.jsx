// import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
// import truck from "../assets/oppp.jpg";
// import { useEffect, useRef } from "react";
// import Features from "../components/Features";
// import { ShieldCheck, Zap, Award, Users } from "lucide-react";

// export default function About() {
//   return (
//     <div className="bg-white text-gray-800 pt-[70px]">
//       {/* Hero Section */}
//       <motion.section
//         className="py-20 px-6"
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
//           <motion.div
//             variants={{
//               hidden: { opacity: 0, x: -50 },
//               visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
//             }}
//           >
//             <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
//               ABOUT RODIO 
//             </span>
//             <h1 className="text-5xl lg:text-6xl font-extrabold mt-6 leading-tight">
//               India's Digital{" "}
//               <span className="text-blue-600">Transport Platform</span>
//             </h1>
//             <p className="mt-6 text-lg text-gray-600 leading-8">
//              Rodio is India's digital transport platform connecting customers with verified transporters, truck owners, fleet owners, and logistics companies. Our mission is to make transportation simple, transparent, and affordable, as well as help transport businesses grow across India.
//             </p>
//           </motion.div>
//           <motion.div
//             className="flex justify-center items-center"
//             variants={{
//               hidden: { opacity: 0, scale: 0.8 },
//               visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } },
//             }}
//           >
//             <img
//               src={truck}
//               alt="Transport Truck"
//               className="rounded-3xl w-full"
//             />
//           </motion.div>
//         </div>
//       </motion.section>

//       {/* Statistics */}
//       <motion.section
//         className="max-w-7xl mx-auto px-6 pt-8 pb-0"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="bg-gray-50 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//           {[
//             { count: 5000, label: "Verified Transporters", suffix: "+" },
//             { count: 10000, label: "Happy Customers", suffix: "+" },
//             { count: 100, label: "Trusted Platform", suffix: "%" },
//           ].map((stat, index) => (
//             <motion.div
//               key={index}
//               className="flex flex-col items-center justify-center"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               viewport={{ once: true }}
//             >
//               <h3 className="text-4xl lg:text-5xl font-bold text-blue-600">
//                 <AnimatedCounter from={0} to={stat.count} suffix={stat.suffix} />
//               </h3>
//               <p className="text-gray-600 text-base lg:text-lg mt-2 font-medium">
//                 {stat.label}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* Why Choose Us Section */}
//       <motion.section
//         className="pt-0 pb-16 bg-white"
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-7xl mx-auto px-6">
         
    
//         </div>
//       </motion.section>
//           <Features />
//     </div>
//   );
// }

// function AnimatedCounter({ from, to, suffix }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   const motionValue = useMotionValue(from);
//   const springValue = useSpring(motionValue, {
//     damping: 60,
//     stiffness: 100,
//   });

//   useEffect(() => {
//     if (inView) {
//       motionValue.set(to);
//     }
//   }, [motionValue, inView, to]);

//   useEffect(() => {
//     springValue.on("change", (latest) => {
//       if (ref.current) {
//         ref.current.textContent = `${Intl.NumberFormat("en-IN").format(latest.toFixed(0))}${suffix || ""}`;
//       }
//     });
//   }, [springValue, suffix]);

//   return <span ref={ref} />;
// }
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import banner from "../assets/trucks-banner.jpg";
import { useEffect, useRef } from "react";
import Features from "../components/Features";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function About() {
  return (
    <div className="bg-white text-gray-800 pt-[70px]">
      {/* Hero Section: text on top of the trucks photo */}
      <section className="relative w-full min-h-[620px] lg:min-h-[720px] overflow-hidden flex items-start justify-center">
        {/* Background photo */}
        <motion.img
          src={banner}
          alt="Rodio transport trucks"
          className="absolute inset-0 w-full h-full object-cover object-bottom"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Soft top shade so text is readable over the sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/75 via-gray-900/35 to-transparent" />

        {/* Text */}
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 pt-14 lg:pt-20 text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* <motion.span
            variants={fadeUp}
            className="inline-block bg-orange-500 text-white px-6 py-2.5 rounded-full text-base lg:text-lg font-bold tracking-widest"
          >
            ABOUT RODIO
          </motion.span> */}

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
          >
            India's Digital{" "}
            <span className="text-orange-400">Transport Platform</span>
          </motion.h1>

         <motion.p
  variants={fadeUp}
  className="mt-6 mx-auto max-w-4xl rounded-xl border border-white/30 bg-blue-950/80 px-5 py-4 text-xl lg:text-2xl font-medium text-white leading-8 lg:leading-10 text-center shadow-2xl"
>
  Rodio is India's digital transport platform connecting customers
  with verified transporters, truck owners, fleet owners, and
  logistics companies. Our mission is to make transportation simple,
  transparent, and affordable, as well as help transport businesses
  grow across India.
</motion.p>
        </motion.div>
      </section>

      {/* Statistics */}
      <motion.section
        className="max-w-7xl mx-auto px-6 -mt-14 relative z-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8 lg:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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
              <h3 className="text-5xl lg:text-6xl font-extrabold text-orange-500">
                <AnimatedCounter from={0} to={stat.count} suffix={stat.suffix} />
              </h3>
              <p className="text-gray-700 text-xl lg:text-2xl mt-3 font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="mt-16">
        <Features />
      </div>
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
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Intl.NumberFormat("en-IN").format(
          latest.toFixed(0)
        )}${suffix || ""}`;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} />;
}