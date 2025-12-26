import { NavLink } from "@/components/NavLink";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/features", label: "Features" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full border-b bg-green-100 dark:bg-gray-900 dark:border-gray-700 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-green-700 hover:text-green-800 dark:text-green-400 transition"
        >
          AgriDoctor
        </NavLink>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          {navLinks.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className="text-green-700 dark:text-gray-300 hover:text-green-900 dark:hover:text-white transition"
              activeClassName="font-semibold underline"
            >
              {label}
            </NavLink>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-md border border-green-600 px-3 py-2 text-green-700 dark:text-gray-200 hover:bg-green-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>

          {/* Login Button */}
          <NavLink
            to="/login"
            className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition"
            activeClassName="bg-green-800"
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
