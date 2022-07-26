import React from "react";

export default function Avatar({ image }) {

  return (
    <div className="avatar">
      <div className="avatar-img">
        <img width="80" height="80" src={image} alt="#" />
      </div>
    </div>
  );
}
