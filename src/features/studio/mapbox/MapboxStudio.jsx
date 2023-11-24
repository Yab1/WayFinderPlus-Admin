import { Routes, Route } from "react-router-dom";
import routes from "./map-toolbox/routes";

function MapboxStudio() {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

MapboxStudio.displayName = "/src/features/studio/mapbox/MapboxStudio.jsx";

export default MapboxStudio;
