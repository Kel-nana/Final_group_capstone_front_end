import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PrivateRoute({ element }) {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? element : <Navigate to="/login" replace />;
}

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};
