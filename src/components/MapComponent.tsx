import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import luseoFlagMarker from "../assets/luseoFlag.png";
import { IProject } from "@src/constants";

mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAP_API_KEY;

interface MapComponentProps {
  pins: IProject[];
  selectedProject?: IProject | null;
  setSelectedProject: (project: IProject) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ pins, selectedProject, setSelectedProject }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const WORLD_VIEW = "MA"; // Morocco's ISO code for worldview filtering

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-28.006, 36.7128],
      zoom: 1.9,
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const initializeMap = () => {
      const adminLayers = [
        "admin-0-boundary",
        "admin-1-boundary",
        "admin-0-boundary-disputed",
        "admin-1-boundary-bg",
        "admin-0-boundary-bg",
      ];

      adminLayers.forEach((layerName) => {
        if (map.getLayer(layerName)) {
          map.setFilter(layerName, [
            "match",
            ["get", "worldview"],
            ["all", WORLD_VIEW],
            true,
            false,
          ]);
        }
      });

      map.setPaintProperty("country-label", "text-opacity", [
        "case",
        ["==", ["get", "name_en"], "Western Sahara"],
        0, // Hide this label
        1, // Keep others visible
      ]);

      document.querySelectorAll(".mapboxgl-marker").forEach(marker => marker.remove());

      pins.forEach((pin) => {
        const el = document.createElement("div");
        el.className = "custom-marker";
        el.style.backgroundImage = `url(${luseoFlagMarker})`;
        el.style.width = "60px";
        el.style.height = "120px";
        el.style.backgroundSize = "100%";
        el.style.backgroundRepeat = "no-repeat";
        el.style.backgroundPosition = "center";
        el.style.cursor = "pointer";

        el.addEventListener("click", () => {
          setSelectedProject(pin);
          flyToProject(mapRef.current, pin);
        });

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
    if (!mapRef.current || selectedProject === undefined) return;
    const project = pins.find((pin) => pin.id === selectedProject?.id);
    if (project) flyToProject(mapRef.current, project);
  }, [selectedProject]);

  return <div ref={mapContainer} className="mapRef-container" />;
};

const flyToProject = (map: mapboxgl.Map | null, project: IProject) => {
  if (!map) return;
  const { coordinates, name, image, scope, projectDetails } = project;

  const popupContent = `
    <div>
      <div style="display: flex; justify-content: center; font-size: 19px; color: #e6ae44; font-weight: 700;">
        ${name}
      </div>
      <div style="display: flex; font-family: Helvetica, Arial, sans-serif;">
        <img src="${image}" alt="Resort View" style="width: 300px; height: 230px; object-fit: cover;">
        <div style="padding: 0px 24px;">
          <div style="margin-bottom: 10px;">
            <h3 style="color: #fff; font-size: 17px; font-weight: 600;">SCOPE</h3>
            <p style="color: #fff; font-size: 16px;">${scope}</p>
          </div>
          <div>
            <h3 style="color: #fff; font-size: 17px; font-weight: 600;">PROJECT DETAILS</h3>
            <p style="color: #fff; font-size: 16px;"><strong>ARCHITECT:</strong> ${projectDetails.architect}</p>
            <p style="color: #fff; font-size: 16px;"><strong>SIZE:</strong> ${projectDetails.size}</p>
            <p style="color: #fff; font-size: 16px;"><strong>CATEGORY:</strong> ${projectDetails.category}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  const popup = new mapboxgl.Popup({ closeButton: true, closeOnClick: false })
    .setLngLat(coordinates)
    .setHTML(popupContent);

  map.flyTo({
    center: coordinates,
    essential: true,
    zoom: 15,
    duration: 4000,
    easing: (t) => t,
  });

  map.once("moveend", () => popup.addTo(map));
};

export default MapComponent;
