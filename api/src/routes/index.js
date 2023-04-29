const { Router } = require('express');
const router = Router();

router.use('/user', require('./user.router.js'));
router.use('/course', require('./course.router.js'));
router.use('/postulation', require('./postulation.router.js'));
router.use('/message', require('./message.router.js'));
router.use('/template', require('./template.router.js'));

module.exports = router;
