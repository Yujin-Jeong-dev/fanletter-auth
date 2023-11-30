import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ requireUser, children }) {
    const isAuth = useSelector((state) => state.auth).loginState;
    console.log(isAuth);
    //로그인 상태인 경우만 홈, 상세, 프로필 화면 접근 가능
    //로그아웃 상태에서 로그인 화면만 접근 가능 
    if ((requireUser && isAuth) || (!requireUser)) return children;
    return <Navigate to='/login' replace />


}

