import { useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

export function AddRating({ AddtransporterId }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      return toast.error("Please select a rating", { id: "rating-error" });
    }

    if (!comment.trim()) {
      return toast.error("Please enter a comment", { id: "comment-error" });
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.post(
        `/comment/${AddtransporterId}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message || "Review Added", { id: "review-success" });

      setRating(0);
      setComment("");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to submit review", { id: "review-error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Interactive Star Rating */}
        <div className="flex flex-col items-center justify-center space-y-2 py-2">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-3xl sm:text-4xl transition-transform duration-150 hover:scale-110 cursor-pointer focus:outline-none"
              >
                <span className={
                  (hoverRating || rating) >= star
                    ? "text-amber-400"
                    : "text-slate-200"
                }>
                  ★
                </span>
              </button>
            ))}
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {rating === 5 ? "Exceptional" : rating === 4 ? "Very Good" : rating === 3 ? "Average" : rating === 2 ? "Below Average" : rating === 1 ? "Poor" : "Select Rating"}
          </span>
        </div>

        {/* Comment Textarea */}
        <div className="space-y-2">
          <div className="relative">
            <textarea
              rows={4}
              maxLength={300}
              placeholder="Share details of your transportation experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none p-4 text-slate-900 text-base resize-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 font-medium px-1">
            <span>Minimum requirements: Professional feedback</span>
            <span>{comment.length}/300</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Submitting Review...</span>
            </>
          ) : (
            <span>Submit Review</span>
          )}
        </button>

      </form>
    </div>
  );
}

export default AddRating;