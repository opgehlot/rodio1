import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ReadyToGrow() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleNavigate = (path) => {
    if (!isLoggedIn) {
      navigate("/register");
    } else {
      navigate(path);
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <motion.div
        className="max-w-5xl mx-auto text-center px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
          Ready To Grow
          <br />
          Your <span className="text-blue-600">Transport Business?</span>
        </h2>

        <p className="mt-8 text-lg md:text-xl text-gray-600 leading-8 max-w-3xl mx-auto">
          Join thousands of verified transporters, fleet owners,
          brokers and customers already growing with Rodio.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
          <button
            onClick={() => handleNavigate("/dashboard")}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300"
          >
            {isLoggedIn ? "Go to Dashboard" : "Register Now"}
          </button>

          <button
            onClick={() => navigate("/queryform")}
            className="border border-gray-300 px-8 py-4 rounded-xl hover:bg-gray-100 hover:border-gray-400 transition duration-300"
          >
            Contact Us
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export default ReadyToGrow;