
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
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

    console.log("Sending:", formData);

    const response = await API.post("/auth/login", {
      emailOrMobile: formData.emailOrMobile,
      password: formData.password,
    });

    console.log("Response:", response.data);

    // Save Token
    localStorage.setItem("token", response.data.token);

    // Save User
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("role", response.data.user.role);

    toast.success(response.data.message);

   if (response.data.redirectTo) {
  navigate(response.data.redirectTo);
} else {
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
   
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
       <Navbar/>

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email / Mobile */}
          <div>
            <label className="block mb-2 font-medium">
              Email / Mobile
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <Mail className="mr-3 text-gray-400" size={20} />

              <input
                type="text"
                name="emailOrMobile"
                value={formData.emailOrMobile}
                onChange={handleChange}
                placeholder="Enter Email or Mobile"
                className="w-full outline-none"
                autoComplete="username"
              />

            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="flex items-center border rounded-xl px-4 py-3">

              <Lock className="mr-3 text-gray-400" size={20} />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full outline-none"
                autoComplete="current-password"
              />

            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold flex justify-center items-center gap-2 transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Logging In...
              </>
            ) : (
              "Login"
            )}
          </button>

        </form>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-orange-500 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}
