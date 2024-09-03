// src/components/Navbar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>PixelPerfect</h1>
      <button className="login-button" onClick={handleLoginClick}>
        Login
      </button>
    </nav>
  );
};

export default Navbar;
