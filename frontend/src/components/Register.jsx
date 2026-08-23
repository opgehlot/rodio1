import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  Truck,
  Lock,
  Phone,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  Building2,
} from "lucide-react";

import API from "../api/api";
import { AuthContext } from "../context/AuthContext";

const roleOptions = [
  {
    value: "user",
    label: "User / Manufacturer / Trader / Shipper / Other",
  },
  {
    value: "transporter",
    label: "Transporter (Service Provider)",
  },
  {
    value: "fleet_owner",
    label: "Fleet Owner",
  },
  {
    value: "cha_agent",
    label: "CHA Agent (Custom House Agent)",
  },
  {
    value: "courier",
    label: "Courier / Cargo Carrier",
  },
  {
    value: "bus_service",
    label: "Bus Service",
  },
  {
    value: "travel_taxi",
    label: "Travel & Taxi Service",
  },
  {
    value: "truck_body_builder",
    label: "Bus / Truck Body Builder",
  },
  {
    value: "rto_agent",
    label: "RTO Agent",
  },
  {
    value: "finance_company",
    label: "Finance Company",
  },
  {
    value: "finance_agent",
    label: "Finance Agent",
  },
  {
    value: "packers_movers",
    label: "Packers & Movers",
  },
  {
    value: "insurance_company",
    label: "Insurance Company",
  },
  {
    value: "car_carrier",
    label: "Car Carrier",
  },
  {
    value: "miningvehicle_supplier",
    label: "Mining Vehicle Supplier",
  },
  {
    value: "partstypesbettry_supplier",
    label: "Parts & Battery Supplier",
  },
  {
    value: "mechanic and service center",
    label: "Mechanic & Service Center",
  },
  {
    value: "biketexiauto",
    label: "Bike Taxi Auto",
  },
  {
    value: "candfagent",
    label: "C&F Agent",
  },
];

