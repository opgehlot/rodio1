
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { 
//   FaStar, 
//   FaMapMarkerAlt, 
//   FaUserCircle, 
//   FaImages, 
//   FaTimes, 
//   FaSearchPlus, 
//   FaSearchMinus,
//   FaShieldAlt,
//   FaTruck,
//   FaBuilding,
//   FaEnvelope,
//   FaPhoneAlt
// } from "react-icons/fa";

// import API from "../../api/api";
// import AddRating from "../AddRatting";
// import ReviewSection from "../ReviewSection";

// const TransporterProfile = () => {
//   const { id } = useParams();
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
  
//   // States for Full-Screen Modal & Zooming
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [zoomLevel, setZoomLevel] = useState(1);

//   useEffect(() => {
//     if (id) {
//       getProfile();
//     }
//   }, [id]);

//   const getProfile = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get(`/transporters/${id}`);
//       setProfile(res.data.data);
//     } catch (error) {
//       console.log("Profile Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handlers for Zoom In / Zoom Out / Reset
//   const handleZoomIn = (e) => {
//     e.stopPropagation();
//     setZoomLevel((prev) => Math.min(prev + 0.5, 3)); // Max zoom limit: 3x
//   };

//   const handleZoomOut = (e) => {
//     e.stopPropagation();
//     setZoomLevel((prev) => Math.max(prev - 0.5, 1)); // Min zoom limit: 1x
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//     setZoomLevel(1); // Reset zoom on close
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center text-lg font-medium text-slate-500 bg-white px-4 text-center gap-4">
//         <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
//         <p className="tracking-wide">Loading enterprise profile...</p>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="min-h-screen flex flex-col justify-center items-center text-lg font-medium text-slate-500 bg-white px-4 text-center gap-2">
//         <FaBuilding className="text-3xl text-slate-300 mb-2" />
//         <h2 className="text-2xl font-bold text-slate-900">Profile Not Found</h2>
//         <p className="text-slate-500 text-sm">The requested transport partner profile does not exist or has been removed.</p>
//       </div>
//     );
//   }

//   const galleryItems = profile.gallery || profile.profile?.gallery || [];

//   return (
//     <div className="w-full min-h-screen bg-white text-slate-900 pb-24 overflow-x-hidden relative font-sans selection:bg-blue-600 selection:text-white">
      
//       {/* Editorial Sophisticated Hero Section */}
//       <header className="pt-16 pb-12 border-b border-slate-200 bg-gradient-to-b from-slate-50/80 to-white">
//         <div className="max-w-5xl mx-auto px-6 sm:px-8">
          
//           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            
//             <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
//               <img
//                 src={
//                   profile.profile?.profileImage ||
//                   `https://api.dicebear.com/8.x/shapes/svg?seed=${profile.firmName}`
//                 }
//                 alt="Firm Logo"
//                 className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border border-slate-200 shadow-sm bg-white shrink-0"
//               />

//               <div className="space-y-3">
//                 <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
//                   <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
//                     <FaShieldAlt className="text-blue-600 text-xs" /> Verified Partner
//                   </span>
//                   {/* <span className="text-xs font-mono text-slate-400">
//                     ID: {profile._id?.slice(-8).toUpperCase()}
//                   </span> */}
//                 </div>

//                 <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
//                   {profile.firmName}
//                 </h1>

//                 <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-slate-600 text-sm sm:text-base font-medium">
//                   <span className="flex items-center gap-1.5 text-slate-900">
//                     <FaUserCircle className="text-slate-400 text-lg" />
//                     <span>{profile.profile?.name || "Contact Person Not Set"}</span>
//                   </span>
                  
//                   <span className="text-slate-300">·</span>
                  
//                   <span className="flex items-center gap-1.5 text-slate-700">
//                     <FaTruck className="text-slate-400" />
//                     <span>{profile.category}</span>
//                   </span>

//                   {profile.currentCity && (
//                     <>
//                       <span className="text-slate-300">·</span>
//                       <span className="flex items-center gap-1 text-slate-600">
//                         <FaMapMarkerAlt className="text-rose-500 text-xs" />
//                         <span>{profile.currentCity}{profile.currentState ? `, ${profile.currentState}` : ''}</span>
//                       </span>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Rating Highlight Block */}
//             <div className="flex md:flex-col items-center md:items-end justify-center md:justify-start gap-3 md:gap-1 text-center md:text-right bg-white md:bg-transparent p-4 md:p-0 rounded-xl border md:border-none border-slate-200">
//               <div className="flex items-center gap-2">
//                 <FaStar className="text-amber-400 text-xl fill-current" />
//                 <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
//                   {profile.averageRating?.toFixed(1) || "0.0"}
//                 </span>
//                 <span className="text-slate-400 text-sm font-semibold">/ 5.0</span>
//               </div>
//               <p className="text-slate-500 text-sm font-medium">
//                 {profile.totalReviews || 0} verified reviews
//               </p>
//             </div>

//           </div>

//         </div>
//       </header>

//       {/* Main Content Area - Editorial Natural Flow */}
//       <main className="max-w-5xl mx-auto px-6 sm:px-8 py-12 space-y-16">
        
//         {/* Contact & Location Section */}
//         <section className="space-y-6">
//           <div className="border-b border-slate-200 pb-4">
//             <h2 className="text-xl font-bold text-slate-900 tracking-tight">Contact & Location</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-2">
//             <div>
//               <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
//                 <FaEnvelope className="text-slate-400 text-xs" /> Email Address
//               </div>
//               <div className="text-base font-semibold text-slate-900 break-all">
//                 {profile.email || "Not specified"}
//               </div>
//             </div>

//             <div>
//               <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
//                 <FaPhoneAlt className="text-slate-400 text-xs" /> Phone Number
//               </div>
//               <div className="text-base font-semibold text-slate-900">
//                 {profile.phoneNumber || "Not specified"}
//               </div>
//             </div>

//             <div>
//               <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
//                 <FaMapMarkerAlt className="text-rose-500 text-xs" /> Operational Base
//               </div>
//               <div className="text-base font-semibold text-slate-900">
//                 {profile.currentCity || "City"}, {profile.currentState || "State"}
//               </div>
//             </div>
//           </div>

//           {profile.address && (
//             <div className="pt-2">
//               <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Complete Business Address</div>
//               <p className="text-slate-700 text-base leading-relaxed font-normal">
//                 {profile.address}
//               </p>
//             </div>
//           )}
//         </section>

//         {/* Firm Gallery Section */}
//         <section className="space-y-6">
//           <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
//             <h2 className="text-xl font-bold text-slate-900 tracking-tight">Firm Gallery</h2>
//             {galleryItems.length > 0 && (
//               <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
//                 {galleryItems.length} {galleryItems.length === 1 ? 'Photo' : 'Photos'}
//               </span>
//             )}
//           </div>

//           {galleryItems.length > 0 ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//               {galleryItems.map((item, index) => (
//                 <div 
//                   key={item._id || index} 
//                   onClick={() => {
//                     setSelectedImage(item);
//                     setZoomLevel(1);
//                   }}
//                   className="group overflow-hidden rounded-xl bg-slate-100 aspect-square relative cursor-pointer"
//                 >
//                   <img
//                     src={item.imageUrl}
//                     alt={item.caption || `Gallery item ${index + 1}`}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
//                   />
//                   {item.caption && (
//                     <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 pt-6 flex items-end">
//                       <p className="text-white text-xs font-medium truncate w-full">
//                         {item.caption}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-slate-500 text-base font-normal py-4">
//               No gallery photos available for this enterprise.
//             </p>
//           )}
//         </section>

//         {/* Customer Feedback Section */}
//         <section className="space-y-8">
//           <div className="border-b border-slate-200 pb-4">
//             <h2 className="text-xl font-bold text-slate-900 tracking-tight">Customer Feedback</h2>
//           </div>

//           <div className="space-y-6">
//             <ReviewSection transporterId={profile._id} />
//           </div>
//         </section>

//         {/* Share Your Experience Section */}
//         <section className="space-y-6 pt-6 border-t border-slate-200">
//           <div>
//             <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Share Your Experience</h2>
//             <p className="text-slate-500 text-sm">Help the Rodio Tradelink business network by reviewing this transport partner.</p>
//           </div>

//           <div className="max-w-2xl bg-slate-50/60 p-6 sm:p-8 rounded-2xl border border-slate-200/80">
//             <AddRating AddtransporterId={profile._id} />
//           </div>
//         </section>

//       </main>

//       {/* Full-Screen Image Modal with Zoom In / Zoom Out */}
//       {selectedImage && (
//         <div 
//           onClick={closeModal}
//           className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-center p-4 backdrop-blur-md overflow-hidden"
//         >
//           {/* Action Toolbar */}
//           <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
//             <button 
//               onClick={handleZoomIn}
//               title="Zoom In"
//               className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-md border border-white/10 cursor-pointer"
//             >
//               <FaSearchPlus size={16} />
//             </button>
//             <button 
//               onClick={handleZoomOut}
//               title="Zoom Out"
//               className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-md border border-white/10 cursor-pointer"
//             >
//               <FaSearchMinus size={16} />
//             </button>
//             <button 
//               onClick={closeModal}
//               title="Close"
//               className="bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-full transition-colors shadow-lg cursor-pointer"
//             >
//               <FaTimes size={16} />
//             </button>
//           </div>

//           {/* Zoomable Image Container */}
//           <div 
//             className="relative max-w-full max-h-[80vh] overflow-auto flex items-center justify-center p-2"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img
//               src={selectedImage.imageUrl}
//               alt={selectedImage.caption || "Full view"}
//               style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.2s ease-in-out" }}
//               className="max-h-[75vh] object-contain rounded-lg shadow-2xl cursor-grab"
//             />
//           </div>

//           {/* Caption info if available */}
//           {selectedImage.caption && (
//             <p className="mt-6 text-white text-sm font-medium bg-slate-900/80 px-6 py-2.5 rounded-xl border border-white/10 text-center max-w-lg shadow-lg">
//               {selectedImage.caption}
//             </p>
//           )}
//         </div>
//       )}

//     </div>
//   );
// };

// export default TransporterProfile;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  FaStar, 
  FaMapMarkerAlt, 
  FaUserCircle, 
  FaImages, 
  FaTimes, 
  FaSearchPlus, 
  FaSearchMinus,
  FaShieldAlt,
  FaTruck,
  FaBuilding,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaGlobe,
  FaUsers,
  FaClock,
  FaCalendarAlt,
  FaPhoneSquareAlt,
  FaCheckCircle,
  FaRoute
} from "react-icons/fa";

