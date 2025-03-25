import React from "react";
import Navbar from "./Navbar";
import "./index.css";
import Filters from "./Filters";

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
      {/* Navbar */}
      <Navbar
        resetFilters={resetFilters}
        setSearchQuery={setSearchQuery}
        toggleView={toggleView}
        setToggleView={setToggleView}
      />

      <Filters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        setSearchQuery={setSearchQuery}
        toggleView={toggleView}
        setToggleView={setToggleView}
      />

    </>
  );
};

export default Header;
