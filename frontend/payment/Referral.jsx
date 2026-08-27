// import React, { useState, useEffect } from "react";
// // Adjust path to your api.js file if necessary

// import API from "../src/api/api"; // Ensure this points to your configured api.js file

// const Referral = () => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     loadReferralData();
//   }, []);

//   const loadReferralData = async () => {
//     try {
//       setLoading(true);
//       const response = await API.get("/payment/referral/stats");
//       if (response.data.success) {
//         setStats(response.data.data);
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Failed to load referral details.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const copyToClipboard = (code) => {
//     if (!code) return;
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2500);
//   };

//   if (loading) {
//     return (
//       <div className="w-full min-h-[70vh] flex items-center justify-center bg-gray-50">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-gray-600 font-medium text-sm">
//             Loading your referral dashboard...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full min-h-[50vh] flex items-center justify-center p-6">
//         <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm max-w-md text-center">
//           <p className="font-semibold">Oops! Something went wrong.</p>
//           <p className="text-sm mt-1">{error}</p>
//           <button
//             onClick={loadReferralData}
//             className="mt-4 px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//           <div>
//             <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
//               Referral & Earnings 🚀
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Invite business partners, share your exclusive code, and earn
//               rewards on every successful activation.
//             </p>
//           </div>

//           {/* Quick Share Code Banner Box */}
//           <div className="w-full bg-indigo-50/80 border border-indigo-100 rounded-2xl p-5 shadow-sm">
//             {/* Top Section: Referral Code & Copy Button */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
//               <div>
//                 <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
//                   Your Referral Code
//                 </span>
//                 <div className="text-xl font-bold text-indigo-900 tracking-wide mt-0.5">
//                   {stats?.referralCode || "N/A"}
//                 </div>
//               </div>

//               <button
//                 onClick={() => copyToClipboard(stats?.referralCode)}
//                 className={`px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
//                   copied
//                     ? "bg-emerald-600 text-white"
//                     : "bg-indigo-600 hover:bg-indigo-700 text-white"
//                 }`}
//               >
//                 {copied ? (
//                   <>
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M5 13l4 4L19 7"
//                       ></path>
//                     </svg>
//                     Copied!
//                   </>
//                 ) : (
//                   <>
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
//                       ></path>
//                     </svg>
//                     Copy Code
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* Bottom Section: Referral Rewards (Static Values) */}
//             <div className="pt-4">
//               <h3 className="font-semibold text-gray-800 text-sm mb-3">
//                 Referral Rewards
//               </h3>
//               <div className="space-y-2 text-sm text-gray-600">
//                 <div className="flex justify-between items-center bg-white/60 px-3 py-1.5 rounded-lg">
//                   <span>3 Month (₹599)</span>
//                   <span className="font-semibold text-green-600">₹84</span>
//                 </div>

//                 <div className="flex justify-between items-center bg-white/60 px-3 py-1.5 rounded-lg">
//                   <span>6 Months (₹999)</span>
//                   <span className="font-semibold text-green-600">₹139</span>
//                 </div>

//                 <div className="flex justify-between items-center bg-white/60 px-3 py-1.5 rounded-lg">
//                   <span>1 Year (₹1599)</span>
//                   <span className="font-semibold text-green-600">₹224</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Analytics Summary Cards */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Card 1 */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition hover:shadow-md">
//             <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
//               🏷️
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 Active Referral Code
//               </p>
//               <h3 className="text-xl font-bold text-gray-900 mt-1">
//                 {stats?.referralCode || "N/A"}
//               </h3>
//             </div>
//           </div>

//           {/* Card 2 */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition hover:shadow-md">
//             <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
//               👥
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 Total Referrals
//               </p>
//               <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
//                 {stats?.totalReferrals || 0}
//               </h3>
//             </div>
//           </div>

//           {/* Card 3 */}
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition hover:shadow-md sm:col-span-2 lg:col-span-1">
//             <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">
//               💰
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-500">
//                 Total Earnings
//               </p>
//               <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
//                 {stats?.currency || "INR"} {stats?.totalEarnings || 0}
//               </h3>
//             </div>
//           </div>
//         </div>

//         {/* Detailed History Table Section */}
//         {/* <div className="bg-white rounded-xl shadow p-6 mb-6">
//           <h2 className="text-lg font-bold mb-4">Payment Timeline</h2>

//           <div className="space-y-2">
//             <p>
//               Payment :<strong>{payment?.status || "Pending"}</strong>
//             </p>

