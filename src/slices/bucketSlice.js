import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Thumbnail from "@/assets/Thumbnail.jpeg";

const initialState = { selectedFile: Thumbnail, status: "idle", error: "" };

export const fileReader = createAsyncThunk(
  "readfile/fileReader",
  async (file, { dispatch }) => {
    try {
      if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
          dispatch(fileReader.fulfilled(event.target.result));
        };

        reader.readAsDataURL(file);
      }
    } catch (err) {
      throw err.message;
    }
  }
);

const bucketSlice = createSlice({
  name: "bucketSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fileReader.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fileReader.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedFile = action.payload;
      })
      .addCase(fileReader.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const {  } = bucketSlice.actions;
export default bucketSlice.reducer;
