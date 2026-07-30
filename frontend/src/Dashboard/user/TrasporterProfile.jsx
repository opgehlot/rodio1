import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaTruck, FaUserCircle } from "react-icons/fa";

import API from "../../api/api";
import AddRating from "../AddRatting";
import ReviewSection from "../ReviewSection";

const TransporterProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getProfile();
    }
  }, [id]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/transporters/${id}`);
      setProfile(res.data.data);
    } catch (error) {
      console.log("Profile Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl md:text-3xl font-medium text-gray-600 bg-gray-100 px-4 text-center">
        Loading data...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl md:text-3xl font-medium text-gray-600 bg-gray-100 px-4 text-center">
        Profile not found.
      </div>
    );
  }

  const SectionTitle = ({ children }) => (
    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 border-b-2 border-gray-200 pb-3">
      {children}
    </h2>
  );

  const InfoItem = ({ label, value, children }) => (
    <div className="mb-4 md:mb-5 last:mb-0 bg-gray-50 p-3.5 md:p-4 rounded-xl border border-gray-200">
      <dt className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{label}</dt>
      <dd className="text-base md:text-lg text-gray-900 font-semibold flex items-center gap-2 break-all">
        {children}
        <span className="break-words">{value || "Not specified"}</span>
      </dd>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900 pb-8 md:pb-12 overflow-x-hidden">
      
      {/* Hero Header Section */}
      <header className="bg-white border-b-2 border-gray-300 shadow-sm">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 py-6 md:py-12 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
            <img
              src={
                profile.profile?.profileImage ||
                `https://api.dicebear.com/8.x/shapes/svg?seed=${profile.firmName}`
              }
              alt="Firm Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl object-cover border-2 border-gray-300 shadow-md bg-gray-50 shrink-0"
            />
            <div className="w-full">
              <p className="text-xs font-mono font-bold text-gray-500 mb-1">ID: {profile._id?.slice(-8).toUpperCase()}</p>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2 break-words">
                {profile.firmName}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-gray-700 text-sm sm:text-lg font-medium">
                <span className="flex items-center gap-1.5">
                  <FaUserCircle className="text-gray-500 text-lg sm:text-xl shrink-0" />
                  <span>{profile.profile?.name || "Contact Person Not Set"}</span>
                </span>
                <span className="text-gray-400 hidden sm:inline">|</span>
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-gray-900 text-white">
                  {profile.category}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center lg:items-end justify-center gap-2 bg-gray-50 border-2 border-gray-200 p-4 sm:p-6 rounded-2xl w-full lg:w-auto lg:min-w-[280px] shadow-sm">
            <div className="flex items-center gap-2 text-yellow-500">
              <FaStar size={20} className="fill-current sm:w-[22px] sm:h-[22px]" />
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">{profile.averageRating?.toFixed(1) || "0.0"}</span>
              <span className="text-gray-500 text-sm sm:text-base font-semibold mt-1">/ 5.0</span>
            </div>
            <p className="text-gray-700 text-sm sm:text-base font-semibold">{profile.totalReviews || 0} Verified Reviews</p>
          </div>

        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 py-6 md:py-10 grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        
        {/* Left Column - Contact Info Only */}
        <div className="xl:col-span-1 space-y-6 md:space-y-8">
          
          {/* Contact Section */}
          <section className="bg-white p-5 sm:p-8 rounded-2xl border-2 border-gray-200 shadow-sm">
            <SectionTitle>Reach & Contact</SectionTitle>
            <dl>
              <InfoItem label="Email Address" value={profile.email} />
              <InfoItem label="Phone Number" value={profile.phoneNumber} />
              <div className="mt-5 pt-5 sm:mt-6 sm:pt-6 border-t-2 border-gray-100">
                 <InfoItem label="Operational Base">
                    <FaMapMarkerAlt className="text-red-500 shrink-0" />
                   <span className="font-bold text-gray-900 break-words">{profile.currentCity}, {profile.currentState}</span>
                 </InfoItem>
                 <dd className="text-gray-700 mt-3 p-3 bg-gray-50 rounded-xl border border-gray-200 text-sm sm:text-base font-medium leading-relaxed break-words">
                    {profile.address || "No detailed address provided."}
                 </dd>
              </div>
            </dl>
          </section>

        </div>

        {/* Right Column - Reviews, Rating */}
        <div className="xl:col-span-2 space-y-6 md:space-y-8">
          
          {/* Reviews Section */}
          <section className="bg-white p-5 sm:p-8 rounded-2xl border-2 border-gray-200 shadow-sm">
            <SectionTitle>Customer Feedback</SectionTitle>
            <ReviewSection transporterId={profile._id} />
          </section>

          {/* Add Rating Section */}
          <section className="bg-white p-5 sm:p-8 rounded-2xl border-2 border-gray-200 shadow-sm">
            <SectionTitle>Rate This Transporter</SectionTitle>
            <AddRating AddtransporterId={profile._id} />
          </section>

        </div>
      </main>

    </div>
  );
};

export default TransporterProfile;