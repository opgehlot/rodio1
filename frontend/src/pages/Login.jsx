import { useState } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    emailOrMobile: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "emailOrMobile") {
    // Agar first character number hai
    if (/^\d/.test(value)) {
      // Sirf digits aur max 10 digit
      const mobile = value.replace(/\D/g, "").slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        emailOrMobile: mobile,
      }));
    } else {
      // Email ke liye normal input
      setFormData((prev) => ({
        ...prev,
        emailOrMobile: value,
      }));
    }
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};
  // Handle Login
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

      

      const response = await API.post("/auth/login", {
        emailOrMobile: formData.emailOrMobile,
        password: formData.password,
      });
      console.log(response);

  

      // Save Token
      localStorage.setItem("token", response.data.token);

      // Save User
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("role", response.data.user.role);

      toast.success(response.data.message);

      if (response.data.redirectTo) {
        navigate(response.data.redirectTo);
      } else {

        console.log("Response:", response.data);
console.log("Redirect:", response.data.redirectTo);
        navigate("/");
      }
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className=" mt-20 min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl bg-white  shadow-2xl overflow-hidden grid lg:grid-cols-2">
          {/* Left Side */}
          <div className="hidden lg:flex relative bg-gradient-to-br from-blue-900 via-indigo-700 to-blue-500 text-white p-14 flex-col justify-between">
            <div>
              <div className="text-6xl font-bold mb-10">✳</div>

              <h1 className="text-5xl font-bold leading-tight">
                Hello
                <br />
                Rodio! 👋
              </h1>

              <p className="mt-8 text-lg text-blue-100 leading-8 max-w-sm">
                India's Smart Transport Platform connecting customers,
                transporters, brokers and logistics companies on one trusted
                network.
              </p>
            </div>

            <p className="text-blue-200 text-sm">
              © {new Date().getFullYear()} Rodio Transport System
            </p>
          </div>

          {/* Right Side */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>

            <p className="text-gray-500 mt-2 mb-8">
              Login to continue your journey with Rodio.
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div>
                <label className="font-medium text-gray-700">
                  Email / Mobile
                </label>

                <div className="mt-2 flex items-center border-b-2 border-gray-300 focus-within:border-blue-600">
                  <Mail className="text-gray-400 mr-3" size={20} />

                  <input
                    type="text"
                    name="emailOrMobile"
                    value={formData.emailOrMobile}
                    onChange={handleChange}
                    placeholder="Enter Email or Mobile"
                    className="w-full py-3 outline-none"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="font-medium text-gray-700">Password</label>

                <div className="mt-2 flex items-center border-b-2 border-gray-300 focus-within:border-blue-600">
                  <Lock className="text-gray-400 mr-3" size={20} />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="w-full py-3 outline-none"
                  />
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forgotpassword"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-white transition ${
                  loading ? "bg-gray-400" : "bg-gray-90 bg-blue-900/90"
                }`}
              >
                {loading ? (
                  <div className="flex justify-center items-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    Logging In...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-700 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
