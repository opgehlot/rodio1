import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import { 
  Mail, 
  Phone, 
  ShieldCheck, 
  Camera, 
  User, 
  Building2, 
  CheckCircle2, 
  Clock 
} from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  // Fetch Live Profile from API
  const getProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Session expired. Please login again.");
        return;
      }

      const { data } = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.profile || data.user || data.data);
    } catch (err) {
      console.error("Profile API Error:", err);
      toast.error(err.response?.data?.message || "Unable to load profile data");
    } finally {
      setLoading(false);
    }
  };

  // Upload Profile Image
  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("profileImage", file);

      const token = localStorage.getItem("token");

      setUploading(true);

      const { data } = await API.put("/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(data.message || "Profile picture updated successfully");
      await getProfile(); // Refresh live data
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error(err.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[300px] flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-200">
        <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
        <p className="text-slate-600 font-bold text-sm mt-3">Loading Profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full p-8 bg-white rounded-3xl border border-slate-200 text-center">
        <User size={40} className="text-slate-300 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-800">Profile Not Found</h2>
        <p className="text-xs text-slate-500 mt-1">
          Unable to fetch account information from backend services.
        </p>
      </div>
    );
  }

  const isVerified = user.isVerified || user.status === "active" || Boolean(user.email);

  return (
    <div className="w-full font-sans">
      {/* Full Size Profile Main Card */}
      <div className="w-full bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Profile Avatar & Header Info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Avatar Upload Container */}
            <div className="relative shrink-0">
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              <img
                src={
                  user.profileImage
                    ? user.profileImage
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name || "User"
                      )}&background=ea580c&color=fff&size=256`
                }
                alt={user.name || "User Profile"}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl border-4 border-white shadow-md object-cover ring-2 ring-slate-200"
              />

              <button
                onClick={() => document.getElementById("profileImage").click()}
                disabled={uploading}
                className="absolute -bottom-2 -right-2 bg-slate-900 hover:bg-orange-600 text-white p-2.5 rounded-2xl shadow-lg transition-all duration-200 border-2 border-white"
                title="Upload new picture"
              >
                {uploading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Camera size={16} />
                )}
              </button>
            </div>

            {/* Name and Designation */}
            <div className="text-center sm:text-left space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-600 mb-1 capitalize">
                <ShieldCheck size={14} />
                {user.role || "Transporter"} Account
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 capitalize">
                {user.name || "User Name"}
              </h1>
              <p className="text-xs text-slate-500">
                Click the camera icon on avatar to update profile photo
              </p>
            </div>
          </div>

          {/* Account Status Badge */}
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-4 py-3 rounded-2xl shrink-0 shadow-sm w-full sm:w-auto justify-center">
            {isVerified ? (
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                <CheckCircle2 size={22} />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                <Clock size={22} />
              </div>
            )}
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Status</p>
              <p className={`text-sm font-black ${isVerified ? "text-emerald-600" : "text-amber-600"}`}>
                {isVerified ? "Verified Account" : "Pending Verification"}
              </p>
            </div>
          </div>

        </div>

        {/* User Details Full Width Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Email */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60 space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Mail size={16} className="text-orange-500" /> Email Address
            </div>
            <p className="text-sm font-bold text-slate-800 break-all pt-1">
              {user.email || "N/A"}
            </p>
          </div>

          {/* Mobile */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60 space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Phone size={16} className="text-orange-500" /> Phone Number
            </div>
            <p className="text-sm font-bold text-slate-800 pt-1">
              {user.phoneNumber || user.mobile || user.phone || "Not Provided"}
            </p>
          </div>

          {/* Role */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60 space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <Building2 size={16} className="text-orange-500" /> User Role
            </div>
            <p className="text-sm font-bold text-slate-800 capitalize pt-1">
              {user.role || "Transporter"}
            </p>
          </div>

          {/* Status */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/60 space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={16} className="text-orange-500" /> Security Status
            </div>
            <p className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 pt-1">
              <CheckCircle2 size={16} /> Active & Secured
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}