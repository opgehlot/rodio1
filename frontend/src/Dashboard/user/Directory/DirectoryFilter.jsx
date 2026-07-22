const categories = [
  "Transporter",
  "Tour and Travels",
  "Insurance Companey",
  "Broker",
  "Truck Owners",
  "Tanker Trasporter ",
  "Traillor Trasporter",
  "Car Carrier",
  "Bus Services",
  "Warehouse",
  "Courier",
  " HouseHold Packer & Movers",
  "RTO Agent",
  "Financer",
  "Coustom House Agent (CHA)",
  "Tow Wheeler Driver",
  "Pickup & Three Wheeler",
  "Ambulance",
  "other"
];
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function DirectoryFilter({ filters, setFilters, stateCityData, onSearch }) {
  return (
    <form
  onSubmit={onSearch}
  className="bg-white rounded-3xl shadow-xl p-8 mb-8"
>
  <div className="grid lg:grid-cols-4 gap-5">

    {/* State */}
    <select
      value={filters.state}
      onChange={(e) =>
        setFilters({
          ...filters,
          state: e.target.value,
          city: "",
        })
      }
      className="bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
    >
      <option value="">📍 Select State</option>

      {Object.keys(stateCityData).map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>

    {/* City */}
    <select
      value={filters.city}
      onChange={(e) =>
        setFilters({
          ...filters,
          city: e.target.value,
        })
      }
      className="bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
    >
      <option value="">🏙 Select City</option>

      {(stateCityData[filters.state] || []).map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>

    {/* Category */}
    <select
      value={filters.category}
      onChange={(e) =>
        setFilters({
          ...filters,
          category: e.target.value,
        })
      }
      className="bg-gray-100 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 transition"
    >
      <option value="">🚚 Select Category</option>

      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>

    {/* Button */}
    <button
      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-2xl py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
    >
      🔍 Search
    </button>

  </div>
</form>
  );
}

export default DirectoryFilter;
