import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AuthUser(){
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUsers = () => {
        const userString = sessionStorage.getItem('users');
        const users_detail = JSON.parse(userString);
        return users_detail;
    }

    const getMessages = () => {
        const userString = sessionStorage.getItem('messages');
        const users_detail = JSON.parse(userString);
        return users_detail;
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());
    const [users, setUsers] = useState(getUsers());
    const [messages, setMessages] = useState(getMessages());

    const saveToken = (token, user, users, messages) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('users', JSON.stringify(users));
        sessionStorage.setItem('messages', JSON.stringify(messages));

        setToken(token);
        setUser(user);
        setUsers(users);
        setMessages(messages);
        navigate('/');
    }

    const http = axios.create({
        baseURL:"http://127.0.0.1:8000/api",
        headers:{
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token ? token : 'No token Found'}`,
        }
    });

    return {
        setToken:saveToken,
        token,
        user,
        getToken,
        getUser,
        users,
        messages,
        http
    }
}