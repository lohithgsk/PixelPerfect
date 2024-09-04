// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center px-6 py-4">
      <h1
        className="text-xl font-semibold cursor-pointer"
        onClick={handleLogoClick}
      >
        PixelPerfect
      </h1>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleUploadClick}
        >
          Upload
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
