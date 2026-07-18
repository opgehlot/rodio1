import { useEffect, useState } from "react";
import API from "../../../api/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
  try {
    const { data } = await API.get("/booking/my-bookings");

    setBookings(data.data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">

        <h1 className="text-3xl font-bold">
          My Bookings
        </h1>

        <div className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold mt-4 md:mt-0">
          Total Bookings : {bookings.length}
        </div>

      </div>

      {/* Desktop */}

      <div className="hidden lg:block overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-slate-900 text-white">

            <tr>

              <th className="p-3">#</th>
              <th className="p-3">Service</th>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Pickup</th>
              <th className="p-3">Destination</th>
              <th className="p-3">Goods</th>
              <th className="p-3">Weight</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Budget</th>
              <th className="p-3">Pickup Date</th>
              <th className="p-3">Status</th>

            </tr>

          </thead>

          <tbody>

            {bookings.length ? (

              bookings.map((booking, index) => (

                <tr
                  key={booking._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3">{index + 1}</td>

                  <td className="p-3">{booking.service}</td>

                  <td className="p-3 font-semibold">
                    {booking.vehicleType}
                  </td>

                  <td className="p-3">
                    {booking.pickupLocation}
                  </td>

                  <td className="p-3">
                    {booking.loading_point}
                  </td>

                  <td className="p-3">
                    {booking.goodsType || "-"}
                  </td>

                  <td className="p-3">
                    {booking.weight || "-"} Kg
                  </td>

                  <td className="p-3">
                    {booking.contactPerson}
                    <br />
                    <span className="text-sm text-gray-500">
                      {booking.contactNumber}
                    </span>
                  </td>

                  <td className="p-3">
                    ₹ {booking.expectedBudget || 0}
                  </td>

                  <td className="p-3">
                    {booking.pickupDate}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status || "Pending"}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="11"
                  className="text-center py-10"
                >
                  No Bookings Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Mobile */}

      <div className="lg:hidden space-y-5">

        {bookings.length ? (

          bookings.map((booking) => (

            <div
              key={booking._id}
              className="bg-white rounded-xl shadow p-5"
            >

              <div className="flex justify-between items-center">

                <h2 className="font-bold text-lg">
                  {booking.service}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                    booking.status
                  )}`}
                >
                  {booking.status || "Pending"}
                </span>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-5">

                <div>
                  <p className="text-gray-500">Vehicle</p>
                  <p>{booking.vehicleType}</p>
                </div>

                <div>
                  <p className="text-gray-500">Goods</p>
                  <p>{booking.goodsType || "-"}</p>
                </div>

                <div>
                  <p className="text-gray-500">Pickup</p>
                  <p>{booking.pickupLocation}</p>
                </div>

                <div>
                  <p className="text-gray-500">Destination</p>
                  <p>{booking.loading_point}</p>
                </div>

                <div>
                  <p className="text-gray-500">Weight</p>
                  <p>{booking.weight || "-"} Kg</p>
                </div>

                <div>
                  <p className="text-gray-500">Budget</p>
                  <p>₹ {booking.expectedBudget || 0}</p>
                </div>

                <div className="col-span-2">
                  <p className="text-gray-500">Contact</p>
                  <p>
                    {booking.contactPerson}
                  </p>
                  <p className="text-sm">
                    {booking.contactNumber}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-gray-500">Pickup Date</p>
                  <p>{booking.pickupDate}</p>
                </div>

                {booking.remarks && (
                  <div className="col-span-2">
                    <p className="text-gray-500">Remarks</p>
                    <p>{booking.remarks}</p>
                  </div>
                )}

              </div>

            </div>

          ))

        ) : (

          <div className="text-center py-10 bg-white rounded-xl shadow">
            No Bookings Found
          </div>

        )}

      </div>

    </div>
  );
}