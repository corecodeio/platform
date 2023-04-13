const clientStytch = require('./../../utils/stytch');
const { User } = require('./../../utils/db');

//Sign Up
module.exports.signUp = (req, res, next) => {
    const { email, password } = req.body;
    clientStytch.passwords
        .create({
            email,
            password,
            session_duration_minutes: 60
        })
        .then(async (resp) => {
            await User.create({
                id: resp.session.user_id,
                email: email
            });
            return res.status(200).json({
                successful: true,
                user: {
                    first_name: '',
                    last_name: '',
                    email: email,
                    confirmed_email: false,
                    phone: '',
                    confirmed_phone: false
                },
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
        .then(async (resp) => {
            try {
                const userResult = await User.findOne({
                    where: { id: resp.session.user_id }
                });
                if (!userResult) {
                    return res.status(200).json({ successful: false, message: 'id not found' });
                }
                if (userResult.locked) {
                    return res.status(200).json({ successful: false, message: 'user blocked' });
                }
                res.status(200).json({
                    successful: true,
                    user: {
                        first_name: userResult.first_name,
                        last_name: userResult.last_name,
                        email: userResult.email,
                        confirmed_email: userResult.confirmed_email,
                        phone: userResult.phone,
                        confirmed_phone: userResult.confirmed_phone
                    },
                    token: resp.session_token,
                    message: 'successful login'
                });
            } catch (error) {
                console.log(error);
                res.status(200).json({ successful: false, message: 'error server' });
            }
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};

//check token
module.exports.checkToken = async (req, res, next) => {
    try {
        const userResult = await User.findOne({
            where: { id: req.user.id }
        });
        if (!userResult) {
            return res.status(200).json({ successful: false, message: 'id not found' });
        }
        res.status(200).json({
            successful: true,
            user: {
                first_name: userResult.first_name,
                last_name: userResult.last_name,
                email: userResult.email,
                confirmed_email: userResult.confirmed_email,
                phone: userResult.phone,
                confirmed_phone: userResult.confirmed_phone
            }
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({ successful: false, message: 'error server' });
    }
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

//MagicLinks
module.exports.magicLinks = async (req, res, next) => {
    const { token } = req.body;
    clientStytch.magicLinks
        .authenticate(token, { session_duration_minutes: 60 })
        .then(async (resp) => {
            try {
                const userResult = await User.findOne({
                    where: { id: resp.session.user_id }
                });
                if (!userResult) {
                    return res.status(200).json({ successful: false, message: 'id not found' });
                }
                if (userResult.locked) {
                    return res.status(200).json({ successful: false, message: 'user blocked' });
                }
                res.status(200).json({
                    successful: true,
                    user: {
                        first_name: userResult.first_name,
                        last_name: userResult.last_name,
                        email: userResult.email,
                        confirmed_email: userResult.confirmed_email,
                        phone: userResult.phone,
                        confirmed_phone: userResult.confirmed_phone
                    },
                    token: resp.session_token,
                    message: 'successful login'
                });
            } catch (error) {
                console.log(error);
                res.status(200).json({ successful: false, message: 'error server' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ successful: false, message: err.error_message });
        });
};

//Validate Email
module.exports.validateEmail = async (req, res, next) => {
    const { password, token } = req.body;
    clientStytch.passwords
        .resetByEmail(token, password, { session_duration_minutes: 60 })
        .then(async (resp) => {
            try {
                const userResult = await User.findOne({
                    where: { id: resp.session.user_id }
                });
                if (!userResult) {
                    return res.status(200).json({ successful: false, message: 'id not found' });
                }
                if (userResult.locked) {
                    return res.status(200).json({ successful: false, message: 'user blocked' });
                }
                res.status(200).json({
                    successful: true,
                    user: {
                        first_name: userResult.first_name,
                        last_name: userResult.last_name,
                        email: userResult.email,
                        confirmed_email: userResult.confirmed_email,
                        phone: userResult.phone,
                        confirmed_phone: userResult.confirmed_phone
                    },
                    token: resp.session_token,
                    message: 'new password registered'
                });
            } catch (error) {
                console.log(error);
                res.status(200).json({ successful: false, message: 'error server' });
            }
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
