const clientStytch = require('./../../utils/stytch');
const { User, Role, Permission } = require('./../../utils/db');
const permissionReader = require('./../../helpers/permissionReader');
//Validate Email
module.exports = async (req, res, next) => {
    const { password, token } = req.body;
    clientStytch.passwords
        .resetByEmail(token, password, { session_duration_minutes: 60 })
        .then(async (resp) => {
            try {
                const userResult = await User.findOne({
                    where: { id: resp.session.user_id },
                    include: [
                        {
                            model: Role,
                            as: 'roles',
                            attributes: ['name'],
                            through: {
                                attributes: []
                            },
                            include: [
                                {
                                    model: Permission,
                                    as: 'permissions',
                                    attributes: ['name'],
                                    through: {
                                        attributes: []
                                    }
                                }
                            ]
                        }
                    ]
                });
                if (!userResult) {
                    return res.status(200).json({ successful: false, message: 'id not found' });
                }
                if (userResult.locked) {
                    return res.status(200).json({ successful: false, message: 'user blocked' });
                }
                const rolesAndPermissions = permissionReader(userResult.roles);
                res.status(200).json({
                    successful: true,
                    user: {
                        first_name: userResult.first_name,
                        last_name: userResult.last_name,
                        email: userResult.email,
                        phone: userResult.phone,
                        roles: rolesAndPermissions[0],
                        permissions: rolesAndPermissions[1]
                    },
                    message: 'new password registered',
                    token: resp.session_token
                });
            } catch (error) {
                console.log(error);
                res.status(200).json({ successful: false, message: 'error server' });
            }
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
