import { useEffect, useState } from "react";
import { CheckCircle, AlertTriangle, CreditCard } from "lucide-react";
import API from "../../api/api";

const SubscriptionCard = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const { data } = await API.get("/payment/my-subscription");

      if (data.success) {
        setSubscription(data.subscription);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        Loading Subscription...
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6">
        <div className="flex items-center gap-2 text-yellow-700">
          <AlertTriangle />
          <h2 className="font-bold text-lg">
            No Active Subscription
          </h2>
        </div>

        <p className="mt-3 text-gray-600">
          Subscribe to unlock premium features.
        </p>

        <button
          className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg"
          onClick={() => (window.location.href = "/plan-selection")}
        >
          Subscribe Now
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="text-blue-600" />
        <h2 className="text-2xl font-bold">
          My Subscription
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500">Status</p>

          <div className="flex items-center gap-2 mt-1">

            <CheckCircle className="text-green-600" />

            <span className="font-semibold capitalize">
              {subscription.status}
            </span>

          </div>
        </div>

        <div>
          <p className="text-gray-500">Plan</p>

          <h3 className="font-semibold">
            {subscription.plan}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Amount Paid</p>

          <h3 className="font-semibold">
            ₹ {subscription.amount}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Purchase Date</p>

          <h3 className="font-semibold">
            {new Date(subscription.startDate).toLocaleDateString()}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Valid Till</p>

          <h3 className="font-semibold">
            {new Date(subscription.endDate).toLocaleDateString()}
          </h3>
        </div>

        <div>
          <p className="text-gray-500">Receipt</p>

          <button
            className="text-blue-600 font-semibold"
            onClick={() =>
              window.location.href = `/dashboard/receipt/${subscription.paymentId}`
            }
          >
            View Receipt
          </button>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionCard;