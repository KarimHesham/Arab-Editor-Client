import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: "",
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setLoading, setMessage } = loadingSlice.actions;

export default loadingSlice.reducer;
