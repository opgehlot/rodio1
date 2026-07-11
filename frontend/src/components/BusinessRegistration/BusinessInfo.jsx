import React from "react";
import { Building2, User, Hash } from "lucide-react";

const categories = [
  "Transporter",
  "Broker",
  "Fleet Owner",
  "Truck Owner",
  "Logistics Company",
  "Warehouse",
  "Courier",
  "Packing & Moving",
  "Commission Agent",
  "RTO Agent",
  "Finance Agent",
  "Others",
];

function BusinessInfo({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

      <div className="flex items-center gap-3 mb-8">
        <Building2 className="text-orange-500" size={28} />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Business Information
          </h2>
          <p className="text-gray-500 text-sm">
            Enter your business details
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Category */}

        <div>
          <label className="block mb-2 font-medium">
            Category *
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full h-12 border rounded-xl px-4 focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select Category</option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}

          </select>
        </div>

        {/* Firm Name */}

        <div>
          <label className="block mb-2 font-medium">
            Firm Name *
          </label>

          <div className="relative">

            <Building2
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type="text"
              name="firmName"
              value={formData.firmName}
              onChange={handleChange}
              placeholder="ABC Logistics"
              className="w-full h-12 border rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Owner */}

        <div>

          <label className="block mb-2 font-medium">
            Owner Name *
          </label>

          <div className="relative">

            <User
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Rahul Sharma"
              className="w-full h-12 border rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Business ID */}

        <div>

          <label className="block mb-2 font-medium">
            Business ID
          </label>

          <div className="relative">

            <Hash
              className="absolute left-4 top-3.5 text-gray-400"
              size={18}
            />

            <input
              type="text"
              name="businessId"
              value={formData.businessId}
              onChange={handleChange}
              placeholder="Business ID"
              className="w-full h-12 border rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Referral Code */}

        <div>

          <label className="block mb-2 font-medium">
            Referral Code
          </label>

          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            placeholder="Referral Code"
            className="w-full h-12 border rounded-xl px-4 focus:ring-2 focus:ring-orange-500"
          />

        </div>

        {/* Referred By */}

        <div>

          <label className="block mb-2 font-medium">
            Referred By
          </label>

          <input
            type="text"
            name="referredBy"
            value={formData.referredBy}
            onChange={handleChange}
            placeholder="Referral Person"
            className="w-full h-12 border rounded-xl px-4 focus:ring-2 focus:ring-orange-500"
          />

        </div>

      </div>

    </div>
  );
}

export default BusinessInfo;