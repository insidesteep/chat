import { createSlice } from "@reduxjs/toolkit";
import {
  createMessage,
  fetchMessages,
  fetchMessageById,
  removeMessageById,
  clearMessages,
} from "./message.thunk";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: {
    [createMessage.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createMessage.fulfilled]: (state) => {
      state.loading = false;
    },
    [createMessage.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchMessages.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.messages = action.payload;
      state.loading = false;
    },
    [fetchMessages.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;
