// 
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
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Transport Leads
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                Browse available transport requirements
              </p>
            </div>
            <button
              onClick={getAllLeads}
              className="bg-white text-blue-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-50 transition flex items-center gap-2 shadow text-sm"
            >
              <FaSyncAlt />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Search & Count Fixed Area */}
      <div className="max-w-7xl mx-auto px-4 w-full flex-shrink-0 mt-4">
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative lg:col-span-2">
              <FaSearch className="absolute top-3.5 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Pickup, Destination, Goods..."
                className="w-full border rounded-xl pl-12 pr-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <select
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
                className="w-full border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-600 outline-none bg-white text-sm"
              >
                {vehicleTypes.map((vehicle) => (
                  <option key={vehicle} value={vehicle}>
                    {vehicle}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Count */}
        <div className="flex items-center justify-between my-4">
          <h2 className="text-xl font-bold text-gray-800">
            Available Leads
          </h2>
          <div className="bg-blue-700 text-white px-4 py-1.5 rounded-full flex items-center gap-2 shadow text-sm">
            <FaTruckMoving />
            {filteredLeads.length} Leads
          </div>
        </div>
      </div>

      {/* Scrollable Cards Container */}
      <div className="max-w-7xl mx-auto px-4 w-full flex-1 overflow-y-auto pb-6 custom-scrollbar">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
          <div className="bg-white rounded-3xl shadow-lg py-16 px-8 text-center my-auto">
            <div className="text-6xl mb-4">🚚</div>
            <h2 className="text-2xl font-bold text-gray-700">
              No Leads Found
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              No transport leads match your search.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setVehicleFilter("All");
              }}
              className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2.5 rounded-xl font-semibold transition text-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:grid grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLeads.map((lead) => (
                <LeadCard key={lead._id} lead={lead} />
              ))}
            </div>

            {/* Mobile */}
            <div className="grid md:hidden gap-4">
              {filteredLeads.map((lead) => (
                <LeadCard key={lead._id} lead={lead} />
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  );
};

export default AllLeads;