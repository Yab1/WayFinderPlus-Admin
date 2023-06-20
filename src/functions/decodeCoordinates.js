import decodeGeoHash from "../services/firebase/decodeGeoHash";
import categories from "../utils/categories";

export default function decodeCoordinates(buildingsData) {
  let decodedData = [];
  if (buildingsData !== []) {
    buildingsData.map((building) => {
      const { latitude, longitude } = decodeGeoHash(building.geoHash);
      const filteredCat = categories.filter(
        (category) => category.value === building.buildingCategory
      );
      decodedData.push({
        id: building.id,
        icon: filteredCat[0].icon,
        buildingName: building.buildingName,
        buildingNumber: building.buildingNumber,
        buildingCategory: building.buildingCategory,
        buildingDescription: building.buildingDescription,
        coordinates: {
          latitude: latitude,
          longitude: longitude,
        },
      });
    });
  }
  return decodedData;
}
