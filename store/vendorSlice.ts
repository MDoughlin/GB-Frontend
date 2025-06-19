import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VendorState {
  vendorId: string | null;
  name: string;
}

const initialState: VendorState = {
  vendorId: null,
  name: "",
};

const VendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendorData: (
      state,
      action: PayloadAction<{ vendorId: string; name: string }>
    ) => {
      state.vendorId = action.payload.vendorId;
      state.name = action.payload.name;
    },
    clearVendor: () => initialState,
  },
});

export const { setVendorData, clearVendor } = VendorSlice.actions;
export default VendorSlice.reducer;
