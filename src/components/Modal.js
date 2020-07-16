import React, { useRef, useEffect, useState, useContext } from "react";
import { store } from "../store/store";
import { firestore } from "../firebase";

const Modal = ({ title, content, actions, type, show }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  useEffect(() => {
    const onClickOutside = (e) => {
      const el = document.querySelector(".modal-body");
      console.log(`El`, el);
      console.log(`el contains`, el.contains(e.target));
      if (!el.contains(e.target)) {
        dispatch({
          type: "SET_SHOW_MODAL",
          value: { name: null, show: false },
        });
      }
    };

    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div className={`modal-body ${!type ? "modal-lg" : type}`}>
        {title && <div className="modal-body__title">{title}</div>}
        <div className="modal-body__content">{content}</div>
        {actions && <div className="modal-body__actions">{actions}</div>}
      </div>
    </div>
  );
};

export default Modal;
