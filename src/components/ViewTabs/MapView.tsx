import { IProject } from "@interfaces";
import MapComponent from "@components/Map";
import ProjectsList from "./ProjectsList";
import "./index.css";

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
