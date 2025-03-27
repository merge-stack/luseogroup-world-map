import { useCallback, useEffect } from "react";

import { IProject } from "@interfaces";
import { REACT_DEFAULT_IMAGE_URL } from "@config";

import { startCase, toLower } from "lodash";
import luseoPin from "@assets/images/luseo-pin.png";
import architecte from "@assets/images/architecte.png";
import surface from "@assets/images/surface.png";
import bim from "@assets/images/bim.png";
import certification from "@assets/images/certification.png";
import mission from "@assets/images/mission.png";

import { categoryIcons } from "../Map";
import "./index.css";
import ImageSlider from "./ImageSlider";

interface IProjectCard {
  project: IProject;
  selectedProject: IProject | null;
  setSelectedProject: (project: IProject) => void;
  projectRefs: React.RefObject<Record<string, HTMLDivElement | null>>
  scrollToProject: (projectId: number) => void
}

interface CardDetailPortionProps {
  icon: string;
  title: string;
  value: string | null | undefined;
}

const CardDetailPortion: React.FC<CardDetailPortionProps> = ({ icon, title, value }) => (
  <div className="card-detail-portion">
    <img src={icon} alt={title} className="card-icons" />
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span className="detail-title">{title}</span>
      <span className="detail-value">{value || "N/A"}</span>
    </div>
  </div>
);

const ProjectCard: React.FC<IProjectCard> = ({
  project,
  selectedProject,
  setSelectedProject,
  projectRefs,
  scrollToProject
}) => {
  const categoryIcon = categoryIcons[project.category]

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
        <h5 className="project-name">{project.name}</h5>
        <hr className="project-divider" />
        <div className="location-card-section">
          <CardDetailPortion icon={luseoPin} title="Localisation" value={`${startCase(toLower(project.city))}, ${startCase(toLower(project.region))}`} />
          <CardDetailPortion icon={categoryIcon || REACT_DEFAULT_IMAGE_URL} title="Type de Projet" value={project.category} />
          <CardDetailPortion icon={architecte} title="Architecte" value={project.architect} />
          <CardDetailPortion icon={surface} title="Surface" value={project.area} />
          <CardDetailPortion icon={bim} title="BIM" value={project.bim} />
          <CardDetailPortion icon={certification} title="Certification" value={project.certification} />
          <CardDetailPortion icon={mission} title="Mission" value={project.mission} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
