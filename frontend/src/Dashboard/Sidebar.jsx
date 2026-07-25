import { NavLink } from "react-router-dom";
import {
  X,
  LayoutDashboard,
  User,
  BookOpen,
  Search,
  PlusCircle,
  ClipboardList,
  CheckCircle,
  FileText,
  KeyRound,
  ShieldAlert,
  Truck,
  Settings
} from "lucide-react";
import LogoutButton from "../utils/LogoutButton";

export default function Sidebar({ open, setOpen }) {
  const handleClose = () => {
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  const role = localStorage.getItem("role");

  // Dynamic Class for NavLinks with Icons & Accent Styling
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3.5 px-4 py-3 text-sm font-bold rounded-2xl transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 scale-[1.02]"
        : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
    }`;

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0
          w-72 sm:w-80 lg:w-[300px]
          h-screen
          bg-slate-950
          text-white
          z-50
          flex flex-col
          border-r border-slate-800/80
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
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Logo / Header Brand */}
        {/* Logo / Header Brand */}
        <div className="px-6 py-6 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/25 shrink-0">
            <Truck size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-orange-400">
              Rodio Tradelink
            </h2>
            <p className="text-[11px] font-bold text-slate-400 capitalize tracking-wider">
              {role || "User"} Control Panel
            </p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
          
          {/* Main Dashboard Link */}
          <NavLink
            end
            to="/dashboard"
            className={linkClass}
            onClick={handleClose}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          {/* ================= USER ROLE ================= */}
          {role === "user" && (
            <>
              <NavLink
                to="/dashboard/directory"
                className={linkClass}
                onClick={handleClose}
              >
                <BookOpen size={20} />
                <span>Directory</span>
              </NavLink>

              <NavLink
                to="/dashboard/searchbar"
                className={linkClass}
                onClick={handleClose}
              >
                <Search size={20} />
                <span>Search Transport</span>
              </NavLink>

              <NavLink
                to="/dashboard/userform"
                className={linkClass}
                onClick={handleClose}
              >
                <PlusCircle size={20} />
                <span>Add Load Enquiry</span>
              </NavLink>

              <NavLink
                to="/dashboard/showenquiery"
                className={linkClass}
                onClick={handleClose}
              >
                <ClipboardList size={20} />
                <span>Enquiry Status</span>
              </NavLink>

              <NavLink
                to="/dashboard/settings"
                className={linkClass}
                onClick={handleClose}
              >
                <Settings size={20} />
                <span>Update Profile</span>
              </NavLink>
            </>
          )}

          {/* ================= TRANSPORTER ROLE ================= */}
          {role === "transporter" && (
            <>
              <NavLink
                to="/dashboard/userform"
                className={linkClass}
                onClick={handleClose}
              >
                <PlusCircle size={20} />
                <span>Add Load Enquiry</span>
              </NavLink>

              <NavLink
                to="/dashboard/showenquiery"
                className={linkClass}
                onClick={handleClose}
              >
                <ClipboardList size={20} />
                <span>Enquiry Status</span>
              </NavLink>

              <NavLink
                to="/dashboard/acceptedbid"
                className={linkClass}
                onClick={handleClose}
              >
                <CheckCircle size={20} />
                <span>Accepted Bids</span>
              </NavLink>

              <NavLink
                to="/dashboard/directory"
                className={linkClass}
                onClick={handleClose}
              >
                <BookOpen size={20} />
                <span>Directory</span>
              </NavLink>

              <NavLink
                to="/dashboard/searchbar"
                className={linkClass}
                onClick={handleClose}
              >
                <Search size={20} />
                <span>Search Transport</span>
              </NavLink>

              <NavLink
                to="/dashboard/leads"
                className={linkClass}
                onClick={handleClose}
              >
                <FileText size={20} />
                <span>Leads</span>
              </NavLink>

              <NavLink
                to="/dashboard/settings"
                className={linkClass}
                onClick={handleClose}
              >
                <Settings size={20} />
                <span>Update Profile</span>
              </NavLink>
            </>
          )}

          {/* ================= BROKER ROLE ================= */}
          {role === "broker" && (
            <>
              <NavLink
                to="/dashboard/userform"
                className={linkClass}
                onClick={handleClose}
              >
                <PlusCircle size={20} />
                <span>Add Load Enquiry</span>
              </NavLink>

              <NavLink
                to="/dashboard/showenquiery"
                className={linkClass}
                onClick={handleClose}
              >
                <ClipboardList size={20} />
                <span>Enquiry Status</span>
              </NavLink>

              <NavLink
                to="/dashboard/acceptedbid"
                className={linkClass}
                onClick={handleClose}
              >
                <CheckCircle size={20} />
                <span>Accepted Bids</span>
              </NavLink>

              <NavLink
                to="/dashboard/directory"
                className={linkClass}
                onClick={handleClose}
              >
                <BookOpen size={20} />
                <span>Directory</span>
              </NavLink>

              <NavLink
                to="/dashboard/searchbar"
                className={linkClass}
                onClick={handleClose}
              >
                <Search size={20} />
                <span>Search Transport</span>
              </NavLink>

              <NavLink
                to="/dashboard/leads"
                className={linkClass}
                onClick={handleClose}
              >
                <FileText size={20} />
                <span>Leads</span>
              </NavLink>

              <NavLink
                to="/dashboard/settings"
                className={linkClass}
                onClick={handleClose}
              >
                <Settings size={20} />
                <span>Update Profile</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* Footer Actions (Password & Logout) */}
        <div className="border-t border-slate-800/80 p-4 space-y-2 bg-slate-950/50">
          <NavLink
            to="/dashboard/changepassword"
            className={linkClass}
            onClick={handleClose}
          >
            <KeyRound size={20} />
            <span>Change Password</span>
          </NavLink>

          <div className="pt-1">
            <LogoutButton />
          </div>
        </div>

      </aside>
    </>
  );
}