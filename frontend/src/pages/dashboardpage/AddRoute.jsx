import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../api/api";

export  function AddRoute() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    from: "",
    to: "",
    vehicleTypes: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post(
        "/routes",
        form
      );

      toast.success(
        response.data.message ||
          "Route added successfully"
      );

      navigate("/dashboard/my-routes");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Route add nahi hua"
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleVehicle = (type) => {
    setForm((prev) => ({
      ...prev,

      vehicleTypes:
        prev.vehicleTypes.includes(type)
          ? prev.vehicleTypes.filter(
              (item) => item !== type
            )
          : [...prev.vehicleTypes, type],
    }));
  };

  return (
    <div className="min-h-screen bg-orange-50 p-5">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-7">
        <h1 className="text-2xl font-bold">
          Add Route
        </h1>

        <p className="text-gray-500 mt-1 mb-6">
          Add the routes where your vehicles
          operate.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="font-medium">
              From
            </label>

            <input
              value={form.from}
              onChange={(e) =>
                setForm({
                  ...form,
                  from: e.target.value,
                })
              }
              placeholder="Jodhpur"
              required
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              To
            </label>

            <input
              value={form.to}
              onChange={(e) =>
                setForm({
                  ...form,
                  to: e.target.value,
                })
              }
              placeholder="Ahmedabad"
              required
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label className="font-medium">
              Available Vehicle Types
            </label>

            <div className="flex flex-wrap gap-3 mt-3">
              {[
                "Truck",
                "Trailer",
                "Container",
                "Pickup",
              ].map((type) => (
                <label
                  key={type}
                  className="border rounded-lg px-4 py-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={form.vehicleTypes.includes(
                      type
                    )}
                    onChange={() =>
                      toggleVehicle(type)
                    }
                    className="mr-2"
                  />

                  {type}
                </label>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold disabled:bg-gray-400"
          >
            {loading
              ? "Adding..."
              : "Add Route"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default AddRoute;
