import React, { useState, useEffect } from "react";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import "./chatList.css";
import ChatListItems from "./ChatListItems";
import AuthUser from "../auth/AuthUser";
import Modal from "./Modal";
import { userMessage } from "../../redux/reducers/messageSlice";
import LoadingSpinner from "../auth/LoadingSpinner";

export default function ChatList() {
  const { http } = AuthUser();
  const dispatch = useDispatch();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const activeUsers = useSelector(state => state.message.usersActive);
  const singleUser = useSelector(state => state.message.user);
  const leaveUser = useSelector(state => state.message.leave);

  useEffect(() => {
    usersLists();
  }, [])

  const usersLists = async (id) => {
    setLoading(true);
    http.get(`/register`).then((res) => {
      // console.log(res);
      setUsersList(res.data.users);
      setLoading(false);
    });
  }

  const removeLocalStorage = () => {
    setTimeout(() => {
      sessionStorage.clear('token');
      navigate('/login');
      dispatch(userMessage([]));
    }, 2000)
  }

  const onlineUser = (id) => {
    // return _.find(usersActive, (obj) => {
    //   console.log(obj.id);
    //   // if(obj.id === id) {
    //   //   return true;
    //   // }
    // });
    return _.find(activeUsers, {'id': id});
    // console.log(_.find(usersActive, {'id': id}));
  }

  const LoadSpin = {
    'top': '50%'
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
        </div>
      </div>
      <div style={{'height': 'calc(100vh - calc(100vh / 2))'}}>
      {
        loading ?
          <LoadingSpinner styles={LoadSpin}/> :
          <div className="chatlist__items">
              {usersList.filter((users) => {
                if(searchValue === "") {
                  return users;
                } else if(users.fname.toLowerCase().includes(searchValue.toLowerCase()) || users.lname.toLowerCase().includes(searchValue.toLowerCase())) {
                  return users;
                }
              }).map((user) => (
                  <ChatListItems
                    fname={user.fname}
                    lname={user.lname}
                    key={user.id}
                    id={user.id}
                    imgPath={user.image}
                    isOnline={onlineUser(user.id) || singleUser.id === user.id || leaveUser.id === user.id}
                  />
                )
              )}
            </div>
          }
      </div>
      <div className="profile__logout">
        <button onClick={removeLocalStorage}>Logout</button>
      </div>
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
    </div>
  );
}
