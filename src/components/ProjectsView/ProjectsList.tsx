import React from "react";
import { IProject } from "@interfaces";
import ProjectCard from "./ProjectCard";
import "./index.css";

interface IProjectsList {
  pins: IProject[],
  selectedProject: IProject | null;
  setSelectedProject: (project: IProject) => void,
  isListView: boolean
};

const ProjectsList: React.FC<IProjectsList> = ({
  pins,
  selectedProject,
  setSelectedProject,
  isListView
}) => {
  return (
    <div className={!isListView ? "locations-list" : ""}>
      {pins.length ? (
        <div className={isListView ? "grid-container" : "map-list"}>
          {pins.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            />
          ))}
        </div>
      ) : (
        <div className="no-project-text">No Project Found</div>
      )}
    </div>
  );
};

export default ProjectsList;
