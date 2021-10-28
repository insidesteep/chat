import { ConversationService } from "../../services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchConversations = createAsyncThunk(
  "conversation/fetchConversations",
  async () => {
    const response = await ConversationService.list();
    return response.data;
  }
);
