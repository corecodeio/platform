const jwt = require('jsonwebtoken');
const { jwtManagementConfig } = require('./../config/index.js');
const { Staff } = require('./../utils/db.js');

module.exports = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
            return res.status(403).json({
                successful: false,
                message: 'unauthorized'
            });
        }
        const token = req.headers.authorization.split('Bearer ')[1];
        jwt.verify(token, jwtManagementConfig.secret_key, async (err, decoded) => {
            if (err) {
                res.status(403).send({ message: 'Failed to authenticate.' });
            } else {
                const staffResult = await Staff.findOne({
                    where: { id: decoded.user.id, locked: false }
                });
                if (!staffResult) {
                    return res.status(403).json({
                        successful: false,
                        message: 'unauthorized'
                    });
                }
                req.user = {
                    id: decoded.user.id,
                    permissions: decoded.user.permissions
                };
                next();
            }
        });
    } catch (error) {
        console.log(error);
        res.status(403).send({ successful: false, message: 'Failed to authenticate.' });
    }
};
