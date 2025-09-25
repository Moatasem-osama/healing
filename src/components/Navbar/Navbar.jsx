import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import Logout from "../Logout/Logout";
import subLogo from "../../assets/sub-logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let { userTokenAccess } = useContext(userContext);

  const navItems = [
    { path: "/", label: "الرئيسية", icon: "fa-house", end: true },
    { path: "/dashboard", label: "لوحة التحكم", icon: "fa-gauge" },
    { path: "/appointments", label: "المواعيد", icon: "fa-calendar-days" },
    { path: "/library", label: "المكتبة", icon: "fa-book" },
  ];

  const dropdownItems = [
    { path: "/stories", label: "القصص التراثية", icon: "fa-feather" },
    { path: "/community/recipes", label: "المجتمع", icon: "fa-users" },
    { path: "/medicalTests", label: "التحاليل", icon: "fa-file-medical" },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-lg font-[var(--font-noto-arabic)] ${
      isActive
        ? "bg-emerald-600 text-white shadow-lg"
        : "text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
    }`;

  const AuthLinks = () => (
    <div className="flex gap-4 font-sans">
      <NavLink
        to="/register"
        className="bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition-all duration-300 font-semibold"
      >
        تسجيل
      </NavLink>
      <NavLink
        to="/login"
        className="bg-emerald-100 text-emerald-700 px-6 py-2 rounded-xl hover:bg-emerald-200 transition-all duration-300 font-semibold"
      >
        تسجيل دخول
      </NavLink>
    </div>
  );

  return (
    <nav className="bg-[#f1f2ec] backdrop-blur-lg fixed top-0 inset-x-0 z-50 shadow-sm border-b border-emerald-100 font-[var(--font-noto-arabic)]">
      <div className="mx-auto px-6 py-1 flex justify-between items-center">
        <NavLink
          to="/"
          className="text-2xl font-bold text-emerald-700 flex items-center gap-3"
        >
          <img src={subLogo} alt="subLogo" className="w-36" />
        </NavLink>

        {userTokenAccess && (
          <div className="hidden md:flex items-center gap-2 font-medium">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={linkClass}
              >
                <i className={`fa-solid ${item.icon}`}></i> {item.label}
              </NavLink>
            ))}

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-xl text-emerald-700 font-semibold hover:bg-emerald-200 transition"
              >
                المزيد <i className="fa-solid fa-caret-down"></i>
              </button>
              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-56 bg-white border border-emerald-100 rounded-xl shadow-lg z-50">
                  {dropdownItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        className={linkClass}
                        onClick={() => setDropdownOpen(false)}
                      >
                        <i className={`fa-solid ${item.icon}`}></i> {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <div className="hidden md:block">
          {userTokenAccess ? (
              <Logout />
          ) : (
            <AuthLinks />
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden cursor-pointer text-emerald-700 focus:outline-none text-2xl bg-emerald-100 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-emerald-200 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"}`}></i>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-emerald-100 px-6 py-4 space-y-2 animate-slideDown">
          {userTokenAccess &&
            [...navItems, ...dropdownItems].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-lg font-[var(--font-noto-arabic)] ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-lg"
                      : "text-emerald-700 hover:bg-emerald-100"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <i className={`fa-solid ${item.icon}`}></i> {item.label}
              </NavLink>
            ))}

          <div className="pt-4 border-t border-emerald-100">
            {userTokenAccess ? ( <Logout />
            
            ) : (
              <AuthLinks />
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
