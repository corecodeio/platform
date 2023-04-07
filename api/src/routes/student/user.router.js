const express = require('express');
const router = express.Router();
const {
    logIn,
    signUp,
    recoverPassword,
    checkToken,
    validateEmail,
} = require('./../../controllers/student/user.controllers');
const authStytch = require('./../../middlewares/auth.stytch');

//Sign Up
router.post('/sign-up', signUp);
//log In
router.post('/log-in', logIn);
//Recover Password
router.post('/recover-password', recoverPassword);
//Check Token
router.post('/check-token', authStytch, checkToken);
//Validate Email
router.post('/validate-email', validateEmail);

module.exports = router;
