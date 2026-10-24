
import { useCallback, useEffect, useState } from "react";
import { Star, MessageSquare, RefreshCw, UserCircle } from "lucide-react";
import API from "../../api/api";

export default function MyReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const businessId = localStorage.getItem("businessId");

      if (!businessId) {
        setReviews([]);
        setError(
          "Business ID nahi mila. Apni business profile se dobara login karein."
        );
        return;
      }

      // Sirf current business profile ke reviews fetch honge
      const { data } = await API.get(`/transporters/${businessId}`,{
            headers: { "x-api-key": "ashu@rodio" },
           });

      const business = data?.data;
      const comments = Array.isArray(business?.comments)
        ? business.comments
        : [];

      setReviews(comments);
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
        ) : error ? (
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
          <div className="grid gap-5 md:grid-cols-2">
            {reviews.map((review, index) => {
              const rating = Math.max(
                0,
                Math.min(5, Number(review.rating) || 0)
              );

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
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
