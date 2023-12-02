import { Map } from "@/features/studio/mapbox/componnets/widgets";
import { MapConfig } from "@/features/studio/mapbox/componnets/controls";

function StructureEditor() {
  return (
    <Map>
      <MapConfig />
    </Map>
  );
}

StructureEditor.displayName =
  "/src/features/studio/mapbox/map-toolbox/structure_editor/StructureEditor.jsx";

export default StructureEditor;
