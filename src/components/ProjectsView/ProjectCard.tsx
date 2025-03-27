import { useCallback, useEffect, useState } from "react";
import { startCase, toLower } from "lodash";

import { IProject } from "@interfaces";
import { REACT_DEFAULT_IMAGE_URL } from "@config";

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
  className?: string;
}

const CardDetailPortion: React.FC<CardDetailPortionProps> = ({ icon, title, value, className }) => (
  <div className={`card-detail-portion ${className}`}>
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
  const [contentHeight, setContentHeight] = useState(250); // Default height

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

  //to change height of photos according to the content div
  useEffect(() => {
    const contentElement = document.getElementById(`content-section-${project.id}`);
    if (contentElement) {
      setContentHeight(contentElement.clientHeight);
    }
  }, [project]);
  return (
    <div
      ref={setProjectRef}
      className={`location-card ${selectedProject?.id === project.id ? "selected" : ""}`}
      onClick={() => setSelectedProject(project)}>
      <div style={{ display: "flex" }}>
        <div className="img-div">
          <ImageSlider photos={project.photos?.length > 0 ? project.photos : [REACT_DEFAULT_IMAGE_URL]} photoHeight={`${contentHeight}px`} />
        </div>
        <div className="content-section" id={`content-section-${project.id}`}>
          <h5 className="project-name">{project.name}</h5>
          <div className="detail-section">
            <CardDetailPortion icon={luseoPin} title="Localisation" value={`${startCase(toLower(project.city))}, ${startCase(toLower(project.region))}`} />
            <CardDetailPortion icon={categoryIcon || REACT_DEFAULT_IMAGE_URL} title="Type de Projet" value={project.category} />
            <CardDetailPortion icon={architecte} title="Architecte" value={project.architect} />
            <CardDetailPortion icon={surface} title="Surface" value={project.area} />
            <CardDetailPortion icon={bim} title="BIM" value={project.bim} />
            <CardDetailPortion icon={certification} title="Certification" value={project.certification} />
            <div className="mission">   <CardDetailPortion icon={mission} title="Mission" value={project.mission} /></div>
          </div>
        </div>
      </div>
      <div className="card-detail-portion mission" style={{ padding: "0px 20px" }}>
        <div className="mission-div">
          <img src={mission} alt="Category" className="card-icons" />
          <span className="detail-title">Mission</span>
        </div>
        <span className="detail-value">{project.mission || "N/A"}</span>
      </div>
    </div>
  );
};

export default ProjectCard;
