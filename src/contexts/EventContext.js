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

export const EventContext = createContext();

export default function EventContextProvider({ children }) {
  const db = getFirestore();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const db = getFirestore();
    // Real Time data gathering
    const colRef = collection(db, "EventCollection");
    const queuedRef = query(colRef, orderBy("buildingNumber"));
    onSnapshot(queuedRef, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setEvents(data);
    });
  }, []);

  async function getCollectionOnce() {
    let data = [];
    try {
      const colRef = collection(db, "EventCollection");
      const snapshot = await getDocs(colRef);
      snapshot.docs.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    // setEvents(buildings);
  }

  async function addData({
    eventName,
    startDate,
    endDate,
    geoHash,
    eventCategory,
    eventDescription,
  }) {
    const colRef = collection(db, "EventCollection");
    let date =
      new Date().getDate() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getFullYear();

    let data = {
      eventName: eventName === "" ? "unnamed" : eventName,
      startDate,
      endDate,
      geoHash,
      eventCategory,
      eventDescription:
        eventDescription === "" ? "No Description Available" : eventDescription,
      created_at: date,
    };
    // addDoc(colRef, data);
  }
  async function deleteData(id) {
    const docRef = doc(db, "EventCollection", id);
    deleteDoc(docRef);
  }

  const value = { addData, deleteData, events };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}
