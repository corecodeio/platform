const logIn = require('./logIn.controller');
const signUp = require('./signUp.controller');
const recoverPassword = require('./recoverPassword.controller');
const checkToken = require('./checkToken.controller');
const validateEmail = require('./validateEmail.controller');
const magicLinks = require('./magicLinks.controller');
const updateAccount = require('./updateAccount.controller');
const updateProfile = require('./updateProfile.controller');

module.exports = {
    logIn,
    signUp,
    recoverPassword,
    checkToken,
    validateEmail,
    magicLinks,
    updateAccount,
    updateProfile
};
