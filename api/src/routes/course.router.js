const express = require('express');
const router = express.Router();
const {
    myCourses,
    availableCourses,
    listCourse,
    createCourse,
    createSlack,
    createCalendar
} = require('./../controllers/courseControllers');
const auth = require('./../middlewares/auth');
const checkPermissions = require('./../middlewares/checkPermissions');

//My courses
router.get('/my-courses', auth, myCourses);
//list of available courses
router.get('/available-courses', auth, availableCourses);
//List Course
router.get('/', auth, checkPermissions(['read:course']), listCourse);
//Create Course
router.post('/', auth, checkPermissions(['write:course']), createCourse);
//Create Slack
router.post('/slack', auth, checkPermissions(['write:course']), createSlack);
//Create Slack
router.post('/calendar', auth, checkPermissions(['write:course']), createCalendar);

module.exports = router;
