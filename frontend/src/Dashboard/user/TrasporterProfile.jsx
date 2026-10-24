import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaStar,
  FaMapMarkerAlt,
  FaUserCircle,
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
  FaRoute,
  FaImages,
  FaCommentDots,
  FaPen,
  FaInfoCircle,
  FaRupeeSign,
} from "react-icons/fa";

import API from "../../api/api";
import AddRating from "../AddRatting";
import ReviewSection from "../ReviewSection";

// Agar tumhare paas Rodio ka logo image hai to uska path yahan daal do.
// Example: const RODIO_LOGO_URL = "/logo.png";
// Khali rahega to truck icon + "Rodio" text dikhega.
const RODIO_LOGO_URL = "";

// ==========================================
// SMALL REUSABLE PIECES
// ==========================================
const SectionTitle = ({ icon: Icon, title, right }) => (
  <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
        <Icon className="text-sm" />
      </span>
      <h2 className="text-xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
    </div>
    {right}
  </div>
);

const InfoCard = ({ icon: Icon, label, iconClass = "text-blue-600", children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md">
    <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50">
        <Icon className={`text-xs ${iconClass}`} />
      </span>
      {label}
    </div>
    {children}
  </div>
);

// ==========================================
// RODIO BRANDED BANNER (jab ad image na ho)
// ==========================================
const RodioBanner = () => (
  <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700">
    {/* Truck animation keyframes */}
    <style>{`
      @keyframes rodioDrive {
        from { left: -10%; }
        to { left: 105%; }
      }
    `}</style>

    {/* Decorative shapes */}
    <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-white/10" />
    <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-white/10" />
    <div className="pointer-events-none absolute right-24 top-6 hidden h-24 w-24 rounded-full bg-white/10 sm:block" />
    <FaRoute className="pointer-events-none absolute right-8 top-8 hidden text-7xl text-white/10 sm:block" />

    {/* Brand content */}
    <div className="relative flex h-full flex-col justify-center gap-2 px-6 pb-12 sm:gap-3 sm:px-10 sm:pb-16">
      <div className="flex items-center gap-3">
        {RODIO_LOGO_URL ? (
          <img
            src={RODIO_LOGO_URL}
            alt="Rodio"
            className="h-10 w-auto sm:h-14"
          />
        ) : (
          <>
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700 shadow-lg sm:h-14 sm:w-14 sm:rounded-2xl">
              <FaTruck className="text-lg sm:text-2xl" />
            </span>
            <span className="text-4xl font-black tracking-tight text-white drop-shadow sm:text-6xl">
              Rodio
            </span>
          </>
        )}
      </div>

      <p className="text-sm font-semibold text-white/90 sm:text-xl">
        India's Free Transport Directory
      </p>

      <div className="hidden flex-wrap gap-2 sm:flex">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <FaRupeeSign className="text-[10px]" /> No Brokerage
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <FaPhoneAlt className="text-[10px]" /> Direct Calls
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          <FaShieldAlt className="text-[10px]" /> Verified Partners
        </span>
      </div>
    </div>

    {/* Road + moving truck */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-9 bg-black/25 sm:h-11">
      <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-white/40" />
      <FaTruck
        className="absolute bottom-1.5 text-xl text-white sm:text-2xl"
        style={{ animation: "rodioDrive 9s linear infinite" }}
      />
    </div>
  </div>
);

const TransporterProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Image fallback states
  const [profileImgError, setProfileImgError] = useState(false);
  const [adImgError, setAdImgError] = useState(false);

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
      setProfileImgError(false);
      setAdImgError(false);
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
        <div className="w-10 h-10 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="tracking-wide">Loading enterprise profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-lg font-medium text-slate-500 bg-white px-4 text-center gap-2">
        <FaBuilding className="text-3xl text-slate-300 mb-2" />
        <h2 className="text-2xl font-bold text-slate-900">Profile Not Found</h2>
        <p className="text-slate-500 text-sm">
          The requested transport partner profile does not exist or has been
          removed.
        </p>
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

  const primaryPhone = profile.phoneNumber || profile.mobile;

  const profileImage = profile.profile?.profileImage || "";
  const adImage = profile.profile?.adImage || "";
  const hasProfileImage = !!profileImage && !profileImgError;
  const hasAdImage = !!adImage && !adImgError;
  const firmInitial = (profile.firmName || "T").trim().charAt(0).toUpperCase();

  const isVerified = profile?.documents?.some(
    (doc) => String(doc.verificationStatus).toLowerCase() === "verified"
  );

  const ownerName = profile.profile?.name || profile.name;

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 pb-24 overflow-x-hidden relative font-sans selection:bg-blue-600 selection:text-white">
      {/* ==========================================
          HEADER: COVER + AVATAR + NAME
      ========================================== */}
      <header className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6">
          {/* COVER / AD BANNER */}
          <div className="relative h-44 sm:h-60 md:h-72 overflow-hidden rounded-3xl border border-slate-200 shadow-lg">
            {hasAdImage ? (
              <>
                <img
                  src={adImage}
                  alt={`${profile.firmName} banner`}
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={() => setAdImgError(true)}
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
              </>
            ) : (
              <RodioBanner />
            )}
          </div>

          {/* AVATAR + RATING ROW (overlaps the banner) */}
          <div className="relative z-10 -mt-14 flex items-end justify-between gap-4 px-2 sm:-mt-20 sm:px-6">
            {/* Profile photo */}
            <div className="relative shrink-0">
              <div className="h-28 w-28 overflow-hidden rounded-full bg-white shadow-xl ring-4 ring-white sm:h-36 sm:w-36">
                {hasProfileImage ? (
                  <img
                    src={profileImage}
                    alt={`${profile.firmName} profile`}
                    className="h-full w-full object-cover"
                    onError={() => setProfileImgError(true)}
                  />
                ) : (
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600">
                    <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/15" />
                    <div className="absolute -bottom-6 -left-4 h-20 w-20 rounded-full bg-white/10" />
                    <span className="relative text-5xl font-extrabold text-white drop-shadow sm:text-6xl">
                      {firmInitial}
                    </span>
                  </div>
                )}
              </div>

              {isVerified && (
                <span
                  title="Rodio Verified"
                  className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg ring-2 ring-white sm:bottom-2 sm:right-2"
                >
                  <FaShieldAlt className="text-xs" />
                </span>
              )}
            </div>

            {/* Rating card */}
            <div className="mb-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-md sm:mb-4">
              <FaStar className="text-xl text-amber-400" />
              <div className="leading-tight">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                    {profile.averageRating?.toFixed(1) || "0.0"}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    / 5.0
                  </span>
                </div>
                {profile.totalReviews !== undefined && (
                  <p className="text-[11px] font-medium text-slate-500">
                    {profile.totalReviews}{" "}
                    {profile.totalReviews === 1 ? "review" : "reviews"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* NAME + META */}
          <div className="space-y-4 px-2 pb-8 pt-4 sm:px-6">
            <div className="space-y-2">
              {isVerified && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-700">
                  <FaShieldAlt className="text-xs text-blue-600" />
                  Rodio Verified
                </span>
              )}

              <h1 className="break-words text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {profile.firmName}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm font-medium sm:text-base">
              {ownerName && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-800 shadow-sm">
                  <FaUserCircle className="text-slate-400" />
                  {ownerName}
                </span>
              )}

              {profile.category && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 capitalize text-blue-700">
                  <FaTruck className="text-blue-500" />
                  {String(profile.category).replace(/_/g, " ")}
                </span>
              )}

              {(profile.currentCity || profile.currentState) && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-100 bg-rose-50 px-3 py-1.5 text-rose-700">
                  <FaMapMarkerAlt className="text-xs text-rose-500" />
                  {profile.currentCity}
                  {profile.currentState ? `, ${profile.currentState}` : ""}
                  {profile.pincode ? ` - ${profile.pincode}` : ""}
                </span>
              )}

              {(profile.totalVehicles > 0 || vehicles.length > 0) && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-emerald-700">
                  <FaTruck className="text-emerald-500" />
                  {profile.totalVehicles || vehicles.length}{" "}
                  {(profile.totalVehicles || vehicles.length) === 1
                    ? "Vehicle"
                    : "Vehicles"}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        {/* Contact Information Section */}
        <section className="space-y-6">
          <SectionTitle icon={FaPhoneAlt} title="Contact Information" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {profile.email && (
              <InfoCard icon={FaEnvelope} label="Email Address">
                <div className="text-base font-semibold text-slate-900 break-all">
                  {profile.email}
                </div>
              </InfoCard>
            )}

            {primaryPhone && (
              <InfoCard icon={FaPhoneAlt} label="Primary Phone" iconClass="text-emerald-600">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-base font-semibold text-slate-900">
                    {primaryPhone}
                  </div>
                  <a
                    href={`tel:${primaryPhone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-700 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <FaPhoneAlt className="text-xs" /> Call Now
                  </a>
                </div>
              </InfoCard>
            )}

            {profile.whatsappNumber && (
              <InfoCard icon={FaWhatsapp} label="WhatsApp" iconClass="text-emerald-500">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-base font-semibold text-slate-900">
                    {profile.whatsappNumber}
                  </div>
                  <a
                    href={`https://wa.me/${String(profile.whatsappNumber).replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#25D366] to-[#1DA851] px-4 py-2 text-sm font-semibold text-white shadow-md shadow-green-500/20 transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <FaWhatsapp className="text-base" /> WhatsApp
                  </a>
                </div>
              </InfoCard>
            )}

            {altPhones.length > 0 && (
              <InfoCard icon={FaPhoneAlt} label="Alternate Numbers">
                <div className="text-base font-semibold text-slate-900">
                  {altPhones.join(", ")}
                </div>
              </InfoCard>
            )}

            {landlines.length > 0 && (
              <InfoCard icon={FaPhoneSquareAlt} label="Landline Numbers">
                <div className="text-base font-semibold text-slate-900">
                  {landlines.join(", ")}
                </div>
              </InfoCard>
            )}

            {profile.website && (
              <InfoCard icon={FaGlobe} label="Website">
                <a
                  href={
                    profile.website.startsWith("http")
                      ? profile.website
                      : `https://${profile.website}`
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-semibold text-blue-600 hover:underline break-all"
                >
                  {profile.website}
                </a>
              </InfoCard>
            )}
          </div>
        </section>

        {/* Business Overview & Timings */}
        <section className="space-y-6">
          <SectionTitle icon={FaInfoCircle} title="Business Overview & Hours" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {profile.employeeRange && (
              <InfoCard icon={FaUsers} label="Company Size">
                <div className="text-base font-semibold text-slate-900">
                  {profile.employeeRange} Employees
                </div>
              </InfoCard>
            )}

            {profile.officeWorkingHours &&
              (profile.officeWorkingHours.start ||
                profile.officeWorkingHours.end) && (
                <InfoCard icon={FaClock} label="Working Hours" iconClass="text-amber-500">
                  <div className="text-base font-semibold text-slate-900">
                    {profile.officeWorkingHours.start || "N/A"} -{" "}
                    {profile.officeWorkingHours.end || "N/A"}
                  </div>
                </InfoCard>
              )}

            {workingDays.length > 0 && (
              <div className="sm:col-span-2 md:col-span-1">
                <InfoCard icon={FaCalendarAlt} label="Working Days" iconClass="text-purple-600">
                  <div className="flex flex-wrap gap-1.5">
                    {workingDays.map((day, idx) => (
                      <span
                        key={idx}
                        className="rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700"
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </InfoCard>
              </div>
            )}
          </div>

          {/* Primary & Branch Addresses */}
          {(profile.address || addresses.length > 0) && (
            <div className="pt-2 space-y-4">
              {profile.address && (
                <InfoCard icon={FaMapMarkerAlt} label="Main Address" iconClass="text-rose-500">
                  <p className="text-slate-700 text-base">{profile.address}</p>
                </InfoCard>
              )}

              {addresses.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Office Branches
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {addresses.map((addr, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-800 shadow-sm"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                          <FaBuilding className="text-sm" />
                        </span>
                        <span className="pt-1">{addr}</span>
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
            <SectionTitle icon={FaRoute} title="Working Areas & Routes" />

            <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 sm:overflow-visible sm:pb-0 sm:snap-none">
              {workingAreas.map((area) => (
                <div
                  key={area._id}
                  className="flex-shrink-0 w-[80vw] snap-start rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:w-auto sm:flex-shrink"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <FaRoute className="text-sm" />
                    </span>
                    <h3 className="font-bold text-slate-900 text-base">
                      {area.state}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {area.cities?.map((city, idx) => (
                      <span
                        key={idx}
                        className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
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
            <SectionTitle
              icon={FaTruck}
              title="Fleet Details"
              right={
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-700">
                  {profile.totalVehicles || vehicles.length}{" "}
                  {vehicles.length === 1 ? "Vehicle" : "Vehicles"}
                </span>
              }
            />

            <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-3 sm:overflow-visible sm:pb-0 sm:snap-none">
              {vehicles.map((v) => (
                <div
                  key={v._id}
                  className="flex-shrink-0 w-[82vw] snap-start rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:w-auto sm:flex-shrink"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
                      <FaTruck className="text-sm" />
                    </span>
                    <span className="font-bold text-slate-900 text-base">
                      {v.vehicleType || v.name || "Commercial Vehicle"}
                    </span>
                  </div>
                  {v.capacity && (
                    <p className="text-slate-600 text-sm">
                      Capacity:{" "}
                      <span className="font-semibold text-slate-900">
                        {v.capacity}
                      </span>
                    </p>
                  )}
                  {v.count && (
                    <p className="text-slate-600 text-sm">
                      Count:{" "}
                      <span className="font-semibold text-slate-900">
                        {v.count}
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Firm Gallery Section */}
        <section className="space-y-6">
          <SectionTitle
            icon={FaImages}
            title="Firm Gallery"
            right={
              galleryItems.length > 0 && (
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-700">
                  {galleryItems.length}{" "}
                  {galleryItems.length === 1 ? "Photo" : "Photos"}
                </span>
              )
            }
          />

          {galleryItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {galleryItems.map((item, index) => (
                <div
                  key={item._id || index}
                  onClick={() => {
                    setSelectedImage(item);
                    setZoomLevel(1);
                  }}
                  className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition hover:shadow-xl"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.caption || `Gallery item ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  {item.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-3 pt-6 flex items-end">
                      <p className="text-white text-xs font-medium truncate w-full">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/60 py-12 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm">
                <FaImages className="text-xl" />
              </span>
              <p className="text-slate-500 text-sm font-medium">
                No gallery photos available for this enterprise.
              </p>
            </div>
          )}
        </section>

        {/* Customer Feedback Section */}
        <section className="space-y-8">
          <SectionTitle icon={FaCommentDots} title="Customer Feedback" />

          <div className="space-y-6">
            <ReviewSection transporterId={profile._id} />
          </div>
        </section>

        {/* Share Your Experience Section */}
        <section className="space-y-6 pt-6 border-t border-slate-200">
          <SectionTitle icon={FaPen} title="Share Your Experience" />
          <p className="-mt-2 text-slate-500 text-sm">
            Help the business network by reviewing this transport partner.
          </p>

          <div className="max-w-2xl rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm sm:p-8">
            <AddRating AddtransporterId={profile._id} />
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
              style={{
                transform: `scale(${zoomLevel})`,
                transition: "transform 0.2s ease-in-out",
              }}
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