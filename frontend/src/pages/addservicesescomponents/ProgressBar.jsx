export default function ProgressBar({ step, totalSteps }) {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex justify-between items-center mb-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Add Business
          </h1>

          <p className="text-gray-500 mt-1">
            Complete all steps to register your business.
          </p>
        </div>

        <div className="text-right">
          <span className="text-orange-600 font-bold text-lg">
            Step {step} / {totalSteps}
          </span>
        </div>

      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
        />

      </div>

    </div>
  );
}