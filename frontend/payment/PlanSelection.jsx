import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  Check,
  Loader2,
  Gift,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  Building2,
} from "lucide-react";

import API from "../src/api/api";

export function PlanSelection() {
  const navigate = useNavigate();

  // =====================================================
  // STATES
  // =====================================================

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false);
  const [business, setBusiness] = useState(null);

  // =====================================================
  // PLAN
  // =====================================================

  const plan = {
    id: "premium",
    name: "Premium",
    price: 999,
    duration: "6 months",
    features: [
      "Unlimited Booking",
      "Priority Support 24/7",
      "Top Directory Listing",
      "Verified Badge on Profile",
      "Direct Client Connect",
      "Add & Manage Vehicles",
      "Add & Manage Routes",
      "Complete Business Profile",
    ],
  };

  // =====================================================
  // LOAD RAZORPAY SCRIPT
  // =====================================================

  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);

        document.body.appendChild(script);
      });
    };

    loadRazorpay();
  }, []);

  // =====================================================
  // CHECK BUSINESS DRAFT
  // =====================================================

  useEffect(() => {
    const checkBusiness = async () => {
      try {
        setPageLoading(true);

        const response = await API.get("/business/me");
        const businessData = response.data?.data;

        if (!businessData) {
          toast.error("Business details not found.");
          navigate("/dashboard/add-services", { replace: true });
          return;
        }

        if (
          businessData.registrationStatus === "completed" &&
          businessData.subscriptionStatus === "active" &&
          businessData.profileUnlocked === true
        ) {
          toast.success("Your business is already active.");
          navigate("/dashboard", { replace: true });
          return;
        }

        if (businessData.registrationStatus !== "draft") {
          toast.error("Complete your business details first.");
          navigate("/dashboard/add-services", { replace: true });
          return;
        }

        setBusiness(businessData);
      } catch (error) {
        console.error("CHECK BUSINESS ERROR:", error);

        if (error?.response?.status === 404) {
          toast.error("Please register your business first.");
          navigate("/dashboard/add-services", { replace: true });
          return;
        }

        toast.error(
          error?.response?.data?.message || "Unable to load business details."
        );
      } finally {
        setPageLoading(false);
      }
    };

    checkBusiness();
  }, [navigate]);

  // =====================================================
  // HANDLE PAYMENT
  // =====================================================

  const handlePayment = async () => {
    try {
      if (paymentLoading) return;

      if (!business?._id) {
        toast.error("Business draft not found.");
        return;
      }

      if (!window.Razorpay) {
        toast.error("Payment service is loading. Please try again.");
        return;
      }

      setPaymentLoading(true);

      const { data: createOrderRes } = await API.post("/payment/create-order", {
        planId: plan.id,
        businessId: business._id,
        referralCode: referralCode.trim().toUpperCase() || undefined,
      });

      if (!createOrderRes?.success || !createOrderRes?.order) {
        toast.error(createOrderRes?.message || "Unable to create payment order.");
        setPaymentLoading(false);
        return;
      }

      const order = createOrderRes.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        order_id: order.id,
        name: "Rodio Tradelink",
        description: `${plan.name} Business Subscription`,
        prefill: {
          name: business?.user?.name || "",
          email: business?.user?.email || "",
          contact: business?.user?.mobile || "",
        },
        notes: {
          businessId: business._id,
          firmName: business.firmName,
          planId: plan.id,
        },
        theme: {
          color: "#f97316",
        },
        handler: async function (response) {
          try {
            setIsGeneratingReceipt(true);

            const verifyRes = await API.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              businessId: business._id,
              planId: plan.id,
              referralCode: referralCode.trim().toUpperCase() || undefined,
            });

            if (!verifyRes.data?.success) {
              setIsGeneratingReceipt(false);
              toast.error(verifyRes.data?.message || "Payment verification failed.");
              return;
            }

            toast.success("Payment successful! Business activated.");
            setReferralCode("");
            setSelectedPlan(null);

            const paymentMongoId =
              verifyRes.data?.paymentId || response.razorpay_payment_id;

            setTimeout(() => {
              setIsGeneratingReceipt(false);
              navigate(`/dashboard/receipt/${paymentMongoId}`, {
                replace: true,
              });
            }, 1000);
          } catch (error) {
            console.error("PAYMENT VERIFY ERROR:", error);
            setIsGeneratingReceipt(false);
            toast.error(
              error?.response?.data?.message || "Payment verification failed."
            );
          } finally {
            setPaymentLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            toast("Payment cancelled. Your business details are still saved.");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("RAZORPAY PAYMENT FAILED:", response.error);
        setPaymentLoading(false);
        toast.error(
          response.error?.description || "Payment failed. Please try again."
        );
      });

      razorpay.open();
    } catch (error) {
      console.error("CREATE PAYMENT ORDER ERROR:", error);
      toast.error(
        error?.response?.data?.message || "Unable to initiate payment."
      );
      setPaymentLoading(false);
    }
  };

  // =====================================================
  // PAGE LOADING
  // =====================================================

  if (pageLoading) {
    return (
      <div className="min-h-[400px] bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={38} className="animate-spin text-orange-500" />
          <p className="text-slate-500 font-medium">Loading subscription...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return null;
  }

  // =====================================================
  // UI (Light Theme & Outlet Bound)
  // =====================================================

  return (
    <div className="min-h-full bg-slate-50 py-8 px-4 sm:px-6 relative rounded-2xl">
      <div className="max-w-md w-full mx-auto relative z-10">
        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/add-services")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition font-medium"
        >
          <ArrowLeft size={18} />
          Edit Business Details
        </button>

        {/* HEADER */}
        <div className="text-center mb-7">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-200 mb-3">
            <Sparkles size={14} />
            Complete Registration
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Unlock Full Access
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            Complete payment to activate your business profile.
          </p>
        </div>

        {/* BUSINESS INFO */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
              <Building2 size={22} />
            </div>
            <div>
              <p className="text-xs text-slate-500">Registering</p>
              <h3 className="font-bold text-slate-900">{business.firmName}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {business.currentCity}, {business.currentState}
              </p>
            </div>
          </div>
        </div>

        {/* PLAN CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-xl relative overflow-hidden">
          {/* Badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase">
            Recommended
          </div>

          <h2 className="text-2xl font-bold text-slate-900">{plan.name} Plan</h2>
          <p className="text-slate-500 text-xs mt-1">Complete business access</p>

          {/* Price */}
          <div className="flex items-baseline gap-1 my-6">
            <span className="text-2xl font-semibold text-orange-600">₹</span>
            <span className="text-5xl font-black text-slate-900">{plan.price}</span>
            <span className="text-slate-500 text-sm ml-1">/ {plan.duration}</span>
          </div>

          <hr className="border-slate-100 my-6" />

          {/* FEATURES */}
          <div className="space-y-4">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-emerald-600" />
                </div>
                <span className="text-slate-700 text-sm font-medium">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* PAYMENT BUTTON */}
          <button
            type="button"
            disabled={paymentLoading}
            onClick={() => {
              setSelectedPlan(plan);
              setShowReferralPopup(true);
            }}
            className="w-full mt-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold shadow-md transition flex items-center justify-center gap-2"
          >
            {paymentLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Processing...
              </>
            ) : (
              <>Pay ₹{plan.price} & Activate</>
            )}
          </button>

          {/* Secure */}
          <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-slate-500">
            <ShieldCheck size={14} className="text-emerald-600" />
            Secure Razorpay Payment
          </div>
        </div>
      </div>

      {/* REFERRAL POPUP (Outlet Bound Modal) */}
      {showReferralPopup && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 rounded-2xl">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center mb-4 mx-auto">
              <Gift size={24} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 text-center">
              Have a Referral Code?
            </h2>
            <p className="text-sm text-slate-500 text-center mt-2 mb-6">
              Enter your referral code or continue without one.
            </p>

            <input
              type="text"
              value={referralCode}
              disabled={paymentLoading}
              onChange={(e) =>
                setReferralCode(
                  e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
                )
              }
              placeholder="ENTER REFERRAL CODE"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-center font-mono text-lg text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 uppercase tracking-widest"
            />

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                disabled={paymentLoading}
                onClick={() => {
                  setReferralCode("");
                  setShowReferralPopup(false);
                  handlePayment();
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl py-3.5 font-semibold disabled:opacity-50 transition"
              >
                Skip
              </button>

              <button
                type="button"
                disabled={paymentLoading}
                onClick={() => {
                  setShowReferralPopup(false);
                  handlePayment();
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-sm"
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Processing
                  </>
                ) : (
                  "Proceed"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAYMENT SUCCESS LOADER (Outlet Bound Overlay) */}
      {isGeneratingReceipt && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-md flex flex-col justify-center items-center z-50 p-4 rounded-2xl">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse" />
            <div className="w-20 h-20 rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin flex items-center justify-center relative">
              <Sparkles className="text-orange-500" size={28} />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 text-center">
            Payment Successful!
          </h3>
          <p className="text-slate-500 text-sm text-center mt-2">
            Activating your business and generating receipt...
          </p>
        </div>
      )}
    </div>
  );
}

export default PlanSelection;