import React, { useCallback, useMemo, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { debounce, startCase, toLower } from "lodash";

import logo from "@assets/images/logo.png";
import contact from "@assets/images/contact.png";
import about from "@assets/images/about.png";
import franceflag from "@assets/images/france.png";

import { ViewType } from "@constants";
import { projects } from "@src/data";

import "./index.css";

interface FooterProps {
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;
  toggleView: string;
  setToggleView: (view: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const Navbar: React.FC<FooterProps> = ({
  resetFilters,
  setSearchQuery,
  toggleView,
  setToggleView,
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const debouncedSetSearchQuery = useCallback(
    debounce((query) => setSearchQuery(query), 300),
    []
  );

  const locations = useMemo<{ label: string; value: string }[]>(
    () => [
      { label: "PAYS", value: "all" }, // "Pays" is the display label for "all"
      ...Array.from(
        new Map(
          projects
            .filter((pin) => pin.region && pin.region.trim() !== "") // Remove empty/undefined regions
            .map((pin) => [pin.region, { label: startCase(toLower(pin.region)), value: pin.region }])
        ).values()
      ),
    ],
    [projects]
  );

  const categories = useMemo<{ label: string; value: string }[]>(
    () => [
      { label: "TYPE DE PROJET", value: "all" }, // "Type De Projet" is the display label for "all"
      ...Array.from(
        new Map(
          projects
            .filter((pin) => pin.category && pin.category.trim() !== "") // Remove empty/undefined categories
            .map((pin) => [pin.category, { label: startCase(toLower(pin.category)), value: pin.category }])
        ).values()
      ),
    ],
    [projects]
  );

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <img src={logo} alt="Company Logo" className="navbar-logo" />
          <div>
            <div className="navbar-content">
              <div className="navbar-left">
                <div className="search-container">
                  <input
                    id="search-input"
                    type="text"
                    onChange={(e) => debouncedSetSearchQuery(e.target.value)}
                    className="filter-search"
                    placeholder="Recherche par mots-clès..."
                  />
                </div>
              </div>

              <div className="navbar-right">
                <button
                  style={{ backgroundColor: "#272C64", color: "white" }}
                  onClick={resetFilters}
                >
                  RÈINITIALISER
                </button>
                <div className="toggle-container">
                  <button className={toggleView === ViewType.LIST ? "active" : ""} onClick={() => setToggleView(ViewType.LIST)}>
                    LISTE
                  </button>
                  <button className={toggleView === ViewType.MAP ? "active" : ""} onClick={() => setToggleView(ViewType.MAP)}>
                    CARTE
                  </button>
                </div>

                <div className="navbar-links">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="navbar-item" title="Tous les projets">
                    <img src={contact} alt="" className="navbar-logo" />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="navbar-item" title="À propos de LUSEO GROUP">
                    <img src={about} alt="" className="navbar-logo" />
                  </a>
                  <div className="navbar-item navbar-button">
                    <img src={franceflag} alt="Company Logo" className="navbar-logo" />
                  </div>
                </div>
                <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
                  {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                </div>
              </div>
            </div>

            <div className="filters">
              <div className="dropdown-container">
                <div>
                  <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="filter-dropdown"
                  >
                    {categories.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <select
                    id="location-select"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="filter-dropdown"
                  >
                    {locations.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
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
