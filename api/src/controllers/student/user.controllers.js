const { User } = require('./../../utils/db');
const bcrypt = require('bcrypt');
const { jwtStudentConfig, bcryptConfig, stytchConfig } = require('./../../config/index.js');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { sendWelcome, sendRecoverPassword } = require('./../../helpers/email.student');
const { validateEmail } = require('./../../helpers/validators');
const clientStytch = require('./../../utils/stytch');

//log In
module.exports.logIn = async (req, res, next) => {
    const params = {
        email: req.body.email,
        login_magic_link_url: stytchConfig.login_magic_link_url,
        signup_magic_link_url: stytchConfig.signup_magic_link_url
    };
    clientStytch.magicLinks.email
        .loginOrCreate(params)
        .then((data) => {
            // on success, render the emailSent page
            console.log(data);
            res.status(200).json({ successful: false, message: 'good' });
        })
        .catch((error) => {
            res.status(200).json({ successful: false, message: error.error_message });
        });
};

//Sign Up
module.exports.signUp = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            return res.status(200).json({ successful: false, message: 'missing data entry' });
        }
        if (!validateEmail(email)) {
            return res.status(200).json({ successful: false, message: 'email is invalid' });
        }
        const emailAvailable = await User.findOne({ where: { email: email } });
        if (emailAvailable) {
            return res.status(200).json({ successful: false, message: 'email is already in use' });
        }
        const passwordCrypt = bcrypt.hashSync(password, bcryptConfig.rounds);
        const newUser = await User.create({
            id: uuidv4(),
            first_name,
            last_name,
            email,
            password: passwordCrypt
        });
        let token = jwt.sign(
            {
                user: {
                    id: newUser.id
                }
            },
            jwtStudentConfig.secret_key,
            {
                expiresIn: jwtStudentConfig.expiresIn,
                algorithm: jwtStudentConfig.algorithms[0]
            }
        );
        sendWelcome({ id: newUser.id, first_name, last_name, email });
        res.status(200).json({
            successful: true,
            message: 'successful registration',
            token: token,
            user: {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                validate_email: newUser.validate_email,
                phone: newUser.phone,
                surveyID: newUser.surveyID
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ successful: false, error: error });
    }
};

//check token
module.exports.checkToken = async (req, res, next) => {
    try {
        console.log('hola');
        const { id } = req.user;
        const userResult = await User.findOne({ where: { id: id } });
        if (!userResult) {
            return res.status(200).send({ successful: false, message: 'user does not exist' });
        }
        if (userResult.locked) {
            return res.status(200).json({ successful: false, message: 'user blocked' });
        }
        res.status(200).json({
            successful: true,
            message: 'login successful',
            user: {
                first_name: userResult.first_name,
                last_name: userResult.last_name,
                email: userResult.email,
                validate_email: userResult.validate_email,
                phone: userResult.phone,
                surveyID: userResult.surveyID
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ successful: false, message: error });
    }
};

//Recover Password
module.exports.recoverPassword = async (req, res, next) => {
    try {
        const secret = jwtStudentConfig.secret_key;
        const { email } = req.body;

        if (validateEmail(email)) {
            const userResult = await User.findOne({ where: { email: email } });
            if (userResult) {
                const payload = { user: { id: userResult.id } };
                const token = jwt.sign(payload, secret);
                sendRecoverPassword({ tokenRecover: token, email });
                res.status(200).json({ successful: true, message: 'email enviado' });
            } else {
                res.status(200).json({ successful: false, message: 'user email not found' });
            }
        } else {
            res.status(400).json({ successful: false, message: 'input is not a valid email' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ successful: false, error: error });
    }
};

//Validate Email
module.exports.validateEmail = async (req, res, next) => {
    const secret = jwtStudentConfig.secret_key;
    const { tokenEmail } = req.body;
    const token = tokenEmail;

    try {
        const decoded = jwt.verify(token, secret);
        const userResult = await User.findOne({ where: { id: decoded.user.id } });
        if (userResult) {
            userResult.validate_email = true;
            await userResult.save();
            res.status(200).json({ successful: true, message: 'email confirmed successfully' });
        } else {
            res.status(200).json({ successful: false, message: 'user id not found' });
        }
    } catch (err) {
        res.status(400).json({ successful: false, message: err });
    }
};
