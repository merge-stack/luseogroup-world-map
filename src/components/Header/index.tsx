import React from 'react';
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

  return (
    <>
      <div 
        className={`navbar-mobile-wrapper`}
      >
        <Navbar
          resetFilters={resetFilters}
          toggleView={toggleView}
          setToggleView={setToggleView}
        />
      </div>
      
      <div 
        className={`filters-mobile-wrapper`}
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