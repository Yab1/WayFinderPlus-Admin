import mapboxgl from "mapbox-gl";

export default function createMarker(map, data, dispatcher) {
  if (map) {
    const newMarkers = data.map((building) => {
      const markerElement = document.createElement("span");
      markerElement.id = building.id;
      markerElement.className = "marker";

      const buildingNumberElement = document.createElement("span");
      buildingNumberElement.className = "buildingNumberElement";
      buildingNumberElement.id = building.id;

      if (building.buildingNumber) {
        buildingNumberElement.innerHTML = building.buildingNumber;
        markerElement.appendChild(buildingNumberElement);
      }

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([
          building.coordinates.longitude,
          building.coordinates.latitude,
        ])
        .addTo(map);

      marker.getElement().addEventListener("click", () => {
        dispatcher(building);
      });

      return marker;
    });
    map.on("zoom", () => {
      const currentZoom = map.getZoom();
      const zoomThreshold = 15.483005466588104;

      if (currentZoom <= zoomThreshold) {
        newMarkers.forEach((marker) => {
          marker.getElement().style.display = "none";
        });
      } else {
        newMarkers.forEach((marker) => {
          marker.getElement().style.display = "block";
        });
      }
    });
    return newMarkers;
  }
}
