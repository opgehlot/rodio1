
// // import { useCallback, useEffect, useState } from "react";
// // import { Star, MessageSquare, RefreshCw, UserCircle } from "lucide-react";
// // import API from "../../api/api";

// // export default function MyReviews() {
// //   const [reviews, setReviews] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const fetchReviews = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       const businessId = localStorage.getItem("businessId");

// //       if (!businessId) {
// //         setReviews([]);
// //         setError(
// //           "Business ID nahi mila. Apni business profile se dobara login karein."
// //         );
// //         return;
// //       }

// //       // Sirf current business profile ke reviews fetch honge
// //       const { data } = await API.get(`/transporters/${businessId}`,{
// //             headers: { "x-api-key": "ashu@rodio" },
// //            });

// //       const business = data?.data;
// //       const comments = Array.isArray(business?.comments)
// //         ? business.comments
// //         : [];

// //       setReviews(comments);
// //     } catch (err) {
// //       console.error("My business reviews error:", err);
// //       setError(
// //         err.response?.data?.message ||
// //           "Aapke reviews load nahi ho paaye. Dobara try karein."
// //       );
// //       setReviews([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchReviews();
// //   }, [fetchReviews]);

// //   return (
// //     <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
// //       <div className="mx-auto max-w-5xl">
// //         <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
// //           <div>
// //             <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
// //               My Reviews & Ratings
// //             </h1>
// //             <p className="mt-2 text-sm text-slate-500">
// //               Reviews received by your business profile
// //             </p>
// //             <p className="mt-1 text-sm font-medium text-slate-600">
// //               Total Reviews: {reviews.length}
// //             </p>
// //           </div>

// //           <button
// //             onClick={fetchReviews}
// //             disabled={loading}
// //             className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
// //           >
// //             <RefreshCw size={16} />
// //             Refresh
// //           </button>
// //         </div>

// //         {loading ? (
// //           <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
// //             Loading your reviews...
// //           </div>
// //         ) : error ? (
// //           <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
// //             <p className="text-red-600">{error}</p>
// //             <button
// //               onClick={fetchReviews}
// //               className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
// //             >
// //               Try Again
// //             </button>
// //           </div>
// //         ) : reviews.length === 0 ? (
// //           <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
// //             <MessageSquare
// //               size={42}
// //               className="mx-auto mb-4 text-slate-300"
// //             />
// //             <h2 className="text-lg font-bold text-slate-800">
// //               No Reviews Yet
// //             </h2>
// //             <p className="mt-2 text-sm text-slate-500">
// //               Abhi aapki business profile par koi review nahi hai.
// //             </p>
// //           </div>
// //         ) : (
// //           <div className="grid gap-5 md:grid-cols-2">
// //             {reviews.map((review, index) => {
// //               const rating = Math.max(
// //                 0,
// //                 Math.min(5, Number(review.rating) || 0)
// //               );

// //               return (
// //                 <article
// //                   key={review._id || index}
// //                   className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
// //                 >
// //                   <div className="flex items-start justify-between gap-3">
// //                     <div className="flex min-w-0 items-center gap-3">
// //                       {review.user?.profileImage ? (
// //                         <img
// //                           src={review.user.profileImage}
// //                           alt={review.user?.name || "Reviewer"}
// //                           className="h-11 w-11 rounded-full object-cover"
// //                         />
// //                       ) : (
// //                         <UserCircle
// //                           size={42}
// //                           className="shrink-0 text-slate-400"
// //                         />
// //                       )}

// //                       <div className="min-w-0">
// //                         <h3 className="break-words font-bold text-slate-900">
// //                           {review.user?.name || "Rodio User"}
// //                         </h3>
// //                         <p className="mt-1 text-xs text-slate-500">
// //                           {review.createdAt
// //                             ? new Date(review.createdAt).toLocaleDateString(
// //                                 "en-IN"
// //                               )
// //                             : "Date unavailable"}
// //                         </p>
// //                       </div>
// //                     </div>

// //                     <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5 text-sm font-bold text-amber-700">
// //                       <Star
// //                         size={15}
// //                         className="fill-amber-400 text-amber-400"
// //                       />
// //                       {rating}/5
// //                     </div>
// //                   </div>

// //                   <div className="mt-4 flex gap-1">
// //                     {[1, 2, 3, 4, 5].map((star) => (
// //                       <Star
// //                         key={star}
// //                         size={17}
// //                         className={
// //                           star <= rating
// //                             ? "fill-amber-400 text-amber-400"
// //                             : "text-slate-200"
// //                         }
// //                       />
// //                     ))}
// //                   </div>

