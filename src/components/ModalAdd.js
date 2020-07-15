import React, { useState } from "react";
import Modal from "./Modal";
import { useContext } from "react";
import { store } from "../store/store";

export default function ModalAdd() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const [show, setShow] = useState(false);

  const close = () => {
    dispatch({ type: "SET_SHOW_ADD_MODAL", value: false });
  };

  const content = () => (
    <div>
      <div className="form-group">
        <label htmlFor="label">Label</label>
        <input type="text" id="label" placeholder="Sunset" required />
      </div>
      <div className="form-group">
        <label htmlFor="photo">Photo URL</label>
        <input
          type="text"
          id="photo"
          placeholder="https://unsplash.com/2332.jpg"
          required
        />
      </div>
    </div>
  );
  const actions = () => {
    return (
      <div>
        <button className="btn btn-light" onClick={close}>
          Cancel
        </button>
        <button className="btn btn-green">Submit</button>
      </div>
    );
  };

  return (
    <Modal title="Add a new photo" content={content()} actions={actions()} />
  );
}
