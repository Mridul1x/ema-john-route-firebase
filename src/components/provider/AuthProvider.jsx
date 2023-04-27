import React, { createContext, useEffect } from "react";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const createUser = (email, pass) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const userSignIn = (email, pass) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubcscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });
    return () => {
      return unsubcscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    userSignIn,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
