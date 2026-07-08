import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/transport-company";

export default function Resistrationform() {

  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    address: "",
    phoneNumber: "",
    landlineNumber: "",
    email: "",
    gstNumber: "",
    vehicleType: "",
    operatingRoutes: "",
    document: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, {
        ...formData,
        operatingRoutes: formData.operatingRoutes
          .split(",")
          .map((route) => route.trim())
          .filter((route) => route !== ""),
      });

      alert(response.data.message);

      console.log(response.data);

      setFormData({
        companyName: "",
        ownerName: "",
        address: "",
        phoneNumber: "",
        landlineNumber: "",
        email: "",
        gstNumber: "",
        vehicleType: "",
        operatingRoutes: "",
        document: "",
        termsAccepted: false,
      });

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Transport Company Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Company Name */}
          <div>
            <label className="block font-semibold mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="ABC Transport"
              required
            />
          </div>

          {/* Owner Name */}
          <div>
            <label className="block font-semibold mb-2">
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Rahul Sharma"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block font-semibold mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="9876543210"
              required
            />
          </div>

          {/* Landline */}
          <div>
            <label className="block font-semibold mb-2">
              Landline Number
            </label>
            <input
              type="text"
              name="landlineNumber"
              value={formData.landlineNumber}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0771-123456"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="company@gmail.com"
              required
            />
          </div>

          {/* GST */}
          <div>
            <label className="block font-semibold mb-2">
              GST Number
            </label>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="22AAAAA0000A1Z5"
              required
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block font-semibold mb-2">
              Vehicle Type
            </label>
            <select
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select Vehicle</option>
              <option>Mini Truck (Eicher)</option>
              <option>Pickup</option>
              <option>Truck</option>
              <option>Trailer</option>
              <option>Container</option>
              <option>Refrigerated Van</option>
              <option>Other</option>
            </select>
          </div>

          {/* Routes */}
          <div>
            <label className="block font-semibold mb-2">
              Operating Routes
            </label>
            <input
              type="text"
              name="operatingRoutes"
              value={formData.operatingRoutes}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Raipur, Bilaspur, Nagpur"
              required
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">
              Address
            </label>
            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Complete Address"
              required
            />
          </div>

          {/* Document URL */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">
              Document URL
            </label>
            <input
              type="text"
              name="document"
              value={formData.document}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="https://..."
              required
            />
          </div>

          {/* Terms */}
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span>I agree to the Terms & Conditions</span>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition"
            >
              Register Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}