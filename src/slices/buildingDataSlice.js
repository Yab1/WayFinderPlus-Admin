import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { colRef, eventColRef } from "@/firebase";
import {
  query,
  getDocs,
  orderBy,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { decodeCoordinates } from "@/functions";

export const fetchData = createAsyncThunk(
  "buildings/fetchBuildingsData",
  async () => {
    try {
      const queuedRef = query(colRef, orderBy("buildingNumber"));
      const snapshot = await getDocs(queuedRef);

      const buildings = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const buildingsData = decodeCoordinates(buildings);

      return buildingsData;
    } catch (err) {
      alert(err.message);
      throw err.message;
    }
  }
);

// export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
//   try {
//     const queuedRef = query(eventColRef);
//     const snapshot = await getDocs(queuedRef);

//     const events = snapshot.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id,
//     }));

//     return events;
//   } catch (err) {
//     alert(err.message);
//     throw err.message;
//   }
// });

// export const fetchData = createAsyncThunk("data/fetchData", async () => {
//   try {
//     // const [buildingsData, eventsData] = await Promise.all([
//     //   fetchBuildings(),
//     //   fetchEvents(),
//     // ]);
//     // const combinedData = buildingsData.map((building) => {
//     //   eventsData.map((event) => {
//     //     if (building.geoHash === event.geoHash) {
//     //       return { ...building, event: event };
//     //     } else {
//     //       return building;
//     //     }
//     //   });
//     // });
//     console.log(fetchBuildingsData());

//     // return data;
//   } catch (err) {
//     alert(err.message);
//     throw err.message;
//   }
// });

const initialState = {
  data: [],
  status: "idle",
  error: "",
  dataToDelete: {},
  selectedBuildingType: null,
  coordinates: null,
};

const buildingDataSlice = createSlice({
  name: "buildingData",
  initialState,
  reducers: {
    markDataForDeletion: (state, action) => {
      if (action.payload) {
        const filteredData = state.data.filter(
          (building) => building.id === action.payload
        );
        state.dataToDelete = filteredData[0];
      } else {
        state.dataToDelete = {};
      }
    },
    getCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    selectBuildingType: (state, action) => {
      state.selectedBuildingType = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { markDataForDeletion, getCoordinates, selectBuildingType } =
  buildingDataSlice.actions;
export default buildingDataSlice.reducer;
