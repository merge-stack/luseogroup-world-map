import { IProject } from "@src/interfaces";

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
          <h3 className="location-card-title">SCOPE</h3>
          <p className="location-card-text">{project.scope}</p>
        </div>
        <div className="location-card-section">
          <h3 className="location-card-title">PROJECT DETAILS</h3>
          <p className="location-card-text">
            <strong>ARCHITECT:</strong> {project.projectDetails.architect}
          </p>
          <p className="location-card-text">
            <strong>SIZE:</strong> {project.projectDetails.size}
          </p>
          <p className="location-card-text">
            <strong>CATEGORY:</strong> {project.projectDetails.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
