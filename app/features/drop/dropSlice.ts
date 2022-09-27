import { createSlice } from "@reduxjs/toolkit";

interface dropState {
  inDropZone: boolean;
  fileList: object[];
  pics: object[];
}

const initialState: dropState = {
  inDropZone: false,
  fileList: [],
  pics: [],
};

export const dropSlice = createSlice({
  name: "drop",
  initialState,
  reducers: {
    setInDropZone: (state, action) => {
      state.inDropZone = action.payload;
    },
    addFileToList: (state, action) => {
      state.fileList = state.fileList.concat(action.payload);
    },
    pics: (state, action) => {
      state.pics = action.payload;
    },
  },
});

export const { setInDropZone, addFileToList, pics } = dropSlice.actions;

export default dropSlice.reducer;
