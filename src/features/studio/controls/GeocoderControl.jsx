import { useState } from "react";
import { useControl, Marker, ControlPosition } from "react-map-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

function GeocoderControl(props) {
  const [marker, setMarker] = useState(null);

  const geocoder = useControl(
    () => {
      const ctrl = new MapboxGeocoder({
        marker: false,
        accessToken: process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN,
      });
      ctrl.on("loading", props.onLoading);
      ctrl.on("results", props.onResults);
      ctrl.on("result", (evt) => {
        props.onResult(evt);

        const { result } = evt;
        const location =
          result &&
          (result.center ||
            (result.geometry?.type === "Point" && result.geometry.coordinates));
        if (location && props.marker) {
          const markerProps =
            typeof props.marker === "object" ? props.marker : {};
          setMarker(
            <Marker
              {...markerProps}
              longitude={location[0]}
              latitude={location[1]}
            />
          );
        } else {
          setMarker(null);
        }
      });
      ctrl.on("error", props.onError);
      return ctrl;
    },
    {
      position: "top-left",
    }
  );

  return <div>GeocoderControl</div>;
}

GeocoderControl.displayName =
  "/src/features/studio/controls/GeocoderControl.jsx";

export default GeocoderControl;
