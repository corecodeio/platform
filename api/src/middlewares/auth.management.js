const clientStytch = require('./../utils/stytch.js');
const { User, Role, Permission } = require('./../utils/db.js');
const permissionReader = require('./../helpers/permissionReader.js');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(403).json({
            successful: false,
            message: 'unauthorized'
        });
    }
    const sessionToken = req.headers.authorization.split('Bearer ')[1];
    clientStytch.sessions
        .authenticate({ session_token: sessionToken })
        .then(async (data) => {
            const userResult = await User.findOne({
                where: { id: data.session.user_id },
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
                return res.status(200).send({ successful: false, message: 'id not found' });
            }
            if (userResult.locked) {
                return res.status(200).json({ successful: false, message: 'user blocked' });
            }
            const rolesAndPermissions = permissionReader(userResult.roles);
            req.user = {
                id: data.session.user_id,
                roles: rolesAndPermissions[0],
                permissions: rolesAndPermissions[1]
            };
            next();
        })
        .catch((err) => {
            console.log(err);
            res.status(403).send({ successful: false, message: 'unauthorized' });
        });
};
