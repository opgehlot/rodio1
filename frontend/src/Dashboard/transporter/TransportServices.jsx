import { useNavigate } from "react-router-dom";
import {
  Truck,
  Search,
  Users,
  Briefcase,
  PlusCircle,
  ClipboardList,
} from "lucide-react";

export  function TransportServices() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Search Vehicles",
      description: "Find available trucks and transport vehicles.",
      icon: <Truck size={42} />,
      button: "Search",
      path: "/register",
    },
    {
      title: "Search Transporter",
      description: "Find verified transport companies near you.",
      icon: <Search size={42} />,
      button: "Search",
      path: "/register",
    },
    {
      title: "Search Broker",
      description: "Find trusted brokers for your business.",
      icon: <Users size={42} />,
      button: "Search",
      path: "/register",
    },
    {
      title: "My Leads",
      description: "View all booking and enquiry requests.",
      icon: <ClipboardList size={42} />,
      button: "View Leads",
      path: "/register",
    },
    {
      title: "Add Your Services",
      description: "Register your transport services.",
      icon: <PlusCircle size={42} />,
      button: "Add Service",
      path: "/register",
    },
    {
      title: "My Services",
      description: "Manage your listed transport services.",
      icon: <Briefcase size={42} />,
      button: "View Services",
      path: "/register",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-slate-800">
            Transport Services
          </h1>

          <p className="text-slate-500 mt-3 text-lg">
            Search vehicles, transporters, brokers and manage your services.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">

          {services.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 flex flex-col"
            >

              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-center mb-6">

                {item.icon}

              </div>

              <h2 className="text-2xl font-bold text-slate-800">

                {item.title}

              </h2>

              <p className="text-slate-500 mt-3 flex-grow">

                {item.description}

              </p>

              <button
                onClick={() => navigate(item.path)}
                className="mt-8 w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold transition"
              >
                {item.button}
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default TransportServices