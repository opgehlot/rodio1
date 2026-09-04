// // import React, { useEffect, useState, useRef } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import toast, { Toaster } from "react-hot-toast";
// // import api from "../api/api";

// // export function ReviewSection() {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const [reviews, setReviews] = useState([]);
// //   const [rating, setRating] = useState(5);
// //   const [hoverRating, setHoverRating] = useState(0);

// //   const [comment, setComment] = useState(() => {
// //     return sessionStorage.getItem("pendingComment") || "";
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [selectedImage, setSelectedImage] = useState(null);

// //   const chatEndRef = useRef(null);

// //   // =========================================================
// //   // CHECK LOGIN
// //   // =========================================================
// //   const checkIsLoggedIn = () => {
// //     return !!(
// //       localStorage.getItem("token") ||
// //       localStorage.getItem("user") ||
// //       localStorage.getItem("authToken")
// //     );
// //   };

// //   // =========================================================
// //   // FETCH REVIEWS
// //   // =========================================================
// //   const fetchReviews = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await api.get("/reviewS");

// //       if (res.data?.success && Array.isArray(res.data.reviews)) {
// //         setReviews(res.data.reviews);
// //       } else if (Array.isArray(res.data)) {
// //         setReviews(res.data);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching reviews:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchReviews();
// //   }, []);

// //   // =========================================================
// //   // SCROLL DIRECTLY TO SEND / INPUT BOX AFTER LOGIN
// //   // =========================================================
// //   useEffect(() => {
// //     const shouldScroll = sessionStorage.getItem("shouldScrollToReviews");

// //     if (shouldScroll === "true") {
// //       sessionStorage.removeItem("shouldScrollToReviews");

// //       const timer = setTimeout(() => {
// //         // Target input/send form instead of top container
// //         const targetElement =
// //           document.getElementById("review-comment-form") ||
// //           document.getElementById("review-comment");

// //         if (targetElement) {
// //           targetElement.scrollIntoView({
// //             behavior: "smooth",
// //             block: "center", // Screen ke center me dikhega
// //           });

// //           // Focus directly on the input box
// //           const inputField = document.getElementById("review-comment");
// //           if (inputField) {
// //             inputField.focus();
// //           }
// //         }
// //       }, 500);

// //       return () => clearTimeout(timer);
// //     }
// //   }, []);

// //   // =========================================================
// //   // LOGIN REDIRECT
// //   // =========================================================
// //   const redirectToLogin = () => {
// //     sessionStorage.setItem("pendingComment", comment);
// //     sessionStorage.setItem("shouldScrollToReviews", "true");

// //     navigate("/login", {
// //       state: {
// //         returnTo: "/",
// //       },
// //     });
// //   };

// //   // =========================================================
// //   // SUBMIT REVIEW
// //   // =========================================================
// //   const handleReviewSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!checkIsLoggedIn()) {
// //       toast.error("Please login first to post a review!", {
// //         id: "login-required",
// //       });
// //       redirectToLogin();
// //       return;
// //     }

// //     if (!comment.trim()) {
// //       toast.error("Please write a comment.", {
// //         id: "empty-comment",
// //       });
// //       return;
// //     }

// //     try {
// //       setSubmitting(true);

// //       const payload = {
// //         rating: Number(rating),
// //         comment: comment.trim(),
// //       };

// //       const res = await api.post("/reviews", payload);

// //       if (res.data?.success) {
// //         toast.success(res.data.message || "Review submitted successfully!", {
// //           id: "review-success",
// //         });

// //         setComment("");
// //         setRating(5);
// //         sessionStorage.removeItem("pendingComment");
// //         sessionStorage.removeItem("shouldScrollToReviews");

// //         await fetchReviews();

// //         setTimeout(() => {
// //           chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //         }, 150);
// //       }
// //     } catch (err) {
// //       console.error("Error posting review:", err);
// //       toast.error(
// //         err?.response?.data?.message || "Review post karne me dikkat aayi!",
// //         {
// //           id: "review-error",
// //         }
// //       );
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // =========================================================
// //   // RATING STARS
// //   // =========================================================
// //   const renderStars = (value, interactive = false) => {
// //     return (
// //       <div className="flex items-center gap-1">
// //         {[1, 2, 3, 4, 5].map((star) => {
// //           const active = interactive
// //             ? star <= (hoverRating || rating)
// //             : star <= value;

