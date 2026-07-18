import { useEffect, useState } from "react";
import API from "../../api/api";
import { FaStar, FaUserCircle } from "react-icons/fa";

export  function DashboardReviews() {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  fetchReviews();
}, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);

const { data } = await API.get("/comment/my-reviews");

 

      setReviews(data.comments || []);
      setAverageRating(data.averageRating || 0);
      setTotalReviews(data.totalReviews || 0);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full px-3 sm:px-5 lg:px-8 py-6">

      {/* Rating Summary */}

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white mb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div>

            <h2 className="text-5xl font-bold">
              {Number(averageRating).toFixed(1)}
            </h2>

            <div className="flex mt-3">

              {[1,2,3,4,5].map((star)=>(
                <FaStar
                  key={star}
                  className={
                    star <= Math.round(averageRating)
                      ? "text-yellow-300"
                      : "text-blue-300"
                  }
                />
              ))}

            </div>

            <p className="mt-3 text-blue-100">
              Average Customer Rating
            </p>

          </div>

          <div className="flex items-center md:justify-end">

            <div>

              <h2 className="text-5xl font-bold">
                {totalReviews}
              </h2>

              <p className="text-blue-100 mt-2">
                Total Customer Reviews
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Reviews */}

      {reviews.length === 0 ? (

        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <h3 className="text-2xl font-semibold text-gray-700">
            No Reviews Yet
          </h3>

          <p className="text-gray-500 mt-3">
            Customers haven't reviewed your service yet.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {reviews.map((review) => (

            <div
              key={review._id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5"
            >

              <div className="flex flex-col sm:flex-row sm:justify-between gap-5">

                <div className="flex gap-4">

                  {review.user?.profileImage ? (

                    <img
                      src={review.user.profileImage}
                      alt=""
                      className="w-14 h-14 rounded-full object-cover"
                    />

                  ) : (

                    <FaUserCircle
                      size={55}
                      className="text-gray-400"
                    />

                  )}

                  <div>

                    <h3 className="font-bold text-lg">
                      {review.user?.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                <div className="flex">

                  {[1,2,3,4,5].map((star)=>(

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

              <div className="mt-5">

                <p className="text-gray-700 leading-8 break-words">
                  {review.comment}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default DashboardReviews;