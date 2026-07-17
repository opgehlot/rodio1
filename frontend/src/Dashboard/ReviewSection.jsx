import React, { useEffect, useState } from "react";
import API from "../api/api";
import { FaStar, FaUserCircle } from "react-icons/fa";

const ReviewSection = ({ transporterId }) => {
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const { data } = await API.get(`/transporters/${transporterId}`);
        setReviews(data.data?.comments || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (transporterId) {
      getReviews();
    }
  }, [transporterId]);

  const visibleReviews = showAll ? reviews : reviews.slice(0, 5);

  return (
    <div className="space-y-5">
      {visibleReviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews yet.</p>
      ) : (
        <>
          {visibleReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

                <div className="flex items-start gap-3 min-w-0 flex-1">

                  {review.user?.profileImage ? (
                    <img
                      src={review.user.profileImage}
                      alt={review.user?.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                  ) : (
                    <FaUserCircle
                      size={45}
                      className="text-gray-400 flex-shrink-0"
                    />
                  )}

                  <div className="min-w-0 flex-1">

                    <h3 className="font-semibold text-base sm:text-lg break-words">
                      {review.user?.name || "Anonymous"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                <div className="flex flex-wrap gap-1 sm:justify-end">

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

              <p className="mt-4 text-gray-700 leading-7 break-words whitespace-pre-wrap">
                {review.comment}
              </p>

            </div>
          ))}

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