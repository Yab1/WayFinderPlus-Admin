function calculateCenter(polygonCoordinates) {
  let sumX = 0;
  let sumY = 0;
  const len = polygonCoordinates.length;

  for (let i = 0; i < len; i++) {
    sumX += polygonCoordinates[i][0];
    sumY += polygonCoordinates[i][1];
  }

  const centerX = sumX / len;
  const centerY = sumY / len;

  return [centerX, centerY];
}

export default calculateCenter;
