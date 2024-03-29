const express = require('express');
const router = express.Router();
const {
    logIn,
    signUp,
    recoverPassword,
    checkToken,
    validateEmail,
    magicLinks,
    updateAccount,
    updateProfile
} = require('./../controllers/userControllers');
const auth = require('./../middlewares/auth');

//log In
router.post('/log-in', logIn);
//Sign Up
router.post('/sign-up', signUp);
//Recover Password
router.post('/recover-password', recoverPassword);
//Check Token
router.post('/check-token', auth, checkToken);
//Validate Email
router.post('/validate-email', validateEmail);
//MagicLinks
router.post('/magic-links', magicLinks);
//Update Account
router.post('/update-account', auth, updateAccount);
//Update Profile
router.post('/update-profile', auth, updateProfile);

module.exports = router;
