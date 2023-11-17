//React,Redux,Router
import { Routes, Route } from "react-router-dom";

// Components
import { WelcomePage } from "@/layouts";
// import { VisitorFeatures } from "./features";

function App() {
  return (
    <WelcomePage />
    // <div
    //   className="App"
    //   style={{
    //     height: "100dvh",
    //     width: "100dvw",
    //     display: "flex",
    //     flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
    //   }}
    // >
    //   <Routes>
    //     {true ? (
    //       <Route path="/wayfinder/*" element={<Admin />} />
    //     ) : (
    //       <Route exact path={"visiter*"} element={<VisitorFeatures />} />
    //     )}
    //   </Routes>
    // </div>
  );
}

export default App;
