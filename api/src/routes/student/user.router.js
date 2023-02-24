const express = require('express');
const router = express.Router();
const {
    logIn,
    signUp,
    recoverPassword,
    checkToken
} = require('./../../controllers/student/user.controllers');
const authStudent = require('./../../middlewares/auth.student');
//log In
router.post('/logIn', logIn);
//Sign Up
router.post('/signUp', signUp);
//Recover Password
router.post('/checkToken', authStudent, checkToken);
//Recover Password
router.post('/recoverPassword', recoverPassword);

module.exports = router;
