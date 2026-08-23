import React from "react";
import { Link } from "react-router-dom";

const DirectoryMarquee = () => {
  const message = (
    <div className="flex items-center gap-2 px-8 whitespace-nowrap">
      <span className="text-white text-sm font-medium">
        🚚 डायरेक्टरी में फ्री में जुड़ने के लिए 
      </span>

      <Link
        to="/register"
        className="text-red-400 font-bold text-sm hover:text-red-300 hover:underline"
      >
        अभी रजिस्टर करें →
      </Link>
    </div>
  );

 return (
  <>
    <style>{`
      @keyframes rodioMarquee {
        0% {
          transform: translateX(0);
        }

        100% {
          transform: translateX(-50%);
        }
      }

      .rodio-marquee-track {
        display: flex;
        width: max-content;
        animation: rodioMarquee 18s linear infinite;
      }

      .rodio-marquee-track:hover {
        animation-play-state: paused;
      }
    `}</style>

    <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden mb-6 bg-gradient-to-r from-[#17133D] via-[#4C1D95] to-[#17133D] shadow-md">
      
      <div className="rodio-marquee-track py-3">
        {message}
        {message}
        {message}
        {message}
        {message}
        {message}
      </div>

    </div>
  </>
);
};

export default DirectoryMarquee;