import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPassword: false,
  anchorEl: null,
  loginSnackbar: {
    open: false,
    severity: "error",
    message: "",
  },
  isDrawerOpen: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    togglePasswordVisibility: (state) => {
      state.showPassword = !state.showPassword;
    },
    setAnchorEl: (state, action) => {
      state.anchorEl = action.payload;
    },
    toggleLoginSnackbar: (state, action) => {
      state.loginSnackbar.open = action.payload.open;
      state.loginSnackbar.message = action.payload.message;
    },
    toggleDrawer: (state) => {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const {
  togglePasswordVisibility,
  setAnchorEl,
  toggleLoginSnackbar,
  toggleDrawer,
} = uiSlice.actions;
export default uiSlice.reducer;
