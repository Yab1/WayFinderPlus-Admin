import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

const store = configureStore({
  reducer: {},
  middleware: [logger],
});

export default store;
