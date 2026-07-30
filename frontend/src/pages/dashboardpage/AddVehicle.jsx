import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTruck, FaIdCard, FaWeightHanging, FaBoxes } from "react-icons/fa";
import API from "../../api/api";

export function AddVehicle() {
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

      const response = await API.post("/vehicles", form);

      toast.success(
        response.data.message || "Vehicle added successfully"
      );

      navigate("/dashboard/my-vehicles");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Vehicle add nahi hua"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900 py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl border-2 border-gray-200 shadow-sm p-6 sm:p-8">
        
        {/* Header */}
        <div className="border-b-2 border-gray-200 pb-5 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gray-900 text-white p-3 rounded-xl">
              <FaTruck size={22} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Add Vehicle
            </h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base font-medium">
            Register your transport vehicle details for fleet management.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Vehicle Type */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Vehicle Type <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <FaTruck className="absolute left-3 text-gray-500 pointer-events-none" />
              <select
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                required
                className="w-full bg-white border-2 border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-900 font-semibold focus:outline-none focus:border-gray-900 transition-colors cursor-pointer"
              >
                <option value="">Select Vehicle Type</option>
                <option value="Truck">Truck</option>
                <option value="Trailer">Trailer</option>
                <option value="Container">Container</option>
                <option value="Pickup">Pickup</option>
              </select>
            </div>
          </div>

          {/* Vehicle Number */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Vehicle Number <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <FaIdCard className="absolute left-3 text-gray-500" />
              <input
                type="text"
                name="vehicleNumber"
                value={form.vehicleNumber}
                onChange={handleChange}
                placeholder="RJ19AB1234"
                required
                className="w-full bg-white border-2 border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-900 font-semibold uppercase focus:outline-none focus:border-gray-900 transition-colors placeholder:normal-case placeholder:font-normal"
              />
            </div>
          </div>

          {/* Capacity */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Capacity
            </label>
            <div className="relative flex items-center">
              <FaWeightHanging className="absolute left-3 text-gray-500" />
              <input
                type="text"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="e.g. 20 Ton"
                className="w-full bg-white border-2 border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-900 font-semibold focus:outline-none focus:border-gray-900 transition-colors"
              />
            </div>
          </div>

          {/* Body Type */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Body Type
            </label>
            <div className="relative flex items-center">
              <FaBoxes className="absolute left-3 text-gray-500 pointer-events-none" />
              <select
                name="bodyType"
                value={form.bodyType}
                onChange={handleChange}
                className="w-full bg-white border-2 border-gray-300 rounded-xl py-3 pl-10 pr-4 text-gray-900 font-semibold focus:outline-none focus:border-gray-900 transition-colors cursor-pointer"
              >
                <option value="">Select Body Type</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Container">Container</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl font-bold tracking-wide shadow-md transition-all disabled:bg-gray-400 cursor-pointer"
          >
            {loading ? "Adding Vehicle..." : "Add Vehicle"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default AddVehicle;