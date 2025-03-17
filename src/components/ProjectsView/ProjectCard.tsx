import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useRef } from "react";

import { IProject } from "@interfaces";
import defaultImage from "@assets/images/default-img.png";
import "./index.css";

interface IProjectCard {
  project: IProject;
  selectedProject: IProject | null;
  setSelectedProject: (project: IProject) => void;
}

const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className="custom-arrow custom-prev" onClick={(event) => {
    event.stopPropagation(); // Prevents click from bubbling to parent
    onClick?.();
  }}>
    <FaChevronLeft size={25} />
  </div>
);

const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div className="custom-arrow custom-next" onClick={(event) => {
    event.stopPropagation(); // Prevents click from bubbling to parent
    onClick?.();
  }}>
    <FaChevronRight size={25} />
  </div>
);

const ProjectCard: React.FC<IProjectCard> = ({ project, selectedProject, setSelectedProject }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const settings = {
    infinite: project.photos.length > 1,  // Disable infinite loop if only one image
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: project.photos.length > 1 ? <CustomNextArrow /> : undefined, // Hide arrows if only one image
    prevArrow: project.photos.length > 1 ? <CustomPrevArrow /> : undefined, // Hide arrows if only one image
  };

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
      <Slider {...settings} className="location-card-slider">
        {(project.photos.length > 0 ? project.photos : [defaultImage]).map((photo, index) => (
          <div key={index} className="location-card-img-div">
            <img src={photo} alt={`Slide ${index}`} className="location-card-image" />
          </div>
        ))}
      </Slider>
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
