import React from "react";
import "./userProfile.css";
import AuthUser from "../auth/AuthUser";

export default function UserProfile() {
  const { user } = AuthUser();

  const toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };
  return (
    <div className="main__userprofile">
      <div className="profile__card user__profile__image">
        <div className="profile__image">
          <img width="100" height="100"src={"http://127.0.0.1:8000"+user.image} alt="" />
        </div>
        <h4>{user.fname} {user.lname}</h4>
      </div>
      <div className="profile__card">
        <div className="card__header" onClick={toggleInfo}>
          <h4>Privacy</h4>
          <i className="fa fa-angle-down"></i>
        </div>
        <div className="card__content">
            In the Privacy Policy, we explain how we collect, use, share, retain and transfer information. We also let you know your rights. Each section of the Policy includes helpful examples and simpler language to make our practices easier to understand. We've also added links to resources where you can learn more about the privacy topics that interest you.
        </div>
      </div>
    </div>
  );
}
