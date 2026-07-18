import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import { Mail, Phone, ShieldCheck, Camera } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);
  const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const formData = new FormData();
  formData.append("profileImage", file);

  const token = localStorage.getItem("token");

  const { data } = await API.put(
    "/profile",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  toast.success(data.message);

  getProfile();
};

  const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await API.get("/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUser(data.profile || data.user);
  } catch (err) {
    console.log(err);
    toast.error("Unable to load profile");
  } finally {
    setLoading(false);
  }
};
  const handleImage= async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("profileImage", file);

      const token = localStorage.getItem("token");

      setUploading(true);

      const { data } = await API.get(
        "/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(data.message);

      await getProfile();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-xl font-semibold">Profile Not Found</h2>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
   
      <div className="h-56 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-700"></div>
          <h1>welcome </h1>

      <div className=" mt-5 px-8 pb-10">

        <div className="-mt-20 relative w-fit">

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
                : `https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff`
            }
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
          />

          <button
            type="button"
            onClick={() => document.getElementById("profileImage").click()}
            disabled={uploading}
            className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition"
          >
            {uploading ? (
              <span className="text-xs">...</span>
            ) : (
              <Camera size={18} />
            )}
          </button>

        </div>

        <div className="mt-6">

          <h1 className="text-4xl font-bold text-gray-800">
            {user.name}
          </h1>

          <p className="text-gray-500 capitalize text-lg mt-1">
            {user.role}
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <div className="bg-gray-50 rounded-xl p-5">

            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Mail size={20} />
              <span className="font-semibold">Email</span>
            </div>

            <p className="text-gray-700 break-all">
              {user.email}
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <div className="flex items-center gap-2 text-green-600 mb-2">
              <Phone size={20} />
              <span className="font-semibold">Mobile</span>
            </div>

            <p className="text-gray-700">
              {user.phoneNumber || user.mobile}
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <div className="flex items-center gap-2 text-purple-600 mb-2">
              <ShieldCheck size={20} />
              <span className="font-semibold">Role</span>
            </div>

            <p className="capitalize text-gray-700">
              {user.role}
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <div className="flex items-center gap-2 text-green-600 mb-2">
              <ShieldCheck size={20} />
              <span className="font-semibold">Status</span>
            </div>

            <p className="text-green-600 font-semibold">
              Verified
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}