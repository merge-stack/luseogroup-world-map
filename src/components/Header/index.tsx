import React from "react";
import Navbar from "./Navbar";
import Filters from "./Filters";
import "./index.css";

interface HeaderProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  setSearchQuery: (query: string) => void;
  toggleView: string;
  setToggleView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  setSearchQuery,
  toggleView,
  setToggleView,
}) => {
  return (
    <div className="wrapper">
      {/* Navbar */}
      <Navbar />

      {/* Filters */}
      <div className="filters-container">
        <Filters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          setSearchQuery={setSearchQuery}
          toggleView={toggleView}
          setToggleView={setToggleView}
        />
      </div>
    </div>
  );
};

export default Header;
