import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import AuthUser from "../auth/AuthUser";
import Modal from "./Modal";
import {userMessage} from "../../redux/reducers/messageSlice";

// const allChatUserItems = [
//   {
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     id: 1,
//     name: "Tim Hover",
//     active: true,
//     isOnline: true,
//   },
//   {
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     id: 2,
//     name: "Ayub Rossi",
//     active: false,
//     isOnline: false,
//   },
//   {
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
//     id: 3,
//     name: "Hamaad Dejesus",
//     active: false,
//     isOnline: false,
//   },
//   {
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
//     id: 4,
//     name: "Eleni Hobbs",
//     active: false,
//     isOnline: true,
//   },
//   {
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
//     id: 5,
//     name: "Elsa Black",
//     active: false,
//     isOnline: false,
//   },
//   {
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     id: 6,
//     name: "Kayley Mellor",
//     active: false,
//     isOnline: true,
//   },
//   {
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     id: 7,
//     name: "Hasan Mcculloch",
//     active: false,
//     isOnline: true,
//   },
//   {
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     id: 8,
//     name: "Autumn Mckee",
//     active: false,
//     isOnline: false,
//   },
//   {
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
//     id: 9,
//     name: "Allen Woodley",
//     active: false,
//     isOnline: true,
//   },
//   {
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
//     id: 10,
//     name: "Manpreet David",
//     active: false,
//     isOnline: true,
//   },
// ];

export default function ChatList() {
  const { http } = AuthUser();
  const dispatch = useDispatch();
  
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    usersLists();
  }, [])

  const usersLists = async (id) => {
    http.get(`/register`).then((res) => {
      console.log(res);
      setUsersList(res.data.users);
    });
  }

  // eslint-disable-next-line
  // const [allChatUsers, setAllChatUsers] = useState(allChatUserItems);

  const removeLocalStorage = () => {
    setTimeout(() => {
      sessionStorage.clear('token');
      navigate('/login');
      dispatch(userMessage([]));
    }, 2000)
  }
  
  return (
    <div className="main__chatlist">
      {/* <button className="btn" onClick={() => {setModalOpen(true);}}>
        <i className="fa fa-plus"></i>
        <span>New conversation</span>
      </button> */}
      <div className="chatlist__heading mb-4">
        <h2>Chats</h2>
        {/* <button className="btn-nobg">
          <i className="fa fa-ellipsis-h"></i>
        </button> */}
      </div>
      <div className="chatList__search">
        <div className="search_wrap">
          <input type="text" placeholder="Search Here" required onChange={(e) => {setSearchValue(e.target.value)}}/>
          {/* <button className="search-btn">
            <i className="fa fa-search"></i>
          </button> */}
        </div>
      </div>
      <div className="chatlist__items">
        {usersList.filter((user) => {
          if(searchValue === "") {
            return user;
          } else if(user.fname.toLowerCase().includes(searchValue.toLowerCase())) {
            return user;
          }
        }).map((user, index) => (
            <ChatListItems
              fname={user.fname}
              lname={user.lname}
              key={user.id}
              id={user.id}
              imgPath={user.image}
              // active={user.active ? "active" : ""}
              // isOnline={user.isOnline ? "active" : ""}
              // image={user.image}
            />
          )
        )}
      </div>
      <div className="profile__logout">
        <button onClick={removeLocalStorage}>Logout</button>
      </div>
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </div>
  );
}
