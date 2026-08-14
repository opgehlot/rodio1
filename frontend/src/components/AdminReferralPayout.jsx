import React, { useEffect, useState } from "react";
import API from "../api/api"; // Aapke api.js ka sahi path

const AdminReferralPayouts = () => {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/admin/referral-payouts");

      if (res.data.success) {
        setPayouts(res.data.data);
      }
    } catch (error) {
      console.error("Fetch payout error:", error);
      alert(
        error.response?.data?.message || "Failed to load referral payouts"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  const markAsPaid = async (referralId, amount, upiId) => {
    const confirmPayment = window.confirm(
      `₹${amount} payment ${upiId} par manually kar diya hai?\n\nOK = Mark as Paid`
    );

    if (!confirmPayment) return;

    try {
      setPayingId(referralId);
      const res = await API.post("/admin/mark-paid", {
        referralId,
      });

      if (res.data.success) {
        alert(`₹${res.data.amountPaid} successfully marked as Paid`);
        fetchPayouts();
      }
    } catch (error) {
      console.error("Mark paid error:", error);
      alert(
        error.response?.data?.message || "Payment status update failed"
      );
    } finally {
      setPayingId(null);
    }
  };

  // Statistics Calculations
  const totalReferrals = payouts.length;
  const pendingReferrals = payouts.filter(p => p.status === "pending" || p.status === "available").length;
  const paidReferrals = payouts.filter(p => p.status === "withdrawn" || p.status === "completed").length;
  const revokedReferrals = payouts.filter(p => p.status === "revoked").length;

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading referral payouts...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Referral Payouts
          </h1>
          <p className="text-gray-500">
            Total Referrals: {totalReferrals}
          </p>
        </div>
        <button
          onClick={fetchPayouts}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Total Referrals</h3>
          <p className="text-2xl font-bold text-blue-600">{totalReferrals}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingReferrals}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Paid</h3>
          <p className="text-2xl font-bold text-green-600">{paidReferrals}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500 text-sm">Revoked</h3>
          <p className="text-2xl font-bold text-red-600">{revokedReferrals}</p>
        </div>
      </div>

      {/* Table showing All Referrals */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Referrer</th>
              <th className="p-4 text-left">Referral Code</th>
              <th className="p-4 text-left">UPI ID</th>
              <th className="p-4 text-left">Referred User</th>
              <th className="p-4 text-left">Plan</th>
              <th className="p-4 text-left">Reward</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {payouts.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-8 text-center text-gray-500">
                  No referral payouts found.
                </td>
              </tr>
            ) : (
              payouts.map((item, index) => (
                <tr
                  key={item.referralId}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 text-gray-500">{index + 1}</td>
                  
                  {/* Referrer Details */}
                  <td className="p-4">
                    <div className="font-semibold">
                      {item.referrerDetails.name}
                    </div>
                    <div className="text-gray-500">
                      {item.referrerDetails.mobile}
                    </div>
                  </td>

                  {/* Referral Code */}
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
                      {item.referrerDetails.referralCode || "N/A"}
                    </span>
                  </td>

                  {/* UPI */}
                  <td className="p-4">
                    {item.referrerDetails.upiId &&
                    item.referrerDetails.upiId !== "UPI ID Not Updated" ? (
                      <span className="font-medium text-green-700">
                        {item.referrerDetails.upiId}
                      </span>
                    ) : (
                      <span className="text-red-500">UPI Not Added</span>
                    )}
                  </td>

                  {/* Referred User */}
                  <td className="p-4">
                    <div className="font-medium">
                      {item.referredUserDetails.name}
                    </div>
                    <div className="text-gray-500">
                      {item.referredUserDetails.mobile}
                    </div>
                  </td>

                  {/* Plan */}
                  <td className="p-4">{item.planPurchased}</td>

                  {/* Reward */}
                  <td className="p-4">
                    <span className="font-bold text-green-600">
                      ₹{item.rewardAmount}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    {item.status === "withdrawn" || item.status === "completed" ? (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                        Paid
                      </span>
                    ) : item.status === "revoked" ? (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700">
                        Revoked
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Action */}
                  <td className="p-4">
                    {item.status === "withdrawn" || item.status === "completed" ? (
                      <span className="text-green-600 font-semibold">
                        ✓ Paid
                      </span>
                    ) : item.status === "revoked" ? (
                      <span className="text-red-500">Cannot Pay</span>
                    ) : !item.referrerDetails.upiId ||
                      item.referrerDetails.upiId === "UPI ID Not Updated" ? (
                      <button
                        disabled
                        className="px-3 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                      >
                        Add UPI First
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          markAsPaid(
                            item.referralId,
                            item.rewardAmount,
                            item.referrerDetails.upiId
                          )
                        }
                        disabled={payingId === item.referralId}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                      >
                        {payingId === item.referralId
                          ? "Updating..."
                          : `Pay ₹${item.rewardAmount}`}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReferralPayouts;