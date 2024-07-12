import { combineReducers, configureStore } from "@reduxjs/toolkit";
import NotificatioReducer from "./reducers/notificationSlice";
import blogSlice from "./reducers/blogSlice";
import userSlice from "./reducers/userSlice";
//
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa almacenamiento local para persistir el estado

// Configuración del persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "blogs"], // Lista blanca de reducers a persistir, estos son los slices(estados) que persistiran
};
//test
const rootReducer = combineReducers({
  notification: NotificatioReducer,
  blogs: blogSlice,
  user: userSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
