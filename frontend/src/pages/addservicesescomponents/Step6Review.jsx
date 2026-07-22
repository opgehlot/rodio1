import {
  CheckCircle,
  ChevronLeft,
  Loader2,
} from "lucide-react";

export default function Step6Review({
  register,
  errors,
  watch,
  loading,
  prevStep,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">

      {/* Header */}

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5">

        <div className="flex items-center gap-4">

          <div className="bg-white/20 p-3 rounded-xl">
            <CheckCircle className="text-white" size={28} />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">
              Review & Submit
            </h2>

            <p className="text-orange-100 mt-1">
              Verify your information before submitting.
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="p-6 md:p-8 space-y-8">

        {/* Summary */}

        <div className="bg-orange-50 rounded-2xl border border-orange-200 p-6">

          <h3 className="text-lg font-bold text-gray-800 mb-5">
            Registration Summary
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <span className="font-semibold">Category :</span>{" "}
              {watch("category")}
            </div>

            <div>
              <span className="font-semibold">Firm :</span>{" "}
              {watch("firmName")}
            </div>

            <div>
              <span className="font-semibold">Owner :</span>{" "}
              {watch("ownerName")}
            </div>

            <div>
              <span className="font-semibold">Phone :</span>{" "}
              {watch("phoneNumber")}
            </div>

            <div>
              <span className="font-semibold">Email :</span>{" "}
              {watch("email")}
            </div>

            <div>
              <span className="font-semibold">State :</span>{" "}
              {watch("currentState")}
            </div>

            <div>
              <span className="font-semibold">City :</span>{" "}
              {watch("currentCity")}
            </div>

            <div>
              <span className="font-semibold">Route :</span>{" "}
              {watch("from")} → {watch("to")}
            </div>

            <div className="md:col-span-2">
              <span className="font-semibold">Vehicles :</span>{" "}
              {Array.isArray(watch("vehicleTypes"))
                ? watch("vehicleTypes").join(", ")
                : ""}
            </div>

          </div>

        </div>

        {/* Terms */}

        <div>

          <label className="flex items-start gap-3 cursor-pointer">

            <input
              type="checkbox"
              {...register("acceptedTerms", {
                required: "Please accept Terms & Conditions",
              })}
              className="mt-1 h-5 w-5 accent-orange-500"
            />

            <span className="text-gray-700">
              I agree to the{" "}
              <strong className="text-orange-600">
                Terms & Conditions
              </strong>{" "}
              and confirm that the information provided is correct.
            </span>

          </label>

          {errors.acceptedTerms && (
            <p className="text-red-500 text-sm mt-2">
              {errors.acceptedTerms.message}
            </p>
          )}

        </div>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row justify-between gap-4">

          <button
            type="button"
            onClick={prevStep}
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
          >
            <ChevronLeft size={18} />
            Previous
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 px-10 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-lg disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  className="animate-spin"
                  size={20}
                />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle size={20} />
                Submit Registration
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}