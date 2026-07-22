import { useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../src/api/api";
import { toast } from "react-toastify";
import { useBusinessRegistration } from "../src/pages/addServices/BusinessRegistrationContext";

export function PlanSelection() {
  const { businessData, clearBusinessData } = useBusinessRegistration();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const navigate = useNavigate();

  const plan = {
    id: "premium",
    name: "Premium",
    price: 10,
    duration: "30 Days",
    features: [
      "Unlimited Booking",
      "Priority Support",
      "Top Directory Listing",
      "Verified Badge",
    ],
  };

  const handlePayment = async () => {
    try {
      setPaymentLoading(true);

      const { data } = await API.post("/payment/create-order", {
        amount: selectedPlan.price,
        referralCode,
      });

      const order = data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Rodio",
        description: `${selectedPlan.name} Plan`,

        handler: async function (response) {
          try {
            // 1. Payment verify karein
            const verifyRes = await API.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: selectedPlan._id || selectedPlan.id,
              referralCode,
            });

            if (verifyRes.data.success) {
              // 2. Business registration ke liye FormData banayein
              const formData = new FormData();

              if (businessData) {
                Object.keys(businessData).forEach((key) => {
                  if (key === "vehicleTypes" && Array.isArray(businessData.vehicleTypes)) {
                    businessData.vehicleTypes.forEach((item) => {
                      formData.append("vehicleTypes", item);
                    });
                  } else if (
                    ["aadhaar", "panCard", "gumasta", "gstCertificate"].includes(key)
                  ) {
                    if (businessData[key]?.[0]) {
                      formData.append(key, businessData[key][0]);
                    }
                  } else {
                    if (businessData[key] !== undefined && businessData[key] !== null) {
                      formData.append(key, businessData[key]);
                    }
                  }
                });
              }

              // 3. Business register API call karein
              await API.post("/business/registerbusiness", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });

              toast.success("Payment & Business Registration Successful!");

              // 4. Form aur Context state reset karein
              setReferralCode("");
              setSelectedPlan(null);
              if (clearBusinessData) {
                clearBusinessData();
              }

              // 5. Dashboard receipt page par redirect karein
              const paymentId = verifyRes.data.paymentId;
              navigate(paymentId ? `/dashboard/receipt/${paymentId}` : "/dashboard/receipt");
            } else {
              toast.error(verifyRes.data.message || "Verification Failed");
            }
          } catch (error) {
            console.error(error);
            toast.error(
              error.response?.data?.message || "Payment Verification or Registration Failed"
            );
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
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Unable to start payment");
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-5">
      <h1 className="text-4xl font-bold text-center">Choose Your Plan</h1>

      <p className="text-center text-gray-600 mt-2">
        Select the best subscription for your business.
      </p>

      <div className="max-w-md mx-auto mt-8">
        <div className="border bg-white p-6 shadow rounded-lg">
          <div className="bg-blue-600 text-white text-center py-2 mb-4 rounded">
            Subscription Plan
          </div>

          <h2 className="text-2xl font-bold">{plan.name}</h2>
          <h3 className="text-4xl font-bold mt-4">₹{plan.price}</h3>
          <p className="text-gray-500">{plan.duration}</p>

          <div className="mt-6 space-y-3">
            {plan.features.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setSelectedPlan(plan);
              setShowReferralPopup(true);
            }}
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded font-medium hover:bg-blue-700 transition"
          >
            Subscribe Now
          </button>
        </div>
      </div>

      {showReferralPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold">Referral Code</h2>

            <p className="text-gray-500 mt-2">
              Have a referral code? Enter it below.
            </p>

            <input
              type="text"
              placeholder="Referral Code (Optional)"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              className="w-full border p-3 mt-5 rounded focus:outline-blue-600"
            />

            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 border py-3 rounded hover:bg-gray-50 transition"
                onClick={() => {
                  setReferralCode("");
                  setShowReferralPopup(false);
                  handlePayment();
                }}
              >
                Skip
              </button>

              <button
                disabled={paymentLoading}
                className="flex-1 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50 transition"
                onClick={() => {
                  setShowReferralPopup(false);
                  handlePayment();
                }}
              >
                {paymentLoading ? "Opening..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanSelection;