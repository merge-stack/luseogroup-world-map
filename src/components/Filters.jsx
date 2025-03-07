import { useMemo } from "react";
import PropTypes from "prop-types";

import { mapPins } from "../data/mapPins.js";

const Filters = ({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
}) => {
  const locations = useMemo(
    () => ["all", ...new Set(mapPins.map((pin) => pin.projectDetails.region))],
    []
  );

  const categories = useMemo(
    () => [
      "all",
      ...new Set(mapPins.map((pin) => pin.projectDetails.category)),
    ],
    []
  );

  return (
    <div className="filters">
      <label htmlFor="category-select">Category:</label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="filter-dropdown"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === "all" ? "All Categories" : category}
          </option>
        ))}
      </select>
      <label htmlFor="location-select">Location:</label>
      <select
        id="location-select"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="filter-dropdown"
      >
        {locations.map((location) => (
          <option key={location} value={location}>
            {location === "all" ? "All Locations" : location}
          </option>
        ))}
      </select>
    </div>
  );
};

Filters.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  selectedLocation: PropTypes.string.isRequired,
  setSelectedLocation: PropTypes.func.isRequired,
};

export default Filters;
