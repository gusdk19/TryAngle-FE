// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from "./User/UseAuthStore";

const ProtectedRoute = ({children }) => {
  const { isLoggedIn, login, logout } = useAuthStore();
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{back : true}} replace />;
  }
  return children;
};

export default ProtectedRoute;