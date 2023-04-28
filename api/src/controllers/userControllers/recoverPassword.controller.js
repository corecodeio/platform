const clientStytch = require('./../../utils/stytch');

//Recover Password
module.exports = (req, res, next) => {
    const { email } = req.body;
    clientStytch.passwords
        .resetByEmailStart({
            email
        })
        .then(() => {
            return res.status(200).json({ successful: true, message: 'mail sent successfully' });
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
