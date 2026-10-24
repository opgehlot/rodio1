
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  X,
  BriefcaseBusiness,
  ArrowRight,
  Truck,
} from "lucide-react";

export function BusinessPromotionPopup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPopup, setShowPopup] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  const timerRef = useRef(null);

  // =====================================================
  // CHECK ACTIVE SUBSCRIPTION FROM BACKEND
  // =====================================================

  const hasActiveSubscription = async () => {
    try {
      const token = localStorage.getItem("token");

      // User login nahi hai
      if (!token) {
        return false;
      }

      const response = await axios.get(
        "https://rodio-tradelink.onrender.com/api/business/me",
        {
          headers: {
             "x-api-key": "ashu@rodio" ,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const business = response.data?.data;

      /*
       * Backend response:
       *
       * subscriptionStatus: "active"
       * profileUnlocked: true
       * isActive: true
       */

      const isActive =
        String(business?.subscriptionStatus || "").toLowerCase() ===
          "active" &&
        business?.profileUnlocked === true &&
        business?.isActive === true;

      return isActive;
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
  // START POPUP TIMER
  // =====================================================

  const startTimer = async () => {
    clearTimeout(timerRef.current);

    // Plan Selection page par popup nahi dikhana
    if (location.pathname === "/dashboard/planselection") {
      setShowPopup(false);
      return;
    }

    // Backend se fresh subscription check
    const active = await hasActiveSubscription();

    if (active) {
      setShowPopup(false);
      return;
    }

    // Subscription check complete
    setCheckingSubscription(false);

    // 40 seconds ke baad popup
    timerRef.current = setTimeout(async () => {
      // Timer complete hone ke baad
      // dobara backend subscription check
      const latestActive = await hasActiveSubscription();

      if (latestActive) {
        setShowPopup(false);
        return;
      }

      // Agar user Plan Selection par chala gaya
      if (
        window.location.pathname ===
        "/dashboard/planselection"
      ) {
        return;
      }

      setShowPopup(true);
    }, 40000);
  };

  // =====================================================
  // START / RESTART TIMER WHEN PAGE CHANGES
  // =====================================================

  useEffect(() => {
    let cancelled = false;

    const initializePopup = async () => {
      setShowPopup(false);
      setCheckingSubscription(true);

      clearTimeout(timerRef.current);

      // Plan Selection page par timer nahi
      if (location.pathname === "/dashboard/planselection") {
        setCheckingSubscription(false);
        return;
      }

      const active = await hasActiveSubscription();

      // Component unmount ho gaya ho
      if (cancelled) {
        return;
      }

      // Active subscription hai
      if (active) {
        setShowPopup(false);
        setCheckingSubscription(false);
        return;
      }

      setCheckingSubscription(false);

      // Subscription active nahi hai
      timerRef.current = setTimeout(async () => {
        const latestActive = await hasActiveSubscription();

        if (latestActive) {
          setShowPopup(false);
          return;
        }

        if (
          window.location.pathname ===
          "/dashboard/planselection"
        ) {
          return;
        }

        setShowPopup(true);
      }, 40000);
    };

    initializePopup();

    return () => {
      cancelled = true;
      clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  // =====================================================
  // CLOSE POPUP
  // =====================================================

  const handleClose = () => {
    setShowPopup(false);

    // Close ke baad timer dobara start
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

  if (
    !showPopup ||
    checkingSubscription ||
    isPlanSelectionPage
  ) {
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

      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-900"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* =================================================
            TOP ICON AREA
        ================================================= */}

        <div className="relative flex justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 px-5 pb-6 pt-7">

          {/* Decorative circles */}

          <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-white/10" />

          <div className="absolute -bottom-12 -right-8 h-32 w-32 rounded-full bg-white/10" />

          {/* Main Icon */}

          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl">

            <div className="relative">

              <BriefcaseBusiness
                size={40}
                strokeWidth={1.8}
                className="text-indigo-600"
              />

              {/* Truck Badge */}

              <div className="absolute -bottom-2 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow-md">
                <Truck size={13} />
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="px-5 pb-5 pt-4 text-center">

          {/* Badge */}

          <div className="mb-2 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
            Grow Your Business
          </div>

          {/* Heading */}

          <h2 className="mt-2 text-xl font-bold text-gray-900">
            Add Your Business
          </h2>

          {/* Description */}

          <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-gray-500">
            Apna transport business Rodio par list karein aur
            naye customers aur business opportunities se
            connect karein.
          </p>

          {/* =================================================
              BENEFITS
          ================================================= */}

          <div className="mt-4 space-y-2.5 text-left">

            {/* Benefit 1 */}

            <div className="flex items-center gap-3">

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
                ✓
              </div>

              <span className="text-xs text-gray-700">
                Apna business profile create karein
              </span>

            </div>

            {/* Benefit 2 */}

            <div className="flex items-center gap-3">

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
                ✓
              </div>

              <span className="text-xs text-gray-700">
                Naye customers tak pahunch banayein
              </span>

            </div>

            {/* Benefit 3 */}

            <div className="flex items-center gap-3">

              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
                ✓
              </div>

              <span className="text-xs text-gray-700">
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
            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >

            <BriefcaseBusiness size={17} />

            <span>
              Add Your Business
            </span>

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />

          </button>

          {/* =================================================
              MAYBE LATER
          ================================================= */}

          <button
            type="button"
            onClick={handleClose}
            className="mt-3 text-xs font-medium text-gray-400 transition hover:text-gray-600"
          >
            Maybe Later
          </button>

        </div>

      </div>
    </div>
  );
}

export default BusinessPromotionPopup;

