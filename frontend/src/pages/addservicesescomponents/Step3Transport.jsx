
import {
 stateOptions,
  stateCityData,
} from "../addServices/constantss";


import { Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import {
  Truck,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
} from "lucide-react";



export default function Step3Transport({
  control,
  register,
  watch,
  setValue,
  errors,
  nextStep,
  prevStep,
  vehicleOptions,
}) {// ===========================
  // Working Areas
  // ===========================

  const { fields, append, remove } = useFieldArray({
    control,
    name: "workingAreas",
  });

  const workingAreas = watch("workingAreas") || [];

  // ===========================
  // React Select Styles
  // ===========================

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 48,
      borderRadius: 12,
      borderColor: "#d1d5db",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#f97316",
      },
    }),

    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),

    menuList: (base) => ({
      ...base,
      maxHeight: 220,
    }),
  };

  // ===========================
  // Add / Remove Working Area
  // ===========================

  const addWorkingArea = () => {
    append({
      state: "",
      cities: [],
    });
  };

  const removeWorkingArea = (index) => {
    remove(index);
  };

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
              Working Areas
            </h2>

            <p className="text-orange-100 mt-1">
              Select all states and cities where you provide transport services.
            </p>
          </div>

        </div>
      </div>

      {/* Body */}

      <div className="p-6 md:p-8">

        {fields.map((field, index) => (

          <div
            key={field.id}
            className="border rounded-2xl p-5 mb-6"
          >
                        {/* State */}

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold mb-2">
                  State
                </label>

                <Controller
                  control={control}
                  name={`workingAreas.${index}.state`}
                  rules={{
                    required: "Please select a state",
                  }}
                  render={({ field }) => (
                    <Select
                      options={stateOptions}
                      styles={customStyles}
                      placeholder="Select State"
                      value={
                        stateOptions.find(
                          (item) => item.value === field.value
                        ) || null
                      }
                      onChange={(selected) => {
                        field.onChange(selected?.value || "");

                        // Reset cities when state changes
                        setValue(
                          `workingAreas.${index}.cities`,
                          [],
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                    />
                  )}
                />

                {errors?.workingAreas?.[index]?.state && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.workingAreas[index].state.message}
                  </p>
                )}
              </div>

              {/* Cities */}

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Cities
                </label>

                <Controller
                  control={control}
                  name={`workingAreas.${index}.cities`}
                  rules={{
                    validate: (value) =>
                      value?.length > 0 ||
                      "Please select at least one city",
                  }}
                  render={({ field }) => (
                    <Select
                      isMulti
                      styles={customStyles}
                      placeholder="Select Cities"
                      options={
                        stateCityData[
                          workingAreas[index]?.state
                        ] || []
                      }
                      value={
                        (field.value || []).map((city) => ({
                          value: city,
                          label: city,
                        }))
                      }
                      onChange={(selected) => {
                        field.onChange(
                          selected
                            ? selected.map((item) => item.value)
                            : []
                        );
                      }}
                    />
                  )}
                />

                {errors?.workingAreas?.[index]?.cities && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.workingAreas[index].cities.message}
                  </p>
                )}
              </div>

            </div>

            {/* Remove Button */}

            {fields.length > 1 && (
              <div className="mt-5 flex justify-end">

                <button
                  type="button"
                  onClick={() => removeWorkingArea(index)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                >
                  <Trash2 size={18} />
                  Remove
                </button>

              </div>
            )}

          </div>
        ))}

        {/* Add Working Area */}

        <button
          type="button"
          onClick={addWorkingArea}
          className="flex items-center gap-2 bg-orange-100 text-orange-700 px-5 py-3 rounded-xl hover:bg-orange-200 transition"
        >
          <Plus size={18} />
          Add Working Area
        </button>
                {/* ===========================
            Vehicle Types
        ============================ */}

        <div className="mt-10">

          <label className="block text-lg font-bold text-gray-800 mb-2">
            Vehicle Types
            <span className="text-red-500 ml-1">*</span>
          </label>

          <p className="text-sm text-gray-500 mb-5">
            Select all vehicle types available in your business.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

            {vehicleOptions.map((vehicle) => (

              <label
                key={vehicle}
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition"
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

          {errors?.vehicleTypes && (
            <p className="text-red-500 text-sm mt-3">
              {errors.vehicleTypes.message}
            </p>
          )}

        </div>

        {/* ===========================
            Navigation Buttons
        ============================ */}

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