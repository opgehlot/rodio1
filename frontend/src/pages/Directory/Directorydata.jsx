import { useEffect, useState } from "react";
import API from "../../api/api";


import DirectoryFilter from "./DirectoryFilter";
import DirectoryList from "./DirectoryList";

import { stateCityData } from "./stateCityData";

function DirectoryPage() {

  const [filters, setFilters] = useState({
    state: "",
    city: "",
    category: "",
  });

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchDirectory = async (searchFilters = {}) => {

    try {

      setLoading(true);

      const res = await API.get("/business/search", {
        params: searchFilters,
      });

     console.log("Response:", res.data);
      setData(res.data.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchDirectory();

  }, []);

  const handleSearch = (e) => {

    e.preventDefault();
    console.log("Filters:", filters);

    fetchDirectory(filters);

  };

  return (

    <div className="min-h-screen bg-#eef2ff">
    

      <div className="max-w-7xl mx-auto pt-24 px-5">

        <DirectoryFilter

          filters={filters}
          setFilters={setFilters}
          stateCityData={stateCityData}
          onSearch={handleSearch}

        />

        <DirectoryList

          data={data}
          loading={loading}

        />

      </div>

    </div>

  );

}

export default DirectoryPage;