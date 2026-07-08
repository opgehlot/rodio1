import { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    service: "",
    pickup: "",
    destination: "",
    pickupDate: "",
    pickupTime: "",
    goodsType: "",
    weight: "",
    vehicleType: "",
    contactPerson: "",
    contactNumber: "",
    budget: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

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
        <form onSubmit={handleSubmit} className="p-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Service */}
            <div>
              <label className="font-medium">Service</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full border rounded-lg mt-2 p-3"
              >
                <option value="">Select Service</option>
                <option>Full Truck Load</option>
                <option>Part Load</option>
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
                className="w-full border rounded-lg mt-2 p-3"
              >
                <option value="">Select Vehicle</option>
                <option>Tata Ace</option>
                <option>Pickup</option>
                <option>Mini Truck</option>
                <option>14 Feet Truck</option>
                <option>20 Feet Truck</option>
                <option>Trailer</option>
              </select>
            </div>

            {/* Pickup */}
            <div>
              <label className="font-medium">Pickup Location</label>
              <input
                type="text"
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                placeholder="Enter Pickup Location"
                className="w-full border rounded-lg mt-2 p-3"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="font-medium">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Enter Destination"
                className="w-full border rounded-lg mt-2 p-3"
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
                className="w-full border rounded-lg mt-2 p-3"
              />
            </div>

            {/* Pickup Time */}
            <div>
              <label className="font-medium">Pickup Time</label>
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                className="w-full border rounded-lg mt-2 p-3"
              />
            </div>

            {/* Goods */}
            <div>
              <label className="font-medium">Goods Type</label>
              <input
                type="text"
                name="goodsType"
                value={formData.goodsType}
                onChange={handleChange}
                placeholder="Furniture, Steel, Cement..."
                className="w-full border rounded-lg mt-2 p-3"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="font-medium">Weight (Kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Weight"
                className="w-full border rounded-lg mt-2 p-3"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="font-medium">Contact Person</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                placeholder="Contact Name"
                className="w-full border rounded-lg mt-2 p-3"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="font-medium">Contact Number</label>
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full border rounded-lg mt-2 p-3"
              />
            </div>

            {/* Budget */}
            <div className="md:col-span-2">
              <label className="font-medium">Expected Budget</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter Budget"
                className="w-full border rounded-lg mt-2 p-3"
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
                placeholder="Additional instructions..."
                className="w-full border rounded-lg mt-2 p-3"
              />
            </div>

          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="reset"
              className="px-6 py-3 border rounded-lg hover:bg-gray-100"
            >
              Reset
            </button>

            <button
              type="submit"
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold"
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