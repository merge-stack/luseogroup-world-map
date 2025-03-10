import { useMemo } from "react";
import { mapPins } from "@data/mapPins";

interface IFilters {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const Filters: React.FC<IFilters> = ({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
}) => {
  const locations = useMemo<string[]>(
    () => ["all", ...new Set(mapPins.map((pin) => pin.projectDetails.region))],
    []
  );

  const categories = useMemo<string[]>(
    () => ["all", ...new Set(mapPins.map((pin) => pin.projectDetails.category))],
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

export default Filters;
