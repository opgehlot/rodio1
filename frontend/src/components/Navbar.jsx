
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../languages/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { isLoggedIn, logout } = useAuth();

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const links = [
    { name: t("navbar.home", "HOME"), path: "/" },
    { name: t("navbar.directory", "DIRECTORY"), path: "/directory" },
    { name: t("navbar.aboutUs", "ABOUT US"), path: "/about" },
    { name: t("navbar.services", "SERVICES"), path: "/services" },

    ...(isLoggedIn
      ? [
          {
            name: t("navbar.dashboard", "MY DESHBOARD"),
            path: "/dashboard",
          },
        ]
      : [
          {
            name: t("navbar.login", "LOGIN"),
            path: "/login",
          },
          {
            name: t("navbar.register", "REGISTER"),
            path: "/register",
          },
        ]),
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 70) {
        setIsVisible(false);
      } else if (
        currentScrollY < lastScrollY.current ||
        currentScrollY <= 70
      ) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm shadow-md z-30 border-b border-gray-200/80 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto h-[70px] px-5 flex items-center justify-between">
        {/* Logo - Yahan બદલાવ kiya gya hai */}
       <div className="flex-shrink-0">
  <NavLink to="/" className="flex items-center">
    <span className="text-2xl md:text-2xl font-bold">
      RODIO <span className="text-orange-500">Tradelink</span>
    </span>
  </NavLink>
</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-8 gap-8">
          {links.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "uppercase tracking-wide text-blue-600 font-semibold transition-colors duration-300"
                  : "uppercase tracking-wide text-gray-600 hover:text-blue-600 font-medium transition-colors duration-300"
              }
            >
              {link.name}
            </NavLink>
          ))}

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-medium transition-colors duration-300"
            >
              {t("navbar.logout", "Logout")}
            </button>
          )}
        </div>

        {/* Desktop Language */}
        <div className="hidden md:flex items-center flex-shrink-0">
          <LanguageSwitcher />
        </div>

        {/* Mobile Controls */}
        {/* Mobile Controls */}
<div className="flex items-center gap-2 md:hidden">
  {isLoggedIn && (
    <button
      onClick={() => {
        setMenuOpen(false);
        navigate("/dashboard");
      }}
      className="px-0.5 py-1.5 rounded-lg bg-green-500 text-white text-xs font-semibold shadow-sm hover:bg-blue-700 transition-colors whitespace-nowrap"
    >
      MY Account
    </button>
  )}

  <button
    onClick={() => setMenuOpen(!menuOpen)}
    aria-label={t("navbar.toggleMenu", "Toggle Menu")}
    className="p-1 focus:outline-none"
  >
    {menuOpen ? <X size={28} /> : <Menu size={28} />}
  </button>
</div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
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

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 font-medium"
            >
              {t("navbar.logout", "Logout")}
            </button>
          )}
          {/* Mobile Language Switcher - Always Visible */}
<div className="px-6 pt-3 pb-4 border-t border-gray-200">
  <p className="text-xs font-semibold text-gray-500 mb-2">
    LANGUAGE
  </p>

  <LanguageSwitcher />
</div>
        </div>
      </div>
    </nav>
  );
}
