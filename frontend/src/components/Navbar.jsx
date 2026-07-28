import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "../languages/LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const links = [
    { name: t("navbar.home", "Home"), path: "/" },
    { name: t("navbar.directory", "Directory"), path: "/directory" },
    { name: t("navbar.aboutUs", "About Us"), path: "/about" },
    { name: t("navbar.services", "Services"), path: "/services" },
    // { name: t("navbar.contactUs", "Contact Us"), path: "/queryform" },
    { name: t("navbar.login", "Login"), path: "/login" },
    { name: t("navbar.register", "Register"), path: "/register" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If scrolling down and past the initial Navbar height (70px)
      if (currentScrollY > lastScrollY.current && currentScrollY > 70) {
        setIsVisible(false);
      }
      // If scrolling up, or at the very top of the page
      else if (currentScrollY < lastScrollY.current || currentScrollY <= 70) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY; // Update the ref
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <nav className={`fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm shadow-md z-30 border-b border-gray-200/80 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="max-w-7xl mx-auto h-[70px] px-5 flex items-center justify-between">
        
        {/* Left Side: Logo / Brand Name */}
        <div className="flex-shrink-0">
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            {t("navbar.brandName", "RODIO Tradelink")}
          </NavLink>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-8 gap-8">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold transition-colors duration-300"
                  : "text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right Side: Desktop Language Switcher */}
        <div className="hidden md:flex items-center flex-shrink-0">
          <LanguageSwitcher />
        </div>

        {/* Mobile View Toggle & Language Controls */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t("navbar.toggleMenu", "Toggle Menu")} // Accessibility
            className="p-1 focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile View Drawer */}
      <div
        className={`
          md:hidden bg-white border-t border-gray-200
          transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}
        `}
      >
        <div className="pt-2 pb-4">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "block px-6 py-3.5 bg-blue-50 text-blue-600 font-semibold"
                  : "block px-6 py-3 text-black hover:bg-gray-100"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}