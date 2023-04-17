import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//styles
import Styles from './Apply.module.css';
//icons
import { RxCross2 } from 'react-icons/rx';
const Apply = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    return (
        <div className={Styles[`main`]}>
            <div className={Styles[`container`]}>
                <RxCross2 className={Styles[`container-icon`]} onClick={() => navigate('/dashboard/available-courses')} />
                <p className={Styles[`container-title`]}>New To Do</p>
                <form className={Styles[`form`]}>form</form>
            </div>
        </div>
    );
};

export default Apply;
