import { configureStore } from "@reduxjs/toolkit";
import pagesSlice from "./reducers/pagesSlice";
import themeSlice from "./reducers/themeSlice";
import userSlice from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
    pages: pagesSlice,
  },
});
