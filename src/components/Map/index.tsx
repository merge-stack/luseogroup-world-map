import { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import mapboxgl, { FullscreenControl } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import ImageSlider from "@components/ProjectsView/ImageSlider";
import { IProject } from "@interfaces";
import luseoPin from "@assets/images/luseo-pin.png";
import { REACT_APP_MAP_API_KEY, REACT_DEFAULT_IMAGE_URL } from "@config";

import "./index.css";

mapboxgl.accessToken = REACT_APP_MAP_API_KEY

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
      map.resize();

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
          map.setFilter(layerName, ["match", ["get", "worldview"], ["all", WORLD_VIEW], true, false]);
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

      labelLayers.forEach((layer) => {
        if (map.getLayer(layer)) {
          map.setLayoutProperty(layer, "text-field", ["get", "name_fr"]);
        }
      });
    };

    const initializeMap = () => {
      //remove existing markers
      document.querySelectorAll(".mapboxgl-marker").forEach((marker) => marker.remove());

      if (pins.length === 0) return;

      // Create a bounding box
      const bounds = new mapboxgl.LngLatBounds();

      // Add markers for each pin
      pins.forEach((pin) => {
        bounds.extend(pin.coordinates); // Extend bounds to include this pin

        const el = document.createElement("div");
        el.className = "custom-marker";
        el.style.backgroundImage = `url(${luseoPin})`;
        el.style.width = "20px";
        el.style.height = "40px";
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
      map.on("styledata", initializeStyles);
    }
  }, [pins, setSelectedProject, selectedProject]);

  useEffect(() => {
    if (!selectedProject) {
      document.querySelectorAll(".mapboxgl-popup").forEach((popup) => popup.remove());
      return;
    }
    if (!mapRef.current) return;
    const project = pins.find((pin) => pin.id === selectedProject?.id);
    if (project) flyToProject(mapRef.current, project, setSelectedProject);
  }, [selectedProject]);

  return <div ref={mapContainer} className="mapRef-container" />;
};

// Function to add popup (only for desktop)
const addPopup = (map: mapboxgl.Map, project: IProject, setSelectedProject: (project: IProject | null) => void) => {
  const { coordinates, name, photos, mission, area, architect, category, city, region, certification, bim } = project;

  // Remove existing popups
  document.querySelectorAll(".mapboxgl-popup").forEach((popup) => popup.remove());

  const popupContainer = document.createElement("div");
  const popupContent = `    
  <div style="display: flex; font-family: Helvetica, Arial, sans-serif; background-color:white" >
    <div id="popup-slider-container" style="width: 325px; flex-shrink: 0;"></div>
      <div style="cursor: pointer; padding: 10px 20px;  color:black" margin-top:10px  width: 250px;    flex-shrink: 0;   overflow: hidden;   white-space: normal;  word-wrap: break-word; >
        <h5 style="font-size: 15px; font-weight: 600; color: #fdb82d;">${name}</h5>
        <span style=" color: black; display: block; font-size: 8px; line-height: 1.9;">${city}, ${region}</span>
        <div style="margin-bottom: 5px;  margin-top: 5px;">
          <h3 style="font-size: 10px; font-weight: 600; color: #fdb82d; margin-bottom: 1px;">MISSION</h3>
          <span style="font-size: 10px; color: black; line-height: 1.5;  margin-bottom: 4px;  display: flex;">${mission || "N/A"}</span>
        </div>
        <div style="margin-bottom: 5px;  margin-top: 5px;">
          <h3 style="font-size: 10px; font-weight: 600; color: #fdb82d;">DÈTAILS</h3>
          <p style="font-size: 7px; color: black; line-height: 1.5;  margin-bottom: 4px;  display: flex;">
            <p style="  margin-right: 3px; font-size: 10px; color: black;"><strong>TYPE DÈ PROJET:</strong> ${category || "N/A"}</p>
          </p>
          <p style="font-size: 7px; color: black; line-height: 1.5;  margin-bottom: 4px;  display: flex;">
              <p style=" margin-top: 3px; margin-right: 3px; font-size: 10px; color: black;"><strong>SURFACE:</strong> ${area || "N/A"}</p>
          </p>
          <p style="font-size: 7px; color: black; line-height: 1.5;  margin-bottom: 4px;  display: flex;">
             <p style=" margin-top: 3px; margin-right: 3px; font-size: 10px; color: black;"><strong>BIM:</strong>${bim || "N/A"}</p>
          </p>
          <p className="font-size: 7px; color: black; line-height: 1.5;  margin-bottom: 4px;  display: flex;">
             <p style=" margin-top: 3px; margin-right: 3px; font-size: 10px; color: black;"><strong>CERTIFICATION:</strong> ${certification || "N/A"
    } </p>
          </p>
          <p className="font-size: 7px; color: black; line-height: 1.5;  margin-bottom: 4px;  display: flex;">
           <p style=" margin-top: 3px; margin-right: 3px; font-size: 10px; color: black;"><strong>ARCHITECTÈ: </strong> ${architect || "N/A"
    } </p>
          </p>
        </div>
      </div>
     </div>
  `;

  popupContainer.innerHTML = popupContent;

  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: false,
    offset: [0, -10],
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
    const textContainer = sliderContainer?.nextElementSibling; // The div containing text
    if (sliderContainer && textContainer) {
      // Get the computed height of the text container
      const textHeight = textContainer.getBoundingClientRect().height;
      // Ensure a minimum height to avoid issues and match the height of the text div
      const photoHeight = textHeight > 0 ? `${textHeight}px` : "250px";
      const sliderRoot = ReactDOM.createRoot(sliderContainer);
      sliderRoot.render(<ImageSlider photos={photos?.length > 0 ? photos : [REACT_DEFAULT_IMAGE_URL]} photoHeight={photoHeight} />);
    }
  }, 0);
};

const flyToProject = (map: mapboxgl.Map | null, project: IProject, setSelectedProject: (project: IProject | null) => void) => {
  if (!map) return;
  const { coordinates } = project;

  // Detect if user is on a mobile device (adjust threshold as needed)
  const isMobile = window.innerWidth <= 768;

  // Fly to project location
  const currentZoom = map.getZoom();
  //to check whether we want to stop the map to fly for a pin that is already in the bbox of the map.
  const currentCenter = map.getCenter();
  const distance = Math.sqrt(Math.pow(currentCenter.lng - coordinates[0], 2) + Math.pow(currentCenter.lat - coordinates[1], 2));

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
};

export default MapComponent;
