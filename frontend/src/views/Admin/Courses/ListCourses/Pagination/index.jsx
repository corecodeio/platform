import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Styles from './Pagination.module.css';
//actions
import { setPage } from './../../../../../redux/actions/dashboard';
//icons
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const Pagination = () => {
    const dispatch = useDispatch();
    const { page, totalPage } = useSelector((state) => state.dashboard);
    const buttons = () => {
        const elements = [];
        for (let i = Math.ceil(page / 10) * 10 - 10; i <= Math.ceil(page / 10) * 10 - 1; i += 1) {
            elements.push(
                <button
                    key={i + 1}
                    className={Styles[`button-pagination-${i + 1 !== page ? '0' : '1'}`]}
                    onClick={() => dispatch(setPage(i + 1))}
                    disabled={!(totalPage >= i + 1)}
                >
                    {i + 1}
                </button>
            );
        }
        return <>{elements}</>;
    };
    return (
        <div className={Styles[`pagination`]}>
            <button
                className={Styles[`button-pagination`]}
                disabled={page === 1}
                onClick={() => dispatch(setPage(page - 1))}
            >
                <MdKeyboardDoubleArrowLeft />
            </button>
            <div className={Styles[`pagination-center`]}>{buttons()}</div>
            <button
                className={Styles[`button-pagination`]}
                disabled={page >= totalPage}
                onClick={() => dispatch(setPage(page + 1))}
            >
                <MdKeyboardDoubleArrowRight />
            </button>
        </div>
    );
};

export default Pagination;
