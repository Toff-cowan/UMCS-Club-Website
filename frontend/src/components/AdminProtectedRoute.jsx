import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }
  return children;
}
