import React from "react";
import { MapPin, Landmark, MapPinned } from "lucide-react";

function AddressInfo({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="text-orange-500" size={28} />

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Business Address
          </h2>

          <p className="text-gray-500 text-sm">
            Enter your business location details
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Address */}

        <div className="md:col-span-2">

          <label className="block mb-2 font-medium">
            Business Address *
          </label>

          <textarea
            rows={4}
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter Complete Business Address"
            className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-orange-500"
          />

        </div>

        {/* State */}

        <div>

          <label className="block mb-2 font-medium">
            Current State *
          </label>

          <div className="relative">

            <Landmark
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type="text"
              name="currentState"
              value={formData.currentState}
              onChange={handleChange}
              placeholder="Enter State"
              className="w-full h-12 border rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* City */}

        <div>

          <label className="block mb-2 font-medium">
            Current City *
          </label>

          <div className="relative">

            <MapPinned
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type="text"
              name="currentCity"
              value={formData.currentCity}
              onChange={handleChange}
              placeholder="Enter City"
              className="w-full h-12 border rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Pincode */}

        <div>

          <label className="block mb-2 font-medium">
            Pincode *
          </label>

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            maxLength={6}
            placeholder="452001"
            className="w-full h-12 border rounded-xl px-4 focus:ring-2 focus:ring-orange-500"
          />

        </div>

      </div>

    </div>
  );
}

export default AddressInfo;