// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import toast from "react-hot-toast";
// import API from "../api/api";
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
//    HandCoins,
// } from "lucide-react";
// import LogoutButton from "../utils/LogoutButton";

// export default function Sidebar({ open, setOpen }) {
//   const [subscriptionActive, setSubscriptionActive] = useState(false);
//   const [checkingSubscription, setCheckingSubscription] = useState(true);

//   // ======================================================
//   // CHECK CURRENT BUSINESS / SUBSCRIPTION STATUS
//   // ======================================================

//  useEffect(() => {
//   const fetchBusinessStatus = async () => {
//     try {
//       setCheckingSubscription(true);

//       const token = localStorage.getItem("token");

//       if (!token) {
//         setSubscriptionActive(false);
//         return;
//       }

//       // Read current user from localStorage
//       const user = JSON.parse(localStorage.getItem("user") || "{}");

//       if (
//         user?.isSubscriptionActive === true ||
//         user?.subscription?.status === "active"
//       ) {
//         setSubscriptionActive(true);
//       }

//       // Get latest status from backend
//       const { data } = await API.get("/business/me");

//       const business = data?.data;

//       if (!business) {
//         setSubscriptionActive(false);
//         return;
//       }

//       const isActive =
//         business.subscriptionStatus?.toLowerCase() === "active" &&
//         business.profileUnlocked === true;

//       setSubscriptionActive(isActive);

//       // Keep localStorage updated
//       localStorage.setItem(
//         "user",
//         JSON.stringify({
//           ...user,
//           isSubscriptionActive: isActive,
//           subscription: {
//             ...(user.subscription || {}),
//             status: isActive ? "active" : "inactive",
//           },
//         })
//       );
//     } catch (err) {
//       console.error(err);
//       setSubscriptionActive(false);
//     } finally {
//       setCheckingSubscription(false);
//     }
//   };

//   fetchBusinessStatus();

//  const handleSubscriptionUpdate = () => {
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const isActive =
//     user?.isSubscriptionActive === true ||
//     user?.subscription?.status === "active";

//   setSubscriptionActive(isActive);
// };

//   window.addEventListener(
//     "subscriptionUpdated",
//     handleSubscriptionUpdate
//   );

//   return () => {
//     window.removeEventListener(
//       "subscriptionUpdated",
//       handleSubscriptionUpdate
//     );
//   };
// }, []);

//   const handleClose = () => {
//     if (window.innerWidth < 1024) {
//       setOpen(false);
//     }
//   };

//   const role = localStorage.getItem("role");
//   const transportRoles = [
//     "transporter",
//     "fleet_owner",
//     "cha_agent",
//     "travel_taxi",
//     "courier",
//     "car_carrier",
//   ];

//   // Dynamic Class for NavLinks with White-Themed Styling
//   const linkClass = ({ isActive }) =>
//     `flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
//       isActive
//         ? "bg-blue-600 text-white shadow-md"
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
//         <div className="lg:hidden flex justify-end p-4 pb-0">
//           <button
//             onClick={() => setOpen(false)}
//             className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
//           >
//             <X size={22} />
//           </button>
//         </div>

//         {/* Logo / Header Brand */}
//         <div className="px-6 py-6 border-b border-slate-200 flex items-center gap-3">
//           <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0 font-black">
//             <Truck size={24} />
//           </div>
//           <div>
//             <h2 className="text-xl font-black tracking-wide text-slate-900">
//               Rodio Tradelink
//             </h2>
//             <p className="text-[11px] font-bold text-slate-500 capitalize tracking-wider">
//               {role || "User"} Control Panel
//             </p>
//           </div>
//         </div>

//         {/* Menu Navigation */}
//         <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-300">
//           {/* Main Dashboard Link (Always Free/Unlocked) */}
//           <NavLink
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

//           {/* ================= USER ROLE (Completely free & unchanged) ================= */}
//           {role === "user" && (
//             <>
//               {/* Navigate to Directory page */}
//               <NavLink
//                 to="/dashboard/directory"
//                 className={linkClass}
//                 onClick={handleClose}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <BookOpen size={20} />
//                   <span>Directory</span>
//                 </div>
//               </NavLink>

//               {/* Navigate to Search Transport page */}
//               <NavLink
//                 to="/dashboard/transportsearch"
//                 className={linkClass}
//                 onClick={handleClose}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <Search size={20} />
//                   <span>Search Transport</span>
//                 </div>
//               </NavLink>

