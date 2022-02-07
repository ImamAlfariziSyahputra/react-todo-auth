import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RequiredLogin({ children }) {
  // const location = useLocation();
  const auth = useSelector((state) => state.auth);

  //! if not logged in, redirect to login page
  if (!auth?._id) {
    return <Navigate to="/login" />;
  }

  return children;
}
