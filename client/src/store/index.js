import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["conversation", "message"]
};

const peristReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: peristReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
