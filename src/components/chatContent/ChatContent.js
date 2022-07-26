import React, { createRef, useRef, useEffect, useState } from "react";
import Echo from 'laravel-echo';
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { inputMessages, userMessage } from "../../redux/reducers/messageSlice";
import AuthUser from "../auth/AuthUser";

export default function ChatContent() {
  // const messagesEndRef = createRef(null);
  const bottomRef = useRef(null);
  const {http, user, token} = AuthUser();

  const dispatch = useDispatch();
  const [typing, setTyping] = useState("");

  const messages = useSelector(state => state.message.userMessage.messages);
  const users = useSelector(state => state.message.userMessage.user);
  const inputMessage = useSelector(state => state.message.inputMessages);

  const userId = typeof users != 'undefined' ? users.id : "No Id Found";
  const userImg = typeof users != 'undefined' ? users.image : "#";
  // console.log(userId);

  const scrollToBottom = () => {
    // bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    bottomRef.current.scrollIntoView()
  }
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    echoInit();
    typingMessage();
  }, []);

  const echoInit = () => {
    window.Pusher = require('pusher-js');
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.REACT_APP_MIX_PUSHER_APP_KEY,
        cluster: process.env.REACT_APP_MIX_PUSHER_APP_CLUSTER,
        wsHost: window.location.hostname,
        wsPort: 6001,
        forceTLS: false,
        disableStats: true,
        // encrypted:true,
        authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
        auth: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
    });
    window.Echo.connector.options.auth.headers["Authorization"] =
      "Bearer " + token;
    window.Echo.options.auth = {
        headers: {
          Authorization: `Bearer ${token}`
      }
    };
    window.Echo.private(`chat.${user.id}`).listen('MessageSend', (e) => {
      console.log('Message Sent To Specific User');
      setTimeout(() => {
        userMessages(e.message.user_id);
      }, 100)
    });
  }

  // console.log(usersActive);

  const typingMessage = () => {
    window.Echo.private('typingevent')
    .listenForWhisper('typing', (e) => {
      // console.log(e.user.fname);
      // console.log(e.user.id);
      // console.log(e.user.fname);
      // // console.log(e.user_id);
      console.log(e.user.id === userId);
      // console.log(e.user_id == user.id);
      // console.log(e.user.id === userId && e.user_id === user.id);
      if(e.user_id === user.id) {
        setTyping(e.user.fname);
      }
      setTimeout(() => {
        setTyping("");
      }, 2000);
    });
  }

  const onStateChange = (e) => {
    dispatch(inputMessages(e.target.value));
  };

  const userMessages = async (id) => {
    http.get(`/user_message/${id}`).then((res) => {
      // console.log(res);
      dispatch(userMessage(res.data));
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      user_id: userId,
      message: inputMessage,
    }

    if(inputMessage !== "") {
      http.post("/send_message", data).then((res) => {
          // console.log(res);
          userMessages(userId);
        });
      dispatch(inputMessages(""));
    }
  }

  const typingEvent = () => {
    window.Echo.private('typingevent')
    .whisper('typing', {
        'user': user,
        'typing': inputMessage,
        'user_id': userId
     });
  }

  return (
    <div className="main__chatcontent">
       { users ?
        <>
          <div className="content__header">
            <div className="blocks">
              <div className="current-chatting-user">
                <Avatar image={typeof users != 'undefined' ? "http://127.0.0.1:8000"+users.image : "https://dummyimage.com/80x80/000/fff"} />
                <p>{typeof users != 'undefined' ? users.fname + ' ' + users.lname : ""}</p>
              </div>
            </div>

            {/* <div className="blocks">
              <div className="settings">
                <button className="btn-nobg">
                  <i className="fa fa-cog"></i>
                </button>
              </div>
            </div> */}
          </div>
          <div className="content__body">
            <div className="chat__items">
              {Array.isArray(messages) && messages.length > 0 && messages.map((itm, index) => (
                  <ChatItem
                    key={itm.id}
                    id={itm.user_id}
                    userId={userId}
                    msg={itm.message}
                    image={userImg}
                    time={itm.created_at}
                />
              ))}
              <div ref={bottomRef} />
            </div>
          </div>
          <div className="content__footer">
            {typing ? <p className="bg-white p-1.5">{typing} typing...</p> : ''}
            <form onSubmit={handleSubmit} className="sendNewMessage">
              <input
                type="text"
                placeholder="Type a message here"
                onChange={onStateChange}
                onKeyDown={typingEvent}
                value={inputMessage}
              />
              <button type="submit" className="btnSendMsg" id="sendMsgBtn">
                <i className="fa fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </> :
        <div className="flex items-center justify-center" style={{height: 'calc(100vh - 90px)'}}>
          <h2>Select Conversation</h2>
          <div ref={bottomRef} />
        </div>
      }
    </div>
  );
}
