import { useEffect, useState } from "react";
import API from "../../../api/api";
import RequestCard from "./Enquiery";

export  function ShowEnquiery() {

  const [requests, setRequests] = useState([]);

  useEffect(() => {

    fetchRequests();

  }, []);

  const fetchRequests = async () => {

    try {

      const res = await API.get("/booking/my-requests");

      setRequests(res.data.requests);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="p-6">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          My Requests
        </h1>

        <div className="bg-blue-600 text-white px-5 py-3 rounded-xl">

          Total Requests : {requests.length}

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {requests.map((request) => (

          <RequestCard
            key={request._id}
            request={request}
          />

        ))}

      </div>

    </div>

  );

} 
export default ShowEnquiery ;
