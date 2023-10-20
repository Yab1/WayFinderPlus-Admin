import mapboxgl from "mapbox-gl";

function loadMarkers(data, markers, showMarkers, map, dispatcher) {
  if (data) {
    if (markers) {
      markers.forEach((marker) => marker.remove());
    }

    markers = data.map((building) => {
      const markerElement = document.createElement("div");
      markerElement.id = building.id;
      markerElement.className = "marker";

      const buildingNumberElement = document.createElement("span");
      buildingNumberElement.className = "buildingNumberElement";
      buildingNumberElement.id = building.id;

      if (building.buildingNumber) {
        buildingNumberElement.innerHTML = building.buildingNumber;
        markerElement.appendChild(buildingNumberElement);
      }

      if (showMarkers) {
        markerElement.style.display = "block !important";
      } else {
        markerElement.style.display = "none !important";
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
      const zoomThreshold = 15.2;

      if (currentZoom < zoomThreshold) {
        markers.forEach((marker) => {
          marker.getElement().style.display = "none";
        });
      } else {
        markers.forEach((marker) => {
          marker.getElement().style.display = "block";
        });
      }
    });

    return markers;
  }
}

export default loadMarkers;
// map.flyTo({
//   center: [
//     building.coordinates.longitude,
//     building.coordinates.latitude,
//   ],
//   zoom: 20,
//   essential: true,
// });
