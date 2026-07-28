import React, { useState, useEffect, useRef } from "react";
import API from "../../api/api";
import { Plus, Trash2, MapPin, Map, Loader2 } from "lucide-react";

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
      <div className="relative">
        <Map size={18} className="absolute left-3 top-3.5 text-gray-400" />
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
          className="w-full border border-gray-300 pl-10 pr-4 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none bg-white text-sm"
          required
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="suggestions-list absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-md max-h-60 overflow-y-auto z-50 list-none m-0 p-0">
          {suggestions.map((state, i) => (
            <li
              key={i}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(state)}
              className="px-4 py-2.5 cursor-pointer hover:bg-gray-100 text-sm transition font-normal border-b border-gray-100 last:border-b-0"
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
      <div className="relative">
        <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
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
          className="w-full border border-gray-300 pl-10 pr-10 py-2.5 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none bg-white text-sm"
          required
        />
      </div>

      {loading && (
        <div className="absolute right-3 top-3.5 text-gray-400 text-xs">
          Loading...
        </div>
      )}

      {isOpen && (suggestions.length > 0 || !loading) && (
        <ul className="suggestions-list absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-md max-h-60 overflow-y-auto z-50 list-none m-0 p-0">
          {suggestions.length > 0 ? (
            suggestions.map((item, i) => (
              <li
                key={item._id || i}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(item)}
                className="px-4 py-2.5 cursor-pointer hover:bg-gray-100 text-sm flex justify-between items-center transition border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <span className="font-medium text-gray-800">{item.name}</span>, <small className="text-gray-500">{item.state}</small>
                </div>
                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5">Select</span>
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-gray-500 text-center text-sm">
              No results found
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white border border-gray-200 p-8"
      >
        {/* Header */}
        <div className="border-b border-gray-200 pb-5 mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Working Areas</h1>
          <p className="mt-1 text-sm text-gray-600">
            Specify the operational states and cities where your transport services are available.
          </p>
        </div>

        {/* Status Message Display */}
        {message.text && (
          <div
            className={`p-3 mb-6 text-sm font-medium border ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border-green-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          {formData.workingAreas.map((area, areaIndex) => (
            <div
              key={areaIndex}
              className="border border-gray-300 p-5 bg-gray-50/50 relative"
            >
              {/* Row Header */}
              <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
                <span className="font-semibold text-gray-800 text-sm">
                  Entry #{areaIndex + 1}
                </span>

                {formData.workingAreas.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeWorkingArea(areaIndex)}
                    className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-xs font-medium transition cursor-pointer"
                  >
                    <Trash2 size={14} />
                    Remove Block
                  </button>
                )}
              </div>

              {/* State */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  State Name
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
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Cities Covered
                  </label>
                  <button
                    type="button"
                    onClick={() => addCity(areaIndex)}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 text-xs font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} />
                    Add City
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
                          placeholder="Search city..."
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
                          className="bg-gray-200 hover:bg-red-100 hover:text-red-600 p-2.5 text-gray-600 transition cursor-pointer"
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
          <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-200 gap-3">
            <button
              type="button"
              onClick={addWorkingArea}
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 text-sm font-medium border border-gray-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus size={16} />
              Add Another State Entry
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Saving Data..." : "Save Working Areas"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WorkingArea;