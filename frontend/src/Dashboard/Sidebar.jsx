import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div className="w-72 min-h-screen bg-slate-900 text-white">

      <h2 className="text-2xl font-bold p-6">
        Dashboard
      </h2>

      <ul className="space-y-2 px-4">

        {/* Common Menu */}

        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/profile">Profile</NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/settings">Settings</NavLink>
        </li>

        {/* User */}

        {role === "user" && (
          <>
            <li>
              <NavLink to="/dashboard/search-transport">
                Search Transport
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/bookings">
                Bookings
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/saved">
                Saved Transporters
              </NavLink>
            </li>
          </>
        )}

        {/* Transporter */}

        {role === "transporter" && (
          <>
            <li>
              <NavLink to="/dashboard/mybusiness">
                My Business
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/transportservices">
                Transport Services
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/leads">
                Leads
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/myvehicles">
                My Vehicles
              </NavLink>
            </li>
          </>
        )}

        {/* Broker */}

        {role === "broker" && (
          <>
            <li>
              <NavLink to="/dashboard/my-leads">
                My Leads
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/clients">
                Clients
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/transport-services">
                Transport Services
              </NavLink>
            </li>
          </>
        )}

      </ul>

    </div>
  );
}