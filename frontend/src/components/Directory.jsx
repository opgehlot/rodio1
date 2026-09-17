

import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/api"
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  X,
  Truck,
  Phone,
  CheckCircle2,
  Globe,
  RotateCcw,
  Star,
  CircleDot,
  User as UserIcon,
  Building2,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import DirectoryMarquee from "./DirectoryMarquee";

// ==========================================
// 1. LOCATION SEARCH INPUT (Debounced & Clean)
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
        API.get(
          `/location/search?query=${encodeURIComponent(searchTerm.trim())}`,
        )
          .then((res) => {
            if (res.data && res.data.success) {
              setSuggestions(res.data.data || []);
              setIsOpen(true);
            }
          })
          .catch((err) => console.error("Location Error:", err))
          .finally(() => setLoading(false));
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 250);

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
          className={`w-full h-[48px] pl-4 pr-10 bg-gray-50/80 border ${
            isFocused
              ? "border-blue-500 ring-2 ring-blue-500/20 bg-white"
              : "border-gray-200"
          } rounded-2xl text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400`}
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition p-1"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {isOpen && (
        <ul className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-60 overflow-y-auto z-[1000] p-1.5 custom-scrollbar">
          {loading && suggestions.length === 0 ? (
            <li className="px-4 py-3 text-xs sm:text-sm text-center text-gray-400">
              Loading routes...
            </li>
          ) : suggestions.length === 0 ? (
            <li className="px-4 py-3 text-xs sm:text-sm text-center text-gray-400">
              No locations found
            </li>
          ) : (
            suggestions.map((item, i) => (
              <li
                key={item._id || i}
                onClick={() => handleSelect(item)}
                className="px-3.5 py-2.5 rounded-xl cursor-pointer hover:bg-blue-50/80 hover:text-blue-600 text-sm flex justify-between items-center transition"
              >
                <div>
                  <strong className="font-semibold text-gray-800">
                    {item.name}
                  </strong>
                  {item.state && (
                    <span className="text-gray-500 text-xs ml-1.5 font-normal">
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
// 2. MAIN DIRECTORY COMPONENT
// ==========================================
const Directory = () => {
  const navigate = useNavigate();
   const { state, city, category: urlCategory } = useParams();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const slugify = (value = "") => {
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

  // REFS FOR AUTO-SCROLL
  const resultsRef = useRef(null);

  // TOGGLE STATE: "location" OR "business"
  const [searchMode, setSearchMode] = useState("location");

  // FILTER STATES
  // FILTER STATES
const [selectedState, setSelectedState] = useState("");
const [selectedCity, setSelectedCity] = useState("");
const [category, setCategory] = useState("");
const [searchBy, setSearchBy] = useState("firmName");
const [searchValue, setSearchValue] = useState("");

// URL SE FILTERS LOAD
useEffect(() => {
  if (!state && !city && !urlCategory) {
    return;
  }

  setSelectedState(
    state
      ? state
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : ""
  );

  setSelectedCity(
    city
      ? city
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : ""
  );

  setCategory(
    urlCategory
      ? urlCategory.replace(/-/g, "_")
      : ""
  );
}, [state, city, urlCategory]);

// DIRECTORY DATA
const [directoryData, setDirectoryData] = useState([]);
const [loading, setLoading] = useState(false);

  const transportCategories = useMemo(
    () => [
      { label: "All Categories", value: "" },
      { label: "Transporter", value: "transporter" },
      { label: "Broker", value: "broker" },
      { label: "Fleet Owner", value: "fleet_owner" },
      { label: "Truck Owner", value: "truck_owner" },
      { label: "Logistics Company", value: "logistics_company" },
      { label: "Warehouse", value: "warehouse" },
      { label: "Courier", value: "courier" },
      { label: "Packers & Movers", value: "packers_and_movers" },
      { label: "Commission Agent", value: "commission_agent" },
      { label: "RTO Agent", value: "rto_agent" },
      { label: "Finance Agent", value: "finance_company" },
      { label: "Travel & Taxi", value: "travel_taxi" },
      { label: "Others", value: "others" },
    ],
    [],
  );

  // SCROLL RESTORATION LOGIC (Footer glitch resolved via manual history control)
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!loading && directoryData.length > 0) {
      const lastCardId = sessionStorage.getItem("lastViewedDirectoryCardId");

      if (lastCardId) {
        const timer = setTimeout(() => {
          const element = document.getElementById(lastCardId);

          if (element) {
            const navbarHeight = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: "instant",
            });
          }

          sessionStorage.removeItem("lastViewedDirectoryCardId");
        }, 150);

        return () => clearTimeout(timer);
      }
    }
  }, [loading, directoryData]);

  // AUTO SCROLL TO RESULTS ON MOBILE SEARCH
  const scrollToResults = () => {
    if (window.innerWidth < 768 && resultsRef.current) {
      setTimeout(() => {
        const yOffset = -70;
        const y =
          resultsRef.current.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 100);
    }
  };

  // UNIFIED FETCH FUNCTION
const fetchDirectoryData = useCallback(async (filters = {}) => {
  try {
    setLoading(true);

    const params = {};

    if (filters.state) params.state = filters.state;
    if (filters.city) params.city = filters.city;
    if (filters.category) params.category = filters.category;

    const response = await API.get("/directory", { params });

    if (response.data && response.data.success) {
      setDirectoryData(response.data.data || []);
    } else if (Array.isArray(response.data)) {
      setDirectoryData(response.data);
    } else {
      setDirectoryData([]);
    }
  } catch (error) {
    console.error("Directory Fetch Error:", error);
    setDirectoryData([]);
  } finally {
    setLoading(false);
  }
}, []);

// useEffect(() => {
//   fetchDirectoryData({
//     state: selectedState,
//     city: selectedCity,
//     category: category,
//   });
// }, [selectedState, selectedCity, category]);

  // SEARCH BY LOCATION & CATEGORY
  useEffect(() => {
  const stateName = state
    ? state
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ")
    : "";

  const cityName = city
    ? city
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ")
    : "";

  const categoryValue = urlCategory
    ? urlCategory.replace(/-/g, "_")
    : "";

  // URL ke filters UI me set karo
  setSelectedState(stateName);
  setSelectedCity(cityName);
  setCategory(categoryValue);

  // /directory par koi filter nahi hai
  // isliye saara data aayega
  fetchDirectoryData({
    state: stateName,
    city: cityName,
    category: categoryValue,
  });
}, [state, city, urlCategory, fetchDirectoryData]);
const handleLocationSearch = (e) => {
  e.preventDefault();

  const stateSlug = slugify(selectedState);
  const citySlug = slugify(selectedCity);
  const categorySlug = slugify(category);

  let url = "/directory";

  if (stateSlug) {
    url += `/${stateSlug}`;
  }

  if (citySlug) {
    url += `/${citySlug}`;
  }

  if (categorySlug) {
    url += `/${categorySlug}`;
  }

  navigate(url);

  scrollToResults();

  fetchDirectoryData({
    state: selectedState,
    city: selectedCity,
    category: category,
  });
};

  // SEARCH BY FIRM / OWNER / NUMBER
  const handleBusinessSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    scrollToResults();

    try {
      setLoading(true);
      const response = await API.get("/businesses/search-by", {
        params: {
          searchBy,
          searchValue: searchValue.trim(),
        },
      });

      if (response.data?.success) {
        setDirectoryData(response.data.data || []);
      } else {
        setDirectoryData([]);
      }
    } catch (error) {
      console.error("Business Search Error:", error);
      setDirectoryData([]);
    } finally {
      setLoading(false);
    }
  };

  // RESET FILTERS
  const handleResetFilters = () => {
    setSelectedState("");
    setSelectedCity("");
    setCategory("");
    setSearchBy("firmName");
    setSearchValue("");

    fetchDirectoryData({
      state: "",
      city: "",
      category: "",
    });
  };

  // PHONE NUMBER MASKING
  const maskPhoneNumber = (number) => {
    if (!number) return "Not Provided";
    const str = String(number).trim();
    if (str.length >= 10) {
      return "XXXXXX" + str.slice(-4);
    }
    return "XXXXXXXXXX";
  };

  return (
    <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 mb-16">
      <DirectoryMarquee />

      {/* ==========================================
          SEARCH FILTERS BOX WITH SLIDING TOGGLE
      ========================================== */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 mb-8 sm:mb-10">
        {/* Header & Reset Button */}
        <div className="flex items-center justify-between gap-2 mb-5 sm:mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Filter size={20} className="sm:w-[22px] sm:h-[22px]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
                Find Transport Directory
              </h2>
              <p className="hidden sm:block text-[15px] text-gray-500">
                Filter verified transporters, brokers & routes across India
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition border border-gray-200 cursor-pointer shrink-0 active:scale-95"
          >
            <RotateCcw size={15} />
            <span className="hidden sm:inline">Reset All</span>
            <span className="sm:hidden">Reset</span>
          </button>
        </div>

        {/* SLIDING SEGMENTED CONTROL */}
        <div className="w-full max-w-lg mx-auto mb-6 sm:mb-8">
          <div className="relative p-1 bg-gray-100/90 rounded-2xl flex items-center border border-gray-200/80">
            {/* Tab 1 */}
            <button
              type="button"
              onClick={() => setSearchMode("location")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer select-none ${
                searchMode === "location"
                  ? "text-blue-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <MapPin
                size={16}
                className={
                  searchMode === "location" ? "text-blue-600" : "text-gray-400"
                }
              />
              <span>Location Search</span>
              {searchMode === "location" && (
                <motion.div
                  layoutId="activeSearchTab"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  className="absolute inset-0 bg-white rounded-xl shadow-md border border-gray-100 -z-10"
                />
              )}
            </button>

            {/* Tab 2 */}
            <button
              type="button"
              onClick={() => setSearchMode("business")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer select-none ${
                searchMode === "business"
                  ? "text-purple-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Building2
                size={16}
                className={
                  searchMode === "business"
                    ? "text-purple-600"
                    : "text-gray-400"
                }
              />
              <span>Firm / Owner No.</span>
              {searchMode === "business" && (
                <motion.div
                  layoutId="activeSearchTab"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  className="absolute inset-0 bg-white rounded-xl shadow-md border border-gray-100 -z-10"
                />
              )}
            </button>
          </div>
        </div>

        {/* FORMS */}
        <AnimatePresence mode="wait">
          {searchMode === "location" ? (
            <motion.form
              key="location-form"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleLocationSearch}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 items-end"
            >
              <div>
                <label className="text-[15px] font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <MapPin size={14} className="text-blue-600" />
                  State
                </label>
                <LocationSearchInput
                  placeholder="Search State..."
                  selectedValue={selectedState}
                  onSelectLocation={(loc) =>
                    setSelectedState(loc ? loc.name : "")
                  }
                />
              </div>

              <div>
                <label className="text-[15px] font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <MapPin size={14} className="text-green-600" />
                  City
                </label>
                <LocationSearchInput
                  placeholder="Search City..."
                  selectedValue={selectedCity}
                  onSelectLocation={(loc) =>
                    setSelectedCity(loc ? loc.name : "")
                  }
                />
              </div>

              <div>
                <label className="text-[15px] font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <Briefcase size={14} className="text-orange-500" />
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-[48px] bg-gray-50/80 border border-gray-200 rounded-2xl px-4 text-sm text-gray-800 outline-none focus:border-blue-500 focus:bg-white transition cursor-pointer"
                >
                  {transportCategories.map((cat, index) => (
                    <option key={index} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full h-[48px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition shadow-lg shadow-blue-500/25 cursor-pointer text-sm"
              >
                <Search size={18} />
                Search Directory
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="business-form"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleBusinessSearch}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 items-end"
            >
              <div>
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <CircleDot size={14} className="text-purple-600" />
                  Select category (Firm/Owner/Number)
                </label>
                <select
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                  className="w-full h-[48px] bg-gray-50/80 border border-gray-200 rounded-2xl px-4 text-sm text-gray-800 outline-none focus:border-purple-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="firmName">Firm Name</option>
                  <option value="ownerName">Owner Name</option>
                  <option value="phoneNumber">Phone Number</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
                  <Search size={14} className="text-purple-600" />
                  Search Keyword / Number
                </label>
                <input
                  type={searchBy === "phoneNumber" ? "tel" : "text"}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={
                    searchBy === "firmName"
                      ? "Enter Firm Name..."
                      : searchBy === "ownerName"
                        ? "Enter Owner Name..."
                        : "Enter Phone Number..."
                  }
                  className="w-full h-[48px] bg-gray-50/80 border border-gray-200 rounded-2xl px-4 text-sm text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full h-[48px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition shadow-lg shadow-purple-500/25 cursor-pointer text-sm"
              >
                <Search size={18} />
                Search Business
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* ==========================================
          DIRECTORY RESULT SECTION
      ========================================== */}
      <div ref={resultsRef} className="scroll-mt-24">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            Directory Results
            {/* <span className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {directoryData.length}{" "}
              {directoryData.length === 1 ? "Partner" : "Partners"}
            </span> */}
          </h3>
        </div>

        {loading ? (
          <div className="text-center py-24 sm:py-28 font-medium text-gray-500 animate-pulse">
            Loading Directory Details...
          </div>
        ) : directoryData.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 sm:p-16 text-center text-gray-500 font-medium shadow-sm border border-gray-100">
            No Transport Found matching your criteria.
          </div>
        ) : (
          <div className="w-full space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {directoryData.map((item, index) => {
                const displayPhone = isLoggedIn
                  ? item.phoneNumber
                  : maskPhoneNumber(item.phoneNumber);
                const formattedRole = item.role
                  ? item.role.replace(/_/g, " ")
                  : "Transporter";
                const rating = Number(item.averageRating || 0).toFixed(1);
                const reviews = item.totalReviews || 0;
                const cardId = `directory-card-${item._id || index}`;

                return (
                  <div
                    key={item._id || index}
                    id={cardId}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col justify-between relative group"
                  >
                    {/* CARD HEADER */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-5 text-white relative">
                      {item.isVerified && (
                        <div className="absolute top-3.5 right-3.5 bg-white/20 backdrop-blur-md border border-white/30 text-white px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 shadow-sm">
                          <CheckCircle2
                            size={12}
                            className="text-emerald-300"
                          />
                          <span>Verified</span>
                        </div>
                      )}

                      <div className="flex items-center gap-3 pr-14">
                        {/* Avatar */}
                        <div className="relative shrink-0 w-12 h-12 sm:w-13 sm:h-13 rounded-4xl overflow-hidden bg-white/10 border-2 border-white/40 shadow-inner flex items-center justify-center">
                          {item.photo ? (
                            <img
                              src={item.photo}
                              alt={item.firmName || "Profile"}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                                if (e.currentTarget.nextElementSibling) {
                                  e.currentTarget.nextElementSibling.style.display =
                                    "flex";
                                }
                              }}
                            />
                          ) : null}
                          <div
                            className={`w-full h-full flex items-center justify-center font-bold text-base sm:text-lg text-white bg-blue-700/80 ${
                              item.photo ? "hidden" : "flex"
                            }`}
                          >
                            {item.firmName ? (
                              item.firmName.charAt(0).toUpperCase()
                            ) : (
                              <UserIcon size={20} />
                            )}
                          </div>
                        </div>

                        {/* Firm Info */}
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-sm sm:text-base capitalize truncate leading-snug drop-shadow-sm">
                            {item.firmName || "Unnamed Firm"}
                          </h4>
                          <p className="text-blue-100 text-[11px] sm:text-xs capitalize truncate font-medium">
                            {item.ownerName && item.ownerName !== item.firmName
                              ? `${item.ownerName} • `
                              : ""}
                            {formattedRole}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* CARD BODY */}
                    <div className="p-4 sm:p-5 space-y-3.5 sm:space-y-4 flex-1">
                      {/* Location */}
                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 bg-gray-50 p-2.5 sm:p-3 rounded-2xl border border-gray-100/80">
                        <MapPin size={16} className="text-red-500 shrink-0" />
                        <span className="font-medium capitalize truncate">
                          {item.city || ""}, {item.state || ""}
                        </span>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <div className="bg-gray-50 p-2.5 sm:p-3 rounded-2xl border border-gray-100">
                          <span className="text-[10px] font-semibold text-gray-400 block mb-0.5 uppercase tracking-wider">
                            Rating
                          </span>
                          <div className="flex items-center gap-1 text-gray-900 font-bold text-xs sm:text-sm">
                            <Star
                              size={14}
                              className="text-amber-500 fill-amber-400 shrink-0"
                            />
                            <span>
                              {rating}{" "}
                              <span className="text-[10px] sm:text-[11px] font-normal text-gray-500">
                                ({reviews})
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-2.5 sm:p-3 rounded-2xl border border-gray-100">
                          <span className="text-[10px] font-semibold text-gray-400 block mb-0.5 uppercase tracking-wider">
                            Contact
                          </span>
                          <div className="flex items-center gap-1 text-gray-900 font-bold text-xs sm:text-sm truncate">
                            <Phone
                              size={13}
                              className="text-emerald-600 shrink-0"
                            />
                            <span className="truncate">{displayPhone}</span>
                          </div>
                        </div>
                      </div>

                      {/* Vehicles */}
                      {item.totalVehicles > 0 && (
                        <div className="flex items-center gap-2 text-xs text-gray-600 bg-blue-50/40 border border-blue-100/60 p-2.5 rounded-xl">
                          <Truck size={14} className="text-blue-600 shrink-0" />
                          <span className="font-medium truncate">
                            {item.totalVehicles}{" "}
                            {item.totalVehicles === 1 ? "Vehicle" : "Vehicles"}:{" "}
                            <span className="text-gray-800 font-bold">
                              {item.vehicleTypes?.join(", ")}
                            </span>
                          </span>
                        </div>
                      )}

                      {/* Working Routes */}
                      {Array.isArray(item.workingAreas) &&
                        item.workingAreas.length > 0 && (
                          <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-2xl">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 mb-1.5">
                              <Globe size={13} />
                              <span>Working Routes:</span>
                            </div>
                            <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                              {item.workingAreas.map((area, i) => (
                                <span
                                  key={area._id || i}
                                  className="bg-white border border-blue-200 text-blue-800 px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-medium"
                                >
                                  {Array.isArray(area?.cities) &&
                                  area.cities.filter(Boolean).length > 0
                                    ? `${area.cities
                                        .filter(Boolean)
                                        .join(", ")} (${area.state || ""})`
                                    : area.state || "All Regions"}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* CARD FOOTER ACTIONS */}
                    <div className="p-4 sm:p-5 pt-0 border-t border-gray-100 mt-auto bg-white grid grid-cols-2 gap-2 sm:gap-3">
                      <a
                        href={`tel:${item.phoneNumber}`}
                        onClick={(e) => {
                          sessionStorage.setItem(
                            "lastViewedDirectoryCardId",
                            cardId,
                          );
                          if (!isLoggedIn) {
                            e.preventDefault();
                            sessionStorage.setItem(
                              "authRedirectUrl",
                              `/dashboard/transporters/${item._id}`,
                            );
                            navigate("/login", {
                              state: {
                                returnTo: `/dashboard/transporters/${item._id}`,
                              },
                            });
                          }
                        }}
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition shadow-md shadow-emerald-600/20 cursor-pointer"
                      >
                        <Phone size={14} />
                        Call
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          sessionStorage.setItem(
                            "lastViewedDirectoryCardId",
                            cardId,
                          );
                          const targetUrl = `/dashboard/transporters/${item._id}`;
                          if (!isLoggedIn) {
                            sessionStorage.setItem(
                              "authRedirectUrl",
                              targetUrl,
                            );
                            navigate("/login", {
                              state: {
                                returnTo: targetUrl,
                              },
                            });
                            return;
                          }
                          navigate(targetUrl);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition shadow-md shadow-blue-600/20 cursor-pointer"
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
    </div>
  );
};

export default Directory;


// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useContext,
//   useCallback,
//   useMemo,
// } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import API from "../api/api";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Filter,
//   X,
//   Truck,
//   Phone,
//   CheckCircle2,
//   Globe,
//   RotateCcw,
//   Star,
//   CircleDot,
//   User as UserIcon,
//   Building2,
//   MessageCircle,
//   Smartphone,
//   User,
//   ArrowRight,
//   ThumbsUp,
// } from "lucide-react";
// import { AuthContext } from "../context/AuthContext";
// import DirectoryMarquee from "./DirectoryMarquee";

// // ==========================================
// // 1. LOCATION SEARCH INPUT (Debounced & Clean)
// // ==========================================
// const LocationSearchInput = ({
//   placeholder,
//   selectedValue,
//   onSelectLocation,
// }) => {
//   const [searchTerm, setSearchTerm] = useState(selectedValue || "");
//   const [suggestions, setSuggestions] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);

//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     setSearchTerm(selectedValue || "");
//   }, [selectedValue]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (searchTerm.trim().length >= 2) {
//         setLoading(true);
//         API.get(
//           `/location/search?query=${encodeURIComponent(searchTerm.trim())}`,
//         )
//           .then((res) => {
//             if (res.data && res.data.success) {
//               setSuggestions(res.data.data || []);
//               setIsOpen(true);
//             }
//           })
//           .catch((err) => console.error("Location Error:", err))
//           .finally(() => setLoading(false));
//       } else {
//         setSuggestions([]);
//         setIsOpen(false);
//       }
//     }, 250);

//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   const handleSelect = (item) => {
//     setSearchTerm(item.name);
//     setIsOpen(false);
//     onSelectLocation(item);
//   };

//   const handleClear = () => {
//     setSearchTerm("");
//     setSuggestions([]);
//     setIsOpen(false);
//     onSelectLocation(null);
//   };

//   return (
//     <div ref={dropdownRef} className="relative w-full">
//       <div className="relative flex items-center">
//         <input
//           type="text"
//           value={searchTerm}
//           placeholder={placeholder}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setTimeout(() => setIsFocused(false), 200)}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             if (!e.target.value) onSelectLocation(null);
//           }}
//           className={`w-full h-[48px] pl-4 pr-10 bg-gray-50/80 border ${
//             isFocused
//               ? "border-blue-500 ring-2 ring-blue-500/20 bg-white"
//               : "border-gray-200"
//           } rounded-2xl text-sm text-gray-800 outline-none transition duration-200 placeholder:text-gray-400`}
//         />

//         {searchTerm && (
//           <button
//             type="button"
//             onClick={handleClear}
//             className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition p-1"
//           >
//             <X size={16} />
//           </button>
//         )}
//       </div>

//       {isOpen && (
//         <ul className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-60 overflow-y-auto z-[1000] p-1.5 custom-scrollbar">
//           {loading && suggestions.length === 0 ? (
//             <li className="px-4 py-3 text-xs sm:text-sm text-center text-gray-400">
//               Loading routes...
//             </li>
//           ) : suggestions.length === 0 ? (
//             <li className="px-4 py-3 text-xs sm:text-sm text-center text-gray-400">
//               No locations found
//             </li>
//           ) : (
//             suggestions.map((item, i) => (
//               <li
//                 key={item._id || i}
//                 onClick={() => handleSelect(item)}
//                 className="px-3.5 py-2.5 rounded-xl cursor-pointer hover:bg-blue-50/80 hover:text-blue-600 text-sm flex justify-between items-center transition"
//               >
//                 <div>
//                   <strong className="font-semibold text-gray-800">
//                     {item.name}
//                   </strong>
//                   {item.state && (
//                     <span className="text-gray-500 text-xs ml-1.5 font-normal">
//                       ({item.state})
//                     </span>
//                   )}
//                 </div>
//               </li>
//             ))
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };


// /* =========================================================
//    DIRECTORY ENQUIRY SIDEBAR
//    Same visual style / font sizing as reference card design
// ========================================================= */
// function EnquirySidebar({ category }) {
//   const titleCategory = category
//     ? category.replace(/_/g, " ")
//     : "Transport Services";

//   return (
//     <aside className="w-full lg:sticky lg:top-5 lg:self-start">
//       {/* FIRST ENQUIRY BOX */}
//       <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
//         <div className="p-4 sm:p-5">
//           <h2 className="text-lg font-bold text-gray-900">
//             Get the List of Top
//           </h2>

//           <h3 className="mt-1 text-lg font-bold capitalize text-blue-600">
//             {titleCategory} in Your Area
//           </h3>

//           <p className="mt-3 text-sm leading-6 text-gray-600">
//             We'll send you contact details in seconds for free
//           </p>

//           <h3 className="mt-5 text-base font-bold text-gray-900">
//             What is your requirement?
//           </h3>

//           <div className="mt-4 flex gap-7">
//             <label className="flex cursor-pointer items-center gap-2">
//               <input
//                 type="radio"
//                 name="transportRequirement"
//                 defaultChecked
//                 className="h-5 w-5 accent-blue-600"
//               />
//               <span className="text-sm">Transport</span>
//             </label>

//             <label className="flex cursor-pointer items-center gap-2">
//               <input
//                 type="radio"
//                 name="transportRequirement"
//                 className="h-5 w-5 accent-blue-600"
//               />
//               <span className="text-sm">Vehicle</span>
//             </label>
//           </div>

//           <div className="relative mt-5">
//             <User
//               size={19}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700"
//             />
//             <input
//               type="text"
//               placeholder="Name"
//               className="h-12 w-full rounded-md border border-gray-300 pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//             />
//           </div>

//           <div className="relative mt-3">
//             <Smartphone
//               size={19}
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700"
//             />
//             <input
//               type="tel"
//               placeholder="Mobile Number"
//               className="h-12 w-full rounded-md border border-gray-300 pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//             />
//           </div>

//           <label className="mt-4 flex items-start gap-2 text-xs text-gray-500">
//             <input
//               type="checkbox"
//               defaultChecked
//               className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600"
//             />
//             <span>
//               I Agree to <span className="underline">T&C's Privacy Policy</span>
//             </span>
//           </label>

//           <button
//             type="button"
//             className="mt-4 flex h-11 w-full items-center justify-center gap-1 rounded-md bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700"
//           >
//             View profile
//             <ArrowRight size={18} />
//             <ArrowRight size={18} />
//           </button>
//         </div>
//       </div>

//       {/* SECOND BOX */}
//       <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white">
//         <div className="p-5">
//           <p className="text-sm font-medium text-gray-500">
//             Looking for transport services?
//           </p>
//           <h3 className="mt-2 text-lg font-bold text-gray-900">
//             Connect with verified businesses
//           </h3>
//           <button
//             type="button"
//             className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
//           >
//             Get Started
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }

// // ==========================================
// // 2. MAIN DIRECTORY COMPONENT
// // ==========================================
// const Directory = () => {
//   const navigate = useNavigate();
//    const { state, city, category: urlCategory } = useParams();
//   const { user } = useContext(AuthContext);
//   const isLoggedIn = !!user;

//   const slugify = (value = "") => {
//   return value
//     .toString()
//     .trim()
//     .toLowerCase()
//     .replace(/&/g, "and")
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

//   // REFS FOR AUTO-SCROLL
//   const resultsRef = useRef(null);

//   // TOGGLE STATE: "location" OR "business"
//   const [searchMode, setSearchMode] = useState("location");

//   // FILTER STATES
//   // FILTER STATES
// const [selectedState, setSelectedState] = useState("");
// const [selectedCity, setSelectedCity] = useState("");
// const [category, setCategory] = useState("");
// const [searchBy, setSearchBy] = useState("firmName");
// const [searchValue, setSearchValue] = useState("");

// // URL SE FILTERS LOAD
// useEffect(() => {
//   if (!state && !city && !urlCategory) {
//     return;
//   }

//   setSelectedState(
//     state
//       ? state
//           .split("-")
//           .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(" ")
//       : ""
//   );

//   setSelectedCity(
//     city
//       ? city
//           .split("-")
//           .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(" ")
//       : ""
//   );

//   setCategory(
//     urlCategory
//       ? urlCategory.replace(/-/g, "_")
//       : ""
//   );
// }, [state, city, urlCategory]);

// // DIRECTORY DATA
// const [directoryData, setDirectoryData] = useState([]);
// const [loading, setLoading] = useState(false);

//   const transportCategories = useMemo(
//     () => [
//       { label: "All Categories", value: "" },
//       { label: "Transporter", value: "transporter" },
//       { label: "Broker", value: "broker" },
//       { label: "Fleet Owner", value: "fleet_owner" },
//       { label: "Truck Owner", value: "truck_owner" },
//       { label: "Logistics Company", value: "logistics_company" },
//       { label: "Warehouse", value: "warehouse" },
//       { label: "Courier", value: "courier" },
//       { label: "Packers & Movers", value: "packers_and_movers" },
//       { label: "Commission Agent", value: "commission_agent" },
//       { label: "RTO Agent", value: "rto_agent" },
//       { label: "Finance Agent", value: "finance_company" },
//       { label: "Travel & Taxi", value: "travel_taxi" },
//       { label: "Others", value: "others" },
//     ],
//     [],
//   );

//   // SCROLL RESTORATION LOGIC (Footer glitch resolved via manual history control)
//   useEffect(() => {
//     if ("scrollRestoration" in window.history) {
//       window.history.scrollRestoration = "manual";
//     }

//     if (!loading && directoryData.length > 0) {
//       const lastCardId = sessionStorage.getItem("lastViewedDirectoryCardId");

//       if (lastCardId) {
//         const timer = setTimeout(() => {
//           const element = document.getElementById(lastCardId);

//           if (element) {
//             const navbarHeight = 80;
//             const elementPosition = element.getBoundingClientRect().top;
//             const offsetPosition =
//               elementPosition + window.pageYOffset - navbarHeight;

//             window.scrollTo({
//               top: offsetPosition,
//               behavior: "instant",
//             });
//           }

//           sessionStorage.removeItem("lastViewedDirectoryCardId");
//         }, 150);

//         return () => clearTimeout(timer);
//       }
//     }
//   }, [loading, directoryData]);

//   // AUTO SCROLL TO RESULTS ON MOBILE SEARCH
//   const scrollToResults = () => {
//     if (window.innerWidth < 768 && resultsRef.current) {
//       setTimeout(() => {
//         const yOffset = -70;
//         const y =
//           resultsRef.current.getBoundingClientRect().top +
//           window.pageYOffset +
//           yOffset;
//         window.scrollTo({ top: y, behavior: "smooth" });
//       }, 100);
//     }
//   };

//   // UNIFIED FETCH FUNCTION
// const fetchDirectoryData = useCallback(async (filters = {}) => {
//   try {
//     setLoading(true);

//     const params = {};

//     if (filters.state) params.state = filters.state;
//     if (filters.city) params.city = filters.city;
//     if (filters.category) params.category = filters.category;

//     const response = await API.get("/directory", { params });

//     if (response.data && response.data.success) {
//       setDirectoryData(response.data.data || []);
//     } else if (Array.isArray(response.data)) {
//       setDirectoryData(response.data);
//     } else {
//       setDirectoryData([]);
//     }
//   } catch (error) {
//     console.error("Directory Fetch Error:", error);
//     setDirectoryData([]);
//   } finally {
//     setLoading(false);
//   }
// }, []);

// // useEffect(() => {
// //   fetchDirectoryData({
// //     state: selectedState,
// //     city: selectedCity,
// //     category: category,
// //   });
// // }, [selectedState, selectedCity, category]);

//   // SEARCH BY LOCATION & CATEGORY
//   useEffect(() => {
//   const stateName = state
//     ? state
//         .split("-")
//         .map(
//           (word) =>
//             word.charAt(0).toUpperCase() + word.slice(1)
//         )
//         .join(" ")
//     : "";

//   const cityName = city
//     ? city
//         .split("-")
//         .map(
//           (word) =>
//             word.charAt(0).toUpperCase() + word.slice(1)
//         )
//         .join(" ")
//     : "";

//   const categoryValue = urlCategory
//     ? urlCategory.replace(/-/g, "_")
//     : "";

//   // URL ke filters UI me set karo
//   setSelectedState(stateName);
//   setSelectedCity(cityName);
//   setCategory(categoryValue);

//   // /directory par koi filter nahi hai
//   // isliye saara data aayega
//   fetchDirectoryData({
//     state: stateName,
//     city: cityName,
//     category: categoryValue,
//   });
// }, [state, city, urlCategory, fetchDirectoryData]);
// const handleLocationSearch = (e) => {
//   e.preventDefault();

//   const stateSlug = slugify(selectedState);
//   const citySlug = slugify(selectedCity);
//   const categorySlug = slugify(category);

//   let url = "/directory";

//   if (stateSlug) {
//     url += `/${stateSlug}`;
//   }

//   if (citySlug) {
//     url += `/${citySlug}`;
//   }

//   if (categorySlug) {
//     url += `/${categorySlug}`;
//   }

//   navigate(url);

//   scrollToResults();

//   fetchDirectoryData({
//     state: selectedState,
//     city: selectedCity,
//     category: category,
//   });
// };

//   // SEARCH BY FIRM / OWNER / NUMBER
//   const handleBusinessSearch = async (e) => {
//     e.preventDefault();
//     if (!searchValue.trim()) return;

//     scrollToResults();

//     try {
//       setLoading(true);
//       const response = await API.get("/businesses/search-by", {
//         params: {
//           searchBy,
//           searchValue: searchValue.trim(),
//         },
//       });

//       if (response.data?.success) {
//         setDirectoryData(response.data.data || []);
//       } else {
//         setDirectoryData([]);
//       }
//     } catch (error) {
//       console.error("Business Search Error:", error);
//       setDirectoryData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // RESET FILTERS
//   const handleResetFilters = () => {
//     setSelectedState("");
//     setSelectedCity("");
//     setCategory("");
//     setSearchBy("firmName");
//     setSearchValue("");

//     fetchDirectoryData({
//       state: "",
//       city: "",
//       category: "",
//     });
//   };

//   // PHONE NUMBER MASKING
//   const maskPhoneNumber = (number) => {
//     if (!number) return "Not Provided";
//     const str = String(number).trim();
//     if (str.length >= 10) {
//       return "XXXXXX" + str.slice(-4);
//     }
//     return "XXXXXXXXXX";
//   };

//   return (
//     <div className="w-full max-w-[1550px] mx-auto px-3 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 mb-16">
//       <DirectoryMarquee />

//       {/* ==========================================
//           SEARCH FILTERS BOX WITH SLIDING TOGGLE
//       ========================================== */}
//       <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 mb-8 sm:mb-10">
//         {/* Header & Reset Button */}
//         <div className="flex items-center justify-between gap-2 mb-5 sm:mb-6">
//           <div className="flex items-center gap-2.5">
//             <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
//               <Filter size={20} className="sm:w-[22px] sm:h-[22px]" />
//             </div>
//             <div>
//               <h2 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
//                 Find Transport Directory
//               </h2>
//               <p className="hidden sm:block text-[15px] text-gray-500">
//                 Filter verified transporters, brokers & routes across India
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleResetFilters}
//             className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition border border-gray-200 cursor-pointer shrink-0 active:scale-95"
//           >
//             <RotateCcw size={15} />
//             <span className="hidden sm:inline">Reset All</span>
//             <span className="sm:hidden">Reset</span>
//           </button>
//         </div>

//         {/* SLIDING SEGMENTED CONTROL */}
//         <div className="w-full max-w-lg mx-auto mb-6 sm:mb-8">
//           <div className="relative p-1 bg-gray-100/90 rounded-2xl flex items-center border border-gray-200/80">
//             {/* Tab 1 */}
//             <button
//               type="button"
//               onClick={() => setSearchMode("location")}
//               className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer select-none ${
//                 searchMode === "location"
//                   ? "text-blue-700"
//                   : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               <MapPin
//                 size={16}
//                 className={
//                   searchMode === "location" ? "text-blue-600" : "text-gray-400"
//                 }
//               />
//               <span>Location Search</span>
//               {searchMode === "location" && (
//                 <motion.div
//                   layoutId="activeSearchTab"
//                   transition={{ type: "spring", stiffness: 400, damping: 35 }}
//                   className="absolute inset-0 bg-white rounded-xl shadow-md border border-gray-100 -z-10"
//                 />
//               )}
//             </button>

//             {/* Tab 2 */}
//             <button
//               type="button"
//               onClick={() => setSearchMode("business")}
//               className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-bold transition-colors duration-200 cursor-pointer select-none ${
//                 searchMode === "business"
//                   ? "text-purple-700"
//                   : "text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               <Building2
//                 size={16}
//                 className={
//                   searchMode === "business"
//                     ? "text-purple-600"
//                     : "text-gray-400"
//                 }
//               />
//               <span>Firm / Owner No.</span>
//               {searchMode === "business" && (
//                 <motion.div
//                   layoutId="activeSearchTab"
//                   transition={{ type: "spring", stiffness: 400, damping: 35 }}
//                   className="absolute inset-0 bg-white rounded-xl shadow-md border border-gray-100 -z-10"
//                 />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* FORMS */}
//         <AnimatePresence mode="wait">
//           {searchMode === "location" ? (
//             <motion.form
//               key="location-form"
//               initial={{ opacity: 0, y: 6 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -6 }}
//               transition={{ duration: 0.2 }}
//               onSubmit={handleLocationSearch}
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 items-end"
//             >
//               <div>
//                 <label className="text-[15px] font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
//                   <MapPin size={14} className="text-blue-600" />
//                   State
//                 </label>
//                 <LocationSearchInput
//                   placeholder="Search State..."
//                   selectedValue={selectedState}
//                   onSelectLocation={(loc) =>
//                     setSelectedState(loc ? loc.name : "")
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[15px] font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
//                   <MapPin size={14} className="text-green-600" />
//                   City
//                 </label>
//                 <LocationSearchInput
//                   placeholder="Search City..."
//                   selectedValue={selectedCity}
//                   onSelectLocation={(loc) =>
//                     setSelectedCity(loc ? loc.name : "")
//                   }
//                 />
//               </div>

//               <div>
//                 <label className="text-[15px] font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
//                   <Briefcase size={14} className="text-orange-500" />
//                   Category
//                 </label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full h-[48px] bg-gray-50/80 border border-gray-200 rounded-2xl px-4 text-sm text-gray-800 outline-none focus:border-blue-500 focus:bg-white transition cursor-pointer"
//                 >
//                   {transportCategories.map((cat, index) => (
//                     <option key={index} value={cat.value}>
//                       {cat.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full h-[48px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition shadow-lg shadow-blue-500/25 cursor-pointer text-sm"
//               >
//                 <Search size={18} />
//                 Search Directory
//               </button>
//             </motion.form>
//           ) : (
//             <motion.form
//               key="business-form"
//               initial={{ opacity: 0, y: 6 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -6 }}
//               transition={{ duration: 0.2 }}
//               onSubmit={handleBusinessSearch}
//               className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 items-end"
//             >
//               <div>
//                 <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
//                   <CircleDot size={14} className="text-purple-600" />
//                   Select category (Firm/Owner/Number)
//                 </label>
//                 <select
//                   value={searchBy}
//                   onChange={(e) => setSearchBy(e.target.value)}
//                   className="w-full h-[48px] bg-gray-50/80 border border-gray-200 rounded-2xl px-4 text-sm text-gray-800 outline-none focus:border-purple-500 focus:bg-white transition cursor-pointer"
//                 >
//                   <option value="firmName">Firm Name</option>
//                   <option value="ownerName">Owner Name</option>
//                   <option value="phoneNumber">Phone Number</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-1.5">
//                   <Search size={14} className="text-purple-600" />
//                   Search Keyword / Number
//                 </label>
//                 <input
//                   type={searchBy === "phoneNumber" ? "tel" : "text"}
//                   value={searchValue}
//                   onChange={(e) => setSearchValue(e.target.value)}
//                   placeholder={
//                     searchBy === "firmName"
//                       ? "Enter Firm Name..."
//                       : searchBy === "ownerName"
//                         ? "Enter Owner Name..."
//                         : "Enter Phone Number..."
//                   }
//                   className="w-full h-[48px] bg-gray-50/80 border border-gray-200 rounded-2xl px-4 text-sm text-gray-800 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:bg-white transition placeholder:text-gray-400"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full h-[48px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition shadow-lg shadow-purple-500/25 cursor-pointer text-sm"
//               >
//                 <Search size={18} />
//                 Search Business
//               </button>
//             </motion.form>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* ==========================================
//           DIRECTORY RESULT SECTION
//       ========================================== */}
//       <div ref={resultsRef} className="scroll-mt-24">
//         <div className="flex items-center justify-between mb-5 sm:mb-6">
//           <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
//             Directory Results
//             <span className="text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
//               {directoryData.length} {directoryData.length === 1 ? "Partner" : "Partners"}
//             </span>
//           </h3>
//         </div>

//         {loading ? (
//           <div className="text-center py-24 sm:py-28 font-medium text-gray-500 animate-pulse">
//             Loading Directory Details...
//           </div>
//         ) : directoryData.length === 0 ? (
//           <div className="bg-white rounded-2xl p-10 sm:p-16 text-center text-gray-500 font-medium shadow-sm border border-gray-100">
//             No Transport Found matching your criteria.
//           </div>
//         ) : (
//           <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-6">
//             {/* LEFT LISTINGS */}
//             <section className="min-w-0 space-y-4">
//               {directoryData.map((item, index) => {
//                 const displayPhone = isLoggedIn
//                   ? item.phoneNumber
//                   : maskPhoneNumber(item.phoneNumber);

//                 const whatsappNumber = String(item.phoneNumber || "").replace(/\D/g, "");
//                 const formattedRole = item.role
//                   ? item.role.replace(/_/g, " ")
//                   : "Transporter";
//                 const rating = Number(item.averageRating || 0).toFixed(1);
//                 const reviews = item.totalReviews || 0;
//                 const cardId = `directory-card-${item._id || index}`;

//                 const tags = [];
//                 if (item.role) tags.push(formattedRole);
//                 if (Array.isArray(item.vehicleTypes)) {
//                   item.vehicleTypes.filter(Boolean).slice(0, 3).forEach((v) => tags.push(v));
//                 }
//                 if (tags.length === 0) tags.push("Transport Services");

//                 const location = [item.city, item.state].filter(Boolean).join(", ") || "Location not provided";

//                 return (
//                   <div
//                     key={item._id || index}
//                     id={cardId}
//                     className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-200 hover:shadow-md"
//                   >
//                     {/* CARD LAYOUT: MOBILE COLUMN / DESKTOP ROW */}
//                     <div className="flex w-full flex-col sm:flex-row">
//                       {/* IMAGE */}
//                       <div className="h-52 w-full shrink-0 overflow-hidden bg-gray-100 sm:h-auto sm:min-h-[260px] sm:w-[30%] md:w-[28%] lg:w-[27%]">
//                         {item.photo ? (
//                           <img
//                             src={item.photo}
//                             alt={item.firmName || "Profile"}
//                             className="h-full w-full object-cover"
//                             onError={(e) => {
//                               e.currentTarget.style.display = "none";
//                               if (e.currentTarget.nextElementSibling) {
//                                 e.currentTarget.nextElementSibling.style.display = "flex";
//                               }
//                             }}
//                           />
//                         ) : null}
//                         <div
//                           className={`h-full w-full items-center justify-center bg-gray-100 text-4xl font-bold text-gray-400 ${item.photo ? "hidden" : "flex"}`}
//                         >
//                           {item.firmName ? item.firmName.charAt(0).toUpperCase() : <UserIcon size={42} />}
//                         </div>
//                       </div>

//                       {/* CARD INFORMATION */}
//                       <div className="min-w-0 flex-1 p-3 sm:p-4 md:p-5">
//                         {/* BUSINESS NAME */}
//                         <div className="flex items-start gap-1.5 pr-7 sm:gap-2">
//                           <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-800 text-white sm:h-7 sm:w-7">
//                             <ThumbsUp size={12} fill="currentColor" />
//                           </div>
//                           <div className="min-w-0">
//                             <h2 className="line-clamp-2 text-base font-semibold leading-5 text-gray-900 sm:text-lg sm:leading-6 md:text-xl">
//                               {item.firmName || "Unnamed Firm"}
//                             </h2>
//                             <p className="mt-0.5 truncate text-[11px] capitalize text-gray-500 sm:text-sm">
//                               {item.ownerName && item.ownerName !== item.firmName ? `${item.ownerName} • ` : ""}
//                               {formattedRole}
//                             </p>
//                           </div>
//                         </div>

//                         {/* RATING + REVIEWS + VERIFIED */}
//                         <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:mt-3 sm:gap-2">
//                           <span className="rounded-md bg-green-600 px-2 py-1 text-[11px] font-bold text-white sm:px-2.5 sm:text-sm">
//                             {rating} ★
//                           </span>
//                           <span className="text-[11px] text-gray-500 sm:text-sm">
//                             {reviews} {reviews === 1 ? "Rating" : "Ratings"}
//                           </span>
//                           {item.isVerified && (
//                             <span className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 sm:text-sm">
//                               <CheckCircle2 size={15} fill="currentColor" />
//                               Verified
//                             </span>
//                           )}
//                         </div>

//                         {/* LOCATION */}
//                         <div className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-gray-700 sm:mt-3 sm:gap-2 sm:text-sm">
//                           <MapPin size={16} className="mt-0.5 shrink-0 sm:h-[18px] sm:w-[18px]" />
//                           <span className="line-clamp-2">{location}</span>
//                         </div>

//                         {/* TAGS */}
//                         <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
//                           {tags.slice(0, 5).map((tag, tagIndex) => (
//                             <span
//                               key={`${tag}-${tagIndex}`}
//                               className="max-w-full truncate rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[9px] text-gray-700 sm:px-2.5 sm:text-xs"
//                             >
//                               {tag}
//                             </span>
//                           ))}
//                         </div>

//                         {/* VEHICLE / WORKING AREA DETAILS */}
//                         {(item.totalVehicles > 0 || (Array.isArray(item.workingAreas) && item.workingAreas.length > 0)) && (
//                           <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
//                             {item.totalVehicles > 0 && (
//                               <span className="max-w-full truncate rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[9px] text-gray-700 sm:px-2.5 sm:text-xs">
//                                 {item.totalVehicles} {item.totalVehicles === 1 ? "Vehicle" : "Vehicles"}
//                               </span>
//                             )}
//                             {Array.isArray(item.workingAreas) && item.workingAreas.slice(0, 3).map((area, areaIndex) => (
//                               <span
//                                 key={area._id || areaIndex}
//                                 className="max-w-full truncate rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-[9px] text-gray-700 sm:px-2.5 sm:text-xs"
//                               >
//                                 {Array.isArray(area?.cities) && area.cities.filter(Boolean).length > 0
//                                   ? `${area.cities.filter(Boolean).join(", ")} (${area.state || ""})`
//                                   : area.state || "All Regions"}
//                               </span>
//                             ))}
//                           </div>
//                         )}

//                         {/* ACTION BUTTONS - SAME REFERENCE SIZING */}
//                         <div className="mt-3 flex w-full gap-1.5 sm:mt-5 sm:gap-2">
//                           <a
//                             href={`tel:${item.phoneNumber}`}
//                             onClick={(e) => {
//                               sessionStorage.setItem("lastViewedDirectoryCardId", cardId);
//                               if (!isLoggedIn) {
//                                 e.preventDefault();
//                                 const targetUrl = `/dashboard/transporters/${item._id}`;
//                                 sessionStorage.setItem("authRedirectUrl", targetUrl);
//                                 navigate("/login", { state: { returnTo: targetUrl } });
//                               }
//                             }}
//                             className="inline-flex min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden rounded-md bg-green-600 px-2 py-2.5 text-[9px] font-semibold text-white transition hover:bg-green-700 sm:flex-none sm:px-4 sm:text-sm"
//                           >
//                             <Phone size={14} className="shrink-0" />
//                             <span className="truncate">{displayPhone}</span>
//                           </a>

//                           <a
//                             href={whatsappNumber ? `https://wa.me/91${whatsappNumber}` : "#"}
//                             target="_blank"
//                             rel="noreferrer"
//                             onClick={(e) => {
//                               if (!whatsappNumber) e.preventDefault();
//                               sessionStorage.setItem("lastViewedDirectoryCardId", cardId);
//                             }}
//                             className="inline-flex min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden rounded-md border border-gray-300 bg-white px-2 py-2.5 text-[9px] font-semibold text-gray-800 transition hover:bg-gray-50 sm:flex-none sm:px-4 sm:text-sm"
//                           >
//                             <MessageCircle size={14} className="shrink-0 text-green-600" />
//                             <span className="truncate">WhatsApp</span>
//                           </a>

//                           <button
//                             type="button"
//                             onClick={() => {
//                               sessionStorage.setItem("lastViewedDirectoryCardId", cardId);
//                               const targetUrl = `/dashboard/transporters/${item._id}`;
//                               if (!isLoggedIn) {
//                                 sessionStorage.setItem("authRedirectUrl", targetUrl);
//                                 navigate("/login", { state: { returnTo: targetUrl } });
//                                 return;
//                               }
//                               navigate(targetUrl);
//                             }}
//                             className="inline-flex min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden rounded-md bg-blue-600 px-2 py-2.5 text-[9px] font-semibold text-white transition hover:bg-blue-700 sm:flex-none sm:px-4 sm:text-sm"
//                           >
//                             <span className="truncate">
//                               <span className="sm:hidden">Enquiry</span>
//                               <span className="hidden sm:inline">view profile</span>
//                             </span>
//                             <ArrowRight size={14} className="shrink-0" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </section>

//             {/* RIGHT SIDEBAR */}
//             <EnquirySidebar category={category} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Directory;

