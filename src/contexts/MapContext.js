import { createContext, useState, useContext, useEffect } from "react";
import { app } from "../services/firebase/connection";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

export const MapContext = createContext();

export default function MapContextProvider({ children }) {
  const db = getFirestore(app);
  const [buildingsData, setBuildingsData] = useState([]);

  // console.log(currentUser);

  useEffect(() => {
    // Real-time data gathering
    const colRef = collection(
      db,
      "Locations",
      "Adama Science And Technology",
      "BuildingsData"
    );
    const queuedRef = query(colRef, orderBy("buildingNumber"));
    const unsubscribe = onSnapshot(queuedRef, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setBuildingsData(data);
    });
    return () => unsubscribe();
  }, []);

  async function addData({
    url,
    geoHash,
    buildingNumber,
    buildingCategory,
    buildingName,
    buildingDescription,
  }) {
    const colRef = collection(
      db,
      "Locations",
      "Adama Science And Technology",
      "BuildingsData"
    );
    let date =
      new Date().getDate() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getFullYear();

    let data = {
      geoHash,
      buildingNumber,
      buildingCategory,
      buildingName: buildingName === "" ? `B${buildingNumber}` : buildingName,
      buildingDescription:
        buildingDescription === ""
          ? "No Description Available"
          : buildingDescription,
      url,
      created_at: date,
    };
    addDoc(colRef, data);
  }

  async function deleteData(id) {
    const docRef = doc(
      db,
      "Locations",
      "Adama Science And Technology",
      "BuildingsData",
      id
    );
    deleteDoc(docRef);
  }

  const value = { addData, deleteData, buildingsData };
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
