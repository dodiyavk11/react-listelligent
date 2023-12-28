// ProtectedRoutes.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Make sure you are importing these correctly
import { useAuth } from './AuthContext';

const ProtectedRoutes = ({ element, requiredRole, ...props }) => {
  const { isAuthenticated, role } = useAuth();
  const localStorageRole = localStorage.getItem('isAdmin');
  if (!isAuthenticated && (requiredRole && role !== requiredRole)) {
    return <Navigate to="/login" />;
  }

  return <Route {...props} element={element} />;
};

export default ProtectedRoutes;
