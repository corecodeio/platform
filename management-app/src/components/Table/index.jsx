import React from 'react';
import Styles from './Table.module.css';

const Table = ({ children }) => {
    return <div className={Styles[`main`]}>{children}</div>;
};

export const Cell = ({ columns = 6, space = 6, title = 'Title', children }) => {
    return (
        <div
            className={Styles[`cell`]}
            style={{
                width: `calc(calc(100% / ${columns}  * ${space} ) - 20px`
            }}
        >
            <p className={Styles[`title`]}>{title}</p>
            <div className={Styles[`container`]}>
            {children}
            </div>
        </div>
    );
};

export default Table;
