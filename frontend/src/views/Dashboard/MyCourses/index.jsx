import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
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
                const response = await axios.get('/api/course/my-courses');
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
        <div className="grid w-full grid-cols-1 gap-6 pb-6 pt-[30px] md:grid-cols-2 md:pt-[45px] xl:grid-cols-3">
            {listCourses.map((course) => {
                return (
                    <div key={course.id} className="w-full">
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
