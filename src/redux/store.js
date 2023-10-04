import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { authReducer } from "@/layouts";
import { uiReducer } from "@/slices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: [thunk, logger],
});

export default store;
