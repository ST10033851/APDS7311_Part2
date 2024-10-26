import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import PropTypes from 'prop-types';

//This checks if the user is logged in and if false , redirects the user to the login page
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

