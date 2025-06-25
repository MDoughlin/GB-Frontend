import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import vendorReducer from "./vendorSlice";

export const store = configureStore({
  reducer: {
    vendor: vendorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