// //                   <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
// //                     {review.comment || "No written feedback."}
// //                   </p>
// //                 </article>
// //               );
// //             })}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import { useCallback, useEffect, useState } from "react";
// import { Star, MessageSquare, RefreshCw, UserCircle } from "lucide-react";
// import API from "../../api/api";

// const API_HEADERS = { "x-api-key": "ashu@rodio" };

// export default function MyReviews() {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [replyInputs, setReplyInputs] = useState({});
//   const [replyTargets, setReplyTargets] = useState({});
//   const [expandedReplies, setExpandedReplies] = useState({});
//   const [sendingReply, setSendingReply] = useState({});

//   const fetchReviews = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const businessId = localStorage.getItem("businessId");

//       if (!businessId) {
//         setReviews([]);
//         setError(
//           "Business ID nahi mila. Apni business profile se dobara login karein."
//         );
//         return;
//       }

//       // Existing endpoint keeps the My Reviews screen compatible.
//       let baseReviews = [];
//       try {
//         const { data } = await API.get(
//           `/transporters/${encodeURIComponent(businessId)}`,
//           { headers: API_HEADERS }
//         );
//         const business = data?.data;
//         baseReviews = Array.isArray(business?.comments)
//           ? business.comments
//           : Array.isArray(data?.comments)
//           ? data.comments
//           : [];
//       } catch (transportError) {
//         console.log(
//           "[MY REVIEWS] Transporter GET failed:",
//           transportError?.response?.data || transportError?.message
//         );
//       }

//       // Dedicated comments endpoint supplies saved replies.
//       let commentReviews = [];
//       try {
//         const response = await API.get(
//           `/comment/${encodeURIComponent(businessId)}`,
//           { headers: API_HEADERS }
//         );
//         const payload = response?.data?.data;
//         commentReviews = Array.isArray(payload)
//           ? payload
//           : Array.isArray(payload?.comments)
//           ? payload.comments
//           : [];
//       } catch (commentError) {
//         console.log(
//           "[MY REVIEWS] Comments GET failed:",
//           commentError?.response?.data || commentError?.message
//         );
//       }

//       const byId = new Map(
//         commentReviews.map((review) => [String(review?._id), review])
//       );
//       const merged = baseReviews.map((review) => {
//         const saved = byId.get(String(review?._id));
//         return saved
//           ? {
//               ...review,
//               ...saved,
//               user: saved.user || review.user,
//               replies: Array.isArray(saved.replies)
//                 ? saved.replies
//                 : Array.isArray(review.replies)
//                 ? review.replies
//                 : [],
//             }
//           : review;
//       });

//       setReviews(merged.length ? merged : commentReviews);
//     } catch (err) {
//       console.error("My business reviews error:", err);
//       setError(
//         err.response?.data?.message ||
//           "Aapke reviews load nahi ho paaye. Dobara try karein."
//       );
//       setReviews([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchReviews();
//   }, [fetchReviews]);

//   const sendReply = async (review, parentReplyId = null) => {
//     const businessId = localStorage.getItem("businessId");
//     const reviewId = review?._id;
//     const text = String(replyInputs[reviewId] || "").trim();

//     if (!businessId || !reviewId) {
//       setError("Business ya review ID nahi mili.");
//       return;
//     }
//     if (!text) {
//       setError("Reply likhein, phir send karein.");
//       return;
//     }

//     try {
//       setError("");
//       setSendingReply((prev) => ({ ...prev, [reviewId]: true }));
//       const response = await API.post(
//         `/comment/${encodeURIComponent(businessId)}/${reviewId}/reply`,
//         { comment: text, parentReplyId: parentReplyId || null },
//         { headers: API_HEADERS }
//       );

//       const updatedReview = response?.data?.data;
//       setReviews((prev) =>
//         prev.map((current) => {
//           if (String(current?._id) !== String(reviewId)) return current;
//           const serverReplies = Array.isArray(updatedReview?.replies)
//             ? updatedReview.replies
//             : null;
//           const existingReplies = Array.isArray(current?.replies)
//             ? current.replies
//             : [];
//           const nextReplies = serverReplies || [
//             ...existingReplies,
//             {
//               _id: `local-${Date.now()}`,
//               userName: "You",
//               comment: text,
//               parentReplyId: parentReplyId || null,
//               createdAt: new Date().toISOString(),
//             },
//           ];
//           return {
//             ...current,
//             ...(updatedReview && typeof updatedReview === "object"
//               ? updatedReview
//               : {}),
//             // keep the already-populated review user from the list
//             user: current.user,
//             replies: nextReplies,
//           };
//         })
//       );
//       setReplyInputs((prev) => ({ ...prev, [reviewId]: "" }));
//       setReplyTargets((prev) => ({ ...prev, [reviewId]: null }));
//       setExpandedReplies((prev) => ({ ...prev, [reviewId]: true }));
//     } catch (err) {
//       console.log(
//         "[MY REVIEWS] Reply failed:",
//         err?.response?.data || err?.message
//       );
//       setError(err?.response?.data?.message || "Reply submit nahi hua.");
//     } finally {
//       setSendingReply((prev) => ({ ...prev, [reviewId]: false }));
//     }
//   };

