import mapboxgl from "mapbox-gl";

function createMarker(map, lng, lat) {
  const existingMarkerContainer = document.querySelector(".marker-container");

  if (existingMarkerContainer) {
    existingMarkerContainer.remove();
  }

  const markerContainer = document.createElement("div");
  const dot = document.createElement("div");

  markerContainer.className = "marker-container";
  dot.className = "dot";

  markerContainer.appendChild(dot);

  new mapboxgl.Marker(markerContainer).setLngLat([lng, lat]).addTo(map);
}

export default createMarker;
