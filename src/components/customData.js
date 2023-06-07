import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import decodeGeoHash from "../services/firebase/decodeGeoHash";

import StyledCard from "../shared/card";

export default function CustomData({ buildingsData, handleLocation }) {
  const [map, setMap] = useState(null);
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWZyb2hhYmVzaGEiLCJhIjoiY2xnb3F0cDYzMGYzNjNlb2d2dXhtdzRqbSJ9.JW2kyDZjoOWoXVPG5Giw7g";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v10",
      center: [39.29039343419677, 8.563261132878523],
      zoom: 16,
    });
    setMap(map);
    buildingsData.map((building) => {
      const { latitude, longitude } = decodeGeoHash(building.geoHash);
      handleLocation(building.id, map, latitude, longitude);
    });
    return () => {
      map.remove();
    };
  }, [buildingsData]);
  return (
    <StyledCard>
      <div id="map" style={{ minWidth: "100%", minHeight: "100%" }}></div>
    </StyledCard>
  );
}
