import { createSlice } from "@reduxjs/toolkit";
import { search, fetchProfile } from "./user.thunk";

const initialState = {
  contacts: [],
  userProfile: null,
  searchResult: [],
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [search.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [search.fulfilled]: (state, action) => {
      state.searchResult = action.payload;
      state.loading = false;
    },
    [search.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.searchResult = [];
    },

    [fetchProfile.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchProfile.fulfilled]: (state, action) => {
      state.userProfile = action.payload;
      state.loading = false;
    },
    [fetchProfile.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const actions = authSlice.actions;
export default authSlice.reducer;
