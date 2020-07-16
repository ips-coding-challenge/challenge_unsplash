import React, { useContext, useState } from "react";
import { store } from "../store/store";

const Header = ({ addModal }) => {
  const globalState = useContext(store);
  const { state, dispatch } = globalState;
  const [query, setQuery] = useState("");

  const putFocus = () => {
    const input = document.querySelector(".input--search");
    input.focus();
  };

  const handleClick = (e) => {
    e.preventDefault();

    dispatch({ type: "SET_SHOW_MODAL", value: { name: "add", show: true } });
  };

  const search = (e) => {
    if (e.key === "Enter") {
      dispatch({ type: "SET_QUERY", value: query });
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <img
          src="/img/my_unsplash_logo.svg"
          alt="logo"
          className="header__logo"
        />
        <div className="header__search" onClick={putFocus}>
          <div className="input-group">
            <i className="zmdi zmdi-search"></i>
            <input
              className="input--search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search"
              onKeyDown={search}
            />
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
