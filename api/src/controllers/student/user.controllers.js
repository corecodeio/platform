const { User } = require('./../../utils/db');
const { jwtStudentConfig } = require('./../../config/index.js');
const jwt = require('jsonwebtoken');
const { sendRecoverPassword } = require('./../../helpers/email.student');
const { validateEmail } = require('./../../helpers/validators');
const clientStytch = require('./../../utils/stytch');

//log In
module.exports.signUp = (req, res, next) => {
    const { email, password } = req.body;
    clientStytch.passwords
        .create({
            email,
            password,
            session_duration_minutes: 60
        })
        .then((resp) => {
            return res.status(200).json({
                successful: true,
                token: resp.session_token,
                message: 'successful registration'
            });
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
//log In
module.exports.logIn = (req, res, next) => {
    const { email, password } = req.body;
    clientStytch.passwords
        .authenticate({ email, password, session_duration_minutes: 60 })
        .then((resp) => {
            return res
                .status(200)
                .json({ successful: true, token: resp.session_token, message: 'successful login' });
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};

//check token
module.exports.checkToken = async (req, res, next) => {
    res.status(200).json({ successful: true });
};

//Recover Password
module.exports.recoverPassword = (req, res, next) => {
    const { email } = req.body;
    clientStytch.passwords
        .resetByEmailStart({ email })
        .then((resp) => {
            return res.status(200).json({ successful: true, message: 'mail sent successfully' });
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
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
