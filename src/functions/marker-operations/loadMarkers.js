import mapboxgl from "mapbox-gl";

function loadMarkers(data, map, dispatchInitializeMarkers) {
  if (data) {
    const markers = data.map((building) => {
      const markerElement = document.createElement("div");
      markerElement.id = building.id;
      markerElement.className = "marker";

      const label = document.createElement("span");
      label.className = "marker-label";
      label.id = building.id;

      if (building.buildingNumber) {
        label.innerHTML = building.buildingNumber;
        markerElement.appendChild(label);
      }

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([
          building.coordinates.longitude,
          building.coordinates.latitude,
        ])
        .addTo(map);

      return marker;
    });

    dispatchInitializeMarkers(markers);
  }
}

export default loadMarkers;
