import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export default function Step2Address({
  register,
  errors,
  nextStep,
  prevStep,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5">

        <div className="flex items-center gap-4">

          <div className="bg-white/20 p-3 rounded-xl">
            <MapPin className="text-white" size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Business Address
            </h2>

            <p className="text-orange-100 mt-1">
              Enter your business location details.
            </p>
          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6 md:p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Address */}

          <div className="md:col-span-2">

            <label className="block text-sm font-semibold mb-2">
              Full Address
              <span className="text-red-500 ml-1">*</span>
            </label>

            <textarea
              rows={4}
              placeholder="Enter complete address"
              {...register("address", {
                required: "Address is required",
              })}
              className={`w-full rounded-xl border p-4 outline-none resize-none ${
                errors.address
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.address && (
              <p className="text-red-500 text-sm mt-2">
                {errors.address.message}
              </p>
            )}

          </div>

          {/* State */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              State
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter State"
              {...register("currentState", {
                required: "State is required",
              })}
              className={`w-full h-12 rounded-xl border px-4 outline-none ${
                errors.currentState
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.currentState && (
              <p className="text-red-500 text-sm mt-2">
                {errors.currentState.message}
              </p>
            )}

          </div>

          {/* City */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              City
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter City"
              {...register("currentCity", {
                required: "City is required",
              })}
              className={`w-full h-12 rounded-xl border px-4 outline-none ${
                errors.currentCity
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.currentCity && (
              <p className="text-red-500 text-sm mt-2">
                {errors.currentCity.message}
              </p>
            )}

          </div>

          {/* Pincode */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Pincode
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              type="text"
              maxLength={6}
              placeholder="Enter Pincode"
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Enter valid 6 digit pincode",
                },
              })}
              className={`w-full h-12 rounded-xl border px-4 outline-none ${
                errors.pincode
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.pincode && (
              <p className="text-red-500 text-sm mt-2">
                {errors.pincode.message}
              </p>
            )}

          </div>

        </div>

        {/* Buttons */}

        <div className="mt-10 flex justify-between">

          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-lg transition"
          >
            Next
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}