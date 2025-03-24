import React, { useCallback, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { debounce } from "lodash";

import logo from "@assets/images/logo.png";
import contact from "@assets/images/contact.png";
import about from "@assets/images/about.png";
import reset from "@assets/images/reset.png";
import franceflag from "@assets/images/france.png";

import { ViewType } from "@constants";

import "./index.css";
import Filters from "./Filters";

interface FooterProps {
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;
  toggleView: string
  setToggleView: (view: string) => void;
}

const Navbar: React.FC<FooterProps> = ({ resetFilters, setSearchQuery,
  toggleView,
  setToggleView, }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const debouncedSetSearchQuery = useCallback(
    debounce((query) => setSearchQuery(query), 300),
    []
  );
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-left">
            <img src={logo} alt="Company Logo" className="navbar-logo" />
            <div className="search-container">
              <input
                id="search-input"
                type="text"
                onChange={(e) => debouncedSetSearchQuery(e.target.value)}
                className="filter-search"
                placeholder="Recherche..."
              />
            </div>
          </div>
          <div className="navbar-right">
            <img src={franceflag} alt="Company Logo" className="france-flag" />
            <div className="toggle-container">
              <button
                className={toggleView === ViewType.LIST ? "active" : ""}
                onClick={() => setToggleView(ViewType.LIST)}
              >
                Liste
              </button>
              <button
                className={toggleView === ViewType.MAP ? "active" : ""}
                onClick={() => setToggleView(ViewType.MAP)}
              >
                Carte
              </button>
            </div>
            <div className="navbar-links">
              <a href="#" target="_blank" rel="noopener noreferrer" className="navbar-item">
                <img src={contact} alt="Company Logo" className="navbar-logo" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="navbar-item">
                <img src={about} alt="Company Logo" className="navbar-logo" />
              </a>
              <div onClick={resetFilters} className="navbar-item navbar-button">
                <img src={reset} alt="Company Logo" className="navbar-logo" />
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