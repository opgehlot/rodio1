import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { X, BriefcaseBusiness, ArrowRight, Truck } from "lucide-react";

export function BusinessPromotionPopup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPopup, setShowPopup] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const timerRef = useRef(null);

  // Check whether the user has an active subscription.
  const hasActiveSubscription = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return false;

      const response = await axios.get(
        "https://rodio-tradelink.onrender.com/api/business/me",
        {
          headers: {
            "x-api-key": "ashu@rodio",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const business = response.data?.data;
      return (
        String(business?.subscriptionStatus || "").toLowerCase() === "active" &&
        business?.profileUnlocked === true &&
        business?.isActive === true
      );
    } catch (error) {
      console.error("BUSINESS POPUP SUBSCRIPTION CHECK ERROR:", error);
      return false;
    }
  };

  const isPlanSelectionPage = location.pathname === "/dashboard/planselection";

  // Check subscription status and display the popup after 40 seconds if needed.
  useEffect(() => {
    let cancelled = false;
    clearTimeout(timerRef.current);

    const initializePopup = async () => {
      setShowPopup(false);
      setCheckingSubscription(true);

      if (location.pathname === "/dashboard/planselection") {
        setCheckingSubscription(false);
        return;
      }

      const active = await hasActiveSubscription();
      if (cancelled) return;

      if (active) {
        setShowPopup(false);
        setCheckingSubscription(false);
        return;
      }

      setCheckingSubscription(false);
      timerRef.current = setTimeout(async () => {
        const latestActive = await hasActiveSubscription();
        if (cancelled || latestActive) {
          setShowPopup(false);
          return;
        }

        if (window.location.pathname !== "/dashboard/planselection") {
          setShowPopup(true);
        }
      }, 40000);
    };

    initializePopup();

    return () => {
      cancelled = true;
      clearTimeout(timerRef.current);
    };
  }, [location.pathname]);

  // Restart the timer when the user closes the popup.
  const handleClose = () => {
    setShowPopup(false);
    clearTimeout(timerRef.current);

    if (location.pathname === "/dashboard/planselection") return;

    timerRef.current = setTimeout(async () => {
      const active = await hasActiveSubscription();
      if (!active && window.location.pathname !== "/dashboard/planselection") {
        setShowPopup(true);
      }
    }, 40000);
  };

  // Send the user to registration or plan selection.
  const handleAddBusiness = () => {
    setShowPopup(false);
    clearTimeout(timerRef.current);

    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("redirectAfterLogin", "/dashboard/planselection");
      navigate("/register");
      return;
    }

    navigate("/dashboard/planselection");
  };

  if (!showPopup || checkingSubscription || isPlanSelectionPage) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto overscroll-contain bg-black/50 px-3 py-4 sm:px-5 sm:py-6">
      {/* Click outside the dialog to close it. */}
      <button
        type="button"
        aria-label="Close business promotion popup"
        className="absolute inset-0 h-full w-full cursor-default backdrop-blur-[2px]"
        onClick={handleClose}
      />

      {/* Responsive dialog: the content can scroll on short screens. */}
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="business-popup-title"
        className="relative z-10 my-auto w-full max-w-md overflow-x-hidden overflow-y-auto rounded-2xl bg-white shadow-2xl max-h-[calc(100dvh-2rem)] sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:right-4 sm:top-4"
          aria-label="Close"
        >
          <X size={24} strokeWidth={2.2} />
        </button>

        {/* Header and icon */}
        <div className="relative flex justify-center overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 px-5 pb-7 pt-8 sm:pb-8 sm:pt-10">
          <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/10 sm:h-40 sm:w-40" />
          <div className="pointer-events-none absolute -bottom-12 -right-8 h-36 w-36 rounded-full bg-white/10 sm:h-44 sm:w-44" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl sm:h-24 sm:w-24 sm:rounded-3xl">
            <BriefcaseBusiness
              size={46}
              strokeWidth={1.8}
              className="text-indigo-700 sm:h-12 sm:w-12"
            />
            <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white shadow-md sm:h-9 sm:w-9">
              <Truck size={17} strokeWidth={2.2} />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="px-5 pb-6 pt-5 text-center sm:px-8 sm:pb-8 sm:pt-6">
          <div className="mb-3 inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 sm:text-base">
            Grow Your Business
          </div>

          <h2
            id="business-popup-title"
            className="mt-1 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl"
          >
            Add Your Business
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
            List your transport business on Rodio to reach more customers and discover new business opportunities.
          </p>

          {/* Benefits */}
          <div className="mt-5 space-y-3 text-left sm:mt-6 sm:space-y-4">
            {/* <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-base font-extrabold text-indigo-700 sm:h-9 sm:w-9 sm:text-lg">
                ✓
              </div>
              <span className="min-w-0 flex-1 break-words text-base leading-7 text-gray-800 sm:text-lg">
                Create your business profile
              </span>
            </div> */}

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-base font-extrabold text-indigo-700 sm:h-9 sm:w-9 sm:text-lg">
                ✓
              </div>
              <span className="min-w-0 flex-1 break-words text-base leading-7 text-gray-800 sm:text-lg">
                Reach new customers and business partners
              </span>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-base font-extrabold text-indigo-700 sm:h-9 sm:w-9 sm:text-lg">
                ✓
              </div>
              <span className="min-w-0 flex-1 break-words text-base leading-7 text-gray-800 sm:text-lg">
                Manage your vehicles and routes
              </span>
            </div>
          </div>

          {/* Primary action */}
          <button
            type="button"
            onClick={handleAddBusiness}
            className="group mt-6 flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-4 text-base font-bold text-white shadow-lg shadow-indigo-200 transition-colors duration-200 hover:from-blue-800 hover:to-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-200 sm:mt-7 sm:min-h-16 sm:text-lg"
          >
            <BriefcaseBusiness size={21} className="shrink-0" />
            <span>Add Your Business</span>
            <ArrowRight
              size={21}
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="mt-4 inline-flex min-h-11 items-center justify-center px-4 text-base font-semibold text-gray-600 underline-offset-4 transition hover:text-gray-900 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-lg"
          >
            Maybe Later
          </button>
        </div>
      </section>
    </div>
  );
}

export default BusinessPromotionPopup;
