import mapboxgl from "mapbox-gl";

export default function createMarker(map, id, latitude, longitude) {
  const markerElement = document.createElement("div");
  markerElement.id = id;
  markerElement.className = "marker";

  const marker = new mapboxgl.Marker(markerElement)
    .setLngLat([longitude, latitude])
    .addTo(map);

  return marker;
}
