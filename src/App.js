import { Routes, Route, Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Studio, UserLayout } from "@/layouts";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="wayfinder/*" element={<UserLayout />} />
        <Route path="wayfinder/studio/*" element={<Studio />} />
        <Route path="*" element={<Navigate to={"/wayfinder"} replace />} />
      </Routes>
    </Box>
  );
}

export default App;
