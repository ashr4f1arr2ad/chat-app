import React from "react";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";

export default function ChatBodyInner() {
  return (
    <div className="main__chatbody">
        <ChatList />
        <ChatContent />
        <UserProfile />
    </div>
  );
}