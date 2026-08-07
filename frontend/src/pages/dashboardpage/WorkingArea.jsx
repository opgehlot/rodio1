
import React, { useState, useEffect, useRef } from "react";
import API from "../../api/api";
import { Plus, Trash2, MapPin, Map, Loader2, ShieldCheck, CheckCircle2, Globe2, ArrowRight } from "lucide-react";

// ===============================
// List of Indian States for Autocomplete
// ===============================
const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry"
];

// ===============================
// StateSearchInput Component
// ===============================
const StateSearchInput = ({ placeholder, onSelectState, zIndex, value }) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      const filtered = INDIAN_STATES.filter((state) =>
        state.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchTerm]);

  const handleSelect = (stateName) => {
    setSearchTerm(stateName);
    setIsOpen(false);
    onSelectState(stateName);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%", zIndex: isFocused ? zIndex : 1 }}>
      <div className="relative flex items-center">
        <Map size={18} className="absolute left-3.5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onFocus={() => {
            setIsFocused(true);
            if (searchTerm.trim().length > 0) setIsOpen(true);
          }}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onSelectState(e.target.value);
            setIsOpen(true);
          }}
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all placeholder:font-normal placeholder:text-slate-400"
          required
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="suggestions-list absolute top-full left-0 right-0 bg-white border border-slate-200 shadow-lg rounded-xl mt-1.5 max-h-60 overflow-y-auto z-50 list-none m-0 p-0">
          {suggestions.map((state, i) => (
            <li
              key={i}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(state)}
              className="px-4 py-3 cursor-pointer hover:bg-orange-50/50 text-sm transition font-medium text-slate-700 border-b border-slate-100 last:border-b-0"
            >
              {state}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// ===============================
// LocationSearchInput Component (For Cities)
// ===============================
const LocationSearchInput = ({ placeholder, onSelectLocation, zIndex, value }) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSearchTerm(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        setLoading(true);
        API.get(`/location/search?query=${searchTerm}`)
          .then((res) => {
            if (res.data.success) {
              setSuggestions(res.data.data);
              setIsOpen(true);
            }
          })
          .catch((err) => {
            console.error("Location search error:", err);
          })
          .finally(() => setLoading(false));
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSelect = (item) => {
    setSearchTerm(item.name);
    setIsOpen(false);
    onSelectLocation(item);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%", zIndex: isFocused ? zIndex : 1 }}>
      <div className="relative flex items-center">
        <MapPin size={18} className="absolute left-3.5 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600/20 focus:border-orange-600 transition-all placeholder:font-normal placeholder:text-slate-400"
          required
        />
      </div>

      {loading && (
        <div className="absolute right-3.5 top-3.5 text-slate-400 text-xs">
          Loading...
        </div>
      )}

      {isOpen && (suggestions.length > 0 || !loading) && (
        <ul className="suggestions-list absolute top-full left-0 right-0 bg-white border border-slate-200 shadow-lg rounded-xl mt-1.5 max-h-60 overflow-y-auto z-50 list-none m-0 p-0">
          {suggestions.length > 0 ? (
            suggestions.map((item, i) => (
              <li
                key={item._id || i}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(item)}
                className="px-4 py-3 cursor-pointer hover:bg-orange-50/50 text-sm flex justify-between items-center transition border-b border-slate-100 last:border-b-0"
              >
                <div>
                  <span className="font-semibold text-slate-800">{item.name}</span>, <small className="text-slate-500 font-medium">{item.state}</small>
                </div>
                <span className="text-[11px] font-semibold bg-orange-50 text-orange-600 px-2.5 py-1 rounded-lg border border-orange-100">Select</span>
              </li>
            ))
          ) : (
            <li className="px-4 py-4 text-slate-500 text-center text-xs font-medium">
              No matching cities found in registry
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

// ===============================
// Main WorkingArea Component
// ===============================
const WorkingArea = () => {
  const [formData, setFormData] = useState({
    workingAreas: [
      {
        state: "",
        cities: [""],
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleStateChange = (index, value) => {
    const updated = [...formData.workingAreas];
    updated[index].state = value;
    setFormData({ ...formData, workingAreas: updated });
  };

  const handleCitySelect = (areaIndex, cityIndex, selectedLocation) => {
    const updated = [...formData.workingAreas];
    updated[areaIndex].cities[cityIndex] = selectedLocation.name;

    if (!updated[areaIndex].state && selectedLocation.state) {
      updated[areaIndex].state = selectedLocation.state;
    }

    setFormData({ ...formData, workingAreas: updated });
  };

  const addWorkingArea = () => {
    setFormData({
      ...formData,
      workingAreas: [
        ...formData.workingAreas,
        { state: "", cities: [""] },
      ],
    });
  };

  const removeWorkingArea = (index) => {
    const updated = [...formData.workingAreas];
    updated.splice(index, 1);
    setFormData({ ...formData, workingAreas: updated });
  };

  const addCity = (index) => {
    const updated = [...formData.workingAreas];
    updated[index].cities.push("");
    setFormData({ ...formData, workingAreas: updated });
  };

  const removeCity = (areaIndex, cityIndex) => {
    const updated = [...formData.workingAreas];
    updated[areaIndex].cities.splice(cityIndex, 1);

    if (updated[areaIndex].cities.length === 0) {
      updated[areaIndex].cities.push("");
    }

    setFormData({ ...formData, workingAreas: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await API.put("/business/working-areas", formData);
      
      if (response.data) {
        setMessage({
          type: "success",
          text: "Working areas successfully saved!",
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      
      {/* Enterprise Header Banner */}
      <div className="bg-white border-b border-slate-200 px-6 lg:px-12 py-6 mb-8">
        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-600 mb-1">
              <span className="w-2 h-2 rounded-full bg-orange-600 inline-block"></span>
              Rodio Tradelink Logistics Enterprise
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
              Operational Working Areas
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Specify the commercial states and service hubs where your transport fleet operates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 flex items-center gap-2">
              <ShieldCheck className="text-orange-600 w-4 h-4" />
              <span>Coverage Registry: <strong className="text-slate-900">Active</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Fluid Container (Fully spanning layout with grid integration) */}
      <div className="w-full px-6 lg:px-12">
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Section (Spans 8 columns on large screens) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
            
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-sm">
                  <Globe2 size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Territory Mapping Configuration
                  </h3>
                  <p className="text-xs text-slate-500">
                    Add state sectors and specific city nodes for freight distribution.
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-orange-600 font-semibold bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                <CheckCircle2 size={14} /> Multi-State Network
              </div>
            </div>

            {/* Status Message Display */}
            {message.text && (
              <div
                className={`p-4 mb-6 rounded-xl text-sm font-semibold border flex items-center gap-2 ${
                  message.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-rose-50 text-rose-800 border-rose-200"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="space-y-6">
              {formData.workingAreas.map((area, areaIndex) => (
                <div
                  key={areaIndex}
                  className="border border-slate-200 rounded-2xl p-6 bg-slate-50/40 relative space-y-5"
                >
                  {/* Row Header */}
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200/80">
                    <span className="font-bold text-slate-800 text-sm tracking-wide uppercase">
                      Territory Zone #{areaIndex + 1}
                    </span>

                    {formData.workingAreas.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeWorkingArea(areaIndex)}
                        className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-1.5 rounded-xl text-xs font-semibold border border-rose-200 transition cursor-pointer"
                      >
                        <Trash2 size={14} />
                        Remove Zone
                      </button>
                    )}
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      State Territory <span className="text-rose-500">*</span>
                    </label>
                    <StateSearchInput
                      placeholder="Type or select state..."
                      value={area.state}
                      zIndex={200 - areaIndex}
                      onSelectState={(stateName) => handleStateChange(areaIndex, stateName)}
                    />
                  </div>

                  {/* Cities */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        Operating City Nodes
                      </label>
                      <button
                        type="button"
                        onClick={() => addCity(areaIndex)}
                        className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                      >
                        <Plus size={14} />
                        Add City Hub
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3">
                      {area.cities.map((city, cityIndex) => (
                        <div
                          key={cityIndex}
                          className="flex gap-2 items-center relative"
                        >
                          <div className="flex-1">
                            <LocationSearchInput
                              placeholder="Search city hub..."
                              value={city}
                              zIndex={100 - cityIndex}
                              onSelectLocation={(locationItem) =>
                                handleCitySelect(areaIndex, cityIndex, locationItem)
                              }
                            />
                          </div>

                          {area.cities.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCity(areaIndex, cityIndex)}
                              className="bg-white hover:bg-rose-50 hover:text-rose-600 border border-slate-200 p-3 rounded-xl text-slate-500 transition cursor-pointer"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-slate-100 gap-4">
                <button
                  type="button"
                  onClick={addWorkingArea}
                  className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-3 rounded-xl text-xs font-semibold border border-slate-200 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Plus size={16} />
                  Add Another State Zone
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
                >
                  {loading && <Loader2 size={16} className="animate-spin" />}
                  {loading ? "Synchronizing..." : "Save Working Areas"}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </div>
            </div>

          </div>

          {/* Right Information Column (Spans 4 columns for dashboard symmetry) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
                <CheckCircle2 className="text-orange-600" size={18} />
                Network Coverage Rules
              </h4>
              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                  Accurate territory selection improves matching precision with high-intent enterprise shippers.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                  List all major logistics centers and transit hubs where active vehicle positioning occurs.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0"></span>
                  Modifications update instantly across our national carrier dispatch registry.
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl text-white p-6 shadow-sm">
              <h4 className="font-bold text-base mb-1">Territory Desk Support</h4>
              <p className="text-slate-300 text-xs mb-4">
                Need assistance adding multi-state networks or updating operational regions?
              </p>
              <div className="text-xs font-mono bg-white/10 px-3 py-2 rounded-xl inline-block border border-white/10">
                Network Ops: coverage@rodiotradelink.com
              </div>
            </div>

          </div>

        </form>

      </div>

    </div>
  );
};

export default WorkingArea;