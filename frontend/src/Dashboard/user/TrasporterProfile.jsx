import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/api";

const TransporterProfile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, [id]);

  const getProfile = async () => {
    try {
      const res = await API.get(`/transporters/${id}`);

      console.log(res.data);

      setProfile(res.data.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Transporter Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Header */}

        <div className="bg-blue-600 text-white p-8 flex flex-col md:flex-row items-center gap-6">

          <img
            src={
              profile.profileImage ||
              "https://via.placeholder.com/180"
            }
            alt={profile.firmName}
            className="w-40 h-40 rounded-full border-4 border-white object-cover"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {profile.firmName}
            </h1>

            <p className="text-lg mt-2">
              Owner : {profile.ownerName}
            </p>

            <p>
              ⭐ {profile.rating || "New Transporter"}
            </p>

          </div>

        </div>

        {/* Body */}

        <div className="grid md:grid-cols-2 gap-8 p-8">

          <div>

            <h2 className="text-xl font-bold mb-4">
              Company Details
            </h2>

            <div className="space-y-3">

              <p><strong>Email :</strong> {profile.email}</p>

              <p><strong>Phone :</strong> {profile.phone}</p>

              <p><strong>Firm :</strong> {profile.firmName}</p>

              <p><strong>Owner :</strong> {profile.ownerName}</p>

              <p>
                <strong>Location :</strong>{" "}
                {profile.currentCity},{" "}
                {profile.currentState}
              </p>

              <p>
                <strong>Address :</strong>{" "}
                {profile.address}
              </p>

            </div>

          </div>

          <div>

            <h2 className="text-xl font-bold mb-4">
              Business Information
            </h2>

            <div className="space-y-3">


              <p>
                <strong>Category :</strong>{" "}
                {profile.category}
              </p>

           

              <p>
                <strong>Total Vehicles :</strong>{" "}
                {profile.totalVehicles || "N/A"}
              </p>

            </div>

          </div>

        </div>

        {/* Description */}

        <div className="px-8 pb-8">

          <h2 className="text-xl font-bold mb-3">
            About
          </h2>

          <p className="text-gray-600">
            {profile.description ||
              "No Description Available"}
          </p>

          <button
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Request Transport
          </button>

        </div>

      </div>

    </div>
  );
};

export default TransporterProfile;