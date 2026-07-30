import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Crown, User, Mail, Phone, Building, Loader2, Camera, Edit3, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/api";

export default function Profile() {
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    fetchProfile(true); // Pehli baar load hone par true bhejenge taaki loading screen aaye
  }, []);

  const fetchProfile = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const response = await API.get("/profile");
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
      if (isInitial) setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      
      if (fileInputRef.current?.files?.[0]) {
        data.append("profileImage", fileInputRef.current.files[0]);
      }

      const response = await API.put("/profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.success) {
        toast.success("Profile Updated Successfully!");
        setIsEditing(false);
        setPreviewImage(null);
        fetchProfile(false); // Bina pura component reload kiye data refresh hoga
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

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    // Instant local preview dikhane ke liye taaki user ko turant pata chale
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      setUploadingPhoto(true);
      const data = new FormData();
      data.append("profileImage", file);

      const response = await API.put("/profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.success) {
        toast.success("Profile photo updated successfully!");
        fetchProfile(false); // Background mein data update hoga
      }
    } catch (error) {
      console.error("Photo Upload Error:", error);
      toast.error("Error uploading photo");
      setPreviewImage(null); // Error aane par purana image wapas aa jayega
    } finally {
      setUploadingPhoto(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-slate-900" size={32} />
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">
            LOADING PROFILE...
          </p>
        </div>
      </div>
    );
  }

  const fallbackImage = "https://res.cloudinary.com/tyt9mt1f/image/upload/v1784103262/DUMMYIMAGE_xuc0xa.jpg";
  const profileImage = previewImage || profileData?.profileImage || fallbackImage;

  return (
    <div className="w-full bg-white rounded-3xl mb-4 min-h-[300px] px-4 md:px-12 py-0 my-0">
      {/* Top Header Section */}
      <div className="flex items-center justify-between py-6 border-b border-slate-100 mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
          My Profile
        </h1>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-black tracking-widest uppercase flex items-center gap-2 transition active:scale-95"
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

      {/* Main Content Area */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-white pb-12"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 pb-8 border-b border-slate-100">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-slate-100 text-slate-900 flex items-center justify-center overflow-hidden border border-slate-200">
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
              className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition cursor-pointer"
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
            <h2 className="text-2xl font-black text-slate-900 uppercase">{profileData?.name || "User"}</h2>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{profileData?.email || "No Email"}</p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                <Crown size={12} /> {profileData?.role || "Member"}
              </span>
            </div>
          </div>
        </div>

        {!isEditing ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-slate-500 mt-0.5"><User size={20} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{profileData?.name || "Not Provided"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-slate-500 mt-0.5"><Building size={20} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Role / Designation</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{profileData?.role || "Not Provided"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-slate-500 mt-0.5"><Mail size={20} /></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</p>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{profileData?.email || "Not Provided"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
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
                 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">New Password (Optional)</label>
                <input 
                  type="password" 
                  name="password" 
                  placeholder="Leave blank to keep current"
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
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase flex items-center gap-2 transition active:scale-95 disabled:opacity-50"
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