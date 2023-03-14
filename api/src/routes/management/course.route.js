const express = require('express');
const router = express.Router();
const { createCourse, listCourse } = require('./../../controllers/management/course.controllers');
const authManagement = require('./../../middlewares/auth.management');
const checkPermissionAuth = require('./../../middlewares/auth.permissions.js');

//List Course
router.get('/', authManagement, checkPermissionAuth('read:course'), listCourse);
//Create Course
router.post('/', authManagement, checkPermissionAuth('write:course'), createCourse);

module.exports = router;
