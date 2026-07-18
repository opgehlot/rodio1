import { useState } from "react";
import Select, { components } from "react-select";
import { Search, MapPin, Truck } from "lucide-react";

import TransportCard from "../user/TransportCard";
import transports from "../user/data/transports";

const MultiValueContainer = (props) => {
  const count = props.getValue().length;

  return (
    <components.ValueContainer {...props}>
      {count === 0
        ? props.children
        : `${count} Vehicle${count > 1 ? "s" : ""} Selected`}
    </components.ValueContainer>
  );
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "58px",
    borderRadius: "18px",
    border: state.isFocused
      ? "2px solid #2563eb"
      : "1px solid #d1d5db",
    boxShadow: state.isFocused
      ? "0 0 0 4px rgba(37,99,235,.12)"
      : "none",
    cursor: "pointer",
    transition: "all .25s ease",

    "&:hover": {
      borderColor: "#2563eb",
    },
  }),

  valueContainer: (provided) => ({
    ...provided,
    padding: "0 14px",
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#6b7280",
    fontSize: "15px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#2563eb",
  }),

  multiValue: () => ({
    display: "none",
  }),

  menu: (provided) => ({
    ...provided,
    borderRadius: "18px",
    overflow: "hidden",
    zIndex: 9999,
  }),

  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? "#2563eb" : "#fff",
    color: state.isFocused ? "#fff" : "#111827",
    padding: "14px",
    cursor: "pointer",
  }),
};

export function SearchBar() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vehicleMenuOpen, setVehicleMenuOpen] = useState(false);

  const cityOptions = [
    ...new Set(transports.flatMap((item) => [item.from, item.to])),
  ].map((city) => ({
    value: city,
    label: city,
  }));

  const vehicleOptions = [
    "Mini Truck",
    "Pickup",
    "Tata Ace",
    "Bolero Pickup",
    "Eicher",
    "Truck",
    "Container",
    "Trailer",
    "Open Body Truck",
    "Closed Body Truck",
    "Tanker",
    "Tipper",
    "LCV",
    "HCV",
    "Tempo",
    "Canter",
    "Mahindra Jeeto",
    "Ashok Leyland Dost",
    "Tractor Trolley",
    "Refrigerated Truck",
  ].map((item) => ({
    value: item,
    label: item,
  }));

  const handleSearch = async () => {
    if (!from || !to) {
      alert("Please select From and To City");
      return;
    }

    try {
      setLoading(true);

      const vehicles = vehicleTypes
        .map((item) => item.value)
        .join(",");

      const response = await fetch(
        `https://rodio-tradelink.onrender.com/api/business/vsearch?from=${encodeURIComponent(
          from.value
        )}&to=${encodeURIComponent(
          to.value
        )}&vehicleType=${encodeURIComponent(vehicles)}`
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      const result = await response.json();

      setFilteredData(result.data || []);
      setVehicleMenuOpen(false);
    } catch (error) {
      console.error(error);
      alert("Unable to fetch transport data.");
    } finally {
      setLoading(false);
    }
  };
  return(
  <>
  <div className="relative bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600 pt-20 pb-28">

    <div className="max-w-7xl mx-auto px-4 text-center text-white">

      <h1 className="text-4xl md:text-6xl font-extrabold">
        Find Trusted Transport
      </h1>

      <p className="mt-4 text-blue-100 text-lg">
        Search transporters across India within seconds.
      </p>

    </div>

  </div>

  <div className="relative -mt-16 z-20 max-w-7xl mx-auto px-4">

    <div className="bg-white rounded-[20px] shadow-2xl border border-gray-100 p-6 md:p-8">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        {/* FROM */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            From
          </label>

          <Select
            styles={customStyles}
            options={cityOptions}
            value={from}
            onChange={setFrom}
            placeholder="Select Origin"
          />

        </div>

        {/* TO */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            To
          </label>

          <Select
            styles={customStyles}
            options={cityOptions}
            value={to}
            onChange={setTo}
            placeholder="Select Destination"
          />

        </div>

        {/* VEHICLE */}

        <div>

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Vehicle Type
          </label>

          <Select
            styles={customStyles}
            isMulti
            options={vehicleOptions}
            value={vehicleTypes}
            onChange={setVehicleTypes}
            placeholder="Choose Vehicle"

            closeMenuOnSelect={false}
            hideSelectedOptions={false}

            menuIsOpen={vehicleMenuOpen}

            onMenuOpen={() => setVehicleMenuOpen(true)}
            onMenuClose={() => setVehicleMenuOpen(false)}

            components={{
              ValueContainer: MultiValueContainer,
              MultiValue: () => null,
            }}
          />

        </div>

        {/* SEARCH */}

        <div className="flex items-end">

          <button
            onClick={handleSearch}
            disabled={loading}
            className="w-full h-[58px] rounded-[18px]
            bg-gradient-to-r from-blue-600 to-indigo-700
            hover:from-blue-700 hover:to-indigo-800
            text-white font-semibold
            flex items-center justify-center gap-2
            transition-all duration-300
            shadow-lg hover:shadow-xl
            disabled:opacity-60"
          >
            <Search size={20} />

            {loading ? "Searching..." : "Search Transport"}

          </button>

        </div>

      </div>

    </div>

  </div>
    {/* Search Results */}

  <div className="max-w-7xl mx-auto px-4 py-14">

    <div className="flex items-center justify-between mb-8">

      <h2 className="text-3xl font-bold text-gray-800">
        Available Transport
      </h2>

      {filteredData.length > 0 && (
        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
          {filteredData.length} Result
          {filteredData.length > 1 ? "s" : ""}
        </span>
      )}

    </div>

    {filteredData.length > 0 ? (

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

        {filteredData.map((item) => (

          <TransportCard
            key={item._id || item.id}
            item={item}
          />

        ))}

      </div>

    ) : (

      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 py-20 text-center">

        <div className="text-7xl mb-6">
          🚚
        </div>

        <h2 className="text-3xl font-bold text-gray-800">
          No Transport Found
        </h2>

        <p className="mt-3 text-gray-500 max-w-md mx-auto">
          We couldn't find any transport for the selected route.
          Try changing the city or vehicle type and search again.
        </p>

        <button
          onClick={() => {
            setFrom(null);
            setTo(null);
            setVehicleTypes([]);
            setFilteredData([]);
          }}
          className="mt-8 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
        >
          Reset Search
        </button>

      </div>

    )}

  </div>

</>
  )
}
export default SearchBar