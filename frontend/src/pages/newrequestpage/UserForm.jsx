import { useState } from "react";
import API from "../../api/api";

function UserForm() {
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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("booking/create", formData);

    toast.success(res.data.message);

    console.log(res.data);

    // Reset Form
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

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  }

    // API Call Here
    // await API.post("/request/create", formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg">

        {/* Header */}
        <div className="bg-orange-500 text-white rounded-t-2xl px-8 py-6">
          <h1 className="text-3xl font-bold">Create New Transport Request</h1>
          <p className="mt-2 text-orange-100">
            Fill in the details below to create a transport request.
          </p>
        </div>

        {/* Form */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

  {/* Service */}
  <div>
    <label className="font-medium">Service</label>
    <select
      name="service"
      value={formData.service}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 mt-2"
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
    <label className="font-medium">Vehicle Type</label>
    <select
      name="vehicleType"
      value={formData.vehicleType}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 mt-2"
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
    <label className="font-medium">Pickup Location</label>
    <input
      type="text"
      name="pickupLocation"
      value={formData.pickupLocation}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 mt-2"
      placeholder="Enter Pickup Location"
    />
  </div>

  {/* Loading Point */}
  <div>
    <label className="font-medium">Loading Point</label>
    <input
      type="text"
      name="loading_point"
      value={formData.loading_point}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 mt-2"
      placeholder="Enter Loading Point"
    />
  </div>

  {/* Pickup Date */}
  <div>
    <label className="font-medium">Pickup Date</label>
    <input
      type="date"
      name="pickupDate"
      value={formData.pickupDate}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 mt-2"
    />
  </div>

  {/* Goods Type */}
  <div>
    <label className="font-medium">Goods Type</label>
    <input
      type="text"
      name="goodsType"
      value={formData.goodsType}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 mt-2"
      placeholder="Electronics, Furniture..."
    />
  </div>

  {/* Weight */}
  <div>
    <label className="font-medium">Weight (KG)</label>
    <input
      type="number"
      name="weight"
      value={formData.weight}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 mt-2"
      placeholder="500"
    />
  </div>

  {/* Contact Person */}
  <div>
    <label className="font-medium">Contact Person</label>
    <input
      type="text"
      name="contactPerson"
      value={formData.contactPerson}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 mt-2"
      placeholder="Rahul Sharma"
    />
  </div>

  {/* Contact Number */}
  <div>
    <label className="font-medium">Contact Number</label>
    <input
      type="tel"
      name="contactNumber"
      value={formData.contactNumber}
      onChange={handleChange}
      maxLength={10}
      className="w-full border rounded-lg p-3 mt-2"
      placeholder="9876543210"
    />
  </div>

  {/* Expected Budget */}
  <div>
    <label className="font-medium">Expected Budget</label>
    <input
      type="number"
      name="expectedBudget"
      value={formData.expectedBudget}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 mt-2"
      placeholder="15000"
    />
  </div>

  {/* Remarks */}
  <div className="md:col-span-2">
    <label className="font-medium">Remarks</label>
    <textarea
      rows="5"
      name="remarks"
      value={formData.remarks}
      onChange={handleChange}
      className="w-full border rounded-lg p-3 mt-2"
      placeholder="Handle goods carefully..."
    />
  </div>

  <div className="md:col-span-2 flex justify-end">
   <button
  type="submit"
  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition"
>
  Submit Request
</button>
  </div>

</form>
      </div>
    </div>
  );
}

export default UserForm;