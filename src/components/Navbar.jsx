import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import userImg from "../../src/assets/user.svg";
import logo from "../../src/assets/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser);
    };

    updateUser(); // Initial load
    window.addEventListener("storage", updateUser); // Listen for changes

    return () => window.removeEventListener("storage", updateUser);
  }, []);

  // ✅ Handle Logout
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
    <nav className="flex justify-center  bg-[#387478] text-white shadow-md">
      <div className="flex items-center justify-between w-full px-[70px] py-2 ">
        <img
          className="w-[60px] cursor-pointer"
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
        />
        <div className="flex gap-8">
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
            className="hover:text-blue-200  text-[20px] cursor-pointer transition duration-300"
            onClick={() => navigate("/filter")}
          >
            Filter
          </div>
          <div
            className="hover:text-blue-200 text-[20px] cursor-pointer transition duration-300"
            onClick={() => navigate("/history")}
          >
            History
          </div>
        </div>

        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white text-lg flex items-center focus:outline-none"
            >
              <img
                className="h-10 rounded-full border-2 bg-white cursor-pointer"
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
      </div>
    </nav>
  );
};

export default Navbar;
