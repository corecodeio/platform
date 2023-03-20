import React from 'react';
import Styles from './Sidebar.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import options from './options';
//icons
import { AiOutlineDashboard } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';

const Sidebar = ({ menu, setMenu }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <div className={Styles[`container-${menu}`]}>
            <div className={Styles[`title`]}>
                <AiOutlineDashboard className={Styles[`title-icon`]} />
                <p onClick={() => navigate('/dashboard')} className={Styles[`title-text`]}>
                    Dashboard
                </p>
                <RxCross2 onClick={() => setMenu(false)} className={Styles[`cross`]} />
            </div>
            {options.map((option, x) => {
                return (
                    <React.Fragment key={`option-${x}`}>
                        <div
                            className={Styles[`menu`]}
                            style={{
                                borderLeft: `${
                                    pathname === `/dashboard${option.url ? '/' + option.url : ''}`
                                        ? '3'
                                        : '0'
                                }px solid #0D1E38`
                            }}
                        >
                            <option.icon className={Styles[`menu-icon`]} />
                            <p
                                onClick={() => {
                                    navigate(option.url);
                                    setMenu(false);
                                }}
                                className={Styles[`menu-text`]}
                            >
                                {option.title}
                            </p>
                        </div>
                        {option.list.map((item, y) => {
                            return (
                                <div
                                    key={`item-${y}`}
                                    className={Styles[`item`]}
                                    style={{
                                        borderLeft: `${
                                            pathname === `/dashboard/${option.url}/${item.url}`
                                                ? '3'
                                                : '0'
                                        }px solid #0f1f39`
                                    }}
                                >
                                    <item.icon className={Styles[`item-icon`]} />
                                    <p
                                        onClick={() => {
                                            navigate(`${option.url}/${item.url}`);
                                            setMenu(false);
                                        }}
                                        className={Styles[`item-text`]}
                                    >
                                        {item.title}
                                    </p>
                                </div>
                            );
                        })}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default Sidebar;
