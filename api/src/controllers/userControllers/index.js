const logIn = require('./logIn.controller');
const signUp = require('./signUp.controller');
const recoverPassword = require('./recoverPassword.controller');
const checkToken = require('./checkToken.controller');
const validateEmail = require('./validateEmail.controller');
const magicLinks = require('./magicLinks.controller');

module.exports = { logIn, signUp, recoverPassword, checkToken, validateEmail, magicLinks };
