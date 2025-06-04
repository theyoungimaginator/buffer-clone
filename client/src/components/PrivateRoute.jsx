import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Spin } from './ui/spin';

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <Spin size="lg" />
            <p className="ml-2 text-lg">Loading user data...</p>
        </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;