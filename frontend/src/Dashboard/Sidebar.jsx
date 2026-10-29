// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import toast from "react-hot-toast";
// import API from "../api/api";
// import { Link } from "react-router-dom";
// import {
//   X,
//   LayoutDashboard,
//   BookOpen,
//   Search,
//   PlusCircle,
//   ClipboardList,
//   CheckCircle,
//   FileText,
//   KeyRound,
//   Truck,
//   Settings,
//   Lock,
//   Route,
//   MapPin,
//   Upload,
//   Sparkles,
//   Images,
//   HandCoins,
// } from "lucide-react";
// import LogoutButton from "../utils/LogoutButton";

// export default function Sidebar({ open, setOpen }) {
//   const [subscriptionActive, setSubscriptionActive] = useState(false);
//   const [checkingSubscription, setCheckingSubscription] = useState(true);

//   // ======================================================
//   // CHECK CURRENT BUSINESS / SUBSCRIPTION STATUS
//   // ======================================================

//   useEffect(() => {
//     const fetchBusinessStatus = async () => {
//       try {
//         setCheckingSubscription(true);

//         const token = localStorage.getItem("token");

//         if (!token) {
//           setSubscriptionActive(false);
//           return;
//         }

//         // Read current user from localStorage
//         const user = JSON.parse(localStorage.getItem("user") || "{}");

//         if (
//           user?.isSubscriptionActive === true ||
//           user?.subscription?.status === "active"
//         ) {
//           setSubscriptionActive(true);
//         }

//         // Get latest status from backend
//         const { data } = await API.get("/business/me");

//         const business = data?.data;

//         if (!business) {
//           setSubscriptionActive(false);
//           return;
//         }

//         const isActive =
//           business.subscriptionStatus?.toLowerCase() === "active" &&
//           business.profileUnlocked === true;

//         setSubscriptionActive(isActive);

//         // Keep localStorage updated
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             ...user,
//             isSubscriptionActive: isActive,
//             subscription: {
//               ...(user.subscription || {}),
//               status: isActive ? "active" : "inactive",
//             },
//           }),
//         );
//       } catch (err) {
//         console.error(err);
//         setSubscriptionActive(false);
//       } finally {
//         setCheckingSubscription(false);
//       }
//     };

//     fetchBusinessStatus();

//     const handleSubscriptionUpdate = () => {
//       const user = JSON.parse(localStorage.getItem("user") || "{}");

//       const isActive =
//         user?.isSubscriptionActive === true ||
//         user?.subscription?.status === "active";

//       setSubscriptionActive(isActive);
//     };

//     window.addEventListener("subscriptionUpdated", handleSubscriptionUpdate);

//     return () => {
//       window.removeEventListener(
//         "subscriptionUpdated",
//         handleSubscriptionUpdate,
//       );
//     };
//   }, []);

//   const handleClose = () => {
//     if (window.innerWidth < 1024) {
//       setOpen(false);
//     }
//   };

//   const role = localStorage.getItem("role");

//   // Dynamic Class for NavLinks with White-Themed Styling
//   const linkClass = ({ isActive }) =>
//     `flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
//       isActive
//         ? "bg-green-700 text-white shadow-md"
//         : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//     }`;

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar Container */}
//       <aside
//         id="sidebar-container"
//         className={`
//           fixed top-0 left-0
//           w-72 sm:w-80 lg:w-[300px]
//           h-screen
//           bg-white
//           text-slate-800
//           z-50
//           flex flex-col
//           border-r border-slate-200
//           shadow-2xl
//           transition-transform duration-300 ease-in-out
//           ${open ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0
//         `}
//       >
//         {/* Mobile Close Button */}
//         <div
//           id="sidebar-mobile-close"
//           className="lg:hidden flex justify-end p-4 pb-0"
//         >
//           <button
//             id="sidebar-close-btn"
//             onClick={() => setOpen(false)}
//             className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
//           >
//             <X size={22} />
//           </button>
//         </div>

//         {/* Logo / Header Brand */}

//         <Link to="/" className="block">
//           <div
//             id="sidebar-header"
//             className="px-6 py-6 border-b border-slate-200 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-all duration-300 group"
//           >
//             <div
//               id="sidebar-brand-icon"
//               className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0 font-black transition-transform duration-300 group-hover:scale-110"
//             >
//               <Truck size={24} />
//             </div>

//             <div id="sidebar-brand-info">
//               <h2
//                 id="sidebar-brand-title"
//                 className="text-xl font-black tracking-wide text-slate-900 group-hover:text-blue-600 transition-colors duration-300"
//               >
//                 Rodio Tradelink
//               </h2>

