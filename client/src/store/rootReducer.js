import { combineReducers } from "@reduxjs/toolkit";

import messageReducer from "./message/message.slice";
import uiReducer from "./ui/ui.slice";
import authReducer from "./auth/auth.slice";
import userReducer from "./user/user.slice";
import conversationReducer from "./conversation/conversation.slice";

const rootReducer = combineReducers({
  message: messageReducer,
  auth: authReducer,
  user: userReducer,
  ui: uiReducer,
  conversation: conversationReducer,
});

export default rootReducer;
