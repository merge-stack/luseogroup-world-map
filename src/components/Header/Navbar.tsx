import React from "react";

import logo from "@assets/images/logo.png";
import contact from "@assets/images/contact.png";
import about from "@assets/images/about.png";
import france from "@assets/images/france.png";
import map from "@assets/images/map-off.png";
import mapActive from "@assets/images/map-on.png";
import reset from "@assets/images/reset.png";
import list from "@assets/images/list-off.png";
import listActive from "@assets/images/list-on.png";


import "./index.css";
import { ViewType } from "@src/constants";

interface FooterProps {
  resetFilters: () => void;
  toggleView: string;
  setToggleView: (view: string) => void;
  className?: string;
}

const Navbar: React.FC<FooterProps> = ({
  resetFilters,
  toggleView,
  setToggleView,
  className = '',
}) => {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };

  return (
    <>
      <nav className={`navbar ${className}`}>
        <div className="navbar-container">
          <div className="nav-top">
            <div className="navbar-left">
              <img src={logo} alt="Company Logo" className="navbar-logo" />
            </div>
            <div className="navbar-right">
              <div className="navbar-links">
                <div className="navbar-item" title="Map" onClick={() => setToggleView(ViewType.MAP)}          >
                  <img src={toggleView === ViewType.MAP ? mapActive : map} alt="" className="navbar-options" />
                </div>
                <div className="navbar-item" title="List" onClick={() => setToggleView(ViewType.LIST)}>
                  <img src={toggleView === ViewType.LIST ? listActive : list} alt="" className="navbar-options" />
                </div>
                <div className="navbar-item" title="reset" onClick={resetFilters} >
                  <img src={reset} alt="" className="navbar-options" />
                </div>
                <a
                  href="https://luseogroup.com/who-we-are.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-item"
                  title="À propos de LUSEO GROUP"
                >
                  <img src={about} alt="" className="about-icon" />
                </a>
                <a
                  href="https://luseogroup.com/contact.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-item"
                  title="Tous les projets"
                >
                  <img src={contact} alt="" className="navbar-options" />
                </a>
                <div className="navbar-item">
                  <img src={france} alt="Company Logo" className="navbar-options" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <button className="top-button">Top</button>
      {/* 
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <a href="https://luseogroup.com/contact.php" target="_blank" rel="noopener noreferrer" className="mobile-menu-item">
          Contact
        </a>
        <a href="https://luseogroup.com/who-we-are.html" target="_blank" rel="noopener noreferrer" className="mobile-menu-item">
          About
        </a>
      </div> */}
    </>
  );
};

export default Navbar;
