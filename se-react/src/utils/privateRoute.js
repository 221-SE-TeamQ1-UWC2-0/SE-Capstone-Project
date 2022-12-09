import { Outlet, Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
// import AuthContext from '../context/AuthContext';

function PrivateRoute() {
  const {User} = useContext(AuthContext)

  return User ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute;
