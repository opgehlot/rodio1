import { useEffect, useMemo, useState } from "react";
import API from "../../api/api";
import LeadCard from "../../components/LeadCard";
import {
  FaSearch,
  FaTruckMoving,
  FaSyncAlt,
} from "react-icons/fa";

const AllLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("All");

  useEffect(() => {
    getAllLeads();
  }, []);

  const getAllLeads = async () => {
    try {
      setLoading(true);

      const res = await API.get("/booking/all");

      setLeads(res.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Vehicle List
  const vehicleTypes = useMemo(() => {
    const list = leads.map((item) => item.vehicleType);

    return ["All", ...new Set(list)];
  }, [leads]);

  // Search + Filter
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        lead.pickupLocation?.toLowerCase().includes(keyword) ||
        lead.loading_point?.toLowerCase().includes(keyword) ||
        lead.goodsType?.toLowerCase().includes(keyword) ||
        lead.vehicleType?.toLowerCase().includes(keyword) ||
        lead.service?.toLowerCase().includes(keyword);

      const matchVehicle =
        vehicleFilter === "All" ||
        lead.vehicleType === vehicleFilter;

      return matchSearch && matchVehicle;
    });
  }, [leads, search, vehicleFilter]);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-gradient-to-r from-blue-700 to-indigo-700">

        <div className="max-w-7xl mx-auto px-4 py-10">

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

            <div>

              <h1 className="text-4xl font-bold text-white">
                Transport Leads
              </h1>

              <p className="text-blue-100 mt-2">
                Browse available transport requirements
              </p>

            </div>

            <button
              onClick={getAllLeads}
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center gap-2"
            >
              <FaSyncAlt />
              Refresh
            </button>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="max-w-7xl mx-auto px-4 -mt-8">

        <div className="bg-white rounded-3xl shadow-lg p-5">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Search */}

            <div className="relative lg:col-span-2">

              <FaSearch className="absolute top-4 left-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search Pickup, Destination, Goods..."
                className="w-full border rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            {/* Vehicle */}

            <div>

              <select
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 outline-none"
              >
                {vehicleTypes.map((vehicle) => (
                  <option key={vehicle}>
                    {vehicle}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </div>

      </div>

      {/* Count */}

      <div className="max-w-7xl mx-auto px-4 mt-8">

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold text-gray-800">
            Available Leads
          </h2>

          <div className="bg-blue-700 text-white px-5 py-2 rounded-full flex items-center gap-2">

            <FaTruckMoving />

            {filteredLeads.length} Leads

          </div>

        </div>

      </div>

      {/* Cards */}

     {/* Cards */}

<div className="max-w-7xl mx-auto px-4 py-8">

  {/* Loading */}

  {loading ? (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

      {[...Array(6)].map((_, index) => (

        <div
          key={index}
          className="bg-white rounded-3xl p-6 shadow animate-pulse"
        >

          <div className="h-10 bg-gray-200 rounded mb-6"></div>

          <div className="space-y-4">

            <div className="h-4 bg-gray-200 rounded"></div>

            <div className="h-4 bg-gray-200 rounded w-3/4"></div>

            <div className="h-4 bg-gray-200 rounded"></div>

            <div className="h-24 bg-gray-200 rounded-xl"></div>

            <div className="h-12 bg-gray-200 rounded-xl"></div>

          </div>

        </div>

      ))}

    </div>

  ) : filteredLeads.length === 0 ? (

    <div className="bg-white rounded-3xl shadow-lg py-20 px-8 text-center">

      <div className="text-7xl mb-6">
        🚚
      </div>

      <h2 className="text-3xl font-bold text-gray-700">

        No Leads Found

      </h2>

      <p className="text-gray-500 mt-4">

        No transport leads match your search.

      </p>

      <button
        onClick={() => {
          setSearch("");
          setVehicleFilter("All");
        }}
        className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition"
      >
        Reset Filters
      </button>

    </div>

  ) : (

    <>

      {/* Desktop */}

      <div className="hidden md:grid grid-cols-2 xl:grid-cols-3 gap-7">

        {filteredLeads.map((lead) => (

          <LeadCard
            key={lead._id}
            lead={lead}
          />

        ))}

      </div>

      {/* Mobile */}

      <div className="grid md:hidden gap-5">

        {filteredLeads.map((lead) => (

          <LeadCard
            key={lead._id}
            lead={lead}
          />

        ))}

      </div>

    </>

  )}

</div>

    </div>
  );
};

export default AllLeads;