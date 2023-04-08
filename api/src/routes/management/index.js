const { Router } = require('express');
const router = Router();

router.use('/user', require('./user.router.js'));
/*
router.use('/staff', require('./staff.router.js'));
router.use('/course-type', require('./courseType.route'));
router.use('/permission', require('./permission.route'));
router.use('/role', require('./role.route'));
router.use('/course', require('./course.route'));
*/
module.exports = router;
