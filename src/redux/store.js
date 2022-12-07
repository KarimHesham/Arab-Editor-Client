import { configureStore } from "@reduxjs/toolkit";
import { pagesSlice, themeSlice, userSlice } from "./reducers";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
    pages: pagesSlice,
  },
});
