import React, { useState } from "react";
import { useForm } from "react-hook-form";
import API from "../../api/api";
import toast from "react-hot-toast";

export default function UserForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      category: "",
      vehicleType: "",
      service: "",
      goodsType: "",
      weight: "",
      pickupLocation: "",
      loading_point: "",
      pickupDate: "",
      contactPerson: "",
      contactNumber: "",
      expectedBudget: "",
      remarks: "",
    },
  });

  const categories = [
    "Transporter",
    "Broker",
    "Fleet Owner",
    "Truck Owner",
    "Logistics Company",
    "Warehouse",
    "Courier",
    "Packing & Moving",
    "Commission Agent",
    "RTO Agent",
    "Finance Agent",
    "Others",
  ];

  const vehicleTypes = [
    "Mini Truck",
    "Pickup",
    "Tata Ace",
    "Bolero Pickup",
    "Mahindra Jeeto",
    "Ashok Leyland Dost",
    "Tempo",
    "Canter",
    "Eicher",
    "Truck",
    "LCV",
    "HCV",
    "14 Feet Truck",
    "17 Feet Truck",
    "19 Feet Truck",
    "22 Feet Truck",
    "32 Feet Truck",
    "Open Body Truck",
    "Closed Body Truck",
    "Container",
    "Trailer",
    "Tipper",
    "Tanker",
    "Refrigerated Truck",
    "Tractor Trolley",
  ];

  const formData = watch();

  const nextStep = async () => {
    let fields = [];

    if (step === 1) {
      fields = [
        "category",
        "service",
        "vehicleType",
        "goodsType",
        "weight",
        "pickupLocation",
        "loading_point",
        "pickupDate",
      ];
    }

    if (step === 2) {
      fields = [
        "contactPerson",
        "contactNumber",
        "expectedBudget",
      ];
    }

    if (step === 3) {
      fields = ["remarks"];
    }

    const valid = await trigger(fields);

    if (valid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await API.post("/booking/create", data);

      toast.success(res.data.message);

      reset();
      setStep(1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // 👇 Ab yahan se tumhara return(...) start hoga

  return (
    <div className="min-h-screen bg-white py-10">

      <div className="max-w-6xl mx-auto px-5">

        <h1 className="text-3xl font-bold">
          Create Transport Request
        </h1>

        <p className="text-gray-500 mt-2">
          Fill all shipment details
        </p>

        {/* Progress */}

        <div className="flex gap-3 mt-8">

          <div
            className={`flex-1 h-2 ${
              step >= 1 ? "bg-orange-500" : "bg-gray-300"
            }`}
          />

          <div
            className={`flex-1 h-2 ${
              step >= 2 ? "bg-orange-500" : "bg-gray-300"
            }`}
          />

          <div
            className={`flex-1 h-2 ${
              step >= 3 ? "bg-orange-500" : "bg-gray-300"
            }`}
          />

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-3 gap-8 mt-8"
        >

          {/* Left */}

          <div className="lg:col-span-2 border border-gray-300 p-8">

            {/* STEP 1 */}

            {step === 1 && (
              <>

                <h2 className="text-2xl font-bold mb-8">
                  Shipment Details
                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                  {/* Service */}

                  <div>

                    <label className="font-medium">
                      Service
                    </label>

                     <select
    {...register("category", {
      required: "Category is required",
    })}
    className="w-full h-12 border border-gray-300 rounded-none px-4 mt-2"
  >
    <option value="">Select Category</option>

    {categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>

                  {/* Vehicle */}

                  <div>

                    <label className="font-medium">
                      Vehicle Type
                    </label>

               <select
  className="w-full border border-gray-300 p-3 rounded-none"
  {...register("vehicleType", {
    required: "Vehicle Type is required",
  })}
>
  <option value="">Select Vehicle Type</option>

  {vehicleTypes.map((vehicle) => (
    <option key={vehicle} value={vehicle}>
      {vehicle}
    </option>
  ))}
</select>
  
</div>

                    <p className="text-red-500 text-sm mt-1">
                      {errors.vehicleType?.message}
                    </p>

                  </div>

                  {/* Goods */}

                  <div>

                    <label className="font-medium">
                      Goods Type
                    </label>

                    <input
                      {...register("goodsType", {
                        required: "Goods Type Required",
                      })}
                      className="w-full h-12 border border-gray-300 rounded-none px-4 mt-2"
                    />

                    <p className="text-red-500 text-sm mt-1">
                      {errors.goodsType?.message}
                    </p>

                  </div>

                  {/* Weight */}

                  <div>

                    <label className="font-medium">
                      Weight (Tone/kg)
                    </label>

                    <input
                      type="number"
                      {...register("weight", {
                        required: "Weight Required",
                      })}
                      className="w-full h-12 border border-gray-300 rounded-none px-4 mt-2"
                    />

                    <p className="text-red-500 text-sm mt-1">
                      {errors.weight?.message}
                    </p>

                  </div>

                  {/* Pickup */}

                  <div>

                    <label className="font-medium">
                      Loading Point
                    </label>

                    <input
                      {...register("pickupLocation", {
                        required: "Loading Point Required",
                      })}
                      className="w-full h-12 border border-gray-300 rounded-none px-4 mt-2"
                    />

                    <p className="text-red-500 text-sm mt-1">
                      {errors.pickupLocation?.message}
                    </p>

                  </div>

                  {/* Destination */}

                  <div>

                    <label className="font-medium">
                      Destination
                    </label>

                    <input
                      {...register("loading_point", {
                        required: "Destination Required",
                      })}
                      className="w-full h-12 border border-gray-300 rounded-none px-4 mt-2"
                    />

                    <p className="text-red-500 text-sm mt-1">
                      {errors.loading_point?.message}
                    </p>

                  </div>

                  {/* Pickup Date */}

                  <div>

                    <label className="font-medium">
                      Loading Date
                    </label>

                    <input
                      type="date"
                      {...register("pickupDate", {
                        required: "Pickup Date Required",
                      })}
                      className="w-full h-12 border border-gray-300 rounded-none px-4 mt-2"
                    />

                    <p className="text-red-500 text-sm mt-1">
                      {errors.pickupDate?.message}
                    </p>

                  </div>

                </div>

                <div className="flex justify-end mt-8">

                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-orange-500 text-white px-8 h-12 rounded-none hover:bg-orange-600"
                  >
                    Next
                  </button>

                </div>

              </>
            )}
                        {/* ================= STEP 2 ================= */}

            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold mb-8">
                  Contact Details
                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                  {/* Contact Person */}

                  <div>

                    <label className="font-medium">
                      Contact Person
                    </label>

                    <input
                      type="text"
                      placeholder="Enter Contact Person"
                      {...register("contactPerson", {
                        required: "Contact Person is required",
                      })}
                      className="w-full h-12 border border-gray-300 rounded-none px-4 mt-2 outline-none focus:border-orange-500"
                    />

                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactPerson?.message}
                    </p>

                  </div>

                  {/* Contact Number */}

                  <div>

                    <label className="font-medium">
                      Contact Number
                    </label>

                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="0000000000"
                      {...register("contactNumber", {
                        required: "Contact Number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Enter valid 10 digit mobile number",
                        },
                      })}
                      className="w-full h-12 border border-gray-300 rounded-none px-4 mt-2 outline-none focus:border-orange-500"
                    />

                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactNumber?.message}
                    </p>

                  </div>

                  {/* Budget */}

                  <div className="md:col-span-2">

                    <label className="font-medium">
                      Expected Budget
                    </label>

                    <input
                      type="number"
                      placeholder="Enter Budget"
                      {...register("expectedBudget", {
                        required: "Budget is required",
                        min: {
                          value: 100,
                          message: "Minimum budget should be ₹100",
                        },
                      })}
                      className="w-full h-12 border border-gray-300 rounded-none px-4 mt-2 outline-none focus:border-orange-500"
                    />

                    <p className="text-red-500 text-sm mt-1">
                      {errors.expectedBudget?.message}
                    </p>

                  </div>

                </div>

                {/* Buttons */}

                <div className="flex justify-between mt-10">

                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-400 px-8 h-12 rounded-none hover:bg-gray-100"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-orange-500 text-white px-8 h-12 rounded-none hover:bg-orange-600"
                  >
                    Next
                  </button>

                </div>

              </>
            )}
                        {/* ================= STEP 3 ================= */}

            {step === 3 && (
              <>
                <h2 className="text-2xl font-bold mb-8">
                  Additional Information
                </h2>

                <div>

                  <label className="font-medium">
                    Remarks
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Write additional instructions..."
                    {...register("remarks")}
                    className="w-full border border-gray-300 rounded-none p-4 mt-2 outline-none focus:border-orange-500 resize-none"
                  />

                </div>

                {/* Buttons */}

                <div className="flex justify-between mt-10">

                  <button
                    type="button"
                    onClick={prevStep}
                    className="border border-gray-400 px-8 h-12 rounded-none hover:bg-gray-100"
                  >
                    Previous
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-500 text-white px-10 h-12 rounded-none hover:bg-orange-600 disabled:bg-gray-400"
                  >
                    {loading ? "Submitting..." : "Submit Request"}
                  </button>

                </div>

              </>
            )}

          </div>

          {/* ================= RIGHT SIDE SUMMARY ================= */}

          <div>

            <div className="border border-gray-300 p-6 sticky top-24">

              <h2 className="text-2xl font-bold mb-6">
                Booking Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between border-b pb-2">
                  <span>Service</span>
                  <span className="font-semibold">
                    {formData.service || "-"}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>Vehicle</span>
                  <span className="font-semibold">
                    {formData.vehicleType || "-"}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>Goods</span>
                  <span className="font-semibold">
                    {formData.goodsType || "-"}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>Weight</span>
                  <span className="font-semibold">
                    {formData.weight || "-"} Tone/Kg
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>Loading Point</span>
                  <span className="font-semibold">
                    {formData.pickupLocation || "-"}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>Destination</span>
                  <span className="font-semibold">
                    {formData.loading_point || "-"}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>Loading Date</span>
                  <span className="font-semibold">
                    {formData.pickupDate || "-"}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>Contact</span>
                  <span className="font-semibold">
                    {formData.contactPerson || "-"}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>Mobile</span>
                  <span className="font-semibold">
                    {formData.contactNumber || "-"}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span>Budget</span>
                  <span className="font-semibold text-green-600">
                    ₹ {formData.expectedBudget || 0}
                  </span>
                </div>

                <div className="border-t pt-4">

                  <p className="font-semibold mb-2">
                    Remarks
                  </p>

                  <p className="text-gray-600 text-sm break-words">
                    {formData.remarks || "No remarks added"}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </form>

      </div>

    </div>
  );
}