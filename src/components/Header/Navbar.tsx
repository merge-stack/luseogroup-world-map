import React from "react";
import logo from "@assets/images/logo.png";
import "./index.css";

interface FooterProps {
  resetFilters: () => void;
}

const Navbar: React.FC<FooterProps> = ({ resetFilters }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-left">
          <img src={logo} alt="Company Logo" className="navbar-logo" />

          {/* Slogan */}
          <h1 className="navbar-title">
            Éclairer vos projets, bâtir votre avenir !
          </h1>
        </div>
        <div className="navbar-right">
          <div className="navbar-links">
            <a href="#" target="_blank" rel="noopener noreferrer" className="navbar-item">
              Contact
            </a>

            <a href="#" target="_blank" rel="noopener noreferrer" className="navbar-item">
              About
            </a>

            <div onClick={resetFilters} className="navbar-item navbar-button">
              Reset Filters
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
