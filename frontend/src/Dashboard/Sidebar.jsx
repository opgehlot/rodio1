import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Settings,
  Building2,
  Truck,
  Car,
  FileText,
  Search,
  BookOpen,
  Users,
  X,
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  const role = localStorage.getItem("role");

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-80 bg-slate-900 shadow-xl z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Mobile Close */}
        <div className="lg:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X className="text-white" />
          </button>
        </div>

        {/* Logo */}
        <div className="px-6 pb-6 border-b border-slate-800">
          <h2 className="text-3xl font-bold text-white">
            Dashboard
          </h2>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">

          <NavLink
            to="/dashboard"
            end
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <User size={20} />
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <Settings size={20} />
            Settings
          </NavLink>

          {/* USER */}

          {role === "user" && (
            <>
              <NavLink
                to="/dashboard/searchbar"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <Search size={20} />
                Search Transport
              </NavLink>

              <NavLink
                to="/dashboard/bookings"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <BookOpen size={20} />
                Bookings
              </NavLink>

              <NavLink
                to="/dashboard/directory"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <Building2 size={20} />
                Directory
              </NavLink>
              <NavLink
                to="/dashboard/userform"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <Building2 size={20} />
                UserForm
              </NavLink>
            </>
          )}

          {/* TRANSPORTER */}

          {role === "transporter" && (
            <>
              <NavLink
                to="/dashboard/mybusiness"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <Building2 size={20} />
                My Business
              </NavLink>

              <NavLink
                to="/dashboard/transportservices"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <Truck size={20} />
                Transport Services
              </NavLink>

              <NavLink
                to="/dashboard/leads"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <FileText size={20} />
                Leads
              </NavLink>

              <NavLink
                to="/dashboard/myvehicles"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <Car size={20} />
                My Vehicles
              </NavLink>
            </>
          )}

          {/* BROKER */}

          {role === "broker" && (
            <>
              <NavLink
                to="/dashboard/my-leads"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <FileText size={20} />
                My Leads
              </NavLink>

              <NavLink
                to="/dashboard/clients"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <Users size={20} />
                Clients
              </NavLink>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}