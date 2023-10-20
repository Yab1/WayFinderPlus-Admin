import { removeExistingMarker, loadMarkers } from "./marker-operations";

function initMarkerFunctions(
  data,
  map,
  markers,
  showMarkers,
  dispatchInitializeMarkers
) {
  removeExistingMarker(markers);
  if (showMarkers) {
    loadMarkers(data, map, dispatchInitializeMarkers);
  }
}

export default initMarkerFunctions;
