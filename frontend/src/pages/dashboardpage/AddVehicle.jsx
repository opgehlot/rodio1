import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";

export  function AddVehicle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    vehicleType: "",
    vehicleNumber: "",
    capacity: "",
    bodyType: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post(
        "/vehicles",
        form
      );

      toast.success(
        response.data.message ||
          "Vehicle added successfully"
      );

      navigate("/dashboard/my-vehicles");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Vehicle add nahi hua"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-5">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-7">
        <h1 className="text-2xl font-bold mb-6">
          Add Vehicle
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="font-medium">
              Vehicle Type
            </label>

            <select
              name="vehicleType"
              value={form.vehicleType}
              onChange={handleChange}
              required
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option value="">
                Select Vehicle
              </option>

              <option value="Truck">Truck</option>
              <option value="Trailer">Trailer</option>
              <option value="Container">
                Container
              </option>
              <option value="Pickup">Pickup</option>
            </select>
          </div>

          <div>
            <label className="font-medium">
              Vehicle Number
            </label>

            <input
              name="vehicleNumber"
              value={form.vehicleNumber}
              onChange={handleChange}
              placeholder="RJ19AB1234"
              required
              className="w-full border rounded-xl p-3 mt-2 uppercase"
            />
          </div>

          <div>
            <label className="font-medium">
              Capacity
            </label>

            <input
              name="capacity"
              value={form.capacity}
              onChange={handleChange}
              placeholder="20 Ton"
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              Body Type
            </label>

            <select
              name="bodyType"
              value={form.bodyType}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option value="">
                Select Body Type
              </option>

              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Container">
                Container
              </option>
            </select>
          </div>

          <button
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold disabled:bg-gray-400"
          >
            {loading
              ? "Adding..."
              : "Add Vehicle"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddVehicle;