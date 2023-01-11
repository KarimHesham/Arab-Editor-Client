import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import thunk from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import { loadingSlice, pagesSlice, themeSlice, userSlice } from "./reducers";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  theme: themeSlice,
  user: userSlice,
  pages: pagesSlice,
  loading: loadingSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
