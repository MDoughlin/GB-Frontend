import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VendorState {
  vendorId: string | null;
  name: string;
  menu: string[];
}

const initialState: VendorState = {
  vendorId: null,
  name: "",
  menu: [],
};

const VendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendorData: (
      state,
      action: PayloadAction<{
        menu: string[];
        vendorId: string;
        name: string;
      }>
    ) => {
      state.vendorId = action.payload.vendorId;
      state.name = action.payload.name;
      state.menu = action.payload.menu;
    },
    clearVendor: () => initialState,
  },
});

export const { setVendorData, clearVendor } = VendorSlice.actions;
export default VendorSlice.reducer;
