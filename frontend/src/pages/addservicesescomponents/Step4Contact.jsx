import {
  Phone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Step4Contact({
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
            <Phone className="text-white" size={28} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Contact Information
            </h2>

            <p className="text-orange-100 mt-1">
              Enter your contact details.
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6 md:p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Phone */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Phone Number
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              type="tel"
              placeholder="9876543210"
              {...register("phoneNumber", {
                required: "Phone Number is required",
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter valid 10 digit mobile number",
                },
              })}
              className={`w-full h-12 rounded-xl border px-4 outline-none ${
                errors.phoneNumber
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phoneNumber.message}
              </p>
            )}

          </div>

          {/* Alternate Phone */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Alternate Phone
            </label>

            <input
              type="tel"
              placeholder="Optional"
              {...register("alternatePhone", {
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter valid mobile number",
                },
              })}
              className={`w-full h-12 rounded-xl border px-4 outline-none ${
                errors.alternatePhone
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.alternatePhone && (
              <p className="text-red-500 text-sm mt-2">
                {errors.alternatePhone.message}
              </p>
            )}

          </div>

          {/* Email */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Email Address
              <span className="text-red-500 ml-1">*</span>
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter valid email address",
                },
              })}
              className={`w-full h-12 rounded-xl border px-4 outline-none ${
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:border-orange-500"
              }`}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* Website */}

          <div>

            <label className="block text-sm font-semibold mb-2">
              Website
            </label>

            <input
              type="url"
              placeholder="https://example.com"
              {...register("website")}
              className="w-full h-12 rounded-xl border border-gray-300 px-4 outline-none focus:border-orange-500"
            />

          </div>

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
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-lg transition"
          >
            Next
            <ChevronRight size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}