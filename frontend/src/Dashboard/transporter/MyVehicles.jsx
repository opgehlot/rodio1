import { useEffect, useState } from "react";
import API from "../../api/api";
import AddVehicle from "./Addvehicle";

export function MyVehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await API.get("/vehicle/my-vehicles");

      setVehicles(res.data.vehicles);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        My Vehicles
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

        {vehicles.map((vehicle) => (

          <div
            key={vehicle._id}
            className="border rounded-xl shadow p-5"
          >

            <h2 className="text-xl font-bold">
              {vehicle.vehicleNumber}
            </h2>

            <p>{vehicle.vehicleType}</p>

            <p>{vehicle.capacity} Ton</p>

            <p>
              {vehicle.source} → {vehicle.destination}
            </p>

            <p
              className={`font-semibold ${
                vehicle.status === "Available"
                  ? "text-green-600"
                  : "text-red-500"
              }`}
            >
              {vehicle.status}
            </p>

            <div className="mt-4 flex gap-2">

              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Edit
              </button>

              <button className="bg-red-600 text-white px-4 py-2 rounded">
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
export default MyVehicles;