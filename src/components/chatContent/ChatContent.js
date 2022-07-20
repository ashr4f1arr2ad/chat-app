import React, { createRef, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import { inputMessages, userMessage } from "../../redux/reducers/messageSlice";
import AuthUser from "../auth/AuthUser";

// import {incrementByAmount} from "../../redux/reducers/messageSlice";

// const chatItems = [
//   {
//     key: 1,
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     type: "",
//     msg: "Hi Tim, How are you?",
//   },
//   {
//     key: 2,
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     type: "other",
//     msg: "I am fine.",
//   },
//   {
//     key: 3,
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     type: "other",
//     msg: "What about you?",
//   },
//   {
//     key: 4,
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     type: "",
//     msg: "Awesome these days.",
//   },
//   {
//     key: 5,
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     type: "other",
//     msg: "Finally. What's the plan?",
//   },
//   {
//     key: 6,
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     type: "",
//     msg: "what plan mate?",
//   },
//   {
//     key: 7,
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     type: "other",
//     msg: "I'm talking about the tutorial",
//   },
// ];

// const socket = io.connect("http://127.0.0.1:3001");

export default function ChatContent() {
  /*const dispatch = useDispatch();
  const count = useSelector(state => state.message.count);
  const [incrementAmount, setIncrementAmount] = useState(0);
  const addValue = Number(incrementAmount) || 0;*/
  const messagesEndRef = createRef(null);
  const {http, user, token} = AuthUser();

  const dispatch = useDispatch();
  // const [msg, setMsg] = useState("");
  // const [chat, setChat] = useState(chatItems);

  const messages = useSelector(state => state.message.userMessage.messages);
  const users = useSelector(state => state.message.userMessage.user);
  const inputMessage = useSelector(state => state.message.inputMessages);

  // eslint-disable-next-line
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  });
  
  const onStateChange = (e) => {
    dispatch(inputMessages(e.target.value));
  };
  
  const userId = typeof users != 'undefined' ? users.id : "No Id Found";
  const userImg = typeof users != 'undefined' ? users.image : "#";
  
  // console.log(userId);
  // console.log(inputMessage);

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

    if(inputMessage != "") {
      http.post("/send_message", data).then((res) => {
          // console.log(res);
          userMessages(userId);
        });
      dispatch(inputMessages(""));
    }
  }

  return (
    <div className="main__chatcontent">
      {/* <div>
      <h1>Redux {count}</h1>
      <input
            type = "text"
            value = {incrementAmount}
            onChange={e => setIncrementAmount(e.target.value)}
        />
        <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Count</button>
      </div> */}
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <Avatar
              isOnline="active"
              image={typeof users != 'undefined' ? "http://127.0.0.1:8000"+users.image : "https://dummyimage.com/80x80/000/fff"}
            />
            <p>{typeof users != 'undefined' ? users.fname + ' ' + users.lname : "No Message"}</p>
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
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <form onSubmit={handleSubmit} className="sendNewMessage">
          <button className="addFiles">
            <i className="fa fa-plus"></i>
          </button>
          <input
            type="text"
            placeholder="Type a message here"
            onChange={onStateChange}
            value={inputMessage}
          />
          <button type="submit" className="btnSendMsg" id="sendMsgBtn">
            <i className="fa fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
