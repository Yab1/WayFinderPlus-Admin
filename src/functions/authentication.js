import { app } from "../firebase/connection";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default async function authentication(currentUser) {
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, currentUser.email, currentUser.password)
    .then(cred => {
      console.log(cred.user);
      console.log("here");
    })
    .catch(err => {
      console.log(err.message);
    });
}
