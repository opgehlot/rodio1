import React, { useState, useEffect, useRef } from "react";
import API from "../../api/api";

const LocationSearchInput = ({ placeholder, onSelectLocation, zIndex }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced API call when user types
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
    setSearchTerm(item.name); // Show selected city in input
    setIsOpen(false);
    onSelectLocation(item); // Pass full object to parent
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%", zIndex: isFocused ? zIndex : 1 }}>
      <input
        type="text"
        value={searchTerm}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: isFocused ? "1px solid #2563eb" : "1px solid #d1d5db",
          outline: "none",
          transition: "border-color 0.2s",
        }}
      />

      {loading && (
        <div
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#888",
            fontSize: "12px",
          }}
        >
          Loading...
        </div>
      )}

      {isOpen && (suggestions.length > 0 || !loading) && (
        <ul
          className="suggestions-list"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
            listStyle: "none",
            padding: 0,
            marginTop: "8px",
          }}
        >
          {suggestions.length > 0 ? (
            suggestions.map((item, i) => (
              <li
                key={item._id || i}
                onClick={() => handleSelect(item)}
                style={{
                  padding: "10px 15px",
                  cursor: "pointer",
                  borderBottom: i === suggestions.length - 1 ? "none" : "1px solid #f0f0f0",
                }}
              >
                <strong>{item.name}</strong>, <small style={{ color: "#6c757d" }}>{item.state}</small>
              </li>
            ))
          ) : (
            <li style={{ padding: "10px 15px", color: "#6c757d", textAlign: "center" }}>
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default LocationSearchInput;

const hoverStyle = `
  .suggestions-list li:hover {
    background-color: #f8f9fa;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = hoverStyle;
document.head.appendChild(styleSheet);