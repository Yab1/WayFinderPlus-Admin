import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedMarker: [],
  mapStyle: "outdoors-v12",
  markers: [],
  showMarkers: true,
};

const mapBoxSlice = createSlice({
  name: "mapMetaData",
  initialState,
  reducers: {
    setClickedMarker: (state, action) => {
      state.clickedMarker = action.payload;
    },
    switchMapStyle: (state, action) => {
      state.mapStyle = action.payload;
    },
    initializeMarkers: (state, action) => {
      state.markers = action.payload;
    },
    toggleMarkers: (state) => {
      state.showMarkers = !state.showMarkers;
    },
  },
});

export const {
  setClickedMarker,
  switchMapStyle,
  initializeMarkers,
  toggleMarkers,
} = mapBoxSlice.actions;
export default mapBoxSlice.reducer;
