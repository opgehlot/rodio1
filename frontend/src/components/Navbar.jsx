import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [

    { name: "Home", path: "/" },
    { name: "Directory", path: "/dummydirctory" },

    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact Us", path: "/queryform" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-30">
      <div className="max-w-7xl mx-auto h-20 px-5 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold text-orange-500">
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
                  : "text-black hover:text-orange-500"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-3 hover:bg-gray-100"
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}