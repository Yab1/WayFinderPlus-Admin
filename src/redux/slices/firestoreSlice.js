import { createSlice } from "@reduxjs/toolkit";
import { Status } from "@/constants";

const initialState = {
  firestoreStatus: Status.IDLE,
  snackbarConfig: {
    open: false,
    message: null,
    vertical: "top",
    horizontal: "center",
    severity: "error",
  },
  maps: [
    {
      id: 1,
      name: "Kalen Emsley",
      description:
        "Kalen is a talented photographer specializing in capturing stunning landscapes and nature's beauty. With a passion for wildlife, he has an eye for capturing unique reptiles in their natural habitats.",
      pictureURL:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Benjamin Voros",
      description:
        "Benjamin is an adventurer and photographer who traverses various terrains to capture the essence of nature. He is passionate about documenting diverse reptile species and their habitats.",
      pictureURL:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Carlos Torres",
      description:
        "Carlos is an environmentalist and photographer dedicated to showcasing the beauty of reptiles in their ecosystems. Through his lens, he aims to raise awareness about the importance of preserving wildlife.",
      pictureURL:
        "https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Emilio Martín",
      description:
        "Emilio is a nature enthusiast and photographer passionate about capturing the intricate details of flora and fauna. His work showcases the captivating beauty of reptiles in their natural environments.",
      pictureURL:
        "https://images.unsplash.com/photo-1499260320506-8144c5c33ddf?q=80&w=1440&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  selectedMap: "",
};

const progressSlice = createSlice({
  name: "firestore",
  initialState,
  reducers: {
    firestoreIdle: () => initialState,
    firestoreStart: (state) => {
      state.firestoreStatus = Status.LOADING;
    },
    firestoreSucceeded: (state) => {
      state.firestoreStatus = Status.SUCCEEDED;
      state.snackbarConfig = {
        open: true,
        message: "Action Completed",
        vertical: "bottom",
        horizontal: "right",
        severity: "success",
      };
    },
    firestoreFailure: (state, action) => {
      state.firestoreStatus = Status.FAILED;
      state.snackbarConfig = {
        open: true,
        message: action.payload,
        vertical: "top",
        horizontal: "center",
        severity: "error",
      };
    },
    closeSnackbar: (state) => {
      state.snackbarConfig = {
        open: false,
        message: null,
        vertical: "top",
        horizontal: "center",
        severity: "error",
      };
    },
    setMap: (state, action) => {
      state.maps = action.payload;
    },
    selectMap: (state, action) => {
      state.selectedMap = action.payload;
    },
  },
});

export const {
  firestoreIdle,
  firestoreStart,
  firestoreSucceeded,
  firestoreFailure,
  closeSnackbar,
  setMap,
  selectMap,
} = progressSlice.actions;
export default progressSlice.reducer;
