import React, { useRef, useEffect, useState, useContext } from "react";
import { store } from "../store/store";

const Modal = ({ title, content, actions, show }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const modalRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        dispatch({ type: "SET_SHOW_ADD_MODAL", value: false });
      }
    };

    document.addEventListener("mousedown", onClickOutside);

    return () => {
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [modalRef]);

  return (
    <div className={`modal ${show ? "show" : ""}`}>
      <div ref={modalRef} className="modal-body">
        <div className="modal-body__title">{title}</div>
        <div className="modal-body__content">{content}</div>
        <div className="modal-body__actions">{actions}</div>
      </div>
    </div>
  );
};

export default Modal;
