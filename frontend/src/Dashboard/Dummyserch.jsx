import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Search, MapPin, Truck } from "lucide-react";

export function Dummyserch() {
  const navigate = useNavigate();

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  const cityOptions = [
    { value: "Indore", label: "Indore" },
    { value: "Bhopal", label: "Bhopal" },
    { value: "Delhi", label: "Delhi" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Nagpur", label: "Nagpur" },
    { value: "Jaipur", label: "Jaipur" },
    { value: "Surat", label: "Surat" },
    { value: "Ahmedabad", label: "Ahmedabad" },
  ];

  const vehicleOptions = [
    { value: "Truck", label: "Truck" },
    { value: "Trailer", label: "Trailer" },
    { value: "Container", label: "Container" },
    { value: "Pickup", label: "Pickup" },
    { value: "LCV", label: "LCV" },
  ];

  const customStyles = {
    control: (base) => ({
      ...base,
      borderRadius: "16px",
      minHeight: "56px",
      borderColor: "#d1d5db",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#2563eb",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#6b7280",
    }),
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
      <div className="bg-white rounded-3xl shadow-2xl p-6">

        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5"
        >

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              <MapPin className="inline w-4 h-4 mr-1 text-blue-600" />
              From
            </label>

            <Select
              options={cityOptions}
              value={from}
              onChange={setFrom}
              placeholder="Select Origin"
              styles={customStyles}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              <MapPin className="inline w-4 h-4 mr-1 text-green-600" />
              To
            </label>

            <Select
              options={cityOptions}
              value={to}
              onChange={setTo}
              placeholder="Select Destination"
              styles={customStyles}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              <Truck className="inline w-4 h-4 mr-1 text-orange-500" />
              Vehicle Type
            </label>

            <Select
              options={vehicleOptions}
              value={vehicle}
              onChange={setVehicle}
              placeholder="Choose Vehicle"
              styles={customStyles}
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-xl"
            >
              <Search size={22} />
              Search Transport
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
 export default Dummyserch;