import React from "react";
import Avatar from "../chatList/Avatar";
import AuthUser from "../auth/AuthUser";
import moment from "moment";

export default function ChatItem({userId, msg, image, id, time}) {
  const { user } = AuthUser();

  // (function () {
  //   let ip_address = "127.0.0.1";
  //   let socket_port = "3000";
  //   let socket = io(ip_address + ":" + socket_port);

  //   socket.on("Connection");
  // })

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
      <Avatar isOnline="active" image={userId===id ? "http://127.0.0.1:8000"+image : "http://127.0.0.1:8000"+user.image} />
    </div>
  );
}
