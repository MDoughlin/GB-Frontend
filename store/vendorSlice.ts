import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VendorState {
  vendorId: string | null;
}

const initialState: VendorState = {
  vendorId: null,
};

const VendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendorId: (state, action: PayloadAction<string>) => {
      state.vendorId = action.payload;
    },
    clearVendorId: (state) => {
      state.vendorId = null;
    },
  },
});

export const { setVendorId, clearVendorId } = VendorSlice.actions;
export default VendorSlice.reducer;
