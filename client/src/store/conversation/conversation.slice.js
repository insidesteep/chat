import { createSlice } from "@reduxjs/toolkit";
import { fetchConversations } from "./conversation.thunk";

const initialState = {
  conversations: [],
  partnerId: null,
  loading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setPartner: (state, action) => {
      state.partnerId = action.payload;
    },
  },
  extraReducers: {
    [fetchConversations.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchConversations.fulfilled]: (state, action) => {
      state.loading = false;
      state.conversations = action.payload;
    },
    [fetchConversations.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setPartner } = conversationSlice.actions;
export default conversationSlice.reducer;
