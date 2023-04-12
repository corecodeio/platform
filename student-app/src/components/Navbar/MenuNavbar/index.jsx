import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//styles
import Styles from './MenuNavbar.module.css';
//actions
import { logOut } from './../../../redux/actions/auth';
//icons
import { RxCross2 } from 'react-icons/rx';
import { TbLogout } from 'react-icons/tb';
import { AiOutlineSetting } from 'react-icons/ai';
//components
import LinkNavbar from '../LinkNavbar';

const MenuNavbar = ({ setMenu, options = [] }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(logOut());
    };
    const handleClose = () => {
        setMenu(false);
    };
    const handleSetting = () => {
        navigate('setting');
        setMenu(false);
    };
    return (
        <div className={Styles[`main`]}>
            <div className={Styles[`head`]}>
                <p className={Styles[`title`]}>Menu</p>{' '}
                <RxCross2 onClick={handleClose} className={Styles[`close`]} />
            </div>
            <div className={Styles[`options`]}>
                {options.map((link, index) => (
                    <LinkNavbar
                        to={link.to}
                        text={link.text}
                        key={`options-mobile-${index}`}
                        close={handleClose}
                    />
                ))}
            </div>
            <div className={Styles[`footer`]}>
                <div className={Styles[`footer-option`]} onClick={handleSetting}>
                    <AiOutlineSetting className={Styles[`icon`]} />
                    <p>Configuración</p>
                </div>
                <div className={Styles[`footer-option`]} onClick={handleLogOut}>
                    <TbLogout className={Styles[`icon`]} />
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
};

export default MenuNavbar;
