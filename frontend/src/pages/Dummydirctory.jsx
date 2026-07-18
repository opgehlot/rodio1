import { useNavigate } from "react-router-dom";
import { Building2, User, MapPin, Phone, Mail } from "lucide-react";

export function Dummydirectory() {
  const navigate = useNavigate();

  const transporters = [
    {
      id: 1,
      company: "Gosawami Logistics",
      owner: "Jitendra Gosawami",
      address: "Plot No. 27, Transport Nagar, MR-10 Road",
      city: "Indore, Madhya Pradesh",
      phone: "9111705787",
      email: "jitu@gmail.com",
      role: "Transporter",
    },
    {
      id: 2,
      company: "Sharma Logistics",
      owner: "Mukesh Sharma",
      address: "Ring Road, Vijay Nagar",
      city: "Indore, Madhya Pradesh",
      phone: "9826012345",
      email: "mukesh@gmail.com",
      role: "Transporter",
    },
    {
      id: 3,
      company: "Raj Transport",
      owner: "Raj Verma",
      address: "Transport Nagar",
      city: "Bhopal, Madhya Pradesh",
      phone: "9893012345",
      email: "raj@gmail.com",
      role: "Transporter",
    },
    {
      id: 4,
      company: "Express Cargo",
      owner: "Vikas Jain",
      address: "NH-52",
      city: "Jaipur, Rajasthan",
      phone: "9876543210",
      email: "vikas@gmail.com",
      role: "Transporter",
    },
    {
      id: 5,
      company: "Fast Movers",
      owner: "Deepak Yadav",
      address: "Industrial Area",
      city: "Nagpur, Maharashtra",
      phone: "9000011111",
      email: "deepak@gmail.com",
      role: "Transporter",
    },
    {
      id: 6,
      company: "National Roadlines",
      owner: "Amit Singh",
      address: "Sector 21",
      city: "Delhi",
      phone: "9888811111",
      email: "amit@gmail.com",
      role: "Transporter",
    },
  ];

  const hidePhone = (phone) => {
    return phone.slice(0, 5) + "XXXXX";
  };

  const hideEmail = (email) => {
    const [name, domain] = email.split("@");
    return name.substring(0, 4) + "***@" + domain;
  };

  return (
    <div className=" mt-15 max-w-7xl mx-auto px-4 py-8">
      {/* Heading */}

      <div className="text-center mb-8">
        <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
          🚚 India's Trusted Transport Directory
        </span>

        <h1 className="mt-5 text-3xl md:text-5xl font-bold text-gray-900">
          Find Verified
          <span className="text-blue-600"> Transporters</span>
        </h1>

        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Search transporters by location and vehicle type. Register to unlock
          complete transporter details.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-600">5000+</h2>
            <p className="text-gray-500 text-sm">Transporters</p>
          </div>

          <div className="hidden md:block w-px bg-gray-300"></div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-600">150+</h2>
            <p className="text-gray-500 text-sm">Cities</p>
          </div>

          <div className="hidden md:block w-px bg-gray-300"></div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-600">24×7</h2>
            <p className="text-gray-500 text-sm">Support</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {transporters.map((item) => (
         <div
  key={item.id}
  className="bg-white rounded-3xl border shadow hover:shadow-xl transition overflow-hidden flex flex-col h-full"
>
            {/* Header */}

            <div className="p-4 flex justify-between">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                  <Building2 size={30} className="text-gray-700" />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-blue-500 leading-tight">
                    {item.company}
                  </h2>

                  <div className="flex items-center gap-2 mt-2 text-blue-600">
                    <User size={18} />

                    <span className="text-lg">{item.owner}</span>
                  </div>
                </div>
              </div>

              <span className="h-fit px-4 py-1 rounded-full bg-gray-100 text-blue-600 text-sm">
                {item.role}
              </span>
            </div>

            <hr />

            {/* Details */}
<div className="p-4 space-y-6 flex-1">
              <div className="flex gap-3">
                <MapPin size={24} className="text-blue-600 mt-1" />

                <div>
                  <h4 className="font-semibold">Address</h4>

                  <p className="text-gray-600">{item.address}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin size={24} className="text-blue-600 mt-1" />

                <div>
                  <h4 className="font-semibold">Location</h4>

                  <p className="text-gray-600">{item.city}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone size={24} className="text-blue-600 mt-1" />

                <div>
                  <h4 className="font-semibold">Phone</h4>

                  <p className="text-gray-600">{hidePhone(item.phone)}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail size={24} className="text-blue-600 mt-1" />

                <div>
                  <h4 className="font-semibold">Email</h4>

                  <p className="text-gray-600 break-all">
                    {hideEmail(item.email)}
                  </p>
                </div>
                
              </div>
              
               <button
              onClick={() =>
                navigate("/DtransporterDetails", {
                  state: item,
                })
              }
              className="mt-auto w-full border-t px-6 py-4 text-left font-medium text-blue-600 hover:bg-blue-100 transition"
            >
              View More
              
            </button>
              
          
            </div>

            
          </div>
        ))}
      </div>
      {/* Pagination */}

      <div className="flex justify-center items-center flex-wrap gap-4 mt-7">
        <div className="flex items-center gap-4 text-blue-700 text-lg font-medium">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((page) => (
            <button
              key={page}
              onClick={() => navigate("/register")}
              className="hover:text-blue-900 transition"
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/register")}
          className="ml-4 text-blue-700 text-lg hover:text-blue-900 transition"
        >
          view more
        </button>
      </div>
    </div>
  );
}
export default Dummydirectory;
