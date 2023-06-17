import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      console.log("logged out");
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export default authSlice.reducer;
export const { saveToken, logout } = authSlice.actions;
