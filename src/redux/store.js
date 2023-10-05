import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { authReducer } from "@/layouts";
import { buildingsDataReducer, mapBoxReducer, uiReducer } from "@/slices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    mapBox: mapBoxReducer,
    buildingData: buildingsDataReducer,
  },
  middleware: [thunk, logger],
});

export default store;
