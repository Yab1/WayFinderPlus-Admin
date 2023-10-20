import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { authReducer } from "@/layouts";
import {
  buildingsDataReducer,
  mapBoxReducer,
  uiReducer,
  bucketReducer,
} from "@/slices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    mapBox: mapBoxReducer,
    buildingData: buildingsDataReducer,
    bucket: bucketReducer,
  },
  middleware: [thunk],
});

export default store;
