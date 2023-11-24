import { MapStyles } from "@/features/studio/mapbox/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  defaultBounds: [
    [31.9, 3.3],
    [49.0, 14.0],
  ],
  mapStyle: MapStyles.LIGHT,
  newBounds: null,
  polygonCenter: null,
};

const mapBoxSlice = createSlice({
  name: "mapMetaData",
  initialState,
  reducers: {
    resetMapBox: () => initialState,
    updateBounds: (state, action) => {
      state.defaultBounds = action.payload;
    },
    setBounds: (state, action) => {
      state.newBounds = action.payload;
    },
    setPolygonCenter: (state, action) => {
      state.polygonCenter = action.payload;
    },
    setStyle: (state, action) => {
      state.mapStyle = action.payload;
    },
  },
});

export const {
  resetMapBox,
  updateBounds,
  setStyle,
  setBounds,
  setPolygonCenter,
} = mapBoxSlice.actions;
export default mapBoxSlice.reducer;
