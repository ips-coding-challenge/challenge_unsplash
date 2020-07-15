import React, { useContext } from "react";
import { store } from "../store/store";
import { useState } from "react";
import { auth } from "firebase";
import { navigate } from "@reach/router";

const LoginPage = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    if (e.type === "click") {
      e.preventDefault();
    }

    if (!email || !password) {
      return;
    }

    if (e.key === "Enter" || e.type === "click") {
      try {
        const user = await auth().signInWithEmailAndPassword(email, password);
        dispatch({ type: "SET_USER", value: user });
        // return navigate("/");
        // console.log(`User`, user);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          placeholder="admin@test.fr"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          placeholder="password"
          onKeyDown={handleLogin}
          required
        />
      </div>

      <div className="form-group">
        <button className="btn btn-green align-self-end" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
