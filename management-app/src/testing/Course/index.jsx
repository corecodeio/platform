import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//actions
import { getCoursesAsync } from './../../redux/actions/dashboard';
//components
import Interface, { Block } from './../Interface';
import CreateCourse from './CreateCourse';
import CourseList from './CourseList';
import Pagination from './Pagination';

const Course = () => {
    const dispatch = useDispatch();
    const { page } = useParams();
    const searchList = () => {
        dispatch(getCoursesAsync({ page }));
    };
    useEffect(() => {
        searchList();
        // eslint-disable-next-line
    }, [page]);
    return (
        <Interface>
            <Block title="Guide" space={2}>
                <p>
                    To create new courses, you only need a name and select the type of course, all
                    other data can be added or modified later.
                </p>
            </Block>
            <Block title="New course registration" space={4}>
                <CreateCourse searchList={searchList}/>
            </Block>
            <Block>
                <CourseList searchList={searchList} />
                <Pagination/>
            </Block>
        </Interface>
    );
};

export default Course;
