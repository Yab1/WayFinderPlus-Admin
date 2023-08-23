import { createContext, useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../services/firebase/connection";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userInput, setUserInput] = useState({ email: "", password: "" });
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const [logged, setLogged] = useState(localStorage.getItem("logged"));
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    logged && localStorage.setItem("logged", logged);
    currentUser &&
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [logged, currentUser]);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    id === "email"
      ? setUserInput((prevUser) => ({
          ...prevUser,
          email: value,
        }))
      : setUserInput((prevUser) => ({
          ...prevUser,
          password: value,
        }));
  };

  const auth = getAuth(app);
  function login() {
    setCurrentUser();
    setErrorMsg("");
    signInWithEmailAndPassword(auth, userInput.email, userInput.password)
      .then((cred) => {
        setCurrentUser(cred.user);
        setLogged(!logged);
      })
      .catch((err) => {
        setErrorMsg(err.code.split("/")[1]);
        console.log(errorMsg);
      });
  }
  function logout() {
    signOut(auth).then(() => {
      setLogged(!logged);
      setCurrentUser();
    });
    localStorage.clear();
  }

  const value = {
    currentUser,
    userInput,
    handleChange,
    login,
    logout,
    errorMsg,
    logged,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
