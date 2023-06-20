import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/authSlice";
import modalReducer from "../feature/modalSlice";
import eachBlogReducer from "../feature/eachBlogSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    blog: eachBlogReducer,
  },
});
