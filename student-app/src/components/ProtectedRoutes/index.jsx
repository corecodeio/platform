import React from 'react';
//import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useStytchUser } from "@stytch/react";

const ProtectedRoutes = ({ children }) => {
    //const { isAuth } = useSelector((state) => state.auth);
    const { user } = useStytchUser();
    if (!user) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
};

export default ProtectedRoutes;
