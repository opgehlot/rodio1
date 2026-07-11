import React from "react";
import { UploadCloud, Image, FileText } from "lucide-react";

function DocumentUpload({ handleChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <UploadCloud className="text-orange-500" size={28} />

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Upload Documents
          </h2>

          <p className="text-gray-500 text-sm">
            Upload your business documents for verification.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Business Photo */}

        <label className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-orange-500 cursor-pointer transition">

          <div className="flex flex-col items-center">

            <Image className="text-orange-500 mb-3" size={40} />

            <h3 className="font-semibold">
              Business Photo
            </h3>

            <p className="text-sm text-gray-500 text-center mt-2">
              JPG, PNG
            </p>

            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="hidden"
            />

          </div>

        </label>

        {/* Aadhaar */}

        <label className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-orange-500 cursor-pointer transition">

          <div className="flex flex-col items-center">

            <FileText className="text-orange-500 mb-3" size={40} />

            <h3 className="font-semibold">
              Aadhaar Card
            </h3>

            <p className="text-sm text-gray-500 text-center mt-2">
              PDF / JPG
            </p>

            <input
              type="file"
              name="aadhaar"
              onChange={handleChange}
              className="hidden"
            />

          </div>

        </label>

        {/* PAN */}

        <label className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-orange-500 cursor-pointer transition">

          <div className="flex flex-col items-center">

            <FileText className="text-orange-500 mb-3" size={40} />

            <h3 className="font-semibold">
              PAN Card
            </h3>

            <p className="text-sm text-gray-500 text-center mt-2">
              PDF / JPG
            </p>

            <input
              type="file"
              name="panCard"
              onChange={handleChange}
              className="hidden"
            />

          </div>

        </label>

        {/* GST */}

        <label className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-orange-500 cursor-pointer transition">

          <div className="flex flex-col items-center">

            <FileText className="text-orange-500 mb-3" size={40} />

            <h3 className="font-semibold">
              GST Certificate
            </h3>

            <p className="text-sm text-gray-500 text-center mt-2">
              PDF / JPG
            </p>

            <input
              type="file"
              name="gstCertificate"
              onChange={handleChange}
              className="hidden"
            />

          </div>

        </label>

        {/* Gumasta */}

        <label className="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-orange-500 cursor-pointer transition">

          <div className="flex flex-col items-center">

            <FileText className="text-orange-500 mb-3" size={40} />

            <h3 className="font-semibold">
              Gumasta License
            </h3>

            <p className="text-sm text-gray-500 text-center mt-2">
              PDF / JPG
            </p>

            <input
              type="file"
              name="gumasta"
              onChange={handleChange}
              className="hidden"
            />

          </div>

        </label>

      </div>

    </div>
  );
}

export default DocumentUpload;