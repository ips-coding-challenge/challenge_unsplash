import React, { useContext } from "react";
import { store } from "../store/store";

const Header = ({ addModal }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;

  const handleClick = (e) => {
    e.preventDefault();

    dispatch({ type: "SET_SHOW_ADD_MODAL", value: true });
  };

  return (
    <header className="header">
      <div className="header-left">
        <img
          src="/img/my_unsplash_logo.svg"
          alt="logo"
          className="header__logo"
        />
        <div className="header__search">
          <div className="input-group">
            <i className="zmdi zmdi-search"></i>
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </div>

      <div className="header-right">
        <button className="btn btn-green" onClick={handleClick}>
          Add a photo
        </button>
        {/* <button className="btn btn-light">Logout</button> */}
      </div>
    </header>
  );
};

export default Header;
