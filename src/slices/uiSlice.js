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
  isInfoCardOpen: true,
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
    toggleInfoCard: (state) => {
      state.isInfoCardOpen = !state.isInfoCardOpen;
    },
  },
});

export const {
  togglePasswordVisibility,
  setAccountAnchorEl,
  setStyleAnchorEl,
  toggleLoginSnackbar,
  toggleDrawer,
  toggleInfoCard,
} = uiSlice.actions;
export default uiSlice.reducer;
