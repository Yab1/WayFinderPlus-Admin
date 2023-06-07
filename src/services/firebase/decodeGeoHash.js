import Geohash from "latlon-geohash";

export default function decodeGeoHash(geohash) {
  const { lat, lon } = Geohash.decode(geohash);
  return { latitude: lat, longitude: lon };
}
