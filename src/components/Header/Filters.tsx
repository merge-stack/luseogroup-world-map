import { useCallback, useMemo } from "react";
import { debounce, startCase, toLower } from "lodash";

import { projects } from "@data/index";
import "./index.css";

interface IFilters {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  setSearchQuery: (query: string) => void;
}

const Filters: React.FC<IFilters> = ({
  selectedCategory,
  setSelectedCategory,
  selectedLocation,
  setSelectedLocation,
  setSearchQuery,
}) => {
  const locations = useMemo<{ label: string; value: string }[]>(
    () => [
      { label: "PAYS", value: "all" }, // "Pays" is the display label for "all"
      ...Array.from(
        new Map(
          projects
            .filter((pin) => pin.region && pin.region.trim() !== "") // Remove empty/undefined regions
            .map((pin) => [pin.region, { label: startCase(toLower(pin.region)), value: pin.region }])
        ).values()
      ),
    ],
    [projects]
  );

  const categories = useMemo<{ label: string; value: string }[]>(
    () => [
      { label: "TYPE DE PROJET", value: "all" }, // "Type De Projet" is the display label for "all"
      ...Array.from(
        new Map(
          projects
            .filter((pin) => pin.category && pin.category.trim() !== "") // Remove empty/undefined categories
            .map((pin) => [pin.category, { label: startCase(toLower(pin.category)), value: pin.category }])
        ).values()
      ),
    ],
    [projects]
  );

  const debouncedSetSearchQuery = useCallback(
    debounce((query) => setSearchQuery(query), 300),
    []
  );
  return (
    <div className="filters">
      <input
        id="search-input"
        type="text"
        onChange={(e) => debouncedSetSearchQuery(e.target.value)}
        className="filter-search"
        placeholder="Search by project name..."
      />
      <div className="dropdown-container">
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-dropdown">
          {categories.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          id="location-select"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="filter-dropdown">
          {locations.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;