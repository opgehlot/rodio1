import { useNavigate } from "react-router-dom";

const SubscriptionCard = ({ business }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-8">

        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">
          Subscription Required
        </h1>

        <div className="grid md:grid-cols-2 gap-5 mb-8">
          <div className="border rounded-xl p-5 bg-gray-50">
            <p className="text-gray-500 text-sm">Business Name</p>
            <h2 className="font-semibold text-xl text-gray-800">
              {business?.firmName || "N/A"}
            </h2>
          </div>

          <div className="border rounded-xl p-5 bg-gray-50">
            <p className="text-gray-500 text-sm">Owner</p>
            <h2 className="font-semibold text-xl text-gray-800">
              {business?.ownerName || "N/A"}
            </h2>
          </div>

          <div className="border rounded-xl p-5 bg-gray-50">
            <p className="text-gray-500 text-sm">Referral Code</p>
            <h2 className="font-semibold text-gray-800">
              {business?.referralCode || "N/A"}
            </h2>
          </div>

          <div className="border rounded-xl p-5 bg-gray-50">
            <p className="text-gray-500 text-sm">Renewal Status</p>
            <h2 className="font-semibold text-gray-800">
              {business?.renewalStatus || "Inactive"}
            </h2>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-300 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-orange-600">
            Activate Premium Plan
          </h2>

          <p className="text-gray-600 mt-3">
            Aapka business profile complete ho chuka hai.
          </p>

          <p className="text-gray-600">
            Leads dekhne, Bid karne aur sabhi premium features use karne ke liye
            subscription lena hoga.
          </p>

          <button
            onClick={() => navigate("/dashboard/planselection")}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all active:scale-95"
          >
            Choose Plan
          </button>
        </div>

      </div>
    </div>
  );
};

export default SubscriptionCard;