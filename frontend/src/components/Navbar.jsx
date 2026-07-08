import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successful");

    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-950/95 via-orange-950/95 to-black/95 backdrop-blur-md text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-4">
        {/* Logo */}
        <NavLink to="/">
          <h1 className="text-2xl font-bold">Rodio</h1>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/directory">Directory</NavLink>
          <NavLink to="/contact">Contact</NavLink>

           {!token && (
          <>
            <NavLink
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
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
        )}
         
        </div>

        {/* Mobile Button */}
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-800 border-t border-slate-700">
        

          <NavLink
            to="/about"
            className="block px-5 py-3 hover:bg-slate-700"
            onClick={() => setMenuOpen(false)}
          >
            About
          </NavLink>

          <NavLink
            to="/services"
            className="block px-5 py-3 hover:bg-slate-700"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </NavLink>

          <NavLink
            to="/directory"
            className="block px-5 py-3 hover:bg-slate-700"
            onClick={() => setMenuOpen(false)}
          >
            Directory
          </NavLink>

          <NavLink
            to="/contact"
            className="block px-5 py-3 hover:bg-slate-700"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </NavLink>

          <div className="p-5 space-y-3">
            <NavLink
              to="/login"
              className="block bg-orange-500 text-center py-2 rounded-lg"
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className="block bg-green-600 text-center py-2 rounded-lg"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
