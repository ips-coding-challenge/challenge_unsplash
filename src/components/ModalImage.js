import React from "react";
import Modal from "./Modal";

function ModalImage({ image, show }) {
  if (!image) {
    return <></>;
  }
  const content = (
    <img style={{ maxWidth: "100%" }} src={image.url} alt={image.name} />
  );
  return <Modal show={show} content={content}></Modal>;
}

export default ModalImage;
