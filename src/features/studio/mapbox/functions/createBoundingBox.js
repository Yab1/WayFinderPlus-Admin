function createBoundingBox(polygonCoordinates) {
  let minLat = Number.MAX_VALUE;
  let maxLat = -Number.MAX_VALUE;
  let minLong = Number.MAX_VALUE;
  let maxLong = -Number.MAX_VALUE;

  for (let i = 0; i < polygonCoordinates.length; i++) {
    const [long, lat] = polygonCoordinates[i];
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLong = Math.min(minLong, long);
    maxLong = Math.max(maxLong, long);
  }

  const southwest = [minLong, minLat];
  const northeast = [maxLong, maxLat];

  // const southwest = [minLong, minLat];
  // const northeast = [maxLong, maxLat];

  return [southwest, northeast];
}

export default createBoundingBox;
