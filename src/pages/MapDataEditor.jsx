import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleController } from "@/widgets/layout";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function MapDataEditor() {
  const { metaData, mapStyle, layer } = useSelector((state) => state.mapBox);
  const dispatch = useDispatch();

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;
    const mapBox = new mapboxgl.Map({ ...metaData });
    mapBox.setStyle("mapbox://styles/mapbox/" + mapStyle);

    const nav = new mapboxgl.NavigationControl();
    mapBox.addControl(nav, "bottom-right");

    mapBox.on("style.load", () => {
      const layers = mapBox.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      ).id;
      mapBox.addLayer(layer, labelLayerId);
    });

    return () => {
      mapBox.remove();
    };
  }, [mapStyle]);

  return (
    <Fragment>
      <StyleController />
      <div id="mapBox"></div>
    </Fragment>
  );
}

MapDataEditor.displayName = "/src/pages/MapDataEditor.jsx";

export default MapDataEditor;
