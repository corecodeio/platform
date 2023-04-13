const clientStytch = require('./../utils/stytch.js');
const { User } = require('./../utils/db.js');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(403).json({
            successful: false,
            message: 'unauthorized'
        });
    }
    const sessionToken = req.headers.authorization.split('Bearer ')[1];
    console.log(sessionToken)
    clientStytch.sessions
        .authenticate({ session_token: sessionToken })
        .then(async (data) => {
            const userResult = await User.findOne({
                where: { id: data.session.user_id }
            });
            if (!userResult) {
                return res.status(200).send({ successful: false, message: 'id not found' });
            }
            if (userResult.locked) {
                return res.status(200).json({ successful: false, message: 'user blocked' });
            }
            req.user = {
                id: data.session.user_id
            };
            next();
        })
        .catch((err) => {
            console.log(err);
            res.status(403).send({ successful: false, message: 'unauthorized' });
        });
};
