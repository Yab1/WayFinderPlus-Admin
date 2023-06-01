import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

function MapEditor() {
  const [coordinates, setCoordinates] = useState({
    marker1: null,
    marker2: null,
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
    let marker1 = null;
    let marker2 = null;

    map.on("click", (event) => {
      const { lng, lat } = event.lngLat;
      if (!marker1) {
        marker1 = new mapboxgl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(map);
        setCoordinates((prevState) => ({
          ...prevState,
          marker1: [lng, lat],
        }));
        console.log(`Clicked coordinates for Marker 1: ${lng}, ${lat}`);
      } else if (!marker2) {
        marker2 = new mapboxgl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(map);
        setCoordinates((prevState) => ({
          ...prevState,
          marker2: [lng, lat],
        }));
        console.log(`Clicked coordinates for Marker 2: ${lng}, ${lat}`);
        shadeAreaBetweenMarkers(marker1.getLngLat(), marker2.getLngLat());
      }
    });

    const shadeAreaBetweenMarkers = (coord1, coord2) => {
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

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ minWidth: "100%", minHeight: "100%" }}></div>;
}

export default Map;
