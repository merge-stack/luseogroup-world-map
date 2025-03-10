import MapComponent from "./MapComponent";
import ProjectsList from "./ProjectsList";

const MapView = ({ pins, selectedProject, setSelectedProject }) => {
  return (
    <div className="projects-container">
      <ProjectsList pins={pins} setSelectedProject={setSelectedProject} />
      <div className="map-container" style={{ width: "70%", height: "1000px" }}>
        <MapComponent
          pins={pins}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
      </div>
    </div>
  );
};

export default MapView;
