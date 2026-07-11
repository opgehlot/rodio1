import React from "react";
import { CheckCircle } from "lucide-react";

function TermsSubmit({
  formData,
  handleChange,
  loading,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

      <div className="flex items-start gap-3">

        <input
          type="checkbox"
          name="acceptedTerms"
          checked={formData.acceptedTerms}
          onChange={handleChange}
          className="mt-1 h-5 w-5 accent-orange-500"
        />

        <label className="text-gray-700 leading-7">

          I hereby declare that the information provided is true and correct.
          I agree to the
          <span className="text-orange-500 font-semibold cursor-pointer">
            {" "}Terms & Conditions
          </span>
          {" "}of Rodio.

        </label>

      </div>

      <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="flex items-center gap-2 text-green-600">

          <CheckCircle size={22} />

          <span className="font-medium">
            Your business information will be verified before approval.
          </span>

        </div>

        <div className="flex gap-4">

          <button
            type="reset"
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-3 rounded-xl text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? "Submitting..." : "Register Business"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default TermsSubmit;