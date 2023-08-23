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
    const colRef = collection(
      db,
      "Locations",
      "Adama Science And Technology",
      "EventsData"
    );
    const queuedRef = query(colRef);
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
      const colRef = collection(
        db,
        "Locations",
        "Adama Science And Technology",
        "EventsData"
      );
      const snapshot = await getDocs(colRef);
      snapshot.docs.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.log(error);
    }
    // setEvents(buildings);
  }

  async function addData(
    { eventName, startDate, endDate, geoHash, eventCategory, eventDescription },
    userID
  ) {
    const colRef = collection(
      db,
      "Locations",
      "Adama Science And Technology",
      "EventsData"
    );
    let date =
      new Date().getDate() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getFullYear();

    let data = {
      eventName: eventName === "" ? "Untitled Event" : eventName,
      startDate,
      endDate,
      geoHash,
      eventCategory,
      eventDescription:
        eventDescription === "" ? "No Description Available" : eventDescription,
      created_at: date,
    };
    if (process.env.REACT_APP_FIREBASE_ADMIN_ID === userID) {
      addDoc(colRef, data);
    } else {
      alert("not allowed");
    }
  }
  async function deleteEvents(id, userID) {
    const docRef = doc(
      db,
      "Locations",
      "Adama Science And Technology",
      "EventsData",
      id
    );
    if (process.env.REACT_APP_FIREBASE_ADMIN_ID === userID) {
      deleteDoc(docRef);
    } else {
      alert("not allowed");
    }
  }

  const value = { addData, deleteEvents, events };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
}
