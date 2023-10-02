import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext.js";
import MapContextProvider from "./contexts/MapContext.js";
import EventContextProvider from "./contexts/EventContext.js";
import BucketContextProvider from "./contexts/BucketContext";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "@/redux";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <CssBaseline />
        <MapContextProvider>
          <EventContextProvider>
            <BucketContextProvider>
              <AuthContextProvider>
                <App />
              </AuthContextProvider>
            </BucketContextProvider>
          </EventContextProvider>
        </MapContextProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);
