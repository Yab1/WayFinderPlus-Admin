import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import StyledCard from "../shared/card";
import EditorWindow from "../shared/editorWindow";
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

    const updateShading = () => {
      if (marker1 && marker2) {
        shadeAreaBetweenMarkers(marker1.getLngLat(), marker2.getLngLat());
      }
    };

    map.on("click", (event) => {
      const { lng, lat } = event.lngLat;
      if (!marker1) {
        marker1 = new mapboxgl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(map);
        marker1.on("dragend", updateShading);
        setCoordinates((prevState) => ({
          ...prevState,
          marker1: [lng, lat],
        }));
        console.log(`Clicked coordinates for Marker 1: ${lng}, ${lat}`);
      } else if (!marker2) {
        marker2 = new mapboxgl.Marker({ draggable: true })
          .setLngLat([lng, lat])
          .addTo(map);
        marker2.on("dragend", updateShading);
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
      map.fitBounds(bounds, { padding: 200 });

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

      // // Calculate geohash for shaded area
      // const minLat = Math.min(coord1.lat, coord2.lat);
      // const maxLat = Math.max(coord1.lat, coord2.lat);
      // const minLng = Math.min(coord1.lng, coord2.lng);
      // const maxLng = Math.max(coord1.lng, coord2.lng);

      // const geohashLocation = geohash.encode(minLat, minLng, 9);
      // console.log("Geohash location:", geohashLocation);

      // Remove existing polygon layer if present
      if (map.getLayer("polygon")) {
        map.removeLayer("polygon");
      }
      // Remove existing polygon source if present
      if (map.getSource("polygon")) {
        map.removeSource("polygon");
      }

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

  return (
    <StyledCard>
      <div id="map" style={{ minWidth: "100%", minHeight: "100%" }}></div>
      <EditorWindow coordinates={coordinates} />
    </StyledCard>
  );
}

export default MapEditor;

// function calculateGeohash(coord1, coord2) {
//   // Calculate the bounding box coordinates
//   const minLng = Math.min(coord1.lng, coord2.lng);
//   const maxLng = Math.max(coord1.lng, coord2.lng);
//   const minLat = Math.min(coord1.lat, coord2.lat);
//   const maxLat = Math.max(coord1.lat, coord2.lat);

//   // Calculate the center coordinates of the bounding box
//   const centerLng = (minLng + maxLng) / 2;
//   const centerLat = (minLat + maxLat) / 2;

//   // Calculate the Geohash value for the center coordinates
//   const geohash = Geohash.encode(centerLat, centerLng);

//   return geohash;
// }
