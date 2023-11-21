import { useCallback, useEffect, useState } from "react";
import {
  Map,
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import { DrawControl } from "@/features/studio/controls";

function NewMap() {
  const [features, setFeatures] = useState({});

  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  useEffect(() => {
    console.log(features);
  }, [features]);

  const bounds = [
    [32.9, 3.3],
    [48.0, 15.0],
  ];

  return (
    <Map
      mapLib={import("mapbox-gl")}
      initialViewState={{
        longitude: 39.7823,
        latitude: 9.145,
        zoom: 5.3,
        pitch: 45,
        maxBounds: bounds,
      }}
      style={{ position: "absolute", inset: 0, zIndex: 10 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}
      attributionControl={false}
    >
      <DrawControl
        displayControlsDefault={false}
        controls={{
          polygon: true,
          trash: true,
        }}
        onCreate={onUpdate}
        onUpdate={onUpdate}
        onDelete={() => console.log("DELETE")}
      />
      <NavigationControl position="bottom-right" />
      <GeolocateControl position="bottom-right" />
      <FullscreenControl position="bottom-right" />
      <ScaleControl />
    </Map>
  );
}

NewMap.displayName = "/src/features/studio/pages/NewMap/NewMap.jsx";

export default NewMap;
