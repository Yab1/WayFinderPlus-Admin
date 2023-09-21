import mapboxgl from "mapbox-gl";

export default function createMarker(
  map,
  decodedBuildingData,
  handleMarkerClick
) {
  if (map) {
    const newMarkers = decodedBuildingData.map((markerData) => {
      const markerElement = document.createElement("div");
      markerElement.id = markerData.id;
      markerElement.className = "poi-marker";
      markerElement.style.backgroundImage = `url(${markerData.icon})`;
      markerElement.style.backgroundSize = "contain";
      markerElement.style.backgroundRepeat = "no-repeat";
      markerElement.style.backgroundPosition = "center";
      markerElement.style.width = "16px";
      markerElement.style.height = "16px";

      const buildingNumberElement = document.createElement("div");
      buildingNumberElement.className = "buildingNumberElement";
      buildingNumberElement.id = markerData.id;

      if (markerData.buildingNumber) {
        buildingNumberElement.innerHTML = markerData.buildingNumber;
        markerElement.appendChild(buildingNumberElement);
      }

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([
          markerData.coordinates.longitude,
          markerData.coordinates.latitude,
        ])
        .addTo(map);

      marker.getElement().addEventListener("click", () => {
        handleMarkerClick(markerData.id);
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
