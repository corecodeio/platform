const { Router } = require('express');
const router = Router();

router.use('/user', require('./user.router.js'));
module.exports = router;
