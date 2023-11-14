import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
// import { authReducer } from "@/layouts";
import {
  buildingsDataReducer,
  mapBoxReducer,
  uiReducer,
  bucketReducer,
} from "@/redux/slices";

const actionLogger = () => (next) => (action) => {
  console.log("Action:", action.type);
  return next(action);
};

const store = configureStore({
  reducer: {
    // auth: authReducer,
    ui: uiReducer,
    mapBox: mapBoxReducer,
    buildingData: buildingsDataReducer,
    bucket: bucketReducer,
  },
  middleware: [thunk, actionLogger],
});

export default store;
