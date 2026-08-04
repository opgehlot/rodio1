import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import API from "../../api/api";
import toast from "react-hot-toast";
import { 
  Truck, 
  Package, 
  MapPin, 
  Calendar, 
  User, 
  Phone, 
  IndianRupee, 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Weight,
  Layers
} from "lucide-react";

export default function UserForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    control,
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
    "Transporter", "Broker", "Fleet Owner", "Truck Owner", 
    "Logistics Company", "Warehouse", "Courier", "Packing & Moving", 
    "Commission Agent", "RTO Agent", "Finance Agent", "Others"
  ];

  const vehicleTypes = [
    "Mini Truck", "Pickup", "Tata Ace", "Bolero Pickup", "Mahindra Jeeto", 
    "Ashok Leyland Dost", "Tempo", "Canter", "Eicher", "Truck", "LCV", 
    "HCV", "14 Feet Truck", "17 Feet Truck", "19 Feet Truck", "22 Feet Truck", 
    "32 Feet Truck", "Open Body Truck", "Closed Body Truck", "Container", 
    "Trailer", "Tipper", "Tanker", "Refrigerated Truck", "Tractor Trolley"
  ];

  const formData = watch();

  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return "-";
    const parts = dateString.split("-");
    if (parts.length !== 3) return dateString;
    const [year, month, day] = parts;
    return `${day}-${month}-${year}`;
  };

  const nextStep = async () => {
    let fields = [];
    if (step === 1) {
      fields = ["service", "vehicleType", "goodsType", "weight", "pickupLocation", "loading_point", "pickupDate"];
    } else if (step === 2) {
      fields = ["contactPerson", "contactNumber", "expectedBudget"];
    } else if (step === 3) {
      fields = ["remarks"];
    }

    const valid = await trigger(fields);
    if (valid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const payload = {
        ...data,
        formattedPickupDate: formatDateToDDMMYYYY(data.pickupDate),
      };

      const res = await API.post("/booking/create", payload);
      toast.success(res.data.message || "Load created successfully");
      reset();
      setStep(1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <div className="w-full bg-slate-50/50 min-h-screen py-6 px-3 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-600 mb-2">
              <Truck size={14} /> New Transport Order
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Create Shipment Request</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Fill in the details to publish your load to network carriers.</p>
          </div>

          {/* Step Indicator Badges */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl w-full md:w-auto justify-center">
            {[1, 2, 3].map((item) => (
              <div 
                key={item} 
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  step === item 
                    ? "bg-slate-900 text-white shadow-md" 
                    : step > item 
                    ? "bg-emerald-500 text-white" 
                    : "text-slate-400"
                }`}
              >
                {step > item ? <CheckCircle2 size={14} /> : <span>0{item}</span>}
                <span className={step === item ? "inline" : "hidden sm:inline"}>
                  {item === 1 ? "Details" : item === 2 ? "Contact" : "Finalize"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="grid lg:grid-cols-3 gap-6">
          
          {/* Main Form Box */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            
            {/* STEP 1: Shipment Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <Layers className="text-orange-500" size={20} /> Shipment Specifications
                  </h2>
                  <p className="text-xs text-slate-500">Provide material type, vehicle requirement and route information.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Service */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Service Category</label>
                    <select
                      {...register("service", { required: "Service category is required" })}
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl px-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
                    >
                      <option value="">Select Service Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.service && <p className="text-red-500 text-xs font-semibold mt-1">{errors.service.message}</p>}
                  </div>

                  {/* Vehicle Type */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Vehicle Type</label>
                    <select
                      {...register("vehicleType", { required: "Vehicle Type is required" })}
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl px-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
                    >
                      <option value="">Select Vehicle Type</option>
                      {vehicleTypes.map((v) => (
                        <option key={v} value={v}>{v}</option>
                      ))}
                    </select>
                    {errors.vehicleType && <p className="text-red-500 text-xs font-semibold mt-1">{errors.vehicleType.message}</p>}
                  </div>

                  {/* Goods Type */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Goods Type</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Industrial Equipment"
                        {...register("goodsType", { required: "Goods Type Required" })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
                      />
                      <Package size={18} className="absolute left-3 top-3 text-slate-400" />
                    </div>
                    {errors.goodsType && <p className="text-red-500 text-xs font-semibold mt-1">{errors.goodsType.message}</p>}
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Weight </label>
                    <div className="relative">
                      <input
                        type="string"
                        placeholder="e.g. 15"
                        {...register("weight", { required: "Weight Required" })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
                      />
                      <Weight size={18} className="absolute left-3 top-3 text-slate-400" />
                    </div>
                    {errors.weight && <p className="text-red-500 text-xs font-semibold mt-1">{errors.weight.message}</p>}
                  </div>

                  {/* Pickup Location */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Pickup / Loading Point</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Mumbai Port, MH"
                        {...register("pickupLocation", { required: "Pickup Location Required" })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
                      />
                      <MapPin size={18} className="absolute left-3 top-3 text-emerald-500" />
                    </div>
                    {errors.pickupLocation && <p className="text-red-500 text-xs font-semibold mt-1">{errors.pickupLocation.message}</p>}
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Unloading / Destination</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Indore Hub, MP"
                        {...register("loading_point", { required: "Destination Required" })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
                      />
                      <MapPin size={18} className="absolute left-3 top-3 text-rose-500" />
                    </div>
                    {errors.loading_point && <p className="text-red-500 text-xs font-semibold mt-1">{errors.loading_point.message}</p>}
                  </div>

                  {/* Date Picker */}
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Loading Date</label>
                    <div className="relative">
                      <Controller
                        control={control}
                        name="pickupDate"
                        rules={{ required: "Pickup Date Required" }}
                        render={({ field }) => (
                          <DatePicker
                            selected={field.value && !isNaN(new Date(field.value)) ? new Date(field.value) : null}
                            onChange={(date) => {
                              if (!date || isNaN(date)) {
                                field.onChange("");
                                return;
                              }
                              const year = date.getFullYear();
                              const month = String(date.getMonth() + 1).padStart(2, "0");
                              const day = String(date.getDate()).padStart(2, "0");
                              field.onChange(`${year}-${month}-${day}`);
                            }}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select Loading Date"
                            className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 cursor-pointer transition-all"
                            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                          />
                        )}
                      />
                      <Calendar size={18} className="absolute left-3 top-3 text-orange-500 pointer-events-none" />
                    </div>
                    {errors.pickupDate && <p className="text-red-500 text-xs font-semibold mt-1">{errors.pickupDate.message}</p>}
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-slate-900 hover:bg-orange-600 text-white font-bold px-7 h-11 rounded-2xl transition-all duration-200 flex items-center gap-2 text-sm shadow-md"
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Contact Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <User className="text-orange-500" size={20} /> Contact & Budget Info
                  </h2>
                  <p className="text-xs text-slate-500">Provide point-of-contact details and estimated freight budget.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Contact Person Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Rajesh Kumar"
                        {...register("contactPerson", { required: "Contact Person is required" })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
                      />
                      <User size={18} className="absolute left-3 top-3 text-slate-400" />
                    </div>
                    {errors.contactPerson && <p className="text-red-500 text-xs font-semibold mt-1">{errors.contactPerson.message}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Contact Mobile Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        {...register("contactNumber", {
                          required: "Contact Number is required",
                          pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
                        })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition-all"
                      />
                      <Phone size={18} className="absolute left-3 top-3 text-slate-400" />
                    </div>
                    {errors.contactNumber && <p className="text-red-500 text-xs font-semibold mt-1">{errors.contactNumber.message}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Target Freight Budget (₹)</label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="Enter estimated budget amount"
                        {...register("expectedBudget", {
                          required: "Budget is required",
                          min: { value: 100, message: "Minimum budget should be ₹100" },
                        })}
                        className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 text-sm font-bold text-emerald-600 outline-none focus:bg-white focus:border-orange-500 transition-all"
                      />
                      <IndianRupee size={18} className="absolute left-3 top-3 text-emerald-600" />
                    </div>
                    {errors.expectedBudget && <p className="text-red-500 text-xs font-semibold mt-1">{errors.expectedBudget.message}</p>}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 h-11 rounded-2xl transition-all duration-200 flex items-center gap-2 text-sm"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-slate-900 hover:bg-orange-600 text-white font-bold px-7 h-11 rounded-2xl transition-all duration-200 flex items-center gap-2 text-sm shadow-md"
                  >
                    Next Step <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Remarks */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                    <FileText className="text-orange-500" size={20} /> Additional Instructions
                  </h2>
                  <p className="text-xs text-slate-500">Mention special requirements or handling instructions for driver/transporter.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Remarks & Instructions</label>
                  <textarea
                    rows={5}
                    placeholder="Write instructions regarding loading time, tarp requirement, driver details needed, etc."
                    {...register("remarks")}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 resize-none transition-all"
                  />
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 h-11 rounded-2xl transition-all duration-200 flex items-center gap-2 text-sm"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 h-11 rounded-2xl transition-all duration-200 flex items-center gap-2 text-sm shadow-md shadow-orange-500/20 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      "Publish Transport Request"
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Live Booking Summary Panel */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl sticky top-6 space-y-5 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="font-bold text-base text-white flex items-center gap-2">
                  <FileText size={18} className="text-orange-500" /> Order Summary
                </h3>
                <span className="text-[10px] uppercase tracking-wider bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold px-2.5 py-0.5 rounded-full">
                  Live Preview
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Category</span>
                  <span className="font-bold text-slate-200">{formData.service || "—"}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Vehicle Needed</span>
                  <span className="font-bold text-slate-200">{formData.vehicleType || "—"}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Goods & Weight</span>
                  <span className="font-bold text-slate-200">
                    {formData.goodsType || " "} {formData.weight ? `(${formData.weight} )` : ""}
                  </span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Pickup Point</span>
                  <span className="font-bold text-emerald-400 text-right max-w-[140px] truncate">{formData.pickupLocation || "—"}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Destination</span>
                  <span className="font-bold text-rose-400 text-right max-w-[140px] truncate">{formData.loading_point || "—"}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Loading Date</span>
                  <span className="font-bold text-orange-400">{formatDateToDDMMYYYY(formData.pickupDate)}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Contact Person</span>
                  <span className="font-bold text-slate-200">{formData.contactPerson || "—"}</span>
                </div>

                <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Phone</span>
                  <span className="font-bold text-slate-200">{formData.contactNumber || "—"}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Target Budget</span>
                  <span className="text-lg font-black text-emerald-400">
                    ₹ {formData.expectedBudget ? Number(formData.expectedBudget).toLocaleString("en-IN") : "0"}
                  </span>
                </div>

                <div className="bg-slate-800/80 rounded-2xl p-3 border border-slate-700/60 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Remarks</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed break-words">
                    {formData.remarks || "No additional instructions added."}
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