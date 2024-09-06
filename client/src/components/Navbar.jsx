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

  const handleGenerate = () => {
    navigate("/generate-image");
  };
  const handleSearchClick = () => {
    navigate("/search");
  };
  return (
    <nav className="relative flex justify-between items-center px-8 py-4 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out overflow-hidden backdrop-filter backdrop-blur-lg bg-opacity-60">
      {/* Decorative Streak Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-900 to-transparent opacity-20 animate-pulse" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-transparent opacity-20 animate-[pulse_4s_ease-in-out_infinite]" />
      </div>

      {/* Logo Section */}
      <h1
        className="text-3xl font-bold cursor-pointer z-10 p-2 transition-colors duration-300 ease-in-out transform hover:scale-110 bg-gradient-to-r from-pink-500 via-purple-400 to-blue-400 bg-clip-text text-transparent"
        onClick={handleLogoClick}
      >
        PixelPerfect
      </h1>

      {/* Button Group */}
      <div className="flex space-x-4 z-10">
        <button
          className="bg-gradient-to-r from-pink-500 to-fuchsia-500  bg-opacity-70 hover:bg-green-600 text-white py-3 px-6 rounded-full shadow-md hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-110 text-base backdrop-filter backdrop-blur-md"
          onClick={handleUploadClick}
        >
          Search
        </button>
        <button
          className="bg-gradient-to-r from-fuchsia-500 to-purple-400 bg-opacity-70 hover:bg-purple-600 text-white py-3 px-6 rounded-full shadow-md hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-110 text-base backdrop-filter backdrop-blur-md"
          onClick={handleGenerate}
        >
          Generate
        </button>

        <button
          className="bg-gradient-to-r from-purple-500 to-blue-500 bg-opacity-70  hover:bg-yellow-600 text-white py-3 px-6 rounded-full shadow-md hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-110 text-base backdrop-filter backdrop-blur-md"
          onClick={handleSearchClick}
        >
          Search
        </button>
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-400 bg-opacity-70 hover:bg-green-600 text-white py-3 px-6 rounded-full shadow-md hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-110 text-base backdrop-filter backdrop-blur-md"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