//               {/* Navigate to Add Load Enquiry form */}
//               <NavLink
//                 to="/dashboard/userform"
//                 className={linkClass}
//                 onClick={handleClose}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <PlusCircle size={20} />
//                   <span>Add Load Enquiry</span>
//                 </div>
//               </NavLink>

//               {/* Navigate to Enquiry Status view */}
//               <NavLink
//                 to="/dashboard/showenquiery"
//                 className={linkClass}
//                 onClick={handleClose}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <ClipboardList size={20} />
//                   <span>Enquiry Status</span>
//                 </div>
//               </NavLink>

//               {/* Navigate to Update Profile settings */}
//               <NavLink
//                 to="/dashboard/settings"
//                 className={linkClass}
//                 onClick={handleClose}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <Settings size={20} />
//                   <span>Update Profile</span>
//                 </div>
//               </NavLink>
//             </>
//           )}

//           {/* ================= TRANSPORTER ROLE (Selected items locked/unlocked based on payment) ================= */}
//           {transportRoles.includes(role) && (
//             <>
//               {/* Navigate to Add Load Enquiry form */}
//               <NavLink
//                 to="/dashboard/userform"
//                 className={linkClass}
//                 onClick={handleClose}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <PlusCircle size={20} />
//                   <span>Add Load Enquiry</span>
//                 </div>
//               </NavLink>

//               {/* Navigate to Enquiry Status view */}
//               <NavLink
//                 to="/dashboard/showenquiery"
//                 className={linkClass}
//                 onClick={handleClose}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <ClipboardList size={20} />
//                   <span>Enquiry Status</span>
//                 </div>
//               </NavLink>

//               {/* Navigate to Accepted Bids list */}
//               <NavLink
//                 to="/dashboard/acceptedbid"
//                 className={linkClass}
//                 onClick={handleClose}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <CheckCircle size={20} />
//                   <span>Accepted Bids</span>
//                 </div>
//               </NavLink>

//               {/* Navigate to Search Transport page */}
//               <NavLink
//                 to="/dashboard/transportsearch"
//                 className={linkClass}
//                 onClick={handleClose}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <Search size={20} />
//                   <span>Search Transport</span>
//                 </div>
//               </NavLink>

//               {/* Navigate to Directory page */}
//               <NavLink
//                 to="/dashboard/directory"
//                 className={linkClass}
//                 onClick={handleClose}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <BookOpen size={20} />
//                   <span>Directory</span>
//                 </div>
//               </NavLink>

//               {/* Navigate to Leads (Subscription Restricted) */}
//               <NavLink
//                 to={subscriptionActive ? "/dashboard/leads" : "/dashboard"}
//                 className={linkClass}
//                 onClick={(e) => {
//                   if (!subscriptionActive) {
//                     e.preventDefault();
//                     toast.error("Please complete payment to unlock Leads.");
//                   } else {
//                     handleClose();
//                   }
//                 }}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <FileText size={20} />
//                   <span>Leads</span>
//                 </div>
//                 {!subscriptionActive && (
//                   <Lock size={16} className="text-slate-400" />
//                 )}
//               </NavLink>
//               <NavLink
//                 to={subscriptionActive ? "/dashboard/MyVehicles" : "/dashboard"}
//                 className={linkClass}
//                 onClick={(e) => {
//                   if (!subscriptionActive) {
//                     e.preventDefault();
//                     toast.error(
//                       "Please complete payment to unlock My Vehicles.",
//                     );
//                   } else {
//                     handleClose();
//                   }
//                 }}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <Truck size={20} />
//                   <span>My Vehicles</span>
//                 </div>
//                 {!subscriptionActive && (
//                   <Lock size={16} className="text-slate-400" />
//                 )}
//               </NavLink>
//               <NavLink
//                 to={subscriptionActive ? "/dashboard/referral" : "/dashboard"}
//                 className={linkClass}
//                 onClick={(e) => {
//                   if (!subscriptionActive) {
//                     e.preventDefault();
//                     toast.error(
//                       "Please complete payment to unlock Referral Earning.",
//                     );
//                   } else {
//                     handleClose();
//                   }
//                 }}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <HandCoins size={20} />
//                   <span>Referral Earning</span>
//                 </div>
//                 {!subscriptionActive && (
//                   <Lock size={16} className="text-slate-400" />
//                 )}
//               </NavLink>
//               <NavLink
//                 to={
//                   subscriptionActive
//                     ? "/dashboard/imagegallerymanager"
//                     : "/dashboard"
//                 }
//                 className={linkClass}
//                 onClick={(e) => {
//                   if (!subscriptionActive) {
//                     e.preventDefault();
//                     toast.error(
//                       "Please complete payment to unlock Vehicle Image Gallery.",
//                     );
//                   } else {
//                     handleClose();
//                   }
//                 }}
//               >
//                 <div className="flex items-center gap-3.5">
//   <Images size={20} />
//   <span>My gallery</span>
// </div>

