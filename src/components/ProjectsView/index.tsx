import { IProject } from "@interfaces";
import MapComponent from "@components/Map";
import ProjectsList from "./ProjectsList";
import "./index.css";

interface IProjectsViewProps {
  pins: IProject[];
  selectedProject: IProject | null;
  setSelectedProject: (project: IProject | null) => void;
  isListView: boolean
}

const ProjectsView: React.FC<IProjectsViewProps> = ({ pins, selectedProject, setSelectedProject, isListView }) => {
  return (
    <div className={isListView ? "list-view-container" : "projects-container"}>
      <ProjectsList pins={pins} setSelectedProject={setSelectedProject} isListView={isListView} />
      {!isListView && (
        <div className="map-container">
          <MapComponent
            pins={pins}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
          />
        </div>)}
    </div>
  );
};

export default ProjectsView;
