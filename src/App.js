//React,Redux,Router
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Components
import { Auth, Dashboard, checkLocalStorage } from "@/layouts";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLocalStorage());
  }, []);

  return (
    <div
      className="App"
      style={{
        height: "100dvh",
        width: "100dvw",
        display: "flex",
        flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
      }}
    >
      <Auth />
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/dashboard/my-map" replace />} />
      </Routes>
    </div>
  );
}

export default App;
