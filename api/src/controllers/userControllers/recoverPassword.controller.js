const clientStytch = require('./../../utils/stytch');
const { serverConfig } = require('./../../config');
//Recover Password
module.exports = (req, res, next) => {
    const { email } = req.body;
    clientStytch.passwords
        .resetByEmailStart({
            email,
            reset_password_redirect_url: `${serverConfig.client_url}/recover`,
            login_redirect_url: `${serverConfig.client_url}/log-in`
        })
        .then(() => {
            return res.status(200).json({ successful: true, message: 'mail sent successfully' });
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
