const { Router } = require('express');
const router = Router();

router.use('/user', require('./user.router.js'));
router.use('/course', require('./course.router.js'));

module.exports = router;
