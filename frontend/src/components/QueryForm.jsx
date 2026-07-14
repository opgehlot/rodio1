import { useState } from "react";
import { User, Phone, Mail, MessageSquare } from "lucide-react";

import truck from "../assets/logo.png"; // your image
import API from "../api/api";
import toast from "react-hot-toast";
export default function QueryForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post("/contact/create", formData);

      console.log(data);

    toast.success(data.message || "Query Submitted Successfully!");

      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

        toast.error(
      error.response?.data?.message || "Something went wrong!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-20 px-5">
      <div className="max-w-6xl mx-auto bg-white overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Left */}

          <div className="p-10 lg:p-14">
            <h2 className="text-4xl font-bold text-blue-700 mb-3">
              Contact Us
            </h2>

            <p className="text-gray-500 mb-8">
              Need Transport? Send us your query and our team will contact you
              shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}

              <div className="relative">
                <User
                  className="absolute left-5 top-4 text-blue-600"
                  size={20}
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-blue-50 rounded-full py-4 pl-14 pr-5 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Phone */}

              <div className="relative">
                <Phone
                  className="absolute left-5 top-4 text-blue-600"
                  size={20}
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-blue-50 rounded-full py-4 pl-14 pr-5 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email */}

              <div className="relative">
                <Mail
                  className="absolute left-5 top-4 text-blue-600"
                  size={20}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-blue-50 rounded-full py-4 pl-14 pr-5 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subject */}

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-blue-50 rounded-full py-4 px-5 outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Message */}

              <div className="relative">
                <MessageSquare
                  className="absolute left-5 top-5 text-blue-600"
                  size={20}
                />

                <textarea
                  rows="5"
                  name="message"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-blue-50 rounded-3xl pt-5 pl-14 pr-5 outline-none resize-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-semibold hover:scale-105 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Right */}

          <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-10">
            <img
              src={truck}
              alt="Contact"
              className="w-full max-w-md animate-bounce"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
