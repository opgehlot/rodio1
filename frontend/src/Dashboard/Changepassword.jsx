// import React from 'react'

// import { useState } from "react";
// import API from "../api/api";
// import toast from "react-hot-toast";

// export  function ChangePassword() {
//   const [formData, setFormData] = useState({
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       return toast.error("Passwords do not match");
//     }

//     try {
//       setLoading(true);

//       const token = localStorage.getItem("token");

//       const { data } = await API.put(
//         "/profile",
//         {
//           password: formData.password,
//           confirmPassword: formData.confirmPassword,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(data.message);

//       setFormData({
//         password: "",
//         confirmPassword: "",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(
//         err.response?.data?.message || "Password update failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl bg-white rounded-xl shadow p-8">

//       <h2 className="text-2xl font-bold mb-6">
//         Change Password
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-5">

//         <div>
//           <label className="block mb-2 font-medium">
//             New Password
//           </label>

//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Enter new password"
//             className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <div>
//           <label className="block mb-2 font-medium">
//             Confirm Password
//           </label>

//           <input
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder="Confirm new password"
//             className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
//         >
//           {loading ? "Updating..." : "Change Password"}
//         </button>

//       </form>

//     </div>
//   );
// }
// export default ChangePassword;
import React from "react";

import { useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export function ChangePassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.put(
        "/profile",
        {
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);

      setFormData({
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Password update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl bg-white rounded-xl shadow p-8">

      <h2 className="text-2xl font-bold mb-6">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            New Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full border rounded-lg p-3 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>

      </form>

    </div>
  );
}

export default ChangePassword;