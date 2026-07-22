import { Building2, ChevronRight } from "lucide-react";

export default function Step1BusinessInfo({
  register,
  errors,
  nextStep,
  categories,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5">

        <div className="flex items-center gap-4">

          <div className="bg-white/20 p-3 rounded-xl">
            <Building2 className="text-white" size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">
              Business Information
            </h2>

            <p className="text-orange-100 mt-1">
              Enter your business basic information.
            </p>
          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6 md:p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Category */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Category
              <span className="text-red-500 ml-1">*</span>
            </label>

            <select
              {...register("category", {
                required: "Category is required",
              })}
              className={`w-full h-12 rounded-xl border px-4 outline-none ${
                errors.category
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            >
              <option value="">
                Select Category
              </option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}

            </select>

            {errors.category && (
              <p className="text-red-500 text-sm mt-2">
                {errors.category.message}
              </p>
            )}

          </div>

          {/* Firm Name */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Firm Name
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter Firm Name"
              {...register("firmName", {
                required: "Firm Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })}
              className={`w-full h-12 rounded-xl border px-4 outline-none ${
                errors.firmName
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.firmName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.firmName.message}
              </p>
            )}

          </div>

          {/* Owner */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Owner Name
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              placeholder="Enter Owner Name"
              {...register("ownerName", {
                required: "Owner Name is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters",
                },
              })}
              className={`w-full h-12 rounded-xl border px-4 outline-none ${
                errors.ownerName
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.ownerName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.ownerName.message}
              </p>
            )}

          </div>

          {/* Business ID */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Business ID
            </label>

            <input
              type="text"
              placeholder="Optional"
              {...register("businessId")}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-orange-500"
            />

          </div>

        </div>

        {/* Next Button */}

        <div className="mt-10 flex justify-end">

          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-lg transition"
          >
            Next
            <ChevronRight size={20} />
          </button>

        </div>

      </div>

    </div>
  );
}