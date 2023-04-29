import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
//styles
import Styles from './Permissions.module.css';
//icons
import { RiDeleteBinLine } from 'react-icons/ri';

const Permissions = () => {
    const { user } = useSelector((state) => state.auth);
    const [permissions, setPermissions] = useState([]);
    const getPermissions = async () => {
        try {
            const response = await axios.get('/api/management/permission');
            if (response.data.successful) {
                setPermissions(response.data.list);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getPermissions();
    }, []);
    return (
        <>
            <div className={Styles[`title`]}>
                <p>Permission</p>
                <button
                    disabled={
                        !['write:permission'].every((permission) =>
                            user.permissions.includes(permission)
                        )
                    }
                >
                    Create permission
                </button>
            </div>
            <table className={Styles[`table`]}>
                <thead className={Styles[`thead`]}>
                    <tr className={Styles[`tr`]}>
                        <th className={Styles[`name`]}>Name</th>
                        <th>Associated roles</th>
                        {['delete:permission'].every((permission) =>
                            user.permissions.includes(permission)
                        ) && <th className={Styles[`delete`]}>Delete</th>}
                    </tr>
                </thead>
                <tbody className={Styles[`tbody`]}>
                    {permissions.map((permision) => {
                        return (
                            <tr key={permision.id} className={Styles[`tr`]}>
                                <th>{permision.name}</th>
                                <th className={Styles[`permissions`]}>
                                    {permision.permissions.map((role) => {
                                        return (
                                            <p key={role.id} className={Styles[`permission-item`]}>
                                                {role.name}
                                            </p>
                                        );
                                    })}
                                </th>
                                {['delete:permission'].every((permission) =>
                                    user.permissions.includes(permission)
                                ) && (
                                    <th>
                                        <RiDeleteBinLine />
                                    </th>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};

export default Permissions;
