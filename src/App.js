import React, { useContext, useState, useEffect } from "react";
import { Router } from "@reach/router";
import LoginPage from "./pages/LoginPage";
import GalleryPage from "./pages/GalleryPage";
import { store } from "./store/store";
import { auth } from "./firebase";
import "./css/app.scss";
import PrivatePage from "./pages/PrivatePage";

function App() {
  const globalState = useContext(store);
  const { dispatch, state } = globalState;
  const [init, setInit] = useState(true);

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(
      (user) => {
        console.log(`User from app`, user);
        dispatch({ type: "SET_USER", value: user });
        dispatch({ type: "SET_LOADING", value: false });
        setInit(false);
      },
      (e) => {
        console.error(e);
        setInit(false);
        dispatch({ type: "SET_LOADING", value: false });
      }
    );

    return unsuscribe;
  }, []);

  if (init || state.loading) {
    return (
      <div className="loading">
        <i className="zmdi zmdi-settings zmdi-hc-spin"></i>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="container">
        {console.log(`env`, process.env.REACT_APP_FIREBASE_API_KEY)}
        <PrivatePage as={GalleryPage} path="/" />
        {!state.user && <LoginPage path="/login" />}
      </div>
    </div>
  );
}

export default App;
