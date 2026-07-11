import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Lock, Loader2 } from "lucide-react";
import API from "../api/api";
import toast from "react-hot-toast";

export function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!otp)
      return toast.error("Enter verification code");

    if (!password)
      return toast.error("Enter new password");

    try {
      setLoading(true);

      const res = await API.post("/auth/reset-password", {
        email,
        otp,
        password,
      });

      toast.success(res.data.message);

      navigate("/login");

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
          Reset Password
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Verification sent to
          <br />
          <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleReset} className="mt-8 space-y-5">

          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full border rounded-lg px-4 py-3 outline-none"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <div className="flex items-center border rounded-lg px-4 py-3">

            <Lock className="text-gray-400 mr-3"/>

            <input
              type="password"
              placeholder="New Password"
              className="w-full outline-none"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            {loading ? (
              <div className="flex justify-center gap-2">
                <Loader2 className="animate-spin"/>
                Resetting...
              </div>
            ) : (
              "Reset Password"
            )}
          </button>

        </form>

      </div>

    </div>
  );
}
export  default ResetPassword;