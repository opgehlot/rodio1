import { useEffect, useState } from "react";
import API from "../../../api/api";

export default function ShowEnquiery() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/booking/my-requests");
      setRequests(res.data.requests || []);
    } catch (err) {
      console.log(err);
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
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="p-4 md:p-6">

      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <h1 className="text-3xl font-bold">
          My Requests
        </h1>

        <div className="bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold w-fit">
          Total Requests : {requests.length}
        </div>

      </div>

      {/* ========================= */}
      {/* Desktop Table */}
      {/* ========================= */}

      <div className="hidden lg:block bg-white rounded-xl shadow overflow-hidden">

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
              <th className="px-4 py-3 text-left">Budget</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-center">Status</th>

            </tr>

          </thead>

          <tbody>

            {requests.length > 0 ? (

              requests.map((request, index) => (

                <tr
                  key={request._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3">{request.service}</td>

                  <td className="px-4 py-3">{request.vehicleType}</td>

                  <td className="px-4 py-3">{request.pickupLocation}</td>

                  <td className="px-4 py-3">{request.loading_point}</td>

                  <td className="px-4 py-3">{request.goodsType}</td>

                  <td className="px-4 py-3">{request.weight}</td>

                  <td className="px-4 py-3">
                    ₹ {request.expectedBudget}
                  </td>

                  <td className="px-4 py-3">
                    {request.pickupDate}
                  </td>

                  <td className="px-4 py-3 text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {request.status}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="10"
                  className="text-center py-10 text-gray-500"
                >
                  No Requests Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* ========================= */}
      {/* Mobile Cards */}
      {/* ========================= */}

      <div className="lg:hidden space-y-4">

        {requests.length > 0 ? (

          requests.map((request, index) => (

            <div
              key={request._id}
              className="bg-white rounded-xl shadow p-5"
            >

              <div className="flex justify-between items-center mb-4">

                <h2 className="font-bold text-lg">
                  {request.service}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    request.status
                  )}`}
                >
                  {request.status}
                </span>

              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">

                <div>
                  <p className="text-gray-500">Vehicle</p>
                  <p className="font-medium">{request.vehicleType}</p>
                </div>

                <div>
                  <p className="text-gray-500">Goods</p>
                  <p className="font-medium">{request.goodsType}</p>
                </div>

                <div>
                  <p className="text-gray-500">Pickup</p>
                  <p className="font-medium">{request.pickupLocation}</p>
                </div>

                <div>
                  <p className="text-gray-500">Destination</p>
                  <p className="font-medium">{request.loading_point}</p>
                </div>

                <div>
                  <p className="text-gray-500">Weight</p>
                  <p className="font-medium">{request.weight}</p>
                </div>

                <div>
                  <p className="text-gray-500">Budget</p>
                  <p className="font-medium">
                    ₹ {request.expectedBudget}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-gray-500">Pickup Date</p>
                  <p className="font-medium">{request.pickupDate}</p>
                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
            No Requests Found
          </div>

        )}

      </div>

    </div>
  );
}