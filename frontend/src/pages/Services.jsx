// import React, { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
// import {
//   FaTruckMoving,
//   FaSearch,
//   FaUsers,
//   FaBuilding,
//   FaClipboardList,
//   FaWarehouse,
//   FaCheckCircle,
//   FaStar,
// } from "react-icons/fa";
// import {
//   ShieldCheck,
//   Zap,
//   FileText,
//   Globe,
//   TrendingUp,
// } from "lucide-react";
// import SEODirectoryLinks from "../components/SEODirectoryLinks";
// // import LanguageSwitcher from "../languages/LanguageSwitcher";
// // import LanguageTranslator from "../languages/locales/LanguageTranslator";

// const Services = () => {
//   const navigate = useNavigate();

//   const isLoggedIn = !!localStorage.getItem("token");

//   const services = [
//     {
//       title: "Vehicle Search",
//       icon: <FaTruckMoving size={45} />,
//       color: "from-blue-600 to-indigo-700",
//       description:
//         "Search verified trucks, pickups, trailers, tankers and commercial vehicles across India.",
//       path: "/MyDashboard",
//     },
//     {
//       title: "Transporter Search",
//       icon: <FaSearch size={45} />,
//       color: "from-blue-600 to-indigo-700",
//       description:
//         "Find trusted transport companies with ratings, reviews and verified profiles.",
//       path: "/MyDashboard",
//     },
//     {
//       title: "Directory Search",
//       icon: <FaBuilding size={45} />,
//       color: "from-blue-600 to-indigo-700",
//       description:
//         "Explore India's transport business directory with thousands of verified businesses.",
//       path: "/MyDashboard",
//     },
//     {
//       title: "Lead Search",
//       icon: <FaClipboardList size={45} />,
//       color: "from-blue-600 to-indigo-700",
//       description:
//         "Discover transport leads and business opportunities from different locations.",
//       path: "/MyDashboard",
//     },
//     {
//       title: "Broker Search",
//       icon: <FaUsers size={45} />,
//       color: "from-blue-600 to-indigo-700",
//       description:
//         "Find trusted brokers and logistics partners to grow your business.",
//       path: "/MyDashboard",
//     },
//     {
//       title: "Warehouse Search",
//       icon: <FaWarehouse size={45} />,
//       color: "from-blue-600 to-indigo-700",
//       description:
//         "Search warehouses, logistics parks and storage facilities near your city.",
//       path: "/MyDashboard",
//     },
//   ];

//   return (
//     <div className="bg-gray-50 text-gray-800 pt-[70px]">
    
//       {/* Hero Section */}
//       <motion.section
//         className="bg-white py-20 px-6"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-base font-semibold">
//               India's Smart Transport Platform
//             </span>

//             <h1 className="text-5xl lg:text-6xl font-extrabold mt-6 leading-tight">
//               Explore Powerful{" "}
//               <span className="text-blue-600">Transport Services</span>
//             </h1>

//             <p className="mt-6 text-xl text-gray-600 leading-9">
//               Rodio connects customers, transporters, fleet owners, brokers and
//               logistics companies through one trusted digital platform.
//             </p>

//             {/* <div className="flex flex-wrap gap-4 mt-10">
//               <button
//                 onClick={() => handleNavigate("/register")}
//                 className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105"
//               >
//                 Explore Services
//               </button>

//               <button
//                 onClick={() => navigate("/register")}
//                 className="border border-gray-300 px-8 py-3 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition"
//               >
//                 Join Rodio
//               </button>
//             </div> */}
//           </div>

//           <div>
//             <img
//               src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900"
//               alt="Transport Services"
//               className="rounded-3xl shadow-2xl"
//             />
//           </div>
//         </div>
//       </motion.section>

