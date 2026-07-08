import { useState } from "react";
import transports from "../data/transports";
import { TransportCard } from "./TransportCard";
import { MapPin, Search } from "lucide-react";
import Select from "react-select";

export function SearchBar() {
const [from, setFrom] = useState(null);
const [to, setTo] = useState(null);
const [filteredData, setFilteredData] = useState([]);


  const cityOptions = [
  ...new Set(transports.flatMap((item) => [item.from, item.to])),
].map((city) => ({
  value: city,
  label: city,
}));

const handleSearch = () => {
  if (!from || !to) {
    alert("Please select both cities.");
    return;
  }

  const result = transports.filter(
    (item) =>
      item.from === from.value &&
      item.to === to.value
  );


  if (result.length === 0) {
    alert("No transport found!");
    setFilteredData([]);
    return;
  }

  setFilteredData(result);
};
  return (
    <>
 <div className="max-w-5xl mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-6">
  <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
    Find Your Transport
  </h2>

  <p className="text-center text-gray-500 mb-8">
    Search trucks and transport services across India
  </p>

  <div className="grid md:grid-cols-3 gap-5">

    {/* From */}
    <div className="flex items-center border rounded-xl px-3 py-2">
      <MapPin className="text-blue-600 mr-2" size={22} />

      <Select
        options={cityOptions}
        value={from}
        onChange={setFrom}
        placeholder="Select From City"
        isSearchable
        className="w-full"
        styles={{
          control: (base) => ({
            ...base,
            border: "none",
            boxShadow: "none",
            minHeight: "40px",
          }),
        }}
      />
    </div>

    {/* To */}
    <div className="flex items-center border rounded-xl px-3 py-2">
      <MapPin className="text-red-500 mr-2" size={22} />

      <Select
        options={cityOptions}
        value={to}
        onChange={setTo}
        placeholder="Select To City"
        isSearchable
        className="w-full"
        
        styles={{
          control: (base) => ({
            ...base,
            border: "none",
            boxShadow: "none",
            minHeight: "40px",
            
          }),
        }}
      />
    </div>

    {/* Search Button */}
    <button
      onClick={handleSearch}
      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
    >
      <Search size={20} />
      Search
    </button>

  </div>
</div>

{/* Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
 {filteredData.map((item) => (
  <TransportCard key={item.id} item={item} />
))}
</div>
    </>
  );
}
export default SearchBar;