import { Upload, FileText, ChevronLeft, ChevronRight } from "lucide-react";

export default function Step5Documents({
  register,
  errors,
  nextStep,
  prevStep,
}) {
  const documents = [
    {
      label: "Aadhaar Card",
      name: "aadhaar",
      required: true,
    },
    {
      label: "PAN Card",
      name: "panCard",
      required: true,
    },
    {
      label: "Gumasta License",
      name: "gumasta",
      required: false
    },
    {
      label: "GST Certificate",
      name: "gstCertificate",
      required: false
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
      {/* Header */}

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Upload className="text-white" size={28} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">Upload Documents</h2>

            <p className="text-orange-100 mt-1">
              Upload all required business documents.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.name}
              className="border-2 border-dashed border-orange-200 rounded-2xl p-6 hover:border-orange-500 transition"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 p-4 rounded-full mb-4">
                  <FileText className="text-orange-600" size={30} />
                </div>

                <label className="font-semibold text-gray-700 mb-3">
                  {doc.label}

                  {doc.required && <span className="text-red-500 ml-1">*</span>}
                </label>

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  {...register(doc.name, {
                    required: doc.required ? `${doc.label} is required` : false,
                  })}
                  className="w-full text-sm file:bg-orange-500 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer cursor-pointer"
                />

                <p className="text-xs text-gray-500 mt-2">JPG, PNG or PDF</p>

                {errors[doc.name] && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors[doc.name].message}
                  </p>
                )}
              </div>
            </div>
          ))}
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
