import React from 'react';
import {Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ()=> {

  const isAuth = !!localStorage.getItem('token');
  console.log(isAuth);
  return (
    
        isAuth?
        <Outlet />
        : 
        <Navigate to="/login" />
  )
}