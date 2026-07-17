import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import API from "../api/api";

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      role: "user",
      companyName: "",
      gstNumber: "",
      address: "",
      agencyName: "",
      officeAddress: "",
    },
  });

  const role = watch("role");

const onSubmit = async (data) => {

  if (data.role === "transporter") {
    window.location.href = "/register";
    return;
  }

  if (data.role === "broker") {
    window.location.href = "/register";
    return;
  }

  const toastId = toast.loading("Updating Profile...");

  try {

    setLoading(true);

    await API.put("/profile", data);

    toast.success("Profile Updated Successfully", {
      id: toastId,
    });

  } catch (err) {

    toast.error("Update Failed", {
      id: toastId,
    });

  } finally {

    setLoading(false);

  }

};

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-xl p-8 mt-8">

      <h2 className="text-3xl font-bold mb-6">
        Account Settings
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* Name */}

        <div>
          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            {...register("name", {
              
            })}
            className="w-full border rounded-lg p-3"
            placeholder="Enter Name"
          />

          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            {...register("email", {
            
            })}
            className="w-full border rounded-lg p-3"
            placeholder="Enter Email"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Mobile */}

        <div>
          <label className="block mb-2 font-medium">
            Mobile
          </label>

          <input
            {...register("mobile")}
            className="w-full border rounded-lg p-3"
            placeholder="Enter Mobile"
          />
        </div>

        {/* Role */}

        <div>
          <label className="block mb-2 font-medium">
            Select Role
          </label>

          <select
            {...register("role")}
            className="w-full border rounded-lg p-3"
          >
            <option value="user">User</option>
            <option value="transporter">Transporter</option>
            <option value="broker">Broker</option>
          </select>
        </div>

        {/* Transporter */}

        {role === "transporter" && (
          <div className="space-y-4 border rounded-lg p-5 bg-gray-50">

            <h3 className="font-bold text-lg">
              Transporter Details
            </h3>

            <input
              {...register("companyName")}
              placeholder="Company Name"
              className="w-full border rounded-lg p-3"
            />

            <input
              {...register("gstNumber")}
              placeholder="GST Number"
              className="w-full border rounded-lg p-3"
            />

            <textarea
              {...register("address")}
              rows={3}
              placeholder="Company Address"
              className="w-full border rounded-lg p-3"
            />

          </div>
        )}

        {/* Broker */}

        {role === "broker" && (
          <div className="space-y-4 border rounded-lg p-5 bg-gray-50">

            <h3 className="font-bold text-lg">
              Broker Details
            </h3>

            <input
              {...register("agencyName")}
              placeholder="Agency Name"
              className="w-full border rounded-lg p-3"
            />

            <textarea
              {...register("officeAddress")}
              rows={3}
              placeholder="Office Address"
              className="w-full border rounded-lg p-3"
            />

          </div>
        )}

      <button
  type="submit"
  disabled={loading}
  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-200 ${
    loading
      ? "bg-blue-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 text-white"
  }`}
>
  {loading ? (
    <>
      <svg
        className="w-5 h-5 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      Loading...
    </>
  ) : role === "user" ? (
    "Update Profile"
  ) : (
    "Continue"
  )}
</button>
      </form>

    </div>
  );
}