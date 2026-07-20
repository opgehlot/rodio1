import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/api";

function ShowEnquiry() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const res = await API.get("/booking/my-bookings");
      setBookings(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <h2 className="text-lg font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="p-6">

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="bg-slate-900 text-white px-6 py-4">
          <h2 className="text-xl font-bold">My Enquiries</h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="px-4 py-3 text-left">#</th>

                <th className="px-4 py-3 text-left">Service</th>

                <th className="px-4 py-3 text-left">Vehicle</th>

                <th className="px-4 py-3 text-left">Pickup</th>

                <th className="px-4 py-3 text-left">Destination</th>

                <th className="px-4 py-3 text-left">Goods</th>

                <th className="px-4 py-3 text-left">Weight</th>

                <th className="px-4 py-3 text-left">Contact</th>

                <th className="px-4 py-3 text-left">Budget</th>

                <th className="px-4 py-3 text-left">Pickup Date</th>

                <th className="px-4 py-3 text-center">Action</th>

              </tr>

            </thead>

            <tbody>

              {bookings.length > 0 ? (

                bookings.map((booking, index) => (

                  <tr
                    key={booking._id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="px-4 py-4">{index + 1}</td>

                    <td className="px-4 py-4">
                      {booking.service}
                    </td>

                    <td className="px-4 py-4 font-medium">
                      {booking.vehicleType}
                    </td>

                    <td className="px-4 py-4">
                      {booking.pickupLocation}
                    </td>

                    <td className="px-4 py-4">
                      {booking.loading_point}
                    </td>

                    <td className="px-4 py-4">
                      {booking.goodsType}
                    </td>

                    <td className="px-4 py-4">
                      {booking.weight} Kg
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-medium">
                        {booking.contactPerson}
                      </p>

                      <p className="text-sm text-gray-500">
                        {booking.contactNumber}
                      </p>
                    </td>

                    <td className="px-4 py-4 font-semibold text-green-600">
                      ₹ {booking.expectedBudget}
                    </td>

                    <td className="px-4 py-4">
                      {booking.pickupDate}
                    </td>

                    <td className="px-4 py-4 text-center">

                      <button
                        onClick={() =>
                         navigate(`/dashboard/bid-list/${booking._id}`)
                        }
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        View Bids
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="11"
                    className="text-center py-10 text-gray-500"
                  >
                    No Enquiries Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ShowEnquiry;