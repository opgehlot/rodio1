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
    <div className="w-full max-w-full overflow-x-clip bg-gray-50 text-gray-800 pt-[70px]">

      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6"
      >
        <motion.div
          className="absolute -top-24 -left-24 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-blue-300/40 blur-xl sm:blur-3xl"
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-orange-300/40 blur-xl sm:blur-3xl"
        />
        <motion.div
          className="absolute top-1/3 left-1/2 w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full bg-pink-300/30 blur-xl sm:blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto grid min-w-0 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div>
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full text-base font-semibold shadow-lg shadow-blue-300/60"
            >
              India's Smart Transport Platform
            </motion.span>

            <motion.h1
              className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mt-6 leading-tight"
            >
              Explore Powerful{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Transport Services
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-base sm:text-lg lg:text-xl text-gray-600 leading-7 sm:leading-8 lg:leading-9"
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
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-blue-500 via-purple-500 to-orange-400 opacity-60 blur-xl" />
            <img
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900"
              alt="Transport Services"
              className="relative block w-full max-w-full h-auto object-cover rounded-2xl sm:rounded-3xl shadow-xl border-2 sm:border-4 border-white"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Statistics */}
      <motion.section
        className="max-w-7xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gray-50"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { count: 5000, label: "Businesses", suffix: "+" },
            { count: 8000, label: "Transporters", suffix: "+" },
            { count: 24, label: "Support", suffix: "x7" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className={`relative overflow-hidden bg-gradient-to-br ${pal(index * 2).grad} text-white rounded-2xl p-4 sm:p-6 lg:p-8 text-center shadow-xl`}
            >
              <motion.div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/20"
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-white/10"
              />
              <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                <AnimatedCounter from={0} to={item.count} suffix={item.suffix} />
              </h2>
              <p className="relative mt-3 text-base sm:text-lg lg:text-xl text-white/90">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-24"
      >
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Our Premium Services</h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl mt-4 max-w-2xl mx-auto">
            Search transport businesses, discover vehicles, explore leads and
            connect with India's growing logistics community.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-14">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`min-w-0 group bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl ${pal(index).glow} transition-shadow duration-300 overflow-hidden`}
            >
              <div className={`relative overflow-hidden bg-gradient-to-r ${service.color} p-5 sm:p-6 lg:p-7 text-white transition-all duration-300 group-hover:brightness-110`}>
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20"
                />
                <div className="absolute -bottom-12 left-1/3 w-32 h-32 rounded-full bg-white/10" />
                <motion.div
                  className="relative inline-flex p-4 rounded-2xl bg-white/25 backdrop-blur shadow-inner"
                >
                  {service.icon}
                </motion.div>
                <h3 className="relative text-xl sm:text-2xl lg:text-3xl font-bold mt-5">{service.title}</h3>
              </div>

              <div className="p-4 sm:p-6 lg:p-7">
                <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-7 sm:leading-8">{service.description}</p>

                <div className="mt-5 space-y-3 border-t border-gray-100 pt-5">
                  {["Verified Listings", "Fast Search", "Trusted Network"].map((label, i) => (
                    <motion.div
                      key={i}
                      className={`flex items-center gap-3 text-base sm:text-lg text-gray-700 rounded-xl px-4 py-2 bg-gradient-to-r ${pal(index).softGrad}`}
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
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white via-blue-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Rodio?
              </span>
            </h2>
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-7 sm:leading-8 lg:leading-9">
              Rodio is more than just a transport directory. We connect
              businesses, transporters, brokers and customers through one
              trusted digital platform.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
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
                className={`relative overflow-hidden bg-white rounded-2xl p-4 sm:p-6 lg:p-8 border-2 ${pal(index).border} shadow-md hover:shadow-2xl ${pal(index).glow} transition-shadow duration-300 flex flex-col items-start`}
              >
                <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full ${pal(index).soft} opacity-70`} />
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${pal(index).bar}`} />
                <motion.div
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${pal(index).grad} shadow-lg flex items-center justify-center mb-5`}
                >
                  {item.icon}
                </motion.div>
                <h3 className="relative text-base sm:text-lg lg:text-2xl font-bold mb-3 text-gray-800">
                  {item.title}
                </h3>
                <p className="relative text-gray-600 text-base sm:text-lg leading-7 sm:leading-8 flex-grow">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">How Rodio Works</h2>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl mt-4">
              Start your business journey in just four simple steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8 mt-10 sm:mt-12 lg:mt-16">
            {[
              ["01", "Create Account"],
              ["02", "Complete Profile"],
              ["03", "Search Services"],
              ["04", "Connect & Grow"],
            ].map((step, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden bg-white rounded-2xl p-4 sm:p-6 lg:p-8 text-center border-2 ${pal(index + 1).border} shadow-md hover:shadow-2xl ${pal(index + 1).glow} transition-shadow duration-300`}
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${pal(index + 1).bar}`} />
                <div className="relative w-20 h-20 mx-auto">
                  <motion.span
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${pal(index + 1).grad}`}
                  />
                  <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${pal(index + 1).grad} text-white flex items-center justify-center text-3xl sm:text-4xl font-bold mx-auto shadow-lg`}>
                    {step[0]}
                  </div>
                </div>
                <h3 className={`mt-6 text-2xl sm:text-3xl font-bold ${pal(index + 1).text}`}>{step[1]}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Business Categories */}
      <motion.section
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-orange-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Business Categories</h2>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl mt-4">
              Find businesses from every logistics category.
            </p>
          </div>

          <div className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mt-10 sm:mt-12 lg:mt-16">
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
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pal(index).grad} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <h3 className={`relative font-semibold text-base sm:text-lg lg:text-xl ${pal(index).text} group-hover:text-white transition-colors duration-300`}>{item}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Vehicle Types */}
      <motion.section
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-cyan-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Search Vehicles</h2>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600">
              Explore all commercial vehicle categories available on Rodio.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6 mt-10 sm:mt-12 lg:mt-16">
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
              >
                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pal(index).bar}`} />
                <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${pal(index).grad} text-white shadow-lg transition duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <FaTruckMoving size={32} />
                </div>
                <h3 className={`font-semibold text-base sm:text-lg lg:text-xl ${pal(index).text}`}>{vehicle}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Customer Testimonials */}
      <motion.section
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-pink-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-base sm:text-lg lg:text-xl font-semibold uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mt-4">
              What Our Customers Say
            </h2>
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              Thousands of transport businesses trust Rodio to grow their
              business and connect with verified customers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
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
                className={`relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl ${pal(index * 2).glow} p-4 sm:p-6 lg:p-8 transition-shadow duration-300`}
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${pal(index * 2).bar}`} />
                <div className={`absolute -bottom-16 -right-16 w-44 h-44 rounded-full ${pal(index * 2).soft} opacity-70`} />
                <motion.div
                  className="relative flex text-yellow-400 text-base sm:text-lg lg:text-2xl mb-5"
                >
                  ★★★★★
                </motion.div>
                <p className="relative text-gray-600 text-base sm:text-lg leading-7 sm:leading-8 lg:leading-9">"{item.review}"</p>
                <div className="relative mt-8 flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${pal(index * 2).grad} ring-4 ring-white shadow-lg flex items-center justify-center text-white text-base sm:text-lg lg:text-xl font-bold`}>
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-base sm:text-lg lg:text-xl">{item.name}</h4>
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
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Everything You Need In One Platform
            </h2>
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl mt-5 max-w-3xl mx-auto">
              Rodio offers complete transport business solutions for customers,
              transporters, brokers and fleet owners.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-10 sm:mt-12 lg:mt-16">
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
                className={`relative overflow-hidden bg-white border-2 ${pal(index).border} rounded-2xl p-4 sm:p-6 lg:p-8 group shadow-sm hover:shadow-2xl ${pal(index).glow} transition-shadow duration-300`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${pal(index).grad} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${pal(index).grad} text-white flex items-center justify-center text-base sm:text-lg lg:text-2xl font-bold mb-5 shadow-lg group-hover:from-white group-hover:to-white ${pal(index).gtext} group-hover:rotate-12 group-hover:scale-110 transition duration-300`}>
                  <FaCheckCircle />
                </div>
                <h3 className={`relative text-base sm:text-lg lg:text-2xl font-bold ${pal(index).text} group-hover:text-white transition-colors duration-300`}>{feature}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-white to-blue-50"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600">
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
              >
                <summary className={`font-semibold text-base sm:text-lg lg:text-2xl ${pal(index * 2).text}`}>{faq.q}</summary>
                <p className="mt-4 text-gray-600 text-base sm:text-lg lg:text-xl leading-7 sm:leading-8">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </motion.section>
      <SEODirectoryLinks/>

      {/* Final CTA */}
      <motion.section
        className="relative overflow-hidden py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"
      >
        <motion.div
          className="absolute -top-24 -left-24 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-white/10 blur-lg sm:blur-2xl"
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-orange-400/30 blur-xl sm:blur-3xl"
        />
        <motion.div
          className="absolute top-10 right-1/4 w-40 h-40 rounded-full bg-pink-400/30 blur-lg sm:blur-2xl"
        />

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight text-white">
            Ready To Grow <br /> Your{" "}
            <span className="text-yellow-300">Transport Business?</span>
          </h2>

          <p className="mt-8 text-base sm:text-lg lg:text-2xl text-white/90 leading-7 sm:leading-8 lg:leading-9">
            Join thousands of verified transporters, fleet owners, brokers and
            customers already growing with Rodio.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => navigate("/queryform")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl font-bold shadow-2xl shadow-orange-500/40"
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
