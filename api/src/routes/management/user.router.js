const express = require('express');
const router = express.Router();
const {
    logIn,
    signUp,
    recoverPassword,
    checkToken,
    validateEmail,
    magicLinks
} = require('./../../controllers/management/user.controllers');
const authManagement = require('./../../middlewares/auth.management');

//Sign Up
router.post('/sign-up', signUp);
//log In
router.post('/log-in', logIn);
//Recover Password
router.post('/recover-password', recoverPassword);
//Check Token
router.post('/check-token', authManagement, checkToken);
//Validate Email
router.post('/validate-email', validateEmail);
//MagicLinks
router.post('/magic-links', magicLinks);

module.exports = router;
