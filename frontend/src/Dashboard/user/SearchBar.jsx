import { useState } from "react";

import { MapPin, Search, Truck } from "lucide-react";
import TransportCard from "../user/TransportCard";
import transports from "../user/data/transports";
import Select, { components } from "react-select";
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

export default function SearchBar() {
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
      alert("Please select From and To city");
      return;
    }

    try {
      setLoading(true);

      const vehicles = vehicleTypes.map((v) => v.value).join(",");

      const response = await fetch(
        `https://rodio-tradelink.onrender.com/api/business/vsearch?from=${encodeURIComponent(
          from.value,
        )}&to=${encodeURIComponent(
          to.value,
        )}&vehicleType=${encodeURIComponent(vehicles)}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();

      console.log(result);

      // API returns:
      // { success: true, total: 1, data: [...] }

      setFilteredData(result.data);
      setVehicleMenuOpen(false);
    } catch (err) {
      console.error(err);
      alert("Unable to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full   mt-7 mb-50 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          FIND YOUR TRANSPORT
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          <Select
            options={cityOptions}
            value={from}
            onChange={setFrom}
            placeholder="📍 From City"
          />

          <Select
            options={cityOptions}
            value={to}
            onChange={setTo}
            placeholder="📍 To City"
          />

          <Select
            isMulti
            options={vehicleOptions}
            value={vehicleTypes}
            onChange={setVehicleTypes}
            placeholder="🚚 Vehicle Type"
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
<button
  onClick={handleSearch}
  className="w-full sm:w-auto min-h-[48px] px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition-all duration-300"
>
  <Search size={18} />
  {loading ? "Searching..." : "Search"}
</button>
        </div>
      </div>


      {/* Search Results */}
      <div className="max-w-6xl mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <TransportCard key={item._id || item.id} item={item} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No transport found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
