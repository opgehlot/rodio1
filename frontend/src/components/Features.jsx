// import { useState } from "react";
// import {
//   Truck,
//   Search,
//   Route,
//   BadgeIndianRupee,
//   PhoneCall,
//   Eye,
//   ArrowRight,
//   ArrowLeft,
//   CheckCircle2,
// } from "lucide-react";
// import { motion } from "framer-motion";

// const features = [
//   {
//     title: "Free Transport Directory",
//     desc: "Browse transporters across India in one place, completely free.",
//     brief:
//       "Rodio's directory is free for everyone. Explore transporters from different cities, compare their vehicles and services, and pick the one that suits your load. There are no signup fees and no hidden charges.",
//     tag: "100% free to use",
//     icon: Truck,
//     grad: "from-blue-500 to-blue-700",
//     soft: "bg-blue-50 text-blue-700",
//   },
//   {
//     title: "Easy Transport Search",
//     desc: "Find the right transporter in seconds by city, vehicle or service.",
//     brief:
//       "Forget endless phone calls. Search by city, vehicle type or service and use simple filters to bring the most relevant transporters to the top within seconds, so you save time on every booking.",
//     tag: "Results in seconds",
//     icon: Search,
//     grad: "from-indigo-500 to-indigo-700",
//     soft: "bg-indigo-50 text-indigo-700",
//   },
//   {
//     title: "Search by Specific Route",
//     desc: "Need a truck from Bhopal to Mumbai? Search by exact route.",
//     brief:
//       "Enter your pickup and drop locations and see only the transporters who actually operate on that route. This means fewer wrong calls and a much better chance of finding a vehicle that is available for your trip.",
//     tag: "Only relevant transporters",
//     icon: Route,
//     grad: "from-violet-500 to-purple-700",
//     soft: "bg-purple-50 text-purple-700",
//   },
//   {
//     title: "No Brokerage Charges",
//     desc: "Deal directly and keep your full margin. Rodio never takes a cut.",
//     brief:
//       "There is no broker between you and the transporter. You talk directly and agree on the rate yourselves, so your money stays with you and the pricing stays transparent. Rodio never takes any commission.",
//     tag: "Zero commission",
//     icon: BadgeIndianRupee,
//     grad: "from-emerald-500 to-green-700",
//     soft: "bg-emerald-50 text-emerald-700",
//   },
//   {
//     title: "Direct Communication",
//     desc: "Call or message customers and transporters directly.",
//     brief:
//       "Customers and transporters connect with each other directly through call or message. Decisions happen faster, requirements are clearer and there are fewer misunderstandings along the way.",
//     tag: "Talk without middlemen",
//     icon: PhoneCall,
//     grad: "from-orange-500 to-amber-600",
//     soft: "bg-orange-50 text-orange-700",
//   },
//   {
//     title: "Transparent Lead System",
//     desc: "Every lead is visible and fair, so you can grow with trust.",
//     brief:
//       "Every lead is shown clearly and everyone gets an equal chance to respond. You can see the route, vehicle and load details up front, so you only follow up on the work that fits your business.",
//     tag: "Fair for everyone",
//     icon: Eye,
//     grad: "from-pink-500 to-rose-600",
//     soft: "bg-rose-50 text-rose-700",
//   },
// ];

// const hidden = {
//   backfaceVisibility: "hidden",
//   WebkitBackfaceVisibility: "hidden",
// };

// function FeatureCard({ f, index }) {
//   const [flipped, setFlipped] = useState(false);
//   const Icon = f.icon;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
//       className="h-[340px]"
//       style={{ perspective: 1200 }}
//     >
//       <motion.div
//         className="relative h-full w-full"
//         style={{ transformStyle: "preserve-3d" }}
//         animate={{ rotateY: flipped ? 180 : 0 }}
//         transition={{ duration: 0.6, ease: "easeInOut" }}
//       >
//         {/* FRONT */}
//         <div
//           style={hidden}
//           className="group absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-md transition-shadow duration-300 hover:shadow-2xl"
//         >
//           <div
//             className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${f.grad} opacity-10 transition-transform duration-500 group-hover:scale-150`}
//           />
//           <div
//             className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${f.grad} opacity-0 transition-opacity group-hover:opacity-100`}
//           />