export function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ==========================
  // AUTH CONTEXT
  // ==========================
  const { login, setUser, setRegisterData } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "",
      firmName: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  // ====================================
  // REGISTER SUBMIT
  // ====================================
  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const payload = {
        role: formData.role,
        firmName: formData.firmName,
        mobile: formData.mobile.replace(/\D/g, "").slice(0, 10),
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      const response = await API.post("/auth/register", payload);

      const data = response.data || response;
      console.log("SERVER SE KYA AA RAHA HAI:", data);
      console.log("TOKEN KI VALUE:", data.token);

      console.log("Full API Response Data:", data);

      if (!data.success) {
        toast.error(data.message || "Registration Failed", {
          id: "resitration field",
        });
        return;
      }

      // 1. Safe Token Save (👇 Yeh line token save karegi)
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // 2. Safe Business ID Save
      if (data.businessId) {
        localStorage.setItem("businessId", data.businessId);
      } else {
        localStorage.removeItem("businessId");
      }

      // 3. Safe Subscription Details Save
      if (data.subscription) {
        localStorage.setItem("subscription", JSON.stringify(data.subscription));
      } else {
        localStorage.removeItem("subscription");
      }

      if (data.isSubscriptionActive !== undefined) {
        localStorage.setItem(
          "isSubscriptionActive",
          JSON.stringify(data.isSubscriptionActive),
        );
      }

      // 4. Safe User Data & Role Save
      if (data.user) {
        const normalizedUser = {
          ...data.user,
          id: data.user.id || data.user._id,
        };

        setUser(normalizedUser);
        login(normalizedUser, data.token);

        if (typeof setRegisterData === "function") {
          setRegisterData(normalizedUser);
        }

        if (normalizedUser.role) {
          localStorage.setItem("role", normalizedUser.role);
        }
      }

      toast.success(data.message || "Registration Successful", {
        id: "registration scuccessful",
      });
      reset();
      const returnTo = location.state?.returnTo || location.state?.redirectTo;
      navigate(returnTo || data.redirectTo || "/", {
        replace: true,
      });
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Registration Failed",
        {
          id: "registration failed",
        },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[70px] w-full bg-white flex flex-col lg:flex-row">
      {/* LEFT SIDE BANNER */}
      <div className="hidden lg:flex lg:w-1/2 bg-white p-16 flex-col justify-between items-center text-center border-r border-slate-100">
        {/* <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
            <Truck size={32} />
          </div>
          <span className="text-2xl font-semibold tracking-widest text-slate-800">
            RODIO
          </span>
        </div> */}

        <div className="my-auto py-12 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-widest uppercase">
            <Sparkles size={14} />
            JOIN THE REVOLUTION
          </div>

          <h2 className="text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Scale Your Logistics Business with{" "}
            <span className="text-blue-600">RODIO</span>
          </h2>

          <p className="text-slate-500 text-base font-medium leading-relaxed">
            The smart transport platform connecting transporters, brokers,
            shippers, and businesses across India.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 uppercase tracking-wider">
              <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
              <span>SECURE REGISTRATION</span>
            </div>

            <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-600 uppercase tracking-wider">
              <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <ArrowRight size={16} />
              </div>
              <span>GET STARTED</span>
            </div>
          </div>
        </div>

        <div className="text-xs font-medium text-slate-400 uppercase tracking-widest">
          © {new Date().getFullYear()} RODIO. ALL RIGHTS RESERVED.
        </div>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:py-16 lg:px-20 bg-white">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center gap-2.5 mb-6 text-slate-900">
            <div className="p-2.5 bg-blue-600 rounded-xl text-white">
              <Truck size={24} />
            </div>
            <span className="text-2xl font-semibold tracking-widest">
              RODIO
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              Create Account
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Enter your details to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ROLE */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                I am a
              </label>
              <select
                {...register("role", {
                  required: "PLEASE SELECT A ROLE",
                })}
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base font-medium focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 transition-all cursor-pointer"
              >
                <option value="">Select Role</option>
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500 text-xs mt-2 font-semibold uppercase">
                  {errors.role.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Firm Name
              </label>

              <div className="flex items-center bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-600/10 transition-all">
                <Building2 size={20} className="text-slate-400 flex-shrink-0" />

                <input
                  type="text"
                  placeholder="Enter firm name"
                  className="w-full bg-transparent ml-3 text-base font-medium placeholder:text-slate-400 outline-none"
                  {...register("firmName", {
                    required: "FIRM NAME IS REQUIRED",
                    minLength: {
                      value: 2,
                      message: "FIRM NAME MUST BE AT LEAST 2 CHARACTERS",
                    },
                  })}
                />
              </div>

              {errors.firmName && (
                <p className="text-red-500 text-xs mt-2 font-semibold uppercase">
                  {errors.firmName.message}
                </p>
              )}
            </div>

            {/* MOBILE */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mobile Number
              </label>
              <div className="flex items-center bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-600/10 transition-all">
                <Phone size={20} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Enter 10-digit mobile number"
                  className="w-full bg-transparent ml-3 text-base font-medium placeholder:text-slate-400 outline-none"
                  {...register("mobile", {
                    required: "MOBILE NUMBER IS REQUIRED",
                    pattern: {
                      value: /^[6-9][0-9]{9}$/,
                      message: "ENTER A VALID MOBILE NUMBER",
                    },
                  })}
                  onInput={(e) => {
                    e.target.value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                  }}
                />
              </div>
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-2 font-semibold uppercase">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="flex items-center bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/10">
                <Lock size={20} className="text-slate-400 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  maxLength={8}
                  placeholder="ENTER 4 TO 8 CHARACTER PASSWORD"
                  className="w-full bg-transparent ml-3 text-base font-medium outline-none"
                  {...register("password", {
                    required: "PASSWORD IS REQUIRED",
                    minLength: {
                      value: 4,
                      message: "PASSWORD MUST BE AT LEAST 4 CHARACTERS",
                    },
                    maxLength: {
                      value: 8,
                      message: "PASSWORD CANNOT EXCEED 8 CHARACTERS",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none ml-2"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-2 font-semibold uppercase">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="flex items-center bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/10">
                <Lock size={20} className="text-slate-400 flex-shrink-0" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  maxLength={8}
                  placeholder="RE-ENTER PASSWORD"
                  className="w-full bg-transparent ml-3 text-base font-medium outline-none"
                  {...register("confirmPassword", {
                    required: "PLEASE CONFIRM YOUR PASSWORD",
                    validate: (value) =>
                      value === password || "PASSWORDS DO NOT MATCH",
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-slate-400 hover:text-slate-600 focus:outline-none ml-2"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-2 font-semibold uppercase">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl text-sm tracking-widest uppercase shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  CREATING ACCOUNT...
                </>
              ) : (
                <>
                  CREATE ACCOUNT
                  <ArrowRight size={19} />
                </>
              )}
            </button>

            {/* LOGIN LINK */}
            <div className="text-center pt-3">
              <p className="text-lg text-slate-700 font-medium">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-red-500 text-xl font-bold hover:underline animate-pulse transition-all duration-700"
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
export default Register;
