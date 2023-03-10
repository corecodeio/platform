const express = require('express');
const router = express.Router();
const { listCourseType } = require('./../../controllers/management/courseType.controllers');
const authManagement = require('./../../middlewares/auth.management');
const checkPermissionAuth = require('./../../middlewares/auth.permissions.js');

//List Course Type
router.get('/', authManagement, checkPermissionAuth('read:course'), listCourseType);

module.exports = router;
