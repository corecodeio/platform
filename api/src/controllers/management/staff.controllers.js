const { Staff, Role, Permission } = require('./../../utils/db.js');
const permissionReader = require('./../../helpers/permissionReader.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { jwtManagementConfig, bcryptConfig } = require('./../../config/index.js');
const { validateNumber, validateID } = require('./../../helpers/validators');
const { generatePassword } = require('./../../helpers/generator');
const { sendAccountGenerated } = require('./../../helpers/email.management');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
        res.status(400).json({ successful: false, message: error });
    }
};
//List Staff
module.exports.listStaff = async (req, res, next) => {
    try {
        const { page, order_type, order, text_search, search_type } = req.query;
        if (!page) {
            return res.status(200).json({ successful: false, message: 'Missing to enter data.' });
        }
        if (!validateNumber(page)) {
            return res.status(200).json({ successful: false, message: 'Not a valid number.' });
        }
        let limit = 10;
        let offset = 0 + (page - 1) * limit;
        let arg = {
            offset: offset,
            limit: limit,
            attributes: ['id', 'email', 'first_name', 'last_name', 'phone', 'locked']
        };
        if (order_type && order) {
            if (
                ['first_name', 'last_name', 'email'].includes(order_type) &&
                ['ASC', 'DESC'].includes(order)
            ) {
                arg.order = [[order_type, order]];
            } else {
                return res.status(200).json({ successful: false, message: 'invalid data.' });
            }
        }
        if (search_type && text_search) {
            if (['first_name', 'last_name', 'email'].includes(search_type)) {
                arg.where = { [search_type]: { [Op.iLike]: `%${text_search}%` } };
            } else {
                return res.status(200).json({ successful: false, message: 'invalid data.' });
            }
        }
        const responseList = await Staff.findAndCountAll(arg);
        res.status(200).json({
            successful: true,
            list: responseList.rows,
            totalPage: Math.ceil(responseList.count / limit),
            page: page
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
//Read Staff
module.exports.readStaff = async (req, res, next) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(200).json({ successful: false, message: 'Missing to enter data.' });
        }
        if (!validateID(id)) {
            return res.status(200).json({ successful: false, message: 'Invalid ID.' });
        }
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
            return res.status(200).json({ successful: false, message: 'ID does not exist.' });
        }
        const rolesAndPermissions = permissionReader(userResult.roles);
        res.status(200).json({
            successful: true,
            message: 'Información encontrada',
            user: {
                id: userResult.id,
                first_name: userResult.first_name,
                last_name: userResult.last_name,
                email: userResult.email,
                phone: userResult.phone,
                locked: userResult.locked,
                roles: rolesAndPermissions[0],
                permissions: rolesAndPermissions[1]
            }
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
//Create Staff
module.exports.createStaff = async (req, res, next) => {
    try {
        const { first_name, last_name, email, phone } = req.body;
        if (!first_name || !last_name || !email || !phone) {
            return res.status(200).json({ successful: false, message: 'Missing to enter data.' });
        }
        const emailAvailable = await Staff.findOne({
            where: { email: email }
        });
        if (emailAvailable) {
            return res.status(200).json({ successful: false, message: 'email is busy.' });
        }
        const id = uuidv4();
        const password = generatePassword(16);
        const passwordCrypt = bcrypt.hashSync(password, bcryptConfig.rounds);
        await Staff.create({
            id: id,
            first_name,
            last_name,
            email,
            password: passwordCrypt,
            phone
        });
        sendAccountGenerated({ first_name, last_name, email, password });
        res.status(200).json({
            successful: true,
            message: 'Create user.'
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
//Edit Staff
module.exports.editStaff = async (req, res, next) => {
    try {
        const { id, first_name, last_name, email, phone, locked } = req.body;
        if (!id) {
            return res.status(200).json({ successful: false, message: 'Missing to enter data.' });
        }
        if (!validUuid(id)) {
            return res.status(200).json({ successful: false, message: 'Invalid ID.' });
        }
        const userResult = await User.findOne({
            where: { id: id }
        });
        if (!userResult) {
            return res.status(200).json({ successful: false, message: 'ID does not exist.' });
        }
        userResult.first_name = first_name;
        userResult.last_name = last_name;
        userResult.email = email;
        userResult.phone = phone;
        userResult.locked = locked;
        await userResult.save();
        res.status(200).json({
            successful: true,
            message: 'Edit user successful.'
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
//Delete Staff
module.exports.deleteStaff = async (req, res, next) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(200).json({ successful: false, message: 'Missing to enter data.' });
        }
        if (!validateID(id)) {
            return res.status(200).json({ successful: false, message: 'Invalid ID.' });
        }
        const userResult = await Staff.findOne({
            where: { id: id }
        });
        if (!userResult) {
            return res.status(200).json({ successful: false, message: 'ID does not exist.' });
        }
        await userResult.destroy();
        res.status(200).json({
            successful: true,
            message: 'delete user'
        });
    } catch (error) {
        res.status(400).json({ successful: false, error: error });
    }
};
