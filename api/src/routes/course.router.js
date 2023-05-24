const express = require('express');
const router = express.Router();
const {
    myCourses,
    availableCourses,
    listCourse,
    createCourse,
    createSlack,
    createCalendar,
    changeDate,
    changeStatus,
    fullDataCourse
} = require('./../controllers/courseControllers');
const auth = require('./../middlewares/auth');
const checkPermissions = require('./../middlewares/checkPermissions');

//My courses
router.get('/my-courses', auth, myCourses);
//list of available courses
router.get('/available-courses', auth, availableCourses);
//Full Data Course
router.get('/full-data-course', auth, checkPermissions(['read:course']), fullDataCourse);
//List Course
router.get('/', auth, checkPermissions(['read:course']), listCourse);
//Create Course
router.post('/', auth, checkPermissions(['write:course']), createCourse);
//Create Slack
router.post('/slack', auth, checkPermissions(['write:course']), createSlack);
//Create Slack
router.post('/calendar', auth, checkPermissions(['write:course']), createCalendar);
//Change Course Date
router.post('/change-date', auth, checkPermissions(['write:course']), changeDate);
//Change Course Status
router.post('/change-status', auth, checkPermissions(['write:course']), changeStatus);

module.exports = router;
