import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Map } from "@/widgets/layout";
import { MapDataEntry, CategoriesCard } from "@/widgets/cards";
import { getCoordinates } from "@/slices";
import { addPin } from "@/functions/marker-operations";

function MapDataEditor() {
  const { map } = useSelector((state) => state.mapBox);
  const dispatch = useDispatch();

  useEffect(() => {
    if (map) {
      map.on("click", (e) => {
        const { lat, lng } = e.lngLat.wrap();
        addPin(map, lng, lat);
        dispatch(getCoordinates({ longitude: lng, latitude: lat }));
      });
    }
  }, [map]);

  return (
    <Fragment>
      <MapDataEntry />
      <CategoriesCard />
      <Map />
    </Fragment>
  );
}

MapDataEditor.displayName = "/src/pages/MapDataEditor.jsx";

export default MapDataEditor;
