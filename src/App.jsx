import { useState, useMemo } from "react";
import MapComponent from "./components/MapComponent";
import Filters from "./components/Filters.jsx";
import ProjectsList from "./components/ProjectsList";
import { mapPins } from "./data/mapPins.js";
import "./App.css";
import MapView from "./components/MapView.jsx";
import ListView from "./components/ListView.jsx";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [toggleView, setToggleView] = useState("map");

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
    });
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
  );
}

export default App;
