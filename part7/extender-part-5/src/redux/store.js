import { configureStore } from "@reduxjs/toolkit";
import NotificatioReducer from "./reducers/notificationSlice";

export const store = configureStore({
  reducer: {
    notification: NotificatioReducer,
  },
});
