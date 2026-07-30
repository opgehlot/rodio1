import { useState } from "react";
import { User, Phone, Mail, FileText, MessageSquare } from "lucide-react";
import API from "../api/api";
import toast from "react-hot-toast";

export  function QueryForm() {
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
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-[#f4f7f9] py-16 px-4 md:px-10 flex flex-col items-center justify-center min-h-screen">
      
      {/* Top Heading Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight mb-3">
          HAVE SOME QUESTIONS?
        </h2>
       
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-6xl bg-transparent grid lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side: Information */}
        <div className="flex flex-col justify-center text-center lg:text-left p-6">
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            We'd Love to Hear From You
          </h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            Whether you have a question about features, trials, pricing, or anything else, our team is ready to answer all your questions.
          </p>
          <p className="mt-6 text-gray-500">
            Fill out the form and we'll be in touch as soon as possible.
          </p>
        </div>

        {/* Right Side: Form Inputs */}
        <div className="w-full bg-white p-8 rounded-2xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name */}
            <div className="relative">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-5 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
                required
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <Phone
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-5 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="email"
                name="email"
                placeholder="What's your email?"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-5 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
              />
            </div>

            {/* Subject */}
            <div className="relative">
              <FileText
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-5 text-gray-700 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
              />
            </div>

            {/* Message */}
            <div className="relative">
              <MessageSquare
                className="absolute left-4 top-4 text-gray-400"
                size={18}
              />
              <textarea
                rows="4"
                name="message"
                placeholder="Your questions..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pt-3.5 pl-12 pr-5 text-gray-700 placeholder-gray-400 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold tracking-wider uppercase text-sm transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
            >
              {loading ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
export default QueryForm;