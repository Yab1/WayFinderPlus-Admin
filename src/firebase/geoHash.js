import React, { useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { encode, decode } from "ngeohash";

mapboxgl.accessToken = "<YOUR_MAPBOX_ACCESS_TOKEN>";

const MapboxComponent = () => {
  const mapContainerRef = useRef(null);
  const markers = useRef([]);
  const [geohash, setGeohash] = useState("");

  const handleMapClick = (e) => {
    const { lng, lat } = e.lngLat;
    const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
    markers.current.push(marker);

    if (markers.current.length === 2) {
      const coordinates = markers.current.map((marker) => marker.getLngLat());
      const geohash = generateGeohash(coordinates);
      setGeohash(geohash);
      shadeAreaBetweenMarkers(coordinates);
    }
  };

  const generateGeohash = (coordinates) => {
    const geohashCoordinates = coordinates.map((coord) => ({
      latitude: coord.lat,
      longitude: coord.lng,
    }));
    return encode(
      geohashCoordinates[0].latitude,
      geohashCoordinates[0].longitude,
      9
    );
  };

  const shadeAreaBetweenMarkers = (coordinates) => {
    const [coord1, coord2] = coordinates;
    const bounds = new mapboxgl.LngLatBounds(coord1, coord2);
    map.fitBounds(bounds, { padding: 50 });

    const polygon = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [coord1.lng, coord1.lat],
            [coord1.lng, coord2.lat],
            [coord2.lng, coord2.lat],
            [coord2.lng, coord1.lat],
            [coord1.lng, coord1.lat],
          ],
        ],
      },
    };

    map.addSource("polygon", {
      type: "geojson",
      data: polygon,
    });

    map.addLayer({
      id: "polygon",
      type: "fill",
      source: "polygon",
      paint: {
        "fill-color": "rgba(0, 0, 255, 0.3)",
        "fill-outline-color": "rgba(0, 0, 255, 1)",
      },
    });
  };

  const initializeMap = () => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-74.5, 40], // Initial center coordinates
      zoom: 9, // Initial zoom level
    });

    map.on("click", handleMapClick);
    return map;
  };

  const map = initializeMap();

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />
      {geohash && <div>Generated Geohash: {geohash}</div>}
    </div>
  );
};

export default MapboxComponent;
