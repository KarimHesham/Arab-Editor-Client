import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pages: null,
};

export const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setPages: (state, action) => {
      state.pages = action.payload;
    },
  },
});

export const { setUser } = pagesSlice.actions;

export default pagesSlice.reducer;