//               <p
//                 id="sidebar-brand-role"
//                 className="text-[11px] font-bold text-slate-500 capitalize tracking-wider group-hover:text-slate-700 transition-colors duration-300"
//               >
//                 {role || "User"} Control Panel
//               </p>
//             </div>
//           </div>
//         </Link>

//         {/* Menu Navigation */}
//         <nav
//           id="sidebar-nav"
//           className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-300"
//         >
//           {/* Main Dashboard Link (Always Free/Unlocked) */}
//           <NavLink
//             id="nav-profile"
//             end
//             to="/dashboard"
//             className={linkClass}
//             onClick={handleClose}
//           >
//             <div className="flex items-center gap-3.5">
//               <LayoutDashboard size={20} />
//               <span>PROFILE</span>
//             </div>
//           </NavLink>

//           {/* ================= UNIFIED DASHBOARD FOR ALL ROLES (Transporter layout for everyone) ================= */}
//           <>
//             {/* Navigate to Add Load Enquiry form */}
//             <NavLink
//               id="nav-add-load-enquiry"
//               to="/dashboard/userform"
//               className={linkClass}
//               onClick={handleClose}
//             >
//               <div className="flex items-center gap-3.5">
//                 <PlusCircle size={20} />
//                 <span>Add Load Enquiry</span>
//               </div>
//             </NavLink>

//             {/* Navigate to Enquiry Status view */}
//             <NavLink
//               id="nav-enquiry-status"
//               to="/dashboard/showenquiery"
//               className={linkClass}
//               onClick={handleClose}
//             >
//               <div className="flex items-center gap-3.5">
//                 <ClipboardList size={20} />
//                 <span>Enquiry Status</span>
//               </div>
//             </NavLink>

//             {/* Navigate to Accepted Bids list */}
//             <NavLink
//               id="nav-accepted-bids"
//               to="/dashboard/acceptedbid"
//               className={linkClass}
//               onClick={handleClose}
//             >
//               <div className="flex items-center gap-3.5">
//                 <CheckCircle size={20} />
//                 <span>Accepted Bids</span>
//               </div>
//             </NavLink>

//             {/* Navigate to Search Transport page */}
//             <NavLink
//               id="nav-search-transport"
//               to="/dashboard/transportsearch"
//               className={linkClass}
//               onClick={handleClose}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Search size={20} />
//                 <span>Search Transport</span>
//               </div>
//             </NavLink>

//             {/* Navigate to Directory page */}
//             <NavLink
//               id="nav-directory"
//               to="/dashboard/directory"
//               className={linkClass}
//               onClick={handleClose}
//             >
//               <div className="flex items-center gap-3.5">
//                 <BookOpen size={20} />
//                 <span>Directory</span>
//               </div>
//             </NavLink>

//             {/* Navigate to Leads (Subscription Restricted) */}
//             <NavLink
//               id="nav-leads"
//               to={subscriptionActive ? "/dashboard/leads" : "/dashboard"}
//               className={linkClass}
//               onClick={(e) => {
//                 if (!subscriptionActive) {
//                   e.preventDefault();
//                   toast.error("Please complete payment to unlock Leads.", {
//                     id: "error-toast",
//                   });
//                 } else {
//                   handleClose();
//                 }
//               }}
//             >
//               <div className="flex items-center gap-3.5">
//                 <FileText size={20} />
//                 <span>Leads</span>
//               </div>
//               {!subscriptionActive && (
//                 <Lock size={16} className="text-slate-400" />
//               )}
//             </NavLink>

//             {/* Navigate to My Vehicles (Subscription Restricted) */}
//             <NavLink
//               id="nav-my-vehicles"
//               to={subscriptionActive ? "/dashboard/MyVehicles" : "/dashboard"}
//               className={linkClass}
//               onClick={(e) => {
//                 if (!subscriptionActive) {
//                   e.preventDefault();
//                   toast.error(
//                     "Please complete payment to unlock My Vehicles.",
//                     {
//                       id: "error-toast",
//                     },
//                   );
//                 } else {
//                   handleClose();
//                 }
//               }}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Truck size={20} />
//                 <span>My Vehicles</span>
//               </div>
//               {!subscriptionActive && (
//                 <Lock size={16} className="text-slate-400" />
//               )}
//             </NavLink>

//             {/* Navigate to Referral Earning (Subscription Restricted) */}
//             <NavLink
//               id="nav-referral-earning"
//               to={subscriptionActive ? "/dashboard/referral" : "/dashboard"}
//               className={linkClass}
//               onClick={(e) => {
//                 if (!subscriptionActive) {
//                   e.preventDefault();
//                   toast.error(
//                     "Please complete payment to unlock Referral Earning.",
//                     {
//                       id: "error-toast",
//                     },
//                   );
//                 } else {
//                   handleClose();
//                 }
//               }}
//             >
//               <div className="flex items-center gap-3.5">
//                 <HandCoins size={20} />
//                 <span>Referral Earning</span>
//               </div>
//               {!subscriptionActive && (
//                 <Lock size={16} className="text-slate-400" />
//               )}
//             </NavLink>

//             {/* Navigate to My Gallery (Subscription Restricted) */}
//             <NavLink
//               id="nav-my-gallery"
//               to={
//                 subscriptionActive
//                   ? "/dashboard/imagegallerymanager"
//                   : "/dashboard"
//               }
//               className={linkClass}
//               onClick={(e) => {
//                 if (!subscriptionActive) {
//                   e.preventDefault();
//                   toast.error(
//                     "Please complete payment to unlock Vehicle Image Gallery.",
//                     {
//                       id: "error-toast",
//                     },
//                   );
//                 } else {
//                   handleClose();
//                 }
//               }}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Images size={20} />
//                 <span>My gallery</span>
//               </div>
//               {!subscriptionActive && (
//                 <Lock size={16} className="text-slate-400" />
//               )}
//             </NavLink>

//             {/* Navigate to Add Vehicles (Subscription Restricted) */}
//             <NavLink
//               id="nav-add-vehicles"
//               to={subscriptionActive ? "/dashboard/addvehicle" : "/dashboard"}
//               className={linkClass}
//               onClick={(e) => {
//                 if (!subscriptionActive) {
//                   e.preventDefault();
//                   toast.error(
//                     "Please complete payment to unlock Add Vehicles.",
//                     {
//                       id: "error-toast",
//                     },
//                   );
//                 } else {
//                   handleClose();
//                 }
//               }}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Truck size={20} />
//                 <span>Add Vehicles</span>
//               </div>
//               {!subscriptionActive && (
//                 <Lock size={16} className="text-slate-400" />
//               )}
//             </NavLink>

//             {/* Navigate to My Document (Subscription Restricted) */}
//             <NavLink
//               id="nav-my-document"
//               to={subscriptionActive ? "/dashboard/mydocument" : "/dashboard"}
//               className={linkClass}
//               onClick={(e) => {
//                 if (!subscriptionActive) {
//                   e.preventDefault();
//                   toast.error("Please complete payment to unlock Add Routes.", {
//                     id: "error-toast",
//                   });
//                 } else {
//                   handleClose();
//                 }
//               }}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Route size={20} />
//                 <span>My Document</span>
//               </div>
//               {!subscriptionActive && (
//                 <Lock size={16} className="text-slate-400" />
//               )}
//             </NavLink>

//             {/* Navigate to Working Areas (Subscription Restricted) */}
//             <NavLink
//               id="nav-working-areas"
//               to={subscriptionActive ? "/dashboard/workingareas" : "/dashboard"}
//               className={linkClass}
//               onClick={(e) => {
//                 if (!subscriptionActive) {
//                   e.preventDefault();
//                   toast.error(
//                     "Please complete payment to unlock Working Areas.",
//                     {
//                       id: "error-toast",
//                     },
//                   );
//                 } else {
//                   handleClose();
//                 }
//               }}
//             >
//               <div className="flex items-center gap-3.5">
//                 <MapPin size={20} />
//                 <span>Working Areas</span>
//               </div>
//               {!subscriptionActive && (
//                 <Lock size={16} className="text-slate-400" />
//               )}
//             </NavLink>

//             {/* Navigate to Upload Documents (Subscription Restricted) */}
//             <NavLink
//               id="nav-upload-documents"
//               to={
//                 subscriptionActive ? "/dashboard/uploaddocuments" : "/dashboard"
//               }
//               className={linkClass}
//               onClick={(e) => {
//                 if (!subscriptionActive) {
//                   e.preventDefault();
//                   toast.error(
//                     "Please complete payment to unlock Upload Documents.",
//                     {
//                       id: "error-toast",
//                     },
//                   );
//                 } else {
//                   handleClose();
//                 }
//               }}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Upload size={20} />
//                 <span>Upload Documents</span>
//               </div>
//               {!subscriptionActive && (
//                 <Lock size={16} className="text-slate-400" />
//               )}
//             </NavLink>

//             {/* Navigate to Update Profile settings */}
//             <NavLink
//               id="nav-update-profile"
//               to="/dashboard/settings"
//               className={linkClass}
//               onClick={handleClose}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Settings size={20} />
//                 <span>Update Profile</span>
//               </div>
//             </NavLink>
//           </>
//         </nav>

//         {/* Footer Actions (Password & Logout) */}
//         <div
//           id="sidebar-footer"
//           className="border-t border-slate-200 p-4 space-y-2 bg-white"
//         >
//           <NavLink
//             id="nav-change-password"
//             to="/dashboard/changepassword"
//             className={linkClass}
//             onClick={handleClose}
//           >
//             <div className="flex items-center gap-3.5">
//               <KeyRound size={20} />
//               <span>Change Password</span>
//             </div>
//           </NavLink>

//           <div id="sidebar-logout-container" className="pt-1">
//             <LogoutButton />
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import API from "../api/api";
// import { Link } from "react-router-dom";
// import {
//   X,
//   LayoutDashboard,
//   BookOpen,
//   Search,
//   PlusCircle,
//   ClipboardList,
//   CheckCircle,
//   FileText,
//   KeyRound,
//   Truck,
//   Settings,
//   Lock,
//   Route,
//   MapPin,
//   Upload,
//   Sparkles,
//   Images,
//   HandCoins,
// } from "lucide-react";
// import LogoutButton from "../utils/LogoutButton";

// export default function Sidebar({ open, setOpen }) {
//   const [subscriptionActive, setSubscriptionActive] = useState(false);
//   const [checkingSubscription, setCheckingSubscription] = useState(true);
//   const navigate = useNavigate();

//   // ======================================================
//   // CHECK CURRENT BUSINESS / SUBSCRIPTION STATUS
//   // ======================================================

//   useEffect(() => {
//     const fetchBusinessStatus = async () => {
//       try {
//         setCheckingSubscription(true);

//         const token = localStorage.getItem("token");

//         if (!token) {
//           setSubscriptionActive(false);
//           return;
//         }

//         // Read current user from localStorage
//         const user = JSON.parse(localStorage.getItem("user") || "{}");

//         if (
//           user?.isSubscriptionActive === true ||
//           user?.subscription?.status === "active"
//         ) {
//           setSubscriptionActive(true);
//         }

//         // Get latest status from backend
//         const { data } = await API.get("/business/me",{
//             headers: { "x-api-key": "ashu@rodio" },
//            });

//         const business = data?.data;

//         if (!business) {
//           setSubscriptionActive(false);
//           return;
//         }

//         const isActive =
//           business.subscriptionStatus?.toLowerCase() === "active" &&
//           business.profileUnlocked === true;

//         setSubscriptionActive(isActive);

//         // Keep localStorage updated
//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             ...user,
//             isSubscriptionActive: isActive,
//             subscription: {
//               ...(user.subscription || {}),
//               status: isActive ? "active" : "inactive",
//             },
//           }),
//         );
//       } catch (err) {
//         console.error(err);
//         setSubscriptionActive(false);
//       } finally {
//         setCheckingSubscription(false);
//       }
//     };

//     fetchBusinessStatus();

//     const handleSubscriptionUpdate = () => {
//       const user = JSON.parse(localStorage.getItem("user") || "{}");

//       const isActive =
//         user?.isSubscriptionActive === true ||
//         user?.subscription?.status === "active";

//       setSubscriptionActive(isActive);
//     };

//     window.addEventListener("subscriptionUpdated", handleSubscriptionUpdate);

//     return () => {
//       window.removeEventListener(
//         "subscriptionUpdated",
//         handleSubscriptionUpdate,
//       );
//     };
//   }, []);

//   const handleClose = () => {
//     if (window.innerWidth < 1024) {
//       setOpen(false);
//     }
//   };

//   const role = localStorage.getItem("role");

//   // Dynamic Class for NavLinks with White-Themed Styling
//   const linkClass = ({ isActive }) =>
//     `flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
//       isActive
//         ? "bg-green-700 text-white shadow-md"
//         : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
//     }`;

