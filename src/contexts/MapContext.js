import { createContext, useState, useEffect } from "react";
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
  const db = getFirestore();
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    // Real Time data gathering
    const colRef = collection(db, "buildingDataCollection");
    const queuedRef = query(colRef, orderBy("buildingNumber"));
    onSnapshot(queuedRef, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setBuildings(data);
    });
  }, []);

  async function getCollectionOnce() {
    let data = [];
    try {
      const colRef = collection(db, "buildingDataCollection");
      const snapshot = await getDocs(colRef);
      snapshot.docs.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      console.log(snapshot.docs);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // setBuildings(buildings);
  }

  async function addData({
    geoHash,
    buildingNumber,
    buildingCategory,
    buildingName,
    buildingDescription,
  }) {
    const colRef = collection(db, "buildingDataCollection");
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
      buildingName: buildingName === "" ? "unnamed" : buildingName,
      buildingDescription:
        buildingDescription === "" ? "No Data" : buildingDescription,
      created_at: date,
    };
    addDoc(colRef, data);
  }
  async function deleteData(id) {
    const docRef = doc(db, "buildingCollection", id);
    deleteDoc(docRef);
  }

  const value = { addData, deleteData, buildings };
  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
