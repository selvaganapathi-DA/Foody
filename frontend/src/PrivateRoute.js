import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from './auth';



const PrivateRoute = () => {   
      const isLoggedIn = window.localStorage.getItem("loggedin")
      return isLoggedIn =="true"? <Outlet/> : <Navigate to = "/login"/>;
    }

export default PrivateRoute;
