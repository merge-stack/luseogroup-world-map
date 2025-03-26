import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Filters from './Filters';
import './index.css';

interface HeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  setSearchQuery: (query: string) => void;
  toggleView: string;
  setToggleView: (view: string) => void;
  resetFilters: () => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  setSearchQuery,
  toggleView,
  setToggleView,
  resetFilters
}) => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 568) {
        const st = window.pageYOffset || document.documentElement.scrollTop;

        if (st < lastScrollTop) {
          // Scrolling up → show navbar
          setIsNavbarVisible(true);
        } else if (st > lastScrollTop) {
          // Scrolling down → hide navbar
          setIsNavbarVisible(false);
        }

        setLastScrollTop(st);
      } else {
        // Always visible on larger screens
        setIsNavbarVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return (
    <>
      <div 
        className={`navbar-mobile-wrapper ${isNavbarVisible ? 'navbar-visible' : ''}`}
      >
        <Navbar
          resetFilters={resetFilters}
          toggleView={toggleView}
          setToggleView={setToggleView}
        />
      </div>
      
      <div 
        className={`filters-mobile-wrapper ${isNavbarVisible ? 'filters-with-navbar' : ''}`}
      >
        <Filters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </>
  );
};

export default Header;