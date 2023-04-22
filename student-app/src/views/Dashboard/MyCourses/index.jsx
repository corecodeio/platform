import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
//styles
import Styles from './../Grid.module.css';
//actions
import { logOut } from './../../../redux/actions/auth';
//components
import CourseCard from './../CourseCard';

const MyCourses = () => {
    const dispatch = useDispatch();
    const [listCourses, setListCourses] = useState([]);
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('/api/student/course/my-courses');
                if (response.data.successful) {
                    setListCourses(response.data.data);
                }
            } catch (error) {
                dispatch(logOut());
            }
        };
        getData();
    }, []);
    return (
        <div className={Styles[`main`]}>
            {listCourses.map((course) => {
                return (
                    <div key={course.id} className={Styles[`course`]}>
                        <CourseCard
                            data={course}
                            text="Ver Curso"
                            url={`/dashboard/course-detail/${course.id}`}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default MyCourses;
