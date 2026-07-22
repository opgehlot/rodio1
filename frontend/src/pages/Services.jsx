import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTruckMoving,
  FaSearch,
  FaUsers,
  FaBuilding,
  FaClipboardList,
  FaWarehouse,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

const Services = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleNavigate = (path) => {
    if (!isLoggedIn) {
      navigate("/register");
    } else {
      navigate(path);
    }
  };

  const services = [
    {
      title: "Vehicle Search",
      icon: <FaTruckMoving size={45} />,
      color: "from-blue-500 to-indigo-600",
      description:
        "Search verified trucks, pickups, trailers, tankers and commercial vehicles across India.",
      path: "/register",
    },
    {
      title: "Transporter Search",
      icon: <FaSearch size={45} />,
      color: "from-green-500 to-emerald-600",
      description:
        "Find trusted transport companies with ratings, reviews and verified profiles.",
      path: "/register",
    },
    {
      title: "Directory Search",
      icon: <FaBuilding size={45} />,
      color: "from-orange-500 to-red-500",
      description:
        "Explore India's transport business directory with thousands of verified businesses.",
      path: "/register",
    },
    {
      title: "Lead Search",
      icon: <FaClipboardList size={45} />,
      color: "from-purple-500 to-pink-500",
      description:
        "Discover transport leads and business opportunities from different locations.",
      path: "/register",
    },
    {
      title: "Broker Search",
      icon: <FaUsers size={45} />,
      color: "from-cyan-500 to-blue-600",
      description:
        "Find trusted brokers and logistics partners to grow your business.",
      path: "/register",
    },
    {
      title: "Warehouse Search",
      icon: <FaWarehouse size={45} />,
      color: "from-yellow-500 to-orange-500",
      description:
        "Search warehouses, logistics parks and storage facilities near your city.",
      path: "/register",
    },
  ];

  return (
    <div className="bg-slate-50">

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white py-24 px-6">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <span className="bg-blue-600 px-4 py-2 rounded-full text-sm">
              India's Smart Transport Platform
            </span>

            <h1 className="text-5xl lg:text-6xl font-extrabold mt-6 leading-tight">
              Explore Powerful
              <span className="text-yellow-400">
                {" "}Transport Services
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-300 leading-8">
              Rodio connects customers, transporters, fleet owners,
              brokers and logistics companies through one trusted
              digital platform.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <button
                onClick={() => handleNavigate("/register")}
                className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
              >
                Explore Services
              </button>

              <button
                onClick={() => navigate("/register")}
                className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition"
              >
                Join Rodio
              </button>

            </div>

          </div>

          <div>

            <img
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=900"
              alt=""
              className="rounded-3xl shadow-2xl"
            />

          </div>

        </div>

      </section>

      {/* Statistics */}

      <section className="max-w-7xl mx-auto py-20 px-6">

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">

          {[
            ["5000+", "Businesses"],
            ["5000+", "Transporters"],
        
            ["24x7", "Support"],
          ].map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 text-center"
            >

              <h2 className="text-4xl font-bold text-blue-700">
                {item[0]}
              </h2>

              <p className="mt-3 text-gray-600">
                {item[1]}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* Services */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="text-center">

          <h2 className="text-4xl font-bold">
            Our Premium Services
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Search transport businesses, discover vehicles,
            explore leads and connect with India's growing
            logistics community.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >

              <div className={`bg-gradient-to-r ${service.color} p-8 text-white`}>

                {service.icon}

                <h3 className="text-2xl font-bold mt-6">
                  {service.title}
                </h3>

              </div>

              <div className="p-8">

                <p className="text-gray-600 leading-7">
                  {service.description}
                </p>

                <div className="mt-6 space-y-2">

                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Verified Listings
                  </div>

                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Fast Search
                  </div>

                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Trusted Network
                  </div>

                </div>

                <button
                  onClick={() => handleNavigate(service.path)}
                  className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  Explore Service
                  <FaArrowRight />
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>
      {/* ================= WHY CHOOSE RODIO ================= */}

<section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">

    <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

            <h2 className="text-4xl lg:text-5xl font-bold">
                Why Choose Rodio?
            </h2>

            <p className="mt-5 text-gray-300 max-w-3xl mx-auto leading-8">
                Rodio is more than just a transport directory.
                We connect businesses, transporters, brokers and
                customers through one trusted digital platform.
            </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-12">

            {[
                {
                    title: "Verified Businesses",
                    desc: "Every transporter and business profile is manually verified for better trust."
                },
                {
                    title: "Fast Search",
                    desc: "Search vehicles, transporters and businesses within seconds."
                },
                {
                    title: "Daily Business Leads",
                    desc: "Receive genuine transport enquiries and logistics opportunities."
                },
                {
                    title: "Nationwide Network",
                    desc: "Connect with transport companies from every state of India."
                },
                {
                    title: "Ratings & Reviews",
                    desc: "Choose reliable businesses based on customer feedback."
                },
                {
                    title: "Business Growth",
                    desc: "Increase visibility and attract more customers online."
                }
            ].map((item, index) => (

                <div
                    key={index}
                    className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:bg-white/20 transition"
                >

                    <h3 className="text-2xl font-bold mb-4">
                        {item.title}
                    </h3>

                    <p className="text-gray-300 leading-7">
                        {item.desc}
                    </p>

                </div>

            ))}

        </div>

    </div>

</section>

{/* ================= HOW IT WORKS ================= */}

<section className="py-24 bg-white">

    <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

            <h2 className="text-4xl font-bold">
                How Rodio Works
            </h2>

            <p className="text-gray-600 mt-4">
                Start your business journey in just four simple steps.
            </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            {[
                ["01","Create Account"],
                ["02","Complete Profile"],
                ["03","Search Services"],
                ["04","Connect & Grow"]
            ].map((step,index)=>(

                <div
                    key={index}
                    className="bg-slate-50 rounded-3xl p-8 text-center shadow hover:shadow-xl transition"
                >

                    <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mx-auto">
                        {step[0]}
                    </div>

                    <h3 className="mt-6 text-2xl font-bold">
                        {step[1]}
                    </h3>

                </div>

            ))}

        </div>

    </div>

</section>

{/* ================= BUSINESS CATEGORIES ================= */}

<section className="py-24 bg-slate-100">

    <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

            <h2 className="text-4xl font-bold">
                Business Categories
            </h2>

            <p className="text-gray-600 mt-4">
                Find businesses from every logistics category.
            </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16">

            {[
                "Transporter",
                "Broker",
                "Fleet Owner",
                "Truck Owner",
                "Warehouse",
                "Courier",
                "Packing & Moving",
                "Logistics",
                "Trailer Owner",
                "Container Service",
                "Transport Company",
                 "Many More"
            ].map((item,index)=>(

                <div
                    key={index}
                    className="bg-white rounded-2xl p-8 text-center shadow hover:bg-blue-600 hover:text-white transition-all duration-300"
                >

                    <h3 className="font-semibold text-lg">
                        {item}
                    </h3>

                </div>

            ))}

        </div>

    </div>

</section>

{/* ================= VEHICLE TYPES ================= */}

<section className="py-24 bg-white">

    <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

            <h2 className="text-4xl font-bold">
                Search Vehicles
            </h2>

            <p className="mt-4 text-gray-600">
                Explore all commercial vehicle categories available on Rodio.
            </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">

            {[
                "Pickup",
                "Mini Truck",
                "Truck",
                "Trailer",
                "Container",
                "Tanker",
                "LCV",
                "HCV",
               
                "Canter",
                "Open Body",
                "Closed Body",
                 "Many More"
            ].map((vehicle,index)=>(

                <div
                    key={index}
                    className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-8 text-center hover:scale-105 transition"
                >

                    <FaTruckMoving
                        className="mx-auto mb-4"
                        size={40}
                    />

                    <h3 className="font-semibold">
                        {vehicle}
                    </h3>

                </div>

            ))}

        </div>

    </div>

</section>
{/* ====================== CUSTOMER TESTIMONIALS ====================== */}

<section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <span className="text-blue-600 font-semibold uppercase tracking-widest">
        Testimonials
      </span>

      <h2 className="text-4xl lg:text-5xl font-bold mt-4">
        What Our Customers Say
      </h2>

      <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
        Thousands of transport businesses trust Rodio to grow their business and
        connect with verified customers.
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

        <div
          key={index}
          className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-2 transition duration-300"
        >

          <div className="flex text-yellow-400 text-xl mb-5">
            ★★★★★
          </div>

          <p className="text-gray-600 leading-8">
            "{item.review}"
          </p>

          <div className="mt-8 flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
              {item.name.charAt(0)}
            </div>

            <div>

              <h4 className="font-bold">
                {item.name}
              </h4>

              <p className="text-sm text-gray-500">
                {item.role}
              </p>

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

</section>

{/* ====================== PLATFORM FEATURES ====================== */}

<section className="py-24 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center">

      <h2 className="text-4xl font-bold">
        Everything You Need In One Platform
      </h2>

      <p className="text-gray-600 mt-5 max-w-3xl mx-auto">
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

        <div
          key={index}
          className="border rounded-3xl p-8 hover:bg-blue-600 hover:text-white transition duration-300 shadow-md"
        >

          <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-2xl font-bold mb-5">
            ✓
          </div>

          <h3 className="text-xl font-bold">
            {feature}
          </h3>

        </div>

      ))}

    </div>

  </div>

