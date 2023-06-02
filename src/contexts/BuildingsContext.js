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

export const BuildingsContext = createContext();

export default function BuildingsContextProvider({ children }) {
  const db = getFirestore();
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    // Real Time data gathering
    const colRef = collection(db, "buildingCollection");
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
      const colRef = collection(db, "buildingCollection");
      const snapshot = await getDocs(colRef);
      snapshot.docs.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
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
    const colRef = collection(db, "buildingCollection");
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
    // addDoc(colRef, data);
  }
  async function deleteData(id) {
    const docRef = doc(db, "buildingCollection", id);
    deleteDoc(docRef);
  }

  const value = { addData, deleteData, buildings };
  return (
    <BuildingsContext.Provider value={value}>
      {children}
    </BuildingsContext.Provider>
  );
}
