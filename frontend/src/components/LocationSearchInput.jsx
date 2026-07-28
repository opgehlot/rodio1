// src/components/WorkingAreas.jsx

import React, { useState, useEffect, useRef } from "react";
import API from "../api/api";
import { Trash2, Plus, MapPin } from "lucide-react";

const WorkingAreas = ({ formData, setFormData }) => {
  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const [dropdownType, setDropdownType] = useState(null); // 'state' or 'city'
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const workingAreas = formData?.workingAreas || [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdownIndex(null);
        setDropdownType(null);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch location suggestions based on input type (state or city search)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim().length >= 1 && activeDropdownIndex !== null) {
        setLoading(true);
        API.get(`/v1/location/search?query=${searchTerm}`)
          .then((res) => {
            if (res.data.success) {
              let results = res.data.data;
              if (dropdownType === 'state') {
                const uniqueStates = [];
                const stateMap = new Set();
                results.forEach((item) => {
                  if (item.state && !stateMap.has(item.state.toLowerCase()) && item.state.toLowerCase().includes(searchTerm.toLowerCase())) {
                    stateMap.add(item.state.toLowerCase());
                    uniqueStates.push({ name: item.state, state: item.state });
                  }
                });
                setSuggestions(uniqueStates);
              } else {
                setSuggestions(results);
              }
            }
          })
          .catch((err) => {
            console.error("Location search error:", err);
          })
          .finally(() => setLoading(false));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, activeDropdownIndex, dropdownType]);

  // Safe update wrapper to avoid crashes if setFormData is missing
  const updateFormData = (updatedWorkingAreas) => {
    if (typeof setFormData === "function") {
      setFormData({
        ...(formData || {}),
        workingAreas: updatedWorkingAreas,
      });
    } else {
      console.warn("setFormData is not passed as a function to WorkingAreas component.");
    }
  };

  // Add a new empty working area block
  const handleAddBlock = () => {
    const areas = [...workingAreas, { state: "", cities: [] }];
    updateFormData(areas);
  };

  // Remove an entire working area card block
  const handleRemoveBlock = (index) => {
    const areas = workingAreas.filter((_, i) => i !== index);
    updateFormData(areas);
  };

  // Handle selecting State from suggestions
  const handleSelectState = (item, blockIndex) => {
    const areas = [...workingAreas];
    areas[blockIndex].state = item.state;
    areas[blockIndex].cities = [];

    updateFormData(areas);

    setSearchTerm("");
    setSuggestions([]);
    setActiveDropdownIndex(null);
    setDropdownType(null);
  };

  // Handle selecting City/Gaon from suggestions (Multiple cities allowed)
  const handleSelectCity = (item, blockIndex) => {
    const cityName = item.name;
    const areas = [...workingAreas];

    if (!areas[blockIndex].state && item.state) {
      areas[blockIndex].state = item.state;
    }

    if (!areas[blockIndex].cities.includes(cityName)) {
      areas[blockIndex].cities.push(cityName);
    }

    updateFormData(areas);

    setSearchTerm("");
    setSuggestions([]);
    setActiveDropdownIndex(null);
    setDropdownType(null);
  };

  // Remove a specific city tag from a state block
  const handleRemoveCity = (blockIndex, cityName) => {
    const areas = [...workingAreas];
    areas[blockIndex].cities = areas[blockIndex].cities.filter((c) => c !== cityName);
    updateFormData(areas);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-orange-100 p-6">
      <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-4 mb-6 text-white flex items-center gap-3 shadow-md">
        <div className="p-2 bg-white/20 rounded-xl">
          <MapPin size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold">Working Areas</h3>
          <p className="text-xs text-orange-100">Select all states and multiple cities where you provide transport services.</p>
        </div>
      </div>

      <div className="space-y-4">
        {workingAreas.map((block, blockIndex) => (
          <div 
            key={blockIndex} 
            className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm relative grid grid-cols-1 md:grid-cols-2 gap-4 items-start"
          >
            {/* 1. STATE INPUT WITH AUTOCOMPLETE */}
            <div className="flex flex-col relative" ref={activeDropdownIndex === blockIndex && dropdownType === 'state' ? dropdownRef : null}>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                State
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select State..."
                  value={activeDropdownIndex === blockIndex && dropdownType === 'state' ? searchTerm : block.state}
                  onFocus={() => {
                    setActiveDropdownIndex(blockIndex);
                    setDropdownType('state');
                    setSearchTerm(block.state || "");
                  }}
                  onChange={(e) => {
                    setActiveDropdownIndex(blockIndex);
                    setDropdownType('state');
                    setSearchTerm(e.target.value);
                    
                    const areas = [...workingAreas];
                    areas[blockIndex].state = e.target.value;
                    updateFormData(areas);
                  }}
                  className="w-full h-[46px] px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 transition"
                />
                {loading && activeDropdownIndex === blockIndex && dropdownType === 'state' && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {activeDropdownIndex === blockIndex && dropdownType === 'state' && suggestions.length > 0 && (
                <ul className="absolute top-full mt-1 w-full bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto z-50 p-2">
                  {suggestions.map((item, i) => (
                    <li
                      key={i}
                      onClick={() => handleSelectState(item, blockIndex)}
                      className="px-3 py-2.5 rounded-lg cursor-pointer hover:bg-orange-50 hover:text-orange-600 text-sm font-semibold"
                    >
                      {item.state}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* 2. CITIES AUTOCOMPLETE FIELD (MULTIPLE CITIES) */}
            <div className="flex flex-col relative" ref={activeDropdownIndex === blockIndex && dropdownType === 'city' ? dropdownRef : null}>
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                Cities
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select Cities (Type to add multiple)..."
                  value={activeDropdownIndex === blockIndex && dropdownType === 'city' ? searchTerm : ""}
                  onFocus={() => {
                    setActiveDropdownIndex(blockIndex);
                    setDropdownType('city');
                    setSearchTerm("");
                  }}
                  onChange={(e) => {
                    setActiveDropdownIndex(blockIndex);
                    setDropdownType('city');
                    setSearchTerm(e.target.value);
                  }}
                  className="w-full h-[46px] px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 outline-none focus:bg-white focus:ring-2 focus:ring-orange-500 transition"
                />
                {loading && activeDropdownIndex === blockIndex && dropdownType === 'city' && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {activeDropdownIndex === blockIndex && dropdownType === 'city' && suggestions.length > 0 && (
                <ul className="absolute top-full mt-1 w-full bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto z-50 p-2">
                  {suggestions.map((item, i) => (
                    <li
                      key={item._id || i}
                      onClick={() => handleSelectCity(item, blockIndex)}
                      className="px-3 py-2 rounded-lg cursor-pointer hover:bg-orange-50 hover:text-orange-600 text-sm flex justify-between items-center"
                    >
                      <div>
                        <strong className="font-semibold">{item.name}</strong>, <small className="text-gray-500">{item.state}</small>
                      </div>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-bold">+ Add</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-1.5 mt-3">
                {block.cities.map((cityName, cIdx) => (
                  <span
                    key={cIdx}
                    className="bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                  >
                    {cityName}
                    <button
                      type="button"
                      onClick={() => handleRemoveCity(blockIndex, cityName)}
                      className="text-red-500 hover:text-red-700 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* REMOVE BLOCK BUTTON */}
            <div className="md:col-span-2 flex justify-end pt-2 border-t border-gray-100 mt-2">
              <button
                type="button"
                onClick={() => handleRemoveBlock(blockIndex)}
                className="text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Trash2 size={14} />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADD WORKING AREA BUTTON */}
      <div className="mt-5">
        <button
          type="button"
          onClick={handleAddBlock}
          className="bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition shadow-sm cursor-pointer"
        >
          <Plus size={16} />
          <span>Add Working Area</span>
        </button>
      </div>
    </div>
  );
};

export default WorkingAreas;