import React, { useEffect, useState } from "react";
import API from "../../api/api";

function AcceptedBid() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBids();
  }, []);

  const getMyBids = async () => {
    try {
      const res = await API.get("/bids/my-bids");
      setBids(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        My Bids
      </h2>

      {bids.length === 0 ? (
        <div className="bg-white rounded-xl shadow border p-10 text-center">
          <h3 className="text-2xl font-bold">
            No Bids Found
          </h3>

          <p className="text-gray-500 mt-2">
            You haven't placed any bids yet.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {bids.map((bid) => (

            <div
              key={bid._id}
              className="bg-white rounded-xl shadow border p-5"
            >

              <div className="flex justify-between">

                <h3 className="text-xl font-bold">
                  {bid.booking?.from} → {bid.booking?.to}
                </h3>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                  ${
                    bid.status === "Accepted"
                      ? "bg-green-100 text-green-700"
                      : bid.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {bid.status}
                </span>

              </div>

              <div className="mt-5">

                <p className="text-gray-500">
                  Bid Amount
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                  ₹ {bid.amount}
                </h2>

              </div>

              <div className="mt-5">

                <p className="text-gray-500">
                  Message
                </p>

                <div className="bg-gray-100 p-3 rounded mt-2">
                  {bid.message || "No Message"}
                </div>

              </div>

              <div className="mt-5 text-sm text-gray-500">
                Customer :
                {" "}
                {bid.booking?.createdBy?.name}
              </div>

              <div className="text-sm text-gray-500">
                Mobile :
                {" "}
                {bid.booking?.createdBy?.mobile}
              </div>

              {bid.status === "Accepted" && (
                <div className="mt-5 bg-green-100 border border-green-300 rounded-lg p-3">
                  <p className="text-green-700 font-semibold">
                    ✅ Congratulations! Your bid has been accepted.
                  </p>
                </div>
              )}

              {bid.status === "Rejected" && (
                <div className="mt-5 bg-red-100 border border-red-300 rounded-lg p-3">
                  <p className="text-red-700">
                    ❌ Your bid was rejected.
                  </p>
                </div>
              )}

              {bid.status === "Pending" && (
                <div className="mt-5 bg-yellow-100 border border-yellow-300 rounded-lg p-3">
                  <p className="text-yellow-700">
                    ⏳ Waiting for customer response.
                  </p>
                </div>
              )}

            </div>

          ))}

        </div>
      )}

    </div>
  );
}



export default AcceptedBid