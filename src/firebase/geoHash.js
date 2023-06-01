import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import StyledCard from "../shared/card";
import EditorWindow from "../shared/editorWindow";
import mapboxgl from "mapbox-gl";

function MapEditor() {
  const [coordinates, setCoordinates] = useState({
    longitude: null,
    latitude: null,
  });
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWZyb2hhYmVzaGEiLCJhIjoiY2xnb3F0cDYzMGYzNjNlb2d2dXhtdzRqbSJ9.JW2kyDZjoOWoXVPG5Giw7g";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v10",
      center: [39.29039343419677, 8.563261132878523],
      zoom: 16,
    });
    const marker = new mapboxgl.Marker();
    map.on("click", (event) => {
      const { lng, lat } = event.lngLat;
      marker.setLngLat([lng, lat]).addTo(map);
      setCoordinates(() => ({ longitude: lng, latitude: lat }));
      console.log(`Clicked coordinates: ${lng}, ${lat}`);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <StyledCard>
      <div id="map" style={{ minWidth: "100%", minHeight: "100%" }}></div>;
      <EditorWindow coordinates={coordinates} />
    </StyledCard>
  );
}

export default MapEditor;
