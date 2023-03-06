const { Staff, Role, Permission } = require('./../../utils/db.js');
const permissionReader = require('./../../helpers/permissionReader.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwtManagementConfig } = require('./../../config/index.js');

//Log In
module.exports.logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({ successful: false, message: 'Falta ingresar datos' });
        }
        const userResult = await Staff.findOne({
            where: { email: email },
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
            return res
                .status(200)
                .json({ successful: false, message: 'El email o la contraseña son incorrectos' });
        }
        if (userResult.locked) {
            return res.status(200).json({ successful: false, message: 'Usuario bloqueado' });
        }
        const rolesAndPermissions = permissionReader(userResult.roles);
        if (bcrypt.compareSync(password, userResult.password)) {
            let token = jwt.sign(
                {
                    user: {
                        id: userResult.id,
                        permissions: rolesAndPermissions[1]
                    }
                },
                jwtManagementConfig.secret_key,
                {
                    expiresIn: jwtManagementConfig.expiresIn,
                    algorithm: jwtManagementConfig.algorithms[0]
                }
            );
            res.status(200).json({
                successful: true,
                message: 'Inicio de sesión exitoso',
                token: token,
                user: {
                    first_name: userResult.first_name,
                    last_name: userResult.last_name,
                    email: userResult.email,
                    phone: userResult.phone,
                    roles: rolesAndPermissions[0],
                    permissions: rolesAndPermissions[1]
                }
            });
        } else {
            res.status(200).json({
                successful: false,
                message: 'El email o la contraseña son incorrectos'
            });
        }
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
//Check Token
module.exports.checkToken = async (req, res, next) => {
    try {
        const { id } = req.user;
        const userResult = await Staff.findOne({
            where: { id: id },
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
            return res.status(200).send({ successful: false, message: 'Failed to authenticate.' });
        }
        if (userResult.locked) {
            return res.status(200).json({ successful: false, message: 'Usuario bloqueado' });
        }
        const rolesAndPermissions = permissionReader(userResult.roles);
        return res.status(200).json({
            successful: true,
            message: 'Inicio de sesión exitoso',
            user: {
                first_name: userResult.first_name,
                last_name: userResult.last_name,
                email: userResult.email,
                phone: userResult.phone,
                roles: rolesAndPermissions[0],
                permissions: rolesAndPermissions[1]
            }
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: 'error', error: error });
    }
};
//List Staff
module.exports.listStaff = async (req, res, next) => {
    res.status(200).json({ message: 'List Staff - staff' });
};
//Read Staff
module.exports.readStaff = async (req, res, next) => {
    res.status(200).json({ message: 'Read Staff - staff' });
};
//Create Staff
module.exports.createStaff = async (req, res, next) => {
    res.status(200).json({ message: 'Create Staff - staff' });
};
//Edit Staff
module.exports.editStaff = async (req, res, next) => {
    res.status(200).json({ message: 'Edit Staff - staff' });
};
//Delete Staff
module.exports.deleteStaff = async (req, res, next) => {
    res.status(200).json({ message: 'Delete Staff - staff' });
};
