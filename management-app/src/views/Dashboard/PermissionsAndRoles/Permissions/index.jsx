import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//styles
import Styles from './Permissions.module.css';
//icons
import { RiDeleteBinLine } from 'react-icons/ri';

const Permissions = () => {
    const { user } = useSelector((state) => state.auth);
    const [roles, setRoles] = useState([]);
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
                    {roles.map((role) => {
                        return (
                            <tr key={role.id} className={Styles[`tr`]}>
                                <th>{role}</th>
                                <th className={Styles[`permissions`]}>
                                    <p className={Styles[`permission-item`]}>{'demo:demo'}</p>
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
