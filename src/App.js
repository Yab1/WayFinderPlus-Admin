import { useEffect, useState } from "react";
// Components
import Drawer from "./components/Drawer/Drawer";
import POIEditor from "./pages/poiEditor";
import Account from "./components/Account/Account";
import LoginForm from "./components/Login/loginForm";

// Hooks & Functions
import useFetch from "./hooks/useFetch";
import getCollectionData from "./firebase/connection";

function App() {
  const [logged, setLogged] = useState(false);
  const handleLog = () => {
    setLogged(!logged);
  };
  return (
    <div
      className="App"
      style={{ height: "100dvh", width: "100dvw", display: "flex" }}
    >
      {!logged ? (
        <LoginForm handleLog={handleLog} />
      ) : (
        <>
          <Account handleLog={handleLog} />
          <Drawer />
          <POIEditor />
        </>
      )}
    </div>
  );
}

export default App;
