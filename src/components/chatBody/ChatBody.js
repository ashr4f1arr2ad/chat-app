import React, {useEffect} from "react";
// import axios from 'axios';
import "./chatBody.css";
// import Nav from "../nav/Nav";
import ChatBodyInner from "./ChatBodyInner";
import AuthUser from "../auth/AuthUser";

export default function ChatBody() {
  const { messages } = AuthUser();
  console.log(messages);

  // useEffect(() => {
  //   userAll();
  // });

  // const userAll = async () => {
  //   const res = await axios.get('http://127.0.0.1:8000/api/user_message');
  //   console.log(res);
  // }

  return (
    <div className="main__div">
      <div className="main__div__inner">
          {/* <Nav /> */}
          <ChatBodyInner />
      </div>
    </div>
  );
}
