import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import ModalAdd from "../components/ModalAdd";
import { firestore } from "../firebase";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import { store } from "../store/store";
import { Redirect } from "@reach/router";
import ModalImage from "../components/ModalImage";

const GalleryPage = () => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const [showAddModal, setShowAddModal] = useState(false);
  const [pictures, setPictures] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const unsuscribe = firestore
      .collection("images")
      .orderBy("created_at", "desc")
      .onSnapshot((snap) => {
        setFirstLoad(false);
        let images = [];
        snap.forEach((doc) => {
          images.push(doc.data());
        });
        console.log(`Images`, images);
        setPictures(images);
      });

    return unsuscribe;
  }, []);

  useEffect(() => {
    const imagesRef = firestore.collection("images");

    const fetchImages = async () => {
      let results;

      if (state.query !== "") {
        results = await imagesRef
          .where("name_insensitive", "==", state.query.toLowerCase())
          .orderBy("created_at", "desc")
          .get();
      } else {
        results = await imagesRef.orderBy("created_at", "desc").get();
      }
      let images = [];
      console.log(`Results`, results.size);
      results.forEach((snap) => {
        images.push(snap.data());
      });
      setPictures(images);
    };
    if (!firstLoad) {
      console.log(`First load false i can call fetchImages`);
      fetchImages();
    }
  }, [state.query]);

  useEffect(() => {
    const elem = document.querySelector(".grid");
    if (elem) {
      const msnry = new Masonry(elem, {
        // options
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true,
      });

      imagesLoaded(elem).on("progress", function () {
        msnry.layout();
      });
    }
  }, [pictures]);

  const handleClickImage = (image) => {
    dispatch({ type: "SET_SHOW_IMAGE_MODAL", value: true });
    setSelectedImage(image);
  };

  return (
    <div>
      <Header addModal={setShowAddModal} />
      <ModalAdd />
      <ModalImage image={selectedImage} show={state.showImageModal} />
      {pictures.length > 0 && (
        <div className="grid">
          <div className="grid-sizer"></div>
          {pictures.map((p, i) => {
            return (
              <div
                className="grid-item"
                key={i}
                onClick={() => handleClickImage(p)}
              >
                <img src={p.url} alt={p.name} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
