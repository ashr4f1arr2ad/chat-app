import React from "react";
import "./nav.css";
import logo from "./../../images/logo.png";

export default function Nav() {
  return (
    <div className="navDiv">
      <div className="nav__blocks">
        <img src={logo} alt="" />
      </div>
      <div className="nav__blocks"></div>
      <div className="nav__blocks"></div>
    </div>
  );
}
