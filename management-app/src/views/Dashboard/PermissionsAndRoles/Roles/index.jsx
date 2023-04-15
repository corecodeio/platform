import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
//styles
import Styles from './Roles.module.css';
//icons
import { RiDeleteBinLine } from 'react-icons/ri';
import { HiOutlineDocumentAdd } from 'react-icons/hi';

const Roles = () => {
    const { user } = useSelector((state) => state.auth);
    const [roles, setRoles] = useState([]);
    const getRoles = async () => {
        try {
            const response = await axios.get('/api/management/role');
            console.log(response);
            if (response.data.successful) {
                setRoles(response.data.list)
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getRoles()
    }, []);
    return (
        <>
            <div className={Styles[`title`]}>
                <p>Roles</p>
                <button
                    disabled={
                        !['write:role'].every((permission) => user.permissions.includes(permission))
                    }
                >
                    Create role
                </button>
            </div>
            <table className={Styles[`table`]}>
                <thead className={Styles[`thead`]}>
                    <tr className={Styles[`tr`]}>
                        <th className={Styles[`name`]}>Name</th>
                        <th>Permissions</th>
                        {['write:role'].every((permission) =>
                            user.permissions.includes(permission)
                        ) && <th className={Styles[`add`]}>Add</th>}
                        {['delete:role'].every((permission) =>
                            user.permissions.includes(permission)
                        ) && <th className={Styles[`delete`]}>Delete</th>}
                    </tr>
                </thead>
                <tbody className={Styles[`tbody`]}>
                    {roles.map((role) => {
                        return (
                            <tr key={role.id} className={Styles[`tr`]}>
                                <th>{role.name}</th>
                                <th className={Styles[`permissions`]}>
                                    {role.permissions.map((permission) => (
                                        <p
                                            key={permission.id}
                                            className={Styles[`permission-item`]}
                                        >
                                            {permission.name}
                                            {['delete:role'].every((permission) =>
                                                user.permissions.includes(permission)
                                            ) && (
                                                <RiDeleteBinLine
                                                    className={Styles[`icon-delete`]}
                                                />
                                            )}
                                        </p>
                                    ))}
                                </th>
                                {['write:role'].every((permission) =>
                                    user.permissions.includes(permission)
                                ) && (
                                    <th>
                                        <HiOutlineDocumentAdd />
                                    </th>
                                )}
                                {['delete:role'].every((permission) =>
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

export default Roles;
