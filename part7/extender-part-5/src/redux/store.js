import { configureStore } from "@reduxjs/toolkit";
import NotificatioReducer from "./reducers/notificationSlice";
import blogSlice from "./reducers/blogSlice";

export const store = configureStore({
  reducer: {
    notification: NotificatioReducer,
    blogs: blogSlice,
  },
});
