import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { isLoged } = useSelector(state => state.logedUserSlice);

  if (!isLoged) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;