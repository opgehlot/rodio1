import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "../languages/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const links = [
    { name: t("navbar.home", "Home"), path: "/" },
    { name: t("navbar.directory", "Directory"), path: "/directory" },
    { name: t("navbar.aboutUs", "About Us"), path: "/about" },
    { name: t("navbar.services", "Services"), path: "/services" },
    { name: t("navbar.contactUs", "Contact Us"), path: "/queryform" },
    { name: t("navbar.login", "Login"), path: "/login" },
    { name: t("navbar.register", "Register"), path: "/register" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-30">
      <div className="max-w-7xl mx-auto h-20 px-5 flex items-center justify-between">
        <NavLink to="/" className="text-2xl font-bold text-orange-500">
          {t("navbar.brandName", "RODIO Tradelink")}
        </NavLink>

        {/* Desktop View */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link, index) => (
            <NavLink
              key={index}
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
          {/* Desktop Language Switcher */}
          <LanguageSwitcher />
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t("navbar.toggleMenu", "Toggle Menu")}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile View Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t pb-4">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-3 hover:bg-gray-100"
            >
              {link.name}
            </NavLink>
          ))}
          {/* Mobile Language Switcher */}
          <div className="px-5 pt-3 border-t mt-2">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
}