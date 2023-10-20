function removeExistingMarker(markers) {
  if (markers) {
    markers.forEach((marker) => {
      marker.remove();
    });
  }
}

export default removeExistingMarker;
