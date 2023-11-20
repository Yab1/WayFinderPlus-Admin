import { createSlice } from "@reduxjs/toolkit";
import { MapStyles } from "@/constants";

const initialState = {
  map: null,
  mapStyle: MapStyles.LIGHT,
  markers: null,
  clickedMarker: null,
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
