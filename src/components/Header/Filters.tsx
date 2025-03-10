import { useMemo } from "react";
import { mapPins } from "@src/data/mapPins";
import { ViewType } from "@constants";

interface IFilters {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleView: string
  setToggleView: (view: string) => void;
}

const Filters: React.FC<IFilters> = ({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  searchQuery,
  setSearchQuery,
  toggleView,
  setToggleView,
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
      <input
        id="search-input"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="filter-search"
        placeholder="Search by project name..."
      />

      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="filter-dropdown">
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === "all" ? "All Categories" : category}
          </option>
        ))}
      </select>

      <select
        id="location-select"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
        className="filter-dropdown">
        {locations.map((location) => (
          <option key={location} value={location}>
            {location === "all" ? "All Locations" : location}
          </option>
        ))}
      </select>

      <div className="toggle-container">
        <button
          className={toggleView === ViewType.MAP ? "active" : ""}
          onClick={() => setToggleView(ViewType.MAP)}>
          Map View
        </button>
        <button
          className={toggleView === ViewType.LIST ? "active" : ""}
          onClick={() => setToggleView(ViewType.LIST)}>
          List View
        </button>
      </div>
    </div>
  );
};

export default Filters;
