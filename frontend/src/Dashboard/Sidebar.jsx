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
  `block px-4 py-3 text-base rounded-xl transition
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
    w-72 sm:w-80 lg:w-[340px]
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

        <div className="px-5 py-4 border-b border-slate-800">
  <h2 className="text-2xl font-bold">Dashboard</h2>
</div>

        {/* Menu */}

     <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          <NavLink
            end
            to="/dashboard"
            className={linkClass}
            onClick={handleClose}
          >
            DASHBOARD
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={linkClass}
            onClick={handleClose}
          >
            PROFILE
          </NavLink>

          {/* USER */}

          {role === "user" && (
            <>
              <NavLink
                to="/dashboard/directory"
                className={linkClass}
                onClick={handleClose}
              >
                DIRECTORY
              </NavLink>

              <NavLink
                to="/dashboard/searchbar"
                className={linkClass}
                onClick={handleClose}
              >
                SEARCH TRANSPORT
              </NavLink>

              <NavLink
                to="/dashboard/userform"
                className={linkClass}
                onClick={handleClose}
              >
                ADD LOAD ENQUIERY
              </NavLink>

              <NavLink
                to="/dashboard/showenquiery"
                className={linkClass}
                onClick={handleClose}
              >
                SHOW ENQUIERY STATUS
              </NavLink>
              <NavLink
                to="/dashboard/settings"
                className={linkClass}
                onClick={handleClose}
              >
                UPDATE PROFILE
              </NavLink>
            </>
          )}

          {/* Transporter */}

          {role === "transporter" && (
            <>
              <NavLink
                to="/dashboard/userform"
                className={linkClass}
                onClick={handleClose}
              >
                ADD LOAD ENQUIERY
              </NavLink>

              <NavLink
                to="/dashboard/showenquiery"
                className={linkClass}
                onClick={handleClose}
              >
                SHOW ENQUIERY STATUS
              </NavLink>
              <NavLink
                to="/dashboard/acceptedbid"
                className={linkClass}
                onClick={handleClose}
              >
                ACCEPTED BID
              </NavLink>

              {/* 
              <NavLink
                to="/dashboard/transportservices"
                className={linkClass}
                onClick={handleClose}
              >
                TRANSPORT SERVICES
              </NavLink> */}
              {/* <NavLink
                to="/dashboard/addvehicle"
                className={linkClass}
                onClick={handleClose}
              >
                ADD VEHICLE
              </NavLink> */}
              <NavLink
                to="/dashboard/directory"
                className={linkClass}
                onClick={handleClose}
              >
                DIRECTORY
              </NavLink>
              <NavLink
                to="/dashboard/searchbar"
                className={linkClass}
                onClick={handleClose}
              >
                SEARCH TRANSPORT
              </NavLink>

              <NavLink
                to="/dashboard/leads"
                className={linkClass}
                onClick={handleClose}
              >
                LEADS
              </NavLink>
              <NavLink
                to="/dashboard/addservices"
                className={linkClass}
                onClick={handleClose}
              >
                ADD YOUR SERVICES
              </NavLink>
              <NavLink
                to="/dashboard/settings"
                className={linkClass}
                onClick={handleClose}
              >
                UPDATE PROFILE
              </NavLink>

              {/* <NavLink
                to="/dashboard/myvehicles"
                className={linkClass}
                onClick={handleClose}
              >
                My Vehicles
              </NavLink> */}
            </>
          )}

          {/* Broker */}

          {role === "broker" && (
            <>
              <NavLink
                to="/dashboard/userform"
                className={linkClass}
                onClick={handleClose}
              >
                ADD LOAD ENQUIERY
              </NavLink>

              <NavLink
                to="/dashboard/showenquiery"
                className={linkClass}
                onClick={handleClose}
              >
                SHOW ENQUIERY STATUS
              </NavLink>
              {/* 
              <NavLink
                to="/dashboard/transportservices"
                className={linkClass}
                onClick={handleClose}
              >
                TRANSPORT SERVICES
              </NavLink> */}
              {/* <NavLink
                to="/dashboard/addvehicle"
                className={linkClass}
                onClick={handleClose}
              >
                ADD VEHICLE
              </NavLink> */}
              <NavLink
                to="/dashboard/directory"
                className={linkClass}
                onClick={handleClose}
              >
                DIRECTORY
              </NavLink>
              <NavLink
                to="/dashboard/searchbar"
                className={linkClass}
                onClick={handleClose}
              >
                SEARCH TRANSPORT
              </NavLink>

              <NavLink
                to="/dashboard/leads"
                className={linkClass}
                onClick={handleClose}
              >
                LEADS
              </NavLink>

              <NavLink
                to="/dashboard/addservices"
                className={linkClass}
                onClick={handleClose}
              >
                ADD YOUR SERVICES
              </NavLink>

              <NavLink
                to="/dashboard/settings"
                className={linkClass}
                onClick={handleClose}
              >
                UPDATE PROFILE
              </NavLink>
            </>
          )}
        </nav>
          <div className="border-t border-slate-700 p-4 space-y-3">
    <NavLink
      to="/dashboard/changepassword"
      className={linkClass}
      onClick={handleClose}
    >
      CHANGE PASSWORD
    </NavLink>

    <LogoutButton />
  </div>

        {/* Logout */}

       
      </aside>
    </>
  );
}
