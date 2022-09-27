import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import dropsReducer from "./features/drop/dropSlice";
import modalReducer from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    drops: dropsReducer,
    modal: modalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
