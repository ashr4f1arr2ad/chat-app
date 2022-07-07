import React from "react";
import {userMessage} from "../../redux/reducers/messageSlice";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "./Avatar";
import AuthUser from "../auth/AuthUser";

// const initialState = {
//   userMessages: []
// }

// function userMessage(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return {userMessages: state.userMessages};
//     default:
//       throw new Error();
//   }
// }

export default function ChatListItems({ fname, lname, active, isOnline, id, imgPath }) {
  // const [user, setUser] = useState();
  // const [state, dispatch] = useReducer(userMessage, initialState);
  
  // const selectChat = () => {
  //   // for (let index = 0; index < e.currentTarget.parentNode.children.length; index++) {
  //   //   e.currentTarget.parentNode.children[index].classList.remove("active");
  //   // }
  //   // e.currentTarget.parentNode.classList.add("active");
  //   console.log(user);
  // };

  // const [userId, setUserId] = useState();

  const { http } = AuthUser();

  const dispatch = useDispatch();
  const messages = useSelector(state => state.message.userMessage);
  // console.log(messages);
  // const [message, setMessage] = useState([]);

  // useEffect(() => {
  //   userMessages();
  // });

  const userMessages = async (id) => {
    http.get(`/user_message/${id}`).then((res) => {
      // console.log(res);
      dispatch(userMessage(res.data));
    });
  }
  
  // const selectUser = (userId) => {
  //   // console.log(userId);
  //   dispatch({
  //     type: 'message',
  //     payload: userId
  //   });
  // }

  return (
    <div
      onClick={() => userMessages(id)}
      className={`chatlist__item ${
        active ? active : ""
      } `}
    >
      <Avatar
        image={
          imgPath ? "http://127.0.0.1:8000"+imgPath : "#"
        }
        isOnline={isOnline}
      />
      <div className="userMeta">
        <p>{fname} {lname}</p>
        <span className="activeTime">32 mins ago</span>
      </div>
    </div>
  );
}
