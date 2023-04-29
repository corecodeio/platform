const availableCourses = require('./availableCourses.controller');
const myCourses = require('./myCourses.controller');
const listCourse = require('./listCourse.controller');
const createCourse = require('./createCourse.controller');
const createSlack = require('./createSlack.controller');
const createCalendar = require('./createCalendar.controller');

module.exports = {
    myCourses,
    availableCourses,
    listCourse,
    createCourse,
    createSlack,
    createCalendar
};
