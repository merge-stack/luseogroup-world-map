import { useCallback, useMemo } from "react";
import { debounce } from "lodash";

import { projects } from "@data/index";
import { ViewType } from "@constants";
import "./index.css";

interface IFilters {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  setSearchQuery: (query: string) => void;
  toggleView: string
  setToggleView: (view: string) => void;
}

const Filters: React.FC<IFilters> = ({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  setSearchQuery,
  toggleView,
  setToggleView,
}) => {
  const locations = useMemo<string[]>(
    () => ["all", ...new Set(projects.map((pin) => pin.region))],
    []
  );

  const categories = useMemo<string[]>(
    () => ["all", ...new Set(projects.map((pin) => pin.category))],
    []
  );

  const debouncedSetSearchQuery = useCallback(
    debounce((query) => setSearchQuery(query), 300),
    []
  );
  return (
    <div className="filters">
      <div className="search-container">
        <input
          id="search-input"
          type="text"
          onChange={(e) => debouncedSetSearchQuery(e.target.value)}
          className="filter-search"
          placeholder="Search by project name..."
        />
      </div>
      <div className="dropdown-container">
        <div>
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
        </div>

        <div className="toggle-container">
          <button
            className={toggleView === ViewType.LIST ? "active" : ""}
            onClick={() => setToggleView(ViewType.LIST)}>
            List View
          </button>
          <button
            className={toggleView === ViewType.MAP ? "active" : ""}
            onClick={() => setToggleView(ViewType.MAP)}>
            Map View
          </button>
        </div>
      </div>
    </div >
  );
};

export default Filters;
