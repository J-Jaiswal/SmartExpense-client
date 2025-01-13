import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-center p-4 bg-[#504450] text-white shadow-md">
      <div className="flex space-x-6 font-bold">
        <div
          className="hover:text-blue-200 cursor-pointer transition duration-300"
          onClick={() => navigate("/")}
        >
          Add
        </div>
        <div
          className="hover:text-blue-200 cursor-pointer transition duration-300"
          onClick={() => navigate("/expense")}
        >
          Analyse
        </div>
        <div
          className="hover:text-blue-200 cursor-pointer transition duration-300"
          onClick={() => navigate("/history")}
        >
          History
        </div>
        <div
          className="hover:text-blue-200 cursor-pointer transition duration-300"
          onClick={() => navigate("/login")}
        >
          Login
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
