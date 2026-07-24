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
  { value: "Agra", label: "Agra" },
  { value: "Ahmedabad", label: "Ahmedabad" },
  { value: "Ajmer", label: "Ajmer" },
  { value: "Aligarh", label: "Aligarh" },
  { value: "Allahabad", label: "Prayagraj" },
  { value: "Amritsar", label: "Amritsar" },
  { value: "Aurangabad", label: "Aurangabad" },
  { value: "Bengaluru", label: "Bengaluru" },
  { value: "Bhopal", label: "Bhopal" },
  { value: "Bhubaneswar", label: "Bhubaneswar" },
  { value: "Bilaspur", label: "Bilaspur" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "Chennai", label: "Chennai" },
  { value: "Coimbatore", label: "Coimbatore" },
  { value: "Delhi", label: "Delhi" },
  { value: "Dehradun", label: "Dehradun" },
  { value: "Dhanbad", label: "Dhanbad" },
  { value: "Guwahati", label: "Guwahati" },
  { value: "Gwalior", label: "Gwalior" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Indore", label: "Indore" },
  { value: "Jaipur", label: "Jaipur" },
  { value: "Jabalpur", label: "Jabalpur" },
  { value: "Jodhpur", label: "Jodhpur" },
  { value: "Kanpur", label: "Kanpur" },
  { value: "Kochi", label: "Kochi" },
  { value: "Kolkata", label: "Kolkata" },
  { value: "Lucknow", label: "Lucknow" },
  { value: "Ludhiana", label: "Ludhiana" },
  { value: "Mumbai", label: "Mumbai" },
  { value: "Mysuru", label: "Mysuru" },
  { value: "Nagpur", label: "Nagpur" },
  { value: "Nashik", label: "Nashik" },
  { value: "Noida", label: "Noida" },
  { value: "Patna", label: "Patna" },
  { value: "Pune", label: "Pune" },
  { value: "Raipur", label: "Raipur" },
  { value: "Rajkot", label: "Rajkot" },
  { value: "Ranchi", label: "Ranchi" },
  { value: "Surat", label: "Surat" },
  { value: "Thane", label: "Thane" },
  { value: "Udaipur", label: "Udaipur" },
  { value: "Ujjain", label: "Ujjain" },
  { value: "Vadodara", label: "Vadodara" },
  { value: "Varanasi", label: "Varanasi" },
  { value: "Vijayawada", label: "Vijayawada" },
  { value: "Visakhapatnam", label: "Visakhapatnam" }
];

 const vehicleOptions = [
  { value: "Mini Truck", label: "Mini Truck" },
  { value: "Pickup", label: "Pickup" },
  { value: "Tata Ace", label: "Tata Ace" },
  { value: "Bolero Pickup", label: "Bolero Pickup" },
  { value: "Mahindra Jeeto", label: "Mahindra Jeeto" },
  { value: "Ashok Leyland Dost", label: "Ashok Leyland Dost" },
  { value: "Tempo", label: "Tempo" },
  { value: "Canter", label: "Canter" },
  { value: "Eicher", label: "Eicher" },
  { value: "Truck", label: "Truck" },
  { value: "LCV", label: "LCV" },
  { value: "HCV", label: "HCV" },
  { value: "14 Feet Truck", label: "14 Feet Truck" },
  { value: "17 Feet Truck", label: "17 Feet Truck" },
  { value: "19 Feet Truck", label: "19 Feet Truck" },
  { value: "22 Feet Truck", label: "22 Feet Truck" },
  { value: "24 Feet Truck", label: "24 Feet Truck" },
  { value: "28 Feet Truck", label: "28 Feet Truck" },
  { value: "32 Feet Truck", label: "32 Feet Truck" },
  { value: "40 Feet Trailer", label: "40 Feet Trailer" },
  { value: "Open Body Truck", label: "Open Body Truck" },
  { value: "Closed Body Truck", label: "Closed Body Truck" },
  { value: "Container", label: "Container" },
  { value: "20 Feet Container", label: "20 Feet Container" },
  { value: "32 Feet Container", label: "32 Feet Container" },
  { value: "Trailer", label: "Trailer" },
  { value: "Flat Bed Trailer", label: "Flat Bed Trailer" },
  { value: "Low Bed Trailer", label: "Low Bed Trailer" },
  { value: "Semi Trailer", label: "Semi Trailer" },
  { value: "Tipper", label: "Tipper" },
  { value: "Tanker", label: "Tanker" },
  { value: "Water Tanker", label: "Water Tanker" },
  { value: "Fuel Tanker", label: "Fuel Tanker" },
  { value: "Milk Tanker", label: "Milk Tanker" },
  { value: "Refrigerated Truck", label: "Refrigerated Truck" },
  { value: "Tractor Trolley", label: "Tractor Trolley" },
  { value: "Hyva", label: "Hyva" },
  { value: "Dumper", label: "Dumper" },
  { value: "Auto Loader", label: "Auto Loader" },
  { value: "Three Wheeler Loader", label: "Three Wheeler Loader" },
  { value: "Bike Courier", label: "Bike Courier" },
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