import React from 'react';
import Sidebar from './../../../components/Sidebar';
//icons
import { ImStatsDots } from 'react-icons/im';
import { BsReverseListColumnsReverse } from 'react-icons/bs';
import { IoCreateOutline } from 'react-icons/io5';

const options = [
    {
        title: 'statistics',
        icon: ImStatsDots,
        path: '',
        permissions: ['read:dashboard', 'read:course']
    },
    {
        title: 'List',
        icon: BsReverseListColumnsReverse,
        path: '/list',
        permissions: ['read:dashboard', 'read:course']
    },
    {
        title: 'New course',
        icon: IoCreateOutline,
        path: '/new-course',
        permissions: ['read:dashboard', 'read:course', 'write:course']
    }
];
const Courses = () => {
    return <Sidebar title="Courses" path="admin/courses" options={options} />;
};

export default Courses;
