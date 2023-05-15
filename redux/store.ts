import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from "./notifySlice";

export const store = configureStore({
  reducer: {
    notify: notifyReducer,
  },
});
