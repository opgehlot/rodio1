
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  X,
  BriefcaseBusiness,
  ArrowRight,
  Truck,
} from "lucide-react";

export  function BusinessPromotionPopup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPopup, setShowPopup] = useState(false);

  const timerRef = useRef(null);

  // =====================================================
  // CHECK ACTIVE SUBSCRIPTION
  // =====================================================

  const hasActiveSubscription = () => {
    try {
      const userString = localStorage.getItem("user");

      if (!userString) {
        return false;
      }

      const user = JSON.parse(userString);

      const subscription = user?.subscription;

      if (!subscription) {
        return false;
      }

      const status = subscription?.status;

      const endDate = subscription?.endDate
        ? new Date(subscription.endDate)
        : null;

      const now = new Date();

      // Active subscription + valid expiry date
      if (
        status === "active" &&
        endDate &&
        now < endDate
      ) {
        return true;
      }

      return false;
    } catch (error) {
      console.error(
        "BUSINESS POPUP SUBSCRIPTION CHECK ERROR:",
        error
      );

      return false;
    }
  };

  // =====================================================
  // CHECK PLAN SELECTION PAGE
  // =====================================================

  const isPlanSelectionPage =
    location.pathname === "/dashboard/planselection";

  // =====================================================
  // START 20 SECOND TIMER
  // =====================================================

  const startTimer = () => {
    clearTimeout(timerRef.current);

    // Plan Selection page par popup nahi dikhana
    if (isPlanSelectionPage) {
      setShowPopup(false);
      return;
    }

    // Active subscription hai to popup nahi dikhana
    if (hasActiveSubscription()) {
      setShowPopup(false);
      return;
    }

    timerRef.current = setTimeout(() => {

      // Timer complete hone ke baad
      // dobara subscription check
      if (hasActiveSubscription()) {
        return;
      }

      // Agar user Plan Selection par chala gaya
      if (window.location.pathname === "/dashboard/planselection") {
        return;
      }

      setShowPopup(true);

    }, 20000);
  };

  // =====================================================
  // START / RESTART TIMER WHEN PAGE CHANGES
  // =====================================================

  useEffect(() => {
    setShowPopup(false);

    clearTimeout(timerRef.current);

    // Plan Selection page par timer nahi
    if (location.pathname === "/dashboard/planselection") {
      return;
    }

    // Subscription active hai to timer nahi
    if (hasActiveSubscription()) {
      return;
    }

    startTimer();

    return () => {
      clearTimeout(timerRef.current);
    };

  }, [location.pathname]);

  // =====================================================
  // CLOSE POPUP
  // =====================================================

  const handleClose = () => {
    setShowPopup(false);

    // Close karne ke baad
    // 20 seconds baad dobara popup
    startTimer();
  };

  // =====================================================
  // ADD YOUR BUSINESS
  // =====================================================

  const handleAddBusiness = () => {
    setShowPopup(false);

    clearTimeout(timerRef.current);

    // Login check
    const token = localStorage.getItem("token");

    // ================================================
    // USER NOT LOGGED IN
    // ================================================

    if (!token) {

      // Login ke baad Plan Selection par bhejna
      localStorage.setItem(
        "redirectAfterLogin",
        "/dashboard/planselection"
      );

      navigate("/register");

      return;
    }

    // ================================================
    // USER ALREADY LOGGED IN
    // ================================================

    navigate("/dashboard/planselection");
  };

  // =====================================================
  // DON'T RENDER POPUP
  // =====================================================

  if (!showPopup) {
    return null;
  }

  // =====================================================
  // POPUP UI
  // =====================================================

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">

      {/* =================================================
          BACKGROUND OVERLAY
      ================================================= */}

      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"
        onClick={handleClose}
      />

      {/* =================================================
          POPUP
      ================================================= */}

      <div className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* =================================================
            TOP ICON AREA
        ================================================= */}

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

              {/* Truck Badge */}

              <div className="absolute -bottom-2 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                <Truck size={15} />
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="px-7 pb-7 pt-6 text-center">

          {/* Badge */}

          <div className="mb-2 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            Grow Your Business
          </div>

          {/* Heading */}

          <h2 className="mt-3 text-2xl font-bold text-gray-900">
            Add Your Business
          </h2>

          {/* Description */}

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
            Apna transport business Rodio par list karein aur
            naye customers aur business opportunities se
            connect karein.
          </p>

          {/* =================================================
              BENEFITS
          ================================================= */}

          <div className="mt-5 space-y-3 text-left">

            {/* Benefit 1 */}

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                ✓
              </div>

              <span className="text-sm text-gray-700">
                Apna business profile create karein
              </span>

            </div>

            {/* Benefit 2 */}

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                ✓
              </div>

              <span className="text-sm text-gray-700">
                Naye customers tak pahunch banayein
              </span>

            </div>

            {/* Benefit 3 */}

            <div className="flex items-center gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-sm font-bold text-indigo-600">
                ✓
              </div>

              <span className="text-sm text-gray-700">
                Vehicles aur routes manage karein
              </span>

            </div>

          </div>

          {/* =================================================
              CTA BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={handleAddBusiness}
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >

            <BriefcaseBusiness size={19} />

            <span>
              Add Your Business
            </span>

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </button>

          {/* =================================================
              MAYBE LATER
          ================================================= */}

          <button
            type="button"
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

export default BusinessPromotionPopup;