//                 {!subscriptionActive && (
//                   <Lock size={16} className="text-slate-400" />
//                 )}
//               </NavLink>

//               {/* Navigate to Add Vehicles (Subscription Restricted) */}
//               <NavLink
//                 to={subscriptionActive ? "/dashboard/addvehicle" : "/dashboard"}
//                 className={linkClass}
//                 onClick={(e) => {
//                   if (!subscriptionActive) {
//                     e.preventDefault();
//                     toast.error(
//                       "Please complete payment to unlock Add Vehicles.",
//                     );
//                   } else {
//                     handleClose();
//                   }
//                 }}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <Truck size={20} />
//                   <span>Add Vehicles</span>
//                 </div>
//                 {!subscriptionActive && (
//                   <Lock size={16} className="text-slate-400" />
//                 )}
//               </NavLink>

//               {/* Navigate to My Document (Subscription Restricted) */}
//               <NavLink
//                 to={subscriptionActive ? "/dashboard/mydocument" : "/dashboard"}
//                 className={linkClass}
//                 onClick={(e) => {
//                   if (!subscriptionActive) {
//                     e.preventDefault();
//                     toast.error(
//                       "Please complete payment to unlock Add Routes.",
//                     );
//                   } else {
//                     handleClose();
//                   }
//                 }}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <Route size={20} />
//                   <span>My Document</span>
//                 </div>
//                 {!subscriptionActive && (
//                   <Lock size={16} className="text-slate-400" />
//                 )}
//               </NavLink>

//               {/* Navigate to Working Areas (Subscription Restricted) */}
//               <NavLink
//                 to={
//                   subscriptionActive ? "/dashboard/workingareas" : "/dashboard"
//                 }
//                 className={linkClass}
//                 onClick={(e) => {
//                   if (!subscriptionActive) {
//                     e.preventDefault();
//                     toast.error(
//                       "Please complete payment to unlock Working Areas.",
//                     );
//                   } else {
//                     handleClose();
//                   }
//                 }}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <MapPin size={20} />
//                   <span>Working Areas</span>
//                 </div>
//                 {!subscriptionActive && (
//                   <Lock size={16} className="text-slate-400" />
//                 )}
//               </NavLink>

//               {/* Navigate to Upload Documents (Subscription Restricted) */}
//               <NavLink
//                 to={
//                   subscriptionActive
//                     ? "/dashboard/uploaddocuments"
//                     : "/dashboard"
//                 }
//                 className={linkClass}
//                 onClick={(e) => {
//                   if (!subscriptionActive) {
//                     e.preventDefault();
//                     toast.error(
//                       "Please complete payment to unlock Upload Documents.",
//                     );
//                   } else {
//                     handleClose();
//                   }
//                 }}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <Upload size={20} />
//                   <span>Upload Documents</span>
//                 </div>
//                 {!subscriptionActive && (
//                   <Lock size={16} className="text-slate-400" />
//                 )}
//               </NavLink>

//               {/* Navigate to Update Profile settings */}
//               <NavLink
//                 to="/dashboard/settings"
//                 className={linkClass}
//                 onClick={handleClose}
//               >
//                 <div className="flex items-center gap-3.5">
//                   <Settings size={20} />
//                   <span>Update Profile</span>
//                 </div>
//               </NavLink>
//             </>
//           )}

//           {/* ================= OTHER ROLES (COMING SOON MESSAGE) ================= */}
//           {role && role !== "user" && !transportRoles.includes(role) && (
//             <div className="p-4 my-2 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
//               <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
//                 <Sparkles size={12} />
//                 Coming Soon
//               </div>
//               <p className="text-xs font-medium text-slate-500">
//                 Your dashboard is under development. We'll launch it very soon.
//               </p>
//             </div>
//           )}
//         </nav>

