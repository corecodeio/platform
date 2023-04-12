import React from 'react';
//styles
import Styles from './Interface.module.css';

const Interface = ({ children }) => {
    return <div className={Styles[`main`]}>{children}</div>;
};

export const Block = ({ columns = 6, space = 6, title, children }) => {
    return (
        <div
            className={Styles[`block`]}
            style={{
                width: `calc(calc(100% / ${columns}  * ${space} ) - 24px`
            }}
        >
            {title && <p className={Styles[`block-title`]}>{title}</p>}
            {title ? <div className={Styles[`block-container`]}>{children}</div> : <>{children}</>}
        </div>
    );
};
export const Table = ({ children }) => {
    return <table className={Styles[`table`]}>{children}</table>;
};
export const Thead = ({ elements }) => {
    return (
        <thead className={Styles[`thead`]}>
            <tr className={Styles[`tr`]}>
                {elements.map(({ element, colspan = 1 }, index) => {
                    return (
                        <th key={`th-${index}`} colSpan={colspan} className={Styles[`td`]}>
                            {element}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};
export const Tbody = ({ children }) => {
    return <tbody className={Styles[`tbody`]}>{children}</tbody>;
};
export const Tr = ({ children }) => {
    return <tr className={Styles[`tr`]}>{children}</tr>;
};
export const Td = ({ children, colspan = 1 }) => {
    return (
        <td className={Styles[`td`]} colSpan={colspan}>
            {children}
        </td>
    );
};
export default Interface;
