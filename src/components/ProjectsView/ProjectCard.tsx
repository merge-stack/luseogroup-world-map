import { useCallback, useEffect } from "react";

import { IProject } from "@interfaces";
import { REACT_DEFAULT_IMAGE_URL } from "@config";

import "./index.css";
import ImageSlider from "./ImageSlider";

interface IProjectCard {
  project: IProject;
  selectedProject: IProject | null;
  setSelectedProject: (project: IProject) => void;
  projectRefs: React.RefObject<Record<string, HTMLDivElement | null>>
  scrollToProject: (projectId: number) => void
}

const ProjectCard: React.FC<IProjectCard> = ({
  project,
  selectedProject,
  setSelectedProject,
  projectRefs,
  scrollToProject
}) => {
  const setProjectRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (el) {
        projectRefs.current[project.id] = el;
      }
    },
    [project.id, projectRefs]
  );

  useEffect(() => {
    if (selectedProject?.id === project.id) {
      scrollToProject(project.id);
    }
  }, [selectedProject, project.id]);
  return (
    <div
      ref={setProjectRef}
      className={`location-card ${selectedProject?.id === project.id ? "selected" : ""}`}
      onClick={() => setSelectedProject(project)}>
      <div className="img-div">
        <ImageSlider photos={project.photos?.length > 0 ? project.photos : [REACT_DEFAULT_IMAGE_URL]} photoHeight="180px" />
      </div>
      <div className="location-card-content" >
        <h3 className="project-name">{project.name}</h3>
        <span className="project-region">{`${project.city}, ${project.region}`}</span>
        <hr className="project-divider" />
        <div className="location-card-section">
          <h3 className="location-card-subtitle">MISSION</h3>
          <p className="location-card-text">{project.mission || "N/A"}</p>
        </div>
        <div className="location-card-section">
          <h3 className="location-card-subtitle">DÈTAILS</h3>
          <p className="location-card-text">
            <h5 className="location-card-text-detail">TYPE DÈ PROJET:</h5> {project.category || "N/A"}
          </p>
          <p className="location-card-text">
            <h5 className="location-card-text-detail">SURFACE:</h5> {project.area || "N/A"}
          </p>
          <p className="location-card-text">
            <h5 className="location-card-text-detail">BIM:</h5> {project.bim || "N/A"}
          </p>
          <p className="location-card-text">
            <h5 className="location-card-text-detail">CERTIFICATION:</h5> {project.certification || "N/A"}
          </p>
          <p className="location-card-text">
            <h5 className="location-card-text-detail">ARCHITECTÈ: </h5> {project.architect || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
