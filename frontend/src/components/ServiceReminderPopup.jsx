import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  BriefcaseBusiness,
  ArrowRight,
  Truck,
} from "lucide-react";

export default function ServiceReminderPopup() {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const timerRef = useRef(null);

  // Start / restart 15 second timer
  const startTimer = () => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setShowPopup(true);
    }, 15000);
  };

  useEffect(() => {
    // First popup after 15 seconds
    startTimer();

    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const handleClose = () => {
    setShowPopup(false);

    // Again show after 15 seconds
    startTimer();
  };

  const handleAddServices = () => {
    setShowPopup(false);

    clearTimeout(timerRef.current);

    navigate("/login");
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Top Icon Area */}
        <div className="relative flex justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-6 pb-8 pt-10">

          {/* Decorative circles */}
          <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-white/10" />

          {/* Main Icon */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-xl">
            <div className="relative">
              <BriefcaseBusiness
                size={48}
                strokeWidth={1.8}
                className="text-indigo-600"
              />

              <div className="absolute -bottom-2 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                <Truck size={15} />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-7 pb-7 pt-6 text-center">

          <div className="mb-2 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            Grow Your Business
          </div>

          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            Add Your Services
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
            Apni transport services ko Rodio par list karein aur
            naye customers aur business opportunities se connect karein.
          </p>

          {/* CTA */}
          <button
            onClick={handleAddServices}
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            <BriefcaseBusiness size={19} />

            <span>Add Your Services</span>

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {/* Close */}
          <button
            onClick={handleClose}
            className="mt-4 text-sm font-medium text-gray-400 transition hover:text-gray-600"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}