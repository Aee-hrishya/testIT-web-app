import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  if (isAuthenticated === null) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