//       {/* Statistics */}
//       <motion.section
//         className="max-w-7xl mx-auto py-20 px-6 bg-gray-50"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             { count: 5000, label: "Businesses", suffix: "+" },
//             { count: 8000, label: "Transporters", suffix: "+" },
//             { count: 24, label: "Support", suffix: "x7" },
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               className="bg-white rounded-2xl border border-gray-200 p-8 text-center"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-5xl font-bold text-blue-700">
//                 <AnimatedCounter from={0} to={item.count} suffix={item.suffix} />
//               </h2>
//               <p className="mt-3 text-xl text-gray-600">{item.label}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* Services Grid */}
//       <motion.section
//         className="max-w-7xl mx-auto px-6 pb-24"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="text-center">
//           <h2 className="text-5xl font-bold">Our Premium Services</h2>
//           <p className="text-gray-600 text-xl mt-4 max-w-2xl mx-auto">
//             Search transport businesses, discover vehicles, explore leads and
//             connect with India's growing logistics community.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
//           {services.map((service, index) => (
//             <motion.div
//               key={index}
//               className="group bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               viewport={{ once: true }}
//             >
//               <div className={`bg-gradient-to-r ${service.color} p-7 text-white transition-all duration-300 group-hover:brightness-105`}>
//                 {service.icon}
//                 <h3 className="text-2xl sm:text-3xl font-bold mt-5">{service.title}</h3>
//               </div>

//               <div className="p-6 sm:p-7">
//                 <p className="text-lg sm:text-xl text-gray-600 leading-8">{service.description}</p>

//                 <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
//                   <div className="flex items-center gap-2 text-lg text-gray-700">
//                     <FaCheckCircle className="text-green-500" />
//                     Verified Listings
//                   </div>
//                   <div className="flex items-center gap-2 text-lg text-gray-700">
//                     <FaCheckCircle className="text-green-500" />
//                     Fast Search
//                   </div>
//                   <div className="flex items-center gap-2 text-lg text-gray-700">
//                     <FaCheckCircle className="text-green-500" />
//                     Trusted Network
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </motion.section>

