const clientStytch = require('./../../utils/stytch');
const { User } = require('./../../utils/db');
//Update Account
module.exports = async (req, res, next) => {
    const { first_name, last_name } = req.body;
    const id = req.user.id;
    const params = {
        name: {
            first_name: first_name,
            last_name: last_name
        }
    };
    clientStytch.users
        .update(id, params)
        .then(async () => {
            try {
                const userResult = await User.findOne({
                    where: { id: req.user.id }
                });
                userResult.first_name = first_name ? first_name : '';
                userResult.last_name = last_name ? last_name : '';
                await userResult.save();
                res.status(200).json({
                    successful: true,
                    message: 'account updated successfully',
                    user: { first_name: userResult.first_name, last_name: userResult.last_name }
                });
            } catch (error) {
                console.log(error);
                res.status(200).json({ successful: false, message: 'error server' });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
