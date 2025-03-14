import React from "react";
import logo from "@assets/logo.png";
import "./index.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <img src={logo} alt="Company Logo" className="navbar-logo" />

        {/* Slogan */}
        <h1 className="navbar-title">
          Éclairer vos projets, bâtir votre avenir !
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
