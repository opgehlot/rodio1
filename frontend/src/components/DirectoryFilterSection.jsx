import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { Search, MapPin, Briefcase, Filter, X, Truck, Phone, CheckCircle2, Globe } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

// ==========================================
// 1. LOCATION SEARCH INPUT COMPONENT
// ==========================================

const LocationSearchInput = ({
  placeholder,
  selectedValue,
  onSelectLocation,
}) => {
  const [searchTerm, setSearchTerm] = useState(selectedValue || "");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    setSearchTerm(selectedValue || "");
  }, [selectedValue]);

  // outside click close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // location search api
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
            console.log("Location Error", err);
          })
          .finally(() => {
            setLoading(false);
          });
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
            if (!e.target.value) {
              onSelectLocation(null);
            }
          }}
          className={`w-full h-[46px] pl-4 pr-10 bg-gray-50 border ${
            isFocused
              ? "border-blue-500 ring-2 ring-blue-500/20"
              : "border-gray-200"
          } rounded-xl text-sm outline-none`}
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && (
        <ul className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg border border-gray-100 max-h-60 overflow-y-auto z-[1000] p-2">
          {loading && suggestions.length === 0 ? (
            <li className="px-4 py-2 text-sm text-center text-gray-500">
              Loading...
            </li>
          ) : suggestions.length === 0 ? (
            <li className="px-4 py-2 text-sm text-center text-gray-500">
              No results found
            </li>
          ) : (
            suggestions.map((item, i) => (
              <li
                key={item._id || i}
                onClick={() => handleSelect(item)}
                className="px-4 py-2.5 rounded-lg cursor-pointer hover:bg-blue-50 hover:text-blue-600 text-sm flex justify-between items-center"
              >
                <div>
                  <strong className="font-semibold">{item.name}</strong>
                  {item.state && (
                    <span className="text-gray-500 text-xs ml-1">
                      ({item.state})
                    </span>
                  )}
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
  const navigate = useNavigate();

  // AUTH CONTEXT
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  // FILTER STATES
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [category, setCategory] = useState("");

  // DIRECTORY DATA
  const [directoryData, setDirectoryData] = useState([]);
  const [loading, setLoading] = useState(false);

  // UPDATED CATEGORY LIST
  const transportCategories = [
    { label: "All Categories", value: "" },
    { label: "Transporter", value: "Transporter" },
    { label: "Broker", value: "Broker" },
    { label: "Fleet Owner", value: "Fleet Owner" },
    { label: "Truck Owner", value: "Truck Owner" },
    { label: "Logistics Company", value: "Logistics Company" },
    { label: "Warehouse", value: "Warehouse" },
    { label: "Courier", value: "Courier" },
    { label: "Packers & Movers", value: "Packers & Movers" },
    { label: "Commission Agent", value: "Commission Agent" },
    { label: "RTO Agent", value: "RTO Agent" },
    { label: "Finance Agent", value: "Finance Agent" },
    { label: "Others", value: "Others" },
  ];

  // FETCH DIRECTORY USING `/api/v1/businesses/search` WITH LIMIT 1000
  const fetchDirectoryData = async (filters = {}) => {
    try {
      setLoading(true);

      const queryParams = {
        state: filters.state !== undefined ? filters.state : selectedState,
        city: filters.city !== undefined ? filters.city : selectedCity,
        category: filters.category !== undefined ? filters.category : category,
        limit: 1000, // Fetches all matching business records
      };

      const response = await API.get("/businesses/search", {
        params: queryParams,
      });

      if (response.data) {
        setDirectoryData(response.data.data || []);
      }
    } catch (error) {
      console.log("Directory Search Error", error);
    } finally {
      setLoading(false);
    }
  };

  // LOAD DATA FIRST TIME
  useEffect(() => {
    fetchDirectoryData();
  }, []);

  // SEARCH BUTTON
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    fetchDirectoryData({
      state: selectedState,
      city: selectedCity,
      category: category,
    });
  };

  // MASK PHONE
  const maskPhoneNumber = (number) => {
    if (!number) {
      return "Not Provided";
    }

    const strNumber = String(number);

    if (strNumber.length >= 10) {
      return "XXXXXX" + strNumber.slice(-4);
    }

    return "XXXXXXXXXX";
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6">
      {/* SEARCH BOX */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Filter className="text-blue-600" size={22} />
          <h2 className="text-xl font-bold text-gray-800">
            Find Transport Directory
          </h2>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-end"
        >
          {/* STATE */}
          <div>
            <label className="text-xs font-bold text-gray-600 flex items-center gap-1 mb-2">
              <MapPin size={15} className="text-blue-600" />
              State Search
            </label>

            <LocationSearchInput
              placeholder="Search State..."
              selectedValue={selectedState}
              onSelectLocation={(loc) => setSelectedState(loc ? loc.name : "")}
            />
          </div>

          {/* CITY */}
          <div>
            <label className="text-xs font-bold text-gray-600 flex items-center gap-1 mb-2">
              <MapPin size={15} className="text-green-600" />
              City Search
            </label>

            <LocationSearchInput
              placeholder="Search City..."
              selectedValue={selectedCity}
              onSelectLocation={(loc) => setSelectedCity(loc ? loc.name : "")}
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-xs font-bold text-gray-600 flex items-center gap-1 mb-2">
              <Briefcase size={15} className="text-orange-500" />
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-[46px] bg-gray-50 border rounded-xl px-3 text-sm outline-none"
            >
              {transportCategories.map((cat, index) => (
                <option key={index} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* SEARCH BUTTON */}
          <button
            type="submit"
            className="h-[46px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Search size={18} />
            Search Directory
          </button>
        </form>
      </div>

      {/* DIRECTORY RESULT */}
      <h3 className="text-2xl font-bold text-gray-800 mb-5">
        Directory Results
      </h3>

      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : directoryData.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center">
          No Transport Found
        </div>
      ) : (
        /* CARDS CONTAINER WITH SCROLLBAR & FIXED MAX HEIGHT */
        <div className="max-h-[800px] overflow-y-auto pr-2 custom-scrollbar space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directoryData.map((item, index) => {
              const displayPhone = isLoggedIn
                ? item.phoneNumber
                : maskPhoneNumber(item.phoneNumber);

              return (
                <div
                  key={item._id || index}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col justify-between relative"
                >
                  {/* TOP HEADER SECTION */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white relative">
                    {/* Verified Badge on Top-Right Corner */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                      <CheckCircle2 size={13} className="text-emerald-300 fill-emerald-500/20" />
                      <span>Verified</span>
                    </div>

                    <div className="flex justify-between items-start pr-20">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Truck size={20} className="text-white" />
                          <h4 className="font-bold text-lg">{item.firmName}</h4>
                        </div>
                        <p className="text-blue-100 text-xs capitalize">
                          {item.category || "Transporter"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* BODY CONTENT */}
                  <div className="p-5 space-y-4 flex-1">
                    {/* Location Info */}
                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-2xl">
                      <MapPin size={18} className="text-red-500 shrink-0" />
                      <span className="font-medium">
                        {item.currentCity}, {item.currentState}
                      </span>
                    </div>

                    {/* Contact & Info Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                        <span className="text-xs text-gray-400 block mb-1">
                          Rating
                        </span>
                        <div className="flex items-center gap-1.5 text-gray-800 font-bold text-sm">
                          <Truck size={15} className="text-blue-600" />
                          <span>{item.averageRating || 0} ({item.totalReviews || 0})</span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                        <span className="text-xs text-gray-400 block mb-1">
                          Phone Number
                        </span>
                        <div className="flex items-center gap-1.5 text-gray-800 font-bold text-sm truncate">
                          <Phone size={15} className="text-green-600 shrink-0" />
                          <span className="truncate">{displayPhone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Working Areas */}
                    {item.workingAreas && item.workingAreas.length > 0 && (
                      <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-2xl">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 mb-2">
                          <Globe size={14} />
                          <span>Working Areas:</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.workingAreas.map((area, i) => (
                            <span
                              key={area._id || i}
                              className="bg-white border border-blue-200 text-blue-800 px-2 py-1 rounded-lg text-xs font-medium"
                            >
                              {area.cities.join(", ")} ({area.state})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* FOOTER ACTIONS */}
                  <div className="p-5 pt-0 border-t border-gray-100 mt-auto bg-white grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${item.phoneNumber}`}
                      onClick={(e) => {
                        if (!isLoggedIn) {
                          e.preventDefault();
                          navigate("/login");
                        }
                      }}
                      className="py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-600/20"
                    >
                      <Phone size={15} />
                      Call
                    </a>

                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          navigate("/login");
                          return;
                        }
                        navigate(`/dashboard/transporters/${item._id}`);
                      }}
                      className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/20"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectoryFilterSection;