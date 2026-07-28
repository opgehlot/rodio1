import React, { useState, useEffect, useRef } from "react";
import API from "../api/api";
import { Search, MapPin, Briefcase, Filter, X, Truck } from "lucide-react";

// ==========================================
// 1. LOCATION SEARCH INPUT COMPONENT
// ==========================================
const LocationSearchInput = ({ placeholder, selectedValue, onSelectLocation }) => {
  const [searchTerm, setSearchTerm] = useState(selectedValue || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSearchTerm(selectedValue || "");
  }, [selectedValue]);

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

  const handleClear = () => {
    setSearchTerm("");
    setSuggestions([]);
    setIsOpen(false);
    onSelectLocation(null);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!e.target.value) onSelectLocation(null);
          }}
          className={`w-full h-[46px] pl-4 pr-10 bg-gray-50 border ${
            isFocused ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-200"
          } rounded-xl text-sm font-medium text-gray-700 placeholder-gray-400 outline-none transition-all`}
        />
        
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-gray-600 p-1"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && (
        <ul className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg border border-gray-100 max-h-60 overflow-y-auto z-[1000] p-2">
          {loading && suggestions.length === 0 ? (
            <li className="px-4 py-2 text-sm text-center text-gray-500">Loading...</li>
          ) : !loading && suggestions.length === 0 ? (
            <li className="px-4 py-2 text-sm text-center text-gray-500">No results found</li>
          ) : (
            suggestions.map((item, i) => (
              <li
                key={item._id || i}
                onClick={() => handleSelect(item)}
                className="px-4 py-2.5 rounded-lg cursor-pointer hover:bg-blue-50 hover:text-blue-600 text-sm flex justify-between items-center"
              >
                <div>
                  <strong className="font-semibold">{item.name}</strong>
                  {item.state && <span className="text-gray-500 text-xs ml-1">({item.state})</span>}
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};


// ==========================================
// 2. MAIN DIRECTORY FILTER & RESULTS COMPONENT
// ==========================================
const DirectoryFilterSection = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [category, setCategory] = useState("");

  const [directoryData, setDirectoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  const transportCategories = [
    { label: "All Categories", value: "" },
    { label: "Transporter / Fleet Owner", value: "transporter" },
    { label: "Transport Broker / Commission Agent", value: "Broker" },
    { label: "Packers & Movers", value: "PackersMovers" },
    { label: "Transport Contractor", value: "Contractor" },
    { label: "Logistics Company", value: "Logistics" },
    { label: "Crane & Hydra Service", value: "CraneService" },
  ];

  const fetchDirectoryData = async (filters = {}) => {
    try {
      setLoading(true);
      
      const queryParams = {
        state: filters.state !== undefined ? filters.state : selectedState,
        city: filters.city !== undefined ? filters.city : selectedCity,
        category: filters.category !== undefined ? filters.category : category,
      };

      const response = await API.get("/directory", { params: queryParams });
      
      console.log("Full API Response:", response);
      console.log("Response Data Object:", response.data);

      if (response.data) {
        // Correctly target response.data.data according to your API structure
        const extractedData = response.data.data || [];
        setDirectoryData(extractedData);
      }
    } catch (error) {
      console.error("Failed to fetch directory data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectoryData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDirectoryData({
      state: selectedState,
      city: selectedCity,
      category: category,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="text-blue-600" size={22} />
          <h2 className="text-xl font-bold text-gray-800">Find Transport Directory</h2>
        </div>

        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
          
          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <MapPin size={15} className="text-blue-600" />
              State Search
            </label>
            <LocationSearchInput
              placeholder="Search State..."
              selectedValue={selectedState}
              onSelectLocation={(loc) => setSelectedState(loc ? loc.name : "")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <MapPin size={15} className="text-emerald-600" />
              City / Gaon Search
            </label>
            <LocationSearchInput
              placeholder="Search City or Gaon..."
              selectedValue={selectedCity}
              onSelectLocation={(loc) => setSelectedCity(loc ? loc.name : "")}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <Briefcase size={15} className="text-orange-500" />
              Transport Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-[46px] px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
              {transportCategories.map((cat, idx) => (
                <option key={idx} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full h-[46px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
            >
              <Search size={18} />
              <span>Search Directory</span>
            </button>
          </div>

        </form>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Directory Results</h3>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : directoryData.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-sm">No transporters or brokers found matching your filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directoryData.map((item, index) => {
              console.log(`📦 Rendering Data Card [${index}]:`, item);

              return (
                <div key={item._id || index} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-md hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-3">
                    {/* Using firmName as provided in your data response */}
                    <h4 className="font-bold text-gray-800 text-lg capitalize">{item.firmName}</h4>
                    {/* Capitalizing role tag */}
                    <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                      {item.role || "Transporter"}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                    <MapPin size={14} className="text-gray-400" />
                    {item.city}, {item.state}
                  </p>

                  <p className="text-sm text-gray-700 mb-3 font-medium">📞 {item.phoneNumber}</p>

                  {/* Vehicle Information from your data */}
                  <div className="mb-4 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1">
                      <Truck size={14} className="text-blue-600" />
                      <span>Total Vehicles: {item.totalVehicles}</span>
                    </div>
                    {item.vehicleTypes && item.vehicleTypes.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {item.vehicleTypes.map((vType, vIdx) => (
                          <span key={vIdx} className="bg-white border border-gray-200 text-gray-600 text-[11px] px-2 py-0.5 rounded-md font-medium">
                            {vType}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => console.log("👉 User clicked specific data card:", item)}
                    className="w-full py-2 bg-gray-50 hover:bg-blue-600 hover:text-white text-blue-600 text-sm font-bold rounded-xl transition"
                  >
                    View Profile & Details
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default DirectoryFilterSection;