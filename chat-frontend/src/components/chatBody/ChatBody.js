import React, {useEffect, useState} from "react";
// import axios from 'axios';
import {useDispatch} from "react-redux";
import "./chatBody.css";
// import Nav from "../nav/Nav";
import ChatBodyInner from "./ChatBodyInner";
import { activeUsers, activeUser, leaveUser } from "../../redux/reducers/messageSlice";

export default function ChatBody() {
  const dispatch = useDispatch();

  useEffect(() => {
    activeuser();
  }, []);

  const activeuser = () => {
    window.Echo.join('liveuser')
    .here((users) => {
      // console.log(users);
      dispatch(activeUsers(users));
      // setUserActive(users);
    })
    .joining((user) => {
      // console.log(user);
      // dispatch(activeUsers(user));
        dispatch(activeUser(user));
    })
    .leaving((user) => {
      console.log(user.fname);
      dispatch(leaveUser(user));
    })
  }

  return (
    <div className="main__div">
      <div className="main__div__inner">
          {/* <Nav /> */}
          <ChatBodyInner />
      </div>
    </div>
  );
}
