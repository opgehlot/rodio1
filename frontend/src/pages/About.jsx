import {
  Truck,
  Users,
  MapPin,
  ShieldCheck,
  Clock,
  BadgeDollarSign,
} from "lucide-react"; 

export default function About() {
  const services = [
    {
      icon: <Truck size={40} />,
      title: "Transport Services",
      description:
        "Connect with trusted transporters for safe and reliable delivery of goods across the country.",
    },
    {
      icon: <Users size={40} />,
      title: "Broker Network",
      description:
        "Find experienced brokers to simplify load management and connect with verified transport partners.",
    },
    {
      icon: <MapPin size={40} />,
      title: "Pickup & Drop Search",
      description:
        "Quickly search transport options by pickup and destination locations.",
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Verified Partners",
      description:
        "We work with verified transporters and brokers to ensure secure and dependable service.",
    },
    {
      icon: <Clock size={40} />,
      title: "Fast Booking",
      description:
        "Book transport within minutes using our easy-to-use online platform.",
    },
    {
      icon: <BadgeDollarSign size={40} />,
      title: "Competitive Pricing",
      description:
        "Compare transport options and choose the best service at the right price.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            About Rodio
          </h2>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-7">
            Rodio is a digital transport marketplace that connects
            <span className="font-semibold"> Clients</span>,
            <span className="font-semibold"> Brokers</span>, and
            <span className="font-semibold"> Transporters</span> on one
            trusted platform. Our mission is to make freight booking simple,
            transparent, and efficient.
          </p>
        </div>

        {/* Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                {service.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}