import { IProject } from "@src/interfaces";
import MapComponent from "./MapComponent";
import ProjectsList from "./ProjectsList";

interface IMapViewProps {
  pins: IProject[];
  selectedProject: IProject | null;
  setSelectedProject: (project: IProject) => void;
}

const MapView: React.FC<IMapViewProps> = ({ pins, selectedProject, setSelectedProject }) => {
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
