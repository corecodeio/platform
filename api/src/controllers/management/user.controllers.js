const clientStytch = require('./../../utils/stytch');
const { User, Role, Permission } = require('./../../utils/db');
const permissionReader = require('./../../helpers/permissionReader.js');
const { clientConfig } = require('./../../config');
//Sign Up
module.exports.signUp = (req, res, next) => {
    const { email, password } = req.body;
    clientStytch.passwordss
        .create({
            email,
            password,
            session_duration_minutes: 60
        })
        .then(async (resp) => {
            await User.create({
                id: resp.session.user_id,
                email
            });
            return res.status(200).json({
                successful: true,
                user: {
                    first_name: '',
                    last_name: '',
                    email: email,
                    phone: '',
                    roles: [],
                    permissions: []
                },
                token: resp.session_token,
                message: 'successful registration'
            });
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};

//log In
module.exports.logIn = (req, res, next) => {
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
                    token: resp.session_token,
                    message: 'successful login'
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

//check token
module.exports.checkToken = async (req, res, next) => {
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

//Recover Password
module.exports.recoverPassword = (req, res, next) => {
    const { email } = req.body;
    clientStytch.passwords
        .resetByEmailStart({
            email,
            reset_password_redirect_url: `${clientConfig.management_url}/recover`,
            login_redirect_url: `${clientConfig.management_url}/log-in`
        })
        .then(() => {
            return res.status(200).json({ successful: true, message: 'mail sent successfully' });
        })
        .catch((err) => {
            res.status(200).json({ successful: false, message: err.error_message });
        });
};

//MagicLinks
module.exports.magicLinks = async (req, res, next) => {
    const { token } = req.body;
    clientStytch.magicLinks
        .authenticate(token, { session_duration_minutes: 60 })
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
                    token: resp.session_token,
                    message: 'successful login'
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

//Validate Email
module.exports.validateEmail = async (req, res, next) => {
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