// //           return (
// //             <button
// //               key={star}
// //               type={interactive ? "button" : undefined}
// //               onClick={interactive ? () => setRating(star) : undefined}
// //               onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
// //               onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
// //               className={`text-lg leading-none transition-transform ${
// //                 interactive ? "hover:scale-125 cursor-pointer focus:outline-none" : ""
// //               } ${active ? "text-amber-400" : "text-slate-300"}`}
// //             >
// //               ★
// //             </button>
// //           );
// //         })}
// //       </div>
// //     );
// //   };

// //   return (
// //     <>
// //       <section
// //         id="reviews"
// //         className="w-full bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 font-sans relative"
// //       >
// //         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
// //           {/* ========================================================= */}
// //           {/* LEFT SIDE: SIMPLE TEXT HEADER                             */}
// //           {/* ========================================================= */}
// //           <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
// //             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold w-fit border border-blue-100">
// //               <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
// //               Community Feedback
// //             </div>

// //             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
// //               Reviews & <br />
// //               <span className="text-blue-600">Feedback.</span>
// //             </h2>

// //             <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
// //               Connect with verified transporters across India. Share your experience and see what other businesses are saying.
// //             </p>
// //           </div>

// //           {/* ========================================================= */}
// //           {/* RIGHT SIDE: CHAT FEED (PROFILE + NAME + FIRM + STARS)    */}
// //           {/* ========================================================= */}
// //           <div className="lg:col-span-7 w-full">
// //             <div className="w-full bg-white border border-slate-200 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-[580px] sm:h-[620px]">
              
// //               {/* Header */}
// //               <div className="bg-slate-50/90 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
// //                     💬
// //                   </div>
// //                   <div>
// //                     <h3 className="text-slate-900 font-bold text-sm sm:text-base">
// //                       Member Reviews
// //                     </h3>
// //                     <p className="text-[11px] text-slate-500 font-medium">
// //                       Real-time ratings & experiences
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-full font-semibold">
// //                   {reviews.length} Reviews
// //                 </span>
// //               </div>

// //               {/* Scrollable Chat Feed */}
// //               <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
// //                 {loading ? (
// //                   <div className="flex justify-center items-center h-full text-slate-400 text-sm">
// //                     <span className="animate-pulse">Loading reviews...</span>
// //                   </div>
// //                 ) : reviews.length === 0 ? (
// //                   <div className="flex flex-col items-center justify-center h-full text-slate-400 text-sm text-center">
// //                     <span className="text-3xl mb-2">⭐</span>
// //                     <p className="font-semibold text-slate-700">No reviews yet.</p>
// //                     <p className="text-xs text-slate-400 mt-1">Be the first to leave a review!</p>
// //                   </div>
// //                 ) : (
// //                   reviews.map((rev, index) => {
// //                     const name = rev.user?.name || "RODIO User";
// //                     const firmName = rev.user?.firmName || "";
// //                     const profileImage = rev.user?.profileImage || null;

// //                     return (
// //                       <div
// //                         key={rev._id || `review-${index}`}
// //                         className="flex items-start gap-3"
// //                       >
// //                         {/* 1. PROFILE PICTURE */}
// //                         <div className="flex-shrink-0">
// //                           {profileImage ? (
// //                             <button
// //                               type="button"
// //                               onClick={() => setSelectedImage(profileImage)}
// //                               className="block relative group focus:outline-none"
// //                             >
// //                               <img
// //                                 src={profileImage}
// //                                 alt={name}
// //                                 className="w-11 h-11 rounded-full border-2 border-white object-cover ring-2 ring-slate-200 shadow-sm cursor-pointer transition-transform group-hover:scale-105"
// //                               />
// //                             </button>
// //                           ) : (
// //                             <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 border-2 border-white ring-2 ring-slate-200">
// //                               {name.charAt(0).toUpperCase()}
// //                             </div>
// //                           )}
// //                         </div>

