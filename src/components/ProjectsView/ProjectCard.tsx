import { IProject } from "@interfaces";
import "./index.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useEffect, useRef } from "react";

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
    infinite: true, // Loop images
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />, // Custom Next Arrow
    prevArrow: <CustomPrevArrow />, // Custom Prev Arrow
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
        {[...Array(3)].map((_, index) => (
          <div key={index} className="location-card-img-div">
            <img src={project.image} alt={`Slide ${index}`} className="location-card-image" />
          </div>
        ))}
      </Slider>
      <div className="location-card-content" >
        <div className="location-card-section">
          <h3 className="location-card-title">{project.name}</h3>
          <h3 className="location-card-subtitle">SCOPE</h3>
          <p className="location-card-text">{project.scope}</p>
        </div>
        <div className="location-card-section">
          <h3 className="location-card-subtitle">PROJECT DETAILS</h3>
          <p className="location-card-text">
            <h5 className="location-card-text-detail">ARCHITECT: </h5> {project.projectDetails.architect}
          </p>
          <p className="location-card-text">
            <h5 className="location-card-text-detail">SIZE:</h5> {project.projectDetails.size}
          </p>
          <p className="location-card-text">
            <h5 className="location-card-text-detail">CATEGORY:</h5> {project.projectDetails.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
