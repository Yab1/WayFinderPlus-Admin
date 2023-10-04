import { app } from "@/firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
  status: "idle",
  error: null,
};

const auth = getAuth(app);

export const getUserCredentials = createAsyncThunk(
  "cred/getUserCredentials",
  async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      throw err.message;
    }
  }
);

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    checkLocalStorage: (state) => {
      state.isLogged = Boolean(JSON.parse(localStorage.getItem("isLogged")));
    },
    clearUserCredentials: () => {
      localStorage.clear();
      return initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserCredentials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserCredentials.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLogged = true;
        localStorage.setItem("isLogged", true);
      })
      .addCase(getUserCredentials.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { checkLocalStorage, clearUserCredentials } = authSlice.actions;
export default authSlice.reducer;
