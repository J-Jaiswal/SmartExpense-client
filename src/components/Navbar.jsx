import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import userImg from "../../src/assets/user.svg";
import logo from "../../src/assets/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    updateUser(); // Initial load
    window.addEventListener("storage", updateUser);

    return () => window.removeEventListener("storage", updateUser);
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#387478] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              className="w-10 cursor-pointer"
              src={logo}
              alt="logo"
              onClick={() => navigate("/")}
            />
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 ml-10">
              <div
                className="hover:text-blue-200 text-[20px] cursor-pointer transition duration-300"
                onClick={() => navigate("/")}
              >
                Add
              </div>
              <div
                className="hover:text-blue-200 text-[20px] cursor-pointer transition duration-300"
                onClick={() => navigate("/expense")}
              >
                Analyse
              </div>
              <div
                className="hover:text-blue-200 text-[20px] cursor-pointer transition duration-300"
                onClick={() => navigate("/filter")}
              >
                Filter
              </div>
            </div>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-white text-lg flex items-center focus:outline-none"
                >
                  <img
                    className="h-10 w-10 rounded-full border-2 bg-white cursor-pointer"
                    src={userImg}
                    alt="Profile"
                  />
                </button>
                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b">
                      <p className="text-gray-900 font-semibold">{user.name}</p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white text-lg font-medium hover:underline"
              >
                Login
              </Link>
            )}
            <div
              className="hover:text-blue-200 text-[20px] cursor-pointer transition duration-300 ml-4 hidden md:block"
              onClick={() => navigate("/history")}
            >
              History
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden ml-4">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white hover:text-blue-200 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#387478]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
              className="block hover:text-blue-200 text-[18px] cursor-pointer transition duration-300"
            >
              Add
            </div>
            <div
              onClick={() => {
                navigate("/expense");
                setMobileMenuOpen(false);
              }}
              className="block hover:text-blue-200 text-[18px] cursor-pointer transition duration-300"
            >
              Analyse
            </div>
            <div
              onClick={() => {
                navigate("/filter");
                setMobileMenuOpen(false);
              }}
              className="block hover:text-blue-200 text-[18px] cursor-pointer transition duration-300"
            >
              Filter
            </div>
            <div
              onClick={() => {
                navigate("/history");
                setMobileMenuOpen(false);
              }}
              className="block hover:text-blue-200 text-[18px] cursor-pointer transition duration-300"
            >
              History
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
