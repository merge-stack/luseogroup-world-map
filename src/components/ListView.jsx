import LocationCard from "./LocationCard";

const ListView = ({ pins, setSelectedProject }) => {
  return (
    <div className="list-view-container">
      {pins.length ? (
        <div className="grid-container">
          {pins.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
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
