import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PropTypes from "prop-types";
import luseoFlagMarker from "../assets/luseoFlag.png";

mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAP_API_KEY;

const MapComponent = ({ pins, selectedProject, setSelectedProject }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const WORLD_VIEW = "MA"; // Morocco's ISO code for worldview filtering

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-28.006, 36.7128],
      zoom: 2,
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const initializeMap = () => {
      // Apply worldview filter to admin boundaries
      const adminLayers = [
        "admin-0-boundary",
        "admin-1-boundary",
        "admin-0-boundary-disputed",
        "admin-1-boundary-bg",
        "admin-0-boundary-bg",
        "country-label",
      ];

      adminLayers.forEach((layerName) => {
        if (map.getLayer(layerName)) {
          map.setFilter(layerName, [
            "match",
            ["get", "worldview"],
            ["all", WORLD_VIEW], // Show only features matching Morocco' worldview
            true,
            false,
          ]);
        }
      });

      // Remove any existing markers
      const existingMarkers =
        document.getElementsByClassName("mapboxgl-marker");
      Array.from(existingMarkers).forEach((marker) => marker.remove());

      // Add markers for each pin
      pins.forEach((pin) => {
        // Create a DOM element for each marker
        const el = document.createElement("div");
        el.className = "custom-marker";
        el.style.backgroundImage = `url(${luseoFlagMarker})`; // Use the imported image
        el.style.width = "60px";
        el.style.height = "120px";
        el.style.backgroundSize = "100%";
        el.style.backgroundRepeat = "no-repeat";
        el.style.backgroundPosition = "center";
        el.style.cursor = "pointer";

        // Add click event to marker
        el.addEventListener("click", () => {
          const project = {
            geometry: { coordinates: pin.coordinates },
            properties: { ...pin, projectDetails: pin.projectDetails },
          };
          flyToProject(mapRef, project);
        });

        // Add marker to map
        new mapboxgl.Marker(el).setLngLat(pin.coordinates).addTo(map);
      });
    };

    if (map.loaded()) {
      initializeMap();
    } else {
      map.on("load", initializeMap);
    }
  }, [pins, setSelectedProject]);

  useEffect(() => {
    if (mapRef.current && selectedProject) {
      const project = pins.find((pin) => pin.id === selectedProject);
      project.geometry = { coordinates: project.coordinates };
      project.properties = { ...project };

      flyToProject(mapRef, project);
    }
  }, [selectedProject]);

  return <div ref={mapContainer} className="mapRef-container" />;
};

const flyToProject = (mapRef, project) => {
  const coordinates = project.geometry.coordinates.slice();
  const properties = project.properties;

  // Create popup content
  const popupContent = `
    <div>
      <div style="
        display: flex;
        width: 100%;
        margin: 20px 0px;
        justify-content: center;
        font-size: 19px;
        color: #e6ae44;
        font-weight: 700;
      ">${properties.name}</div>
      <div style="display: flex; width: 100%; font-family: 'Helvetica Neue', Arial, sans-serif; overflow: hidden;">
        <img src="${properties.image}" alt="Resort View" style="width: 300px; height: 230px; object-fit: cover;">
        <div style="padding: 0px 24px;">
          <div style="margin-bottom: 10px;">
            <h3 style="margin: 0 0 6px; color: #fff; font-size: 17px; font-weight: 600;">SCOPE</h3>
            <p style="margin: 0; color: #fff; font-size: 16px; line-height: 1.6;">${properties.scope}</p>
          </div>
          <div>
            <h3 style="margin: 0 0 6px; color: #fff; font-size: 17px; font-weight: 600;">PROJECT DETAILS</h3>
            <p style="margin: 0 0 4px; color: #fff; font-size: 16px; line-height: 1.6;">
              <strong style="color: #fff;">ARCHITECT:</strong> ${properties.projectDetails.architect}
            </p>
            <p style="margin: 0 0 4px; color: #fff; font-size: 16px; line-height: 1.6;">
              <strong style="color: #fff;">SIZE:</strong> ${properties.projectDetails.size}
            </p>
            <p style="margin: 0; color: #fff; font-size: 16px; line-height: 1.6;">
              <strong style="color: #fff;">CATEGORY:</strong> ${properties.projectDetails.category}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Create a popup but don't add it to the map yet
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
  });

  // Fly to the point and show popup after movement ends
  mapRef.current.flyTo({
    center: coordinates,
    essential: true,
    zoom: 15,
    duration: 4000, // Animation duration in milliseconds (1 second)
    easing: (t) => t, // Linear easing for faster, direct movement
  });

  // Listen for the moveend event to show the popup
  const showPopupOnMoveEnd = () => {
    popup.setLngLat(coordinates).setHTML(popupContent).addTo(mapRef.current);
    mapRef.current.off("moveend", showPopupOnMoveEnd);
  };

  mapRef.current.on("moveend", showPopupOnMoveEnd);
};

MapComponent.propTypes = {
  pins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      scope: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      projectDetails: PropTypes.shape({
        architect: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  selectedProject: PropTypes.number,
  setSelectedProject: PropTypes.func.isRequired,
};

export default MapComponent;
