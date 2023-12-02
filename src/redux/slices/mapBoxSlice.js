import { MapStyles } from "@/features/studio/mapbox/constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapConfig: {
    longitude: 40,
    latitude: 9,
    zoom: 6,
    minZoom: 6,
    bounds: [
      [33, 3],
      [48, 15],
    ],
  },

  compundConfig: {
    longitude: null,
    latitude: null,
    minZoom: null,
    bounds: null,
  },
  mapStyle: MapStyles.OUTDOOR,
};

const mapBoxSlice = createSlice({
  name: "mapMetaData",
  initialState,
  reducers: {
    resetCompundConfig: (state) => {
      state.compundConfig = {
        longitude: null,
        latitude: null,
        minZoom: null,
        bounds: null,
      };
    },
    changeMapConfig: (state, action) => {
      state.mapConfig = action.payload;
    },
    createCompound: (state, action) => {
      state.compundConfig = { ...state.compundConfig, ...action.payload };
    },
    setCompundMiniZoom: (state, action) => {
      state.compundConfig.minZoom = action.payload;
    },
    setStyle: (state, action) => {
      state.mapStyle = action.payload;
    },
  },
});

export const {
  resetCompundConfig,
  changeMapConfig,
  createCompound,
  setCompundMiniZoom,
  setStyle,
} = mapBoxSlice.actions;
export default mapBoxSlice.reducer;
