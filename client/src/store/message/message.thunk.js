import Message from "../../services/message.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isImage } from "../../utils";

export const createMessage = createAsyncThunk(
  "message/create",
  async (newMessage) => {
    console.log(newMessage.files);
    const formData = new FormData();
    formData.append("to", newMessage.to);
    formData.append("body", newMessage.body);

    for (let file of newMessage.files) {
      if (isImage(file)) {
        formData.append("images", file);
      } else {
        formData.append("files", file);
      }
    }

    const response = await Message.create(formData);
    return response.data;
  }
);

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (id) => {
    const response = await Message.list(id);
    return response.data;
  }
);

export const fetchMessageById = createAsyncThunk(
  "message/fetchMessageById",
  async (id) => {
    const response = await Message.get(id);
    return response.data;
  }
);

export const removeMessageById = createAsyncThunk(
  "message/removeMessageById",
  async (id) => {
    const response = await Message.remove(id);
    return response.data;
  }
);

export const clearMessages = createAsyncThunk(
  "message/clearMessages",
  async (i) => {
    const response = await Message.clear();
    return response.data;
  }
);
