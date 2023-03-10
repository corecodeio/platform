const { Router } = require('express');
const router = Router();

router.use('/staff', require('./staff.router.js'));
router.use('/course-type', require('./courseType.route'));

module.exports = router;
