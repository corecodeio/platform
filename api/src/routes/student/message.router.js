const express = require('express');
const router = express.Router();
const { send } = require('./../../controllers/student/message.controllers');
const authStudent = require('./../../middlewares/auth.student');

//My courses
router.post('/send', authStudent, send);

module.exports = router;
