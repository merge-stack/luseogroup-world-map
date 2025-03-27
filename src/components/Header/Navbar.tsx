import React, { useEffect, useState } from "react";

import logo from "@assets/images/LOGO LUSEO.png";
import contact from "@assets/images/contact.png";
import about from "@assets/images/about.png";
import france from "@assets/images/france.png";
import map from "@assets/images/map-off.png";
import mapActive from "@assets/images/map-on.png";
import reset from "@assets/images/reset.png";
import list from "@assets/images/list-off.png";
import listActive from "@assets/images/list-on.png";
import backToTop from "@assets/images/back-to-top.png";

import "./index.css";
import { ViewType } from "@src/constants";

interface FooterProps {
  resetFilters: () => void;
  toggleView: string;
  setToggleView: (view: string) => void;
  className?: string;
}

const Navbar: React.FC<FooterProps> = ({ resetFilters, toggleView, setToggleView, className = "" }) => {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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
                <div className="navbar-item" title="Carte" onClick={() => setToggleView(ViewType.MAP)}>
                  <img src={toggleView === ViewType.MAP ? mapActive : map} alt="" className="navbar-options" />
                </div>
                <div className="navbar-item" title="Liste" onClick={() => setToggleView(ViewType.LIST)}>
                  <img src={toggleView === ViewType.LIST ? listActive : list} alt="" className="navbar-options" />
                </div>
                <div className="navbar-item" title="Réinitialiser les filtres" onClick={resetFilters}>
                  <img src={reset} alt="" className="navbar-options" />
                </div>
                <a
                  href="https://luseogroup.com/index-fr.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-item"
                  title="À propos de Luseo Group"
                >
                  <img src={about} alt="" className="about-icon" />
                </a>
                <a
                  href="https://luseogroup.com/contact-fr.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="navbar-item"
                  title="Nous Contacter"
                >
                  <img src={contact} alt="" className="navbar-options" />
                </a>
                <div className="navbar-item" title="Français">
                  <img src={france} alt="Company Logo" className="navbar-options" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {showScrollButton && (
        <div className="top-button" onClick={scrollToTop}>
          <img src={backToTop} alt="" style={{ width: "50px", height: "50px" }} />
        </div>
      )}
    </>
  );
};

export default Navbar;