// //                         {/* 2. BUBBLE CONTENT */}
// //                         <div className="flex flex-col max-w-[85%] sm:max-w-[80%]">
// //                           {/* NAME & FIRM NAME */}
// //                           <div className="flex flex-wrap items-baseline gap-2 mb-1 px-1">
// //                             <span className="text-xs font-bold text-slate-900">
// //                               {name}
// //                             </span>

// //                             {firmName && (
// //                               <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-blue-200">
// //                                 🏢 {firmName}
// //                               </span>
// //                             )}
// //                           </div>

// //                           {/* RATING & COMMENT */}
// //                           <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-tl-sm shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-1.5">
// //                             <div>
// //                               {renderStars(Number(rev.rating || 0), false)}
// //                             </div>

// //                             <p className="text-xs sm:text-sm text-slate-700 break-words leading-relaxed font-normal">
// //                               {rev.comment}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     );
// //                   })
// //                 )}
// //                 <div ref={chatEndRef} />
// //               </div>

// //               {/* ===================================================== */}
// //               {/* BOTTOM INPUT & SEND BUTTON                            */}
// //               {/* ===================================================== */}
// //               <form
// //                 id="review-comment-form"
// //                 onSubmit={handleReviewSubmit}
// //                 className="bg-white p-3 sm:p-4 border-t border-slate-200 flex flex-col gap-2.5"
// //               >
// //                 <div className="flex items-center justify-between px-1">
// //                   <span className="text-xs font-semibold text-slate-600">
// //                     Your Rating:
// //                   </span>
// //                   {renderStars(rating, true)}
// //                 </div>

// //                 <div className="flex items-center gap-2">
// //                   <input
// //                     id="review-comment"
// //                     type="text"
// //                     value={comment}
// //                     maxLength={100}
// //                     onChange={(e) => {
// //                       const val = e.target.value;
// //                       setComment(val);
// //                       sessionStorage.setItem("pendingComment", val);
// //                     }}
// //                     placeholder="Apna comment ya review likhein..."
// //                     className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
// //                   />

// //                   <button
// //                     type="submit"
// //                     disabled={submitting}
// //                     className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
// //                   >
// //                     {submitting ? "Posting..." : "Send"}
// //                   </button>
// //                 </div>

// //                 <div className="text-right text-[10px] text-slate-400 px-1">
// //                   {comment.length}/100
// //                 </div>
// //               </form>

// //             </div>
// //           </div>

// //         </div>
// //       </section>

// //       {/* WHATSAPP STYLE IMAGE POPUP MODAL */}
// //       {selectedImage && (
// //         <div
// //           className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
// //           onClick={() => setSelectedImage(null)}
// //         >
// //           <button
// //             type="button"
// //             onClick={() => setSelectedImage(null)}
// //             className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-slate-800 shadow-lg cursor-pointer hover:bg-slate-100"
// //             aria-label="Close image"
// //           >
// //             ✕
// //           </button>

// //           <img
// //             src={selectedImage}
// //             alt="Profile Preview"
// //             onClick={(e) => e.stopPropagation()}
// //             className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl ring-1 ring-white/20"
// //           />
// //         </div>
// //       )}
// //     </>
// //   );
// // }

// // export default ReviewSection;
// import React, { useEffect, useState, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import api from "../api/api";

// export function ReviewSection() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [reviews, setReviews] = useState([]);
//   const [rating, setRating] = useState(5);
//   const [hoverRating, setHoverRating] = useState(0);

//   const [comment, setComment] = useState(() => {
//     return sessionStorage.getItem("pendingComment") || "";
//   });

//   const [loading, setLoading] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const chatContainerRef = useRef(null);
//   const chatEndRef = useRef(null);

//   // =========================================================
//   // SCROLL CHAT WINDOW TO LATEST BOTTOM MESSAGE
//   // =========================================================
//   const scrollChatToBottom = (smooth = false) => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTo({
//         top: chatContainerRef.current.scrollHeight,
//         behavior: smooth ? "smooth" : "auto",
//       });
//     }
//   };

