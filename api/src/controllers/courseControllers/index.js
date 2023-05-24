const availableCourses = require('./availableCourses.controller');
const myCourses = require('./myCourses.controller');
const listCourse = require('./listCourse.controller');
const createCourse = require('./createCourse.controller');
const createSlack = require('./createSlack.controller');
const createCalendar = require('./createCalendar.controller');
const changeDate = require('./changeDate.controller');
const changeStatus = require('./changeStatus.controller');
const fullDataCourse = require('./fullDataCourse.controller');

module.exports = {
    myCourses,
    availableCourses,
    listCourse,
    createCourse,
    createSlack,
    createCalendar,
    changeDate,
    changeStatus,
    fullDataCourse
};
