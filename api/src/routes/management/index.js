const { Router } = require('express');
const router = Router();

router.use('/staff', require('./staff.router.js'));

module.exports = router;
