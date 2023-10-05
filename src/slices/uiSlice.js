import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPassword: false,
  accountAnchorEl: null,
  styleAnchorEl: null,
  loginSnackbar: {
    open: false,
    severity: "error",
    message: "",
  },
  isDrawerOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    togglePasswordVisibility: (state) => {
      state.showPassword = !state.showPassword;
    },
    setAccountAnchorEl: (state, action) => {
      state.accountAnchorEl = action.payload;
    },
    setStyleAnchorEl: (state, action) => {
      state.styleAnchorEl = action.payload;
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
  setAccountAnchorEl,
  setStyleAnchorEl,
  toggleLoginSnackbar,
  toggleDrawer,
} = uiSlice.actions;
export default uiSlice.reducer;
