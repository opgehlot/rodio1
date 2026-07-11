import React from "react";
import { Truck, Route } from "lucide-react";

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
];

function TransportInfo({ formData, handleChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">

      {/* Heading */}
      <div className="flex items-center gap-3 mb-8">
        <Truck className="text-orange-500" size={28} />

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Transport Information
          </h2>

          <p className="text-gray-500 text-sm">
            Enter your transport route and available vehicle types.
          </p>
        </div>
      </div>

      {/* Route */}

      <div className="grid md:grid-cols-2 gap-6">

        {/* Line From */}

        <div>
          <label className="block mb-2 font-medium">
            Line From
          </label>

          <div className="relative">

            <Route
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              name="linefrom"
              value={formData.linefrom}
              onChange={handleChange}
              placeholder="Ex. Indore"
              className="w-full h-12 border rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

        {/* Line To */}

        <div>

          <label className="block mb-2 font-medium">
            Line To
          </label>

          <div className="relative">

            <Route
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />

            <input
              type="text"
              name="lineto"
              value={formData.lineto}
              onChange={handleChange}
              placeholder="Ex. Mumbai"
              className="w-full h-12 border rounded-xl pl-11 pr-4 focus:ring-2 focus:ring-orange-500"
            />

          </div>

        </div>

      </div>

      {/* Vehicle Types */}

      <div className="mt-10">

        <h3 className="text-lg font-semibold mb-1">
          Vehicle Types
        </h3>

        <p className="text-gray-500 text-sm mb-5">
          Select all vehicles available with your business.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {vehicleOptions.map((vehicle) => (

            <label
              key={vehicle}
              className="flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition"
            >

              <input
                type="checkbox"
                name="vehicleTypes"
                value={vehicle}
                checked={formData.vehicleTypes.includes(vehicle)}
                onChange={handleChange}
                className="accent-orange-500 w-5 h-5"
              />

              <span className="text-sm font-medium">
                {vehicle}
              </span>

            </label>

          ))}

        </div>

      </div>

    </div>
  );
}

export default TransportInfo;