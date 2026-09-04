
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

import rajeshImg from "../assets/o1.jpeg";
import priyaImg from "../assets/02.jpeg";
import amitImg from "../assets/123.avif";

export function Feedback() {
  const testimonials = [
    {
      name: "Manjoor Ansari",
      role: "Indore Barhi RoadLines",
      image: rajeshImg,
      text: "Rodio reduced our logistics costs by 30%. The bidding system is fantastic and delivery is always on time.",
    },
    {
      name: "Narendra Bhale",
      role: "Shivam Automovers",
      image: priyaImg,
      text: "Best platform for finding loads. My fleet utilization improved significantly and payments are always secure.",
    },
    {
      name: "Amit Patel",
      role: "Broker",
      image: amitImg,
      text: "Managing multiple clients and shipments has never been easier. Highly recommended for logistics businesses.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/40 to-purple-50/50 py-24">
      
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            USER FEEDBACK
          </span>

          <h2 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            What Our Users Say
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Trusted by customers, transporters and brokers across India.
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-3">

          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-80px",
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
              className="group relative overflow-hidden rounded-3xl border border-blue-200/50 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-8 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
            >

              {/* Decorative Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-purple-400/20 blur-2xl transition-transform duration-700 group-hover:scale-150" />

              <div className="pointer-events-none absolute -bottom-20 -left-16 h-40 w-40 rounded-full bg-blue-400/20 blur-2xl transition-transform duration-700 group-hover:scale-125" />

              {/* ================================================= */}
              {/* 45 DEGREE LIGHT SWEEP - SAME AS FEATURES */}
              {/* ================================================= */}
              <motion.div
                className="
                  pointer-events-none
                  absolute
                  -top-[120%]
                  -left-[65%]
                  z-20
                  h-[300%]
                  w-[52%]
                  rotate-45
                  bg-gradient-to-r
                  from-transparent
                  via-white/30
                  to-transparent
                  blur-[2px]
                "
                animate={{
                  x: ["-100%", "500%"],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />

              {/* Quote */}
              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3,
                }}
                className="relative z-10"
              >
                <Quote className="h-10 w-10 text-blue-200" />
              </motion.div>

              {/* Stars */}
              <div className="relative z-10 mt-5 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * 0.15 + star * 0.08,
                      duration: 0.25,
                    }}
                  >
                    <Star
                      size={18}
                      fill="#facc15"
                      color="#facc15"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Text */}
              <p className="relative z-10 mt-6 min-h-[120px] text-[20px] italic leading-7 text-blue-50">
                "{item.text}"
              </p>

              {/* Divider */}
              <div className="relative z-10 my-6 h-px bg-white/10" />

              {/* User */}
              <div className="relative z-10 flex items-center gap-4">

                <motion.img
                  src={item.image}
                  alt={item.name}
                  whileHover={{
                    scale: 1.1,
                    rotate: 3,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="h-14 w-14 rounded-full border-2 border-white/70 object-cover shadow-lg"
                />

                <div>
                  <h3 className="text-lg font-bold text-white">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-[16px] text-blue-200">
                    {item.role}
                  </p>
                </div>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default Feedback;