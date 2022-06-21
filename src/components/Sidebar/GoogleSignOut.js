import React from "react";
import { useDispatch } from "react-redux";
import { signoutUser } from "../../actions";
import { Link } from "react-router-dom";
import enter from "../../icons/enter.svg";
import "./Sidebar.css";

function GoogleSignOut() {
  const dispatch = useDispatch();
  const signOut = () => {
    fetch(`${process.env.REACT_APP_API_URL}/signout`, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((success) => {
        if (success === 1) {
          dispatch(signoutUser());
        }
      });
  };

  return (
    <Link to="/">
      <div onClick={signOut} className="tab-dropdown tab">
        <img src={enter} alt="icon" width="25px" height="25px"></img>
        <span>Sign Out</span>
      </div>
    </Link>
  );
}

export default GoogleSignOut;
