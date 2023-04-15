import React from 'react';
import { useSelector } from 'react-redux';
//component
import NotAuthorized from './NotAuthorized';

const ProtectedPermission = ({ children, permissions }) => {
    const { user } = useSelector((state) => state.auth);

    if (!permissions.every((permission) => user.permissions.includes(permission))) {
        return <NotAuthorized />;
    }
    return <>{children}</>;
};

export default ProtectedPermission;
