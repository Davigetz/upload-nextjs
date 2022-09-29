import { createSlice } from "@reduxjs/toolkit";

interface dropState {
  inDropZone: boolean;
  fileList: object[];
  pics: {
    id: string | null;
    name: string | null;
    url: string | null;
    width: string | null;
    height: number | null;
  };
}

const initialState: dropState = {
  inDropZone: false,
  fileList: [],
  pics: { id: null, name: null, url: null, width: null, height: null },
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