//           <div
//             className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${f.grad} text-white shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
//           >
//             <Icon size={28} strokeWidth={2} />
//           </div>

//           <h3 className="relative mt-5 text-xl font-bold text-gray-900">
//             {f.title}
//           </h3>
//           <p className="relative mt-2 text-[15px] leading-6 text-gray-600">
//             {f.desc}
//           </p>

//           <button
//             onClick={() => setFlipped(true)}
//             className={`relative mt-auto inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition hover:gap-2.5 ${f.soft}`}
//           >
//             Learn more <ArrowRight size={16} />
//           </button>
//         </div>

//         {/* BACK */}
//         <div
//           style={{ ...hidden, transform: "rotateY(180deg)" }}
//           className={`absolute inset-0 flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${f.grad} p-7 text-white shadow-2xl`}
//         >
//           <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
//           <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-white/10" />

//           <div className="relative flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
//               <Icon size={22} />
//             </div>
//             <h3 className="text-lg font-bold leading-snug">{f.title}</h3>
//           </div>

//           <p className="relative mt-5 text-[15px] leading-6 text-white/90">
//             {f.brief}
//           </p>

//           <div className="relative mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
//             <CheckCircle2 size={16} />
//             {f.tag}
//           </div>

//           <button
//             onClick={() => setFlipped(false)}
//             className="relative mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow transition hover:gap-2.5"
//           >
//             <ArrowLeft size={16} /> Back
//           </button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export function Features() {
//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 py-24">
//       <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />

