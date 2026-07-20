import { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../../api/api"; // apne project ke hisaab se path change karo

export function AddVehicle() {
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Text Fields
      formData.append("vehicleNumber", data.vehicleNumber);
      formData.append("vehicleType", data.vehicleType);
      formData.append("capacity", data.capacity);
      formData.append("driverName", data.driverName);
      formData.append("driverMobile", data.driverMobile);
      formData.append("source", data.source);
      formData.append("destination", data.destination);

      // Files
      if (data.rcBook?.[0]) {
        formData.append("rcBook", data.rcBook[0]);
      }

      if (data.insurance?.[0]) {
        formData.append("insurance", data.insurance[0]);
      }

      if (data.fitness?.[0]) {
        formData.append("fitness", data.fitness[0]);
      }

      if (data.permit?.[0]) {
        formData.append("permit", data.permit[0]);
      }

      if (data.pollution?.[0]) {
        formData.append("pollution", data.pollution[0]);
      }

      if (data.vehiclePhoto?.[0]) {
        formData.append("vehiclePhoto", data.vehiclePhoto[0]);
      }

      const res = await API.post("/vehicle/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message || "Vehicle Added Successfully");

      reset();
      setStep(1);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 p-8">
          <h1 className="text-4xl font-bold text-white">Add Vehicle</h1>

          <p className="text-blue-100 mt-2">
            Fill vehicle details step by step.
          </p>
        </div>

        {/* Progress */}
        <div className="px-8 pt-8">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Step {step} of 3</span>

            <span>{step === 1 ? "33%" : step === 2 ? "66%" : "100%"}</span>
          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full">
            <div
              className={`h-3 rounded-full bg-blue-600 transition-all duration-500 ${
                step === 1 ? "w-1/3" : step === 2 ? "w-2/3" : "w-full"
              }`}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8">
          {/* STEP 1 */}

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Vehicle Details</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Vehicle Number */}

                <div>
                  <label className="font-medium">Vehicle Number</label>

                  <input
                    className="w-full mt-2 border rounded-lg p-3"
                    placeholder="MP04AB1234"
                    {...register("vehicleNumber", {
                      required: "Vehicle Number is required",
                    })}
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors.vehicleNumber?.message}
                  </p>
                </div>

                {/* Vehicle Type */}

                <div>
                  <label className="font-medium">Vehicle Type</label>

                  <select
                    className="w-full mt-2 border rounded-lg p-3"
                    {...register("vehicleType", {
                      required: "Vehicle Type is required",
                    })}
                  >
                    <option value="">Select Type</option>
                    <option>Truck</option>
                    <option>Container</option>
                    <option>Tanker</option>
                    <option>Trailer</option>
                    <option>Pickup</option>
                  </select>

                  <p className="text-red-500 text-sm mt-1">
                    {errors.vehicleType?.message}
                  </p>
                </div>

                {/* Capacity */}

                <div>
                  <label className="font-medium">Capacity (Ton)</label>

                  <input
                    type="number"
                    className="w-full mt-2 border rounded-lg p-3"
                    {...register("capacity", {
                      required: "Capacity is required",
                    })}
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors.capacity?.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-10">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 and Step 3 will come in Part 2 */}
          {/* STEP 2 */}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Driver & Route Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Driver Name */}

                <div>
                  <label className="font-medium">Driver Name</label>

                  <input
                    className="w-full mt-2 border rounded-lg p-3"
                    placeholder="Enter Driver Name"
                    {...register("driverName", {
                      required: "Driver Name is required",
                    })}
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors.driverName?.message}
                  </p>
                </div>

                {/* Driver Mobile */}

                <div>
                  <label className="font-medium">Driver Mobile</label>

                  <input
                    className="w-full mt-2 border rounded-lg p-3"
                    placeholder="9876543210"
                    {...register("driverMobile", {
                      required: "Driver Mobile is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/,
                        message: "Enter Valid Mobile Number",
                      },
                    })}
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors.driverMobile?.message}
                  </p>
                </div>

                {/* Source */}

                <div>
                  <label className="font-medium">Source City</label>

                  <input
                    className="w-full mt-2 border rounded-lg p-3"
                    placeholder="Bhopal"
                    {...register("source", {
                      required: "Source is required",
                    })}
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors.source?.message}
                  </p>
                </div>

                {/* Destination */}

                <div>
                  <label className="font-medium">Destination City</label>

                  <input
                    className="w-full mt-2 border rounded-lg p-3"
                    placeholder="Indore"
                    {...register("destination", {
                      required: "Destination is required",
                    })}
                  />

                  <p className="text-red-500 text-sm mt-1">
                    {errors.destination?.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-300 hover:bg-gray-400 px-8 py-3 rounded-xl"
                >
                  ← Previous
                </button>

                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
          {/* STEP 3 */}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Vehicle Documents</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium">RC Book</label>

                  <input
                    type="file"
                    className="w-full mt-2 border rounded-lg p-3"
                    {...register("rcBook", {
                      required: "RC Book Required",
                    })}
                  />

                  <p className="text-red-500 text-sm">
                    {errors.rcBook?.message}
                  </p>
                </div>

                <div>
                  <label className="font-medium">Insurance</label>

                  <input
                    type="file"
                    className="w-full mt-2 border rounded-lg p-3"
                    {...register("insurance", {
                      required: "Insurance Required",
                    })}
                  />

                  <p className="text-red-500 text-sm">
                    {errors.insurance?.message}
                  </p>
                </div>

                <div>
                  <label className="font-medium">Fitness</label>

                  <input
                    type="file"
                    className="w-full mt-2 border rounded-lg p-3"
                    {...register("fitness")}
                  />
                </div>

                <div>
                  <label className="font-medium">Permit</label>

                  <input
                    type="file"
                    className="w-full mt-2 border rounded-lg p-3"
                    {...register("permit")}
                  />
                </div>

                <div>
                  <label className="font-medium">PUC Certificate</label>

                  <input
                    type="file"
                    className="w-full mt-2 border rounded-lg p-3"
                    {...register("pollution")}
                  />
                </div>

                <div>
                  <label className="font-medium">Vehicle Photo</label>

                  <input
                    type="file"
                    className="w-full mt-2 border rounded-lg p-3"
                    {...register("vehiclePhoto")}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-10">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 rounded-xl"
                >
                  ← Previous
                </button>

                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
                >
                  Add Vehicle
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
export default AddVehicle;
