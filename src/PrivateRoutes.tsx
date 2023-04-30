import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from './services/AuthContext';

const ProtectedRoute = ({ children }: any) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;

// import React, { useState } from "react"
// import { Outlet, Navigate, } from 'react-router-dom'
// import { UserAuth } from "./services/AuthContext"

// const ProtectedRoute = () => {
//     const {currentUser} = UserAuth()

//     let auth = {'token':currentUser? true: false}
//     return(
//         auth.token ? <Outlet/> : <Navigate to="/login" />
//     )
// }

// export default ProtectedRoute



