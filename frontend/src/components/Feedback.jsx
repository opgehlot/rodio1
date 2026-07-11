import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function Feedback() {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Manufacturing Company",
      image: "https://i.pravatar.cc/100?img=11",
      text: "Rodio reduced our logistics costs by 30%. The bidding system is fantastic and delivery is always on time.",
    },
    {
      name: "Priya Sharma",
      role: "Transporter",
      image: "https://i.pravatar.cc/100?img=5",
      text: "Best platform for finding loads. My fleet utilization improved significantly and payments are always secure.",
    },
    {
      name: "Amit Patel",
      role: "Broker",
      image: "https://i.pravatar.cc/100?img=14",
      text: "Managing multiple clients and shipments has never been easier. Highly recommended for logistics businesses.",
    },
  ];

  return (
    <section className="py-24 bg-white" >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            What Our Users Say
          </h2>

          <p className="text-gray-500 mt-3">
            Trusted by customers, transporters and brokers across India.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (

            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-lg border border-orange-100 p-8 hover:shadow-2xl transition-all duration-300"
            >

              <Quote className="text-orange-500 w-10 h-10 mb-5" />

              <div className="flex mb-5">

                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    fill="#F59E0B"
                    color="#F59E0B"
                  />
                ))}

              </div>

              <p className="text-gray-600 italic leading-7">
                "{item.text}"
              </p>

              <div className="flex items-center gap-4 mt-8">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full border-2 border-orange-500"
                />

                <div>

                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {item.role}
                  </p>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}
export default Feedback;