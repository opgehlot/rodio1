import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

export  function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter your email");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message);

      navigate("/resetpassword", {
        state: { email },
      });

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-5">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center">
          Forgot Password
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Enter your registered email.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div className="flex items-center border rounded-lg px-4 py-3">

            <Mail className="text-gray-400 mr-3" />

            <input
              type="email"
              placeholder="Enter Email"
              className="w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader2 className="animate-spin" size={18} />
                Sending...
              </div>
            ) : (
              "Send Reset Code"
            )}
          </button>

        </form>

        <div className="text-center mt-5">
          <Link
            to="/login"
            className="text-blue-600"
          >
            Back to Login
          </Link>
        </div>

      </div>

    </div>
  );
}
export default ForgotPassword;