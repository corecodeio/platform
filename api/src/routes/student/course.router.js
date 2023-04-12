const express = require('express');
const router = express.Router();
const { myCourses, availableCourses } = require('./../../controllers/student/course.controllers');
const authStudent = require('./../../middlewares/auth.student');

//My courses
router.get('/my-courses', authStudent, myCourses);
//list of available courses
router.get('/available-courses', authStudent, availableCourses);

module.exports = router;
