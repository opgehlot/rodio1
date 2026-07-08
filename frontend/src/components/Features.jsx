import {
  Truck,
  MapPinned,
  Wallet,
  LayoutDashboard,
  Bell,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  const features = [
    {
      title: "Real-time Bidding",
      icon: Truck,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Live GPS Tracking",
      icon: MapPinned,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Secure Payments",
      icon: Wallet,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Multi-role Dashboard",
      icon: LayoutDashboard,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Instant Notifications",
      icon: Bell,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Document Management",
      icon: FileText,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-semibold">
            WHY CHOOSE RODIO
          </span>

          <h2 className="text-4xl font-bold mt-5">
            Powerful Features
          </h2>

          <p className="text-gray-500 mt-4">
            Everything you need to manage transport efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl p-8 border border-gray-100 transition-all"
            >
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.color}`}
              >
                <feature.icon size={30} />
              </div>

              <h3 className="text-xl font-bold mt-6">
                {feature.title}
              </h3>

              <p className="text-gray-500 mt-3">
                Manage your transport operations faster, smarter and securely.
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
export default Features;