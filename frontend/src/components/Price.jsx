import { Truck, CheckCircle } from "lucide-react";

export  function Price() {
  const transports = [
    {
      title: "Mini Truck",
      price: "₹800",
      subtitle: "Starting Price",
      features: [
        "Up to 1 Ton Capacity",
        "City Deliveries",
        "Live GPS Tracking",
        "Verified Driver",
        "24×7 Support",
      ],
    },
    {
      title: "Medium Truck",
      price: "₹2,500",
      subtitle: "Starting Price",
      features: [
        "Up to 10 Ton Capacity",
        "Intercity Transport",
        "Real-time Tracking",
        "Insurance Included",
        "Priority Support",
      ],
    },
    {
      title: "Heavy Truck",
      price: "₹5,000",
      subtitle: "Starting Price",
      features: [
        "20+ Ton Capacity",
        "Nationwide Delivery",
        "Dedicated Driver",
        "Live Tracking",
        "Premium Support",
      ],
    },
  ];

  return (
    <section className="py-20 bg-orange-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-4">
          Choose Your Transport
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Find the right vehicle for your shipment.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {transports.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-center mb-5">
                <Truck className="w-14 h-14 text-orange-500" />
              </div>

              <h3 className="text-2xl font-bold text-center">
                {item.title}
              </h3>

              <div className="text-center my-6">
                <span className="text-4xl font-bold text-orange-600">
                  {item.price}
                </span>

                <p className="text-gray-500">
                  {item.subtitle}
                </p>
              </div>

              <ul className="space-y-3">

                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    {feature}
                  </li>
                ))}

              </ul>

              <button className="mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition">
                Book Now
              </button>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
export default Price;