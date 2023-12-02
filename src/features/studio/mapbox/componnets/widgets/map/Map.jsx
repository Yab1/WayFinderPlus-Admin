import {
  Map,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
  Layer,
} from "react-map-gl";
import Main from "./Main";
import { useSelector } from "react-redux";
import { StyleControl } from "@/features/studio/mapbox/componnets/controls";

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

function MapBox({ children }) {
  const { isDrawerOpen } = useSelector((state) => state.ui);
  const { mapConfig, mapStyle } = useSelector((state) => state.mapBox);

  return (
    <Main open={isDrawerOpen}>
      <Map
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: mapConfig.longitude,
          latitude: mapConfig.latitude,
          zoom: mapConfig.zoom,
          maxBounds: mapConfig.bounds,
          minZoom: mapConfig.minZoom,
          pitch: 50,
        }}
        style={{ width: "100%", height: "100vh" }}
        mapStyle={"mapbox://styles/mapbox/" + mapStyle}
        mapboxAccessToken={process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}
        attributionControl={false}
      >
        {children}

        <Layer {...layer} />
        <StyleControl />
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
        <ScaleControl />
      </Map>
    </Main>
  );
}

MapBox.displayName = "/src/features/MapBox/MapBox.jsx";

export default MapBox;
