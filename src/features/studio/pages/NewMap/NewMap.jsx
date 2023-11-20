import { Fragment, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;

const metaData = {
  center: [39.7823, 9.145],
  zoom: 5.3,
  pitch: 4,
  attributionControl: false,
};

const layer = {
  id: "add-3d-buildings",
  source: "composite",
  "source-layer": "building",
  filter: ["==", "extrude", "true"],
  type: "fill-extrusion",
  minzoom: 15,
  paint: {
    "fill-extrusion-color": "#aaa",
    "fill-extrusion-height": [
      "interpolate",
      ["linear"],
      ["zoom"],
      15,
      0,
      15.05,
      ["get", "height"],
    ],
    "fill-extrusion-base": [
      "interpolate",
      ["linear"],
      ["zoom"],
      15,
      0,
      15.05,
      ["get", "min_height"],
    ],
    "fill-extrusion-opacity": 0.6,
  },
};

function NewMap() {
  const { mapStyle } = useSelector((state) => state.mapBox);

  const ethiopiaBounds = [
    [32.95418, 3.42206], // Southwest coordinates of Ethiopia
    [47.78942, 14.95943], // Northeast coordinates of Ethiopia
  ];

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      ...metaData,
      container: mapContainer.current,
    });

    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, "bottom-right");

    map.current.on("style.load", () => {
      const layers = map.current.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;
      map.current.addLayer(layer, labelLayerId);
    });

    map.current.fitBounds(ethiopiaBounds, {
      padding: 20, // Adjust the padding as needed
      duration: 0, // Instantly fit the bounds without animation
    });
  }, []);

  useEffect(() => {
    map.current.setStyle("mapbox://styles/mapbox/" + mapStyle);
  }, [mapStyle]);

  return (
    <Fragment>
      <div ref={mapContainer} className="map-container"></div>;
    </Fragment>
  );
}

NewMap.displayName = "/src/features/studio/pages/NewMap/NewMap.jsx";

export default NewMap;
