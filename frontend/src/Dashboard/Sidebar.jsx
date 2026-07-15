import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import LogoutButton from "../utils/LogoutButton";

export default function Sidebar({ open, setOpen }) {
  const handleClose = () => {
  if (window.innerWidth < 1024) {
    setOpen(false);
  }
};

  const role = localStorage.getItem("role");

  const linkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl transition
    ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-slate-800"
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
        className={`
        fixed top-0 left-0
        w-80
        h-screen
        bg-slate-900
        text-white
        z-50
        flex flex-col
        transition-transform duration-300

        ${open ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
        `}
      >

        {/* Mobile Close */}

        <div className="lg:hidden flex justify-end p-4">

          <button onClick={() => setOpen(false)}>
            <X />
          </button>

        </div>

        {/* Logo */}

        <div className="px-6 py-6 border-b border-slate-800">

          <h2 className="text-3xl font-bold">

            Dashboard

          </h2>

        </div>

        {/* Menu */}

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">

          <NavLink end to="/dashboard" className={linkClass} onClick={handleClose}>
            Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={linkClass}
            onClick={handleClose}
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={linkClass}
            onClick={handleClose}
          >
            Settings
          </NavLink>

          {/* USER */}

          {role === "user" && (
            <>
              <NavLink
                to="/dashboard/searchbar"
                className={linkClass}
                onClick={handleClose}
              >
                Search Transport
              </NavLink>

              <NavLink
                to="/dashboard/showenquiery"
                className={linkClass}
                onClick={handleClose}
              >
                Show Enquiry
              </NavLink>

              <NavLink
                to="/dashboard/enquiery"
                className={linkClass}
                onClick={handleClose}
              >
                Bookings
              </NavLink>

              <NavLink
                to="/dashboard/directory"
                className={linkClass}
                onClick={handleClose}
              >
                Directory
              </NavLink>

              <NavLink
                to="/dashboard/userform"
                className={linkClass}
                onClick={handleClose}
              >
                User Form
              </NavLink>
            </>
          )}

          {/* Transporter */}

          {role === "transporter" && (
            <>
              <NavLink
                to="/dashboard/mybusiness"
                className={linkClass}
                onClick={handleClose}
              >
                My Business
              </NavLink>

              <NavLink
                to="/dashboard/transportservices"
                className={linkClass}
                onClick={handleClose}
              >
                Transport Services
              </NavLink>

              <NavLink
                to="/dashboard/leads"
                className={linkClass}
                onClick={handleClose}
              >
                Leads
              </NavLink>

              <NavLink
                to="/dashboard/myvehicles"
                className={linkClass}
                onClick={handleClose}
              >
                My Vehicles
              </NavLink>
            </>
          )}

          {/* Broker */}

          {role === "broker" && (
            <>
              <NavLink
                to="/dashboard/my-leads"
                className={linkClass}
                onClick={handleClose}
              >
                My Leads
              </NavLink>

              <NavLink
                to="/dashboard/clients"
                className={linkClass}
                onClick={handleClose}
              >
                Clients
              </NavLink>
            </>
          )}

        </nav>

        {/* Logout */}

        <div className="p-4 border-t border-slate-700">

          <LogoutButton />

        </div>

      </aside>
    </>
  );
}