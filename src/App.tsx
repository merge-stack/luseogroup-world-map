import { useState, useMemo } from "react";
import Filters from "./components/Filters.jsx";
import { mapPins } from "./data/mapPins.js";
import "./App.css";
import MapView from "./components/MapView";
import ListView from "./components/ListView";
import { IProject } from "./interfaces/index.js";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [toggleView, setToggleView] = useState<string>("map");

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
  }, [selectedCategory, selectedLocation, searchQuery]);

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
            {toggleView === "map" ? (
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
