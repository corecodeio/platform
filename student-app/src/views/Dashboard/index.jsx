import React from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from './../../redux/authSlice';
const Dashboard = () => {
    const dispatch = useDispatch();

    return (
        <>
            <div>Dashboard</div>
            <button onClick={() => dispatch(logOut())}>Log Out</button>
        </>
    );
};

export default Dashboard;
