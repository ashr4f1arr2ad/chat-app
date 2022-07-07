import React from 'react'
import { Navigate } from 'react-router-dom';
import AuthUser from './AuthUser';

export default function PublicRoute({ children }) {
    const { getToken } = AuthUser();
    // console.log(getToken());

    //Render Props Part Video Will Have To Watch
    return getToken() ? (children) : (<Navigate to="/login" />);
}