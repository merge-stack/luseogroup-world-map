import React from "react";
import { IProject } from "@interfaces";
import ProjectCard from "./ProjectCard";

interface IProjectsList {
  pins: IProject[],
  setSelectedProject: (project: IProject) => void,
};

const ProjectsList: React.FC<IProjectsList> = ({
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
