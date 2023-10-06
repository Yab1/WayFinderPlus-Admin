import { Fragment, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClickedMarker, initializeMarkers } from "@/slices";
import { createMarker } from "@/functions";
import Controller from "./Controller";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;

const metaData = {
  center: [39.29039343419677, 8.563261132878523],
  zoom: 15.2,
  pitch: 45,
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

function Map() {
  const { mapStyle, markers, showMarkers } = useSelector(
    (state) => state.mapBox
  );
  const { data } = useSelector((state) => state.buildingData);
  const dispatch = useDispatch();

  const mapContainer = useRef(null);
  const map = useRef(null);

  function dispatcher(markerData) {
    dispatch(setClickedMarker(markerData));
  }

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
  }, []);

  useEffect(() => {
    map.current.setStyle("mapbox://styles/mapbox/" + mapStyle);
  }, [mapStyle]);

  useEffect(() => {
    if (showMarkers) {
      if (markers) {
        markers.forEach((marker) => marker.remove());
        const newMarkers = createMarker(map.current, data, dispatcher);
        dispatch(initializeMarkers(newMarkers));
      } else {
        const newMarkers = createMarker(map.current, data, dispatcher);
        dispatch(initializeMarkers(newMarkers));
      }
    } else {
      if (markers) {
        markers.forEach((marker) => marker.remove());
      }
    }
  }, [map.current, data, showMarkers]);

  return (
    <Fragment>
      <Controller />
      <div ref={mapContainer} className="map-container"></div>;
    </Fragment>
  );
}

Map.displayName = "/src/widgets/layout/Map.jsx";

export default Map;
