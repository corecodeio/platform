const { User } = require('./../../utils/db');
//Update Profile
module.exports = async (req, res, next) => {
    try {
        const { country, city, address, linkedin_url } = req.body;
        const userResult = await User.findOne({
            where: { id: req.user.id }
        });
        if (userResult.country !== country) {
            userResult.country = country ? country : '';
        }
        if (userResult.city !== city) {
            userResult.city = city ? city : '';
        }
        if (userResult.address !== address) {
            userResult.address = address ? address : '';
        }
        if (userResult.linkedin_url !== linkedin_url) {
            userResult.linkedin_url = linkedin_url ? linkedin_url : '';
        }
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
