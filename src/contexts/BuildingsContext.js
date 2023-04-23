import { useState } from "react";
import { createContext } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const BuildingsContext = createContext();

export default function BuildingsContextProvider({ children }) {
  const db = getFirestore();

  async function getData() {
    let data = [];
    try {
      const colRef = await collection(db, "buildingCollection");
      const snapshot = await getDocs(colRef);
      snapshot.docs.forEach(doc => data.push({ ...doc.data(), id: doc.id }));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // setBuildings(buildings);
  }

  // Real time Data collection
  const colRef = collection(db, "buildingCollection");
  var buildings = [];
  onSnapshot(colRef, snapshot => {
    buildings = [];
    snapshot.docs.forEach(doc => buildings.push({ ...doc.data(), id: doc.id }));
    console.log(buildings);
  });

  async function addData(form) {
    let date =
      new Date().getDate() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getFullYear();
    const colRef = await collection(db, "buildingCollection");
    addDoc(colRef, {
      ...form,
      created_at: date,
    });
  }

  async function deleteData(id) {
    const docRef = doc(db, "buildingCollection", id);
    deleteDoc(docRef);
    // console.log("delete me:", id);
  }

  const value = { getData, addData, deleteData, buildings };
  return (
    <BuildingsContext.Provider value={value}>
      {children}
    </BuildingsContext.Provider>
  );
}
