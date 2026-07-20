import React, { useState } from "react";

const BidCard = () => {
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      bidAmount,
      message,
    };

    console.log(data);

    // API.post("/bid/create", data)
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow-lg border p-6">

        <h2 className="text-2xl font-bold text-center mb-6">
          Place Your Bid
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-medium mb-2">
              Bid Amount (₹)
            </label>

            <input
              type="number"
              placeholder="Enter your bid amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Message (Optional)
            </label>

            <textarea
              rows={4}
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold"
          >
            Submit Bid
          </button>

        </form>

      </div>
    </div>
  );
};

export default BidCard;