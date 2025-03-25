import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import logo from "@assets/images/logo.png";
import contact from "@assets/images/contact.png";
import about from "@assets/images/about.png";
import franceflag from "@assets/images/france.png";

import { ViewType } from "@constants";

import "./index.css";

interface FooterProps {
  resetFilters: () => void;
  toggleView: string;
  setToggleView: (view: string) => void;
}

const Navbar: React.FC<FooterProps> = ({ resetFilters, toggleView, setToggleView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="nav-top">
            <div className="navbar-left">
              <img src={logo} alt="Company Logo" className="navbar-logo" />
              <div>
                <div className="toggle-container">
                  <button className={toggleView === ViewType.LIST ? "active" : ""} onClick={() => setToggleView(ViewType.LIST)}>
                    LISTE
                  </button>
                  <button className={toggleView === ViewType.MAP ? "active" : ""} onClick={() => setToggleView(ViewType.MAP)}>
                    CARTE
                  </button>
                </div>
                <button className="reset-button" onClick={resetFilters}>
                  RÈINITIALISER
                </button>
              </div>
            </div>
            <div className="navbar-right">
              <div className="navbar-links">
                <a
                  href="https://luseogroup.com/contact.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-item"
                  title="Tous les projets"
                >
                  <img src={contact} alt="" className="navbar-options" />
                </a>
                <a
                  href="https://luseogroup.com/who-we-are.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-item"
                  title="À propos de LUSEO GROUP"
                >
                  <img src={about} alt="" className="navbar-options" />
                </a>
                <div className="navbar-item">
                  <img src={franceflag} alt="Company Logo" className="navbar-options" />
                </div>
              </div>
              <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </div>
              <div className="navbar-button">
                <img src={franceflag} alt="Company Logo" className="navbar-options" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <a href="https://luseogroup.com/contact.php" target="_blank" rel="noopener noreferrer" className="mobile-menu-item">
          Contact
        </a>
        <a href="https://luseogroup.com/who-we-are.html" target="_blank" rel="noopener noreferrer" className="mobile-menu-item">
          About
        </a>
      </div>
    </>
  );
};

export default Navbar;
