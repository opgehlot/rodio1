// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import { FaStar, FaUserCircle } from "react-icons/fa";

// const ReviewSection = ({ transporterId }) => {
//   const [reviews, setReviews] = useState([]);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     const getReviews = async () => {
//       try {
//         const { data } = await API.get(`/transporters/${transporterId}`);
//         setReviews(data.data?.comments || []);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     if (transporterId) {
//       getReviews();
//     }
//   }, [transporterId]);

//   const visibleReviews = showAll ? reviews : reviews.slice(0, 5);

//   return (
//     <div className="w-full space-y-4">
//       {visibleReviews.length === 0 ? (
//         <p className="text-center text-gray-500">No reviews yet.</p>
//       ) : (
//         <>
//           {visibleReviews.map((review) => (
//             <div
//               key={review._id}
//               className="w-full bg-white border border-gray-200 rounded-xl p-4"
//             >
//               {/* Header */}
//               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

//                 <div className="flex items-center gap-3 min-w-0 flex-1">

//                   {review.user?.profileImage ? (
//                     <img
//                       src={review.user.profileImage}
//                       alt={review.user?.name}
//                       className="w-12 h-12 rounded-full object-cover flex-shrink-0"
//                     />
//                   ) : (
//                     <FaUserCircle
//                       className="text-gray-400 flex-shrink-0"
//                       size={45}
//                     />
//                   )}

//                   <div className="min-w-0">
//                     <h3 className="font-semibold text-base break-words">
//                       {review.user?.name || "Anonymous"}
//                     </h3>

//                     <p className="text-xs text-gray-500">
//                       {new Date(review.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-1 flex-wrap">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <FaStar
//                       key={star}
//                       className={
//                         star <= review.rating
//                           ? "text-yellow-400"
//                           : "text-gray-300"
//                       }
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Comment */}
//               <p
//                 className="mt-4 text-gray-700 text-sm sm:text-base leading-7 whitespace-pre-wrap break-words"
//                 style={{
//                   overflowWrap: "anywhere",
//                   wordBreak: "break-word",
//                 }}
//               >
//                 {review.comment}
//               </p>
//             </div>
//           ))}

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
import React, { useEffect, useMemo, useState } from "react";
import API from "../api/api";
import { FaStar, FaUserCircle, FaRegCommentDots } from "react-icons/fa";

const ReviewSection = ({ transporterId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);

        const { data } = await API.get(`/transporters/${transporterId}`);

        console.log("Reviews:", data);

        setReviews(data?.data?.comments || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (transporterId) {
      getReviews();
    }
  }, [transporterId]);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 5);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;

    const total = reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0
    );

    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Customer Reviews
          </h2>

          <p className="text-gray-500 text-sm">
            {reviews.length} Review{reviews.length !== 1 && "s"}
          </p>
        </div>

        {reviews.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-2 flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <span className="font-bold">
              {averageRating}
            </span>
          </div>
        )}

      </div>

      {/* Loading */}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-gray-100 rounded-2xl h-36"
            />
          ))}
        </div>
      ) : reviews.length === 0 ? (

        <div className="border rounded-3xl bg-gray-50 py-14 text-center">

          <FaRegCommentDots
            className="mx-auto text-gray-400"
            size={60}
          />

          <h3 className="mt-4 text-xl font-semibold">
            No Reviews Yet
          </h3>

          <p className="text-gray-500 mt-2">
            This transporter hasn't received any reviews yet.
          </p>

        </div>

      ) : (

        <>
          {visibleReviews.map((review) => (

            <div
              key={review._id}
              className="bg-white rounded-3xl border shadow-sm p-6 hover:shadow-lg transition"
            >

              {/* Top */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-3">

                  {review.user?.profileImage ? (
                    <img
                      src={review.user.profileImage}
                      alt={review.user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle
                      size={46}
                      className="text-gray-400"
                    />
                  )}

                  <div>

                    <h3 className="font-bold">
                      {review.user?.name || "Anonymous"}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString("en-IN")}
                    </p>

                  </div>

                </div>

                <div className="flex gap-1">

                  {[1,2,3,4,5].map((star)=>(
                    <FaStar
                      key={star}
                      className={
                        star <= (review.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}

                </div>

              </div>

              {/* Comment */}

              <p className="mt-5 text-gray-700 leading-7 whitespace-pre-wrap break-words">

                {review.comment || "No comment provided."}

              </p>

            </div>

          ))}

          {reviews.length > 5 && (

            <div className="text-center">

              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
              >
                {showAll
                  ? "Show Less"
                  : "View All Reviews"}
              </button>

            </div>

          )}
        </>

      )}
    </div>
  );
};

export default ReviewSection;