//             <p>
//               Settlement :
//               <strong>{payment?.settlementStatus || "Pending"}</strong>
//             </p>

//             <p>
//               Settled At :
//               <strong>
//                 {payment?.settledAt
//                   ? new Date(payment.settledAt).toLocaleString()
//                   : "Pending"}
//               </strong>
//             </p>

//             <p>
//               Refund :<strong>{payment?.refundStatus || "No Refund"}</strong>
//             </p>

//             <p>
//               Refund Requested :
//               <strong>
//                 {payment?.refundRequestedAt
//                   ? new Date(payment.refundRequestedAt).toLocaleString()
//                   : "-"}
//               </strong>
//             </p>

//             <p>
//               Refund Processed :
//               <strong>
//                 {payment?.refundProcessedAt
//                   ? new Date(payment.refundProcessedAt).toLocaleString()
//                   : "-"}
//               </strong>
//             </p>
//           </div>
//         </div> */}

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="p-6 sm:p-8 border-b border-gray-100 flex justify-between items-center">
//             <div>
//               <h3 className="text-lg font-bold text-gray-900">
//                 Referral History
//               </h3>
//               <p className="text-xs text-gray-500 mt-0.5">
//                 Track every user who registered using your code
//               </p>
//               <p className="text-sm text-blue-700">
//                 Settlement amount will be credited to your registered bank
//                 account within
//                 <span className="font-semibold"> 7–10 working days </span>
//                 after successful payment.
//               </p>
//             </div>
//           </div>

//           {stats?.history && stats.history.length > 0 ? (
//             <div className="overflow-x-auto w-full">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                     {/* <th className="py-4 px-6">User Name</th>
//                     <th className="py-4 px-6">Email Address</th>
//                     <th className="py-4 px-6">Mobile</th>
//                     <th className="py-4 px-6">Reward Earned</th>
//                     <th className="py-4 px-6">Status</th>
//                     <th className="py-4 px-6">Date</th> */}

//                     <th className="py-4 px-6">User Name</th>
//                     <th className="py-4 px-6">Email</th>
//                     <th className="py-4 px-6">Mobile</th>
//                     <th className="py-4 px-6">Reward</th>
//                     <th className="py-4 px-6">Referral</th>
//                     <th className="py-4 px-6">Payment</th>
//                     <th className="py-4 px-6">Settlement</th>
//                     <th className="py-4 px-6">Refund</th>
//                     <th className="py-4 px-6">Settled At</th>
//                     <th className="py-4 px-6">Date</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-100 text-sm">
//                   {stats.history.map((item) => (
//                     <tr
//                       key={item._id}
//                       className="hover:bg-gray-50/60 transition"
//                     >
//                       <td className="py-4 px-6 font-semibold text-gray-900">
//                         {item.referredUser?.name || "N/A"}
//                       </td>
//                       <td className="py-4 px-6 text-gray-600">
//                         {item.referredUser?.email || "N/A"}
//                       </td>
//                       <td className="py-4 px-6 text-gray-600">
//                         {item.referredUser?.mobile || "N/A"}
//                       </td>
//                       <td className="py-4 px-6 font-bold text-emerald-600">
//                         +₹{item.reward || 0}
//                       </td>
//                       <td className="py-4 px-6">
//                         <span
//                           className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
//                             item.status === "completed"
//                               ? "bg-green-100 text-green-700"
//                               : item.status === "revoked"
//                                 ? "bg-red-100 text-red-700"
//                                 : "bg-yellow-100 text-yellow-700"
//                           }`}
//                         >
//                           {item.status}
//                         </span>
//                       </td>

//                       <td className="py-4 px-6">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs ${
//                             item.paymentStatus === "success"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                         >
//                           {item.paymentStatus || "Pending"}
//                         </span>
//                       </td>

//                       <td className="py-4 px-6">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                             item.settlementStatus === "settled"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                         >
//                           {item.settlementStatus === "settled"
//                             ? "Completed"
//                             : "Pending"}
//                         </span>
//                       </td>

//                       <td className="py-4 px-6">
//                         {item.refundStatus || "-"}
//                       </td>

//                       <td className="py-4 px-6">
//                         {item.settledAt
//                           ? new Date(item.settledAt).toLocaleString()
//                           : "panding"}
//                       </td>

//                       <td className="py-4 px-6 text-gray-500">
//                         {new Date(item.createdAt).toLocaleDateString("en-IN")}
//                       </td>

//                       {/* 

