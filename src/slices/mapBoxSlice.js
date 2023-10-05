import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clickedMarker: [],
  styles: {
    dark: "dark-v11",
    light: "light-v11",
    outdoor: "outdoors-v12",
    satellite: "satellite-v9",
  },
  mapStyle: "outdoors-v12",
  metaData: {
    container: "mapBox",
    center: [39.29039343419677, 8.563261132878523],
    zoom: 15.2,
    pitch: 45,
    attributionControl: false,
  },
  layer: {
    id: "add-3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 15,
    paint: {
      "fill-extrusion-color": "#aaa",
      "fill-extrusion-height": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "height"],
      ],
      "fill-extrusion-base": [
        "interpolate",
        ["linear"],
        ["zoom"],
        15,
        0,
        15.05,
        ["get", "min_height"],
      ],
      "fill-extrusion-opacity": 0.6,
    },
  },
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
  },
});

export const { loadMap, setClickedMarker, switchMapStyle } =
  mapBoxSlice.actions;
export default mapBoxSlice.reducer;
