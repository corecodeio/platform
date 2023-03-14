import React from 'react';
//import Styles from './Course.module.css';
//components
import Table, { Cell } from './../Table';
import CreateCourse from './CreateCourse';
import CourseList from './CourseList';

const Course = () => {
    return (
        <Table>
            <Cell title="Guide" space={3}>
                <p>
                    Complete all the data, in case any name is not available, but if the main name,
                    the new course will be created and later it will be You can finish completing
                    the other channels that could not be created (channel from slack, google
                    calendar, etc.)
                </p>
            </Cell>
            <Cell title="New course registration" space={3}>
                <CreateCourse />
            </Cell>
            <Cell title="Courses">
                <CourseList />
            </Cell>
        </Table>
    );
};

export default Course;
