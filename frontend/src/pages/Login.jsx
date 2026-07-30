import { useContext, useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2, Truck, Sparkles, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

// Auth Context
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  // ==========================================
  // AUTH CONTEXT
  // ==========================================

  const { setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "emailOrMobile") {
      // Agar first character number hai
      if (/^\d/.test(value)) {
        const mobile = value.replace(/\D/g, "").slice(0, 10);

        setFormData((prev) => ({
          ...prev,
          emailOrMobile: mobile,
        }));
      } else {
        // Email
        setFormData((prev) => ({
          ...prev,
          emailOrMobile: value,
        }));
      }

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.emailOrMobile.trim()) {
      toast.error("Please enter Email or Mobile");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Please enter Password");
      return;
    }

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", {
        emailOrMobile: formData.emailOrMobile.trim(),

        password: formData.password,
      });

      console.log("LOGIN RESPONSE:", data);
      console.log("LOGIN USER:", data.user);
      console.log("LOGIN MOBILE:", data.user?.mobile);

      // ======================================
      // CHECK RESPONSE
      // ======================================

      if (!data?.token) {
        toast.error("Token not received from server");
        return;
      }

      if (!data?.user) {
        toast.error("User data not received from server");
        return;
      }

      // ======================================
      // SAVE TOKEN
      // ======================================

      localStorage.setItem("token", data.token);

      // ======================================
      // IMPORTANT:
      // SAVE USER IN AUTH CONTEXT
      // ======================================

      setUser(data.user);

      // AuthContext itself can persist user,
      // but keeping this is also fine.
      localStorage.setItem("user", JSON.stringify(data.user));

      // ======================================
      // ROLE
      // ======================================

      if (data.user?.role) {
        localStorage.setItem("role", data.user.role);
      }

      // ======================================
      // BUSINESS ID
      // ======================================

      if (data.businessId) {
        localStorage.setItem("businessId", data.businessId);
      } else {
        localStorage.removeItem("businessId");
      }

      // ======================================
      // SUCCESS
      // ======================================

      toast.success(data.message || "Login Successful");

      // ======================================
      // REDIRECT
      // ======================================

     navigate(data.redirectTo || "/dashboard", { replace: true });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("Server not responding");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="pt-[70px] w-full bg-white flex flex-col lg:flex-row">
        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}
        <div className="hidden lg:flex lg:w-1/2 bg-white p-16 flex-col justify-between items-center text-center border-r border-slate-100">
          {/* BRAND */}
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
              <Truck size={32} />
            </div>
            <span className="text-2xl font-semibold tracking-widest text-slate-800">
              RODIO
            </span>
          </div>

          {/* CONTENT */}
          <div className="my-auto py-12 max-w-lg space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wider uppercase">
              <Sparkles size={14} />
              WELCOME BACK
            </div>
            <h2 className="text-4xl xl:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              Continue Your Journey with{" "}
              <span className="text-blue-600">RODIO</span>
            </h2>
            <p className="text-slate-500 text-base font-medium leading-relaxed">
              The smart transport platform connecting transporters, brokers,
              shippers, and businesses across India.
            </p>
          </div>

          {/* COPYRIGHT */}
          <div className="text-xs font-medium text-slate-400 uppercase tracking-widest">
            © {new Date().getFullYear()} RODIO. ALL RIGHTS RESERVED.
          </div>
        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:py-16 lg:px-20 bg-white">
          <div className="w-full max-w-md">
            {/* MOBILE LOGO */}
            <div className="flex lg:hidden items-center gap-2.5 mb-6 text-slate-900">
              <div className="p-2.5 bg-blue-600 rounded-xl text-white">
                <Truck size={24} />
              </div>
              <span className="text-xl font-semibold tracking-widest text-slate-800">
                RODIO
              </span>
            </div>

            {/* TITLE */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Login to Account
              </h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">
                Enter your details to continue.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* EMAIL / MOBILE */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email / Mobile
                </label>
                <div className="flex items-center bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 focus-within:border-blue-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-600/10 transition-all">
                  <Mail size={20} className="text-slate-400 flex-shrink-0" />
                  <input
                    type="text"
                    name="emailOrMobile"
                    value={formData.emailOrMobile}
                    onChange={handleChange}
                    placeholder="Enter Email or Mobile"
                    className="w-full bg-transparent ml-3 text-base font-medium text-slate-800 placeholder:text-slate-400 outline-none"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="flex items-center bg-slate-50 border-2 border-slate-200 rounded-xl px-4 py-4 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/10">
                  <Lock size={20} className="text-slate-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="w-full bg-transparent ml-3 text-base font-medium text-slate-800 outline-none"
                    autoComplete="current-password"
                  />
                </div>
              </div>

              {/* FORGOT PASSWORD */}
              <div className="text-right">
                <Link
                  to="/forgotpassword"
                  className="text-sm font-semibold text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    LOGGING IN...
                  </>
                ) : (
                  <>
                    LOGIN
                    <ArrowRight size={19} />
                  </>
                )}
              </button>
            </form>

            {/* REGISTER LINK */}
            <div className="text-center pt-8">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
