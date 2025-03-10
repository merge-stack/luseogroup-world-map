import PropTypes from "prop-types";

const LocationCard = ({ location, setSelectedProject }) => {
  LocationCard.propTypes = {
    setSelectedProject: PropTypes.func.isRequired,
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      scope: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      projectDetails: PropTypes.shape({
        architect: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };
  return (
    <div
      className="location-card"
      onClick={() => setSelectedProject(location.id)}>
      <img
        src={location.image}
        alt="Location View"
        className="location-card-image"
      />
      <div className="location-card-content">
        <div className="location-card-section">
          <h3 className="location-card-title">{location.name}</h3>
          <h3 className="location-card-title">SCOPE</h3>
          <p className="location-card-text">{location.scope}</p>
        </div>
        <div className="location-card-section">
          <h3 className="location-card-title">PROJECT DETAILS</h3>
          <p className="location-card-text">
            <strong>ARCHITECT:</strong> {location.projectDetails.architect}
          </p>
          <p className="location-card-text">
            <strong>SIZE:</strong> {location.projectDetails.size}
          </p>
          <p className="location-card-text">
            <strong>CATEGORY:</strong> {location.projectDetails.category}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
