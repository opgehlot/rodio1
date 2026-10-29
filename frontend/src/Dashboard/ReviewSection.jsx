// // import React, { useEffect, useState } from "react";
// // import API from "../api/api";
// // import { FaStar, FaUserCircle } from "react-icons/fa";

// // const ReviewSection = ({ transporterId }) => {
// //   const [reviews, setReviews] = useState([]);
// //   const [showAll, setShowAll] = useState(false);

// //   useEffect(() => {
// //     const getReviews = async () => {
// //       try {
// //         const { data } = await API.get(`/transporters/${transporterId}`);
// //         setReviews(data.data?.comments || []);
// //       } catch (err) {
// //         console.log(err);
// //       }
// //     };

// //     if (transporterId) {
// //       getReviews();
// //     }
// //   }, [transporterId]);

// //   const visibleReviews = showAll ? reviews : reviews.slice(0, 5);

// //   return (
// //     <div className="w-full space-y-4">
// //       {visibleReviews.length === 0 ? (
// //         <p className="text-center text-gray-500">No reviews yet.</p>
// //       ) : (
// //         <>
// //           {visibleReviews.map((review) => (
// //             <div
// //               key={review._id}
// //               className="w-full bg-white border border-gray-200 rounded-xl p-4"
// //             >
// //               {/* Header */}
// //               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

// //                 <div className="flex items-center gap-3 min-w-0 flex-1">

// //                   {review.user?.profileImage ? (
// //                     <img
// //                       src={review.user.profileImage}
// //                       alt={review.user?.name}
// //                       className="w-12 h-12 rounded-full object-cover flex-shrink-0"
// //                     />
// //                   ) : (
// //                     <FaUserCircle
// //                       className="text-gray-400 flex-shrink-0"
// //                       size={45}
// //                     />
// //                   )}

// //                   <div className="min-w-0">
// //                     <h3 className="font-semibold text-base break-words">
// //                       {review.user?.name || "Guest User"}
// //                     </h3>

// //                     <p className="text-xs text-gray-500">
// //                       {new Date(review.createdAt).toLocaleDateString()}
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="flex gap-1 flex-wrap">
// //                   {[1, 2, 3, 4, 5].map((star) => (
// //                     <FaStar
// //                       key={star}
// //                       className={
// //                         star <= review.rating
// //                           ? "text-yellow-400"
// //                           : "text-gray-300"
// //                       }
// //                     />
// //                   ))}
// //                 </div>
// //               </div>

// //               {/* Comment */}
// //               <p
// //                 className="mt-4 text-gray-700 text-sm sm:text-base leading-7 whitespace-pre-wrap break-words"
// //                 style={{
// //                   overflowWrap: "anywhere",
// //                   wordBreak: "break-word",
// //                 }}
// //               >
// //                 {review.comment}
// //               </p>
// //             </div>
// //           ))}

// //           {reviews.length > 5 && (
// //             <div className="text-center">
// //               <button
// //                 onClick={() => setShowAll(!showAll)}
// //                 className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
// //               >
// //                 {showAll ? "Show Less" : "View All Reviews"}
// //               </button>
// //             </div>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default ReviewSection;
// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { FaStar, FaUserCircle } from "react-icons/fa";

// const API_KEY = "ashu@rodio";

// const API_HEADERS = {
//   "X-API-KEY": API_KEY,
// };

