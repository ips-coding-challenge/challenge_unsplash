import React, { useState, useRef } from "react";
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
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  const addImage = async () => {
    setError(null);
    const image = firestore.collection("images").doc();
    if (!name && !url) {
      setError("Name and Url are required");
      return;
    }
    if (!url.startsWith("https://images.unsplash.com/")) {
      setError("I only allow image from unsplash");
      return;
    }
    try {
      const newImage = await image.set({
        id: image.id,
        name,
        name_insensitive: name.toLowerCase(),
        search_terms: name
          .trim()
          .split(" ")
          .map((s) => s.toLowerCase()),
        url,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log(`New image`, newImage);
      setName("");
      setUrl("");
      dispatch({ type: "SET_SHOW_MODAL", value: { name: null, show: false } });
    } catch (e) {
      console.log(`Error`, e);
      setError(e.message);
    }
  };

  const close = () => {
    dispatch({ type: "SET_SHOW_MODAL", value: { name: null, show: false } });
  };

  const content = (
    <>
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
      {error && (
        <div className="error" style={{ color: "red" }}>
          {error}
        </div>
      )}
    </>
  );
  const actions = (
    <>
      <button className="btn btn-light" onClick={close}>
        Cancel
      </button>
      <button className="btn btn-green" onClick={addImage}>
        Submit
      </button>
    </>
  );

  return (
    <Modal
      show={state.showModal.name === "add" && state.showModal.show}
      title="Add a new photo"
      content={content}
      actions={actions}
    />
  );
}
