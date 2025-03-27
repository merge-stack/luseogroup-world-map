import { IProject } from "@interfaces";
import MapComponent from "@components/Map";
import ProjectsList from "./ProjectsList";
import "./index.css";
import { useRef } from "react";

interface IProjectsViewProps {
  pins: IProject[];
  selectedProject: IProject | null;
  setSelectedProject: (project: IProject | null) => void;
  isListView: boolean
}

const ProjectsView: React.FC<IProjectsViewProps> = ({ pins, selectedProject, setSelectedProject, isListView }) => {
  const projectRefs = useRef<Record<string, HTMLDivElement | null>>({});

  //function to scroll to a project based on its id
  const scrollToProject = (projectId: number) => {
    const ref = projectRefs.current[projectId];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <div className={isListView ? "list-view-container" : "projects-container"}>
      <ProjectsList pins={pins} setSelectedProject={setSelectedProject} isListView={isListView} selectedProject={selectedProject} projectRefs={projectRefs} scrollToProject={scrollToProject} />
      {!isListView && (
        <div className="map-container">
          <MapComponent
            pins={pins}
            selectedProject={selectedProject}
            setSelectedProject={setSelectedProject}
            scrollToProject={scrollToProject}
          />
        </div>)}
    </div>
  );
};

export default ProjectsView;
