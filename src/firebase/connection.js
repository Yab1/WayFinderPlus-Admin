import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByUMrb32XM9dFUK1sMp_8W6hEm8PnF49s",
  authDomain: "customized-navigation-system.firebaseapp.com",
  projectId: "customized-navigation-system",
  storageBucket: "customized-navigation-system.appspot.com",
  messagingSenderId: "3696229373",
  appId: "1:3696229373:web:a1268fd804d7c55160f794",
};

// init firebase app
const app = initializeApp(firebaseConfig);

// init service
const db = getFirestore(app);

async function getCollectionData() {
  // collection ref
  const colRef = collection(db, "admins");

  // get collection data
  const snapshot = await getDocs(colRef);
  const admins = snapshot.docs.map(admin => admin.data());
}
// const usrf = getCollectionData();

const auth = getAuth();
export function authentication(usr) {
  createUserWithEmailAndPassword(auth, usr.email, usr.password)
    .then(userCredential => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

// export function authentication(usr) {
//   console.log(usrf.email === usr.email);
//   console.log(usrf.password === usr.password);

//   signInWithEmailAndPassword(auth, usr.email, usr.password)
//     .then(cred => console.log("user logged in:", cred.user))
//     .catch(error => console.log(error.message));
// }

export default getCollectionData;
