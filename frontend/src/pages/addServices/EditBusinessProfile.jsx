import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import API from "../../api/api"; // Your standard API setup
import toast from "react-hot-toast";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Truck,
  X,
  CheckCircle,
  Share2,
  Save,
  Info,
  Loader2,
} from "lucide-react";

export default function EditBusinessProfile({ onClose, onUpdateSuccess }) {
  const [fetchingData, setFetchingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    "Transporter", "Broker", "Fleet Owner", "Truck Owner", 
    "Logistics Company", "Warehouse", "Courier", "Packing & Moving", 
    "Commission Agent", "RTO Agent", "Finance Agent", "Others"
  ];

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const availableVehicleTypes = [
    "Mini Truck", "Pickup", "Tata Ace", "Bolero Pickup", "Mahindra Jeeto", 
    "Ashok Leyland Dost", "Tempo", "Canter", "Eicher", "Truck", "LCV", 
    "HCV", "14 Feet Truck", "17 Feet Truck", "19 Feet Truck", "22 Feet Truck", 
    "32 Feet Truck", "Open Body Truck", "Closed Body Truck", "Container", 
    "Trailer", "Tipper", "Tanker", "Refrigerated Truck", "Tractor Trolley"
  ];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      firmName: "",
      ownerName: "",
      email: "",
      phoneNumber: "",
      alternatePhone: "",
      website: "",
      socialMedia: "",
      address: "",
      currentCity: "",
      currentState: "",
      pincode: "",
      category: "",
      vehicleTypes: [],
    },
  });

  const selectedVehicles = watch("vehicleTypes") || [];

  // Modal open hote hi current profile data pre-fill karne ke liye fetch karein
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setFetchingData(true);
        const res = await API.get("/dashboard"); 
        const profile = res.data?.data || res.data;

        if (profile) {
          reset({
            firmName: profile.firmName || "",
            ownerName: profile.ownerName || profile.name || "",
            email: profile.email || "",
            phoneNumber: profile.phoneNumber || profile.mobile || "",
            alternatePhone: profile.alternatePhone || "",
            website: profile.website || "",
            socialMedia: profile.socialMedia || "",
            address: profile.address || "",
            currentCity: profile.currentCity || "",
            currentState: profile.currentState || "",
            pincode: profile.pincode || "",
            category: profile.category || "",
            vehicleTypes: profile.vehicleTypes || [],
          });
        }
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        toast.error("Profile details load nahi ho paayi.");
      } finally {
        setFetchingData(false);
      }
    };

    fetchProfileData();
  }, [reset]);

  const handleVehicleToggle = (type) => {
    let updatedVehicles = [];
    if (selectedVehicles.includes(type)) {
      updatedVehicles = selectedVehicles.filter((v) => v !== type);
    } else {
      updatedVehicles = [...selectedVehicles, type];
    }
    setValue("vehicleTypes", updatedVehicles, { shouldDirty: true });
  };

  // Submit Handler with PATCH Request
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);

      // Sirf modified/changed fields hi server par bhejenge (PATCH efficient way)
      const patchData = {};
      Object.keys(dirtyFields).forEach((key) => {
        patchData[key] = data[key];
      });

      if (Object.keys(patchData).length === 0) {
        toast.info("Koi badlaav nahi kiya gaya hai.");
        setSubmitting(false);
        return;
      }

      // Direct PATCH API Call
      const res = await API.patch("/update-profile", patchData);

      if (res.data?.success || res.status === 200) {
        toast.success("Profile Successfully Updated!");
        if (onUpdateSuccess) onUpdateSuccess();
        if (onClose) onClose();
      }
    } catch (err) {
      console.error("PATCH Update Error:", err);
      toast.error(err.response?.data?.message || "Profile update karne me samasya aayi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-center items-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-5 sm:px-8 sm:py-6 flex justify-between items-center shrink-0 border-b border-slate-800">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
              Edit Mode
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-white tracking-tight">
              Edit Business Profile
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition shadow-md cursor-pointer"
          >
            <X size={22} />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-amber-50 border-b border-amber-200/80 px-6 py-3 flex items-center gap-3 text-amber-900 text-xs sm:text-sm font-semibold shrink-0">
          <Info size={18} className="text-amber-600 shrink-0" />
          <span>Sabhi fields optional hain. Aap kisi bhi ek ya zyada fields ko update kar sakte hain.</span>
        </div>

        {fetchingData ? (
          <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-600">
            <Loader2 size={40} className="animate-spin text-orange-500" />
            <p className="font-bold text-base">Loading profile data...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 lg:p-10 space-y-10 overflow-y-auto">
            
            {/* Basic Details Section */}
            <div className="bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2.5 border-b border-slate-200 pb-4">
                <Building2 className="text-orange-500" size={22} /> Basic Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">Firm Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("firmName")}
                      placeholder="Firm Name"
                      className="w-full h-13 bg-white border border-slate-300 rounded-2xl pl-11 pr-4 text-base font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition shadow-sm"
                    />
                    <Building2 size={20} className="absolute left-3.5 top-3.5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">Owner Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("ownerName")}
                      placeholder="Owner Name"
                      className="w-full h-13 bg-white border border-slate-300 rounded-2xl pl-11 pr-4 text-base font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition shadow-sm"
                    />
                    <User size={20} className="absolute left-3.5 top-3.5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">Category</label>
                  <select
                    {...register("category")}
                    className="w-full h-13 bg-white border border-slate-300 rounded-2xl px-4 text-base font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition shadow-sm"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="email@example.com"
                      className="w-full h-13 bg-white border border-slate-300 rounded-2xl pl-11 pr-4 text-base font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition shadow-sm"
                    />
                    <Mail size={20} className="absolute left-3.5 top-3.5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      {...register("phoneNumber")}
                      placeholder="Phone"
                      className="w-full h-13 bg-white border border-slate-300 rounded-2xl pl-11 pr-4 text-base font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition shadow-sm"
                    />
                    <Phone size={20} className="absolute left-3.5 top-3.5 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">Alternate Phone</label>
                  <div className="relative">
                    <input
                      type="tel"
                      {...register("alternatePhone")}
                      placeholder="Alternate Phone"
                      className="w-full h-13 bg-white border border-slate-300 rounded-2xl pl-11 pr-4 text-base font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition shadow-sm"
                    />
                    <Phone size={20} className="absolute left-3.5 top-3.5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2.5 border-b border-slate-200 pb-4">
                <MapPin className="text-orange-500" size={22} /> Location Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-3">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">Address</label>
                  <input
                    type="text"
                    {...register("address")}
                    placeholder="Full Address"
                    className="w-full h-13 bg-white border border-slate-300 rounded-2xl px-4 text-base font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">City</label>
                  <input
                    type="text"
                    {...register("currentCity")}
                    placeholder="City"
                    className="w-full h-13 bg-white border border-slate-300 rounded-2xl px-4 text-base font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">State</label>
                  <select
                    {...register("currentState")}
                    className="w-full h-13 bg-white border border-slate-300 rounded-2xl px-4 text-base font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition shadow-sm"
                  >
                    <option value="">Select State</option>
                    {indianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">Pincode</label>
                  <input
                    type="text"
                    {...register("pincode")}
                    placeholder="Pincode"
                    className="w-full h-13 bg-white border border-slate-300 rounded-2xl px-4 text-base font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Vehicles Selection */}
            <div className="bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2.5 border-b border-slate-200 pb-4">
                <Truck className="text-orange-500" size={22} /> Vehicles Available
              </h3>

              <div className="flex flex-wrap gap-2.5 max-h-56 overflow-y-auto p-4 bg-white border border-slate-200 rounded-2xl">
                {availableVehicleTypes.map((v) => {
                  const isSelected = selectedVehicles.includes(v);
                  return (
                    <button
                      type="button"
                      key={v}
                      onClick={() => handleVehicleToggle(v)}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-[1.02]"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                      }`}
                    >
                      {isSelected && <CheckCircle size={16} />} {v}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Links Section */}
            <div className="bg-slate-50/50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-6">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2.5 border-b border-slate-200 pb-4">
                <Share2 className="text-orange-500" size={22} /> Web Links
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">Website</label>
                  <input
                    type="text"
                    {...register("website")}
                    placeholder="Website Link"
                    className="w-full h-13 bg-white border border-slate-300 rounded-2xl px-4 text-base font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2">Social Link</label>
                  <input
                    type="text"
                    {...register("socialMedia")}
                    placeholder="Social Link"
                    className="w-full h-13 bg-white border border-slate-300 rounded-2xl px-4 text-base font-semibold text-slate-800 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions Footer */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-200 sticky bottom-0 bg-white p-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-8 h-14 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-base transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-10 h-14 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold rounded-2xl text-base shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
              >
                <Save size={20} />
                {submitting ? "Saving..." : "Save Profile"}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}