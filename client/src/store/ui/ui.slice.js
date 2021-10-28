import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileBarVisible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleProfileBar: (state) => {
      state.profileBarVisible = !state.profileBarVisible;
    },
    hideProfileBar: (state) => {
      state.profileBarVisible = false;
    },
  },
});

export const { toggleProfileBar, hideProfileBar } = uiSlice.actions;

export default uiSlice.reducer;
