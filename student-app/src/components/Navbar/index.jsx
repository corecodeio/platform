import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from './../../redux/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    return (
        <div>
            <h2>Navbar</h2>
            <button onClick={() => dispatch(logOut())}>Log Out</button>
        </div>
    );
};

export default Navbar;
