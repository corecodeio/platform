const clientStytch = require('./../../utils/stytch');
const { User } = require('./../../utils/db');
//Sign Up
module.exports = (req, res, next) => {
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
                email
            });
            return res.status(200).json({
                successful: true,
                user: {
                    first_name: null,
                    last_name: null,
                    email: email,
                    confirmed_email: false,
                    country: null,
                    city: null,
                    address: null,
                    linkedin_url: null,
                    slack_id: null,
                    phone: null,
                    roles: [],
                    permissions: []
                },
                token: resp.session_token,
                message: 'successful registration'
            });
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
