import { MapInventory, MapDefinition, StructureEditor } from "./index";

export const routes = [
  {
    path: "/inventory",
    element: <MapInventory />,
  },
  {
    path: "/define-map",
    element: <MapDefinition />,
  },
  {
    path: "/structure-editor",
    element: <StructureEditor />,
  },
];

export default routes;
