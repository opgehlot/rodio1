import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../api/api";

function BidList() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBids();
  }, []);

  const getBids = async () => {
    try {
      const res = await API.get(`/bids/booking/${id}`);
      setBids(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
 const acceptBid = async (bidId) => {
  try {

    const res = await API.put(`/bids/accept/${bidId}`);

    alert(res.data.message);

    // Fresh bids load karo
    const bidRes = await API.get(`/bids/booking/${id}`);

    setBids(bidRes.data.data);

  } catch (error) {
    console.log(error);
  }
};

const acceptedBid = bids.find(
  (item) => item.status === "Accepted"
);

const displayBids = acceptedBid ? [acceptedBid] : bids;

if (loading) {
  return (
    <div>Loading...</div>
  );
}



  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Transporter Bids
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Back
        </button>

      </div>

      {bids.length === 0 ? (

        <div className="bg-white rounded-xl shadow border p-12 text-center">

          <div className="text-6xl mb-4">
            🚚
          </div>

          <h3 className="text-2xl font-bold">
            No Bids Yet
          </h3>

          <p className="text-gray-500 mt-2">
            Waiting for transporters to place bids.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

           {displayBids.map((bid) => (

            <div
              key={bid._id}
              className="bg-white rounded-xl shadow border p-5"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-xl font-bold">
                    {bid.transporter.name}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    📞 {bid.transporter.mobile}
                  </p>

                  <p className="text-gray-500">
                    📧 {bid.transporter.email}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
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

              <div className="mt-6">

                <p className="text-gray-500">
                  Bid Amount
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                  ₹ {bid.amount}
                </h2>

              </div>

              <div className="mt-5">

                <p className="text-gray-500 text-sm">
                  Message
                </p>

                <div className="bg-gray-100 rounded-lg p-3 mt-2">
                  {bid.message || "No Message"}
                </div>

              </div>

              <div className="mt-6 text-sm text-gray-400">
                Bid Date :
                {" "}
                {new Date(bid.createdAt).toLocaleDateString()}
              </div>

              {/* Future */}
              {/* Accept Bid Button */}
{bid.status === "Pending" && (
  <button
    onClick={() => acceptBid(bid._id)}
    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
  >
    Accept Bid
  </button>
)}
{bid.status === "Accepted" && (
  <div className="mt-4 bg-green-100 border border-green-300 rounded-lg p-3">
    <p className="text-green-700 font-semibold">
      ✅ Transporter Selected Successfully
    </p>
  </div>
)}
{bid.status === "Rejected" && (
  <div className="mt-4 bg-red-100 border border-red-300 rounded-lg p-3">
    <p className="text-red-700">
      Bid Rejected
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

export default BidList;