//                       <td className="py-4 px-6">
//                         <span
//                           className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
//                             item.status === "completed"
//                               ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
//                               : item.status === "revoked"
//                                 ? "bg-rose-50 text-rose-700 border border-rose-200/60"
//                                 : "bg-amber-50 text-amber-700 border border-amber-200/60"
//                           }`}
//                         >
//                           <td>{item.status}</td>

//                           <td>
//                             <span
//                               className={`px-2 py-1 rounded ${
//                                 item.paymentStatus === "success"
//                                   ? "bg-green-100 text-green-700"
//                                   : "bg-yellow-100 text-yellow-700"
//                               }`}
//                             >
//                               {item.paymentStatus || "Pending"}
//                             </span>
//                           </td>

//                           <td>
//                             <span
//                               className={`px-2 py-1 rounded ${
//                                 item.settlementStatus === "settled"
//                                   ? "bg-green-100 text-green-700"
//                                   : "bg-yellow-100 text-yellow-700"
//                               }`}
//                             >
//                               {item.settlementStatus || "Pending"}
//                             </span>
//                           </td>

//                           <td>
//                             <span>{item.refundStatus || "No Refund"}</span>
//                           </td>

//                           <td>
//                             {item.settledAt
//                               ? new Date(item.settledAt).toLocaleString()
//                               : "-"}
//                           </td>
//                         </span>
//                       </td> */}

//                       {/* 
//                       <td className="py-4 px-6 text-gray-500 whitespace-nowrap text-xs">
//                         {new Date(item.createdAt).toLocaleDateString("en-IN", {
//                           day: "2-digit",
//                           month: "short",
//                           year: "numeric",
//                         })}
//                       </td> */}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="py-16 text-center">
//               <div className="text-4xl mb-3">📭</div>
//               <p className="text-gray-800 font-semibold text-base">
//                 No referrals found yet
//               </p>
//               <p className="text-gray-400 text-sm mt-1 max-w-sm mx-auto">
//                 Share your referral code with other business owners to start
//                 growing your earnings today!
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Referral;
import React, { useState, useEffect } from "react";
// Adjust path to your api.js file if necessary
import API from "../src/api/api"; // Ensure this points to your configured api.js file