//       {/* Why Choose Rodio */}
//       <motion.section
//         className="py-24 bg-white"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl lg:text-6xl font-bold">
//               Why Choose <span className="text-blue-600">Rodio?</span>
//             </h2>
//             <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto leading-9">
//               Rodio is more than just a transport directory. We connect
//               businesses, transporters, brokers and customers through one
//               trusted digital platform.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Verified Businesses",
//                 desc: "Every transporter and business profile is manually verified for better trust.",
//                 icon: <ShieldCheck className="text-blue-600" size={30} />,
//               },
//               {
//                 title: "Fast Search",
//                 desc: "Search vehicles, transporters and businesses within seconds.",
//                 icon: <Zap className="text-blue-600" size={30} />,
//               },
//               {
//                 title: "Daily Business Leads",
//                 desc: "Receive genuine transport enquiries and logistics opportunities.",
//                 icon: <FileText className="text-blue-600" size={30} />,
//               },
//               {
//                 title: "Nationwide Network",
//                 desc: "Connect with transport companies from every state of India.",
//                 icon: <Globe className="text-blue-600" size={30} />,
//               },
//               {
//                 title: "Ratings & Reviews",
//                 desc: "Choose reliable businesses based on customer feedback.",
//                 icon: <FaStar className="text-blue-600" size={30} />,
//               },
//               {
//                 title: "Business Growth",
//                 desc: "Increase visibility and attract more customers online.",
//                 icon: <TrendingUp className="text-blue-600" size={30} />,
//               },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col items-start"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
//                   {item.icon}
//                 </div>
//                 <h3 className="text-2xl font-bold mb-3 text-gray-800">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600 text-lg leading-8 flex-grow">
//                   {item.desc}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* How It Works */}
//       <motion.section
//         className="py-24 bg-gray-50"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center">
//             <h2 className="text-5xl font-bold">How Rodio Works</h2>
//             <p className="text-gray-600 text-xl mt-4">
//               Start your business journey in just four simple steps.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
//             {[
//               ["01", "Create Account"],
//               ["02", "Complete Profile"],
//               ["03", "Search Services"],
//               ["04", "Connect & Grow"],
//             ].map((step, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-2xl p-8 text-center border border-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold mx-auto">
//                   {step[0]}
//                 </div>
//                 <h3 className="mt-6 text-3xl font-bold">{step[1]}</h3>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Business Categories */}
//       <motion.section
//         className="py-24 bg-white"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center">
//             <h2 className="text-5xl font-bold">Business Categories</h2>
//             <p className="text-gray-600 text-xl mt-4">
//               Find businesses from every logistics category.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
//             {[
//               "Bike Taxi Auto",
//               "Broker",
//               "Bus / Truck Body Builder",
//               "Bus Service",
//               "C&F Agent",
//               "Car Carrier",
//               "CHA Agent (Custom House Agent)",
//               "Courier / Cargo Carrier",
//               "Finance Company",
//               "Fleet Owner",
//               "Insurance Company",
//               "Logistics Company",
//               "Mechanic & Service Center",
//               "Mining Vehicle Supplier",
//               "Packers & Movers",
//               "Parts & Battery Supplier",
//               "RTO Agent",
//               "Transporter (Service Provider)",
//               "Travel & Taxi Service",
//               "Truck Owner",
//               "User / Manufacturer / Trader / Shipper / Other",
//               "Warehouse",
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-gray-100 rounded-xl p-6 text-center hover:bg-blue-600 hover:text-white transition-all duration-300 cursor-pointer"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.05 }}
//                 viewport={{ once: true }}
//               >
//                 <h3 className="font-semibold text-xl">{item}</h3>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Vehicle Types */}
//       <motion.section
//         className="py-24 bg-gray-50"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center">
//             <h2 className="text-5xl font-bold">Search Vehicles</h2>
//             <p className="mt-4 text-xl text-gray-600">
//               Explore all commercial vehicle categories available on Rodio.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
//             {[
//               "Canter",
//               "Closed Body",
//               "Container",
//               "HCV",
//               "LCV",
//               "Mini Truck",
//               "Open Body",
//               "Pickup",
//               "Tanker",
//               "Trailer",
//               "Truck",
//             ].map((vehicle, index) => (
//               <motion.div
//                 key={index}
//                 className="group bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.05 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-700 shadow-sm transition duration-300 group-hover:scale-105 group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white">
//                   <FaTruckMoving size={32} />
//                 </div>
//                 <h3 className="font-semibold text-xl text-gray-800">{vehicle}</h3>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Customer Testimonials */}
//       <motion.section
//         className="py-24 bg-white"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <span className="text-blue-600 text-xl font-semibold uppercase tracking-widest">
//               Testimonials
//             </span>
//             <h2 className="text-5xl lg:text-6xl font-bold mt-4">
//               What Our Customers Say
//             </h2>
//             <p className="mt-5 text-xl text-gray-600 max-w-2xl mx-auto">
//               Thousands of transport businesses trust Rodio to grow their
//               business and connect with verified customers.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {[
//               {
//                 name: "Rajesh Sharma",
//                 role: "Transport Owner",
//                 review:
//                   "Rodio helped me connect with genuine customers. My business has grown significantly after joining.",
//               },
//               {
//                 name: "Amit Verma",
//                 role: "Fleet Owner",
//                 review:
//                   "Very professional platform. Vehicle search and transporter directory saved me a lot of time.",
//               },
//               {
//                 name: "Sandeep Patel",
//                 role: "Logistics Company",
//                 review:
//                   "Excellent service with verified transporters. Highly recommended for logistics businesses.",
//               },
//             ].map((item, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="flex text-yellow-400 text-2xl mb-5">★★★★★</div>
//                 <p className="text-gray-600 text-lg leading-9">"{item.review}"</p>
//                 <div className="mt-8 flex items-center gap-4">
//                   <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
//                     {item.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-xl">{item.name}</h4>
//                     <p className="text-base text-gray-500">{item.role}</p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Platform Features */}
//       <motion.section
//         className="py-24 bg-gray-50"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center">
//             <h2 className="text-5xl font-bold">
//               Everything You Need In One Platform
//             </h2>
//             <p className="text-gray-600 text-xl mt-5 max-w-3xl mx-auto">
//               Rodio offers complete transport business solutions for customers,
//               transporters, brokers and fleet owners.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
//             {[
//               "Verified Profiles",
//               "Customer Reviews",
//               "Business Leads",
//               "Location Based Search",
//               "24×7 Customer Support",
//               "Secure Business Network",
//               "Advanced Search Filters",
//               "Business Promotion",
//               "Easy Registration",
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white border border-gray-200 rounded-2xl p-8 hover:bg-blue-600 hover:text-white group transition duration-300 shadow-sm"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.05 }}
//                 viewport={{ once: true }}
//               >
//                 <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold mb-5 group-hover:bg-white group-hover:text-blue-600 transition">
//                   <FaCheckCircle />
//                 </div>
//                 <h3 className="text-2xl font-bold">{feature}</h3>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* FAQ */}
//       <motion.section
//         className="py-24 bg-white"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-5xl mx-auto px-6">
//           <div className="text-center mb-14">
//             <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>
//             <p className="mt-4 text-xl text-gray-600">
//               Everything you need to know about Rodio.
//             </p>
//           </div>

//           <div className="space-y-5">
//             {[
//               {
//                 q: "How are transporters verified?",
//                 a: "Our team manually verifies transporter profiles before approval.",
//               },
//               {
//                 q: "Can I post transport leads?",
//                 a: "Yes, registered businesses can publish transport requirements.",
//               },
//               {
//                 q: "Is Rodio available across India?",
//                 a: "Yes, Rodio connects businesses from all states of India.",
//               },
//             ].map((faq, index) => (
//               <motion.details
//                 key={index}
//                 className="bg-white rounded-2xl shadow p-6 cursor-pointer"
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: index * 0.1 }}
//                 viewport={{ once: true }}
//               >
//                 <summary className="font-semibold text-2xl">{faq.q}</summary>
//                 <p className="mt-4 text-gray-600 text-xl leading-8">{faq.a}</p>
//               </motion.details>
//             ))}
//           </div>
//         </div>
//       </motion.section>
//       <SEODirectoryLinks/>

//       {/* Final CTA */}
//       <motion.section
//         className="py-24 bg-gray-100"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//       >
//         <div className="max-w-5xl mx-auto text-center px-6">
//           <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
//             Ready To Grow <br /> Your{" "}
//             <span className="text-blue-600">Transport Business?</span>
//           </h2>

//           <p className="mt-8 text-2xl text-gray-600 leading-9">
//             Join thousands of verified transporters, fleet owners, brokers and
//             customers already growing with Rodio.
//           </p>

//           <div className="mt-12 flex flex-wrap justify-center gap-4">
//             <button
//               onClick={() => navigate("/queryform")}
//               className="bg-blue-600 text-white text-xl px-10 py-4 rounded-xl font-bold hover:bg-blue-700 transition-transform transform hover:scale-105"
//             >
//               Contect Us
//             </button>

//             {/* <button
//               onClick={() => navigate("/queryform")}
//               className="border border-gray-300 px-10 py-3 rounded-xl hover:bg-gray-200 transition"
//             >
//               Contact Us
//             </button> */}
//           </div>
//         </div>
//       </motion.section>
//     </div>
//   );
// };

// export default Services;

// function AnimatedCounter({ from, to, suffix }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   const motionValue = useMotionValue(from);
//   const springValue = useSpring(motionValue, {
//     damping: 100,
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
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  FaTruckMoving,
  FaSearch,
  FaUsers,
  FaBuilding,
  FaClipboardList,
  FaWarehouse,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import {
  ShieldCheck,
  Zap,
  FileText,
  Globe,
  TrendingUp,
} from "lucide-react";
import SEODirectoryLinks from "../components/SEODirectoryLinks";
// import LanguageSwitcher from "../languages/LanguageSwitcher";
// import LanguageTranslator from "../languages/locales/LanguageTranslator";

const palettes = [
  {
    grad: "from-blue-500 to-indigo-600",
    soft: "bg-blue-100",
    softGrad: "from-blue-50 to-blue-100",
    text: "text-blue-600",
    gtext: "group-hover:text-blue-600",
    border: "border-blue-300",
    leftBorder: "border-blue-500",
    glow: "hover:shadow-blue-300/70",
    bar: "from-blue-500 to-indigo-600",
  },
  {
    grad: "from-emerald-500 to-teal-600",
    soft: "bg-emerald-100",
    softGrad: "from-emerald-50 to-emerald-100",
    text: "text-emerald-600",
    gtext: "group-hover:text-emerald-600",
    border: "border-emerald-300",
    leftBorder: "border-emerald-500",
    glow: "hover:shadow-emerald-300/70",
    bar: "from-emerald-500 to-teal-600",
  },
  {
    grad: "from-orange-500 to-amber-500",
    soft: "bg-orange-100",
    softGrad: "from-orange-50 to-orange-100",
    text: "text-orange-600",
    gtext: "group-hover:text-orange-600",
    border: "border-orange-300",
    leftBorder: "border-orange-500",
    glow: "hover:shadow-orange-300/70",
    bar: "from-orange-500 to-amber-500",
  },
  {
    grad: "from-pink-500 to-rose-600",
    soft: "bg-pink-100",
    softGrad: "from-pink-50 to-pink-100",
    text: "text-pink-600",
    gtext: "group-hover:text-pink-600",
    border: "border-pink-300",
    leftBorder: "border-pink-500",
    glow: "hover:shadow-pink-300/70",
    bar: "from-pink-500 to-rose-600",
  },
  {
    grad: "from-purple-500 to-violet-600",
    soft: "bg-purple-100",
    softGrad: "from-purple-50 to-purple-100",
    text: "text-purple-600",
    gtext: "group-hover:text-purple-600",
    border: "border-purple-300",
    leftBorder: "border-purple-500",
    glow: "hover:shadow-purple-300/70",
    bar: "from-purple-500 to-violet-600",
  },
  {
    grad: "from-cyan-500 to-sky-600",
    soft: "bg-cyan-100",
    softGrad: "from-cyan-50 to-cyan-100",
    text: "text-cyan-600",
    gtext: "group-hover:text-cyan-600",
    border: "border-cyan-300",
    leftBorder: "border-cyan-500",
    glow: "hover:shadow-cyan-300/70",
    bar: "from-cyan-500 to-sky-600",
  },
];

const pal = (i) => palettes[i % palettes.length];

const Services = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const services = [
    {
      title: "Vehicle Search",
      icon: <FaTruckMoving size={45} />,
      color: "from-blue-500 to-indigo-600",
      description:
        "Search verified trucks, pickups, trailers, tankers and commercial vehicles across India.",
      path: "/MyDashboard",
    },
    {
      title: "Transporter Search",
      icon: <FaSearch size={45} />,
      color: "from-emerald-500 to-teal-600",
      description:
        "Find trusted transport companies with ratings, reviews and verified profiles.",
      path: "/MyDashboard",
    },
    {
      title: "Directory Search",
      icon: <FaBuilding size={45} />,
      color: "from-orange-500 to-amber-500",
      description:
        "Explore India's transport business directory with thousands of verified businesses.",
      path: "/MyDashboard",
    },
    {
      title: "Lead Search",
      icon: <FaClipboardList size={45} />,
      color: "from-pink-500 to-rose-600",
      description:
        "Discover transport leads and business opportunities from different locations.",
      path: "/MyDashboard",
    },
    {
      title: "Broker Search",
      icon: <FaUsers size={45} />,
      color: "from-purple-500 to-violet-600",
      description:
        "Find trusted brokers and logistics partners to grow your business.",
      path: "/MyDashboard",
    },
    {
      title: "Warehouse Search",
      icon: <FaWarehouse size={45} />,
      color: "from-cyan-500 to-sky-600",
      description:
        "Search warehouses, logistics parks and storage facilities near your city.",
      path: "/MyDashboard",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800 pt-[70px] overflow-x-hidden">
    
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-20 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-300/40 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-orange-300/40 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 w-72 h-72 rounded-full bg-pink-300/30 blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full text-base font-semibold shadow-lg shadow-blue-300/60"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              India's Smart Transport Platform
            </motion.span>

            <motion.h1
              className="text-5xl lg:text-6xl font-extrabold mt-6 leading-tight"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Explore Powerful{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Transport Services
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-xl text-gray-600 leading-9"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              Rodio connects customers, transporters, fleet owners, brokers and
              logistics companies through one trusted digital platform.
            </motion.p>

            {/* <div className="flex flex-wrap gap-4 mt-10">
              <button
                onClick={() => handleNavigate("/register")}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                Explore Services
              </button>

              <button
                onClick={() => navigate("/register")}
                className="border border-gray-300 px-8 py-3 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition"
              >
                Join Rodio
              </button>
            </div> */}
          </div>

          <motion.div
            className="relative"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-blue-500 via-purple-500 to-orange-400 opacity-60 blur-xl" />
            <img
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900"
              alt="Transport Services"
              className="relative rounded-3xl shadow-2xl border-4 border-white"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics */}
      <motion.section
        className="max-w-7xl mx-auto py-20 px-6 bg-gray-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { count: 5000, label: "Businesses", suffix: "+" },
            { count: 8000, label: "Transporters", suffix: "+" },
            { count: 24, label: "Support", suffix: "x7" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden bg-gradient-to-br ${pal(index * 2).grad} text-white rounded-2xl p-8 text-center shadow-xl`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.04 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/20"
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-white/10"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <h2 className="relative text-5xl font-bold text-white">
                <AnimatedCounter from={0} to={item.count} suffix={item.suffix} />
              </h2>
              <p className="relative mt-3 text-xl text-white/90">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        className="max-w-7xl mx-auto px-6 pb-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <h2 className="text-5xl font-bold">Our Premium Services</h2>
          <p className="text-gray-600 text-xl mt-4 max-w-2xl mx-auto">
            Search transport businesses, discover vehicles, explore leads and
            connect with India's growing logistics community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`group bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl ${pal(index).glow} transition-shadow duration-300 overflow-hidden`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={`relative overflow-hidden bg-gradient-to-r ${service.color} p-7 text-white transition-all duration-300 group-hover:brightness-110`}>
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="absolute -bottom-12 left-1/3 w-32 h-32 rounded-full bg-white/10" />
                <motion.div
                  className="relative inline-flex p-4 rounded-2xl bg-white/25 backdrop-blur shadow-inner"
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="relative text-2xl sm:text-3xl font-bold mt-5">{service.title}</h3>
              </div>

              <div className="p-6 sm:p-7">
                <p className="text-lg sm:text-xl text-gray-600 leading-8">{service.description}</p>

                <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                  {["Verified Listings", "Fast Search", "Trusted Network"].map((label, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-center gap-3 text-lg text-gray-700 rounded-xl px-4 py-2 bg-gradient-to-r ${pal(index).softGrad}`}
                      whileHover={{ x: 8 }}
                    >
                      <FaCheckCircle className={pal(index).text} />
                      {label}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={`h-2 bg-gradient-to-r ${pal(index).bar}`} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Choose Rodio */}
      <motion.section
        className="py-24 bg-gradient-to-b from-white via-blue-50 to-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Rodio?
              </span>
            </h2>
            <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto leading-9">
              Rodio is more than just a transport directory. We connect
              businesses, transporters, brokers and customers through one
              trusted digital platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Verified Businesses",
                desc: "Every transporter and business profile is manually verified for better trust.",
                icon: <ShieldCheck className="text-white" size={32} />,
              },
              {
                title: "Fast Search",
                desc: "Search vehicles, transporters and businesses within seconds.",
                icon: <Zap className="text-white" size={32} />,
              },
              {
                title: "Daily Business Leads",
                desc: "Receive genuine transport enquiries and logistics opportunities.",
                icon: <FileText className="text-white" size={32} />,
              },
              {
                title: "Nationwide Network",
                desc: "Connect with transport companies from every state of India.",
                icon: <Globe className="text-white" size={32} />,
              },
              {
                title: "Ratings & Reviews",
                desc: "Choose reliable businesses based on customer feedback.",
                icon: <FaStar className="text-white" size={32} />,
              },
              {
                title: "Business Growth",
                desc: "Increase visibility and attract more customers online.",
                icon: <TrendingUp className="text-white" size={32} />,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden bg-white rounded-2xl p-8 border-2 ${pal(index).border} shadow-md hover:shadow-2xl ${pal(index).glow} transition-shadow duration-300 flex flex-col items-start`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full ${pal(index).soft} opacity-70`} />
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${pal(index).bar}`} />
                <motion.div
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${pal(index).grad} shadow-lg flex items-center justify-center mb-5`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="relative text-2xl font-bold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="relative text-gray-600 text-lg leading-8 flex-grow">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-24 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl font-bold">How Rodio Works</h2>
            <p className="text-gray-600 text-xl mt-4">
              Start your business journey in just four simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              ["01", "Create Account"],
              ["02", "Complete Profile"],
              ["03", "Search Services"],
              ["04", "Connect & Grow"],
            ].map((step, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden bg-white rounded-2xl p-8 text-center border-2 ${pal(index + 1).border} shadow-md hover:shadow-2xl ${pal(index + 1).glow} transition-shadow duration-300`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${pal(index + 1).bar}`} />
                <div className="relative w-20 h-20 mx-auto">
                  <motion.span
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${pal(index + 1).grad}`}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                  />
                  <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${pal(index + 1).grad} text-white flex items-center justify-center text-4xl font-bold mx-auto shadow-lg`}>
                    {step[0]}
                  </div>
                </div>
                <h3 className={`mt-6 text-3xl font-bold ${pal(index + 1).text}`}>{step[1]}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Business Categories */}
      <motion.section
        className="py-24 bg-gradient-to-b from-white to-orange-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl font-bold">Business Categories</h2>
            <p className="text-gray-600 text-xl mt-4">
              Find businesses from every logistics category.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">
            {[
              "Bike Taxi Auto",
              "Broker",
              "Bus / Truck Body Builder",
              "Bus Service",
              "C&F Agent",
              "Car Carrier",
              "CHA Agent (Custom House Agent)",
              "Courier / Cargo Carrier",
              "Finance Company",
              "Fleet Owner",
              "Insurance Company",
              "Logistics Company",
              "Mechanic & Service Center",
              "Mining Vehicle Supplier",
              "Packers & Movers",
              "Parts & Battery Supplier",
              "RTO Agent",
              "Transporter (Service Provider)",
              "Travel & Taxi Service",
              "Truck Owner",
              "User / Manufacturer / Trader / Shipper / Other",
              "Warehouse",
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`group relative overflow-hidden rounded-xl p-6 text-center cursor-pointer bg-gradient-to-br ${pal(index).softGrad} border-2 ${pal(index).border} shadow-sm hover:shadow-xl ${pal(index).glow} transition-shadow duration-300`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pal(index).grad} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <h3 className={`relative font-semibold text-xl ${pal(index).text} group-hover:text-white transition-colors duration-300`}>{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Vehicle Types */}
      <motion.section
        className="py-24 bg-gradient-to-br from-gray-50 via-cyan-50 to-blue-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl font-bold">Search Vehicles</h2>
            <p className="mt-4 text-xl text-gray-600">
              Explore all commercial vehicle categories available on Rodio.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
            {[
              "Canter",
              "Closed Body",
              "Container",
              "HCV",
              "LCV",
              "Mini Truck",
              "Open Body",
              "Pickup",
              "Tanker",
              "Trailer",
              "Truck",
            ].map((vehicle, index) => (
              <motion.div
                key={index}
                className={`group relative overflow-hidden bg-white border-2 ${pal(index).border} rounded-2xl p-6 text-center shadow-sm hover:shadow-xl ${pal(index).glow} transition-shadow duration-300`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pal(index).bar}`} />
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${pal(index).grad} text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <FaTruckMoving size={32} />
                </div>
                <h3 className={`font-semibold text-xl ${pal(index).text}`}>{vehicle}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Customer Testimonials */}
      <motion.section
        className="py-24 bg-gradient-to-b from-white to-pink-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-xl font-semibold uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-5xl lg:text-6xl font-bold mt-4">
              What Our Customers Say
            </h2>
            <p className="mt-5 text-xl text-gray-600 max-w-2xl mx-auto">
              Thousands of transport businesses trust Rodio to grow their
              business and connect with verified customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rajesh Sharma",
                role: "Transport Owner",
                review:
                  "Rodio helped me connect with genuine customers. My business has grown significantly after joining.",
              },
              {
                name: "Amit Verma",
                role: "Fleet Owner",
                review:
                  "Very professional platform. Vehicle search and transporter directory saved me a lot of time.",
              },
              {
                name: "Sandeep Patel",
                role: "Logistics Company",
                review:
                  "Excellent service with verified transporters. Highly recommended for logistics businesses.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl ${pal(index * 2).glow} p-8 transition-shadow duration-300`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${pal(index * 2).bar}`} />
                <div className={`absolute -bottom-16 -right-16 w-44 h-44 rounded-full ${pal(index * 2).soft} opacity-70`} />
                <motion.div
                  className="relative flex text-yellow-400 text-2xl mb-5"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
                >
                  ★★★★★
                </motion.div>
                <p className="relative text-gray-600 text-lg leading-9">"{item.review}"</p>
                <div className="relative mt-8 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${pal(index * 2).grad} ring-4 ring-white shadow-lg flex items-center justify-center text-white text-xl font-bold`}>
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">{item.name}</h4>
                    <p className={`text-base font-medium ${pal(index * 2).text}`}>{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Platform Features */}
      <motion.section
        className="py-24 bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl font-bold">
              Everything You Need In One Platform
            </h2>
            <p className="text-gray-600 text-xl mt-5 max-w-3xl mx-auto">
              Rodio offers complete transport business solutions for customers,
              transporters, brokers and fleet owners.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              "Verified Profiles",
              "Customer Reviews",
              "Business Leads",
              "Location Based Search",
              "24×7 Customer Support",
              "Secure Business Network",
              "Advanced Search Filters",
              "Business Promotion",
              "Easy Registration",
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden bg-white border-2 ${pal(index).border} rounded-2xl p-8 group shadow-sm hover:shadow-2xl ${pal(index).glow} transition-shadow duration-300`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pal(index).grad} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${pal(index).grad} text-white flex items-center justify-center text-2xl font-bold mb-5 shadow-lg group-hover:from-white group-hover:to-white ${pal(index).gtext} group-hover:rotate-12 group-hover:scale-110 transition duration-300`}>
                  <FaCheckCircle />
                </div>
                <h3 className={`relative text-2xl font-bold ${pal(index).text} group-hover:text-white transition-colors duration-300`}>{feature}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        className="py-24 bg-gradient-to-b from-white to-blue-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to know about Rodio.
            </p>
          </div>

          <div className="space-y-5">
            {[
              {
                q: "How are transporters verified?",
                a: "Our team manually verifies transporter profiles before approval.",
              },
              {
                q: "Can I post transport leads?",
                a: "Yes, registered businesses can publish transport requirements.",
              },
              {
                q: "Is Rodio available across India?",
                a: "Yes, Rodio connects businesses from all states of India.",
              },
            ].map((faq, index) => (
              <motion.details
                key={index}
                className={`bg-gradient-to-r ${pal(index * 2).softGrad} rounded-2xl shadow-md hover:shadow-xl open:shadow-xl border-l-8 ${pal(index * 2).leftBorder} p-6 cursor-pointer transition-shadow duration-300`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <summary className={`font-semibold text-2xl ${pal(index * 2).text}`}>{faq.q}</summary>
                <p className="mt-4 text-gray-600 text-xl leading-8">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </motion.section>
      <SEODirectoryLinks/>

      {/* Final CTA */}
      <motion.section
        className="relative overflow-hidden py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-2xl"
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-orange-400/30 blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-10 right-1/4 w-40 h-40 rounded-full bg-pink-400/30 blur-2xl"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h2 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
            Ready To Grow <br /> Your{" "}
            <span className="text-yellow-300">Transport Business?</span>
          </h2>

          <p className="mt-8 text-2xl text-white/90 leading-9">
            Join thousands of verified transporters, fleet owners, brokers and
            customers already growing with Rodio.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => navigate("/queryform")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xl px-10 py-4 rounded-xl font-bold shadow-2xl shadow-orange-500/40"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
            >
              Contect Us
            </motion.button>

            {/* <button
              onClick={() => navigate("/queryform")}
              className="border border-gray-300 px-10 py-3 rounded-xl hover:bg-gray-200 transition"
            >
              Contact Us
            </button> */}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;

function AnimatedCounter({ from, to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 100,
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
