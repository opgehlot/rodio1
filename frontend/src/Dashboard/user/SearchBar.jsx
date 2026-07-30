// src/components/SearchTransportBar.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationSearchInput from "./LocationSearchInput";
import { Search, MapPin, Truck } from "lucide-react";
import toast from "react-hot-toast";

const SearchTransportBar = () => {
  const navigate = useNavigate();
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [vehicleType, setVehicleType] = useState("");

  const checkUserLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const handleSearch = () => {
    // 1. Check if user is logged in
    if (!checkUserLoggedIn()) {
      toast.error("Please login first to search transport!");
      navigate("/login"); // Redirect to login page instantly
      return;
    }

    // 2. Validate locations
    if (!fromLocation || !toLocation) {
      toast.error("Please select both Origin and Destination locations!");
      return;
    }

    console.log("Search Payload:", {
      from: fromLocation?.name,
      to: toLocation?.name,
      vehicleType,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-6">
      {/* Top Header Section */}
      <div className="text-center mb-6">
        <span className="bg-blue-100 text-blue-700 text-1xl font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          Fast & Reliable Logistics platform
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mt-2">
          Find Verified  Transporters  Instantly
        </h2>
        <p className="text-1xl text-blue-950 mt-1">
          Connect with trusted carriers across cities and villages seamlessly.
        </p>
      </div>

      {/* Main Search Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end relative">
        
        {/* 1. FROM LOCATION SEARCH (ORIGIN) */}
        <div className="flex flex-col">
          <label className="text-xm font-bold text-gray-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <MapPin size={15} className="text-blue-600" />
            From (Origin)
          </label>
          <div className="relative">
            <LocationSearchInput
              placeholder="Enter Gaon or City..."
              onSelectLocation={(data) => setFromLocation(data)}
            />
          </div>
        </div>

        {/* 2. TO LOCATION SEARCH (DESTINATION) */}
        <div className="flex flex-col">
          <label className="text-xm font-bold text-gray-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <MapPin size={15} className="text-emerald-600" />
            To (Destination)
          </label>
          <div className="relative">
            <LocationSearchInput
              placeholder="Enter Gaon or City..."
              onSelectLocation={(data) => setToLocation(data)}
            />
          </div>
        </div>

        {/* 3. VEHICLE TYPE */}
        <div className="flex flex-col">
          <label className="text-xm font-bold text-gray-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Truck size={15} className="text-orange-500" />
            Vehicle Type
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full h-[46px] px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          >
            <option value="">All Vehicles</option>
            <option value="Mini Truck">Mini Truck</option>
            <option value="Pickup">Pickup</option>
            <option value="Tata Ace">Tata Ace</option>
            <option value="Bolero Pickup">Bolero Pickup</option>
            <option value="Mahindra Jeeto">Mahindra Jeeto</option>
            <option value="Ashok Leyland Dost">Ashok Leyland Dost</option>
            <option value="Tempo">Tempo</option>
            <option value="Canter">Canter</option>
            <option value="Eicher">Eicher</option>
            <option value="Truck">Truck</option>
            <option value="LCV">LCV</option>
            <option value="HCV">HCV</option>
            <option value="14 Feet Truck">14 Feet Truck</option>
            <option value="17 Feet Truck">17 Feet Truck</option>
            <option value="19 Feet Truck">19 Feet Truck</option>
            <option value="20 Feet Container">20 Feet Container</option>
            <option value="32 Feet Container">32 Feet Container</option>
            <option value="Trailer">Trailer</option>
            <option value="Flat Bed Trailer">Flat Bed Trailer</option>
            <option value="Low Bed Trailer">Low Bed Trailer</option>
            <option value="Semi Trailer">Semi Trailer</option>
            <option value="Tipper">Tipper</option>
          </select>
        </div>

        {/* SEARCH BUTTON */}
        <div>
          <button
            onClick={handleSearch}
            className="w-full h-[46px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
          >
            <Search size={18} />
            <span>Search Transport</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default SearchTransportBar;