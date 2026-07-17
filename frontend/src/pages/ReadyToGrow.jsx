import React from "react";
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
    <section className="py-24 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Ready To Grow
          <br />
          Your Transport Business?
        </h2>

        <p className="mt-8 text-lg md:text-xl text-gray-300 leading-8 max-w-3xl mx-auto">
          Join thousands of verified transporters, fleet owners,
          brokers and customers already growing with Rodio.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
          <button
            onClick={() => handleNavigate("/dashboard")}
            className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition duration-300"
          >
            {isLoggedIn ? "Go to Dashboard" : "Register Now"}
          </button>

          <button
            onClick={() => navigate("/queryform")}
            className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-black transition duration-300"
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReadyToGrow;