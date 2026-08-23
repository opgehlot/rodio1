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
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/api";
import { Link } from "react-router-dom";
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
  Settings,
  Lock,
  Route,
  MapPin,
  Upload,
  Sparkles,
  Images,
  HandCoins,
} from "lucide-react";
import LogoutButton from "../utils/LogoutButton";

export default function Sidebar({ open, setOpen }) {
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const navigate = useNavigate();

  // ======================================================
  // CHECK CURRENT BUSINESS / SUBSCRIPTION STATUS
  // ======================================================

  useEffect(() => {
    const fetchBusinessStatus = async () => {
      try {
        setCheckingSubscription(true);

        const token = localStorage.getItem("token");

        if (!token) {
          setSubscriptionActive(false);
          return;
        }

        // Read current user from localStorage
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (
          user?.isSubscriptionActive === true ||
          user?.subscription?.status === "active"
        ) {
          setSubscriptionActive(true);
        }

        // Get latest status from backend
        const { data } = await API.get("/business/me");

        const business = data?.data;

        if (!business) {
          setSubscriptionActive(false);
          return;
        }

        const isActive =
          business.subscriptionStatus?.toLowerCase() === "active" &&
          business.profileUnlocked === true;

        setSubscriptionActive(isActive);

        // Keep localStorage updated
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            isSubscriptionActive: isActive,
            subscription: {
              ...(user.subscription || {}),
              status: isActive ? "active" : "inactive",
            },
          }),
        );
      } catch (err) {
        console.error(err);
        setSubscriptionActive(false);
      } finally {
        setCheckingSubscription(false);
      }
    };

    fetchBusinessStatus();

    const handleSubscriptionUpdate = () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const isActive =
        user?.isSubscriptionActive === true ||
        user?.subscription?.status === "active";

      setSubscriptionActive(isActive);
    };

    window.addEventListener("subscriptionUpdated", handleSubscriptionUpdate);

    return () => {
      window.removeEventListener(
        "subscriptionUpdated",
        handleSubscriptionUpdate,
      );
    };
  }, []);

  const handleClose = () => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  const role = localStorage.getItem("role");

  // Dynamic Class for NavLinks with White-Themed Styling
  const linkClass = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-green-700 text-white shadow-md"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  // Reusable helper handler for restricted links
  const handleRestrictedClick = (e, featureName, targetRoute) => {
    e.preventDefault();
    if (!subscriptionActive) {
      toast.error(`Please select a plan to unlock ${featureName}.`, {
        id: "error-toast",
      });
      // Redirect to your plan selection route (Change '/dashboard/subscription' if your route is different)
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        id="sidebar-container"
        className={`
          fixed top-0 left-0
          w-72 sm:w-80 lg:w-[300px]
          h-screen
          bg-white
          text-slate-800
          z-50
          flex flex-col
          border-r border-slate-200
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div
          id="sidebar-mobile-close"
          className="lg:hidden flex justify-end p-4 pb-0"
        >
          <button
            id="sidebar-close-btn"
            onClick={() => setOpen(false)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Logo / Header Brand */}
        <Link to="/" className="block">
          <div
            id="sidebar-header"
            className="px-6 py-6 border-b border-slate-200 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-all duration-300 group"
          >
            <div
              id="sidebar-brand-icon"
              className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0 font-black transition-transform duration-300 group-hover:scale-110"
            >
              <Truck size={24} />
            </div>

            <div id="sidebar-brand-info">
              <h2
  id="sidebar-brand-title"
  className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300"
>
  Rodio <span className="text-orange-500">Tradelink</span>
</h2>

              <p
                id="sidebar-brand-role"
                className="text-[11px] font-bold text-slate-500 capitalize tracking-wider group-hover:text-slate-700 transition-colors duration-300"
              >
                {role || "User"} Control Panel
              </p>
            </div>
          </div>
        </Link>

        {/* Menu Navigation */}
        <nav
          id="sidebar-nav"
          className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-300"
        >
          {/* Main Dashboard Link (Always Free/Unlocked) */}
          <NavLink
            id="nav-profile"
            end
            to="/dashboard"
            className={linkClass}
            onClick={handleClose}
          >
            <div className="flex items-center gap-3.5">
              <LayoutDashboard size={20} />
              <span>PROFILE</span>
            </div>
          </NavLink>

          {/* ================= UNIFIED DASHBOARD FOR ALL ROLES ================= */}
          <>
            <NavLink
              id="nav-add-load-enquiry"
              to="/dashboard/userform"
              className={linkClass}
              onClick={handleClose}
            >
              <div className="flex items-center gap-3.5">
                <PlusCircle size={20} />
                <span>Add Load Enquiry</span>
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

            {/* Leads */}
            <div
              onClick={(e) => handleRestrictedClick(e, "Leads", "/dashboard/leads")}
              className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/leads" })}`}
            >
              <div className="flex items-center gap-3.5">
                <FileText size={20} />
                <span>Leads</span>
              </div>
              {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
            </div>

            {/* My Vehicles */}
            <div
              onClick={(e) => handleRestrictedClick(e, "My Vehicles", "/dashboard/MyVehicles")}
              className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/MyVehicles" })}`}
            >
              <div className="flex items-center gap-3.5">
                <Truck size={20} />
                <span>My Vehicles</span>
              </div>
              {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
            </div>

            {/* Referral Earning */}
            <div
              onClick={(e) => handleRestrictedClick(e, "Referral Earning", "/dashboard/referral")}
              className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/referral" })}`}
            >
              <div className="flex items-center gap-3.5">
                <HandCoins size={20} />
                <span>Referral Earning</span>
              </div>
              {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
            </div>

            {/* My Gallery */}
            <div
              onClick={(e) => handleRestrictedClick(e, "Vehicle Image Gallery", "/dashboard/imagegallerymanager")}
              className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/imagegallerymanager" })}`}
            >
              <div className="flex items-center gap-3.5">
                <Images size={20} />
                <span>My gallery</span>
              </div>
              {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
            </div>

            {/* Add Vehicles */}
            <div
              onClick={(e) => handleRestrictedClick(e, "Add Vehicles", "/dashboard/addvehicle")}
              className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/addvehicle" })}`}
            >
              <div className="flex items-center gap-3.5">
                <Truck size={20} />
                <span>Add Vehicles</span>
              </div>
              {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
            </div>

            {/* My Document */}
            <div
              onClick={(e) => handleRestrictedClick(e, "Add Routes", "/dashboard/mydocument")}
              className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/mydocument" })}`}
            >
              <div className="flex items-center gap-3.5">
                <Route size={20} />
                <span>My Document</span>
              </div>
              {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
            </div>

            {/* Working Areas */}
            <div
              onClick={(e) => handleRestrictedClick(e, "Working Areas", "/dashboard/workingareas")}
              className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/workingareas" })}`}
            >
              <div className="flex items-center gap-3.5">
                <MapPin size={20} />
                <span>Working Areas</span>
              </div>
              {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
            </div>

            {/* Upload Documents */}
            <div
              onClick={(e) => handleRestrictedClick(e, "Upload Documents", "/dashboard/uploaddocuments")}
              className={`cursor-pointer ${linkClass({ isActive: window.location.pathname === "/dashboard/uploaddocuments" })}`}
            >
              <div className="flex items-center gap-3.5">
                <Upload size={20} />
                <span>Upload Documents</span>
              </div>
              {!subscriptionActive && <Lock size={16} className="text-slate-400" />}
            </div>

            <NavLink
              id="nav-update-profile"
              to="/dashboard/settings"
              className={linkClass}
              onClick={handleClose}
            >
              <div className="flex items-center gap-3.5">
                <Settings size={20} />
                <span>Update Profile</span>
              </div>
            </NavLink>
          </>
        </nav>

        {/* Footer Actions (Password & Logout) */}
        <div
          id="sidebar-footer"
          className="border-t border-slate-200 p-4 space-y-2 bg-white"
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
