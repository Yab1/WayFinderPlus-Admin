import { Routes, Route } from "react-router-dom";
import { studioRoutes } from "@/routes";

function StudioLayout() {
  return (
    <Routes>
      {studioRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

StudioLayout.displayName = "/src/layouts/StudioLayout.jsx";

export default StudioLayout;
