// Components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Drawer from "./components/Drawer/Drawer";
import Account from "./components/Account/Account";
import LoginForm from "./components/Login/loginForm";
import Dataset from "./pages/dataset";
import EventController from "./pages/eventController";
import MapEditor from "./pages/mapEditor";
import POIEditor from "./pages/poiEditor";

// Hook, Contexts & Functions
import { AuthContext } from "./contexts/AuthContext.js";

function App() {
  return (
    <div
      className="App"
      style={{ height: "100dvh", width: "100dvw", display: "flex" }}
    >
      <AuthContext.Consumer>
        {context => {
          const { logged } = context;
          return (
            <>
              {!logged ? (
                <LoginForm />
              ) : (
                <>
                  <BrowserRouter>
                    <Drawer />
                    <Account />
                    <Routes>
                      <Route exact path="/" element={<Dataset />} />
                      <Route
                        path="/EventController"
                        element={<EventController />}
                      />
                      <Route path="/MapEditor" element={<MapEditor />} />
                      <Route path="/POIEditor" element={<POIEditor />} />
                    </Routes>
                  </BrowserRouter>
                </>
              )}
            </>
          );
        }}
      </AuthContext.Consumer>
    </div>
  );
}

export default App;
