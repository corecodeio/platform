import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//actions
import { logOut } from './../../../redux/actions/auth';
//icons
import { RxCross2 } from 'react-icons/rx';
import { TbLogout } from 'react-icons/tb';
import { AiOutlineSetting } from 'react-icons/ai';
//components
import LinkNavbar from '../LinkNavbar';

const MenuNavbar = ({ setMenu, options = [], path = '' }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(logOut());
    };
    const handleClose = () => {
        setMenu(false);
    };
    const handleSetting = () => {
        navigate(`/${path}/setting`);
        setMenu(false);
    };
    return (
        <div className="fixed left-0 top-0 z-[100] flex h-full w-4/5 flex-col overflow-hidden bg-[#7291a0] text-white min-[801px]:hidden">
            <div className="flex h-24 justify-between">
                <p className="ml-4 mt-8 text-[32px] [font-family:'SourceSansPro-Bold',serif]">
                    Menu
                </p>
                <button
                    className="mr-4 mt-[35px] border-0 bg-transparent p-0 text-white"
                    onClick={handleClose}
                    type="button"
                    aria-label="Cerrar menu"
                >
                    <RxCross2 className="h-8 w-8" aria-hidden="true" />
                </button>
            </div>
            <div className="h-[calc(100%-208px)] overflow-y-auto">
                {options.map((link, index) => {
                    return link.permissions.every((permission) =>
                        user.permissions.includes(permission)
                    ) ? (
                        <LinkNavbar
                            path={path}
                            to={link.to}
                            text={link.text}
                            key={`options-mobile-${index}`}
                            close={handleClose}
                        />
                    ) : null;
                })}
            </div>
            <div className="h-28 w-full">
                <button
                    className="mb-8 ml-[31px] flex w-min items-center border-0 bg-transparent pr-2.5 text-white"
                    onClick={handleSetting}
                    type="button"
                >
                    <AiOutlineSetting className="mr-2 h-6 w-6 text-white" aria-hidden="true" />
                    <p>Configuración</p>
                </button>
                <button
                    className="mb-8 ml-[31px] flex w-min items-center border-0 bg-transparent pr-2.5 text-white"
                    onClick={handleLogOut}
                    type="button"
                >
                    <TbLogout className="mr-2 h-6 w-6 text-white" aria-hidden="true" />
                    <p>Logout</p>
                </button>
            </div>
        </div>
    );
};

export default MenuNavbar;
