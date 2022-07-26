import React from "react";
import Avatar from "../chatList/Avatar";
import AuthUser from "../auth/AuthUser";
import moment from "moment";

export default function ChatItem({userId, msg, image, id, time, isOnline}) {
  const { user } = AuthUser();

  return (
    <div
      className={`chat__item ${userId===id ? "other" : ""}`}
    >
      <div className="chat__item__content">
        <div className="chat__msg">{msg}</div>
        <div className="chat__meta">
          <span>{moment(time).startOf('seconds').fromNow()}</span>
        </div>
      </div>
      <Avatar image={userId===id ? "http://127.0.0.1:8000"+image : "http://127.0.0.1:8000"+user.image} isOnline={isOnline} />
    </div>
  );
}
