import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
//actions
import { getCoursesAsync } from './../../redux/actions/dashboard';
//components
import Interface, { Block } from './../Interface';
import CreateCourse from './CreateCourse';
import CourseList from './CourseList';

const Course = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCoursesAsync({ page: 1 }));
        // eslint-disable-next-line
    }, []);
    return (
        <Interface>
            <Block title="Guide" space={2}>
                <p>
                    To create new courses, you only need a name and select the type of course, all
                    other data can be added or modified later.
                </p>
            </Block>
            <Block title="New course registration" space={4}>
                <CreateCourse />
            </Block>
            <Block>
                <CourseList />
            </Block>
        </Interface>
    );
};

export default Course;
