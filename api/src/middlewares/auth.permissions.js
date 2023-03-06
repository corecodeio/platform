module.exports = (permission) => async (req, res, next) => {
    try {
        if (req.user.permissions.includes(permission)) {
            return next();
        }
        res.status(409).send({ successful: false, message: 'unauthorized.' });
    } catch (error) {
        console.log(error);
        res.status(403).send({ successful: false, message: 'Failed to authenticate.' });
    }
};
