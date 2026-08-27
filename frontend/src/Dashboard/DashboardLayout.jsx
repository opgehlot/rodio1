// import { useState } from "react";
// import { Outlet, Link } from "react-router-dom";
// import { Menu, Home, Languages, X } from "lucide-react";
// import Sidebar from "./Sidebar";
// import LanguageSwitcher from "../languages/locales/LanguageTranslator";

// export function DashboardLayout() {
//   const [open, setOpen] = useState(false);
//   const [languageOpen, setLanguageOpen] = useState(false);

//   return (
//     <div className="bg-gray-100 min-h-screen">

//       <header className="lg:hidden sticky top-0 z-40 bg-white shadow flex items-center justify-between px-5 py-4">

//         {/* Menu */}
//         <button
//           type="button"
//           onClick={() => setOpen(true)}
//           aria-label="Open Menu"
//           className="text-slate-700"
//         >
//           <Menu size={28} />
//         </button>

//         {/* Home */}
//         <Link
//           to="/"
//           aria-label="Home"
//           className="text-slate-700 hover:text-orange-500"
//         >
//           <Home size={25} />
//         </Link>

//         {/* Language */}
//         <button
//           type="button"
//           onClick={() => setLanguageOpen((prev) => !prev)}
//           aria-label="Change Language"
//           className="text-slate-700 hover:text-orange-500"
//         >
//           {languageOpen ? (
//             <X size={24} />
//           ) : (
//             <Languages size={24} />
//           )}
//         </button>

//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-2xl font-bold"
//         >
//           Rodio{" "}
//           <span className="text-orange-500">
//             Tradelink
//           </span>
//         </Link>

//       </header>

//       {/* Language Popup */}
//       {languageOpen && (
//         <div className="lg:hidden fixed top-[72px] right-3 z-[9999] bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-[260px]">

//           <p className="text-xs font-semibold text-gray-500 mb-3">
//             LANGUAGE
//           </p>

//           <LanguageSwitcher />

//         </div>
//       )}

//       <Sidebar
//         open={open}
//         setOpen={setOpen}
//       />

//       <main className="lg:ml-[300px] bg-slate-100 p-4 md:p-6 overflow-x-hidden">
//         <Outlet />
//       </main>

//     </div>
//   );
// }

// export default DashboardLayout;
import { useState } from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import { Menu, Home, Languages, X } from "lucide-react";
import Sidebar from "./Sidebar";
import LanguageSwitcher from "../languages/locales/LanguageTranslator";
import { useAuth } from "../context/AuthContext";

export function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const { isLoggedIn } = useAuth();

  // Agar user logged in nahi hai,
  // to Dashboard ko render mat karo.
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">

      <header className="lg:hidden sticky top-0 z-40 bg-white shadow flex items-center justify-between px-5 py-4">

        {/* Menu */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open Menu"
          className="text-slate-700"
        >
          <Menu size={28} />
        </button>

        {/* Home */}
        <Link
          to="/"
          aria-label="Home"
          className="text-slate-700 hover:text-orange-500"
        >
          <Home size={25} />
        </Link>

        {/* Language */}
        <button
          type="button"
          onClick={() => setLanguageOpen((prev) => !prev)}
          aria-label="Change Language"
          className="text-slate-700 hover:text-orange-500"
        >
          {languageOpen ? (
            <X size={24} />
          ) : (
            <Languages size={24} />
          )}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          Rodio{" "}
          <span className="text-orange-500">
            Tradelink
          </span>
        </Link>

      </header>

      {/* Language Popup */}
      {languageOpen && (
        <div className="lg:hidden fixed top-[72px] right-3 z-[9999] bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-[260px]">

          <p className="text-xs font-semibold text-gray-500 mb-3">
            LANGUAGE
          </p>

          <LanguageSwitcher />

        </div>
      )}

      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      <main className="lg:ml-[300px] bg-slate-100 p-4 md:p-6 overflow-x-hidden">
        <Outlet />
      </main>

    </div>
  );
}

export default DashboardLayout;