import { useState } from "react";
import { Check } from "lucide-react";
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

  // Controller integration structure
  const plan = {
    id: "premium",
    name: "Premium",
    price: 1001, // Note: Controller me static amount test format (1 INR) set hai
    duration: "30 Days",
    features: [
      "Unlimited Booking",
      "Priority Support",
      "Top Directory Listing",
      "Verified Badge",
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
        return;
      }

      if (!businessData) {
        toast.error("Business form data not found.");
        return;
      }

      // Step 1: Create Order via Controller exports.createOrder
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
            // Step 3: Verify Payment via Controller exports.verifyPayment
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

            navigate(
              paymentMongoId
                ? `/dashboard/receipt/${paymentMongoId}`
                : "/dashboard/receipt"
            );
          } catch (error) {
            console.error("========== REGISTRATION ERROR ==========");
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("MESSAGE:", error.message);

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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Choose Your Membership Plan
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800">{plan.name}</h2>

          <div className="text-4xl font-bold mt-4 text-blue-600">
            ₹{plan.price}
          </div>

          <p className="text-gray-500 mt-2">Valid for {plan.duration}</p>

          <div className="mt-8 space-y-4">
            {plan.features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check size={18} className="text-green-600 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => {
              setSelectedPlan(plan);
              setShowReferralPopup(true);
            }}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
          >
            Continue to Payment
          </button>
        </div>
      </div>

      {/* Referral Code Modal */}
      {showReferralPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Have a Referral Code?
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Enter your referral code below or skip to proceed directly with payment.
            </p>

            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Enter Referral Code (Optional)"
              className="border w-full p-3 rounded-lg outline-none focus:border-blue-600 text-gray-800 uppercase tracking-wider"
            />

            <div className="flex gap-3 mt-6">
              <button
                disabled={paymentLoading}
                onClick={() => {
                  setReferralCode("");
                  setShowReferralPopup(false);
                  handlePayment();
                }}
                className="flex-1 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 font-medium text-gray-700 transition-colors disabled:opacity-50"
              >
                Skip
              </button>

              <button
                disabled={paymentLoading}
                onClick={() => {
                  setShowReferralPopup(false);
                  handlePayment();
                }}
                className="flex-1 bg-blue-600 text-white rounded-lg py-3 disabled:opacity-50 hover:bg-blue-700 font-medium transition-colors"
              >
                {paymentLoading ? "Processing..." : "Proceed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}