import { useEffect } from "react";
import decodeGeoHash from "../services/firebase/decodeGeoHash";

export default function CustomData({ buildingsData, handleCoordinates }) {
  useEffect(() => {
    buildingsData !== [] &&
      buildingsData.map((building) => {
        const { latitude, longitude } = decodeGeoHash(building.geoHash);
        handleCoordinates(building.id, latitude, longitude);
      });
  }, [buildingsData]);
  return <></>;
}
