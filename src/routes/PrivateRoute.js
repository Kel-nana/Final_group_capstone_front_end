/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ element, isLoggedIn, ...props }) {
  console.log(isLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Route {...props} element={element} />;
}

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default PrivateRoute;
