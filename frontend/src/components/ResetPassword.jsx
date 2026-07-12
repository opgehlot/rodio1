import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import API from "../api/api";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Verify OTP
  const verifyOTP = async () => {
    if (!otp.trim()) {
      return toast.error("Please enter OTP");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      toast.success(res.data.message || "OTP Verified");

      setOtpVerified(true);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
  const resetPassword = async (e) => {
    e.preventDefault();

    if (!password) {
      return toast.error("Enter new password");
    }

    if (password.length < 4) {
      return toast.error(
        "Password must be at least 4 characters"
      );
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

   try {
  setLoading(true);

  console.log("Sending Reset Request...");
  console.log({
    email,
    password,
    confirmPassword,
  });

  const res = await API.post("/auth/reset", {
    email,
    password,
    confirmPassword,
  });

  console.log("Response:", res.data);

  toast.success(res.data.message);

  navigate("/login");

} catch (err) {
  console.log("Error:", err);
  console.log("Backend Error:", err.response?.data);

  toast.error(
    err.response?.data?.message || "Unable to reset password"
  );
} finally {
  setLoading(false);
}
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="flex justify-center">

          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">

            <ShieldCheck
              size={40}
              className="text-blue-700"
            />

          </div>

        </div>

        <h1 className="text-3xl font-bold text-center mt-5">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Verification code sent to
        </p>

        <p className="text-center font-semibold text-blue-700 mt-1">
          {email}
        </p>

        <form
          onSubmit={resetPassword}
          className="mt-8 space-y-5"
        >

          {/* OTP */}

          <div>

            <label className="font-medium">
              Verification Code
            </label>

            <input
              type="text"
              value={otp}
              disabled={otpVerified}
              onChange={(e) =>
                setOtp(e.target.value)
              }
              placeholder="Enter OTP"
              className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:border-blue-600"
            />

          </div>

          {/* Verify Button */}

          {!otpVerified && (
            <button
              type="button"
              onClick={verifyOTP}
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl"
            >
              {loading ? (
                <div className="flex justify-center gap-2">

                  <Loader2 className="animate-spin" />

                  Verifying...

                </div>
              ) : (
                "Verify OTP"
              )}
            </button>
          )}

          {/* Success */}

          {otpVerified && (

            <div className="flex items-center justify-center gap-2 text-green-600 font-semibold">

              <CheckCircle2 size={20} />

              OTP Verified Successfully

            </div>

          )}

          {/* Password Section */}

          {otpVerified && (
            <>

              <div>

                <label className="font-medium">
                  New Password
                </label>

                <div className="mt-2 flex items-center border rounded-xl px-4">

                  <Lock
                    className="text-gray-400"
                    size={20}
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter New Password"
                    className="w-full py-3 ml-3 outline-none"
                  />

                </div>

              </div>

              <div>

                <label className="font-medium">
                  Confirm Password
                </label>

                <div className="mt-2 flex items-center border rounded-xl px-4">

                  <Lock
                    className="text-gray-400"
                    size={20}
                  />

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(
                        e.target.value
                      )
                    }
                    placeholder="Confirm Password"
                    className="w-full py-3 ml-3 outline-none"
                  />

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
              >
                {loading ? (
                  <div className="flex justify-center gap-2">

                    <Loader2 className="animate-spin" />

                    Resetting...

                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>

            </>
          )}

        </form>

      </div>

    </div>
  );
}