import React from 'react';
//styles
import Styles from './PermissionsAndRoles.module.css';
//components
import Roles from './Roles';
import Permissions from './Permissions';

const PermissionsAndRoles = () => {
    return (
        <div className={Styles[`main`]}>
            <Roles />
            <Permissions />
        </div>
    );
};

export default PermissionsAndRoles;
