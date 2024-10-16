import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

/*************  ✨ Codeium Command ⭐  *************/
/******  d895ffbe-449e-4316-8a5b-aa5169cf17b6  *******/
const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    console.log("User ID: ", user.uid);
    console.log("User email: ", user.email);

    return <Outlet />;
};

export default ProtectedRoute;
