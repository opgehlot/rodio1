import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../api/api";

export default function Settings() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
    },
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating Profile...");

    try {
      setLoading(true);

      await API.put("/profile", data);

      toast.success("Profile Updated Successfully", {
        id: toastId,
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Update Failed",
        {
          id: toastId,
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (

  <div className="min-h-screen bg-slate-100 px-4 py-10">

    <div className="max-w-3xl mx-auto">

      <h2 className="text-4xl font-bold text-gray-800 mb-2">
        Account Settings
      </h2>

      <p className="text-gray-600 mb-10">
        Update your personal information.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8"
      >

        {/* Name */}

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Full Name
          </label>

          <input
            {...register("name", {
              required: "Name is required",
            })}
            placeholder="Enter your full name"
            className="w-full h-14 px-4 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
          />

          {errors.name && (
            <p className="text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Email Address
          </label>

          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Enter your email"
            className="w-full h-14 px-4 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
          />

          {errors.email && (
            <p className="text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Mobile */}

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Mobile Number
          </label>

          <input
            {...register("mobile")}
            placeholder="Enter mobile number"
            className="w-full h-14 px-4 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold transition"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

      </form>

    </div>

  </div>
  );
}