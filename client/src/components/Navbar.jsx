// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleUploadClick = () => {
    navigate("/upload");
  };

  return (
<<<<<<< HEAD
    <nav className="relative bg-gray-800 text-white flex justify-between items-center px-4 py-2 overflow-hidden transition-all duration-300 ease-in-out hover:bg-gray-700">
=======
    <nav className="relative bg-gray-800 text-white flex justify-between items-center px-6 py-3 overflow-hidden transition-all duration-300 ease-in-out hover:bg-gray-700">
>>>>>>> b4dc0b394e6a9e28b954c0489b9c3945dd4a6895
      {/* Streak line effect */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900 to-transparent opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-30" />
      </div>

      <h1
        className="text-lg font-semibold cursor-pointer z-10 p-1 rounded-lg transition-colors duration-300 ease-in-out hover:text-black"
        onClick={handleLogoClick}
      >
        PixelPerfect
      </h1>
      <div className="flex space-x-2 z-10">
        <button
<<<<<<< HEAD
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 text-sm"
=======
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
>>>>>>> b4dc0b394e6a9e28b954c0489b9c3945dd4a6895
          onClick={handleUploadClick}
        >
          Upload
        </button>
        <button
<<<<<<< HEAD
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 text-sm"
=======
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105"
>>>>>>> b4dc0b394e6a9e28b954c0489b9c3945dd4a6895
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
