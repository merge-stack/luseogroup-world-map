import { useEffect, useRef } from "react";

import { IProject } from "@interfaces";
import defaultImage from "@assets/images/missing-image.jpg";
import "./index.css";
import ImageSlider from "./ImageSlider";

interface IProjectCard {
  project: IProject;
  selectedProject: IProject | null;
  setSelectedProject: (project: IProject) => void;
}

const ProjectCard: React.FC<IProjectCard> = ({ project, selectedProject, setSelectedProject }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedProject?.id === project.id && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedProject, project.id]);

  return (
    <div
      ref={cardRef}
      className={`location-card ${selectedProject?.id === project.id ? "selected" : ""}`}
      onClick={() => setSelectedProject(project)}>
      <div className="img-div">
        <ImageSlider photos={project.photos?.length > 0 ? project.photos : [defaultImage]} photoHeight="176px" />
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