//   // Reusable helper handler for restricted links
//   const handleRestrictedClick = (e, featureName, targetRoute) => {
//     e.preventDefault();
//     if (!subscriptionActive) {
//       toast.error(`Please select a plan to unlock ${featureName}.`, {
//         id: "error-toast",
//       });
//       // Redirect to your plan selection route (Change '/dashboard/subscription' if your route is different)
//       navigate("/dashboard/planselection");
//       handleClose();
//     } else {
//       navigate(targetRoute);
//       handleClose();
//     }
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar Container */}
//       <aside
//         id="sidebar-container"
//         className={`
//           fixed top-0 left-0
//           w-72 sm:w-80 lg:w-[300px]
//           h-screen
//           bg-white
//           text-slate-800
//           z-50
//           flex flex-col
//           border-r border-slate-200
//           shadow-2xl
//           transition-transform duration-300 ease-in-out
//           ${open ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0
//         `}
//       >
//         {/* Mobile Close Button */}
//         <div
//           id="sidebar-mobile-close"
//           className="lg:hidden flex justify-end p-4 pb-0"
//         >
//           <button
//             id="sidebar-close-btn"
//             onClick={() => setOpen(false)}
//             className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
//           >
//             <X size={22} />
//           </button>
//         </div>

//         {/* Logo / Header Brand */}
//         <Link to="/" className="block">
//           <div
//             id="sidebar-header"
//             className="px-6 py-6 border-b border-slate-200 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-all duration-300 group"
//           >
//             <div
//               id="sidebar-brand-icon"
//               className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0 font-black transition-transform duration-300 group-hover:scale-110"
//             >
//               <Truck size={24} />
//             </div>

//             <div id="sidebar-brand-info">
//               <h2
//   id="sidebar-brand-title"
//   className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300"
// >
//   Rodio <span className="text-orange-500">Tradelink</span>
// </h2>

//               <p
//                 id="sidebar-brand-role"
//                 className="text-[11px] font-bold text-slate-500 capitalize tracking-wider group-hover:text-slate-700 transition-colors duration-300"
//               >
//                 {role || "User"} Control Panel
//               </p>
//             </div>
//           </div>
//         </Link>

//         {/* Menu Navigation */}
//         <nav
//           id="sidebar-nav"
//           className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-300"
//         >
//           {/* Main Dashboard Link (Always Free/Unlocked) */}
//           <NavLink
//             id="nav-profile"
//             end
//             to="/dashboard"
//             className={linkClass}
//             onClick={handleClose}
//           >
//             <div className="flex items-center gap-3.5">
//               <LayoutDashboard size={20} />
//               <span>PROFILE (Edit/View)</span>
//             </div>
//           </NavLink>

//           {/* ================= UNIFIED DASHBOARD FOR ALL ROLES ================= */}
//           <>
//            <div
//               onClick={(e) => handleRestrictedClick(e, "Leads", "/dashboard/leads")}
//               className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/leads" })}`}
//             >
//               <div className="flex items-center gap-3.5">
//                 <FileText size={20} />
//                 <span>Leads</span>
//               </div>
//               {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
//             </div>

//             <NavLink
//               id="nav-add-load-enquiry"
//               to="/dashboard/userform"
//               className={linkClass}
//               onClick={handleClose}
//             >
//               <div className="flex items-center gap-3.5">
//                 <PlusCircle size={20} />
//                 <span>Add Load Enquiry</span>
//               </div>
//             </NavLink>

//             <NavLink
//               id="nav-enquiry-status"
//               to="/dashboard/showenquiery"
//               className={linkClass}
//               onClick={handleClose}
//             >
//               <div className="flex items-center gap-3.5">
//                 <ClipboardList size={20} />
//                 <span>Enquiry Status</span>
//               </div>
//             </NavLink>

//             <NavLink
//               id="nav-accepted-bids"
//               to="/dashboard/acceptedbid"
//               className={linkClass}
//               onClick={handleClose}
//             >
//               <div className="flex items-center gap-3.5">
//                 <CheckCircle size={20} />
//                 <span>Accepted Bids</span>
//               </div>
//             </NavLink>

//             <NavLink
//               id="nav-search-transport"
//               to="/dashboard/transportsearch"
//               className={linkClass}
//               onClick={handleClose}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Search size={20} />
//                 <span>Search Transport</span>
//               </div>
//             </NavLink>

//             <NavLink
//               id="nav-directory"
//               to="/dashboard/directory"
//               className={linkClass}
//               onClick={handleClose}
//             >
//               <div className="flex items-center gap-3.5">
//                 <BookOpen size={20} />
//                 <span>Directory</span>
//               </div>
//             </NavLink>

//             {/* Leads */}
//             {/* <div
//               onClick={(e) => handleRestrictedClick(e, "Leads", "/dashboard/leads")}
//               className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/leads" })}`}
//             >
//               <div className="flex items-center gap-3.5">
//                 <FileText size={20} />
//                 <span>Leads</span>
//               </div>
//               {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
//             </div> */}

//             {/* My Vehicles */}
//             {/* <div
//               onClick={(e) => handleRestrictedClick(e, "My Vehicles", "/dashboard/MyVehicles")}
//               className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/MyVehicles" })}`}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Truck size={20} />
//                 <span>My Vehicles</span>
//               </div>
//               {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
//             </div> */}

