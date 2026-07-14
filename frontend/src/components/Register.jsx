import { useState, useContext } from "react";
import axios from "axios";
import API from "../api/api";
import { User, Mail, Lock, Truck, Phone, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
export function Register() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      console.log("Sending Data:", formData);
    

      const res = await API.post(
      "auth/register",
        formData,
        
      );
        console.timeEnd("Register");
        setUser(res.data.user);

      console.log(res.data);

      toast.error("Registration Successful!");

      setFormData({
        name: "",
        email: "",
        mobile: "",
          role: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error.response?.data);

      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" mt-50 min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-blue-600 text-white p-10 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <Truck size={40} />
            <h1 className="text-4xl font-bold">Rodio</h1>
          </div>

          <h2 className="text-3xl font-bold">Create Your Account</h2>

          <p className="mt-4 text-blue-100">
            Register as a Broker, Transporter or Contractor and start finding
            transport opportunities.
          </p>
        </div>

        {/* Right Side */}
        <div className="p-10">
          <h2 className="text-3xl font-bold">Register</h2>

          <form className="space-y-5 mt-8" onSubmit={handleRegister}>
            <div>
  <label>I am a</label>

  <div className="mt-2">
    <select
      name="role"
      value={formData.role}
      onChange={handleChange}
      className="w-full border rounded-xl px-4 py-3 outline-none"
      required
    >
      <option value="">Select Role</option>
      <option value="user">user</option>
      <option value="transporter">Transporter</option>
      <option value="broker">Broker</option>
    </select>
  </div>
</div>
            {/* Name */}
            <div>
              <label>Name</label>

              <div className="flex items-center border rounded-xl px-4 py-3 mt-2">
                <User className="mr-3 text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="w-full outline-none"
                  
                  minLength={3}
                  required
                />
              </div>
            </div>
            <div>
              <label>Mobile Number</label>

              <div className="flex items-center border rounded-xl px-4 py-3 mt-2">
                <Phone className="mr-3 text-gray-400" />

                <input
                  type="tel"
                  name="mobile"
                
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                  className="w-full outline-none"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label>Email</label>

              <div className="flex items-center border rounded-xl px-4 py-3 mt-2">
                <Mail className="mr-3 text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  className="w-full outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label>Password</label>

              <div className="flex items-center border rounded-xl px-4 py-3 mt-2">
                <Lock className="mr-3 text-gray-400" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full outline-none"
                />
              </div>
            </div>
            <div>
              <label>Confirm Password</label>

              <div className="flex items-center border rounded-xl px-4 py-3 mt-2">
                <Lock className="mr-3 text-gray-400" />

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline"
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
