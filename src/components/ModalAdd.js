import React, { useState } from "react";
import firebase from "firebase/app";
import Modal from "./Modal";
import { useContext } from "react";
import { store } from "../store/store";
import { firestore } from "../firebase";

export default function ModalAdd() {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const addImage = async () => {
    const image = firestore.collection("images").doc();
    if (!name && !url) return;
    try {
      const newImage = await image.set({
        id: image.id,
        name,
        name_insensitive: name.toLowerCase(),
        url,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`New image`, newImage);
      dispatch({ type: "SET_SHOW_ADD_MODAL", value: false });
      setName("");
      setUrl("");
    } catch (e) {
      console.log(`Error`, e);
    }
  };

  const close = () => {
    dispatch({ type: "SET_SHOW_ADD_MODAL", value: false });
  };

  const content = () => (
    <div>
      <div className="form-group">
        <label htmlFor="label">Label</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="label"
          placeholder="Sunset"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="photo">Photo URL</label>
        <input
          type="text"
          id="photo"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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
        <button className="btn btn-green" onClick={addImage}>
          Submit
        </button>
      </div>
    );
  };

  return (
    <Modal
      show={state.showAddModal}
      title="Add a new photo"
      content={content()}
      actions={actions()}
    />
  );
}
