import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Map } from "@/features/studio/widgets";
import { MapDataEntry, CategoriesCard } from "@/widgets/cards";
import { getCoordinates } from "@/redux/slices";
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
      <Map />
      <MapDataEntry />
      <CategoriesCard />
    </Fragment>
  );
}

MapDataEditor.displayName = "/src/pages/MapDataEditor.jsx";

export default MapDataEditor;