//             {/* Referral Earning */}
//             <div
//               onClick={(e) => handleRestrictedClick(e, "Referral Earning", "/dashboard/referral")}
//               className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/referral" })}`}
//             >
//               <div className="flex items-center gap-3.5">
//                 <HandCoins size={20} />
//                 <span>Referral Earning</span>
//               </div>
//               {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
//             </div>

//             {/* My Gallery */}
//             <div
//               onClick={(e) => handleRestrictedClick(e, "Vehicle Image Gallery", "/dashboard/imagegallerymanager")}
//               className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/imagegallerymanager" })}`}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Images size={20} />
//                 <span>My gallery</span>
//               </div>
//               {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
//             </div>

//             {/* Add Vehicles */}
//             {/* <div
//               onClick={(e) => handleRestrictedClick(e, "Add Vehicles", "/dashboard/addvehicle")}
//               className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/addvehicle" })}`}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Truck size={20} />
//                 <span>Add Vehicles</span>
//               </div>
//               {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
//             </div> */}

//             {/* My Document */}
//             {/* <div
//               onClick={(e) => handleRestrictedClick(e, "Add Routes", "/dashboard/mydocument")}
//               className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/mydocument" })}`}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Route size={20} />
//                 <span>My Document</span>
//               </div>
//               {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
//             </div> */}

//             {/* Working Areas */}
//             {/* <div
//               onClick={(e) => handleRestrictedClick(e, "Working Areas", "/dashboard/workingareas")}
//               className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/workingareas" })}`}
//             >
//               <div className="flex items-center gap-3.5">
//                 <MapPin size={20} />
//                 <span>Working Areas</span>
//               </div>
//               {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
//             </div> */}

//             {/* Upload Documents */}
//             {/* <div
//               onClick={(e) => handleRestrictedClick(e, "Upload Documents", "/dashboard/uploaddocuments")}
//               className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/uploaddocuments" })}`}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Upload size={20} />
//                 <span>Upload Documents</span>
//               </div>
//               {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
//             </div> */}
// {/* 
//             <NavLink
//               id="nav-update-profile"
//               to="/dashboard/settings"
//               className={linkClass}
//               onClick={handleClose}
//             >
//               <div className="flex items-center gap-3.5">
//                 <Settings size={20} />
//                 <span>Update Profile</span>
//               </div>
//             </NavLink> */}
//           </>
//         </nav>

//         {/* Footer Actions (Password & Logout) */}
//         <div
//           id="sidebar-footer"
//           className="border-t border-slate-200 p-4 space-y-2 bg-white"
//         >
//           <NavLink
//             id="nav-change-password"
//             to="/dashboard/changepassword"
//             className={linkClass}
//             onClick={handleClose}
//           >
//             <div className="flex items-center gap-3.5">
//               <KeyRound size={20} />
//               <span>Change Password</span>
//             </div>
//           </NavLink>

//           <div id="sidebar-logout-container" className="pt-1">
//             <LogoutButton />
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/api";
import {
  X,
  LayoutDashboard,
  BookOpen,
  Search,
  PlusCircle,
  ClipboardList,
  CheckCircle,
  FileText,
  KeyRound,
  Truck,
  Lock,
  Images,
  HandCoins,
  UserRound,
  Crown,
   Star,
} from "lucide-react";
import LogoutButton from "../utils/LogoutButton";

