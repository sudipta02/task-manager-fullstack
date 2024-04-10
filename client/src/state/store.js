import { configureStore } from "@reduxjs/toolkit";
import reminderReducer from "./slices/reminderSlice";

export const store = configureStore({
  reducer: {
    reminder: reminderReducer,
  },
});