//   // =========================================================
//   // CHECK LOGIN
//   // =========================================================
//   const checkIsLoggedIn = () => {
//     return !!(
//       localStorage.getItem("token") ||
//       localStorage.getItem("user") ||
//       localStorage.getItem("authToken")
//     );
//   };

//   // =========================================================
//   // FETCH REVIEWS (LATEST AT BOTTOM)
//   // =========================================================
//   const fetchReviews = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/reviewS");

//       let rawList = [];
//       if (res.data?.success && Array.isArray(res.data.reviews)) {
//         rawList = res.data.reviews;
//       } else if (Array.isArray(res.data)) {
//         rawList = res.data;
//       }

//       // Backend -1 (descending) bhejta hai, hum reverse karenge
//       // taaki chat feed me latest comment hamesha niche rahe
//       const chatOrderList = [...rawList].reverse();
//       setReviews(chatOrderList);

//       setTimeout(() => {
//         scrollChatToBottom(false);
//       }, 50);
//     } catch (err) {
//       console.error("Error fetching reviews:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   // Jab bhi reviews update hon, chat feed ko bottom par scroll rakho
//   useEffect(() => {
//     scrollChatToBottom(true);
//   }, [reviews]);

//   // =========================================================
//   // SCROLL DIRECTLY TO SEND / INPUT BOX AFTER LOGIN
//   // =========================================================
//   useEffect(() => {
//     const shouldScroll = sessionStorage.getItem("shouldScrollToReviews");

//     if (shouldScroll === "true") {
//       sessionStorage.removeItem("shouldScrollToReviews");

//       const timer = setTimeout(() => {
//         const targetElement =
//           document.getElementById("review-comment-form") ||
//           document.getElementById("review-comment");

//         if (targetElement) {
//           targetElement.scrollIntoView({
//             behavior: "smooth",
//             block: "center",
//           });

//           const inputField = document.getElementById("review-comment");
//           if (inputField) {
//             inputField.focus();
//           }
//         }
//       }, 500);

//       return () => clearTimeout(timer);
//     }
//   }, []);

//   // =========================================================
//   // LOGIN REDIRECT
//   // =========================================================
//   const redirectToLogin = () => {
//     sessionStorage.setItem("pendingComment", comment);
//     sessionStorage.setItem("shouldScrollToReviews", "true");

//     navigate("/login", {
//       state: {
//         returnTo: "/",
//       },
//     });
//   };

//   // =========================================================
//   // SUBMIT REVIEW
//   // =========================================================
//   const handleReviewSubmit = async (e) => {
//     e.preventDefault();

//     if (!checkIsLoggedIn()) {
//       toast.error("Please login first to post a review!", {
//         id: "login-required",
//       });
//       redirectToLogin();
//       return;
//     }

//     if (!comment.trim()) {
//       toast.error("Please write a comment.", {
//         id: "empty-comment",
//       });
//       return;
//     }

//     try {
//       setSubmitting(true);

//       const payload = {
//         rating: Number(rating),
//         comment: comment.trim(),
//       };

//       const res = await api.post("/reviews", payload);

//       if (res.data?.success) {
//         toast.success(res.data.message || "Review submitted successfully!", {
//           id: "review-success",
//         });

//         setComment("");
//         setRating(5);
//         sessionStorage.removeItem("pendingComment");
//         sessionStorage.removeItem("shouldScrollToReviews");

//         await fetchReviews();

//         setTimeout(() => {
//           scrollChatToBottom(true);
//         }, 150);
//       }
//     } catch (err) {
//       console.error("Error posting review:", err);
//       toast.error(
//         err?.response?.data?.message || "Review post karne me dikkat aayi!",
//         {
//           id: "review-error",
//         }
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // =========================================================
//   // RATING STARS
//   // =========================================================
//   const renderStars = (value, interactive = false) => {
//     return (
//       <div className="flex items-center gap-1">
//         {[1, 2, 3, 4, 5].map((star) => {
//           const active = interactive
//             ? star <= (hoverRating || rating)
//             : star <= value;