//   const renderReply = (reply, allReplies, review, depth = 0) => {
//     const replyId = String(reply?._id || "");
//     const replyUser = reply?.user;
//     const replyName =
//       (typeof replyUser === "object" && replyUser?.name) ||
//       reply?.userName ||
//       "Rodio User";
//     const replyImage =
//       (typeof replyUser === "object" &&
//         (replyUser?.profileImage || replyUser?.avatar)) ||
//       reply?.profileImage ||
//       null;
//     const children = allReplies.filter((child) => {
//       const parentId = child?.parentReplyId?._id || child?.parentReplyId;
//       return String(parentId || "") === replyId && replyId;
//     });
//     const isTarget = String(replyTargets[review._id] || "") === replyId;

//     return (
//       <div
//         key={
//           reply?._id || `${replyName}-${reply?.createdAt || reply?.comment}`
//         }
//         className={`mb-2 rounded-xl border border-slate-200 bg-white p-2.5 ${
//           depth > 0 ? "ml-5 border-l-2 border-l-amber-400" : ""
//         }`}
//       >
//         <div className="flex items-start gap-2.5">
//           {replyImage ? (
//             <img
//               src={replyImage}
//               alt={replyName}
//               className="h-9 w-9 shrink-0 rounded-full bg-blue-50 object-cover"
//             />
//           ) : (
//             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-[13px] font-extrabold text-blue-900">
//               {String(replyName).charAt(0).toUpperCase()}
//             </div>
//           )}
//           <div className="min-w-0 flex-1">
//             <p className="break-words text-[13px] font-extrabold text-blue-900">
//               {replyName}
//             </p>
//             {!!reply?.comment && (
//               <p className="mt-1 whitespace-pre-wrap break-words text-[13px] leading-[19px] text-slate-800">
//                 {reply.comment}
//               </p>
//             )}
//             <button
//               type="button"
//               onClick={() => {
//                 setExpandedReplies((prev) => ({
//                   ...prev,
//                   [review._id]: true,
//                 }));
//                 setReplyTargets((prev) => ({ ...prev, [review._id]: replyId }));
//                 setReplyInputs((prev) => ({
//                   ...prev,
//                   [review._id]: `@${replyName} `,
//                 }));
//               }}
//               className="mt-1.5 text-xs font-extrabold text-blue-900"
//             >
//               Reply
//             </button>
//           </div>
//         </div>

//         {isTarget && (
//           <div className="mt-2 rounded-[10px] border border-slate-200 bg-white p-2.5">
//             <p className="mb-1 text-xs text-slate-500">
//               Replying to{" "}
//               <span className="font-extrabold text-blue-900">@{replyName}</span>
//             </p>
//             <textarea
//               className="max-h-[110px] min-h-[44px] w-full rounded-[9px] border border-slate-200 bg-white px-[11px] py-[9px] text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500"
//               placeholder={`Reply to @${replyName}`}
//               value={replyInputs[review._id] || ""}
//               onChange={(e) =>
//                 setReplyInputs((prev) => ({
//                   ...prev,
//                   [review._id]: e.target.value,
//                 }))
//               }
//             />
//             <div className="mt-[9px] flex items-center justify-between">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setReplyTargets((prev) => ({ ...prev, [review._id]: null }));
//                   setReplyInputs((prev) => ({ ...prev, [review._id]: "" }));
//                 }}
//                 className="text-xs font-bold text-red-700"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 disabled={!!sendingReply[review._id]}
//                 onClick={() => sendReply(review, replyId)}
//                 className="flex min-h-[36px] min-w-[78px] items-center justify-center rounded-full bg-blue-900 px-4 text-[13px] font-extrabold text-white disabled:opacity-60"
//               >
//                 {sendingReply[review._id] ? (
//                   <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                 ) : (
//                   "Reply"
//                 )}
//               </button>
//             </div>
//           </div>
//         )}

