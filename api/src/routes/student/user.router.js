const express = require('express');
const router = express.Router();
const {
    logIn,
    signUp,
    recoverPassword,
    checkToken,
    validateEmail
} = require('./../../controllers/student/user.controllers');
const authStudent = require('./../../middlewares/auth.student');

//log In
router.post('/log-in', logIn);
//Sign Up
router.post('/sign-up', signUp);
//Recover Password
router.post('/check-token', authStudent, checkToken);
//Recover Password
router.put('/recover-password', recoverPassword);
//Validate Email
router.post('/validate-email', validateEmail);

module.exports = router;
