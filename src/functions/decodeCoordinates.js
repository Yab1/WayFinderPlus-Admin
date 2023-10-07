import decodeGeoHash from "@/services/firebase/decodeGeoHash";
import formatDate from "./formatDate";

export default function decodeCoordinates(buildingsData) {
  let decodedData = [];
  if (buildingsData.length > 0) {
    buildingsData.map((building) => {
      const { latitude, longitude } = decodeGeoHash(building.geoHash);
      decodedData.push({
        id: building.id,
        buildingName: building.buildingName,
        buildingNumber: building.buildingNumber,
        buildingCategory: building.buildingCategory,
        buildingDescription: building.buildingDescription,
        coordinates: {
          latitude: latitude,
          longitude: longitude,
        },
        created_at: formatDate(building.created_at),
      });
    });
  }
  return decodedData;
}
