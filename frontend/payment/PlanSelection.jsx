import React, { useState } from "react";
import { Check, Loader2, Gift, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../src/api/api";
import { useBusinessRegistration } from "../src/pages/addServices/BusinessRegistrationContext";

export default function PlanSelection() {
  const navigate = useNavigate();

  const { businessData, clearBusinessData } = useBusinessRegistration();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  // Custom loader state for receipt generation post-payment
  const [isGeneratingReceipt, setIsGeneratingReceipt] = useState(false);

  // Controller integration structure
  const plan = {
    id: "premium",
    name: "Premium",
    price: 101,
    duration: "30 Days",
    features: [
      "Unlimited Booking",
      "Priority Support 24/7",
      "Top Directory Listing",
      "Verified Badge on Profile",
      "Direct Client Connect",
    ],
  };

  // Helper function to build clean FormData matching business registration backend expectations
  const createBusinessFormData = (data) => {
    const formData = new FormData();

    if (!data) return formData;

    Object.keys(data).forEach((key) => {
      const value = data[key];

      // Skip empty or null values
      if (value === undefined || value === null || value === "") return;

      // Handle File Uploads
      if (["photo", "aadhaar", "panCard", "gumasta", "gstCertificate"].includes(key)) {
        if (value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]);
        } else if (Array.isArray(value) && value[0] instanceof File) {
          formData.append(key, value[0]);
        } else if (value instanceof File) {
          formData.append(key, value);
        }
        return;
      }

      // Explicitly stringify workingAreas so backend can `JSON.parse(req.body.workingAreas)`
      if (key === "workingAreas") {
        formData.append("workingAreas", JSON.stringify(value));
        return;
      }

      // Handle Arrays (like vehicleTypes)
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
        return;
      }

      // Handle Plain Objects
      if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
        return;
      }

      // Handle Primitive Values
      formData.append(key, value);
    });

    return formData;
  };

  // ===========================
  // HANDLE PAYMENT & REGISTRATION
  // ===========================

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first.");
        setPaymentLoading(false);
        return;
      }

      if (!businessData) {
        toast.error("Business form data not found.");
        setPaymentLoading(false);
        return;
      }

      // Step 1: Create Order via Controller
      const { data: createOrderRes } = await API.post(
        "/payment/create-order",
        {
          referralCode: referralCode.trim() || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!createOrderRes.success || !createOrderRes.order) {
        toast.error(createOrderRes.message || "Failed to create payment order");
        setPaymentLoading(false);
        return;
      }

      const order = createOrderRes.order;

      // Step 2: Initialize Razorpay Checkout Modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Rodio",
        description: `${selectedPlan?.name || plan.name} Subscription`,

        handler: async function (response) {
          try {
            // Show receipt generation overlay immediately after Razorpay succeeds
            setIsGeneratingReceipt(true);

            // Step 3: Verify Payment
            const verifyRes = await API.post(
              "/payment/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                referralCode: referralCode.trim() || undefined,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (!verifyRes.data.success) {
              setIsGeneratingReceipt(false);
              toast.error(
                verifyRes.data.message || "Payment Verification Failed"
              );
              return;
            }

            // Step 4: Construct Business Registration FormData
            const formData = createBusinessFormData(businessData);
            formData.append("paymentId", response.razorpay_payment_id);
            formData.append("orderId", response.razorpay_order_id);

            // Step 5: Complete Business Registration
            await API.post(
              "/business/registerbusiness",
              formData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            toast.success("Payment & Business Registration Successful!");

            // Cleanup local state
            clearBusinessData();
            setReferralCode("");
            setSelectedPlan(null);

            // Fetch payment Mongo ID returned by verifyPayment controller
            const paymentMongoId = verifyRes.data.paymentId || response.razorpay_payment_id;

            // Short delay to show receipt generation loader feedback before navigate
            setTimeout(() => {
              setIsGeneratingReceipt(false);
              navigate(
                paymentMongoId
                  ? `/dashboard/receipt/${paymentMongoId}`
                  : "/dashboard/receipt"
              );
            }, 1000);

          } catch (error) {
            console.error("========== REGISTRATION ERROR ==========", error);
            setIsGeneratingReceipt(false);

            toast.error(
              error.response?.data?.message ||
                error.message ||
                "Business Registration Failed"
            );
          } finally {
            setPaymentLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
            toast.info("Payment Cancelled");
          },
        },
      };

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        setPaymentLoading(false);
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Order Creation Error:", error);
      toast.error(
        error.response?.data?.message || "Unable to initiate payment order"
      );
      setPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-12 px-4 flex flex-col justify-center items-center relative">
      
      {/* Background Decorative Blur Elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
            <Sparkles size={14} /> Choose Your Growth Plan
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Unlock Full Access
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Select the plan that best fits your business requirement.
          </p>
        </div>

        {/* Enhanced Membership Plan Card */}
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-8 shadow-2xl relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
          
          {/* Badge */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-amber-500 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl shadow-md uppercase tracking-wider">
            Most Popular
          </div>

          <h2 className="text-2xl font-bold text-white tracking-wide">{plan.name} Plan</h2>
          <p className="text-slate-400 text-xs mt-1">Perfect for fast-growing businesses</p>

          <div className="flex items-baseline gap-1 my-6">
            <span className="text-2xl font-semibold text-blue-400">₹</span>
            <span className="text-5xl font-black text-white">{plan.price}</span>
            <span className="text-slate-400 text-sm font-medium ml-1">/ {plan.duration}</span>
          </div>

          <hr className="border-slate-700/80 my-6" />

          {/* Features List */}
          <div className="space-y-4">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                  <Check size={12} className="text-emerald-400" />
                </div>
                <span className="text-slate-200 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <button
            disabled={paymentLoading}
            onClick={() => {
              setSelectedPlan(plan);
              setShowReferralPopup(true);
            }}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-4 rounded-2xl font-bold text-base shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            {paymentLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Processing...</span>
              </>
            ) : (
              <span>Continue to Payment</span>
            )}
          </button>

          <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-slate-400">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Secure SSL Encrypted Payment</span>
          </div>
        </div>
      </div>

      {/* Modern Referral Code Modal */}
      {showReferralPopup && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative overflow-hidden">
            
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 mx-auto">
              <Gift size={24} />
            </div>

            <h2 className="text-2xl font-bold text-white text-center mb-1">
              Have a Referral Code?
            </h2>
            <p className="text-xs text-slate-400 text-center mb-6">
              Enter code below to unlock special discounts or bonus features.
            </p>

            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="ENTER REFERRAL CODE"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-center font-mono text-lg text-white placeholder:text-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 uppercase tracking-widest transition-all mb-6"
            />

            <div className="flex gap-3">
              <button
                disabled={paymentLoading}
                onClick={() => {
                  setReferralCode("");
                  setShowReferralPopup(false);
                  handlePayment();
                }}
                className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 rounded-xl py-3.5 font-semibold text-sm transition-all disabled:opacity-50"
              >
                Skip
              </button>

              <button
                disabled={paymentLoading}
                onClick={() => {
                  setShowReferralPopup(false);
                  handlePayment();
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-3.5 font-semibold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {paymentLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Proceed</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Generation Full Screen Loading Overlay */}
      {isGeneratingReceipt && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-lg flex flex-col justify-center items-center z-50 p-4">
          <div className="relative mb-6">
            {/* Pulsing Backlight */}
            <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl animate-pulse" />
            <div className="w-20 h-20 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin flex items-center justify-center relative">
              <Sparkles className="text-blue-400" size={28} />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2 text-center tracking-tight">
            Payment Successful!
          </h3>
          <p className="text-slate-400 text-sm text-center animate-pulse">
            Your receipt is now generating, please wait...
          </p>
        </div>
      )}

    </div>
  );
}