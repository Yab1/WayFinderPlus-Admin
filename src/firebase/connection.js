import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyByUMrb32XM9dFUK1sMp_8W6hEm8PnF49s",
  authDomain: "customized-navigation-system.firebaseapp.com",
  projectId: "customized-navigation-system",
  storageBucket: "customized-navigation-system.appspot.com",
  messagingSenderId: "3696229373",
  appId: "1:3696229373:web:a1268fd804d7c55160f794",
};

// init firebase app
export const app = initializeApp(firebaseConfig);
