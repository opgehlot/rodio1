import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Truck, User, Mail, Lock, Phone } from "lucide-react";
import toast from "react-hot-toast";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await API.post("/auth/register", data);

      setUser(res.data.user);

      toast.success("Registration Successful");

      reset();

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mt-20 min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-white shadow-xl grid md:grid-cols-2">

        {/* Left */}

        <div className="hidden md:flex bg-blue-700 text-white p-10 flex-col justify-center">

          <div className="flex items-center gap-3">

            <Truck size={38} />

            <h1 className="text-4xl font-bold">
              Rodio
            </h1>

          </div>

          <h2 className="text-3xl font-bold mt-8">
            Join India's Trusted
            Transport Network
          </h2>

          <p className="mt-5 text-blue-100 leading-7">

            Register as a Transporter,
            Broker or Shipper and start
            growing your business with Rodio.

          </p>

        </div>

        {/* Right */}

        <div className="p-6 md:p-10">

          <h2 className="text-3xl font-bold">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Fill your details to continue
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* Role */}

            <div>

              <label className="text-sm font-medium">
                I Am A
              </label>

              <select
                {...register("role", {
                  required: "Select Role",
                })}
                className="w-full  border border-gray-300 px-3 h-15 outline-none focus:border-blue-600"
              >
                <option value="">
                  Select Role
                </option>

                <option value="user">
                  Shipper
                </option>

                <option value="transporter">
                  Transporter
                </option>

                <option value="broker">
                  Broker
                </option>

              </select>

              <p className="text-red-500 text-sm mt-1">
                {errors.role?.message}
              </p>

            </div>

            {/* Name */}

            <div>

              <label className="text-sm font-medium">
                Full Name
              </label>

              <div className="flex items-center border border-gray-300 h-15  px-3">

                <User size={18} className="text-gray-400" />

                <input
                  {...register("name", {
                    required: "Name Required",
                    minLength: 3,
                  })}
                  className="w-full ml-3 outline-none"
                  placeholder="Enter full name"
                />

              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.name?.message}
              </p>

            </div>

            {/* Mobile */}

            <div>

              <label className="text-sm font-medium">
                Mobile Number
              </label>

              <div className="flex items-center border border-gray-300 h-15 mt-1 px-3">

                <Phone size={18} className="text-gray-400" />

                <input
                  {...register("mobile", {
                    required: "Mobile Required",
                    minLength: 10,
                    maxLength: 10,
                  })}
                  className="w-full ml-3 outline-none"
                  placeholder="9876543210"
                />

              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.mobile?.message}
              </p>

            </div>

            {/* Email */}

            <div>

              <label className="text-sm font-medium">
                Email
              </label>

              <div className="flex items-center border border-gray-300 h-15 mt-1 px-3">

                <Mail size={18} className="text-gray-400" />

                <input
                  type="email"
                  {...register("email", {
                    required: "Email Required",
                  })}
                  className="w-full ml-3 outline-none"
                  placeholder="example@gmail.com"
                />

              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.email?.message}
              </p>

            </div>
                        {/* Password */}

            <div>

              <label className="text-sm font-medium">
                Password
              </label>

              <div className="flex items-center border border-gray-300 h-15 mt-1 px-3">

                <Lock size={18} className="text-gray-400" />

                <input
                  type="password"
                  {...register("password", {
                    required: "Password Required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  className="w-full ml-3 outline-none"
                  placeholder="********"
                />

              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.password?.message}
              </p>

            </div>

            {/* Confirm Password */}

            <div>

              <label className="text-sm font-medium">
                Confirm Password
              </label>

              <div className="flex items-center border border-gray-300 h-15 mt-1 px-3">

                <Lock size={18} className="text-gray-400" />

                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full ml-3 outline-none"
                  placeholder="********"
                />

              </div>

              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword?.message}
              </p>

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-11 text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">

                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      opacity=".2"
                    />

                    <path
                      fill="currentColor"
                      d="M22 12a10 10 0 0 1-10 10V18a6 6 0 0 0 6-6h4z"
                    />

                  </svg>

                  Registering...

                </div>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="text-center pt-2">

              <p className="text-sm text-gray-600">

                Already have an account?

                <Link
                  to="/login"
                  className="ml-1 text-blue-600 font-semibold hover:underline"
                >
                  Login
                </Link>

              </p>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}