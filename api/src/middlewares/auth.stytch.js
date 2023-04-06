const clientStytch = require('./../utils/stytch.js');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(403).json({
            successful: false,
            message: 'unauthorized'
        });
    }
    const sessionToken = req.headers.authorization.split('Bearer ')[1];
    clientStytch.sessions
        .authenticate({ session_token: sessionToken })
        .then(() => {
            next();
        })
        .catch((err) => {
            res.status(403).send({ successful: false, message: 'failed to authenticate.' });
        });
};
