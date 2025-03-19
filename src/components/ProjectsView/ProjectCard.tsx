import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef } from "react";

import { IProject } from "@interfaces";
import defaultImage from "@assets/images/default-img.png";
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
      <ImageSlider photos={project.photos.length > 0 ? project.photos : [defaultImage]} photoHeight="250px" />
      <div className="location-card-content" >
        <div className="location-card-section">
          <h3 className="location-card-title">{project.name}</h3>
          <h3 className="location-card-subtitle">SCOPE</h3>
          <p className="location-card-text">{project.description || "N/A"}</p>
        </div>
        <div className="location-card-section">
          <h3 className="location-card-subtitle">PROJECT DETAILS</h3>
          <p className="location-card-text">
            <h5 className="location-card-text-detail">ARCHITECT: </h5> {project.architect || "N/A"}
          </p>
          <p className="location-card-text">
            <h5 className="location-card-text-detail">SIZE:</h5> {project.area || "N/A"}
          </p>
          <p className="location-card-text">
            <h5 className="location-card-text-detail">CATEGORY:</h5> {project.category || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
