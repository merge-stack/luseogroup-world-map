import { IProject } from "@src/interfaces";
import ProjectCard from "./ProjectCard";

interface IListViewProps {
  pins: IProject[];
  setSelectedProject: (project: IProject) => void;
}

const ListView: React.FC<IListViewProps> = ({ pins, setSelectedProject }) => {
  return (
    <div className="list-view-container">
      {pins.length ? (
        <div className="grid-container">
          {pins.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
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

export default ListView;
