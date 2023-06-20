import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createModal: false,
  updateModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openCreateModal: (state) => {
      state.createModal = true;
    },
    openUpdateModal: (state) => {
      state.updateModal = true;
    },
    closeCreateModal: (state) => {
      state.createModal = false;
    },
    closeUpdateModal: (state) => {
      state.updateModal = false;
    },
  },
});

export default modalSlice.reducer;
export const {
  openCreateModal,
  openUpdateModal,
  closeCreateModal,
  closeUpdateModal,
} = modalSlice.actions;
