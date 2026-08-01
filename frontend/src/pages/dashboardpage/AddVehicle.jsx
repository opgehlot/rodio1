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

      navigate("/dashboard/myvehicles");
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
                <option value="Mini Truck">Mini Truck</option>
<option value="Pickup">Pickup</option>
<option value="Tata Ace">Tata Ace</option>
<option value="Bolero Pickup">Bolero Pickup</option>
<option value="Mahindra Jeeto">Mahindra Jeeto</option>
<option value="Ashok Leyland Dost">Ashok Leyland Dost</option>
<option value="Tempo">Tempo</option>
<option value="Canter">Canter</option>
<option value="Eicher">Eicher</option>
<option value="Truck">Truck</option>
<option value="LCV">LCV</option>
<option value="HCV">HCV</option>
<option value="14 Feet Truck">14 Feet Truck</option>
<option value="17 Feet Truck">17 Feet Truck</option>
<option value="19 Feet Truck">19 Feet Truck</option>
<option value="22 Feet Truck">22 Feet Truck</option>
<option value="24 Feet Truck">24 Feet Truck</option>
<option value="32 Feet Truck">32 Feet Truck</option>
<option value="Open Body">Open Body</option>
<option value="Closed Body">Closed Body</option>
<option value="20 Feet Container">20 Feet Container</option>
<option value="32 Feet Container">32 Feet Container</option>
<option value="Trailer">Trailer</option>
<option value="Flat Bed Trailer">Flat Bed Trailer</option>
<option value="Low Bed Trailer">Low Bed Trailer</option>
<option value="Semi Trailer">Semi Trailer</option>
<option value="Hydraulic Trailer">Hydraulic Trailer</option>
<option value="Tipper">Tipper</option>
<option value="Dumper">Dumper</option>
<option value="Tanker">Tanker</option>
<option value="Water Tanker">Water Tanker</option>
<option value="Fuel Tanker">Fuel Tanker</option>
<option value="Cement Bulker">Cement Bulker</option>
<option value="Refrigerated Truck">Refrigerated Truck</option>
<option value="Car Carrier">Car Carrier</option>
<option value="Bike Carrier">Bike Carrier</option>
<option value="Auto Carrier">Auto Carrier</option>
<option value="ODC Trailer">ODC Trailer</option>
<option value="Multi Axle Trailer">Multi Axle Trailer</option>
<option value="Crane">Crane</option>
<option value="Hyva">Hyva</option>
<option value="Transit Mixer">Transit Mixer</option>
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