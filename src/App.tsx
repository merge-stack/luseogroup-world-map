import { useState, useMemo, useCallback, useEffect } from "react";
import { debounce } from "lodash";

import Filters from "@components/Header/Filters";
import MapView from "@components/ViewTabs/MapView";
import ListView from "@components/ViewTabs/ListView";
import { IProject } from "@interfaces";
import { ViewType } from "@constants";

import { mapPins } from "@data/mapPins";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [toggleView, setToggleView] = useState<string>(ViewType.MAP);

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // Debounce the search query update
  const debouncedSetSearchQuery = useCallback(
    debounce((query) => setDebouncedSearchQuery(query), 300),
    []
  );

  // Update the debounced query when searchQuery changes
  useEffect(() => {
    debouncedSetSearchQuery(searchQuery);
  }, [searchQuery, debouncedSetSearchQuery]);

  const filteredPins = useMemo(() => {
    return mapPins.filter((pin) => {
      const matchCategory =
        selectedCategory === "all" ||
        pin.projectDetails.category === selectedCategory;
      const matchLocation =
        selectedLocation === "all" ||
        pin.projectDetails.region === selectedLocation;
      const matchSearch =
        searchQuery === "" ||
        pin.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchLocation && matchSearch;
    }) as IProject[];
  }, [selectedCategory, selectedLocation, debouncedSearchQuery]);

  return (
    <div className="app-container">
      <div className="content-container">
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <div style={{ width: "1200px" }}>
            {toggleView === ViewType.MAP ? (
              <MapView
                pins={filteredPins}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
              />
            ) : (
              <ListView
                pins={filteredPins}
                setSelectedProject={setSelectedProject}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