//       <div className="relative mx-auto max-w-7xl px-6">
//         {/* Heading */}
//         <div className="mx-auto mb-16 max-w-2xl text-center">
//           <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
//             Built for Indian Transport
//           </span>
//           <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
//             Why Choose{" "}
//             <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Rodio
//             </span>
//             ?
//           </h2>
//           <p className="mt-4 text-base text-gray-500 sm:text-lg">
//             Rodio connects transporters and customers directly, with no
//             brokers, no commission and complete transparency.
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {features.map((f, i) => (
//             <FeatureCard key={f.title} f={f} index={i} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Features;
import { useState } from "react";
import {
  Contact,
  ScanSearch,
  MapPinned,
  HandCoins,
  PhoneCall,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Free Transport Directory",
    desc: "Browse transporters across India in one place, completely free.",
    brief:
      "Rodio's directory is free for everyone. Explore transporters from different cities, compare their vehicles and services, and pick the one that suits your load. There are no signup fees and no hidden charges.",
    tag: "100% free to use",
    icon: Contact,
    grad: "from-blue-500 to-blue-700",
    soft: "bg-blue-50 text-blue-700",
  },
  {
    title: "Easy Transport Search",
    desc: "Find the right transporter in seconds by city, vehicle or service.",
    brief:
      "Forget endless phone calls. Search by city, vehicle type or service and use simple filters to bring the most relevant transporters to the top within seconds, so you save time on every booking.",
    tag: "Results in seconds",
    icon: ScanSearch,
    grad: "from-indigo-500 to-indigo-700",
    soft: "bg-indigo-50 text-indigo-700",
  },
  {
    title: "Search by Specific Route",
    desc: "Need a truck from Bhopal to Mumbai? Search by exact route.",
    brief:
      "Enter your pickup and drop locations and see only the transporters who actually operate on that route. This means fewer wrong calls and a much better chance of finding a vehicle that is available for your trip.",
    tag: "Only relevant transporters",
    icon: MapPinned,
    grad: "from-violet-500 to-purple-700",
    soft: "bg-purple-50 text-purple-700",
  },
  {
    title: "No Brokerage Charges",
    desc: "Deal directly and keep your full margin. Rodio never takes a cut.",
    brief:
      "There is no broker between you and the transporter. You talk directly and agree on the rate yourselves, so your money stays with you and the pricing stays transparent. Rodio never takes any commission.",
    tag: "Zero commission",
    icon: HandCoins,
    grad: "from-emerald-500 to-green-700",
    soft: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Direct Communication",
    desc: "Call or message customers and transporters directly.",
    brief:
      "Customers and transporters connect with each other directly through call or message. Decisions happen faster, requirements are clearer and there are fewer misunderstandings along the way.",
    tag: "Talk without middlemen",
    icon: PhoneCall,
    grad: "from-orange-500 to-amber-600",
    soft: "bg-orange-50 text-orange-700",
  },
  {
    title: "Transparent Lead System",
    desc: "Every lead is visible and fair, so you can grow with trust.",
    brief:
      "Every lead is shown clearly and everyone gets an equal chance to respond. You can see the route, vehicle and load details up front, so you only follow up on the work that fits your business.",
    tag: "Fair for everyone",
    icon: ShieldCheck,
    grad: "from-pink-500 to-rose-600",
    soft: "bg-rose-50 text-rose-700",
  },
];

const hidden = {
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

function FeatureCard({ f, index }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = f.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="h-[340px]"
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* FRONT */}
        <div
          style={hidden}
          className="group absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 shadow-md transition-shadow duration-300 hover:shadow-2xl"
        >
          <div
            className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${f.grad} opacity-10 transition-transform duration-500 group-hover:scale-150`}
          />
          <div
            className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${f.grad} opacity-0 transition-opacity group-hover:opacity-100`}
          />

          {/* TOP-LEFT CURVED BUBBLE */}
          <div className="pointer-events-none absolute left-0 top-0 origin-top-left transition-transform duration-500 group-hover:scale-110">
            {/* big soft pulsing curve */}
            <motion.div
              className={`absolute left-0 top-0 h-36 w-36 origin-top-left rounded-br-[100%] bg-gradient-to-br ${f.grad} opacity-20`}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />
            {/* main curved bubble */}
            <div
              className={`relative h-28 w-28 rounded-br-[100%] bg-gradient-to-br ${f.grad} shadow-xl`}
            >
              {/* tilted icon */}
              <motion.div
                className="absolute left-5 top-5 text-white"
                animate={{ rotate: [-14, 10, -14], y: [0, -3, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.25,
                }}
              >
                <Icon size={38} strokeWidth={2.2} />
              </motion.div>
              {/* shine sweep */}
              <motion.div
                className="absolute inset-0 overflow-hidden rounded-br-[100%]"
                aria-hidden
              >
                <motion.div
                  className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-white/30"
                  animate={{ left: ["-60%", "160%"] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                />
              </motion.div>
            </div>
          </div>

          <h3 className="relative mt-24 text-xl font-bold text-gray-900">
            {f.title}
          </h3>
          <p className="relative mt-2 text-[15px] leading-6 text-gray-600">
            {f.desc}
          </p>

          <button
            onClick={() => setFlipped(true)}
            className={`relative mt-auto inline-flex w-fit items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition hover:gap-2.5 ${f.soft}`}
          >
            Learn more <ArrowRight size={16} />
          </button>
        </div>

        {/* BACK */}
        <div
          style={{ ...hidden, transform: "rotateY(180deg)" }}
          className={`absolute inset-0 flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${f.grad} p-7 text-white shadow-2xl`}
        >
          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-white/10" />

          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Icon size={22} />
            </div>
            <h3 className="text-lg font-bold leading-snug">{f.title}</h3>
          </div>

          <p className="relative mt-5 text-[15px] leading-6 text-white/90">
            {f.brief}
          </p>

          <div className="relative mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
            <CheckCircle2 size={16} />
            {f.tag}
          </div>

          <button
            onClick={() => setFlipped(false)}
            className="relative mt-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow transition hover:gap-2.5"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 py-24">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          {/* <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            Built for Indian Transport
          </span> */}
          <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Rodio
            </span>
            ?
          </h2>
          <p className="mt-4 text-base text-gray-500 sm:text-lg">
            Rodio connects transporters and customers directly, with no
            brokers, no commission and complete transparency.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;