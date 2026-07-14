import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import toast from "react-hot-toast";

export default function Settings() {
  const { user, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",

    companyName: "",
    gstNumber: "",
    address: "",

    agencyName: "",
    officeAddress: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        role: user.role || "",

        companyName: user.companyName || "",
        gstNumber: user.gstNumber || "",
        address: user.address || "",

        agencyName: user.agencyName || "",
        officeAddress: user.officeAddress || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await API.put(
        "/auth/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(data.user);

      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold mb-6">
        Settings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div>
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full border rounded p-3"
          />
        </div>

        <div>
          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border rounded p-3"
          >
            <option value="user">User</option>
            <option value="transporter">Transporter</option>
            <option value="broker">Broker</option>
          </select>
        </div>

        {formData.role === "transporter" && (
          <>
            <div>
              <label>Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label>GST Number</label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border rounded p-3"
                rows="3"
              />
            </div>
          </>
        )}

        {formData.role === "broker" && (
          <>
            <div>
              <label>Agency Name</label>
              <input
                type="text"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleChange}
                className="w-full border rounded p-3"
              />
            </div>

            <div>
              <label>Office Address</label>
              <textarea
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
                className="w-full border rounded p-3"
                rows="3"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading ? "Updating..." : "Update"}
        </button>

      </form>
    </div>
  );
}