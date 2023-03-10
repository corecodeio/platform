import React from 'react';
import Styles from './Table.module.css';
import { useSelector } from 'react-redux';
const Table = ({ children }) => {
    return <div className={Styles[`container`]}>{children}</div>;
};

export const Cell = ({ columns = 6, space = 6, title = 'Title', children }) => {
    const { mode } = useSelector((state) => state.auth);
    return (
        <div
            className={Styles[`cell-${mode}`]}
            style={{
                width: `calc(calc(100% / ${columns}  * ${space} ) - 40px`
            }}
        >
            <p className={Styles[`title`]}>{title}</p>
            {children}
        </div>
    );
};

export default Table;
