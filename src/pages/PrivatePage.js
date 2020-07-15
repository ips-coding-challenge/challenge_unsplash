import React, { useContext } from "react";
import { store } from "../store/store";
import { Redirect } from "@reach/router";
// import Login from "./LoginPage";

const PrivatePage = (props) => {
  const globalState = useContext(store);
  const { state } = globalState;
  const { as: Comp, ...otherProps } = props;

  return (
    <>
      {state.user ? (
        <Comp {...otherProps} />
      ) : (
        <Redirect to="/login" replace={true} noThrow />
      )}
    </>
  );
};

export default PrivatePage;
