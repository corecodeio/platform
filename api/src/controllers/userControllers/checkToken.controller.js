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
                confirmed_email: userResult.confirmed_email,
                country: userResult.country,
                city: userResult.city,
                address: userResult.address,
                linkedin_url: userResult.linkedin_url,
                slack_id: userResult.slack_id,
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
