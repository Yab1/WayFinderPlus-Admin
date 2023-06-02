import Geohash from "latlon-geohash";

export default function getGeohash(latitude, longitude) {
  const geohash = Geohash.encode(latitude, longitude);
  return geohash;
}
