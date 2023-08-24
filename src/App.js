// Components
import { Routes, Route } from "react-router-dom";
import Drawer from "./components/Drawer/Drawer";
import MobileSpeedDial from "./components/Drawer/MobileSpeedDial";
import Account from "./components/Account/Account";
import LoginForm from "./components/Login/LoginForm";

// pages
import StreetView from "./pages/streetView";
import Dataset from "./pages/dataset";
import EventController from "./pages/eventController";
import MapEditor from "./pages/mapEditor";

// Hook, Contexts & Functions
import { AuthContext } from "./contexts/AuthContext.js";

function App() {
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
      <Drawer />
      <Account />
      <Routes>
        <Route exact path="/" element={<StreetView />} />
        {/* <Route exact path="/wayfinder" element={<StreetView />} /> */}
        <Route exact path="/Dataset" element={<Dataset />} />
        <Route path="/EventController" element={<EventController />} />
        <Route path="/MapEditor" element={<MapEditor />} />
        <Route path="/LoginForm" element={<LoginForm />} />
      </Routes>
      <MobileSpeedDial />

      {/* <AuthContext.Consumer>
        {(context) => {
          const { logged } = context;
          return (
            // <>
            //   {!logged ? (
            //     <LoginForm />
            //   ) : (
            //     <>
            //     </>
            //   )}
            // </>
          );
        }}
      </AuthContext.Consumer> */}
    </div>
  );
}

export default App;