export default function Sidebar({ open, setOpen }) {
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  // Fetch profile and subscription details
  useEffect(() => {
    let cancelled = false;

    const fetchSidebarData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setSubscriptionActive(false);
        return;
      }

      try {
        const [profileResult, businessResult] = await Promise.allSettled([
          API.get("/profile"),
          API.get("/business/me", {
            headers: { "x-api-key": "ashu@rodio" },
          }),
        ]);

        if (cancelled) return;

        if (profileResult.status === "fulfilled") {
          const response = profileResult.value.data;
          const profile =
            response?.profile || response?.data || null;

          setProfileData(profile);
        }

        if (businessResult.status === "fulfilled") {
          const business = businessResult.value.data?.data;

          const isActive =
            business?.subscriptionStatus?.toLowerCase() === "active" &&
            business?.profileUnlocked === true;

          setSubscriptionActive(isActive);

          const user = JSON.parse(
            localStorage.getItem("user") || "{}"
          );

          localStorage.setItem(
            "user",
            JSON.stringify({
              ...user,
              isSubscriptionActive: isActive,
              subscription: {
                ...(user.subscription || {}),
                status: isActive ? "active" : "inactive",
              },
            })
          );
        } else {
          const user = JSON.parse(
            localStorage.getItem("user") || "{}"
          );

          setSubscriptionActive(
            user?.isSubscriptionActive === true ||
              user?.subscription?.status === "active"
          );
        }
      } catch (error) {
        console.error("Sidebar data error:", error);
      }
    };

    fetchSidebarData();

    const handleSubscriptionUpdate = () => {
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      setSubscriptionActive(
        user?.isSubscriptionActive === true ||
          user?.subscription?.status === "active"
      );
    };

    window.addEventListener(
      "subscriptionUpdated",
      handleSubscriptionUpdate
    );

    return () => {
      cancelled = true;
      window.removeEventListener(
        "subscriptionUpdated",
        handleSubscriptionUpdate
      );
    };
  }, []);

  const handleClose = () => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  const role = localStorage.getItem("role") || "User";

  const displayRole = (
    profileData?.role ||
    role ||
    "User"
  )
    .replace(/[_-]/g, " ")
    .toUpperCase();

  const profileImage =
    profileData?.profileImage ||
    profileData?.profilePhoto ||
    profileData?.avatar ||
    "";

  const firmName =
    profileData?.firmName ||
    profileData?.businessName ||
    profileData?.name ||
    "Business Profile";

  const ownerName =
    profileData?.name ||
    profileData?.ownerName ||
    "Owner details unavailable";

  const linkClass = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-green-700 text-white shadow-md"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const handleRestrictedClick = (
    e,
    featureName,
    targetRoute
  ) => {
    e.preventDefault();

    if (!subscriptionActive) {
      toast.error(
        `Please select a plan to unlock ${featureName}.`,
        { id: "error-toast" }
      );

      navigate("/dashboard/planselection");
      handleClose();
    } else {
      navigate(targetRoute);
      handleClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar-container"
        className={`
          fixed left-0 top-0 z-50
          flex h-screen w-72 flex-col
          border-r border-slate-200 bg-white
          text-slate-800 shadow-2xl
          transition-transform duration-300 ease-in-out
          sm:w-80 lg:w-[300px]
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-end p-4 pb-0 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          >
            <X size={22} />
          </button>
        </div>

        {/* 1. Website Brand: logo + website name */}
        <Link to="/" className="block shrink-0">
          <div className="group border-b border-orange-100 bg-orange-50 px-5 py-5 transition hover:bg-orange-100/70">
            <div className="flex items-center gap-3">
             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl  shadow-md transition-transform group-hover:scale-105">
  <img
    src="/download.svg"
    alt="Rodio Logo"
    className="h-8 w-8 object-contain"
  />
</div>

              <div className="min-w-0">
                <h2 className="text-2xl font-extrabold leading-tight text-slate-900">
                  Rodio{" "}
                  <span className="text-orange-500">Tradelink</span>
                </h2>
                <p className="text-xs font-semibold text-slate-500">
                  India's Smart Transport Platform
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* 2. Profile Card: user's own business details */}
      <div className="shrink-0 px-4 pt-4">
  <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    {/* Profile Image */}
    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 ring-4 ring-orange-100">
      {profileImage ? (
        <img
          src={profileImage}
          alt="Business profile"
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <UserRound size={30} className="text-slate-400" />
      )}
    </div>

    {/* Firm and Owner Details */}
    <div className="min-w-0 flex-1">
      <h3
        title={firmName}
        className="break-words text-base font-extrabold uppercase leading-5 text-slate-900"
      >
        {firmName}
      </h3>

      <p className="mt-1 break-words text-sm text-slate-500">
        Owner:{" "}
        <span className="font-semibold text-slate-700">
          {ownerName}
        </span>
      </p>

      {/* Role Badge */}
      <div className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1">
        <Crown size={14} className="shrink-0 text-orange-500" />
        <span className="break-words text-[11px] font-bold uppercase tracking-wide text-orange-600">
          {displayRole}
        </span>
      </div>
    </div>
  </div>
</div>

        {/* Navigation Menu */}
       <nav
  id="sidebar-nav"
  onWheel={(e) => {
    const el = e.currentTarget;
    const atTop = el.scrollTop <= 0;
    const atBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

    if (
      (e.deltaY < 0 && atTop) ||
      (e.deltaY > 0 && atBottom)
    ) {
      e.preventDefault();
    }
  }}
  className="scrollbar-thin scrollbar-thumb-slate-300 flex-1 min-h-0 space-y-1.5 overflow-y-auto overscroll-y-contain p-4"
>
          <NavLink
            id="nav-profile"
            end
            to="/dashboard"
            className={linkClass}
            onClick={handleClose}
          >
            <div className="flex items-center gap-3.5">
              <LayoutDashboard size={20} />
              <span>PROFILE (Edit/View)</span>
            </div>
          </NavLink>

          {/* Leads */}
          <div
            onClick={(e) =>
              handleRestrictedClick(
                e,
                "Leads",
                "/dashboard/leads"
              )
            }
            className={`cursor-pointer ${linkClass({
              isActive:
                window.location.pathname === "/dashboard/leads",
            })}`}
          >
            <div className="flex items-center gap-3.5">
              <FileText size={20} />
              <span>Leads</span>
            </div>

            {!subscriptionActive && (
              <Lock size={16} className="text-slate-400" />
            )}
          </div>

          <NavLink
            id="nav-add-load-enquiry"
            to="/dashboard/userform"
            className={linkClass}
            onClick={handleClose}
          >
            <div className="flex items-center gap-3.5">
              <PlusCircle size={20} />
              <span>Add Load </span>
            </div>
          </NavLink>

          <NavLink
            id="nav-enquiry-status"
            to="/dashboard/showenquiery"
            className={linkClass}
            onClick={handleClose}
          >
            <div className="flex items-center gap-3.5">
              <ClipboardList size={20} />
              <span>Enquiry Status</span>
            </div>
          </NavLink>

          <NavLink
            id="nav-accepted-bids"
            to="/dashboard/acceptedbid"
            className={linkClass}
            onClick={handleClose}
          >
            <div className="flex items-center gap-3.5">
              <CheckCircle size={20} />
              <span>Accepted Bids</span>
            </div>
          </NavLink>

          <NavLink
            id="nav-search-transport"
            to="/dashboard/transportsearch"
            className={linkClass}
            onClick={handleClose}
          >
            <div className="flex items-center gap-3.5">
              <Search size={20} />
              <span>Search Transport</span>
            </div>
          </NavLink>

          <NavLink
            id="nav-directory"
            to="/dashboard/directory"
            className={linkClass}
            onClick={handleClose}
          >
            <div className="flex items-center gap-3.5">
              <BookOpen size={20} />
              <span>Directory</span>
            </div>
          </NavLink>

          {/* Referral Earning */}
          <div
            onClick={(e) =>
              handleRestrictedClick(
                e,
                "Referral Earning",
                "/dashboard/referral"
              )
            }
            className={`cursor-pointer ${linkClass({
              isActive:
                window.location.pathname === "/dashboard/referral",
            })}`}
          >
            <div className="flex items-center gap-3.5">
              <HandCoins size={20} />
              <span>Referral Earning</span>
            </div>

            {!subscriptionActive && (
              <Lock size={16} className="text-slate-400" />
            )}
          </div>

          {/* My Gallery */}
          <div
            onClick={(e) =>
              handleRestrictedClick(
                e,
                "Vehicle Image Gallery",
                "/dashboard/imagegallerymanager"
              )
            }
            className={`cursor-pointer ${linkClass({
              isActive:
                window.location.pathname ===
                "/dashboard/imagegallerymanager",
            })}`}
          >
            <div className="flex items-center gap-3.5">
              <Images size={20} />
              <span>My Gallery</span>
            </div>

            {!subscriptionActive && (
              <Lock size={16} className="text-slate-400" />
            )}
          </div>
          <div
            onClick={(e) =>
              handleRestrictedClick(
                e,
                "Vehicle Image Gallery",
                "/dashboard/reviews"
              )
            }
            className={`cursor-pointer ${linkClass({
              isActive:
                window.location.pathname ===
                "/dashboard/reviews",
            })}`}
          >
           <div className="flex items-center gap-3.5">
  <Star size={20} />
  <span>My Reviews</span>
</div>

            {!subscriptionActive && (
              <Lock size={16} className="text-slate-400" />
            )}
          </div>
        </nav>

        {/* Footer Actions */}
        <div
          id="sidebar-footer"
          className="shrink-0 space-y-2 border-t border-slate-200 bg-white p-4"
        >
          <NavLink
            id="nav-change-password"
            to="/dashboard/changepassword"
            className={linkClass}
            onClick={handleClose}
          >
            <div className="flex items-center gap-3.5">
              <KeyRound size={20} />
              <span>Change Password</span>
            </div>
          </NavLink>

          <div id="sidebar-logout-container" className="pt-1">
            <LogoutButton />
          </div>
        </div>
      </aside>
    </>
  );
}