import API from "../../api/api";
import AddRating from "../AddRatting";
import ReviewSection from "../ReviewSection";

const TransporterProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // States for Full-Screen Modal & Zooming
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

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

  // Handlers for Zoom In / Zoom Out / Reset
  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const closeModal = () => {
    setSelectedImage(null);
    setZoomLevel(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-lg font-medium text-slate-500 bg-white px-4 text-center gap-4">
        <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
        <p className="tracking-wide">Loading enterprise profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-lg font-medium text-slate-500 bg-white px-4 text-center gap-2">
        <FaBuilding className="text-3xl text-slate-300 mb-2" />
        <h2 className="text-2xl font-bold text-slate-900">Profile Not Found</h2>
        <p className="text-slate-500 text-sm">The requested transport partner profile does not exist or has been removed.</p>
      </div>
    );
  }

  const galleryItems = profile.gallery || profile.profile?.gallery || [];
  const workingAreas = profile.workingAreas || [];
  const vehicles = profile.vehicles || [];
  const addresses = profile.addresses || [];
  const altPhones = profile.alternatePhoneNumbers || [];
  const landlines = profile.landlineNumbers || [];
  const workingDays = profile.officeWorkingDays || [];

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 pb-24 overflow-x-hidden relative font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Editorial Sophisticated Hero Section */}
      <header className="pt-16 pb-12 border-b border-slate-200 bg-gradient-to-b from-slate-50/80 to-white">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
              <img
                src={
                  profile.profile?.profileImage ||
                  `https://api.dicebear.com/8.x/shapes/svg?seed=${profile.firmName}`
                }
                alt="Firm Logo"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border border-slate-200 shadow-sm bg-white shrink-0"
              />

              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
        {profile?.documents?.some(
  (doc) =>
    String(doc.verificationStatus).toLowerCase() === "verified"
) && (
  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
    <FaShieldAlt className="text-blue-600 text-xs" />
    Rodio Verified
  </span>
)}
                  {/* {profile.role && (
                    <span className="inline-flex items-center text-xs font-semibold capitalize tracking-wide text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                      {profile.role}
                    </span>
                  )} */}
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                  {profile.firmName}
                </h1>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-slate-600 text-sm sm:text-base font-medium">
                  {(profile.profile?.name || profile.name) && (
                    <span className="flex items-center gap-1.5 text-slate-900">
                      <FaUserCircle className="text-slate-400 text-lg" />
                      <span>{profile.profile?.name || profile.name}</span>
                    </span>
                  )}
                  
                  {profile.category && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="flex items-center gap-1.5 text-slate-700 capitalize">
                        <FaTruck className="text-slate-400" />
                        <span>{profile.category}</span>
                      </span>
                    </>
                  )}

                  {(profile.currentCity || profile.currentState) && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="flex items-center gap-1 text-slate-600">
                        <FaMapMarkerAlt className="text-rose-500 text-xs" />
                        <span>
                          {profile.currentCity}
                          {profile.currentState ? `, ${profile.currentState}` : ''}
                          {profile.pincode ? ` - ${profile.pincode}` : ''}
                        </span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Rating Highlight Block */}
            <div className="flex md:flex-col items-center md:items-end justify-center md:justify-start gap-3 md:gap-1 text-center md:text-right bg-white md:bg-transparent p-4 md:p-0 rounded-xl border md:border-none border-slate-200">
              <div className="flex items-center gap-2">
                <FaStar className="text-amber-400 text-xl fill-current" />
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {profile.averageRating?.toFixed(1) || "0.0"}
                </span>
                <span className="text-slate-400 text-sm font-semibold">/ 5.0</span>
              </div>
              {/* <p className="text-slate-500 text-sm font-medium">
                {profile.totalReviews || 0} verified reviews
              </p> */}
            </div>

          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-6 sm:px-8 py-12 space-y-16">
        
        {/* Contact Details Section */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Contact Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {profile.email && (
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaEnvelope className="text-slate-400 text-xs" /> Email Address
                </div>
                <div className="text-base font-semibold text-slate-900 break-all">{profile.email}</div>
              </div>
            )}

            {(profile.phoneNumber || profile.mobile) && (
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaPhoneAlt className="text-slate-400 text-xs" /> Primary Phone
                </div>
                <div className="text-base font-semibold text-slate-900">{profile.phoneNumber || profile.mobile}</div>
              </div>
            )}

            {profile.whatsappNumber && (
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaWhatsapp className="text-emerald-500 text-sm" /> WhatsApp
                </div>
                <div className="text-base font-semibold text-slate-900">{profile.whatsappNumber}</div>
              </div>
            )}

            {altPhones.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaPhoneAlt className="text-slate-400 text-xs" /> Alternate Numbers
                </div>
                <div className="text-base font-semibold text-slate-900">{altPhones.join(", ")}</div>
              </div>
            )}

            {landlines.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaPhoneSquareAlt className="text-slate-400 text-xs" /> Landline Numbers
                </div>
                <div className="text-base font-semibold text-slate-900">{landlines.join(", ")}</div>
              </div>
            )}

            {profile.website && (
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5 flex items-center gap-1.5">
                  <FaGlobe className="text-slate-400 text-xs" /> Website
                </div>
                <a 
                  href={profile.website.startsWith("http") ? profile.website : `https://${profile.website}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-base font-semibold text-blue-600 hover:underline break-all"
                >
                  {profile.website}
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Business Overview & Timings */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Business Overview & Hours</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {profile.employeeRange && (
              <div className="flex items-start gap-3">
                <FaUsers className="text-slate-400 text-xl mt-1" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Company Size</div>
                  <div className="text-base font-semibold text-slate-900">{profile.employeeRange} Employees</div>
                </div>
              </div>
            )}

            {profile.officeWorkingHours && (profile.officeWorkingHours.start || profile.officeWorkingHours.end) && (
              <div className="flex items-start gap-3">
                <FaClock className="text-slate-400 text-xl mt-1" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Working Hours</div>
                  <div className="text-base font-semibold text-slate-900">
                    {profile.officeWorkingHours.start || "N/A"} - {profile.officeWorkingHours.end || "N/A"}
                  </div>
                </div>
              </div>
            )}

            {workingDays.length > 0 && (
              <div className="flex items-start gap-3 sm:col-span-2 md:col-span-1">
                <FaCalendarAlt className="text-slate-400 text-xl mt-1" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Working Days</div>
                  <div className="text-sm font-semibold text-slate-800 flex flex-wrap gap-1 mt-1">
                    {workingDays.map((day, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Primary & Branch Addresses */}
          {(profile.address || addresses.length > 0) && (
            <div className="pt-4 border-t border-slate-100 space-y-4">
              {profile.address && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Main Address</div>
                  <p className="text-slate-700 text-base">{profile.address}</p>
                </div>
              )}

              {addresses.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Office Branches</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addresses.map((addr, idx) => (
                      <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 flex items-start gap-2">
                        <FaBuilding className="text-slate-400 mt-0.5 shrink-0" />
                        <span>{addr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Working Operational Areas */}
        {workingAreas.length > 0 && (
          <section className="space-y-6">
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Working Areas & Routes</h2>
              {/* <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                {workingAreas.length} {workingAreas.length === 1 ? 'State' : 'States'} Covered
              </span> */}
            </div>

            <div
  className="
    flex
    gap-4
    overflow-x-auto
    pb-3
    snap-x
    snap-mandatory

    sm:grid
    sm:grid-cols-2
    md:grid-cols-3
    sm:overflow-visible
    sm:pb-0
    sm:snap-none
  "
>
  {workingAreas.map((area) => (
    <div
      key={area._id}
      className="
        p-4
        rounded-xl
        border
        border-slate-200
        bg-white
        shadow-xs

        flex-shrink-0
        w-[80vw]
        snap-start

        sm:w-auto
        sm:flex-shrink
      "
    >
      <div className="flex items-center gap-2 mb-3">
        <FaRoute className="text-blue-600" />

        <h3 className="font-bold text-slate-900 text-base">
          {area.state}
        </h3>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {area.cities?.map((city, idx) => (
          <span
            key={idx}
            className="
              text-xs
              font-medium
              bg-slate-100
              text-slate-700
              px-2.5
              py-1
              rounded-md
            "
          >
            {city}
          </span>
        ))}
      </div>
    </div>
  ))}
</div>
          </section>
        )}

        {/* Fleet & Vehicles Section */}
       {vehicles.length > 0 && (
  <section className="space-y-6">
    <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
      <h2 className="text-xl font-bold text-slate-900 tracking-tight">
        Fleet Details
      </h2>

      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        {profile.totalVehicles || vehicles.length}{" "}
        {vehicles.length === 1 ? "Vehicle" : "Vehicles"}
      </span>
    </div>

    <div
      className="
        flex
        gap-4
        overflow-x-auto
        pb-3
        snap-x
        snap-mandatory

        sm:grid
        sm:grid-cols-2
        md:grid-cols-3
        sm:overflow-visible
        sm:pb-0
        sm:snap-none
      "
    >
      {vehicles.map((v) => (
        <div
          key={v._id}
          className="
            p-4
            rounded-xl
            border
            border-slate-200
            bg-white
            hover:border-slate-300
            transition-colors

            flex-shrink-0
            w-[82vw]
            snap-start

            sm:w-auto
            sm:flex-shrink
          "
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FaTruck className="text-slate-500" />
              {v.vehicleType}
            </span>

            {v.status && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <FaCheckCircle className="text-[10px]" />
                {v.status}
              </span>
            )}
          </div>

          <div className="text-sm font-mono text-blue-700 font-semibold mb-2">
            {v.vehicleNumber}
          </div>

          <div className="text-xs text-slate-500 flex justify-between border-t border-slate-100 pt-2 gap-3">
            <span>
              Capacity:{" "}
              <strong className="text-slate-700">
                {v.capacity || "N/A"}
              </strong>
            </span>

            <span>
              Body:{" "}
              <strong className="text-slate-700">
                {v.bodyType || "N/A"}
              </strong>
            </span>
          </div>
        </div>
      ))}
    </div>
  </section>
)}

        {/* Firm Gallery Section */}
       <section className="space-y-6">
  {/* Gallery Header */}
  <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
      Firm Gallery
    </h2>

    {galleryItems.length > 0 && (
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        {profile.totalUploadedImages || galleryItems.length}{" "}
        {galleryItems.length === 1 ? "Photo" : "Photos"}
      </span>
    )}
  </div>

  {/* Gallery */}
  {galleryItems.length > 0 ? (
    <div
      className="
        flex gap-4 overflow-x-auto pb-3
        snap-x snap-mandatory
        scrollbar-hide
        sm:grid sm:grid-cols-3 sm:gap-4
        md:grid-cols-4
        sm:overflow-visible
        sm:pb-0
        sm:snap-none
      "
    >
      {galleryItems.map((item, index) => (
        <div
          key={item._id || index}
          onClick={() => {
            setSelectedImage(item);
            setZoomLevel(1);
          }}
          className="
            group
            relative
            overflow-hidden
            rounded-xl
            bg-slate-100
            aspect-square
            cursor-pointer
            flex-shrink-0
            w-[45vw]
            snap-start

            sm:w-auto
            sm:flex-shrink
          "
        >
          {/* Image */}
          <img
            src={item.imageUrl}
            alt={
              item.caption ||
              `Gallery item ${index + 1}`
            }
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              ease-out
              group-hover:scale-105
            "
          />

          {/* Caption */}
          {item.caption && (
            <div
              className="
                absolute
                inset-x-0
                bottom-0
                bg-gradient-to-t
                from-slate-950/80
                via-slate-950/40
                to-transparent
                p-3
                pt-6
                flex
                items-end
              "
            >
              <p
                className="
                  text-white
                  text-xs
                  font-medium
                  truncate
                  w-full
                "
              >
                {item.caption}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  ) : (
    <p className="text-slate-500 text-base font-normal py-4">
      No gallery photos available for this enterprise.
    </p>
  )}
</section>

        {/* Customer Feedback Section */}
       

        {/* Share Your Experience Section */}
        <section className="space-y-6 pt-6 border-t border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Share Your Experience</h2>
            <p className="text-slate-500 text-sm">Help the business network by reviewing this transport partner.</p>
          </div>

          <div className="max-w-2xl bg-slate-50/60 p-6 sm:p-8 rounded-2xl border border-slate-200/80">
            <AddRating AddtransporterId={profile._id} />
          </div>
        </section>
         <section className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Customer Feedback</h2>
          </div>

          <div className="space-y-6">
            <ReviewSection transporterId={profile._id} />
          </div>
        </section>

      </main>

      {/* Full-Screen Image Modal with Zoom */}
      {selectedImage && (
        <div 
          onClick={closeModal}
          className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col items-center justify-center p-4 backdrop-blur-md overflow-hidden"
        >
          <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
            <button 
              onClick={handleZoomIn}
              title="Zoom In"
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-md border border-white/10 cursor-pointer"
            >
              <FaSearchPlus size={16} />
            </button>
            <button 
              onClick={handleZoomOut}
              title="Zoom Out"
              className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-md border border-white/10 cursor-pointer"
            >
              <FaSearchMinus size={16} />
            </button>
            <button 
              onClick={closeModal}
              title="Close"
              className="bg-rose-600 hover:bg-rose-700 text-white p-3 rounded-full transition-colors shadow-lg cursor-pointer"
            >
              <FaTimes size={16} />
            </button>
          </div>

          <div 
            className="relative max-w-full max-h-[80vh] overflow-auto flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.caption || "Full view"}
              style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.2s ease-in-out" }}
              className="max-h-[75vh] object-contain rounded-lg shadow-2xl cursor-grab"
            />
          </div>

          {selectedImage.caption && (
            <p className="mt-6 text-white text-sm font-medium bg-slate-900/80 px-6 py-2.5 rounded-xl border border-white/10 text-center max-w-lg shadow-lg">
              {selectedImage.caption}
            </p>
          )}
        </div>
      )}

    </div>
  );
};

export default TransporterProfile;