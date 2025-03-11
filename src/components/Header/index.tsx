import React from "react";
import Navbar from "./Navbar";
import Filters from "./Filters";
import "./index.css";

interface HeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleView: string;
  setToggleView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  searchQuery,
  setSearchQuery,
  toggleView,
  setToggleView,
}) => {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Filters */}
      <div className="filters-container">
        <Filters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          toggleView={toggleView}
          setToggleView={setToggleView}
        />
      </div>
    </>
  );
};

export default Header;
