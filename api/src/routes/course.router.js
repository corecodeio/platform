const express = require('express');
const router = express.Router();
const { myCourses, availableCourses } = require('./../controllers/courseControllers');
const auth = require('./../middlewares/auth');

//My courses
router.get('/my-courses', auth, myCourses);
//list of available courses
router.get('/available-courses', auth, availableCourses);

module.exports = router;