// const ReviewSection = ({ transporterId }) => {
//   const [reviews, setReviews] = useState([]);
//   const [showAll, setShowAll] = useState(false);
//   const [replyInputs, setReplyInputs] = useState({});
//   const [replyTargets, setReplyTargets] = useState({});
//   const [sendingReply, setSendingReply] = useState({});
//   const [expandedReplies, setExpandedReplies] = useState({});
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const getReviews = async () => {
//       try {
//         setErrorMessage("");

//         // Main endpoint supplies the existing review list.
//         let baseReviews = [];
//         try {
//           const { data } = await API.get(`/transporters/${transporterId}`, {
//             headers: API_HEADERS,
//           });
//           const payload = data?.data;
//           baseReviews = Array.isArray(payload?.comments)
//             ? payload.comments
//             : Array.isArray(data?.comments)
//             ? data.comments
//             : [];
//         } catch (err) {
//           console.log(err);
//         }

//         // Dedicated comments endpoint is the source for saved replies.
//         let commentReviews = [];
//         try {
//           const res = await API.get(`/comment/${transporterId}`, {
//             headers: API_HEADERS,
//           });
//           const payload = res.data?.data;
//           commentReviews = Array.isArray(payload)
//             ? payload
//             : Array.isArray(payload?.comments)
//             ? payload.comments
//             : [];
//         } catch (err) {
//           console.log(err);
//         }

//         // Merge saved replies into the transporter reviews by review ID.
//         const commentsById = new Map(
//           commentReviews.map((item) => [String(item?._id), item])
//         );
//         const mergedReviews = baseReviews.map((item) => {
//           const saved = commentsById.get(String(item?._id));
//           return saved
//             ? {
//                 ...item,
//                 ...saved,
//                 user: saved.user || item.user,
//                 replies: Array.isArray(saved.replies)
//                   ? saved.replies
//                   : Array.isArray(item.replies)
//                   ? item.replies
//                   : [],
//               }
//             : item;
//         });

//         setReviews(mergedReviews.length ? mergedReviews : commentReviews);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (transporterId) {
//       getReviews();
//     }
//   }, [transporterId]);

//   const sendReply = async (review, parentReplyId = null) => {
//     const commentId = review?._id;
//     const text = (replyInputs[commentId] || "").trim();

//     if (!transporterId || !commentId) {
//       setErrorMessage("Transporter ya comment ID nahi mili.");
//       return;
//     }

//     if (!text) {
//       setErrorMessage("Reply likhein, phir send karein.");
//       return;
//     }

//     const endpoint = `/comment/${transporterId}/${commentId}/reply`;

//     try {
//       setErrorMessage("");
//       setSendingReply((prev) => ({ ...prev, [commentId]: true }));

//       const response = await API.post(
//         endpoint,
//         { comment: text, parentReplyId },
//         { headers: API_HEADERS }
//       );

//       // POST response contains the updated review and its replies.
//       const updatedReview = response.data?.data;

//       const newReplyFromResponse = Array.isArray(updatedReview?.replies)
//         ? updatedReview.replies
//         : null;

//       setReviews((prev) =>
//         prev.map((item) => {
//           if (String(item._id) !== String(commentId)) return item;

//           const currentReplies = Array.isArray(item.replies) ? item.replies : [];
//           let nextReplies = newReplyFromResponse || currentReplies;

//           // If POST response does not include the new reply, add it locally.
//           const responseHasNewReply = newReplyFromResponse?.some((reply) => {
//             const replyParentId = String(
//               reply?.parentReplyId?._id || reply?.parentReplyId || ""
//             );
//             const sameParent = parentReplyId
//               ? replyParentId === String(parentReplyId)
//               : !replyParentId;
//             return sameParent && String(reply?.comment || "").trim() === text;
//           });
//           if (!responseHasNewReply) {
//             nextReplies = [
//               ...currentReplies,
//               {
//                 _id: `local-${Date.now()}`,
//                 user: response.data?.reply?.user || "RODIO User",
//                 userName: response.data?.reply?.userName || "RODIO User",
//                 comment: text,
//                 parentReplyId: parentReplyId || null,
//                 createdAt: new Date().toISOString(),
//               },
//             ];
//           }

//           return {
//             ...item,
//             ...(updatedReview && typeof updatedReview === "object"
//               ? updatedReview
//               : {}),
//             // keep the already-populated review user from the list
//             user: item.user,
//             replies: nextReplies,
//           };
//         })
//       );

//       setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
//       setReplyTargets((prev) => ({ ...prev, [commentId]: null }));
//       setExpandedReplies((prev) => ({ ...prev, [commentId]: true }));
//     } catch (error) {
//       console.log("[REPLY] Failed:", error.message);
//       console.log("[REPLY] Status:", error.response?.status);
//       console.log("[REPLY] Response:", error.response?.data);

//       setErrorMessage(
//         error.response?.data?.message || "Reply submit nahi hua."
//       );
//     } finally {
//       setSendingReply((prev) => ({ ...prev, [commentId]: false }));
//     }
//   };

//   const visibleReviews = showAll ? reviews : reviews.slice(0, 5);

//   return (
//     <div className="w-full space-y-4">
//       {!!errorMessage && (
//         <p className="text-xs text-red-600">{errorMessage}</p>
//       )}

//       {visibleReviews.length === 0 ? (
//         <p className="text-center text-gray-500">No reviews yet.</p>
//       ) : (
//         <>
//           {visibleReviews.map((review) => {
//             const commentId = review?._id;
//             const replies = Array.isArray(review?.replies) ? review.replies : [];

//             const renderReply = (item, nested = false) => {
//               const replyName =
//                 (typeof item?.user === "object" && item?.user?.name) ||
//                 item?.userName ||
//                 "RODIO User";
//               const replyImage =
//                 (typeof item?.user === "object" &&
//                   (item?.user?.profileImage || item?.user?.avatar)) ||
//                 item?.profileImage ||
//                 null;
//               const children = replies.filter(
//                 (child) =>
//                   String(
//                     child?.parentReplyId?._id || child?.parentReplyId || ""
//                   ) === String(item?._id)
//               );
//               const isReplyingToThis =
//                 String(replyTargets[commentId] || "") === String(item?._id || "");

//               return (
//                 <div
//                   key={item._id}
//                   className={`mb-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 ${
//                     nested ? "ml-6 border-l-2 border-l-gray-300" : ""
//                   }`}
//                 >
//                   <div className="flex items-start gap-2.5">
//                     {replyImage ? (
//                       <img
//                         src={replyImage}
//                         alt={replyName}
//                         className="w-9 h-9 rounded-full object-cover flex-shrink-0"
//                       />
//                     ) : (
//                       <FaUserCircle
//                         className="text-gray-400 flex-shrink-0"
//                         size={36}
//                       />
//                     )}

//                     <div className="min-w-0 flex-1">
//                       <h4 className="font-semibold text-sm text-blue-900 break-words">
//                         {replyName}
//                       </h4>

//                       {!!item?.comment && (
//                         <p
//                           className="mt-1 text-gray-700 text-sm leading-6 whitespace-pre-wrap break-words"
//                           style={{
//                             overflowWrap: "anywhere",
//                             wordBreak: "break-word",
//                           }}
//                         >
//                           {item.comment}
//                         </p>
//                       )}

//                       <button
//                         type="button"
//                         onClick={() => {
//                           setExpandedReplies((prev) => ({
//                             ...prev,
//                             [commentId]: true,
//                           }));
//                           setReplyTargets((prev) => ({
//                             ...prev,
//                             [commentId]: item._id,
//                           }));
//                           setReplyInputs((prev) => ({
//                             ...prev,
//                             [commentId]: `@${replyName} `,
//                           }));
//                         }}
//                         className="mt-1.5 text-xs font-bold text-blue-600 hover:underline"
//                       >
//                         Reply
//                       </button>
//                     </div>
//                   </div>

//                   {isReplyingToThis && (
//                     <div className="mt-2.5 ml-1 rounded-xl border border-gray-200 bg-white p-2.5">
//                       <p className="text-xs text-gray-500">
//                         Replying to{" "}
//                         <span className="font-extrabold text-blue-600">
//                           @{replyName}
//                         </span>
//                       </p>

//                       <textarea
//                         className="mt-1 w-full min-h-[46px] max-h-[110px] rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500"
//                         placeholder={`Reply to @${replyName}`}
//                         value={replyInputs[commentId] || ""}
//                         onChange={(e) =>
//                           setReplyInputs((prev) => ({
//                             ...prev,
//                             [commentId]: e.target.value,
//                           }))
//                         }
//                         autoFocus
//                       />

//                       <div className="mt-2 flex items-center justify-end gap-4">
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setReplyTargets((prev) => ({
//                               ...prev,
//                               [commentId]: null,
//                             }));
//                             setReplyInputs((prev) => ({
//                               ...prev,
//                               [commentId]: "",
//                             }));
//                           }}
//                           className="text-xs font-bold text-red-600"
//                         >
//                           Cancel
//                         </button>

//                         <button
//                           type="button"
//                           disabled={!!sendingReply[commentId]}
//                           onClick={() => sendReply(review, item._id)}
//                           className={`min-w-[76px] min-h-[36px] px-4 rounded-full bg-blue-900 text-white text-sm font-extrabold flex items-center justify-center ${
//                             sendingReply[commentId] ? "opacity-60" : ""
//                           }`}
//                         >
//                           {sendingReply[commentId] ? (
//                             <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                           ) : (
//                             "Reply"
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   {children.map((child) => renderReply(child, true))}
//                 </div>
//               );
//             };

//             return (
//               <div
//                 key={review._id}
//                 className="w-full bg-white border border-gray-200 rounded-xl p-4"
//               >
//                 {/* Header */}
//                 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//                   <div className="flex items-center gap-3 min-w-0 flex-1">
//                     {review.user?.profileImage ? (
//                       <img
//                         src={review.user.profileImage}
//                         alt={review.user?.name}
//                         className="w-12 h-12 rounded-full object-cover flex-shrink-0"
//                       />
//                     ) : (
//                       <FaUserCircle
//                         className="text-gray-400 flex-shrink-0"
//                         size={45}
//                       />
//                     )}

//                     <div className="min-w-0">
//                       <h3 className="font-semibold text-base break-words">
//                         {review.user?.name || "Guest User"}
//                       </h3>

//                       <p className="text-xs text-gray-500">
//                         {new Date(review.createdAt).toLocaleDateString()}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex gap-1 flex-wrap">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <FaStar
//                         key={star}
//                         className={
//                           star <= review.rating
//                             ? "text-yellow-400"
//                             : "text-gray-300"
//                         }
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Comment */}
//                 <p
//                   className="mt-4 text-gray-700 text-sm sm:text-base leading-7 whitespace-pre-wrap break-words"
//                   style={{
//                     overflowWrap: "anywhere",
//                     wordBreak: "break-word",
//                   }}
//                 >
//                   {review.comment}
//                 </p>

//                 {/* Media */}
//                 {!!review?.media?.length && (
//                   <div className="mt-2 flex flex-wrap gap-2">
//                     {review.media.map((item, i) => (
//                       <img
//                         key={`${item.url}-${i}`}
//                         src={item.url}
//                         alt=""
//                         className="w-[130px] h-[100px] rounded-lg bg-gray-100 object-cover"
//                       />
//                     ))}
//                   </div>
//                 )}

//                 {/* Reply toggle */}
//                 <button
//                   type="button"
//                   className="mt-2 py-1 text-xs font-extrabold text-blue-900"
//                   onClick={() =>
//                     setExpandedReplies((prev) => ({
//                       ...prev,
//                       [commentId]: !prev[commentId],
//                     }))
//                   }
//                 >
//                   {expandedReplies[commentId]
//                     ? "Hide replies"
//                     : `Reply (${replies.length})`}
//                 </button>

//                 {/* Replies */}
//                 {expandedReplies[commentId] && (
//                   <div className="mt-2.5 rounded-xl border border-gray-200 bg-gray-50 p-3">
//                     {replies.length === 0 && (
//                       <p className="mb-2 text-xs text-gray-500">
//                         No replay.
//                       </p>
//                     )}

//                     {replies
//                       .filter((reply) => !reply?.parentReplyId)
//                       .map((reply) => renderReply(reply))}

//                     {!replyTargets[commentId] && (
//                       <div className="mt-2.5 ml-1 rounded-xl border border-gray-200 bg-white p-2.5">
//                         <p className="text-xs text-gray-500">
//                           Reply to this comment
//                         </p>

//                         <textarea
//                           className="mt-1 w-full min-h-[46px] max-h-[110px] rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500"
//                           placeholder="Write a reply..."
//                           value={replyInputs[commentId] || ""}
//                           onChange={(e) =>
//                             setReplyInputs((prev) => ({
//                               ...prev,
//                               [commentId]: e.target.value,
//                             }))
//                           }
//                         />

//                         <div className="mt-2 flex items-center justify-end gap-4">
//                           <button
//                             type="button"
//                             disabled={!!sendingReply[commentId]}
//                             onClick={() => sendReply(review, null)}
//                             className={`min-w-[76px] min-h-[36px] px-4 rounded-full bg-blue-900 text-white text-sm font-extrabold flex items-center justify-center ${
//                               sendingReply[commentId] ? "opacity-60" : ""
//                             }`}
//                           >
//                             {sendingReply[commentId] ? (
//                               <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                             ) : (
//                               "Reply"
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {reviews.length > 5 && (
//             <div className="text-center">
//               <button
//                 onClick={() => setShowAll(!showAll)}
//                 className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//               >
//                 {showAll ? "Show Less" : "View All Reviews"}
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ReviewSection;
import React, { useCallback, useEffect, useState } from "react";
import API from "../api/api";
import { FaStar, FaUserCircle, FaTrash } from "react-icons/fa";

const API_KEY = "ashu@rodio";

const API_HEADERS = {
  "X-API-KEY": API_KEY,
};

const normalizeId = (value) => {
  if (!value) return "";
  if (typeof value === "object") {
    return String(value._id || value.id || value.userId || "");
  }
  return String(value);
};

const getStoredUserId = () => {
  try {
    const userKeys = ["user", "userData", "currentUser", "profile", "authUser"];
    for (const key of userKeys) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        const id = normalizeId(
          parsed?._id ||
            parsed?.id ||
            parsed?.userId ||
            parsed?.user?._id ||
            parsed?.user?.id ||
            parsed?.data?.user?._id
        );
        if (id) return id;
      } catch (_) {
        // This storage key may contain a non-JSON value.
      }
    }

    const tokenKeys = ["token", "accessToken", "authToken", "jwt"];
    for (const key of tokenKeys) {
      const token = localStorage.getItem(key);
      if (!token || !token.includes(".")) continue;
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(
          window.atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        );
        const id = normalizeId(
          decoded?.id || decoded?._id || decoded?.userId || decoded?.sub
        );
        if (id) return id;
      } catch (_) {
        // Ignore tokens that cannot be decoded.
      }
    }
  } catch (error) {
    console.log("[REVIEWS] Unable to read logged-in user:", error?.message);
  }
  return "";
};

const ReviewSection = ({ transporterId }) => {
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [replyInputs, setReplyInputs] = useState({});
  const [replyTargets, setReplyTargets] = useState({});
  const [sendingReply, setSendingReply] = useState({});
  const [expandedReplies, setExpandedReplies] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [deletingItems, setDeletingItems] = useState({});

  useEffect(() => {
    setCurrentUserId(getStoredUserId());
  }, []);

  const isOwnItem = (item) => {
    const owner = normalizeId(
      item?.user?._id || item?.user?.id || item?.userId || item?.user
    );
    return !!currentUserId && !!owner && owner === String(currentUserId);
  };

  const getReviews = useCallback(async () => {
    try {
      setErrorMessage("");

      // Main endpoint supplies the existing review list.
      let baseReviews = [];
      try {
        const { data } = await API.get(`/transporters/${transporterId}`, {
          headers: API_HEADERS,
        });
        const payload = data?.data;
        baseReviews = Array.isArray(payload?.comments)
          ? payload.comments
          : Array.isArray(data?.comments)
          ? data.comments
          : [];
      } catch (err) {
        console.log(err);
      }

      // Dedicated comments endpoint is the source for saved replies.
      let commentReviews = [];
      try {
        const res = await API.get(`/comment/${transporterId}`, {
          headers: API_HEADERS,
        });
        const payload = res.data?.data;
        commentReviews = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.comments)
          ? payload.comments
          : [];
      } catch (err) {
        console.log(err);
      }

      // Merge saved replies into the transporter reviews by review ID.
      const commentsById = new Map(
        commentReviews.map((item) => [String(item?._id), item])
      );
      const mergedReviews = baseReviews.map((item) => {
        const saved = commentsById.get(String(item?._id));
        return saved
          ? {
              ...item,
              ...saved,
              user: saved.user || item.user,
              replies: Array.isArray(saved.replies)
                ? saved.replies
                : Array.isArray(item.replies)
                ? item.replies
                : [],
            }
          : item;
      });

      setReviews(mergedReviews.length ? mergedReviews : commentReviews);
    } catch (err) {
      console.log(err);
    }
  }, [transporterId]);

  useEffect(() => {
    if (transporterId) {
      getReviews();
    }
  }, [transporterId, getReviews]);

  const deleteComment = async (comment) => {
    if (!comment?._id) return;
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    const key = `comment-${comment._id}`;
    try {
      setErrorMessage("");
      setDeletingItems((prev) => ({ ...prev, [key]: true }));
      await API.delete(
        `/comment/${encodeURIComponent(transporterId)}/${comment._id}`,
        { headers: API_HEADERS }
      );
      setReviews((prev) =>
        prev.filter((item) => String(item?._id) !== String(comment._id))
      );
      await getReviews();
    } catch (error) {
      console.log(
        "[REVIEWS] Delete comment failed:",
        error?.response?.data || error?.message
      );
      setErrorMessage(
        error?.response?.data?.message || "Comment delete nahi hua."
      );
    } finally {
      setDeletingItems((prev) => ({ ...prev, [key]: false }));
    }
  };

  const deleteReply = async (comment, reply) => {
    if (!comment?._id || !reply?._id || String(reply._id).startsWith("local-")) {
      window.alert(
        "Is reply ka saved ID nahi mila. Pehle reviews refresh karein."
      );
      return;
    }
    if (!window.confirm("Are you sure you want to delete this reply?")) return;

    const key = `reply-${reply._id}`;
    try {
      setErrorMessage("");
      setDeletingItems((prev) => ({ ...prev, [key]: true }));
      await API.delete(
        `/comment/${encodeURIComponent(transporterId)}/${comment._id}/reply/${reply._id}`,
        { headers: API_HEADERS }
      );
      setReviews((prev) =>
        prev.map((item) => {
          if (String(item?._id) !== String(comment._id)) return item;
          return {
            ...item,
            replies: (Array.isArray(item.replies) ? item.replies : []).filter(
              (entry) => String(entry?._id) !== String(reply._id)
            ),
          };
        })
      );
      await getReviews();
    } catch (error) {
      console.log(
        "[REVIEWS] Delete reply failed:",
        error?.response?.data || error?.message
      );
      setErrorMessage(
        error?.response?.data?.message || "Reply delete nahi hua."
      );
    } finally {
      setDeletingItems((prev) => ({ ...prev, [key]: false }));
    }
  };

  const sendReply = async (review, parentReplyId = null) => {
    const commentId = review?._id;
    const text = (replyInputs[commentId] || "").trim();

    if (!transporterId || !commentId) {
      setErrorMessage("Transporter ya comment ID nahi mili.");
      return;
    }

    if (!text) {
      setErrorMessage("Reply likhein, phir send karein.");
      return;
    }

    const endpoint = `/comment/${transporterId}/${commentId}/reply`;

    try {
      setErrorMessage("");
      setSendingReply((prev) => ({ ...prev, [commentId]: true }));

      const response = await API.post(
        endpoint,
        { comment: text, parentReplyId },
        { headers: API_HEADERS }
      );

      // POST response contains the updated review and its replies.
      const updatedReview = response.data?.data;

      const newReplyFromResponse = Array.isArray(updatedReview?.replies)
        ? updatedReview.replies
        : null;

      setReviews((prev) =>
        prev.map((item) => {
          if (String(item._id) !== String(commentId)) return item;

          const currentReplies = Array.isArray(item.replies) ? item.replies : [];
          let nextReplies = newReplyFromResponse || currentReplies;

          // If POST response does not include the new reply, add it locally.
          const responseHasNewReply = newReplyFromResponse?.some((reply) => {
            const replyParentId = String(
              reply?.parentReplyId?._id || reply?.parentReplyId || ""
            );
            const sameParent = parentReplyId
              ? replyParentId === String(parentReplyId)
              : !replyParentId;
            return sameParent && String(reply?.comment || "").trim() === text;
          });
          if (!responseHasNewReply) {
            nextReplies = [
              ...currentReplies,
              {
                _id: `local-${Date.now()}`,
                user: response.data?.reply?.user || "RODIO User",
                userName: response.data?.reply?.userName || "RODIO User",
                comment: text,
                parentReplyId: parentReplyId || null,
                createdAt: new Date().toISOString(),
              },
            ];
          }

          return {
            ...item,
            ...(updatedReview && typeof updatedReview === "object"
              ? updatedReview
              : {}),
            // keep the already-populated review user from the list
            user: item.user,
            replies: nextReplies,
          };
        })
      );

      setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
      setReplyTargets((prev) => ({ ...prev, [commentId]: null }));
      setExpandedReplies((prev) => ({ ...prev, [commentId]: true }));
    } catch (error) {
      console.log("[REPLY] Failed:", error.message);
      console.log("[REPLY] Status:", error.response?.status);
      console.log("[REPLY] Response:", error.response?.data);

      setErrorMessage(
        error.response?.data?.message || "Reply submit nahi hua."
      );
    } finally {
      setSendingReply((prev) => ({ ...prev, [commentId]: false }));
    }
  };

  const visibleReviews = showAll ? reviews : reviews.slice(0, 5);

  return (
    <div className="w-full space-y-4">
      {!!errorMessage && (
        <p className="text-xs text-red-600">{errorMessage}</p>
      )}

      {visibleReviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
      ) : (
        <>
          {visibleReviews.map((review) => {
            const commentId = review?._id;
            const replies = Array.isArray(review?.replies) ? review.replies : [];

            const renderReply = (item, nested = false) => {
              const replyName =
                (typeof item?.user === "object" && item?.user?.name) ||
                item?.userName ||
                "RODIO User";
              const replyImage =
                (typeof item?.user === "object" &&
                  (item?.user?.profileImage || item?.user?.avatar)) ||
                item?.profileImage ||
                null;
              const children = replies.filter(
                (child) =>
                  String(
                    child?.parentReplyId?._id || child?.parentReplyId || ""
                  ) === String(item?._id)
              );
              const isReplyingToThis =
                String(replyTargets[commentId] || "") === String(item?._id || "");

              return (
                <div
                  key={item._id}
                  className={`mb-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 ${
                    nested ? "ml-6 border-l-2 border-l-gray-300" : ""
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {replyImage ? (
                      <img
                        src={replyImage}
                        alt={replyName}
                        className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <FaUserCircle
                        className="text-gray-400 flex-shrink-0"
                        size={36}
                      />
                    )}

                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-sm text-blue-900 break-words">
                        {replyName}
                      </h4>

                      {!!item?.comment && (
                        <p
                          className="mt-1 text-gray-700 text-sm leading-6 whitespace-pre-wrap break-words"
                          style={{
                            overflowWrap: "anywhere",
                            wordBreak: "break-word",
                          }}
                        >
                          {item.comment}
                        </p>
                      )}

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setExpandedReplies((prev) => ({
                              ...prev,
                              [commentId]: true,
                            }));
                            setReplyTargets((prev) => ({
                              ...prev,
                              [commentId]: item._id,
                            }));
                            setReplyInputs((prev) => ({
                              ...prev,
                              [commentId]: `@${replyName} `,
                            }));
                          }}
                          className="mt-1.5 text-xs font-bold text-blue-600 hover:underline"
                        >
                          Reply
                        </button>

                        {isOwnItem(item) && (
                          <button
                            type="button"
                            disabled={!!deletingItems[`reply-${item._id}`]}
                            onClick={() => deleteReply(review, item)}
                            className="mt-1.5 py-0.5 text-xs font-extrabold text-red-700 hover:underline"
                          >
                            {deletingItems[`reply-${item._id}`] ? (
                              <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-700 border-t-transparent" />
                            ) : (
                              "Delete"
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {isReplyingToThis && (
                    <div className="mt-2.5 ml-1 rounded-xl border border-gray-200 bg-white p-2.5">
                      <p className="text-xs text-gray-500">
                        Replying to{" "}
                        <span className="font-extrabold text-blue-600">
                          @{replyName}
                        </span>
                      </p>

                      <textarea
                        className="mt-1 w-full min-h-[46px] max-h-[110px] rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500"
                        placeholder={`Reply to @${replyName}`}
                        value={replyInputs[commentId] || ""}
                        onChange={(e) =>
                          setReplyInputs((prev) => ({
                            ...prev,
                            [commentId]: e.target.value,
                          }))
                        }
                        autoFocus
                      />

                      <div className="mt-2 flex items-center justify-end gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setReplyTargets((prev) => ({
                              ...prev,
                              [commentId]: null,
                            }));
                            setReplyInputs((prev) => ({
                              ...prev,
                              [commentId]: "",
                            }));
                          }}
                          className="text-xs font-bold text-red-600"
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          disabled={!!sendingReply[commentId]}
                          onClick={() => sendReply(review, item._id)}
                          className={`min-w-[76px] min-h-[36px] px-4 rounded-full bg-blue-900 text-white text-sm font-extrabold flex items-center justify-center ${
                            sendingReply[commentId] ? "opacity-60" : ""
                          }`}
                        >
                          {sendingReply[commentId] ? (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          ) : (
                            "Reply"
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {children.map((child) => renderReply(child, true))}
                </div>
              );
            };

            return (
              <div
                key={review._id}
                className="w-full bg-white border border-gray-200 rounded-xl p-4"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {review.user?.profileImage ? (
                      <img
                        src={review.user.profileImage}
                        alt={review.user?.name}
                        className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <FaUserCircle
                        className="text-gray-400 flex-shrink-0"
                        size={45}
                      />
                    )}

                    <div className="min-w-0">
                      <h3 className="font-semibold text-base break-words">
                        {review.user?.name || "Guest User"}
                      </h3>

                      <p className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-1 flex-wrap">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        className={
                          star <= review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Comment */}
                <p
                  className="mt-4 text-gray-700 text-sm sm:text-base leading-7 whitespace-pre-wrap break-words"
                  style={{
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                  }}
                >
                  {review.comment}
                </p>

                {/* Delete comment */}
                {isOwnItem(review) && (
                  <button
                    type="button"
                    disabled={!!deletingItems[`comment-${commentId}`]}
                    onClick={() => deleteComment(review)}
                    className="mt-2 flex items-center gap-1.5 py-1 text-xs font-extrabold text-red-700"
                  >
                    {deletingItems[`comment-${commentId}`] ? (
                      <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-700 border-t-transparent" />
                    ) : (
                      <>
                        <FaTrash size={13} />
                        <span>Delete comment</span>
                      </>
                    )}
                  </button>
                )}

                {/* Media */}
                {!!review?.media?.length && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {review.media.map((item, i) => (
                      <img
                        key={`${item.url}-${i}`}
                        src={item.url}
                        alt=""
                        className="w-[130px] h-[100px] rounded-lg bg-gray-100 object-cover"
                      />
                    ))}
                  </div>
                )}

                {/* Reply toggle */}
                <button
                  type="button"
                  className="mt-2 py-1 text-xs font-extrabold text-blue-900"
                  onClick={() =>
                    setExpandedReplies((prev) => ({
                      ...prev,
                      [commentId]: !prev[commentId],
                    }))
                  }
                >
                  {expandedReplies[commentId]
                    ? "Hide replies"
                    : `Reply (${replies.length})`}
                </button>

                {/* Replies */}
                {expandedReplies[commentId] && (
                  <div className="mt-2.5 rounded-xl border border-gray-200 bg-gray-50 p-3">
                    {replies.length === 0 && (
                      <p className="mb-2 text-xs text-gray-500">
                        No replay.
                      </p>
                    )}

                    {replies
                      .filter((reply) => !reply?.parentReplyId)
                      .map((reply) => renderReply(reply))}

                    {!replyTargets[commentId] && (
                      <div className="mt-2.5 ml-1 rounded-xl border border-gray-200 bg-white p-2.5">
                        <p className="text-xs text-gray-500">
                          Reply to this comment
                        </p>

                        <textarea
                          className="mt-1 w-full min-h-[46px] max-h-[110px] rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500"
                          placeholder="Write a reply..."
                          value={replyInputs[commentId] || ""}
                          onChange={(e) =>
                            setReplyInputs((prev) => ({
                              ...prev,
                              [commentId]: e.target.value,
                            }))
                          }
                        />

                        <div className="mt-2 flex items-center justify-end gap-4">
                          <button
                            type="button"
                            disabled={!!sendingReply[commentId]}
                            onClick={() => sendReply(review, null)}
                            className={`min-w-[76px] min-h-[36px] px-4 rounded-full bg-blue-900 text-white text-sm font-extrabold flex items-center justify-center ${
                              sendingReply[commentId] ? "opacity-60" : ""
                            }`}
                          >
                            {sendingReply[commentId] ? (
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
              </div>
            );
          })}

          {reviews.length > 5 && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                {showAll ? "Show Less" : "View All Reviews"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewSection;