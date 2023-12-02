import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { mapBoxReducer, uiReducer, firestoreReducer } from "@/redux/slices";

const actionLogger = () => (next) => (action) => {
  console.log("Action:", action.type);
  return next(action);
};

const store = configureStore({
  reducer: {
    ui: uiReducer,
    firestore: firestoreReducer,
    mapBox: mapBoxReducer,
  },
  middleware: [thunk, logger],
});

export default store;
