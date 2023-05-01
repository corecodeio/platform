import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
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
            const response = await axios.get('/api/role');
            if (response.data.successful) {
                setRoles(response.data.list);
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getRoles();
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
                        const deleteRole = async () => {
                            try {
                                const response = await axios.delete('/api/role', {
                                    data: {
                                        role_id: role.id
                                    }
                                });
                                if (response.data.successful) {
                                    enqueueSnackbar(response.data.message, { variant: 'success' });
                                    getRoles();
                                } else {
                                    enqueueSnackbar(response.data.message, { variant: 'error' });
                                }
                            } catch (error) {
                                console.log(error);
                                enqueueSnackbar('500 server error', { variant: 'error' });
                            }
                        };
                        return (
                            <tr key={role.id} className={Styles[`tr`]}>
                                <th>{role.name}</th>
                                <th className={Styles[`permissions`]}>
                                    {role.permissions.map((permission) => {
                                        const deleteAssociation = async () => {
                                            try {
                                                const response = await axios.delete(
                                                    '/api/role/association',
                                                    {
                                                        data: {
                                                            role_id: role.id,
                                                            permission_id: permission.id
                                                        }
                                                    }
                                                );
                                                if (response.data.successful) {
                                                    enqueueSnackbar(response.data.message, {
                                                        variant: 'success'
                                                    });
                                                    getRoles();
                                                } else {
                                                    enqueueSnackbar(response.data.message, {
                                                        variant: 'error'
                                                    });
                                                }
                                            } catch (error) {
                                                console.log(error);
                                                enqueueSnackbar('500 server error', {
                                                    variant: 'error'
                                                });
                                            }
                                        };
                                        return (
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
                                                        onClick={deleteAssociation}
                                                    />
                                                )}
                                            </p>
                                        );
                                    })}
                                </th>
                                {['write:role'].every((permission) =>
                                    user.permissions.includes(permission)
                                ) && (
                                    <th>
                                        <HiOutlineDocumentAdd className={Styles[`table-icon`]} />
                                    </th>
                                )}
                                {['delete:role'].every((permission) =>
                                    user.permissions.includes(permission)
                                ) && (
                                    <th>
                                        <RiDeleteBinLine
                                            className={Styles[`table-icon`]}
                                            onClick={deleteRole}
                                        />
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
