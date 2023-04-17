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
    addPhone,
    confirmedEmail,
    updateProfile
} = require('./../../controllers/student/user.controllers');
const authStudent = require('./../../middlewares/auth.student');

//Sign Up
router.post('/sign-up', signUp);
//log In
router.post('/log-in', logIn);
//Recover Password
router.post('/recover-password', recoverPassword);
//Check Token
router.post('/check-token', authStudent, checkToken);
//Validate Email
router.post('/validate-email', validateEmail);
//MagicLinks
router.post('/magic-links', magicLinks);
//Update Account
router.post('/update-account', authStudent, updateAccount);
//Add Phone
router.post('/add-phone', authStudent, addPhone);
//Confirmed Email
router.post('/confirmed-email', authStudent, confirmedEmail);
//Update Profile
router.post('/update-profile', authStudent, updateProfile);

module.exports = router;
