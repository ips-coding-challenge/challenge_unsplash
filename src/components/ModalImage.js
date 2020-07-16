import React, { useContext, useRef, useState } from "react";
import Modal from "./Modal";
import { store } from "../store/store";
import { firestore } from "../firebase";

function ModalImage({ image }) {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [imageName, setImageName] = useState("");

  const deleteImage = async (e) => {
    if (!image) return;
    if (e.key === "Enter" || e.type === "click") {
      if (imageName === image.name) {
        try {
          const result = await firestore
            .collection("images")
            .doc(image.id)
            .delete();

          dispatch({
            type: "SET_SHOW_MODAL",
            value: { name: null, show: false },
          });
        } catch (e) {
          console.log(`Error`, e);
        }
      }
    }
  };

  if (!image) {
    return <></>;
  }
  const content = (
    <>
      <figure>
        <img style={{ maxWidth: "100%" }} src={image.url} alt={image.name} />
        <figcaption>{image.name}</figcaption>
      </figure>
    </>
  );

  const actions = (
    <>
      {!showDeleteForm && (
        <i
          className="zmdi zmdi-delete delete-icon"
          onClick={() => setShowDeleteForm(true)}
        ></i>
      )}
      {showDeleteForm && (
        <>
          <div className="form-group" style={{ flex: "2" }}>
            <input
              type="text"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              placeholder={image.name}
              onKeyDown={deleteImage}
            />
          </div>
          <div className="form-group" style={{ flex: "1" }}>
            <button
              className="btn btn-red"
              style={{ alignSelf: "flex-end" }}
              onClick={deleteImage}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );

  return (
    <Modal
      show={state.showModal.name === "image" && state.showModal.show}
      content={content}
      actions={actions}
      type="modal-wide"
    ></Modal>
  );
}

export default ModalImage;
