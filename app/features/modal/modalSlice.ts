import { createSlice } from "@reduxjs/toolkit";

interface modalState {
  isOpen: boolean;
  actualNumber: number;
}

const initialState: modalState = {
  isOpen: false,
  actualNumber: 0,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action) => {
      state.isOpen = action.payload;
    },
    setNumber: (state, action) => {
      state.actualNumber = action.payload;
    },
  },
});

export const { setModal, setNumber } = modalSlice.actions;

export default modalSlice.reducer;
