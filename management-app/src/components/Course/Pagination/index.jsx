import React from 'react';
import { useSelector } from 'react-redux';
import Styles from './Pagination.module.css';
import { useNavigate } from 'react-router-dom';
//icons
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const Pagination = () => {
    const { page, totalPage } = useSelector((state) => state.dashboard);
    const navigate = useNavigate();
    const buttons = () => {
        const elements = [];
        for (let i = Math.ceil(page / 10) * 10 - 10; i <= Math.ceil(page / 10) * 10 - 1; i += 1) {
            elements.push(
                <button
                    key={i + 1}
                    className={Styles[`button-pagination-${i + 1 !== page ? '0' : '1'}`]}
                    onClick={() => navigate(`/dashboard/course/${i + 1}`)}
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
                onClick={() => navigate(`/dashboard/course/${page - 1}`)}
            >
                <MdKeyboardDoubleArrowLeft />
            </button>
            <div className={Styles[`pagination-center`]}>{buttons()}</div>
            <button
                className={Styles[`button-pagination`]}
                disabled={page >= totalPage}
                onClick={() => navigate(`/dashboard/course/${page + 1}`)}
            >
                <MdKeyboardDoubleArrowRight />
            </button>
        </div>
    );
};

export default Pagination;