//           return (
//             <button
//               key={star}
//               type={interactive ? "button" : undefined}
//               onClick={interactive ? () => setRating(star) : undefined}
//               onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
//               onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
//               className={`text-lg leading-none transition-transform ${
//                 interactive ? "hover:scale-125 cursor-pointer focus:outline-none" : ""
//               } ${active ? "text-amber-400" : "text-slate-300"}`}
//             >
//               ★
//             </button>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <>
//       <section
//         id="reviews"
//         className="w-full bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 font-sans relative"
//       >
//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
//           {/* LEFT SIDE: TEXT HEADER */}
//           <div className="lg:col-span-5 flex flex-col justify-center space-y-5">
//             <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold w-fit border border-blue-100">
//               <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
//               Community Feedback
//             </div>

//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
//               Reviews & <br />
//               <span className="text-blue-600">Feedback.</span>
//             </h2>

//             <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
//               Connect with verified transporters across India. Share your experience and see what other businesses are saying.
//             </p>
//           </div>

//           {/* RIGHT SIDE: CHAT FEED */}
//           <div className="lg:col-span-7 w-full">
//             <div className="w-full bg-white border border-slate-200 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-[580px] sm:h-[620px]">
              
//               {/* Header */}
//               <div className="bg-slate-50/90 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
//                     💬
//                   </div>
//                   <div>
//                     <h3 className="text-slate-900 font-bold text-sm sm:text-base">
//                       Member Reviews
//                     </h3>
//                     <p className="text-[11px] text-slate-500 font-medium">
//                       Real-time ratings & experiences
//                     </p>
//                   </div>
//                 </div>

//                 <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-full font-semibold">
//                   {reviews.length} Reviews
//                 </span>
//               </div>

//               {/* Scrollable Chat Feed (Starts from Bottom) */}
//               <div
//                 ref={chatContainerRef}
//                 className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/40 flex flex-col space-y-4"
//               >
//                 {/* Spacer: kam messages hone par unhe niche push karega */}
//                 <div className="flex-1" />

//                 {loading ? (
//                   <div className="flex justify-center items-center py-10 text-slate-400 text-sm">
//                     <span className="animate-pulse">Loading reviews...</span>
//                   </div>
//                 ) : reviews.length === 0 ? (
//                   <div className="flex flex-col items-center justify-center py-10 text-slate-400 text-sm text-center">
//                     <span className="text-3xl mb-2">⭐</span>
//                     <p className="font-semibold text-slate-700">No reviews yet.</p>
//                     <p className="text-xs text-slate-400 mt-1">Be the first to leave a review!</p>
//                   </div>
//                 ) : (
//                   reviews.map((rev, index) => {
//                     const name = rev.user?.name || "RODIO User";
//                     const firmName = rev.user?.firmName || "";
//                     const profileImage = rev.user?.profileImage || null;

//                     return (
//                       <div
//                         key={rev._id || `review-${index}`}
//                         className="flex items-start gap-3"
//                       >
//                         {/* 1. PROFILE PICTURE */}
//                         <div className="flex-shrink-0">
//                           {profileImage ? (
//                             <button
//                               type="button"
//                               onClick={() => setSelectedImage(profileImage)}
//                               className="block relative group focus:outline-none"
//                             >
//                               <img
//                                 src={profileImage}
//                                 alt={name}
//                                 className="w-11 h-11 rounded-full border-2 border-white object-cover ring-2 ring-slate-200 shadow-sm cursor-pointer transition-transform group-hover:scale-105"
//                               />
//                             </button>
//                           ) : (
//                             <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 border-2 border-white ring-2 ring-slate-200">
//                               {name.charAt(0).toUpperCase()}
//                             </div>
//                           )}
//                         </div>

//                         {/* 2. BUBBLE CONTENT */}
//                         <div className="flex flex-col max-w-[85%] sm:max-w-[80%]">
//                           {/* NAME & FIRM NAME */}
//                           <div className="flex flex-wrap items-baseline gap-2 mb-1 px-1">
//                             <span className="text-xs font-bold text-slate-900">
//                               {name}
//                             </span>

//                             {firmName && (
//                               <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-blue-200">
//                                 🏢 {firmName}
//                               </span>
//                             )}
//                           </div>

//                           {/* RATING & COMMENT */}
//                           <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-tl-sm shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-1.5">
//                             <div>
//                               {renderStars(Number(rev.rating || 0), false)}
//                             </div>

