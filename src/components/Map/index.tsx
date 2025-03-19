import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import mapboxgl, { FullscreenControl } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ImageSlider from "@components/ProjectsView/ImageSlider";
import { IProject } from "@interfaces";
import luseoFlagMarker from "@assets/images/luseoFlag.png";
import defaultImage from "@assets/images/default-img.png";
import "./index.css"

mapboxgl.accessToken = import.meta.env.VITE_REACT_APP_MAP_API_KEY;


interface IMapComponent {
  pins: IProject[];
  selectedProject?: IProject | null;
  setSelectedProject: (project: IProject | null) => void;
}

const MapComponent: React.FC<IMapComponent> = ({ pins, selectedProject, setSelectedProject }) => {
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

    // Add Geolocation Control
    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "top-left"
    );

    // Add Fullscreen Control
    mapRef.current.addControl(new FullscreenControl(), "top-left");

    // Add Zoom and Rotation Controls
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const initializeStyles = () => {
      const adminLayers = [
        "admin-0-boundary",
        "admin-1-boundary",
        "admin-0-boundary-disputed",
        "admin-1-boundary-bg",
        "admin-0-boundary-bg",
      ];

      //set boundaries according to the moroccan worldview
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

      //hide western sahara label
      map.setPaintProperty("country-label", "text-opacity", [
        "case",
        ["==", ["get", "name_en"], "Western Sahara"],
        0, // Hide this label
        1, // Keep others visible
      ]);

      //change label names to french
      const labelLayers = [
        "country-label",
        "state-label",
        "place-label",
        "settlement-label",
        "settlement-subdivision-label",
        "water-point-label",
      ];

      labelLayers.forEach(layer => {
        if (map.getLayer(layer)) {
          map.setLayoutProperty(layer, "text-field", ["get", "name_fr"]);
        }
      });
    }

    const initializeMap = () => {
      //remove existing markers
      document.querySelectorAll(".mapboxgl-marker").forEach(marker => marker.remove());

      if (pins.length === 0) return;

      // Create a bounding box
      const bounds = new mapboxgl.LngLatBounds();

      // Add markers for each pin
      pins.forEach((pin) => {
        bounds.extend(pin.coordinates); // Extend bounds to include this pin

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
          flyToProject(mapRef.current, pin, setSelectedProject);
        });

        new mapboxgl.Marker(el, {
          anchor: "bottom", // Ensures tip stays at the location
          offset: [20, 10], // Moves the marker tip stays in place
        })
          .setLngLat(pin.coordinates)
          .addTo(map);
      });

      if (pins.length > 1) {
        map.fitBounds(bounds, {
          padding: 50, // Padding around the edges
          maxZoom: 12, // Prevent zooming in too much
        });
      } else if (pins.length === 1) {
        // If only one pin, zoom into it
        map.flyTo({ center: pins[0]?.coordinates, zoom: 12 });
      }
    };

    if (map.loaded()) {
      initializeMap();
    } else {
      map.on("load", initializeMap);
      map.on("styledata", initializeStyles)
    }
  }, [pins, setSelectedProject]);

  useEffect(() => {
    if (!mapRef.current || selectedProject === undefined) return;
    const project = pins.find((pin) => pin.id === selectedProject?.id);
    if (project) flyToProject(mapRef.current, project, setSelectedProject);
  }, [selectedProject]);

  return <div ref={mapContainer} className="mapRef-container" />;
};

// Function to add popup (only for desktop)
const addPopup = (map: mapboxgl.Map, project: IProject,
  setSelectedProject: (project: IProject | null) => void) => {

  const { coordinates, name, photos, description, area, architect, category } = project;

  // Remove existing popups
  document.querySelectorAll(".mapboxgl-popup").forEach((popup) => popup.remove());

  const popupContainer = document.createElement("div");
  const popupContent = `
    <div>
      <div style="display: flex; justify-content: center; font-size: 17px; color: #e6ae44; font-weight: 700; padding: 5px 0px;">
        ${name}
      </div>
      <div style="display: flex; font-family: Helvetica, Arial, sans-serif">
      <div id="popup-slider-container" style="width: 170px;"></div>
      <div style="padding: 10px 24px;">
        <div style="margin-bottom: 10px;">
          <h3 style="color: #fff; font-size: 13px; font-weight: 600;">SCOPE</h3>
          <p style="color: #fff; font-size: 12px;">${description}</p>
        </div>
        <div>
          <h3 style="color: #fff; font-size: 13px; font-weight: 600; margin-bottom:5px;">PROJECT DETAILS</h3>
          <p style="color: #fff; font-size: 10px;"><strong>ARCHITECT:</strong> ${architect || 'N/A'}</p>
          <p style="color: #fff; font-size: 10px;"><strong>SIZE:</strong> ${area || 'N/A'}</p>
          <p style="color: #fff; font-size: 10px;"><strong>CATEGORY:</strong> ${category || 'N/A'}</p>
        </div>
      </div>
      </div>
    </div>
  `;

  popupContainer.innerHTML = popupContent;

  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    offset: [0, -70],
  })
    .setLngLat(coordinates)
    .setDOMContent(popupContainer)
    .on("close", () => {
      setSelectedProject(null);
    });

  popup.addTo(map);

  //add slider component to the popup
  setTimeout(() => {
    const sliderContainer = document.getElementById("popup-slider-container");
    if (sliderContainer) {
      const sliderRoot = ReactDOM.createRoot(sliderContainer);
      sliderRoot.render(<ImageSlider photos={photos.length > 0 ? photos : [defaultImage]} photoHeight="150px" />);
    }
  }, 0);
};

const flyToProject = (
  map: mapboxgl.Map | null,
  project: IProject,
  setSelectedProject: (project: IProject | null) => void
) => {
  if (!map) return;
  const { coordinates } = project;

  // Detect if user is on a mobile device (adjust threshold as needed)
  const isMobile = window.innerWidth <= 768;

  // Fly to project location
  const currentZoom = map.getZoom();
  //to check whether we want to stop the map to fly for a pin that is already in the bbox of the map.
  const currentCenter = map.getCenter();
  const distance = Math.sqrt(
    Math.pow(currentCenter.lng - coordinates[0], 2) + Math.pow(currentCenter.lat - coordinates[1], 2)
  );

  // Offset latitude slightly downward to move the marker lower in the viewport
  const latOffset = 0.002;
  const adjustedCoordinates = [coordinates[0], coordinates[1] + latOffset];

  // Fly to project unless already near the location
  if (currentZoom <= 13 || distance > 0.005) {
    map.flyTo({
      center: adjustedCoordinates as [number, number],
      essential: true,
      zoom: 15,
      duration: 4000,
      easing: (t) => t,
    });

    if (!isMobile) {
      map.once("idle", () => {
        addPopup(map, project, setSelectedProject);
      });
    }
  } else {
    if (!isMobile) {
      addPopup(map, project, setSelectedProject);
    }
  }
}

export default MapComponent;
