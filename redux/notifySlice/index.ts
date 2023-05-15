import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
  type: "info",
};

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setNotify: (state, { payload }) => {
      state.message = payload.message;
      state.type = payload.type;
      state.isOpen = true;
    },
    unsetNotify: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setNotify, unsetNotify } = notifySlice.actions;
export default notifySlice.reducer;
