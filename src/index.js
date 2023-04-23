import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext.js";
import BuildingsContextProvider from "./contexts/BuildingsContext.js";
import CssBaseline from "@mui/material/CssBaseline";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <BuildingsContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BuildingsContextProvider>
  </React.StrictMode>
);
