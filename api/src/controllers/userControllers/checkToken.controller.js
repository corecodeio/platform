const { User } = require('./../../utils/db');
//check token
module.exports = async (req, res, next) => {
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
                phone: userResult.phone,
                roles: req.user.roles,
                permissions: req.user.permissions
            }
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({ successful: false, message: 'error server' });
    }
};
