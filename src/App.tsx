import { useState, useMemo } from "react";

import Filters from "@components/Header/Filters";
import ProjectsView from "@src/components/ProjectsView";
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
            <ProjectsView
              pins={filteredPins}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              isListView={toggleView === ViewType.LIST}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