const Referral = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // UPI Input State
  const [upiInput, setUpiInput] = useState("");
  const [upiLoading, setUpiLoading] = useState(false);
  const [upiMessage, setUpiMessage] = useState("");

  useEffect(() => {
    loadReferralData();
  }, []);

  const loadReferralData = async () => {
    try {
      setLoading(true);
      const response = await API.get("/payment/referral/stats");
      if (response.data.success) {
        setStats(response.data.data);
        // Agar user ka upiId pehle se available hai toh input me set kar dein
        if (response.data.data.upiId) {
          setUpiInput(response.data.data.upiId);
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load referral details.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUpi = async (e) => {
    e.preventDefault();
    const cleanUpi = upiInput.trim();

    // Frontend UPI Validation (Regex check for standard VPA format, e.g., name@bank)
    const upiRegex = /^[\w.-]+@[\w.-]+$/;
    if (!upiRegex.test(cleanUpi)) {
      setUpiMessage("Please enter a valid UPI ID (e.g., username@paytm or 9876543210@ybl)");
      return;
    }

    try {
      setUpiLoading(true);
      setUpiMessage("");
      
      // Backend route jahan aap UPI save kar rahe hain (apne route ke mutabiq adjust karein)
      const response = await API.put("/user/update-upi", { upiId: cleanUpi });
      
      if (response.data.success) {
        setUpiMessage("UPI ID saved successfully!");
        setStats((prev) => ({ ...prev, upiId: cleanUpi }));
      }
    } catch (err) {
      setUpiMessage(
        err.response?.data?.message || "Failed to save UPI ID."
      );
    } finally {
      setUpiLoading(false);
    }
  };

  const copyToClipboard = (code) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (loading) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium text-sm">
            Loading your referral dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-[50vh] flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm max-w-md text-center">
          <p className="font-semibold">Oops! Something went wrong.</p>
          <p className="text-sm mt-1">{error}</p>
          <button
            onClick={loadReferralData}
            className="mt-4 px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/20 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Referral & Earnings 🚀
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Invite business partners, share your exclusive code, and earn
              rewards on every successful activation.
            </p>
          </div>

          {/* Quick Share Code Banner Box */}
          <div className="w-full bg-indigo-50/80 border border-indigo-100 rounded-2xl p-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-indigo-100">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Your Referral Code
                </span>
                <div className="text-xl font-bold text-indigo-900 tracking-wide mt-0.5">
                  {stats?.referralCode || "N/A"}
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(stats?.referralCode)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>

            {/* Referral Rewards (Static Values) */}
            <div className="pt-4">
              <h3 className="font-semibold text-gray-800 text-sm mb-3">
                Referral Rewards
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                {/* <div className="flex justify-between items-center bg-white/60 px-3 py-1.5 rounded-lg">
                  <span>3 Month (₹599)</span>
                  <span className="font-semibold text-green-600">₹84</span>
                </div> */}
                <div className="flex justify-between items-center bg-white/60 px-3 py-1.5 rounded-lg">
                  <span>6 Months (₹999)</span>
                  <span className="font-semibold text-green-600">₹139</span>
                </div>
                <div className="flex justify-between items-center bg-white/60 px-3 py-1.5 rounded-lg">
                  <span>1 Year (₹1599)</span>
                  <span className="font-semibold text-green-600">₹224</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* UPI ID INPUT SECTION WITH FRONTEND VALIDATION      */}
        {/* ================================================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <h3 className="text-lg font-bold text-gray-900">
            Payout UPI ID Setup 💳
          </h3>
          <p className="text-xs text-gray-500 mt-0.5 mb-4">
            Enter your UPI ID where you want to receive your referral earnings payout.
          </p>

          <form onSubmit={handleSaveUpi} className="flex flex-col sm:flex-row gap-3 items-center max-w-xl">
            <input
              type="text"
              placeholder="e.g. username@paytm or 9876543210@ybl"
              value={upiInput}
              onChange={(e) => setUpiInput(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              disabled={upiLoading}
              className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition shadow-sm whitespace-nowrap"
            >
              {upiLoading ? "Saving..." : "Save UPI ID"}
            </button>
          </form>

          {upiMessage && (
            <p className={`text-xs mt-2 font-medium ${upiMessage.includes("success") ? "text-emerald-600" : "text-red-600"}`}>
              {upiMessage}
            </p>
          )}
        </div>

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
              🏷️
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Active Referral Code
              </p>
              <h3 className="text-xl font-bold text-gray-900 mt-1">
                {stats?.referralCode || "N/A"}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
              👥
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Referrals
              </p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
                {stats?.totalReferrals || 0}
              </h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition hover:shadow-md sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl font-bold">
              💰
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Earnings
              </p>
              <h3 className="text-2xl font-extrabold text-gray-900 mt-1">
                {stats?.currency || "INR"} {stats?.totalEarnings || 0}
              </h3>
            </div>
          </div>
        </div>

        {/* Detailed History Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Referral History
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Track every user who registered using your code
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Settlement amount will be credited to your registered UPI ID within
                <span className="font-semibold"> 7–10 working days </span>
                after successful payment.
              </p>
            </div>
          </div>

          {stats?.history && stats.history.length > 0 ? (
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="py-4 px-6">User Name</th>
                    <th className="py-4 px-6">Email</th>
                    <th className="py-4 px-6">Mobile</th>
                    <th className="py-4 px-6">Reward</th>
                    <th className="py-4 px-6">Referral</th>
                    <th className="py-4 px-6">Payment</th>
                    <th className="py-4 px-6">Settlement</th>
                    <th className="py-4 px-6">Refund</th>
                    <th className="py-4 px-6">Settled At</th>
                    <th className="py-4 px-6">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {stats.history.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50/60 transition"
                    >
                      <td className="py-4 px-6 font-semibold text-gray-900">
                        {item.referredUser?.name || "N/A"}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {item.referredUser?.email || "N/A"}
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {item.referredUser?.mobile || "N/A"}
                      </td>
                      <td className="py-4 px-6 font-bold text-emerald-600">
                        +₹{item.reward || 0}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                            item.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : item.status === "revoked"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            item.paymentStatus === "success"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.paymentStatus || "Pending"}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            item.settlementStatus === "settled"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.settlementStatus === "settled"
                            ? "Completed"
                            : "Pending"}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        {item.refundStatus || "-"}
                      </td>

                      <td className="py-4 px-6">
                        {item.settledAt
                          ? new Date(item.settledAt).toLocaleString()
                          : "pending"}
                      </td>

                      <td className="py-4 px-6 text-gray-500">
                        {new Date(item.createdAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-gray-800 font-semibold text-base">
                No referrals found yet
              </p>
              <p className="text-gray-400 text-sm mt-1 max-w-sm mx-auto">
                Share your referral code with other business owners to start
                growing your earnings today!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Referral;