</section>

{/* ====================== FAQ ====================== */}

<section className="py-24 bg-slate-100">

  <div className="max-w-5xl mx-auto px-6">

    <div className="text-center mb-14">

      <h2 className="text-4xl font-bold">
        Frequently Asked Questions
      </h2>

      <p className="mt-4 text-gray-600">
        Everything you need to know about Rodio.
      </p>

    </div>

    <div className="space-y-5">

      {[
        // {
        //   q: "Is registration free?",
        //   a: "Yes, registration is completely free for all users.",
        // },
        // {
        //   q: "Can I search transporters without registration?",
        //   a: "Basic browsing is available, but advanced search requires registration.",
        // },
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

        <details
          key={index}
          className="bg-white rounded-2xl shadow p-6 cursor-pointer"
        >

          <summary className="font-semibold text-lg">
            {faq.q}
          </summary>

          <p className="mt-4 text-gray-600 leading-7">
            {faq.a}
          </p>

        </details>

      ))}

    </div>

  </div>

</section>

{/* ====================== FINAL CTA ====================== */}

<section className="py-24 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white">

  <div className="max-w-5xl mx-auto text-center px-6">

    <h2 className="text-4xl lg:text-6xl font-bold leading-tight">

      Ready To Grow
      <br />
      Your Transport Business?

    </h2>

    <p className="mt-8 text-xl text-gray-300 leading-8">

      Join thousands of verified transporters, fleet owners,
      brokers and customers already growing with Rodio.

    </p>

    <div className="mt-12 flex flex-wrap justify-center gap-6">

      <button
        onClick={() => navigate("/register")}
        className="bg-yellow-400 text-black px-10 py-4 rounded-xl font-bold hover:scale-105 transition"
      >
        Register Now
      </button>

      <button
        onClick={() => navigate("/queryform")}
        className="border border-white px-10 py-4 rounded-xl hover:bg-white hover:text-black transition"
      >
        Contact Us
      </button>

    </div>

  </div>

</section>
<section className="py-24 bg-blue-600 text-white">
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">

    <div>
      <h2 className="text-5xl font-bold leading-tight">
        Grow Your Transport Business With Rodio
      </h2>

      <p className="mt-6 text-lg text-blue-100 leading-8">
        Connect with transporters, fleet owners, brokers and customers from all
        over India using one powerful platform.
      </p>

      <button
        onClick={() => navigate("/register")}
        className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold"
      >
        Get Started
      </button>
    </div>

    <img
      src="https://images.unsplash.com/photo-1501706362039-c6e80948c5c1?w=900"
      className="rounded-3xl shadow-2xl"
      alt=""
    />

  </div>
</section>
    </div>
  );
};

export default Services;