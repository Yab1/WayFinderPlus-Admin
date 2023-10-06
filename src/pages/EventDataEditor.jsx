import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleController } from "@/widgets/layout";
import { createMarker } from "@/functions";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function EventDataEditor() {
  const { metaData, mapStyle, layer } = useSelector((state) => state.mapBox);
  const { data } = useSelector((state) => state.buildingData);
  const dispatch = useDispatch();

  function dispatcher(markerData) {
    //  dispatch(setClickedMarker(markerData));
  }

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;
    const mapBox = new mapboxgl.Map({ ...metaData });
    mapBox.setStyle("mapbox://styles/mapbox/" + mapStyle);

    const nav = new mapboxgl.NavigationControl();
    mapBox.addControl(nav, "bottom-right");

    mapBox.on("style.load", () => {
      createMarker(mapBox, data, dispatcher);

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

EventDataEditor.displayName = "/src/pages/EventDataEditor.jsx";

export default EventDataEditor;
