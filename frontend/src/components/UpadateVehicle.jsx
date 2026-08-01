// src/components/EditVehicle.jsx

import React, { useState, useEffect } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import { Truck, Edit3, Trash2, Plus, X, Save, ShieldAlert } from "lucide-react";

export  function UpadateVehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicleId, setEditingVehicleId] = useState(null);

  // Form states for vehicle popup
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [ton, setTon] = useState("");
  const [bodyType, setBodyType] = useState("");

  const bodyTypes = [
    "Open Body", "Closed Body", "Container", "Trailer", 
    "Tanker", "Refrigerated", "Flatbed", "Semi-Low Bed"
  ];

  // Fetch all vehicles
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/vehicles");
      if (res.data.success) {
        setVehicles(res.data.data);
      }
    } catch (err) {
      console.error("Fetch vehicles error:", err);
      toast.error("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Open modal for Adding New Vehicle
  const handleOpenAddModal = () => {
    setEditingVehicleId(null);
    setVehicleName("");
    setVehicleNumber("");
    setTon("");
    setBodyType("");
    setIsModalOpen(true);
  };

  // Open modal for Editing Vehicle (Popup pre-filled with specific vehicle data)
  const handleOpenEditModal = (vehicle) => {
    setEditingVehicleId(vehicle._id);
    setVehicleName(vehicle.vehicleName || vehicle.name || "");
    setVehicleNumber(vehicle.vehicleNumber || vehicle.number || "");
    setTon(vehicle.ton || vehicle.weight || "");
    setBodyType(vehicle.bodyType || "");
    setIsModalOpen(true);
  };

  // Save or Update Vehicle Handler (Calls /api/vehicles/:id for edit)
  const handleSaveVehicle = async (e) => {
    e.preventDefault();
    if (!vehicleName || !vehicleNumber || !ton || !bodyType) {
      toast.error("Please fill in all vehicle details");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        vehicleName,
        vehicleNumber,
        ton,
        bodyType,
      };

      if (editingVehicleId) {
        // Edit / Update API call with ID: /api/vehicles/:id
        const res = await API.patch(`/api/vehicles/${editingVehicleId}`, payload);
        toast.success(res.data.message || "Vehicle updated successfully");
      } else {
        // Add new vehicle API call
        const res = await API.post("/api/vehicles", payload);
        toast.success(res.data.message || "Vehicle added successfully");
      }

      setIsModalOpen(false);
      fetchVehicles();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Delete Vehicle Handler
  const handleDeleteVehicle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;

    try {
      setLoading(true);
      const res = await API.delete(`/api/vehicles/${id}`);
      toast.success(res.data.message || "Vehicle deleted successfully");
      fetchVehicles();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete vehicle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen py-8 px-4 sm:px-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-orange-600 mb-2">
              <Truck size={14} /> Outlet Fleet Management
            </div>
            <h1 className="text-2xl font-black text-slate-900">Manage Vehicles</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">Add, edit details or remove vehicles from your fleet list.</p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-2xl text-sm flex items-center gap-2 shadow-md transition cursor-pointer"
          >
            <Plus size={18} /> Add New Vehicle
          </button>
        </div>

        {/* Vehicles Display Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.length > 0 ? (
            vehicles.map((v) => (
              <div key={v._id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="bg-orange-50 text-orange-700 text-xs font-extrabold px-3 py-1 rounded-xl uppercase tracking-wider border border-orange-100">
                      {v.bodyType || "Standard Body"}
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl">
                      {v.ton} Ton
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 mt-2">{v.vehicleName || v.name}</h3>
                    <p className="text-sm font-bold text-slate-500 tracking-wide font-mono mt-0.5">{v.vehicleNumber || v.number}</p>
                  </div>
                </div>

                {/* Edit & Delete Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenEditModal(v)}
                    className="flex-1 bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-700 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVehicle(v._id)}
                    className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center transition cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
              <ShieldAlert size={36} className="mx-auto text-slate-400" />
              <p className="text-sm font-bold text-slate-600">No vehicles available in your outlet yet.</p>
              <button
                onClick={handleOpenAddModal}
                className="text-xs bg-orange-50 text-orange-600 font-bold px-4 py-2 rounded-xl border border-orange-200 hover:bg-orange-100 transition cursor-pointer"
              >
                Add Your First Vehicle
              </button>
            </div>
          )}
        </div>

        {/* Edit / Add Vehicle Popup Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
              
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-5 text-white flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Truck size={20} />
                  </div>
                  <h3 className="text-lg font-black">
                    {editingVehicleId ? "Edit Vehicle Details" : "Add New Vehicle"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 bg-white/20 hover:bg-white/30 rounded-xl transition text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSaveVehicle} className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Vehicle Name / Model</label>
                  <input
                    type="text"
                    placeholder="e.g. Tata 1109, Eicher Pro"
                    value={vehicleName}
                    onChange={(e) => setVehicleName(e.target.value)}
                    required
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl px-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Vehicle Number</label>
                  <input
                    type="text"
                    placeholder="e.g. MP04AB1234"
                    value={vehicleNumber}
                    onChange={(e) => setVehicleNumber(e.target.value)}
                    required
                    className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl px-4 text-sm text-slate-800 uppercase tracking-wide font-mono outline-none focus:bg-white focus:border-orange-500 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Weight (Ton)</label>
                    <input
                      type="number"
                      placeholder="e.g. 10"
                      value={ton}
                      onChange={(e) => setTon(e.target.value)}
                      required
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl px-4 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 block">Body Type</label>
                    <select
                      value={bodyType}
                      onChange={(e) => setBodyType(e.target.value)}
                      required
                      className="w-full h-11 bg-slate-50 border border-slate-200 rounded-2xl px-3 text-sm text-slate-800 outline-none focus:bg-white focus:border-orange-500 transition cursor-pointer"
                    >
                      <option value="">Select Body Type</option>
                      {bodyTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-slate-900 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    <Save size={14} /> {editingVehicleId ? "Update Changes" : "Save Vehicle"}
                  </button>
                </div>
              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
export default UpadateVehicle;