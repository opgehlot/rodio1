import {
  Truck,
  Search,
  Route,
  BadgeIndianRupee,
  PhoneCall,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      title: "Free Transport Directory",
      icon: Truck,
      color: "from-blue-600 to-indigo-800",
    },
    {
      title: "Easy Transport Search",
      icon: Search,
      color: "from-blue-600 to-indigo-800",
    },
    {
      title: "Vehicle Search by Specific Route",
      icon: Route,
      color: "from-blue-600 to-indigo-800",
    },
    {
      title: "No Brokerage Charges",
      icon: BadgeIndianRupee,
      color: "from-blue-600 to-indigo-800",
    },
    {
      title: "Direct Communication with Customers",
      icon: PhoneCall,
      color: "from-indigo-600 to-blue-800",
    },
    {
      title: "Transparent Lead Ecosystem",
      icon: Eye,
      color: "from-indigo-600 to-blue-800",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          
           <h2 className="mt-4 text-3xl leading-tight font-bold tracking-tight text-gray-900 sm:text-5xl">
  Why Choose{" "}
  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
    Rodio
  </span>
</h2>

          <p className="text-gray-500 mt-4 text-base">
            Everything you need to connect and manage transport efficiently.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className={`
                  relative
                  overflow-hidden
                  rounded-3xl
                  p-8
                  min-h-[280px]
                  bg-gradient-to-br
                  ${feature.color}
                  shadow-lg
                  hover:shadow-2xl
                  transition-shadow
                  duration-300
                `}
              >

                {/* Decorative Circle */}
                <div
                  className="
                    absolute
                    -right-12
                    -top-12
                    h-36
                    w-36
                    rounded-full
                    bg-white/10
                    pointer-events-none
                  "
                />

                <div
                  className="
                    absolute
                    -bottom-16
                    -left-10
                    h-40
                    w-40
                    rounded-full
                    bg-white/5
                    pointer-events-none
                  "
                />

                {/* ================================================= */}
                {/* 45 DEGREE LIGHT SWEEP - SAME TIME ON ALL CARDS */}
                {/* ================================================= */}

                <motion.div
                  className="
                    absolute
                    -top-[120%]
                    -left-[65%]
                    z-20
                    h-[300%]
                    w-[52%]
                    rotate-45
                    bg-gradient-to-r
                    from-transparent
                    via-white/35
                    to-transparent
                    pointer-events-none
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

                {/* ================================================= */}
                {/* ICON */}
                {/* ================================================= */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/15
                    text-white
                    backdrop-blur-sm
                    shadow-lg
                  "
                >
                  <Icon size={30} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3
                  className="
                    relative
                    z-10
                    mt-6
                    text-xl
                    font-bold
                    leading-snug
                    text-white
                  "
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    relative
                    z-10
                    mt-3
                    text-[16px]
                    leading-6
                    text-blue-100
                  "
                >
                  Connect directly, find the right transport and manage your
                  requirements with greater transparency.
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;