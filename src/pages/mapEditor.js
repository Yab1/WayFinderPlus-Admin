import { useEffect, useState, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import StyledCard from "../shared/card";
import EditorWindow from "../shared/editorWindow";
import mapboxgl from "mapbox-gl";
import getGeohash from "../services/firebase/geoHash";

function MapEditor() {
  const [poi, setPoi] = useState({
    url: "",
    geoHash: "",
    buildingNumber: "",
    buildingCategory: "",
    buildingName: "",
    buildingDescription: "",
  });

  const marker = useRef(null);
  const handlePoi = (value) => {
    setPoi(value);
  };

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [39.29039343419677, 8.563261132878523],
      zoom: 16,
    });

    const createMarker = (e) => {
      const { lng, lat } = e.lngLat;
      if (marker.current) {
        marker.current.remove();
      }
      const newMarker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      marker.current = newMarker;
      if (lng && lat) {
        const hash = getGeohash(lat, lng);
        setPoi((prevPoi) => ({ ...prevPoi, geoHash: hash }));
      }
    };
    map.on("click", createMarker);

    return () => {
      map.off("click", createMarker);
      map.remove();
    };
  }, []);

  return (
    <StyledCard>
      <div id="map" style={{ minWidth: "100%", minHeight: "100%" }}></div>;
      <EditorWindow poi={poi} marker={marker.current} handlePoi={handlePoi} />
    </StyledCard>
  );
}

export default MapEditor;
