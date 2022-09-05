import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {userMessage} from "../../redux/reducers/messageSlice";
import Avatar from "./Avatar";
import AuthUser from "../auth/AuthUser";

export default function ChatListItems({ fname, lname, active, id, imgPath, isOnline }) {

  const { http } = AuthUser();

  const dispatch = useDispatch();

  const userMessages = async (id) => {
    http.get(`/user_message/${id}`).then((res) => {
      // console.log(res);
      dispatch(userMessage(res.data));
    });
  }

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
      />
      { isOnline ?
          <span className='isOnline'></span> :
          <span className='isOnline active'></span>
      }
      <div className="userMeta">
        <p>{fname} {lname}</p>
        <span className="activeTime">32 mins ago</span>
      </div>
    </div>
  );
}
