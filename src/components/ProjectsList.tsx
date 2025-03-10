import React from "react";
import { IProject } from "@src/constants";
import ProjectCard from "./ProjectCard";

type ProjectsListProps = {
  pins: IProject[],
  setSelectedProject: (project: IProject) => void,
};

const ProjectsList: React.FC<ProjectsListProps> = ({
  pins,
  setSelectedProject,
}) => {
  return (
    <div className="locations-list">
      {pins.length ? (
        pins.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            setSelectedProject={setSelectedProject}
          />
        ))
      ) : (
        <div className="no-project-text">No Project Found</div>
      )}
    </div>
  );
};

export default ProjectsList;