//         {children.map((child) =>
//           renderReply(child, allReplies, review, depth + 1)
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
//       <div className="mx-auto max-w-5xl">
//         <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
//               My Reviews & Ratings
//             </h1>
//             <p className="mt-2 text-sm text-slate-500">
//               Reviews received by your business profile
//             </p>
//             <p className="mt-1 text-sm font-medium text-slate-600">
//               Total Reviews: {reviews.length}
//             </p>
//           </div>

//           <button
//             onClick={fetchReviews}
//             disabled={loading}
//             className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
//           >
//             <RefreshCw size={16} />
//             Refresh
//           </button>
//         </div>

//         {loading ? (
//           <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
//             Loading your reviews...
//           </div>
//         ) : error && !reviews.length ? (
//           <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
//             <p className="text-red-600">{error}</p>
//             <button
//               onClick={fetchReviews}
//               className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : reviews.length === 0 ? (
//           <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
//             <MessageSquare
//               size={42}
//               className="mx-auto mb-4 text-slate-300"
//             />
//             <h2 className="text-lg font-bold text-slate-800">
//               No Reviews Yet
//             </h2>
//             <p className="mt-2 text-sm text-slate-500">
//               Abhi aapki business profile par koi review nahi hai.
//             </p>
//           </div>
//         ) : (
//           <>
//             {!!error && <p className="mb-4 text-sm text-red-600">{error}</p>}

//             <div className="grid items-start gap-5 md:grid-cols-2">
//               {reviews.map((review, index) => {
//                 const rating = Math.max(
//                   0,
//                   Math.min(5, Number(review.rating) || 0)
//                 );
//                 const replies = Array.isArray(review?.replies)
//                   ? review.replies
//                   : [];
//                 const topLevelReplies = replies.filter((reply) => {
//                   const parentId =
//                     reply?.parentReplyId?._id || reply?.parentReplyId;
//                   return !parentId;
//                 });

//                 return (
//                   <article
//                     key={review._id || index}
//                     className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
//                   >
//                     <div className="flex items-start justify-between gap-3">
//                       <div className="flex min-w-0 items-center gap-3">
//                         {review.user?.profileImage ? (
//                           <img
//                             src={review.user.profileImage}
//                             alt={review.user?.name || "Reviewer"}
//                             className="h-11 w-11 rounded-full object-cover"
//                           />
//                         ) : (
//                           <UserCircle
//                             size={42}
//                             className="shrink-0 text-slate-400"
//                           />
//                         )}

//                         <div className="min-w-0">
//                           <h3 className="break-words font-bold text-slate-900">
//                             {review.user?.name || "Rodio User"}
//                           </h3>
//                           <p className="mt-1 text-xs text-slate-500">
//                             {review.createdAt
//                               ? new Date(review.createdAt).toLocaleDateString(
//                                   "en-IN"
//                                 )
//                               : "Date unavailable"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5 text-sm font-bold text-amber-700">
//                         <Star
//                           size={15}
//                           className="fill-amber-400 text-amber-400"
//                         />
//                         {rating}/5
//                       </div>
//                     </div>

//                     <div className="mt-4 flex gap-1">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Star
//                           key={star}
//                           size={17}
//                           className={
//                             star <= rating
//                               ? "fill-amber-400 text-amber-400"
//                               : "text-slate-200"
//                           }
//                         />
//                       ))}
//                     </div>

