import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // user | transporter | broker
   console.log("Token:", token);
console.log("Role:", role);


  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const guestLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const userLinks = [
    { name: "Directory", path: "/directory" },
    { name: "Vehicle Search", path: "/searchbar" },
    { name: "Lead Contacts", path: "/userform" },
  ];

  const transporterLinks = [
    { name: "Dashboard", path: "/transporter/dashboard" },
    { name: "My Vehicles", path: "/transporter/vehicles" },
    { name: "Bookings", path: "/transporter/bookings" },
  ];

  const brokerLinks = [
    { name: "Dashboard", path: "/broker/dashboard" },
    { name: "Available Loads", path: "/broker/loads" },
    { name: "Clients", path: "/broker/clients" },
  ];

  const getLinks = () => {
    if (!token) return guestLinks;

    switch (role) {
      case "user":
        return userLinks;

      case "transporter":
        return transporterLinks;

      case "broker":
        return brokerLinks;

      default:
        return guestLinks;
    }
  };

  const links = getLinks();

  return (
    <nav className="fixed top-0 left-0 w-full bg-slate-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">

        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-orange-500"
        >
          Rodio
        </NavLink>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">

          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 font-semibold"
                  : "hover:text-orange-400"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {!token ? (
            <>
              <NavLink
                to="/login"
                className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-800 border-t border-slate-700">

          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-3 hover:bg-slate-700"
            >
              {link.name}
            </NavLink>
          ))}

          <div className="p-5">

            {!token ? (
              <div className="space-y-3">
                <NavLink
                  to="/login"
                  className="block bg-orange-500 text-center py-2 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="block bg-green-600 text-center py-2 rounded-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </NavLink>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 py-2 rounded-lg"
              >
                Logout
              </button>
            )}

          </div>
        </div>
      )}
    </nav>
  );
}