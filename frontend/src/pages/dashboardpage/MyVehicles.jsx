import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../api/api";

export function MyVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    try {
      const response = await API.get(
        "/vehicles/my"
      );

      setVehicles(response.data.data || []);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Vehicles load nahi hui"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const deleteVehicle = async (id) => {
    const confirmed = window.confirm(
      "Delete this vehicle?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/vehicles/${id}`);

      toast.success("Vehicle deleted");

      setVehicles((prev) =>
        prev.filter(
          (vehicle) => vehicle._id !== id
        )
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading vehicles...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-5">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">
          My Vehicles
        </h1>

        {vehicles.length === 0 ? (
          <div className="bg-white p-8 rounded-xl text-center">
            No vehicles added yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white border rounded-2xl p-5 shadow-sm"
              >
                <h2 className="text-xl font-bold">
                  {vehicle.vehicleType}
                </h2>

                <p className="mt-3">
                  Number:{" "}
                  <strong>
                    {vehicle.vehicleNumber}
                  </strong>
                </p>

                <p>
                  Capacity:{" "}
                  {vehicle.capacity || "-"}
                </p>

                <p>
                  Body: {vehicle.bodyType || "-"}
                </p>

                <p>
                  Status: {vehicle.status}
                </p>

                <button
                  onClick={() =>
                    deleteVehicle(vehicle._id)
                  }
                  className="mt-5 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default MyVehicles;