//                             <p className="text-xs sm:text-sm text-slate-700 break-words leading-relaxed font-normal">
//                               {rev.comment}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     );
//                   })
//                 )}
//                 <div ref={chatEndRef} />
//               </div>

//               {/* BOTTOM INPUT & SEND BUTTON */}
//               <form
//                 id="review-comment-form"
//                 onSubmit={handleReviewSubmit}
//                 className="bg-white p-3 sm:p-4 border-t border-slate-200 flex flex-col gap-2.5"
//               >
//                 <div className="flex items-center justify-between px-1">
//                   <span className="text-xs font-semibold text-slate-600">
//                      Add Your Rating:
//                   </span>
//                   {renderStars(rating, true)}
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <input
//                     id="review-comment"
//                     type="text"
//                     value={comment}
//                     maxLength={100}
//                     onChange={(e) => {
//                       const val = e.target.value;
//                       setComment(val);
//                       sessionStorage.setItem("pendingComment", val);
//                     }}
//                     placeholder="Apna comment ya review likhein..."
//                     className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
//                   />

//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
//                   >
//                     {submitting ? "Posting..." : "Send"}
//                   </button>
//                 </div>

//                 <div className="text-right text-[10px] text-slate-400 px-1">
//                   {comment.length}/100
//                 </div>
//               </form>

//             </div>
//           </div>

//         </div>
//       </section>

//       {/* WHATSAPP STYLE IMAGE POPUP MODAL */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
//           onClick={() => setSelectedImage(null)}
//         >
//           <button
//             type="button"
//             onClick={() => setSelectedImage(null)}
//             className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-slate-800 shadow-lg cursor-pointer hover:bg-slate-100"
//             aria-label="Close image"
//           >
//             ✕
//           </button>

//           <img
//             src={selectedImage}
//             alt="Profile Preview"
//             onClick={(e) => e.stopPropagation()}
//             className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl ring-1 ring-white/20"
//           />
//         </div>
//       )}
//     </>
//   );
// }

// export default ReviewSection;
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../api/api";

