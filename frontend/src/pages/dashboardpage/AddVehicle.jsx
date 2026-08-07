
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  FaTruck, 
  FaIdCard, 
  FaWeightHanging, 
  FaBoxes, 
  FaArrowLeft, 
  FaShieldAlt, 
  FaCheckCircle 
} from "react-icons/fa";
import API from "../../api/api";

export function AddVehicle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    vehicleType: "",
    vehicleNumber: "",
    capacity: "",
    bodyType: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await API.post("/vehicles", form);

      toast.success(
        response.data.message || "Vehicle added successfully"
      );

      navigate("/dashboard/myvehicles");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to register vehicle. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* Enterprise Header Banner */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-12 py-6 mb-8">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              Rodio Tradelink Logistics Enterprise
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Fleet Registration Portal
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Enroll a new commercial transport unit into your verified logistics network.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/dashboard/myvehicles")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all border border-slate-200"
            >
              <FaArrowLeft />
              Back to Fleet List
            </button>
          </div>
        </div>
      </div>

      {/* Main Fluid Container (No narrow centered cards) */}
      <div className="w-full px-6 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Section (Spans 8 columns on large screens for full layout integration) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
            
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                  <FaTruck size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Transport Unit Specifications
                  </h3>
                  <p className="text-xs text-slate-500">
                    Complete all mandatory fields marked with an asterisk (*)
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-blue-600 font-semibold bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                <FaShieldAlt /> Secure Enrollment
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Vehicle Type */}
                <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Vehicle Classification <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <FaTruck className="absolute left-3.5 text-slate-400 pointer-events-none text-sm" />
                    <select
                      name="vehicleType"
                      value={form.vehicleType}
                      onChange={handleChange}
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all cursor-pointer"
                    >
                      <option value="">Select Vehicle Classification</option>
                      <option value="Mini Truck">Mini Truck</option>
                      <option value="Pickup">Pickup</option>
                      <option value="Tata Ace">Tata Ace</option>
                      <option value="Bolero Pickup">Bolero Pickup</option>
                      <option value="Mahindra Jeeto">Mahindra Jeeto</option>
                      <option value="Ashok Leyland Dost">Ashok Leyland Dost</option>
                      <option value="Tempo">Tempo</option>
                      <option value="Canter">Canter</option>
                      <option value="Eicher">Eicher</option>
                      <option value="Truck">Truck</option>
                      <option value="LCV">LCV</option>
                      <option value="HCV">HCV</option>
                      <option value="14 Feet Truck">14 Feet Truck</option>
                      <option value="17 Feet Truck">17 Feet Truck</option>
                      <option value="19 Feet Truck">19 Feet Truck</option>
                      <option value="22 Feet Truck">22 Feet Truck</option>
                      <option value="24 Feet Truck">24 Feet Truck</option>
                      <option value="32 Feet Truck">32 Feet Truck</option>
                      <option value="Open Body">Open Body</option>
                      <option value="Closed Body">Closed Body</option>
                      <option value="20 Feet Container">20 Feet Container</option>
                      <option value="32 Feet Container">32 Feet Container</option>
                      <option value="Trailer">Trailer</option>
                      <option value="Flat Bed Trailer">Flat Bed Trailer</option>
                      <option value="Low Bed Trailer">Low Bed Trailer</option>
                      <option value="Semi Trailer">Semi Trailer</option>
                      <option value="Hydraulic Trailer">Hydraulic Trailer</option>
                      <option value="Tipper">Tipper</option>
                      <option value="Dumper">Dumper</option>
                      <option value="Tanker">Tanker</option>
                      <option value="Water Tanker">Water Tanker</option>
                      <option value="Fuel Tanker">Fuel Tanker</option>
                      <option value="Cement Bulker">Cement Bulker</option>
                      <option value="Refrigerated Truck">Refrigerated Truck</option>
                      <option value="Car Carrier">Car Carrier</option>
                      <option value="Bike Carrier">Bike Carrier</option>
                      <option value="Auto Carrier">Auto Carrier</option>
                      <option value="ODC Trailer">ODC Trailer</option>
                      <option value="Multi Axle Trailer">Multi Axle Trailer</option>
                      <option value="Crane">Crane</option>
                      <option value="Hyva">Hyva</option>
                      <option value="Transit Mixer">Transit Mixer</option>
                    </select>
                  </div>
                </div>

                {/* Vehicle Number */}
                <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Registration Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <FaIdCard className="absolute left-3.5 text-slate-400 text-sm" />
                    <input
                      type="text"
                      name="vehicleNumber"
                      value={form.vehicleNumber}
                      onChange={handleChange}
                      placeholder="e.g. RJ19AB1234"
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-800 text-sm font-mono font-semibold uppercase focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:normal-case placeholder:font-normal placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Capacity */}
                <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Load Capacity
                  </label>
                  <div className="relative flex items-center">
                    <FaWeightHanging className="absolute left-3.5 text-slate-400 text-sm" />
                    <input
                      type="text"
                      name="capacity"
                      value={form.capacity}
                      onChange={handleChange}
                      placeholder="e.g. 20 Tons / 400 Boxes"
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Body Type */}
                <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                    Body Configuration
                  </label>
                  <div className="relative flex items-center">
                    <FaBoxes className="absolute left-3.5 text-slate-400 pointer-events-none text-sm" />
                    <select
                      name="bodyType"
                      value={form.bodyType}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all cursor-pointer"
                    >
                      <option value="">Select Configuration</option>
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                      <option value="Container">Container</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/myvehicles")}
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-slate-900 hover:bg-blue-600 text-white py-3.5 px-6 rounded-xl font-semibold text-sm shadow-sm transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Registering Unit...
                    </>
                  ) : (
                    "Complete Vehicle Registration"
                  )}
                </button>
              </div>

            </form>

          </div>

          {/* Right Information Column (Spans 4 columns for enterprise SaaS layout balance) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <FaCheckCircle className="text-blue-600" />
                Fleet Registration Guidelines
              </h4>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                  Ensure the registration plate number strictly matches official RC documentation (e.g., MH04AB1234).
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                  Accurate tonnage and capacity specs help automated matching algorithms allocate optimal cargo loads.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                  Once added, your vehicle will be instantly synced across the Rodio Tradelink vendor network.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white p-6 shadow-sm">
              <h4 className="font-bold text-base mb-1">Need Assistance?</h4>
              <p className="text-slate-300 text-xs mb-4">
                Our logistics support desk is available 24/7 for carrier onboarding and fleet verifications.
              </p>
              <div className="text-xs font-mono bg-white/10 px-3 py-2 rounded-xl inline-block border border-white/10">
                Support Line: +91 (Enterprise)
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AddVehicle;