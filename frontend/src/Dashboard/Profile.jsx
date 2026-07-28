// src/pages/dashboard/Profile.jsx

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Crown, User, Mail, Phone, Building, Copy, Loader2, Camera, Edit3, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/api";

export default function Profile() {
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form editable states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  // GET API Call
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await API.get("/profile"); // Apne route ke mutabiq endpoint check kar lein (e.g., /profile ya /business/dashboard)
      
      const data = response.data?.profile || response.data?.data || null;
      setProfileData(data);

      if (data) {
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || data.mobile || "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Profile Fetch Error:", error);
      toast.error("Failed to load profile details");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    if (!text || text === "N/A") return;
    navigator.clipboard.writeText(text);
    toast.success("Referral code copied!");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // PUT API Call for Profile Update (Photo + Text fields)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phoneNumber);
      if (formData.password) {
        data.append("password", formData.password);
      }
      
      // Agar user ne koi nayi photo select ki hai to file input se lein
      if (fileInputRef.current?.files?.[0]) {
        data.append("profileImage", fileInputRef.current.files[0]);
      }

      const response = await API.put("/profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.success) {
        toast.success("Profile Updated Successfully!");
        setIsEditing(false);
        fetchProfile();
      } else {
        toast.error(response.data?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally {
      setSaving(false);
    }
  };

  // Direct Photo Change Handler (agar sirf photo instant update karni ho)
  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    try {
      setUploadingPhoto(true);
      const data = new FormData();
      data.append("profileImage", file);

      const response = await API.put("/profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.success) {
        toast.success("Profile photo updated successfully!");
        fetchProfile();
      }
    } catch (error) {
      console.error("Photo Upload Error:", error);
      toast.error("Error uploading photo");
    } finally {
      setUploadingPhoto(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] w-full flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-slate-900" size={32} />
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
            LOADING PROFILE...
          </p>
        </div>
      </div>
    );
  }

  const profileImage = profileData?.profileImage || "https://res.cloudinary.com/tyt9mt1f/image/upload/v1784103262/DUMMYIMAGE_xuc0xa.jpg";
  const referralCode = profileData?.referralCode || "RODIO2026";

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight"
        >
          My Profile
        </motion.h1>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase flex items-center gap-2 transition shadow-sm active:scale-95"
          >
            <Edit3 size={16} />
            <span>Edit Profile</span>
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(false)}
            className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-5 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase flex items-center gap-2 transition active:scale-95"
          >
            <X size={16} />
            <span>Cancel</span>
          </button>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-slate-200/80"
      >
        {/* Top Header Card Info */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-slate-100">
          <div className="relative group">
            <div className="w-24 h-24 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center text-4xl font-bold shadow-inner overflow-hidden border-2 border-slate-200">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>

            <button
              type="button"
              disabled={uploadingPhoto}
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/60 rounded-2xl flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition cursor-pointer"
            >
              {uploadingPhoto ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <Camera size={20} />
                  <span className="text-[10px] font-black uppercase mt-1">Change</span>
                </>
              )}
            </button>

            <input 
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          
          <div className="text-center sm:text-left space-y-1">
            <h2 className="text-2xl font-black text-slate-900 uppercase">{profileData?.name || "Enterprise User"}</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{profileData?.email}</p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                <Crown size={12} /> {profileData?.role || "Transporter"}
              </span>
            </div>
          </div>

          {/* <div className="sm:ml-auto text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Referral Code</p>
            <div 
              onClick={() => handleCopy(referralCode)}
              className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-4 py-2.5 rounded-xl cursor-pointer transition border border-slate-200 shadow-sm"
            >
              <span className="font-mono font-bold text-xs text-slate-800">{referralCode}</span>
              <Copy size={14} className="text-slate-500" />
            </div>
          </div> */}
        </div>

        {/* View Mode vs Edit Mode */}
        {!isEditing ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
              <div className="text-slate-500 mt-0.5"><User size={20} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{profileData?.name || "Not Provided"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
              <div className="text-slate-500 mt-0.5"><Building size={20} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Role / Designation</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{profileData?.role || "Not Provided"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
              <div className="text-slate-500 mt-0.5"><Mail size={20} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{profileData?.email || "Not Provided"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/60 border border-slate-100">
              <div className="text-slate-500 mt-0.5"><Phone size={20} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mobile Number</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{profileData?.phoneNumber || profileData?.mobile || "Not Provided"}</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-900 transition"
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-900 transition"
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">Mobile Number</label>
                <input 
                  type="text" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-900 transition"
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">New Password (Optional)</label>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Leave blank to keep current password"
                  value={formData.password} 
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-900 transition"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase flex items-center gap-2 transition shadow-sm active:scale-95 disabled:opacity-50"
              >
                {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}