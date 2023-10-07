import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  map: null,
  mapStyle: "outdoors-v12",
  markers: [],
  clickedMarker: [],
  showMarkers: true,
};

const mapBoxSlice = createSlice({
  name: "mapMetaData",
  initialState,
  reducers: {
    loadMap: (state, action) => {
      state.map = action.payload;
    },
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
  loadMap,
  setClickedMarker,
  switchMapStyle,
  initializeMarkers,
  toggleMarkers,
} = mapBoxSlice.actions;
export default mapBoxSlice.reducer;
