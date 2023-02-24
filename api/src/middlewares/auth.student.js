const jwt = require('jsonwebtoken');
const { jwtStudentConfig } = require('./../config/index.js');
const { User } = require('./../utils/db');

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(403).json({
                successful: false,
                message: 'unauthorized.'
            });
        }
        const token = req.headers.authorization.split('Bearer ')[1];
        jwt.verify(token, jwtStudentConfig.secret_key, async (err, decoded) => {
            if (err) {
                res.status(403).send({ message: 'failed to authenticate.' });
            } else {
                const userResult = await User.findOne({
                    where: { id: decoded.user.id, locked: false }
                });
                if (!userResult) {
                    return res.status(403).json({
                        successful: false,
                        message: 'unauthorized.'
                    });
                }
                req.user = {
                    id: decoded.user.id
                };
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(403).send({ successful: false, message: 'failed to authenticate.' });
    }
};
