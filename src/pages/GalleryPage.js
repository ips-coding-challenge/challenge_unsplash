import React, { useState } from "react";
import Header from "../components/Header";
import ModalAdd from "../components/ModalAdd";

const GalleryPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div>
      <Header addModal={setShowAddModal} />
      <ModalAdd />
    </div>
  );
};

export default GalleryPage;
