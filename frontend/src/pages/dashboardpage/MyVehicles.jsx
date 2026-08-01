import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaTruck,
  FaWeightHanging,
  FaBoxes,
  FaTrash,
  FaEdit,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import API from "../../api/api";

export default function MyVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update Popup
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    _id: "",
    vehicleType: "",
    vehicleNumber: "",
    capacity: "",
    bodyType: "",
  });

  // ==========================
  // GET VEHICLES
  // ==========================

  const fetchVehicles = async () => {
    try {
      setLoading(true);

      const res = await API.get("/vehicles/my");

      console.log(res.data);

      const list =
        res.data.data ||
        res.data.vehicles ||
        res.data.vehicle ||
        [];

      setVehicles(Array.isArray(list) ? list : []);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Vehicles load nahi hui"
      );
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // ==========================
  // DELETE
  // ==========================

  const deleteVehicle = async (id) => {
    if (!window.confirm("Delete vehicle?")) return;

    try {
      await API.delete(`/vehicles/${id}`);

      toast.success("Vehicle Deleted");

      setVehicles((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  // ==========================
  // OPEN UPDATE POPUP
  // ==========================

  const openUpdate = (vehicle) => {
    setForm({
      _id: vehicle._id,
      vehicleType: vehicle.vehicleType || "",
      vehicleNumber: vehicle.vehicleNumber || "",
      capacity: vehicle.capacity || "",
      bodyType: vehicle.bodyType || "",
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // PATCH UPDATE
  // ==========================

  const updateVehicle = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await API.patch(
        `/vehicles/${form._id}`,
        {
          vehicleType: form.vehicleType,
          vehicleNumber: form.vehicleNumber,
          capacity: form.capacity,
          bodyType: form.bodyType,
        }
      );

      toast.success("Vehicle Updated");

      setShowModal(false);

      fetchVehicles();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Update Failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-bold">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-5">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-3xl font-bold">
              My Vehicles
            </h1>

            <p className="text-gray-500">
              Manage your fleet
            </p>
          </div>

          {/* <button
            className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2"
          >
            <FaPlus />
            Add Vehicle
          </button> */}

        </div>

        {vehicles.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center">

            <FaTruck
              size={50}
              className="mx-auto mb-4 text-gray-400"
            />

            <h2 className="text-2xl font-bold">
              No Vehicles Found
            </h2>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {vehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white rounded-2xl shadow p-6"
              >

                <div className="flex items-center gap-3 mb-5">

                  <div className="bg-black text-white p-3 rounded-xl">
                    <FaTruck />
                  </div>

                  <div>

                    <h2 className="font-bold text-lg">
                      {vehicle.vehicleType}
                    </h2>

                    <p className="text-gray-500">
                      {vehicle.vehicleNumber}
                    </p>

                  </div>

                </div>

                <div className="space-y-3">

                  <div className="flex items-center gap-2">
                    <FaWeightHanging />
                    {vehicle.capacity || "-"}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaBoxes />
                    {vehicle.bodyType || "-"}
                  </div>

                </div>

                <div className="flex gap-3 mt-6">
                                    <button
                    onClick={() => openUpdate(vehicle)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl flex justify-center items-center gap-2"
                  >
                    <FaEdit />
                    Update
                  </button>

                  <button
                    onClick={() =>
                      deleteVehicle(vehicle._id)
                    }
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl flex justify-center items-center gap-2"
                  >
                    <FaTrash />
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* ==========================
            UPDATE POPUP
      =========================== */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Update Vehicle
            </h2>

            <form
              onSubmit={updateVehicle}
              className="space-y-5"
            >

              <div>

                <label className="font-semibold">
                  Vehicle Type
                </label>

                <select
                  name="vehicleType"
                  value={form.vehicleType}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 mt-2"
                >
                  <option value="Truck">
                    Truck
                  </option>

                  <option value="Trailer">
                    Trailer
                  </option>

                  <option value="Container">
                    Container
                  </option>

                  <option value="Pickup">
                    Pickup
                  </option>

                </select>

              </div>

              <div>

                <label className="font-semibold">
                  Vehicle Number
                </label>

                <input
                  type="text"
                  name="vehicleNumber"
                  value={form.vehicleNumber}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 mt-2 uppercase"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Capacity
                </label>

                <input
                  type="text"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 mt-2"
                />

              </div>

              <div>

                <label className="font-semibold">
                  Body Type
                </label>

                <select
                  name="bodyType"
                  value={form.bodyType}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 mt-2"
                >
                  <option value="">
                    Select
                  </option>

                  <option value="Open">
                    Open
                  </option>

                  <option value="Closed">
                    Closed
                  </option>

                  <option value="Container">
                    Container
                  </option>

                </select>

              </div>

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="flex-1 bg-gray-300 py-3 rounded-xl font-bold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-black text-white py-3 rounded-xl font-bold"
                >
                  {saving
                    ? "Updating..."
                    : "Update Vehicle"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}