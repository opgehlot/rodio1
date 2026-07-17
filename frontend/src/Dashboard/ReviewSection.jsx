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

        console.log("Transporter Response:", data);

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
    <div className="space-y-4">
      {visibleReviews.length === 0 ? (
        <p className="text-gray-500 text-center">No reviews yet.</p>
      ) : (
        <>
          {visibleReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {review.user?.profileImage ? (
                    <img
                      src={review.user.profileImage}
                      alt={review.user?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle
                      size={45}
                      className="text-gray-400"
                    />
                  )}

                  <div>
                    <h3 className="font-semibold text-lg">
                      {review.user?.name || "Anonymous"}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1">
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

              <p className="mt-4 text-gray-700">
                {review.comment}
              </p>
            </div>
          ))}

          {reviews.length > 5 && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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