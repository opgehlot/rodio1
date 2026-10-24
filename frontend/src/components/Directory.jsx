import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  X,
  Truck,
  Phone,
  RotateCcw,
  CircleDot,
  User as UserIcon,
  Building2,
  Star,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Megaphone,
} from "lucide-react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import DirectoryMarquee from "./DirectoryMarquee";

const API_KEY = "ashu@rodio";

// Ek page par kitne cards (items) dikhane hain
const PAGE_SIZE = 10;

// LEFT ADS STRIP ke ads. Abhi khaali -> placeholders dikhte hain.
// Admin panel se ads aane par isme { _id, image, link, title } ki list aayegi
// (ya isko API se bhari hui state se replace kar dena).
const ADMIN_ADS = [];

// ==========================================
// HELPERS
// ==========================================
const slugify = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const titleCase = (slug = "") =>
  slug
    ? slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

// Page numbers with "..." (jaise: 1 ... 4 5 6 ... 12)
const getPageNumbers = (current, total) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) pages.push("left-dots");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("right-dots");

  pages.push(total);
  return pages;
};

// ==========================================
// 0. PAGINATION BAR
// ==========================================
const PaginationBar = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  const baseBtn =
    "inline-flex h-10 items-center justify-center rounded-xl border text-sm font-bold transition active:scale-95";

  return (
    <div className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        {/* PREV */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${baseBtn} gap-1 px-3 sm:px-4 ${
            currentPage === 1
              ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300"
              : "cursor-pointer border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
          }`}
        >
          <ChevronLeft size={18} />
          Prev
        </button>

        {/* MOBILE */}
        <span className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 sm:hidden">
          Page {currentPage} / {totalPages}
        </span>

        {/* DESKTOP */}
        <div className="hidden items-center gap-2 sm:flex">
          {pages.map((p) =>
            typeof p === "string" ? (
              <span key={p} className="px-1 text-gray-400">
                ...
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                className={`${baseBtn} w-10 cursor-pointer ${
                  p === currentPage
                    ? "border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25"
                    : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>

        {/* NEXT */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${baseBtn} gap-1 px-3 sm:px-4 ${
            currentPage === totalPages
              ? "cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300"
              : "cursor-pointer border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 hover:opacity-95"
          }`}
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

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
          { headers: { "x-api-key": API_KEY } }
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
// 2. LEFT ADS STRIP (admin panel se aane wale ads ke liye)
//
// STRUCTURE (baad me admin panel se ads add karne ke liye):
//   - Strip me fixed-size (3:4) ad slots hote hain.
//   - Jab tak ADMIN_ADS khaali hai -> khaali "Ad Space" slots dikhte hain.
//   - Admin panel se ad aaye to bas us list me ye shape ka object daalo:
//       {
//         _id:   "unique-id",
//         image: "https://.../ad.jpg",     // required (recommended size 600x800, 3:4)
//         link:  "https://..."  ,          // optional (click par naye tab me khulega)
//         title: "Ad name"                 // optional (alt text)
//       }
//   - 3 ya usse zyada ads hone par strip apne aap upar scroll hoti hai
//     (hover par ruk jaati hai).
// ==========================================
const AD_PLACEHOLDER_COUNT = 8;

const AdsStrip = ({ ads = [] }) => {
  const hasAds = ads.length > 0;
  const shouldScroll = ads.length >= 3;

  const slots = hasAds
    ? ads
    : Array.from({ length: AD_PLACEHOLDER_COUNT }, (_, i) => ({
        _id: `placeholder-${i}`,
        placeholder: true,
      }));

  // Seamless loop ke liye list 2 baar
  const loopSlots = shouldScroll ? [...slots, ...slots] : slots;
  const duration = Math.max(20, ads.length * 6);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <style>{`
        @keyframes adsScrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .ads-track-run { animation: adsScrollUp ${duration}s linear infinite; }
        .ads-viewport:hover .ads-track-run { animation-play-state: paused; }
      `}</style>

      <div className="flex shrink-0 items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2.5 text-white">
        <Megaphone size={16} />
        <span className="text-sm font-bold">Featured Ads</span>
      </div>

      <div className="ads-viewport relative min-h-0 flex-1 overflow-hidden bg-gray-50/60">
        <div
          className={`flex flex-col gap-3 p-3 ${
            shouldScroll ? "ads-track-run" : ""
          }`}
        >
          {loopSlots.map((ad, i) =>
            ad.placeholder ? (
              <div
                key={ad._id}
                className="flex aspect-[3/4] w-full shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-blue-200 bg-white text-center"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                  <Megaphone size={18} />
                </span>
                <p className="text-xs font-bold text-blue-600">Ad Space</p>
                <p className="text-[11px] text-gray-400">Your Ad Here</p>
              </div>
            ) : (
              <a
                key={`${ad._id}-${i}`}
                href={ad.link || undefined}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-[3/4] w-full shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <img
                  src={ad.image}
                  alt={ad.title || "Ad"}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. MAIN DIRECTORY COMPONENT
// ==========================================
const Directory = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  // Dashboard ke andar sidebar (300px) jagah leta hai, isliye ads strip wahan chhupa dete hain
  const inDashboard = routerLocation.pathname.startsWith("/dashboard");
  const { state, city, category: urlCategory } = useParams();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const resultsRef = useRef(null);

  // TOGGLE STATE: "location" OR "business"
  const [searchMode, setSearchMode] = useState("location");

  // FILTER STATES
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [category, setCategory] = useState("");
  const [searchBy, setSearchBy] = useState("firmName");
  const [searchValue, setSearchValue] = useState("");

  // DIRECTORY DATA
  const [directoryData, setDirectoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileAssets, setProfileAssets] = useState({});

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(directoryData.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedData = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE;
    return directoryData.slice(startIndex, startIndex + PAGE_SIZE);
  }, [directoryData, safePage]);

  // Nayi list aayi to page 1 par; profile se wapas aaye to us card ke page par
  useEffect(() => {
    const lastCardId = sessionStorage.getItem("lastViewedDirectoryCardId");
    let page = 1;

    if (lastCardId && directoryData.length > 0) {
      const index = directoryData.findIndex(
        (item, i) => `directory-card-${item._id || i}` === lastCardId
      );
      if (index >= 0) page = Math.floor(index / PAGE_SIZE) + 1;
    }

    setCurrentPage(page);
  }, [directoryData]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    if (resultsRef.current) {
      const y =
        resultsRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        90;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Profile / ad images ko transporter details API se load karo (sirf current page)
  useEffect(() => {
    let cancelled = false;

    const loadProfileAssets = async () => {
      const missingItems = paginatedData.filter(
        (item) =>
          item?._id &&
          !Object.prototype.hasOwnProperty.call(profileAssets, item._id) &&
          (!(item.profile?.profileImage || item.profileImage) ||
            !(item.profile?.adImage || item.adImage))
      );
      if (!missingItems.length) return;

      const results = await Promise.allSettled(
        missingItems.map(async (item) => {
          const response = await API.get(`/transporters/${item._id}`);
          const details = response.data?.data;
          return {
            id: item._id,
            profileImage:
              details?.profile?.profileImage ||
              details?.profileImage ||
              item.profile?.profileImage ||
              item.profileImage ||
              "",
            adImage:
              details?.profile?.adImage ||
              details?.adImage ||
              item.profile?.adImage ||
              item.adImage ||
              "",
          };
        })
      );

      if (cancelled) return;
      setProfileAssets((previous) => {
        const next = { ...previous };
        results.forEach((result) => {
          if (result.status === "fulfilled") next[result.value.id] = result.value;
        });
        return next;
      });
    };

    loadProfileAssets();
    return () => {
      cancelled = true;
    };
  }, [paginatedData, profileAssets]);

  const transportCategories = useMemo(
    () => [
      { label: "All Categories", value: "" },
      { label: "User / Manufacturer / Trader / Shipper / Other", value: "user" },
      { label: "Transporter (Service Provider)", value: "transporter" },
      { label: "Broker", value: "broker" },
      { label: "Fleet Owner", value: "fleet_owner" },
      { label: "Truck Owner", value: "truck_owner" },
      { label: "Logistics Company", value: "logistics_company" },
      { label: "Warehouse", value: "warehouse" },
      { label: "CHA Agent (Custom House Agent)", value: "cha_agent" },
      { label: "Courier / Cargo Carrier", value: "courier" },
      { label: "Bus Service", value: "bus_service" },
      { label: "Travel & Taxi Service", value: "travel_taxi" },
      { label: "Bus / Truck Body Builder", value: "truck_body_builder" },
      { label: "RTO Agent", value: "rto_agent" },
      { label: "Finance Company", value: "finance_company" },
      { label: "Finance Agent", value: "finance_agent" },
      { label: "Packers & Movers", value: "packers_and_movers" },
      { label: "Insurance Company", value: "insurance_company" },
      { label: "Car Carrier", value: "car_carrier" },
      { label: "Mining Vehicle Supplier", value: "miningvehicle_supplier" },
      { label: "Parts & Battery Supplier", value: "partstypesbettry_supplier" },
      { label: "Mechanic & Service Center", value: "mechanic and service center" },
      { label: "Bike Taxi Auto", value: "biketexiauto" },
      { label: "C&F Agent", value: "candfagent" },
      { label: "Commission Agent", value: "commission_agent" },
      { label: "Others", value: "others" },
    ],
    []
  );

  // SCROLL RESTORATION LOGIC
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

            window.scrollTo({ top: offsetPosition, behavior: "instant" });
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

      const response = await API.get("/directory", {
        params,
        headers: { "x-api-key": API_KEY },
      });

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

  // URL SE FILTERS LOAD + DATA FETCH
  useEffect(() => {
    const stateName = titleCase(state);
    const cityName = titleCase(city);
    const categoryValue = urlCategory ? urlCategory.replace(/-/g, "_") : "";

    setSelectedState(stateName);
    setSelectedCity(cityName);
    setCategory(categoryValue);

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
    if (stateSlug) url += `/${stateSlug}`;
    if (citySlug) url += `/${citySlug}`;
    if (categorySlug) url += `/${categorySlug}`;

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
        params: { searchBy, searchValue: searchValue.trim() },
        headers: { "x-api-key": API_KEY },
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

    fetchDirectoryData({ state: "", city: "", category: "" });
  };

  // ==========================================
  // DATA HELPERS
  // ==========================================
  const getProfileImage = useCallback(
    (item) =>
      item.profile?.profileImage ||
      item.profileImage ||
      profileAssets[item._id]?.profileImage ||
      "",
    [profileAssets]
  );

  const getAdImage = useCallback(
    (item) =>
      item.profile?.adImage ||
      item.adImage ||
      profileAssets[item._id]?.adImage ||
      "",
    [profileAssets]
  );

  const getCardId = (item, index) => `directory-card-${item._id || index}`;

  const openProfile = (item, cardId) => {
    if (!item?._id) return;
    if (cardId) sessionStorage.setItem("lastViewedDirectoryCardId", cardId);
    const targetUrl = `/dashboard/transporters/${item._id}`;
    if (!isLoggedIn) {
      sessionStorage.setItem("authRedirectUrl", targetUrl);
      navigate("/login", { state: { returnTo: targetUrl } });
      return;
    }
    navigate(targetUrl);
  };

  // ==========================================
  // ROWS BANANA (current page ke items se)
  //  - Ad image wala item  -> ek poori row ("ad" row)
  //  - Ad image nahi wale  -> 2-2 karke ek row ("pair" row)
  // ==========================================
  const rows = useMemo(() => {
    const result = [];
    let buffer = [];

    const flush = () => {
      if (buffer.length) {
        result.push({ type: "pair", items: buffer });
        buffer = [];
      }
    };

    paginatedData.forEach((item, pageIndex) => {
      const index = (safePage - 1) * PAGE_SIZE + pageIndex;
      const entry = { item, index };

      if (getAdImage(item)) {
        flush();
        result.push({ type: "ad", items: [entry] });
      } else {
        buffer.push(entry);
        if (buffer.length === 2) flush();
      }
    });
    flush();

    return result;
  }, [paginatedData, safePage, getAdImage]);

  // ==========================================
  // SHARED: Call / WhatsApp / View Profile (ek row)
  // ==========================================
  const renderActionButtons = (item, cardId) => {
    const phoneForLink = String(item.phoneNumber || "").replace(/[^0-9+]/g, "");
    const targetUrl = `/dashboard/transporters/${item._id}`;

    const handleContactClick = (e) => {
      sessionStorage.setItem("lastViewedDirectoryCardId", cardId);
      if (!isLoggedIn) {
        e.preventDefault();
        sessionStorage.setItem("authRedirectUrl", targetUrl);
        navigate("/login", { state: { returnTo: targetUrl } });
      } else if (!phoneForLink) {
        e.preventDefault();
      }
    };

    return (
      <div className="flex flex-nowrap gap-2">
        <a
          href={isLoggedIn && phoneForLink ? `tel:${phoneForLink}` : undefined}
          onClick={handleContactClick}
          className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-2 py-2.5 text-sm font-bold text-white shadow-md shadow-green-600/20 transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
        >
          <Phone size={16} fill="currentColor" /> Call
        </a>

        <a
          href={
            isLoggedIn && phoneForLink
              ? `https://wa.me/${phoneForLink.replace(/\D/g, "")}`
              : undefined
          }
          target="_blank"
          rel="noreferrer"
          onClick={handleContactClick}
          className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#1DA851] px-2 py-2.5 text-sm font-bold text-white shadow-md shadow-green-500/20 transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
        >
          <FaWhatsapp size={18} className="shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={() => openProfile(item, cardId)}
          className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-2 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
        >
          <UserIcon size={16} />
          <span className="truncate">View Profile</span>
        </button>
      </div>
    );
  };

  // ==========================================
  // SHARED PIECES: blue header + card data (dono card types yahi use karte hain)
  // ==========================================
  const getCardMeta = (item) => ({
    formattedRole: item.role
      ? item.role.replace(/_/g, " ")
      : "Transport Services",
    rating: Number(item.averageRating || 0).toFixed(1),
    reviews: item.totalReviews || 0,
    location: [item.address, item.city, item.state].filter(Boolean).join(", "),
    profileImage: getProfileImage(item),
  });

  // Blue header: [circle] firm name / owner name / Rodio Verified (naam ke neeche)
  const renderCardHeader = (item) => {
    const { formattedRole, profileImage } = getCardMeta(item);

    return (
      <div className="relative flex w-full shrink-0 items-center gap-3 overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white sm:p-4">
        <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-12 left-1/3 h-24 w-24 rounded-full bg-white/5" />

        {profileImage ? (
          <img
            src={profileImage}
            alt={`${item.firmName || "Business"} profile`}
            className="relative h-12 w-12 shrink-0 rounded-full border-2 border-white object-cover shadow-md ring-4 ring-white/20 sm:h-14 sm:w-14"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/70 bg-white/20 text-xl font-bold shadow-md ring-4 ring-white/10 sm:h-14 sm:w-14">
            {(item.firmName || "T").charAt(0).toUpperCase()}
          </div>
        )}

        <div className="relative min-w-0 flex-1">
          <p className="text-base font-bold leading-snug [overflow-wrap:break-word] sm:text-lg">
            {item.firmName || "Transport Partner"}
          </p>
          <p className="mt-0.5 truncate text-sm text-white/85">
            {item.ownerName || formattedRole}
          </p>

          {item.isVerified && (
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-white/40 bg-white/15 px-2 py-0.5 text-[11px] font-semibold backdrop-blur-sm">
              <BadgeCheck size={13} />
              Rodio Verified
            </span>
          )}
        </div>
      </div>
    );
  };

  // Card data: location + rating/contact + vehicles
  const renderCardData = (item) => {
    const { formattedRole, rating, reviews, location } = getCardMeta(item);

    return (
      <div className="flex min-h-0 w-full flex-1 flex-col gap-2.5 p-3 sm:p-4">
        {!!location && (
          <div className="flex items-start gap-2 text-sm text-gray-700">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <MapPin size={15} />
            </span>
            <span className="line-clamp-2 leading-snug">{location}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Rating
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-base font-bold text-gray-800">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              {rating}
              <span className="text-sm font-normal text-gray-500">
                ({reviews})
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Contact
            </p>
            <p className="mt-0.5 flex items-center gap-1 truncate text-base font-bold text-gray-800">
              <Phone size={14} className="shrink-0 text-green-600" />
              <span className="truncate">
                {isLoggedIn
                  ? item.phoneNumber || "Not provided"
                  : "Login to view"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-2.5 text-sm text-blue-800">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Truck size={15} />
          </span>
          <span className="line-clamp-2 font-medium">
            {item.totalVehicles > 0
              ? `${item.totalVehicles} Vehicles${
                  item.vehicleTypes?.length
                    ? `: ${item.vehicleTypes.join(", ")}`
                    : ""
                }`
              : item.category
                ? String(item.category).replace(/_/g, " ")
                : formattedRole}
          </span>
        </div>
      </div>
    );
  };

  // Header + data ek panel me (bina-ad wale pair cards ke liye)
  const renderInfoPanel = (item, cardId) => (
    <div
      role="button"
      tabIndex={0}
      onClick={() => openProfile(item, cardId)}
      onKeyDown={(e) => {
        if (e.key === "Enter") openProfile(item, cardId);
      }}
      className="flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-100 bg-white text-left"
      aria-label={`View profile of ${item.firmName || "Transport Partner"}`}
    >
      {renderCardHeader(item)}
      {renderCardData(item)}
    </div>
  );

  // ==========================================
  // ROW TYPE 1: AD CARD (ek hi card, image aur data ke beech koi gap nahi)
  //
  //  ┌────────────────────┬─────────────────────────────┐
  //  │                    │ (o) Firm name               │  <- blue header
  //  │      ad image      │     Owner / Rodio Verified  │
  //  │   (poori height)   ├─────────────────────────────┤
  //  │                    │         card data           │
  //  ├────────────────────┴─────────────────────────────┤
  //  │ [ Call ]       [ WhatsApp ]      [ View Profile ] │
  //  └──────────────────────────────────────────────────┘
  // ==========================================
  const renderAdRow = ({ item, index }) => {
    const cardId = getCardId(item, index);
    const adImage = getAdImage(item);

    return (
      <motion.article
        key={item._id || index}
        id={cardId}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="group flex w-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60"
      >
        {/* TOP: image + info.
            auto-fit: jagah kam ho to apne aap 1 column (image upar, info neeche) */}
        <div className="grid [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          {/* AD IMAGE */}
          <div className="relative h-[220px] w-full overflow-hidden bg-gray-50 sm:h-auto sm:min-h-[300px]">
            <img
              src={adImage}
              alt={item.firmName || "Ad"}
              className="absolute inset-0 h-full w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
              onClick={() => openProfile(item, cardId)}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
          </div>

          {/* RIGHT: blue header + card data */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => openProfile(item, cardId)}
            onKeyDown={(e) => {
              if (e.key === "Enter") openProfile(item, cardId);
            }}
            className="flex min-w-0 cursor-pointer flex-col"
            aria-label={`View profile of ${item.firmName || "Transport Partner"}`}
          >
            {renderCardHeader(item)}
            <div className="flex flex-1 flex-col justify-center">
              {renderCardData(item)}
            </div>
          </div>
        </div>

        {/* BOTTOM: buttons ki ek row (poori width) */}
        <div className="border-t border-gray-100 p-3 sm:p-4">
          {renderActionButtons(item, cardId)}
        </div>
      </motion.article>
    );
  };

  // ==========================================
  // ROW TYPE 2: PAIR ROW -> 2 cards side by side (bina ad image wale)
  // ==========================================
  const renderPairCard = ({ item, index }) => {
    const cardId = getCardId(item, index);

    return (
      <motion.article
        key={item._id || index}
        id={cardId}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="flex h-full w-full flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-shadow duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60 sm:p-4"
      >
        <div className="flex-1">{renderInfoPanel(item, cardId)}</div>
        <div className="mt-3">{renderActionButtons(item, cardId)}</div>
      </motion.article>
    );
  };

  const renderRow = (row, rowIndex) => {
    if (row.type === "ad") {
      return renderAdRow(row.items[0]);
    }
    return (
      <div
        key={`pair-${rowIndex}-${row.items[0].item._id || row.items[0].index}`}
        // Container ke hisaab se columns: 340px se kam jagah ho to 1 column
        className="grid gap-4 sm:gap-5 [grid-template-columns:repeat(auto-fill,minmax(340px,1fr))]"
      >
        {row.items.map(renderPairCard)}
      </div>
    );
  };

  return (
    <div className="mx-auto mb-16 w-full max-w-[1550px] px-3 pt-20 sm:px-6 sm:pt-24 md:pt-28 lg:px-8">
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
          RESULTS: LEFT = ADS SCROLLER | RIGHT = CARDS
      ========================================== */}
      <div ref={resultsRef} className="scroll-mt-24">
        <div className="flex items-stretch gap-5">
          {/* LEFT: ads strip. Sirf badi screen (xl+) par dikhti hai.
              Dashboard me sidebar ki wajah se jagah kam hoti hai, isliye 280px. */}
          <aside
            className={
              inDashboard
                ? "relative hidden w-[220px] shrink-0 lg:block xl:w-[240px]"
                : "relative hidden w-[500px] shrink-0 lg:block"
            }
          >
            <div className="absolute inset-0">
              <AdsStrip ads={ADMIN_ADS} />
            </div>
          </aside>

          {/* RIGHT: cards (min-w-0 zaroori hai, warna flex child chhota nahi hota) */}
          <div className="min-w-0 flex-1">
            {loading ? (
              <div className="text-center py-24 sm:py-28 font-medium text-gray-500 animate-pulse">
                Loading Directory Details...
              </div>
            ) : directoryData.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 sm:p-16 text-center text-gray-500 font-medium shadow-sm border border-gray-100">
                No Transport Found matching your criteria.
              </div>
            ) : (
              <div className="flex w-full flex-col gap-4 sm:gap-5">
                {rows.map(renderRow)}
              </div>
            )}
          </div>
        </div>

        {/* PAGINATION: ads strip ke neeche nahi, poori width me */}
        {!loading && directoryData.length > 0 && (
          <PaginationBar
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Directory;