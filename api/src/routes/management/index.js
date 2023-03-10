const { Router } = require('express');
const router = Router();

router.use('/staff', require('./staff.router.js'));
router.use('/course-type', require('./courseType.route'));
router.use('/permission', require('./permission.route'));

module.exports = router;
