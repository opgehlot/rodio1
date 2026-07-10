const categories = [
  "Transporter",

  "Broker",

  "Fleet Owner",

  "Truck Owner",

  "Logistics Company",

  "Warehouse",

  "Courier",

  "Packing & Moving",

  "Commission Agent",

  "RTO Agent",

  "Finance Agent",
];

function DirectoryFilter({
  filters,

  setFilters,

  stateCityData,

  onSearch,
}) {
  return (
    <form onSubmit={onSearch} className="bg-white rounded-xl shadow p-6">
      <div className="grid lg:grid-cols-4 gap-4">
        <select
          value={filters.state}
          onChange={(e) =>
            setFilters({
              ...filters,

              state: e.target.value,

              city: "",
            })
          }
          className="border rounded-lg p-3"
        >
          <option value="">Select State</option>

          {Object.keys(stateCityData).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          value={filters.city}
          onChange={(e) =>
            setFilters({
              ...filters,

              city: e.target.value,
            })
          }
          className="border rounded-lg p-3"
        >
          <option value="">Select City</option>

          {(stateCityData[filters.state] || []).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) =>
            setFilters({
              ...filters,

              category: e.target.value,
            })
          }
          className="border rounded-lg p-3"
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button className="bg-orange-500 text-white rounded-lg">Search</button>
      </div>
    </form>
  );
}

export default DirectoryFilter;
