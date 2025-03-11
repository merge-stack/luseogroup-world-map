import { IProject } from "@interfaces";
import "./index.css";

interface IProjectCard {
  project: IProject;
  setSelectedProject: (project: IProject) => void;
}

const ProjectCard: React.FC<IProjectCard> = ({ project, setSelectedProject }) => {
  return (
    <div className="location-card" onClick={() => setSelectedProject(project)}>
      <img src={project.image} alt="Location View" className="location-card-image" />
      <div className="location-card-content">
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
