import { useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

export function AddRating({  AddtransporterId  }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      return toast.error("Please select a rating");
    }

    if (!comment.trim()) {
      return toast.error("Please enter a comment");
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

      toast.success(data.message || "Review Added");

      setRating(0);
      setComment("");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

    <div className="mb-6">

      <h2 className="text-3xl font-bold text-gray-800">
        ⭐ Rate This Transporter
      </h2>

      <p className="text-gray-500 mt-2">
        Share your experience to help other customers.
      </p>

    </div>

    <form onSubmit={handleSubmit}>

      <div className="flex justify-center gap-3 mb-8">

        {[1,2,3,4,5].map((star)=>(

          <button
            key={star}
            type="button"
            onClick={()=>setRating(star)}
            className={`text-5xl transition-all duration-300 hover:scale-125 ${
              rating >= star
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          >
            ★
          </button>

        ))}

      </div>

      <div className="mb-6">

        <textarea
          rows={5}
          placeholder="Tell us about your experience..."
          value={comment}
          onChange={(e)=>setComment(e.target.value)}
          className="w-full rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none p-4 text-gray-700 resize-none"
        />

        <div className="text-right text-sm text-gray-400 mt-2">
          {comment.length}/300
        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 rounded-2xl transition-all shadow-lg"
      >
        {loading ? "Submitting..." : "Submit Review ⭐"}
      </button>

    </form>

  </div>
);
}
export default AddRating;
