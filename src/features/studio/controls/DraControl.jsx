import { useControl } from "react-map-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

function DrawControl(props) {
  const { onCreate, onUpdate, onDelete } = props;

  useControl(
    () => new MapboxDraw(props),
    ({ map }) => {
      map.on("draw.create", onCreate);
      map.on("draw.update", onUpdate);
      map.on("draw.delete", onDelete);
    },
    ({ map }) => {
      map.off("draw.create", onCreate);
      map.off("draw.update", onUpdate);
      map.off("draw.delete", onDelete);
    },
    {
      position: "top-right",
    }
  );

  return null;
}

export default DrawControl;
