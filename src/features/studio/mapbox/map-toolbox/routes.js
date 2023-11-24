import { MapInventory, MapDefinition } from "./index";

export const routes = [
  {
    path: "/inventory",
    element: <MapInventory />,
  },
  {
    path: "/define-map",
    element: <MapDefinition />,
  },
];

export default routes;
