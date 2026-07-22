import { Truck, ChevronLeft, ChevronRight } from "lucide-react";

export default function Step3Transport({
  register,
  errors,
  nextStep,
  prevStep,
  vehicleOptions,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5">

        <div className="flex items-center gap-4">

          <div className="bg-white/20 p-3 rounded-xl">
            <Truck className="text-white" size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Transport Details
            </h2>

            <p className="text-orange-100 mt-1">
              Add your transport routes and available vehicles.
            </p>
          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6 md:p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* From */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Line From
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              type="text"
              placeholder="Ex. Indore"
              {...register("from", {
                required: "Line From is required",
              })}
              className={`w-full h-12 rounded-xl border px-4 outline-none ${
                errors.from
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.from && (
              <p className="text-red-500 text-sm mt-2">
                {errors.from.message}
              </p>
            )}

          </div>

          {/* To */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Line To
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              type="text"
              placeholder="Ex. Mumbai"
              {...register("to", {
                required: "Line To is required",
              })}
              className={`w-full h-12 rounded-xl border px-4 outline-none ${
                errors.to
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.to && (
              <p className="text-red-500 text-sm mt-2">
                {errors.to.message}
              </p>
            )}

          </div>

        </div>

        {/* Vehicle Types */}

        <div className="mt-8">

          <label className="block text-lg font-bold text-gray-800 mb-2">
            Vehicle Types
            <span className="text-red-500 ml-1">*</span>
          </label>

          <p className="text-sm text-gray-500 mb-5">
            Select all vehicle types available in your business.
          </p>

          {/* Part 5B starts from here */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

            {vehicleOptions.map((vehicle) => (
              <label
                key={vehicle}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all"
              >
                <input
                  type="checkbox"
                  value={vehicle}
                  {...register("vehicleTypes", {
                    validate: (value) =>
                      value?.length > 0 ||
                      "Please select at least one vehicle",
                  })}
                  className="h-5 w-5 accent-orange-500"
                />

                <span className="text-sm font-medium text-gray-700">
                  {vehicle}
                </span>
              </label>
            ))}

          </div>

          {errors.vehicleTypes && (
            <p className="text-red-500 text-sm mt-3">
              {errors.vehicleTypes.message}
            </p>
          )}

        </div>

        {/* Buttons */}

        <div className="mt-10 flex flex-col sm:flex-row justify-between gap-4">

          <button
            type="button"
            onClick={prevStep}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <button
            type="button"
            onClick={nextStep}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-lg transition-all"
          >
            Next
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}