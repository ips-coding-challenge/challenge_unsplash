import React from "react";

function ImagePage({ image }) {
  return (
    <div>
      <img src={image.url} alt={image.name} />
    </div>
  );
}

export default ImagePage;
