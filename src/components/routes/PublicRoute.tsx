import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

const PublicRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
