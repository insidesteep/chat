import { AuthService } from "../../services";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authorization = createAsyncThunk(
  "auth/authorization",
  async () => {
    const response = await AuthService.authorization();
    return response.data;
  }
);
