const express = require('express');
const router = express.Router();
const {
    createCourse,
    listCourse,
    editCourse,
    createSlack,
    createCalendar
} = require('./../../controllers/management/course.controllers');
const authManagement = require('./../../middlewares/auth.management');
const checkPermissionAuth = require('./../../middlewares/auth.permissions.js');

//List Course
router.get('/', authManagement, checkPermissionAuth(['read:course']), listCourse);
//Create Course
router.post('/', authManagement, checkPermissionAuth(['write:course']), createCourse);
//Create Slack
router.post('/slack', authManagement, checkPermissionAuth(['write:course']), createSlack);
//Create Slack
router.post('/calendar', authManagement, checkPermissionAuth(['write:course']), createCalendar);
//Edit Course
router.put('/', authManagement, checkPermissionAuth(['delete:course']), editCourse);

module.exports = router;
