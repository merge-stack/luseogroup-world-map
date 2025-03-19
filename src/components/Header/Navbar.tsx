import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "@assets/images/logo.png";
import "./index.css";

interface FooterProps {
  resetFilters: () => void;
}

const Navbar: React.FC<FooterProps> = ({ resetFilters }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <img src={logo} alt="Company Logo" className="navbar-logo" />
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
            <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
          </div>
        </div>

      </nav>
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <a href="#" target="_blank" rel="noopener noreferrer" className="mobile-menu-item">
          Contact
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="mobile-menu-item">
          About
        </a>
        <div onClick={resetFilters} className="mobile-menu-item">
          Reset Filters
        </div>
      </div>
    </>
  );
};

export default Navbar;