import { useMap } from "react-map-gl/dist/esm/components/use-map";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompundMiniZoom } from "@/redux/slices";

function MapConfig() {
  const { compundConfig, mapConfig } = useSelector((state) => state.mapBox);
  const dispatch = useDispatch();
  const { current: map } = useMap();

  useEffect(() => {
    if (map) {
      const center = Boolean(compundConfig.bounds)
        ? [compundConfig.longitude, compundConfig.latitude]
        : [mapConfig.longitude, mapConfig.latitude];
      map.flyTo({
        center: [center[0], center[1]],
        zoom: 12.5,
        bearing: 130,
        pitch: 75,
        duration: 12000,
        essential: true,
      });
      map.fitBounds(
        Boolean(compundConfig.bounds) ? compundConfig.bounds : mapConfig.bounds
      );
      setTimeout(() => {
        if (Boolean(compundConfig.bounds))
          dispatch(setCompundMiniZoom(map.getZoom()));
      }, [1200]);
    }
  }, [
    map,
    dispatch,
    mapConfig,
    compundConfig.bounds,
    compundConfig.longitude,
    compundConfig.latitude,
  ]);

  return null;
}

MapConfig.displayName =
  "/src/features/studio/mapbox/componnets/controls/MapConfig.jsx";

export default MapConfig;