export function ReviewSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const [comment, setComment] = useState(() => {
    return sessionStorage.getItem("pendingComment") || "";
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const chatContainerRef = useRef(null);
  const chatEndRef = useRef(null);

  // =========================================================
  // GET CURRENT LOGGED-IN USER ID
  // =========================================================
  const getCurrentUserId = () => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userObj = JSON.parse(userStr);
        return (
          userObj?._id ||
          userObj?.id ||
          userObj?.userId ||
          userObj?.user?._id ||
          null
        );
      }
    } catch {
      return null;
    }
    return null;
  };

  const currentUserId = getCurrentUserId();

  // =========================================================
  // SCROLL CHAT WINDOW TO LATEST BOTTOM MESSAGE
  // =========================================================
  const scrollChatToBottom = (smooth = false) => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  };

  // =========================================================
  // CHECK LOGIN
  // =========================================================
  const checkIsLoggedIn = () => {
    return !!(
      localStorage.getItem("token") ||
      localStorage.getItem("user") ||
      localStorage.getItem("authToken")
    );
  };

  // =========================================================
  // FETCH REVIEWS (LATEST AT BOTTOM)
  // =========================================================
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get("/reviews");

      let rawList = [];
      if (res.data?.success && Array.isArray(res.data.reviews)) {
        rawList = res.data.reviews;
      } else if (Array.isArray(res.data)) {
        rawList = res.data;
      }

      const chatOrderList = [...rawList].reverse();
      setReviews(chatOrderList);

      setTimeout(() => {
        scrollChatToBottom(false);
      }, 50);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    scrollChatToBottom(true);
  }, [reviews.length]);

  // =========================================================
  // SCROLL DIRECTLY TO SEND / INPUT BOX AFTER LOGIN
  // =========================================================
  useEffect(() => {
    const shouldScroll = sessionStorage.getItem("shouldScrollToReviews");

    if (shouldScroll === "true") {
      sessionStorage.removeItem("shouldScrollToReviews");

      const timer = setTimeout(() => {
        const targetElement =
          document.getElementById("review-comment-form") ||
          document.getElementById("review-comment");

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          const inputField = document.getElementById("review-comment");
          if (inputField) {
            inputField.focus();
          }
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  // =========================================================
  // LOGIN REDIRECT
  // =========================================================
  const redirectToLogin = () => {
    sessionStorage.setItem("pendingComment", comment);
    sessionStorage.setItem("shouldScrollToReviews", "true");

    navigate("/login", {
      state: {
        returnTo: "/",
      },
    });
  };

  // =========================================================
  // SUBMIT REVIEW
  // =========================================================
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!checkIsLoggedIn()) {
      toast.error("Please login first to post a review!", {
        id: "login-required",
      });
      redirectToLogin();
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment.", {
        id: "empty-comment",
      });
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        rating: Number(rating),
        comment: comment.trim(),
      };

      const res = await api.post("/reviews", payload);

      if (res.data?.success) {
        toast.success(res.data.message || "Review submitted successfully!", {
          id: "review-success",
        });

        setComment("");
        setRating(5);
        sessionStorage.removeItem("pendingComment");
        sessionStorage.removeItem("shouldScrollToReviews");

        await fetchReviews();

        setTimeout(() => {
          scrollChatToBottom(true);
        }, 150);
      }
    } catch (err) {
      console.error("Error posting review:", err);
      toast.error(
        err?.response?.data?.message || "Review post karne me dikkat aayi!",
        {
          id: "review-error",
        }
      );
    } finally {
      setSubmitting(false);
    }
  };

  // =========================================================
  // DELETE REVIEW HANDLER (DELETE /my-review/:id)
  // =========================================================
  const handleDeleteReview = async (reviewId) => {
    // if (!window.confirm("Kya aap apna comment delete karna chahte hain?")) {
    //   return;
    // }

    try {
      setDeletingId(reviewId);

      // Aapke route router.delete("/my-review/:id") se matched
      const res = await api.delete(`/reviews/my-review/${reviewId}`);

      if (res.data?.success) {
        toast.success(res.data.message || "Review deleted successfully!");
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      }
    } catch (err) {
      console.error("Error deleting review:", err);
      toast.error(
        err?.response?.data?.message || "Review delete karne me dikkat aayi!"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // RATING STARS
  // =========================================================
  const renderStars = (value, interactive = false) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = interactive
            ? star <= (hoverRating || rating)
            : star <= value;

          return (
            <button
              key={star}
              type={interactive ? "button" : undefined}
              onClick={interactive ? () => setRating(star) : undefined}
              onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
              onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
              className={`text-lg leading-none transition-transform ${
                interactive ? "hover:scale-125 cursor-pointer focus:outline-none" : ""
              } ${active ? "text-amber-400" : "text-slate-300"}`}
            >
              ★
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* <Toaster position="top-right" toastOptions={{ duration: 3000 }} /> */}

      <section
        id="reviews"
        className="w-full bg-white py-12 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100 font-sans relative"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT SIDE: TEXT HEADER */}
        <div className="lg:col-span-5 flex flex-col justify-center items-center lg:items-start space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-semibold w-fit border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Community Feedback
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Reviews & 
              <span className="text-blue-600"> Feedback.</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Connect with verified transporters across India. Share your experience and see what other businesses are saying.
            </p>
          </div>

          {/* RIGHT SIDE: CHAT FEED */}
          <div className="lg:col-span-7 w-full">
            <div className="w-full bg-white border border-slate-200 rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-[580px] sm:h-[620px]">
              
              {/* Header */}
              <div className="bg-slate-50/90 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                    💬
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-bold text-[20px] sm:text-base">
                      Member Reviews
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Real-time ratings & experiences
                    </p>
                  </div>
                </div>

                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs px-2.5 py-1 rounded-full font-semibold">
                  {reviews.length} Reviews
                </span>
              </div>

              {/* Scrollable Chat Feed */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/40 flex flex-col space-y-4"
              >
                <div className="flex-1" />

                {loading ? (
                  <div className="flex justify-center items-center py-10 text-slate-400 text-sm">
                    <span className="animate-pulse">Loading reviews...</span>
                  </div>
                ) : reviews.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-slate-400 text-sm text-center">
                    <span className="text-3xl mb-2">⭐</span>
                    <p className="font-semibold text-slate-700">No reviews yet.</p>
                    <p className="text-xs text-slate-400 mt-1">Be the first to leave a review!</p>
                  </div>
                ) : (
                  reviews.map((rev, index) => {
                    const name = rev.user?.name || "RODIO User";
                    const firmName = rev.user?.firmName || "";
                    const profileImage = rev.user?.profileImage || null;
                    const reviewUserId = rev.user?._id || rev.user?.id || rev.user;

                    // Match logged in user ID with review author ID
                    const isMyComment =
                      Boolean(currentUserId) &&
                      Boolean(reviewUserId) &&
                      String(currentUserId) === String(reviewUserId);

                    return (
                      <div
                        key={rev._id || `review-${index}`}
                        className="flex items-start gap-3 relative group"
                      >
                        {/* PROFILE PICTURE */}
                        <div className="flex-shrink-0">
                          {profileImage ? (
                            <button
                              type="button"
                              onClick={() => setSelectedImage(profileImage)}
                              className="block relative group focus:outline-none"
                            >
                              <img
                                src={profileImage}
                                alt={name}
                                className="w-11 h-11 rounded-full border-2 border-white object-cover ring-2 ring-slate-200 shadow-sm cursor-pointer transition-transform group-hover:scale-105"
                              />
                            </button>
                          ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600 border-2 border-white ring-2 ring-slate-200">
                              {name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* BUBBLE CONTENT */}
                        <div className="flex flex-col max-w-[85%] sm:max-w-[80%] flex-1">
                          <div className="flex flex-wrap items-baseline gap-2 mb-1 px-1">
                            <span className="text-xs font-bold text-slate-900">
                              {name}
                            </span>

                            {firmName && (
                              <span className="bg-blue-50 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-blue-200">
                                🏢 {firmName}
                              </span>
                            )}
                          </div>

                          <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-tl-sm shadow-[0_2px_8px_rgba(0,0,0,0.03)] space-y-1.5 relative">
                            {/* STARS & DELETE BUTTON */}
                            <div className="flex items-center justify-between">
                              <div>{renderStars(Number(rev.rating || 0), false)}</div>

                              {isMyComment && (
                                <button
                                  type="button"
                                  disabled={deletingId === rev._id}
                                  onClick={() => handleDeleteReview(rev._id)}
                                  title="Delete your review"
                                  className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer disabled:opacity-40"
                                >
                                  {deletingId === rev._id ? (
                                    <span className="text-[10px] font-semibold text-rose-500">
                                      Deleting...
                                    </span>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  )}
                                </button>
                              )}
                            </div>

                            <p className="text-xs sm:text-sm text-slate-700 break-words leading-relaxed font-normal">
                              {rev.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={chatEndRef} />
              </div>

              {/* BOTTOM INPUT & SEND BUTTON */}
              <form
                id="review-comment-form"
                onSubmit={handleReviewSubmit}
                className="bg-white p-3 sm:p-4 border-t border-slate-200 flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold text-slate-600">
                    Add Your Rating:
                  </span>
                  {renderStars(rating, true)}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="review-comment"
                    type="text"
                    value={comment}
                    maxLength={100}
                    onChange={(e) => {
                      const val = e.target.value;
                      setComment(val);
                      sessionStorage.setItem("pendingComment", val);
                    }}
                    placeholder="Apna comment ya review likhein..."
                    className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
                  >
                    {submitting ? "Posting..." : "Send"}
                  </button>
                </div>

                <div className="text-right text-[10px] text-slate-400 px-1">
                  {comment.length}/100
                </div>
              </form>

            </div>
          </div>

        </div>
      </section>

      {/* WHATSAPP STYLE IMAGE POPUP MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-bold text-slate-800 shadow-lg cursor-pointer hover:bg-slate-100"
            aria-label="Close image"
          >
            ✕
          </button>

          <img
            src={selectedImage}
            alt="Profile Preview"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl ring-1 ring-white/20"
          />
        </div>
      )}
    </>
  );
}

export default ReviewSection;