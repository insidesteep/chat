import { UserService } from "../../services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const search = createAsyncThunk("user/search", async (term) => {
  const response = await UserService.find(term);
  return response.data;
});

export const fetchProfile = createAsyncThunk("user/fetchProfile", async (id) => {
  const response = await UserService.get(id);
  return response.data;
});
