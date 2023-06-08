import mapboxgl from "mapbox-gl";

export default function createMarker(map, coordinates, handleMarkers) {
  const newMarker = coordinates.map((coordinate) => {
    const markerElement = document.createElement("div");
    markerElement.id = coordinate.id;
    markerElement.className = "marker";
    const marker = new mapboxgl.Marker(markerElement)
      .setLngLat([coordinate.longitude, coordinate.latitude])
      .addTo(map);
    return marker;
  });
  handleMarkers(newMarker);
}
