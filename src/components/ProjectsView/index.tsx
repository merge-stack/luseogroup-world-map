import { IProject } from "@interfaces";
import MapComponent from "@components/Map";
import Footer from "@components/Footer";  //will keep it as footer for now, as its position isnt final
import ProjectsList from "./ProjectsList";
import "./index.css";

interface IProjectsViewProps {
  pins: IProject[];
  selectedProject: IProject | null;
  setSelectedProject: (project: IProject) => void;
  isListView: boolean
  resetFilters: () => void;
}

const ProjectsView: React.FC<IProjectsViewProps> = ({ pins, selectedProject, setSelectedProject, isListView, resetFilters }) => {
  return (
    <div className={isListView ? "list-view-container" : "projects-container"}>
      <ProjectsList pins={pins} setSelectedProject={setSelectedProject} isListView={isListView} />
      <div className={`map-container ${isListView ? "hidden" : ""}`}>
        <MapComponent
          pins={pins}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <Footer resetFilters={resetFilters} />
      </div>
    </div>
  );
};

export default ProjectsView;
