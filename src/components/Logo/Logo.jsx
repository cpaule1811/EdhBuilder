import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMenuStatus } from "../../actions";
import logo from "./ClipartKey_1267426.svg";
import "./Logo.css";

function Logo() {
  const menuStatus = useSelector((state) => state.menuStatus.menuStatus);
  const dispatch = useDispatch();
  let menuClass = "bars-container";

  if (menuStatus) {
    menuClass = "bars-container open";
  }

  return (
    <div className="logo">
      <div className="logo-wrapper">
        <div className="logo-container">
          <img src={logo} alt="logo"></img>
        </div>
        <span id="logo-text">EDH BUILDER</span>
      </div>
      <div
        onClick={() => dispatch(setMenuStatus(!menuStatus))}
        className={menuClass}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}

export default Logo;
