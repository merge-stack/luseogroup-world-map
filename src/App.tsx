import { useState, useMemo } from "react";

import ProjectsView from "@src/components/ProjectsView";
import Footer from "@components/Footer";
import Header from "@components/Header";

import { IProject } from "@interfaces";
import { ViewType } from "@constants";

import { projects } from "@data/index";

import "./App.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [toggleView, setToggleView] = useState<string>(ViewType.MAP);

  const filteredPins = useMemo(() => {
    return projects.filter((pin) => {
      const matchCategory =
        selectedCategory === "all" ||
        pin.category === selectedCategory ||
        // Custom filter for BIM = yes
        // It'll be moved to a separate filter in v2
        // @ts-ignore
        (selectedCategory === "oui" && selectedCategory === String(pin.bim)?.toLowerCase());
      const matchLocation = selectedLocation === "all" || pin.region === selectedLocation;
      const matchSearch =
        searchQuery === "" ||
        pin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.architect.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(pin.bim).toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchLocation && matchSearch;
    }) as IProject[];
  }, [selectedCategory, selectedLocation, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedLocation("all");
    setSearchQuery("");
    setSelectedProject(null);
  };
  return (
    <div className="app-container">
      <div className="content-container">
        <Header
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          setSearchQuery={setSearchQuery}
          toggleView={toggleView}
          setToggleView={setToggleView}
          resetFilters={resetFilters}
        />
        <div className="projects-div">
          <div>
            <ProjectsView
              pins={filteredPins}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              isListView={toggleView === ViewType.LIST}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
