// src/pages/dashboard/PublicBusinessProfile.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, Mail, Phone, MapPin, Truck, Route as RouteIcon, Building, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import API from "../../api/api";

export  function PublicBusinessProfile() {
  const { id } = useParams();
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPublicBusiness();
    }
  }, [id]);

  const fetchPublicBusiness = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/business/public/${id}`);
      if (response.data?.success) {
        setBusinessData(response.data.data);
      } else {
        toast.error(response.data?.message || "Failed to load business profile");
      }
    } catch (error) {
      console.error("Public Business Fetch Error:", error);
      toast.error(error?.response?.data?.message || "Business not found or inactive");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1117]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#2dd4bf] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-black text-[#2dd4bf] uppercase tracking-widest">
            LOADING BUSINESS PROFILE...
          </p>
        </div>
      </div>
    );
  }

  if (!businessData) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0d1117] text-gray-400">
        <div className="text-center space-y-2">
          <p className="text-base font-bold text-white uppercase tracking-wider">Business Not Found</p>
          <p className="text-xs text-gray-500">The profile you are looking for might be inactive or unavailable.</p>
        </div>
      </div>
    );
  }

  const {
    firmName,
    category,
    name,
    role,
    email,
    phoneNumber,
    address,
    pincode,
    location,
    workingAreas,
    vehicles,
    routes,
  } = businessData;

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER CARD */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-[#115e59] via-[#0f766e] to-[#042f2e] border border-teal-600/30 rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10 pb-8 border-b border-white/10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 bg-black/20 text-teal-200 px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                <ShieldCheck size={14} className="text-teal-300" /> VERIFIED ENTERPRISE
              </div>
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">{firmName}</h1>
              <p className="text-xs font-bold text-teal-200/80 uppercase tracking-wider flex items-center gap-2">
                <span>{name}</span> {role && <span className="opacity-60">• {role}</span>}
              </p>
            </div>

            <div className="bg-black/20 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-sm text-center md:text-right">
              <span className="block text-[10px] font-black uppercase tracking-widest text-teal-200/70">Category</span>
              <span className="text-sm font-black text-white uppercase mt-0.5 inline-flex items-center gap-1">
                <Crown size={14} className="text-amber-400" /> {category}
              </span>
            </div>
          </div>

          {/* CONTACT INFO GRID */}
          <div className="grid md:grid-cols-3 gap-4 pt-8 relative z-10">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-black/20 border border-white/10 backdrop-blur-sm">
              <Phone size={18} className="text-teal-300 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-teal-200/70">Phone Number</p>
                <p className="font-bold text-white text-xs mt-0.5">{phoneNumber || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-black/20 border border-white/10 backdrop-blur-sm">
              <Mail size={18} className="text-teal-300 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-teal-200/70">Email Address</p>
                <p className="font-bold text-white text-xs mt-0.5">{email || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-black/20 border border-white/10 backdrop-blur-sm">
              <MapPin size={18} className="text-teal-300 shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-teal-200/70">Location</p>
                <p className="font-bold text-white text-xs mt-0.5">{location?.city}, {location?.state} - {pincode}</p>
              </div>
            </div>
          </div>

          {address && (
            <div className="mt-4 p-4 rounded-2xl bg-black/20 border border-white/10 backdrop-blur-sm relative z-10">
              <p className="text-[10px] font-black uppercase tracking-widest text-teal-200/70">Complete Address</p>
              <p className="font-bold text-white text-xs mt-0.5">{address}</p>
            </div>
          )}
        </motion.div>

        {/* WORKING AREAS */}
        {workingAreas && workingAreas.length > 0 && (
          <div className="bg-[#161b22] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={16} className="text-[#2dd4bf]" /> Working Areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {workingAreas.map((area, index) => (
                <span key={index} className="bg-[#0d1117] border border-gray-800 text-gray-200 px-3.5 py-1.5 rounded-xl text-xs font-bold">
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* VEHICLES SECTION */}
        <div className="bg-[#161b22] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Truck size={16} className="text-[#2dd4bf]" /> Fleet & Vehicles ({vehicles?.length || 0})
            </h3>
          </div>

          {(!vehicles || vehicles.length === 0) ? (
            <p className="text-xs text-gray-500 italic">No active vehicles listed.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicles.map((v, i) => (
                <div key={i} className="bg-[#0d1117] border border-gray-800/80 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white uppercase">{v.vehicleType}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      {v.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-gray-400 space-y-1">
                    <p>Capacity: <span className="text-gray-200 font-bold">{v.capacity || "N/A"}</span></p>
                    <p>Body Type: <span className="text-gray-200 font-bold">{v.bodyType || "N/A"}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ROUTES SECTION */}
        <div className="bg-[#161b22] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <RouteIcon size={16} className="text-[#2dd4bf]" /> Active Routes ({routes?.length || 0})
            </h3>
          </div>

          {(!routes || routes.length === 0) ? (
            <p className="text-xs text-gray-500 italic">No active routes listed.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {routes.map((r, i) => (
                <div key={i} className="bg-[#0d1117] border border-gray-800/80 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-white uppercase">
                    <span className="text-[#2dd4bf]">{r.from}</span>
                    <span className="text-gray-500">→</span>
                    <span className="text-[#38bdf8]">{r.to}</span>
                  </div>
                  {r.vehicleTypes && r.vehicleTypes.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1 border-t border-gray-800">
                      {r.vehicleTypes.map((vt, idx) => (
                        <span key={idx} className="text-[10px] bg-gray-900 text-gray-300 px-2 py-0.5 rounded-md font-semibold">
                          {vt}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
export default PublicBusinessProfile