//         {/* Footer Actions (Password & Logout) */}
//         <div className="border-t border-slate-200 p-4 space-y-2 bg-white">
//           <NavLink
//             to="/dashboard/changepassword"
//             className={linkClass}
//             onClick={handleClose}
//           >
//             <div className="flex items-center gap-3.5">
//               <KeyRound size={20} />
//               <span>Change Password</span>
//             </div>
//           </NavLink>

//           <div className="pt-1">
//             <LogoutButton />
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
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
          })
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

    window.addEventListener(
      "subscriptionUpdated",
      handleSubscriptionUpdate
    );

    return () => {
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

  const role = localStorage.getItem("role");

  // Dynamic Class for NavLinks with White-Themed Styling
  const linkClass = ({ isActive }) =>
    `flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

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
        <div className="lg:hidden flex justify-end p-4 pb-0">
          <button
            onClick={() => setOpen(false)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Logo / Header Brand */}
        <div className="px-6 py-6 border-b border-slate-200 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0 font-black">
            <Truck size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-wide text-slate-900">
              Rodio Tradelink
            </h2>
            <p className="text-[11px] font-bold text-slate-500 capitalize tracking-wider">
              {role || "User"} Control Panel
            </p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-300">
          {/* Main Dashboard Link (Always Free/Unlocked) */}
          <NavLink
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

          {/* ================= UNIFIED DASHBOARD FOR ALL ROLES (Transporter layout for everyone) ================= */}
          <>
            {/* Navigate to Add Load Enquiry form */}
            <NavLink
              to="/dashboard/userform"
              className={linkClass}
              onClick={handleClose}
            >
              <div className="flex items-center gap-3.5">
                <PlusCircle size={20} />
                <span>Add Load Enquiry</span>
              </div>
            </NavLink>

            {/* Navigate to Enquiry Status view */}
            <NavLink
              to="/dashboard/showenquiery"
              className={linkClass}
              onClick={handleClose}
            >
              <div className="flex items-center gap-3.5">
                <ClipboardList size={20} />
                <span>Enquiry Status</span>
              </div>
            </NavLink>

            {/* Navigate to Accepted Bids list */}
            <NavLink
              to="/dashboard/acceptedbid"
              className={linkClass}
              onClick={handleClose}
            >
              <div className="flex items-center gap-3.5">
                <CheckCircle size={20} />
                <span>Accepted Bids</span>
              </div>
            </NavLink>

            {/* Navigate to Search Transport page */}
            <NavLink
              to="/dashboard/transportsearch"
              className={linkClass}
              onClick={handleClose}
            >
              <div className="flex items-center gap-3.5">
                <Search size={20} />
                <span>Search Transport</span>
              </div>
            </NavLink>

            {/* Navigate to Directory page */}
            <NavLink
              to="/dashboard/directory"
              className={linkClass}
              onClick={handleClose}
            >
              <div className="flex items-center gap-3.5">
                <BookOpen size={20} />
                <span>Directory</span>
              </div>
            </NavLink>

            {/* Navigate to Leads (Subscription Restricted) */}
            <NavLink
              to={subscriptionActive ? "/dashboard/leads" : "/dashboard"}
              className={linkClass}
              onClick={(e) => {
                if (!subscriptionActive) {
                  e.preventDefault();
                  toast.error("Please complete payment to unlock Leads.");
                } else {
                  handleClose();
                }
              }}
            >
              <div className="flex items-center gap-3.5">
                <FileText size={20} />
                <span>Leads</span>
              </div>
              {!subscriptionActive && (
                <Lock size={16} className="text-slate-400" />
              )}
            </NavLink>

            {/* Navigate to My Vehicles (Subscription Restricted) */}
            <NavLink
              to={subscriptionActive ? "/dashboard/MyVehicles" : "/dashboard"}
              className={linkClass}
              onClick={(e) => {
                if (!subscriptionActive) {
                  e.preventDefault();
                  toast.error(
                    "Please complete payment to unlock My Vehicles."
                  );
                } else {
                  handleClose();
                }
              }}
            >
              <div className="flex items-center gap-3.5">
                <Truck size={20} />
                <span>My Vehicles</span>
              </div>
              {!subscriptionActive && (
                <Lock size={16} className="text-slate-400" />
              )}
            </NavLink>

            {/* Navigate to Referral Earning (Subscription Restricted) */}
            <NavLink
              to={subscriptionActive ? "/dashboard/referral" : "/dashboard"}
              className={linkClass}
              onClick={(e) => {
                if (!subscriptionActive) {
                  e.preventDefault();
                  toast.error(
                    "Please complete payment to unlock Referral Earning."
                  );
                } else {
                  handleClose();
                }
              }}
            >
              <div className="flex items-center gap-3.5">
                <HandCoins size={20} />
                <span>Referral Earning</span>
              </div>
              {!subscriptionActive && (
                <Lock size={16} className="text-slate-400" />
              )}
            </NavLink>

            {/* Navigate to My Gallery (Subscription Restricted) */}
            <NavLink
              to={
                subscriptionActive
                  ? "/dashboard/imagegallerymanager"
                  : "/dashboard"
              }
              className={linkClass}
              onClick={(e) => {
                if (!subscriptionActive) {
                  e.preventDefault();
                  toast.error(
                    "Please complete payment to unlock Vehicle Image Gallery."
                  );
                } else {
                  handleClose();
                }
              }}
            >
              <div className="flex items-center gap-3.5">
                <Images size={20} />
                <span>My gallery</span>
              </div>
              {!subscriptionActive && (
                <Lock size={16} className="text-slate-400" />
              )}
            </NavLink>

            {/* Navigate to Add Vehicles (Subscription Restricted) */}
            <NavLink
              to={subscriptionActive ? "/dashboard/addvehicle" : "/dashboard"}
              className={linkClass}
              onClick={(e) => {
                if (!subscriptionActive) {
                  e.preventDefault();
                  toast.error(
                    "Please complete payment to unlock Add Vehicles."
                  );
                } else {
                  handleClose();
                }
              }}
            >
              <div className="flex items-center gap-3.5">
                <Truck size={20} />
                <span>Add Vehicles</span>
              </div>
              {!subscriptionActive && (
                <Lock size={16} className="text-slate-400" />
              )}
            </NavLink>

            {/* Navigate to My Document (Subscription Restricted) */}
            <NavLink
              to={subscriptionActive ? "/dashboard/mydocument" : "/dashboard"}
              className={linkClass}
              onClick={(e) => {
                if (!subscriptionActive) {
                  e.preventDefault();
                  toast.error(
                    "Please complete payment to unlock Add Routes."
                  );
                } else {
                  handleClose();
                }
              }}
            >
              <div className="flex items-center gap-3.5">
                <Route size={20} />
                <span>My Document</span>
              </div>
              {!subscriptionActive && (
                <Lock size={16} className="text-slate-400" />
              )}
            </NavLink>

            {/* Navigate to Working Areas (Subscription Restricted) */}
            <NavLink
              to={
                subscriptionActive ? "/dashboard/workingareas" : "/dashboard"
              }
              className={linkClass}
              onClick={(e) => {
                if (!subscriptionActive) {
                  e.preventDefault();
                  toast.error(
                    "Please complete payment to unlock Working Areas."
                  );
                } else {
                  handleClose();
                }
              }}
            >
              <div className="flex items-center gap-3.5">
                <MapPin size={20} />
                <span>Working Areas</span>
              </div>
              {!subscriptionActive && (
                <Lock size={16} className="text-slate-400" />
              )}
            </NavLink>

            {/* Navigate to Upload Documents (Subscription Restricted) */}
            <NavLink
              to={
                subscriptionActive
                  ? "/dashboard/uploaddocuments"
                  : "/dashboard"
              }
              className={linkClass}
              onClick={(e) => {
                if (!subscriptionActive) {
                  e.preventDefault();
                  toast.error(
                    "Please complete payment to unlock Upload Documents."
                  );
                } else {
                  handleClose();
                }
              }}
            >
              <div className="flex items-center gap-3.5">
                <Upload size={20} />
                <span>Upload Documents</span>
              </div>
              {!subscriptionActive && (
                <Lock size={16} className="text-slate-400" />
              )}
            </NavLink>

            {/* Navigate to Update Profile settings */}
            <NavLink
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
        <div className="border-t border-slate-200 p-4 space-y-2 bg-white">
          <NavLink
            to="/dashboard/changepassword"
            className={linkClass}
            onClick={handleClose}
          >
            <div className="flex items-center gap-3.5">
              <KeyRound size={20} />
              <span>Change Password</span>
            </div>
          </NavLink>

          <div className="pt-1">
            <LogoutButton />
          </div>
        </div>
      </aside>
    </>
  );
}
