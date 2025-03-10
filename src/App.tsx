import { useState, useMemo } from "react";
import { IProject } from "@interfaces/index";
import { mapPins } from "./data/mapPins";
import Filters from "./components/Filters";
import ProjectsList from "./components/ProjectsList";
import MapComponent from "./components/MapComponent";
import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const filteredPins = useMemo(() => {
    return mapPins.filter((pin) => {
      const matchCategory =
        selectedCategory === "all" ||
        pin.projectDetails.category === selectedCategory;
      const region = pin.projectDetails.region;
      const matchLocation =
        selectedLocation === "all" || region === selectedLocation;
      return matchCategory && matchLocation;
    }) as IProject[];
  }, [selectedCategory, selectedLocation]);

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="filters-container">
          <Filters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
        <div className="projects-container">
          <ProjectsList
            pins={filteredPins}
            setSelectedProject={setSelectedProject}
          />
          <div className="map-container">
            <MapComponent
              pins={filteredPins}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
