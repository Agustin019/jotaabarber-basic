import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const { user } = useAuth();

    if (user === '') {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
