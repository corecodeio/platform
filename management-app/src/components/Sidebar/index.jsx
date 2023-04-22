import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
//styles
import Styles from './Sidebar.module.css';
//icons
import { BiArrowFromRight, BiArrowFromLeft } from 'react-icons/bi';

const Sidebar = ({ title, options, path }) => {
    const { user } = useSelector((state) => state.auth);
    const [menu, setMenu] = useState(true);
    const navigate = useNavigate();
    return (
        <div className={Styles[`main`]}>
            <div className={Styles[`sidebar-${menu ? 1 : 0}`]}>
                <div className={Styles[`item`]}>
                    {menu ? (
                        <BiArrowFromRight
                            onClick={() => setMenu(false)}
                            className={Styles[`icon-0`]}
                        />
                    ) : (
                        <BiArrowFromLeft
                            onClick={() => setMenu(true)}
                            className={Styles[`icon-1`]}
                        />
                    )}
                    {menu && <p className={Styles[`text`]}>{title}</p>}
                </div>
                {options.map((item, index) => {
                    return item.permissions.every((permission) =>
                        user.permissions.includes(permission)
                    ) ? (
                        <div key={`key-${title}-${index}`} className={Styles[`item`]}>
                            <item.icon
                                className={Styles[`icon-0`]}
                                onClick={() => navigate(`/${path}${item.path}`)}
                            />
                            {menu && (
                                <p
                                    className={Styles[`text2`]}
                                    onClick={() => navigate(`/${path}${item.path}`)}
                                >
                                    {item.title}
                                </p>
                            )}
                        </div>
                    ) : null;
                })}
            </div>
            <div className={Styles[`outlet-${menu ? 1 : 0}`]}>
                <Outlet />
            </div>
        </div>
    );
};

export default Sidebar;
