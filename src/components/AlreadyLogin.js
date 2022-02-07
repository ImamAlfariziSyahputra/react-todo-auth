import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AlreadyLogin({ children }) {
  // const location = useLocation();
  const auth = useSelector((state) => state.auth);

  //* If Logged in, redirect to home page
  if (auth?._id) {
    return <Navigate to="/" replace />;
  }

  return children;
}
