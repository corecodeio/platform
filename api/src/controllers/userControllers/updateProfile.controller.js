const { User } = require('./../../utils/db');
//Update Profile
module.exports = async (req, res, next) => {
    try {
        const { country, city, address, linkedin_url } = req.body;
        const userResult = await User.findOne({
            where: { id: req.user.id }
        });
        userResult.country = country ? country : null;
        userResult.city = city ? city : null;
        userResult.address = address ? address : null;
        userResult.linkedin_url = linkedin_url ? linkedin_url : null;
        await userResult.save();
        res.status(200).json({
            successful: true,
            message: 'profile updated successfully',
            user: {
                country: userResult.country,
                city: userResult.city,
                address: userResult.address,
                linkedin_url: userResult.linkedin_url
            }
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({ successful: false, message: 'error server' });
    }
};
