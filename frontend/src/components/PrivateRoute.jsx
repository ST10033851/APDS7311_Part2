import React from 'react';
import { Navigate } from 'react-router-dom';

//This component will be used to protect chosen routes
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token');

  //If user is not logged in, they will be redirected to the home page
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
