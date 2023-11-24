import { Routes, Route } from "react-router-dom";
import { MapboxStudio } from "@/features/studio";

function Studio() {
  return (
    <Routes>
      <Route path="/mapbox/*" element={<MapboxStudio />} />
    </Routes>
  );
}

Studio.displayName = "/src/layouts/Studio.jsx";

export default Studio;
