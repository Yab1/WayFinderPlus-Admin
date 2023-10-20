import addPin from "./addPin";

function listenForMarkerClicks(map, markers, data, dispatcherSetClickedMarker) {
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

  markers.forEach((marker) => {
    marker.getElement().addEventListener("click", () => {
      const markerElement = marker.getElement();
      const clickedMarker = data.filter(
        (building) => building.id === markerElement.id
      )[0];

      markerElement.style.display = "none";

      map.flyTo({
        center: [
          clickedMarker.coordinates.longitude,
          clickedMarker.coordinates.latitude,
        ],
        zoom: 20,
        essential: true,
      });

      addPin(
        map,
        clickedMarker.coordinates.longitude,
        clickedMarker.coordinates.latitude
      );

      dispatcherSetClickedMarker(clickedMarker);
    });
  });
}

export default listenForMarkerClicks;
