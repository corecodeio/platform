const { Router } = require('express');
const router = Router();

router.use('/user', require('./user.router.js'));
router.use('/permission', require('./permission.route'));
router.use('/role', require('./role.route'));

module.exports = router;