//                     <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
//                       {review.comment || "No written feedback."}
//                     </p>

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setExpandedReplies((prev) => ({
//                           ...prev,
//                           [review._id]: !prev[review._id],
//                         }))
//                       }
//                       className="mt-3.5 flex items-center gap-[7px] py-[5px] text-[13px] font-bold text-blue-900"
//                     >
//                       <MessageSquare size={15} />
//                       {expandedReplies[review._id]
//                         ? "Hide replies"
//                         : `Replies (${replies.length})`}
//                     </button>

//                     {expandedReplies[review._id] && (
//                       <div className="mt-2 rounded-xl border border-slate-200 bg-blue-50 p-2.5">
//                         {topLevelReplies.map((reply) =>
//                           renderReply(reply, replies, review)
//                         )}

//                         {!replyTargets[review._id] && (
//                           <div className="mt-2 rounded-[10px] border border-slate-200 bg-white p-2.5">
//                             <p className="mb-1 text-xs text-slate-500">
//                               Reply to this review
//                             </p>
//                             <textarea
//                               className="max-h-[110px] min-h-[44px] w-full rounded-[9px] border border-slate-200 bg-white px-[11px] py-[9px] text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500"
//                               placeholder="Write a reply..."
//                               value={replyInputs[review._id] || ""}
//                               onChange={(e) =>
//                                 setReplyInputs((prev) => ({
//                                   ...prev,
//                                   [review._id]: e.target.value,
//                                 }))
//                               }
//                             />
//                             <div className="mt-[9px] flex items-center justify-between">
//                               <div />
//                               <button
//                                 type="button"
//                                 disabled={!!sendingReply[review._id]}
//                                 onClick={() => sendReply(review, null)}
//                                 className="flex min-h-[36px] min-w-[78px] items-center justify-center rounded-full bg-blue-900 px-4 text-[13px] font-extrabold text-white disabled:opacity-60"
//                               >
//                                 {sendingReply[review._id] ? (
//                                   <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                                 ) : (
//                                   "Reply"
//                                 )}
//                               </button>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </article>
//                 );
//               })}
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
import { useCallback, useEffect, useState } from "react";
import {
  Star,
  MessageSquare,
  RefreshCw,
  UserCircle,
  Trash2,
} from "lucide-react";
import API from "../../api/api";

const API_HEADERS = { "x-api-key": "ashu@rodio" };

const getId = (value) => {
  if (!value) return null;
  if (typeof value === "object") {
    return value._id || value.id || value.userId || value.user_id || null;
  }
  return value;
};

const getOwnerId = (value) => {
  if (!value) return null;
  return getId(
    value.user ||
      value.userId ||
      value.user_id ||
      value.author ||
      value.createdBy
  );
};

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [replyTargets, setReplyTargets] = useState({});
  const [expandedReplies, setExpandedReplies] = useState({});
  const [sendingReply, setSendingReply] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);
  const [deletingItems, setDeletingItems] = useState({});

  const isOwnItem = (value) => {
    const ownerId = getOwnerId(value);
    return (
      !!currentUserId && !!ownerId && String(ownerId) === String(currentUserId)
    );
  };

  const loadCurrentUserId = () => {
    try {
      const keys = Object.keys(localStorage);
      const preferredKeys = [
        "user",
        "userInfo",
        "userData",
        "authUser",
        "currentUser",
        "profile",
        "account",
        "loggedInUser",
        "user_id",
        "userId",
        "id",
      ];
      const orderedKeys = [
        ...preferredKeys.filter((key) => keys.includes(key)),
        ...keys.filter((key) => !preferredKeys.includes(key)),
      ];

      for (const key of orderedKeys) {
        try {
          const raw = localStorage.getItem(key);
          if (!raw) continue;

          if (
            ["user_id", "userId", "id"].includes(key) &&
            raw.trim() &&
            raw.trim() !== "[object Object]"
          ) {
            if (!raw.trim().startsWith("{") && !raw.trim().startsWith("[")) {
              setCurrentUserId(raw.trim());
              return raw.trim();
            }
          }

          const parsed = JSON.parse(raw);
          const candidates = [
            parsed?._id,
            parsed?.id,
            parsed?.user?._id,
            parsed?.user?.id,
            parsed?.data?.user?._id,
            parsed?.data?.user?.id,
            parsed?.userId,
            parsed?.user_id,
          ];
          const found = candidates.find(Boolean);
          if (found) {
            const id = String(found);
            setCurrentUserId(id);
            return id;
          }
        } catch (_) {
          // Ignore storage values that are not JSON.
        }
      }
    } catch (err) {
      console.log("[MY REVIEWS] Could not read logged-in user ID:", err?.message);
    }
    return null;
  };

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      loadCurrentUserId();

      const businessId = localStorage.getItem("businessId");

      if (!businessId) {
        setReviews([]);
        setError(
          "Business ID nahi mila. Apni business profile se dobara login karein."
        );
        return;
      }

      // Existing endpoint keeps the My Reviews screen compatible.
      let baseReviews = [];
      try {
        const { data } = await API.get(
          `/transporters/${encodeURIComponent(businessId)}`,
          { headers: API_HEADERS }
        );
        const business = data?.data;
        baseReviews = Array.isArray(business?.comments)
          ? business.comments
          : Array.isArray(data?.comments)
          ? data.comments
          : [];
      } catch (transportError) {
        console.log(
          "[MY REVIEWS] Transporter GET failed:",
          transportError?.response?.data || transportError?.message
        );
      }

      // Dedicated comments endpoint supplies saved replies.
      let commentReviews = [];
      try {
        const response = await API.get(
          `/comment/${encodeURIComponent(businessId)}`,
          { headers: API_HEADERS }
        );
        const payload = response?.data?.data;
        commentReviews = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.comments)
          ? payload.comments
          : [];
      } catch (commentError) {
        console.log(
          "[MY REVIEWS] Comments GET failed:",
          commentError?.response?.data || commentError?.message
        );
      }

      const byId = new Map(
        commentReviews.map((review) => [String(review?._id), review])
      );
      const merged = baseReviews.map((review) => {
        const saved = byId.get(String(review?._id));
        return saved
          ? {
              ...review,
              ...saved,
              user: saved.user || review.user,
              replies: Array.isArray(saved.replies)
                ? saved.replies
                : Array.isArray(review.replies)
                ? review.replies
                : [],
            }
          : review;
      });

      setReviews(merged.length ? merged : commentReviews);
    } catch (err) {
      console.error("My business reviews error:", err);
      setError(
        err.response?.data?.message ||
          "Aapke reviews load nahi ho paaye. Dobara try karein."
      );
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const sendReply = async (review, parentReplyId = null) => {
    const businessId = localStorage.getItem("businessId");
    const reviewId = review?._id;
    const text = String(replyInputs[reviewId] || "").trim();

    if (!businessId || !reviewId) {
      setError("Business ya review ID nahi mili.");
      return;
    }
    if (!text) {
      setError("Reply likhein, phir send karein.");
      return;
    }

    try {
      setError("");
      setSendingReply((prev) => ({ ...prev, [reviewId]: true }));
      const response = await API.post(
        `/comment/${encodeURIComponent(businessId)}/${reviewId}/reply`,
        { comment: text, parentReplyId: parentReplyId || null },
        { headers: API_HEADERS }
      );

      const updatedReview = response?.data?.data;
      setReviews((prev) =>
        prev.map((current) => {
          if (String(current?._id) !== String(reviewId)) return current;
          const serverReplies = Array.isArray(updatedReview?.replies)
            ? updatedReview.replies
            : null;
          const existingReplies = Array.isArray(current?.replies)
            ? current.replies
            : [];
          const nextReplies = serverReplies || [
            ...existingReplies,
            {
              _id: `local-${Date.now()}`,
              userName: "You",
              comment: text,
              parentReplyId: parentReplyId || null,
              createdAt: new Date().toISOString(),
            },
          ];
          return {
            ...current,
            ...(updatedReview && typeof updatedReview === "object"
              ? updatedReview
              : {}),
            // keep the already-populated review user from the list
            user: current.user,
            replies: nextReplies,
          };
        })
      );
      setReplyInputs((prev) => ({ ...prev, [reviewId]: "" }));
      setReplyTargets((prev) => ({ ...prev, [reviewId]: null }));
      setExpandedReplies((prev) => ({ ...prev, [reviewId]: true }));
    } catch (err) {
      console.log(
        "[MY REVIEWS] Reply failed:",
        err?.response?.data || err?.message
      );
      setError(err?.response?.data?.message || "Reply submit nahi hua.");
    } finally {
      setSendingReply((prev) => ({ ...prev, [reviewId]: false }));
    }
  };

  const deleteComment = async (comment) => {
    const commentId = comment?._id;
    const confirmed = window.confirm(
      "Kya aap apna comment delete karna chahte hain? Yeh action undo nahi hoga."
    );
    if (!confirmed) return;

    try {
      const businessId = localStorage.getItem("businessId");
      if (!businessId || !commentId) {
        setError("Business ID ya comment ID nahi mili.");
        return;
      }
      setDeletingItems((prev) => ({ ...prev, [String(commentId)]: true }));
      setError("");
      await API.delete(
        `/comment/${encodeURIComponent(businessId)}/${encodeURIComponent(
          commentId
        )}`,
        { headers: API_HEADERS }
      );
      setReviews((prev) =>
        prev.filter((item) => String(item?._id) !== String(commentId))
      );
      await fetchReviews();
    } catch (err) {
      console.log(
        "[MY REVIEWS] Delete comment failed:",
        err?.response?.data || err?.message
      );
      window.alert(
        err?.response?.data?.message ||
          "Comment delete nahi hua. Login aur backend route check karein."
      );
    } finally {
      setDeletingItems((prev) => ({ ...prev, [String(commentId)]: false }));
    }
  };

  const deleteReply = async (review, reply) => {
    const commentId = review?._id;
    const replyId = reply?._id;
    const confirmed = window.confirm(
      "Kya aap apna reply delete karna chahte hain?"
    );
    if (!confirmed) return;

    try {
      const businessId = localStorage.getItem("businessId");
      if (!businessId || !commentId || !replyId) {
        setError("Business, comment ya reply ID nahi mili.");
        return;
      }
      const deletingKey = `reply-${replyId}`;
      setDeletingItems((prev) => ({ ...prev, [deletingKey]: true }));
      setError("");
      await API.delete(
        `/comment/${encodeURIComponent(businessId)}/${encodeURIComponent(
          commentId
        )}/reply/${encodeURIComponent(replyId)}`,
        { headers: API_HEADERS }
      );
      await fetchReviews();
    } catch (err) {
      console.log(
        "[MY REVIEWS] Delete reply failed:",
        err?.response?.data || err?.message
      );
      window.alert(
        err?.response?.data?.message ||
          "Reply delete nahi hua. Login aur backend route check karein."
      );
    } finally {
      setDeletingItems((prev) => ({ ...prev, [`reply-${replyId}`]: false }));
    }
  };

  const renderReply = (reply, allReplies, review, depth = 0) => {
    const replyId = String(reply?._id || "");
    const replyUser = reply?.user;
    const replyName =
      (typeof replyUser === "object" && replyUser?.name) ||
      reply?.userName ||
      "Rodio User";
    const replyImage =
      (typeof replyUser === "object" &&
        (replyUser?.profileImage || replyUser?.avatar)) ||
      reply?.profileImage ||
      null;
    const children = allReplies.filter((child) => {
      const parentId = child?.parentReplyId?._id || child?.parentReplyId;
      return String(parentId || "") === replyId && replyId;
    });
    const isTarget = String(replyTargets[review._id] || "") === replyId;

    return (
      <div
        key={
          reply?._id || `${replyName}-${reply?.createdAt || reply?.comment}`
        }
        className={`mb-2 rounded-xl border border-slate-200 bg-white p-2.5 ${
          depth > 0 ? "ml-5 border-l-2 border-l-amber-400" : ""
        }`}
      >
        <div className="flex items-start gap-2.5">
          {replyImage ? (
            <img
              src={replyImage}
              alt={replyName}
              className="h-9 w-9 shrink-0 rounded-full bg-blue-50 object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-[13px] font-extrabold text-blue-900">
              {String(replyName).charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="break-words text-[13px] font-extrabold text-blue-900">
              {replyName}
            </p>
            {!!reply?.comment && (
              <p className="mt-1 whitespace-pre-wrap break-words text-[13px] leading-[19px] text-slate-800">
                {reply.comment}
              </p>
            )}
            {isOwnItem(reply) && !!replyId && (
              <button
                type="button"
                disabled={!!deletingItems[`reply-${replyId}`]}
                onClick={() => deleteReply(review, reply)}
                className="mt-2 flex items-center gap-[5px] rounded-lg bg-red-50 px-2 py-[5px] text-xs font-bold text-red-700"
              >
                {deletingItems[`reply-${replyId}`] ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-700 border-t-transparent" />
                ) : (
                  <>
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </>
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setExpandedReplies((prev) => ({
                  ...prev,
                  [review._id]: true,
                }));
                setReplyTargets((prev) => ({ ...prev, [review._id]: replyId }));
                setReplyInputs((prev) => ({
                  ...prev,
                  [review._id]: `@${replyName} `,
                }));
              }}
              className="mt-1.5 block text-xs font-extrabold text-blue-900"
            >
              Reply
            </button>
          </div>
        </div>

        {isTarget && (
          <div className="mt-2 rounded-[10px] border border-slate-200 bg-white p-2.5">
            <p className="mb-1 text-xs text-slate-500">
              Replying to{" "}
              <span className="font-extrabold text-blue-900">@{replyName}</span>
            </p>
            <textarea
              className="max-h-[110px] min-h-[44px] w-full rounded-[9px] border border-slate-200 bg-white px-[11px] py-[9px] text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500"
              placeholder={`Reply to @${replyName}`}
              value={replyInputs[review._id] || ""}
              onChange={(e) =>
                setReplyInputs((prev) => ({
                  ...prev,
                  [review._id]: e.target.value,
                }))
              }
            />
            <div className="mt-[9px] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setReplyTargets((prev) => ({ ...prev, [review._id]: null }));
                  setReplyInputs((prev) => ({ ...prev, [review._id]: "" }));
                }}
                className="text-xs font-bold text-red-700"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!!sendingReply[review._id]}
                onClick={() => sendReply(review, replyId)}
                className="flex min-h-[36px] min-w-[78px] items-center justify-center rounded-full bg-blue-900 px-4 text-[13px] font-extrabold text-white disabled:opacity-60"
              >
                {sendingReply[review._id] ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "Reply"
                )}
              </button>
            </div>
          </div>
        )}

        {children.map((child) =>
          renderReply(child, allReplies, review, depth + 1)
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              My Reviews & Ratings
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Reviews received by your business profile
            </p>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Total Reviews: {reviews.length}
            </p>
          </div>

          <button
            onClick={fetchReviews}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
            Loading your reviews...
          </div>
        ) : error && !reviews.length ? (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchReviews}
              className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center">
            <MessageSquare
              size={42}
              className="mx-auto mb-4 text-slate-300"
            />
            <h2 className="text-lg font-bold text-slate-800">
              No Reviews Yet
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Abhi aapki business profile par koi review nahi hai.
            </p>
          </div>
        ) : (
          <>
            {!!error && <p className="mb-4 text-sm text-red-600">{error}</p>}

            <div className="grid items-start gap-5 md:grid-cols-2">
              {reviews.map((review, index) => {
                const rating = Math.max(
                  0,
                  Math.min(5, Number(review.rating) || 0)
                );
                const replies = Array.isArray(review?.replies)
                  ? review.replies
                  : [];
                const topLevelReplies = replies.filter((reply) => {
                  const parentId =
                    reply?.parentReplyId?._id || reply?.parentReplyId;
                  return !parentId;
                });

                return (
                  <article
                    key={review._id || index}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        {review.user?.profileImage ? (
                          <img
                            src={review.user.profileImage}
                            alt={review.user?.name || "Reviewer"}
                            className="h-11 w-11 rounded-full object-cover"
                          />
                        ) : (
                          <UserCircle
                            size={42}
                            className="shrink-0 text-slate-400"
                          />
                        )}

                        <div className="min-w-0">
                          <h3 className="break-words font-bold text-slate-900">
                            {review.user?.name || "Rodio User"}
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            {review.createdAt
                              ? new Date(review.createdAt).toLocaleDateString(
                                  "en-IN"
                                )
                              : "Date unavailable"}
                          </p>
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5 text-sm font-bold text-amber-700">
                        <Star
                          size={15}
                          className="fill-amber-400 text-amber-400"
                        />
                        {rating}/5
                      </div>
                    </div>

                    <div className="mt-4 flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={17}
                          className={
                            star <= rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }
                        />
                      ))}
                    </div>

                    <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                      {review.comment || "No written feedback."}
                    </p>

                    {isOwnItem(review) && !!review?._id && (
                      <button
                        type="button"
                        disabled={!!deletingItems[String(review._id)]}
                        onClick={() => deleteComment(review)}
                        className="mt-2 flex items-center gap-[5px] rounded-lg bg-red-50 px-2 py-[5px] text-xs font-bold text-red-700"
                      >
                        {deletingItems[String(review._id)] ? (
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-700 border-t-transparent" />
                        ) : (
                          <>
                            <Trash2 size={14} />
                            <span>Delete comment</span>
                          </>
                        )}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedReplies((prev) => ({
                          ...prev,
                          [review._id]: !prev[review._id],
                        }))
                      }
                      className="mt-3.5 flex items-center gap-[7px] py-[5px] text-[13px] font-bold text-blue-900"
                    >
                      <MessageSquare size={15} />
                      {expandedReplies[review._id]
                        ? "Hide replies"
                        : `Replies (${replies.length})`}
                    </button>

                    {expandedReplies[review._id] && (
                      <div className="mt-2 rounded-xl border border-slate-200 bg-blue-50 p-2.5">
                        {topLevelReplies.map((reply) =>
                          renderReply(reply, replies, review)
                        )}

                        {!replyTargets[review._id] && (
                          <div className="mt-2 rounded-[10px] border border-slate-200 bg-white p-2.5">
                            <p className="mb-1 text-xs text-slate-500">
                              Reply to this review
                            </p>
                            <textarea
                              className="max-h-[110px] min-h-[44px] w-full rounded-[9px] border border-slate-200 bg-white px-[11px] py-[9px] text-sm text-slate-900 placeholder-slate-400 outline-none focus:border-blue-500"
                              placeholder="Write a reply..."
                              value={replyInputs[review._id] || ""}
                              onChange={(e) =>
                                setReplyInputs((prev) => ({
                                  ...prev,
                                  [review._id]: e.target.value,
                                }))
                              }
                            />
                            <div className="mt-[9px] flex items-center justify-between">
                              <div />
                              <button
                                type="button"
                                disabled={!!sendingReply[review._id]}
                                onClick={() => sendReply(review, null)}
                                className="flex min-h-[36px] min-w-[78px] items-center justify-center rounded-full bg-blue-900 px-4 text-[13px] font-extrabold text-white disabled:opacity-60"
                              >
                                {sendingReply[review._id] ? (
                                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                ) : (
                                  "Reply"
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}