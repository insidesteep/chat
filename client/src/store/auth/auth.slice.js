import { createSlice } from "@reduxjs/toolkit";
import { authorization } from "./auth.thunk";
console.log(authorization);

const initialState = {
  user: [],
  loading: false,
  error: null,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = [];
      state.error = null;
      state.loading = false;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [authorization.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [authorization.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isLoggedIn = true;
    },
    [authorization.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
