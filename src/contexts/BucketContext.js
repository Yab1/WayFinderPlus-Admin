import { useState, createContext, useRef, useEffect } from "react";
import { app } from "../services/firebase/connection";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const BucketContext = createContext();

export default function BucketContextProvider({ children }) {
  const storage = getStorage(app);
  const storageRef = ref(storage);

  const [downloadURL, setDownloadURL] = useState(null);
  const [uploadError, setError] = useState(null);
  const [resetURL, setResetURL] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (downloadURL && resetURL) {
      setDownloadURL(null); // Reset downloadURL to null
      setResetURL(false);
    }
  }, [downloadURL, resetURL]);

  function uploadImage(imageUpload, buildingNumber, imageType, userID) {
    const path =
      imageType === "indoor"
        ? `adama-science-and-technology-indoors/`
        : `/adama-science-and-technology-street-view/`;
    const imagesRef = ref(storageRef, `${path}${buildingNumber}`);
    const uploadTask = uploadBytesResumable(imagesRef, imageUpload);
    if (process.env.REACT_APP_FIREBASE_ADMIN_ID === userID) {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const snapshotProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(snapshotProgress);
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          if (uploadTask.snapshot.state === "success") {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setDownloadURL(url);
            });
          }
        }
      );
    } else {
      alert("not allowed");
    }
  }

  const trigger = () => {
    setResetURL(true);
  };

  const value = { uploadImage, downloadURL, trigger, uploadError, progress };
  return (
    <BucketContext.Provider value={value}>{children}</BucketContext.Provider>
  );
}
