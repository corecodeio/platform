import React from 'react';
import Styles from './Loading.module.css';

const Loading = () => {
    return (
        <div className={Styles[`container`]}>
            <div className={Styles[`loader`]}>
                <div className={Styles[`code`]}></div>
                <div className={Styles[`core`]}>
                    <div className={Styles[`interception`]}></div>
                </div>
            </div>
        </div>
    );
};

export default Loading;
