import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

function UserNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-orange-400 ${
      isActive ? "text-orange-400 font-semibold" : "text-white"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-orange-500"
        >
          Rodio
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {/* <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink> */}

          <NavLink to="/directory" className={navLinkClass}>
            Directory
          </NavLink>

          <NavLink to="/searchbar" className={navLinkClass}>
            Vehicle Search
          </NavLink>

          <NavLink to="/newrequest" className={navLinkClass}>
            Lead Contacts
          </NavLink>

          {!token ? (
            <>
              <NavLink
                to="/login"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4">
          {/* <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            Home
          </NavLink> */}

          <NavLink
            to="/directory"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            Directory
          </NavLink>

          <NavLink
            to="/searchbar"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            Vehicle Search
          </NavLink>

          <NavLink
            to="/newrequest"
            onClick={() => setMenuOpen(false)}
            className={navLinkClass}
          >
            Lead Contacts
          </NavLink>

          {!token ? (
            <>
              <NavLink
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block bg-orange-500 text-center py-2 rounded-lg"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block bg-green-600 text-center py-2 rounded-lg"
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default UserNavbar;