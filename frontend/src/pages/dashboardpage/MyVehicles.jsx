
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaTruck,
  FaWeightHanging,
  FaBoxes,
  FaTrash,
  FaEdit,
  FaPlus,
  FaTimes,
  FaSearch,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";
import API from "../../api/api";

export default function MyVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Update Popup
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    _id: "",
    vehicleType: "",
    vehicleNumber: "",
    capacity: "",
    bodyType: "",
  });

  // ==========================
  // GET VEHICLES
  // ==========================

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await API.get("/vehicles/my");
      const list =
        res.data.data ||
        res.data.vehicles ||
        res.data.vehicle ||
        [];

      const validList = Array.isArray(list) ? list : [];
      setVehicles(validList);
      setFilteredVehicles(validList);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to load vehicles from server."
      );
      setVehicles([]);
      setFilteredVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Filter & Search Logic
  useEffect(() => {
    let result = vehicles;
    
    if (filterType !== "All") {
      result = result.filter(
        (v) => v.vehicleType?.toLowerCase() === filterType.toLowerCase()
      );
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.vehicleNumber?.toLowerCase().includes(query) ||
          v.vehicleType?.toLowerCase().includes(query) ||
          v.bodyType?.toLowerCase().includes(query)
      );
    }

    setFilteredVehicles(result);
  }, [searchQuery, filterType, vehicles]);

  // ==========================
  // DELETE
  // ==========================

  const deleteVehicle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle from your fleet?")) return;

    try {
      await API.delete(`/vehicles/${id}`);
      toast.success("Vehicle deleted successfully");

      setVehicles((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to delete vehicle"
      );
    }
  };

  // ==========================
  // OPEN UPDATE POPUP
  // ==========================

  const openUpdate = (vehicle) => {
    setForm({
      _id: vehicle._id,
      vehicleType: vehicle.vehicleType || "",
      vehicleNumber: vehicle.vehicleNumber || "",
      capacity: vehicle.capacity || "",
      bodyType: vehicle.bodyType || "",
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // PATCH UPDATE
  // ==========================

  const updateVehicle = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await API.patch(
        `/vehicles/${form._id}`,
        {
          vehicleType: form.vehicleType,
          vehicleNumber: form.vehicleNumber,
          capacity: form.capacity,
          bodyType: form.bodyType,
        }
      );

      toast.success("Vehicle details updated successfully");
      setShowModal(false);
      fetchVehicles();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Failed to update vehicle"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col justify-center items-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 font-medium tracking-wide">Loading Fleet Management...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* Enterprise Header Banner */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-12 py-6 mb-8">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>
              Rodio Tradelink Logistics Enterprise
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Fleet & Vehicle Management
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Monitor, update, and manage your verified commercial transport units.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 flex items-center gap-2">
              <FaShieldAlt className="text-blue-600" />
              <span>Verified Fleet: <strong className="text-slate-900">{vehicles.length} Units</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="w-full px-6 lg:px-12">

        {/* Toolbar & Filter Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 lg:p-6 mb-8 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by vehicle number, type, or body style..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {["All", "Truck", "Trailer", "Container", "Pickup"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  filterType === type
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

        </div>

        {/* Vehicle Grid / Empty State */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaTruck size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">
              No Vehicles Discovered
            </h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              {searchQuery || filterType !== "All"
                ? "No transport units match your current search criteria or filters."
                : "Your fleet list is currently empty. Registered vehicles will appear here."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Top Details */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-600 transition-colors">
                        <FaTruck size={20} />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-slate-900 text-base">
                            {vehicle.vehicleType || "Commercial Unit"}
                          </h3>
                          <FaCheckCircle className="text-blue-600 text-xs" title="Verified Unit" />
                        </div>
                        <span className="inline-block bg-slate-100 text-slate-700 text-xs font-mono font-semibold px-2 py-0.5 rounded-md mt-1 border border-slate-200">
                          {vehicle.vehicleNumber || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Specs Breakdown */}
                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 mb-6">
                    <div className="flex items-center gap-2.5 text-slate-600 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                        <FaWeightHanging size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Capacity</p>
                        <p className="font-medium text-slate-800 text-xs">{vehicle.capacity || "Standard"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-slate-600 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500">
                        <FaBoxes size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Body Style</p>
                        <p className="font-medium text-slate-800 text-xs">{vehicle.bodyType || "Standard"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => openUpdate(vehicle)}
                    className="flex-1 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 hover:border-transparent py-2.5 rounded-xl font-semibold text-xs flex justify-center items-center gap-2 transition-all shadow-xs"
                  >
                    <FaEdit />
                    Update Profile
                  </button>

                  <button
                    onClick={() => deleteVehicle(vehicle._id)}
                    className="w-10 h-10 bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white border border-rose-200 hover:border-transparent rounded-xl flex justify-center items-center transition-all shadow-xs"
                    title="Delete Vehicle"
                  >
                    <FaTrash size={13} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* ==========================
          UPDATE MODAL (ENTERPRISE STYLE)
      =========================== */}

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex justify-center items-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Update Transport Unit
                </h3>
                <p className="text-xs text-slate-500">
                  Modify specifications for license plate {form.vehicleNumber}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={updateVehicle} className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Vehicle Classification
                </label>
                <select
                  name="vehicleType"
                  value={form.vehicleType}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                >
                  <option value="Truck">Truck</option>
                  <option value="Trailer">Trailer</option>
                  <option value="Container">Container</option>
                  <option value="Pickup">Pickup</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={form.vehicleNumber}
                  onChange={handleChange}
                  placeholder="e.g. MH04AB1234"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono text-slate-800 uppercase focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Load Capacity
                </label>
                <input
                  type="text"
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  placeholder="e.g. 20 Tons / 400 Boxes"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                  Body Configuration
                </label>
                <select
                  name="bodyType"
                  value={form.bodyType}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                >
                  <option value="">Select Configuration</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Container">Container</option>
                </select>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-slate-900 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold text-sm transition-all shadow-sm disabled:opacity-50"
                >
                  {saving ? "Saving Changes..." : "Save Modifications"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}