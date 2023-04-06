import React from 'react';
//import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    if (false) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
};

export default ProtectedRoutes;
