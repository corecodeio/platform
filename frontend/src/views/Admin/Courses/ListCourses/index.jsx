import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
//styles
import Styles from './ListCourses.module.css';
//actions
import { getCoursesAsync } from './../../../../redux/actions/dashboard';
//components
import CourseTable from './CourseTable';
import Pagination from './Pagination';

const ListCourses = () => {
    const dispatch = useDispatch();
    const { page } = useSelector((state) => state.dashboard);
    const searchList = () => {
        dispatch(getCoursesAsync({ page }));
    };
    useEffect(() => {
        searchList();
        // eslint-disable-next-line
    }, [page]);
    return (
        <div className={Styles[`main`]}>
            <p className={Styles[`main-title`]}>Course list</p>
            <CourseTable />
            <Pagination/>
        </div>
    );
};

export default ListCourses;
