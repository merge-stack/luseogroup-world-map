import PropTypes from "prop-types";
import LocationCard from "./LocationCard";

const ProjectsList = ({ pins, setSelectedProject }) => {
  return (
    <div className="locations-list">
      {pins.length ? (
        pins.map((location) => (
          <LocationCard
            key={location.id}
            location={location}
            setSelectedProject={setSelectedProject}
          />
        ))
      ) : (
        <div className="no-project-text">No Project Found</div>
      )}
    </div>
  );
};

ProjectsList.propTypes = {
  setSelectedProject: PropTypes.func.isRequired,
  pins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })
  ).isRequired,
};

export default ProjectsList;
