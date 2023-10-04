import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPassword: false,
  anchorEl: null,
  loginSnackbar: {
    open: false,
    severity: "error",
    message: "",
  },
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
  },
});

export const { togglePasswordVisibility, setAnchorEl, toggleLoginSnackbar } =
  uiSlice.actions;
export default uiSlice.reducer;
