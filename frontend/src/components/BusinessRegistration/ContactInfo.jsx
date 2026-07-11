import React from "react";
import { Phone, Mail, Globe, Share2 } from "lucide-react";

function ContactInfo({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <Phone className="text-orange-500" size={28} />

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Contact Information
          </h2>

          <p className="text-gray-500 text-sm">
            Enter your business contact details.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Phone Number */}

        <div>

          <label className="block mb-2 font-medium">
            Phone Number *
          </label>

          <div className="relative">

            <Phone
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              maxLength={10}
              placeholder="9876543210"
              className="w-full h-12 border rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Alternate Phone */}

        <div>

          <label className="block mb-2 font-medium">
            Alternate Phone
          </label>

          <div className="relative">

            <Phone
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="tel"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleChange}
              maxLength={10}
              placeholder="Optional"
              className="w-full h-12 border rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Email */}

        <div>

          <label className="block mb-2 font-medium">
            Email Address *
          </label>

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full h-12 border rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Website */}

        <div>

          <label className="block mb-2 font-medium">
            Website
          </label>

          <div className="relative">

            <Globe
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://yourwebsite.com"
              className="w-full h-12 border rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Social Media */}

        <div className="md:col-span-2">

          <label className="block mb-2 font-medium">
            Social Media
          </label>

          <div className="relative">

            <Share2
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={handleChange}
              placeholder="Facebook / Instagram / LinkedIn"
              className="w-full h-12 border rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

      </div>

    </div>
  );
}

export default ContactInfo;