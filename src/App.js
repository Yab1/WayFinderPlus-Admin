import { Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { StudioLayout, UserLayout } from "@/layouts";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="wayfinder/*" element={<UserLayout />} />
        <Route path="wayfinder/studio/*" element={<StudioLayout />} />
        <Route path="*" element={<Navigate to={"/wayfinder"} replace />} />
      </Routes>
    </Box>
  );
}

export default App;

// <div
//   className="App"
//   style={{
//     height: "100dvh",
//     width: "100dvw",
//     display: "flex",
//     flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
//   }}
// >
// </div>
