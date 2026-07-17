import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaTruck,
  FaUserTie,
} from "react-icons/fa";
import API from "../../api/api";
import AddRating from "../AddRatting";
import ReviewSection from "../ReviewSection";

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
      setProfile(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Transporter Not Found
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-10">
<div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl shadow-xl text-white p-8 flex flex-col lg:flex-row gap-8 items-center">

          <img
            src={profile.profileImage || "https://via.placeholder.com/200"}
            alt=""
            className="w-48 h-48 rounded-full border-4 border-white object-cover shadow-lg"
          />

          <div className="flex-1">

            <h1 className="text-4xl font-bold">
              {profile.firmName}
            </h1>

            <p className="text-lg mt-2 flex items-center gap-2">
              <FaUserTie />
              {profile.ownerName}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <FaStar className="text-yellow-300" />
              <span className="text-xl font-semibold">
                {profile.averageRating || "0.0"}
              </span>

              <span className="text-gray-200">
                ({profile.totalReviews || 0} Reviews)
              </span>
            </div>

            <button className="mt-6 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition">
              Request Transport
            </button>

          </div>
        </div>

        {/* Main */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">

          {/* Left */}
          <div className="lg:col-span-1 space-y-6">

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="font-bold text-xl mb-5">
                Company Details
              </h2>

              <div className="space-y-4">

                <p className="flex gap-3">
                  <FaEnvelope className="text-blue-600 mt-1" />
                  {profile.email}
                </p>

                <p className="flex gap-3">
                  <FaPhone className="text-green-600 mt-1" />
                  {profile.phone}
                </p>

                <p className="flex gap-3">
                  <FaMapMarkerAlt className="text-red-500 mt-1" />
                  {profile.currentCity}, {profile.currentState}
                </p>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="font-bold text-xl mb-5">
                Business Info
              </h2>

              <div className="space-y-3">

                <p>
                  <strong>Category :</strong> {profile.category}
                </p>

                <p>
                  <strong>Total Vehicles :</strong>{" "}
                  {profile.totalVehicles || "N/A"}
                </p>

              </div>

            </div>

          </div>

          {/* Right */}
          <div className="lg:col-span-2 space-y-7 w-full min-w-0">

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-2xl font-bold mb-4">
                About Company
              </h2>

              <p className="text-gray-600 leading-8">
                {profile.description || "No Description Available"}
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-md p-4">

              <h2 className="text-2xl font-bold mb-6">
                Customer Reviews
              </h2>

              <ReviewSection transporterId={profile._id} />

            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">

              <h2 className="text-xl font-bold mb-4">
                Give Your Rating
              </h2>

              <AddRating AddtransporterId={profile._id} />

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TransporterProfile;