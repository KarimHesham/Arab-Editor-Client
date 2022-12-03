import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pages: null,
  activePage: null,
};

export const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setPages: (state, action) => {
      state.pages = action.payload;
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload;
    },
  },
});

export const { setPages, setActivePage } = pagesSlice.actions;

export default pagesSlice.reducer;
