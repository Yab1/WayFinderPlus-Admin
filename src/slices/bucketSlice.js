import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storageRef } from "@/firebase";
import Thumbnail from "@/assets/Thumbnail.jpeg";

// const path = "adama-science-and-technology";
const path = "test";

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
        dispatch(setImage(file));
      }
    } catch (err) {
      throw err.message;
    }
  }
);

export const uploadImage = createAsyncThunk(
  "image/uploadImage",
  async (_, { getState, dispatch }) => {
    try {
      const imageToUpload = getState().bucket.image;
      const imagesRef = ref(storageRef, `${path}`);
      const uploadTask = uploadBytesResumable(imagesRef, imageToUpload);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const process = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          dispatch(updateUploadProgress(process));
        },
        (error) => {
          if (error.code === "storage/canceled") {
            alert("Upload cancelled");
          } else {
            dispatch(uploadImage.rejected(error.message));
          }
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          if (downloadURL) {
            dispatch(uploadImage.fulfilled(downloadURL));
          }
        }
      );
    } catch (err) {
      dispatch(uploadImage.rejected(err.message));
    }
  }
);

const initialState = {
  selectedFile: Thumbnail,
  image: null,
  url: null,
  readingStatus: "idle",
  uploadStatus: "idle",
  uploadedProcess: null,
  error: "",
};

const bucketSlice = createSlice({
  name: "bucketSlice",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.image = action.payload;
    },
    updateUploadProgress: (state, action) => {
      state.uploadedProcess = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fileReader.pending, (state) => {
        state.readingStatus = "loading";
      })
      .addCase(fileReader.fulfilled, (state, action) => {
        state.readingStatus = "succeeded";
        state.selectedFile = action.payload;
      })
      .addCase(fileReader.rejected, (state, action) => {
        state.readingStatus = "failed";
        state.error = action.error.message;
      })
      .addCase(uploadImage.pending, (state) => {
        state.uploadStatus = "uploading";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploadStatus = "succeeded";
        state.url = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setImage, updateUploadProgress } = bucketSlice.actions;
export default bucketSlice.reducer;
