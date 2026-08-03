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

  const [selectedPlanKey, setSelectedPlanKey] = useState("1year");
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false);
  const [business, setBusiness] = useState(null);

  // =====================================================
  // PLANS (Matching Backend PLAN_DETAILS with Strike & Benefits)
  // =====================================================

  const plans = [
    {
      key: "3month",
      name: "3 Month",
      originalPrice: 675,
      price: 599,
      duration: "3month",
      perMonthText: "199/m",
      benefit: "11% benefit",
      features: [
        "Standard Booking Access",
        "Email Support",
        "Directory Listing",
        "Add & Manage Vehicles",
      ],
    },
    {
      key: "6months",
      name: "6 Months",
      originalPrice: 1350,
      price: 999,
      duration: "6 months",
      perMonthText: "166/m",
      benefit: "26% benefit",
      popular: true,
      features: [
        "Unlimited Booking",
        "Priority Support 24/7",
        "Top Directory Listing",
        "Verified Badge on Profile",
        "Add & Manage Vehicles",
        "Add & Manage Routes",
      ],
    },
    {
      key: "1year",
      name: "1 Year",
      originalPrice: 2700,
      price: 1599,
      duration: "1 year",
      perMonthText: "133/m",
      benefit: "41% benefit",
      features: [
        "Unlimited Booking",
        "Priority Support 24/7",
        "Top Directory Listing",
        "Verified Badge on Profile",
        "Direct Client Connect",
        "Complete Business Profile",
      ],
    },
    {
      key: "testing",
      name: "Testing Plan",
      price: 1,
      duration: "1 day",
      features: [
        "Instant Feature Test",
        "Valid for 24 Hours",
        "All Premium Features Included",
      ],
    },
  ];

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
          navigate("/dashboard/addservices", { replace: true });
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
          navigate("/dashboard/addservices", { replace: true });
          return;
        }

        setBusiness(businessData);
      } catch (error) {
        console.error("CHECK BUSINESS ERROR:", error);

        if (error?.response?.status === 404) {
          toast.error("Please register your business first.");
          navigate("/dashboard/addservices", { replace: true });
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

      const activePlan = plans.find((p) => p.key === selectedPlanKey);

      setPaymentLoading(true);

      const { data: createOrderRes } = await API.post("/payment/create-order", {
        planKey: selectedPlanKey,
        referralCode: referralCode.trim().toUpperCase() || undefined,
      });

      if (!createOrderRes?.success || !createOrderRes?.order) {
        toast.error(
          createOrderRes?.message || "Unable to create payment order."
        );
        setPaymentLoading(false);
        return;
      }

      const order = createOrderRes.order;
      const finalPayableAmount = createOrderRes.planDetails?.amount ?? activePlan.price;

      if (createOrderRes.isFree || finalPayableAmount === 0) {
        toast.success("Free subscription activated successfully!");
        setPaymentLoading(false);
        navigate("/dashboard", { replace: true });
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || "INR",
        order_id: order.id,
        name: "Rodio Tradelink",
        description: `${activePlan.name} Business Subscription`,
        prefill: {
          name: business?.user?.name || "",
          email: business?.user?.email || "",
          contact: business?.user?.mobile || "",
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
            });

            if (!verifyRes.data?.success) {
              setIsGeneratingReceipt(false);
              toast.error(
                verifyRes.data?.message || "Payment verification failed."
              );
              return;
            }

            const user = JSON.parse(localStorage.getItem("user") || "{}");
            user.isSubscriptionActive = true;
            user.subscription = {
              status: "active",
              plan: activePlan.name,
            };

            localStorage.setItem("user", JSON.stringify(user));
            window.dispatchEvent(new Event("subscriptionUpdated"));

            toast.success("Payment successful! Business activated.");
            setReferralCode("");

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
      <div className="min-h-[400px] bg-white flex items-center justify-center rounded-2xl">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={38} className="animate-spin text-orange-500" />
          <p className="text-slate-500 font-medium">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  if (!business) {
    return null;
  }

  // =====================================================
  // UI (4 Cards Layout)
  // =====================================================

  return (
    <div className="min-h-full bg-slate-50 py-8 px-4 sm:px-6 relative rounded-2xl">
      <div className="max-w-6xl w-full mx-auto relative z-10">
        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/addservices")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition font-medium"
        >
          <ArrowLeft size={18} />
          Edit Business Details
        </button>

        {/* HEADER */}
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 border border-orange-200 mb-3">
            <Sparkles size={14} />
            Complete Registration
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Choose Your Subscription Plan
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            Select a plan that fits your business needs and unlock full access.
          </p>
        </div>

        {/* BUSINESS INFO */}
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 mb-8 max-w-md mx-auto">
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

        {/* 4 CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => {
            const isSelected = selectedPlanKey === p.key;

            return (
              <div
                key={p.key}
                className={`bg-white border rounded-3xl p-6 shadow-sm relative flex flex-col justify-between transition-all ${
                  p.popular
                    ? "border-orange-500 ring-2 ring-orange-500/20 shadow-lg"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {p.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Popular
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-slate-900">{p.name}</h2>
                    {p.benefit && (
                      <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {p.benefit}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs mt-1">Access duration</p>

                  <div className="flex items-baseline gap-2 my-4">
                    {p.originalPrice && (
                      <span className="text-lg font-semibold text-slate-400 line-through">
                        ₹{p.originalPrice}
                      </span>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-semibold text-orange-600">₹</span>
                      <span className="text-4xl font-black text-slate-900">
                        {p.price}
                      </span>
                    </div>
                    <span className="text-slate-500 text-xs ml-1">
                      / {p.duration}
                    </span>
                  </div>

                  {p.perMonthText && (
                    <div className="text-xs font-semibold text-orange-600 bg-orange-50 inline-block px-2.5 py-1 rounded-md mb-2">
                      Effective: {p.perMonthText}
                    </div>
                  )}

                  <hr className="border-slate-100 my-4" />

                  <div className="space-y-3 mb-6">
                    {p.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={10} className="text-emerald-600" />
                        </div>
                        <span className="text-slate-700 text-xs font-medium leading-tight">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={paymentLoading}
                  onClick={() => {
                    setSelectedPlanKey(p.key);
                    setShowReferralPopup(true);
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-sm shadow-sm transition flex items-center justify-center gap-2 ${
                    p.popular
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "bg-slate-900 hover:bg-slate-800 text-white"
                  }`}
                >
                  Select {p.name}
                </button>
              </div>
            );
          })}
        </div>

        {/* SECURE FOOTER */}
        <div className="flex items-center justify-center gap-1.5 mt-8 text-xs text-slate-500">
          <ShieldCheck size={14} className="text-emerald-600" />
          Secure Razorpay Payment Gateway
        </div>
      </div>

      {/* REFERRAL POPUP MODAL */}
      {showReferralPopup && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 rounded-2xl">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-500 flex items-center justify-center mb-4 mx-auto">
              <Gift size={24} />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 text-center">
              Have a Referral Code?
            </h2>
            <p className="text-sm text-slate-500 text-center mt-2 mb-6">
              Enter your referral code or coupon to get discounts, or skip to proceed.
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
                Skip & Pay
              </button>

              <button
                type="button"
                disabled={paymentLoading || !referralCode.trim()}
                onClick={() => {
                  setShowReferralPopup(false);
                  handlePayment();
                }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-3.5 font-semibold disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {paymentLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  "Apply & Pay"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanSelection;