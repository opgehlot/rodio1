import React, { useState } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";
import {
  Truck,
  MapPin,
  Calendar,
  Package,
  User,
  Phone,
  IndianRupee,
  MessageSquare,
} from "lucide-react";

export function UserForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    service: "",
    vehicleType: "",
    pickupLocation: "",
    loading_point: "",
    pickupDate: "",
    goodsType: "",
    weight: "",
    contactPerson: "",
    contactNumber: "",
    expectedBudget: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactNumber") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/booking/create", formData);

      toast.success(res.data.message);

      setFormData({
        service: "",
        vehicleType: "",
        pickupLocation: "",
        loading_point: "",
        pickupDate: "",
        goodsType: "",
        weight: "",
        contactPerson: "",
        contactNumber: "",
        expectedBudget: "",
        remarks: "",
      });

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-xl">

          <h1 className="text-4xl font-bold">
            🚚 Create Transport Request
          </h1>

          <p className="mt-2 text-orange-100">
            Fill shipment details and submit your booking.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-8 mt-8"
        >

          <div className="lg:col-span-2 space-y-8">

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-2xl font-bold mb-6">
                📦 Shipment Details
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                {/* Service */}

                <div>

                  <label className="font-semibold">
                    Service
                  </label>

                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full border rounded-xl h-12 px-4 mt-2"
                  >
                    <option value="">Select Service</option>
                    <option>Transport Service</option>
                    <option>Packers & Movers</option>
                    <option>Bike Transport</option>
                    <option>Car Transport</option>
                  </select>

                </div>

                {/* Vehicle */}

                <div>

                  <label className="font-semibold">
                    Vehicle Type
                  </label>

                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className="w-full border rounded-xl h-12 px-4 mt-2"
                  >
                    <option value="">Select Vehicle</option>
                    <option>Truck</option>
                    <option>Mini Truck</option>
                    <option>Pickup</option>
                    <option>Tata Ace</option>
                    <option>Trailer</option>
                  </select>

                </div>

                {/* Pickup */}

                <div>

                  <label className="font-semibold">
                    Loding point
                  </label>

                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="w-full border rounded-xl h-12 px-4 mt-2"
                  />

                </div>

                {/* Destination */}

                <div>

                  <label className="font-semibold">
                    Destination
                  </label>

                  <input
                    type="text"
                    name="loading_point"
                    value={formData.loading_point}
                    onChange={handleChange}
                    className="w-full border rounded-xl h-12 px-4 mt-2"
                  />

                </div>

                {/* Date */}

                <div>

                  <label className="font-semibold">
                    Pickup Date
                  </label>

                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className="w-full border rounded-xl h-12 px-4 mt-2"
                  />

                </div>

                {/* Goods */}

                <div>

                  <label className="font-semibold">
                    Goods Type
                  </label>

                  <input
                    type="text"
                    name="goodsType"
                    value={formData.goodsType}
                    onChange={handleChange}
                    className="w-full border rounded-xl h-12 px-4 mt-2"
                  />

                </div>

                {/* Weight */}

                <div>

                  <label className="font-semibold">
                    Weight in(Ton)
                  </label>

                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full border rounded-xl h-12 px-4 mt-2"
                  />

                </div>
                                {/* Contact Person */}
                <div>
                  <label className="font-semibold">
                    Contact Person
                  </label>

                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="Enter Contact Person"
                    className="w-full border rounded-xl h-12 px-4 mt-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="font-semibold">
                    Contact Number
                  </label>

                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="w-full border rounded-xl h-12 px-4 mt-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                {/* Budget */}
                <div className="md:col-span-2">
                  <label className="font-semibold">
                    Expected Budget
                  </label>

                  <input
                    type="number"
                    name="expectedBudget"
                    value={formData.expectedBudget}
                    onChange={handleChange}
                    placeholder="₹ Enter Budget"
                    className="w-full border rounded-xl h-12 px-4 mt-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

              </div>

            </div>

            {/* Remarks */}

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-2xl font-bold mb-5">
                📝 Additional Information
              </h2>

              <textarea
                rows="5"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Write additional instructions..."
                className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none"
              />

            </div>

          </div>

          {/* Right Side Summary */}

          <div>

            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

              <h2 className="text-2xl font-bold mb-6">
                📋 Booking Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Service</span>
                  <span className="font-semibold">
                    {formData.service || "-"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Vehicle</span>
                  <span className="font-semibold">
                    {formData.vehicleType || "-"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Loding Point</span>
                  <span className="font-semibold">
                    {formData.pickupLocation || "-"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span></span>
                  <span className="font-semibold">
                    {formData.loading_point || "-"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Date</span>
                  <span className="font-semibold">
                    {formData.pickupDate || "-"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Goods</span>
                  <span className="font-semibold">
                    {formData.goodsType || "-"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Weight</span>
                  <span className="font-semibold">
                    {formData.weight || 0} KG
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Budget</span>
                  <span className="font-semibold text-green-600">
                    ₹ {formData.expectedBudget || 0}
                  </span>
                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-orange-500 hover:bg-orange-600 transition text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
              >
                {loading ? "Submitting..." : "🚚 Submit Request"}
              </button>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}
export default UserForm;