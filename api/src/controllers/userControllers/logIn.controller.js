const clientStytch = require('./../../utils/stytch');
const { User, Role, Permission } = require('./../../utils/db');
const permissionReader = require('./../../helpers/permissionReader');
const idSlackFinder = require('./../../utils/slack/controllers/userEmailHandler');

module.exports = (req, res, next) => {
    const { email, password } = req.body;
    clientStytch.passwords
        .authenticate({ email, password, session_duration_minutes: 60 })
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
                    const newUser = await User.create({
                        id: resp.session.user_id,
                        email
                    });
                    let slackId = await idSlackFinder(email);
                    if (slackId !== null) {
                        newUser.slack_id = slackId;
                        await newUser.save();
                    }
                    return res.status(200).json({
                        successful: true,
                        user: {
                            first_name: null,
                            last_name: null,
                            email: email,
                            confirmed_email: false,
                            country: null,
                            city: null,
                            address: null,
                            linkedin_url: null,
                            slack_id: slackId,
                            phone: null,
                            roles: [],
                            permissions: []
                        },
                        token: resp.session_token,
                        message: 'successful login'
                    });
                } else {
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
                            confirmed_email: userResult.confirmed_email,
                            country: userResult.country,
                            city: userResult.city,
                            address: userResult.address,
                            linkedin_url: userResult.linkedin_url,
                            slack_id: userResult.slack_id,
                            phone: userResult.phone,
                            roles: rolesAndPermissions[0],
                            permissions: rolesAndPermissions[1]
                        },
                        token: resp.session_token,
                        message: 'successful login'
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(200).json({ successful: false, message: 'error server' });
            }
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};
