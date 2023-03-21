const { User } = require('./../../utils/db');
const bcrypt = require('bcrypt');
const { jwtStudentConfig, bcryptConfig } = require('./../../config/index.js');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { sendWelcome } = require('./../../helpers/email.student');

//log In
module.exports.logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(200).json({ successful: false, message: 'Falta ingresar datos' });
        }
        const userResult = await User.findOne({ where: { email: email } });
        if (!userResult) {
            return res
                .status(200)
                .json({ successful: false, message: 'El email o la contraseña son incorrectos' });
        }
        if (userResult.locked) {
            return res.status(200).json({ successful: false, message: 'Usuario bloqueado' });
        }
        if (bcrypt.compareSync(password, userResult.password)) {
            let token = jwt.sign(
                {
                    user: {
                        id: userResult.id
                    }
                },
                jwtStudentConfig.secret_key,
                {
                    expiresIn: jwtStudentConfig.expiresIn,
                    algorithm: jwtStudentConfig.algorithms[0]
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
                    validate_email: userResult.validate_email,
                    phone: userResult.phone,
                    surveyID: userResult.surveyID
                }
            });
        } else {
            res.status(200).json({
                successful: false,
                message: 'El email o la contraseña son incorrectos'
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ successful: false, message: error });
    }
};

//Sign Up
module.exports.signUp = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        if (!first_name || !last_name || !email || !password) {
            return res.status(200).json({ successful: false, message: 'Falta ingresar datos' });
        }
        const emailAvailable = await User.findOne({ where: { email: email } });
        if (emailAvailable) {
            return res.status(200).json({ successful: false, message: 'El email ya está en uso' });
        }
        const passwordCrypt = bcrypt.hashSync(password, bcryptConfig.rounds);
        const newUser = await User.create({
            id: uuidv4(),
            first_name,
            last_name,
            email,
            password: passwordCrypt
        });
        let token = jwt.sign(
            {
                user: {
                    id: newUser.id
                }
            },
            jwtStudentConfig.secret_key,
            {
                expiresIn: jwtStudentConfig.expiresIn,
                algorithm: jwtStudentConfig.algorithms[0]
            }
        );
        sendWelcome({ id: newUser.id, first_name, last_name, email });
        res.status(200).json({
            successful: true,
            message: 'Registro exitoso',
            token: token,
            user: {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                validate_email: newUser.validate_email,
                phone: newUser.phone,
                surveyID: newUser.surveyID
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ successful: false, error: error });
    }
};

//check token
module.exports.checkToken = async (req, res, next) => {
    try {
        const { id } = req.user;
        const userResult = await User.findOne({ where: { id: id } });
        if (!userResult) {
            return res.status(200).send({ successful: false, message: 'Usuario no existe' });
        }
        if (userResult.locked) {
            return res.status(200).json({ successful: false, message: 'Usuario bloqueado' });
        }
        res.status(200).json({
            successful: true,
            message: 'Inicio de sesión exitoso',
            user: {
                first_name: userResult.first_name,
                last_name: userResult.last_name,
                email: userResult.email,
                validate_email: userResult.validate_email,
                phone: userResult.phone,
                surveyID: userResult.surveyID
            }
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ successful: false, message: error });
    }
};

//Recover Password
module.exports.recoverPassword = async (req, res, next) => {
    res.status(200).json({ successful: true, message: 'Recover Password' });
};

//Validate Email
module.exports.validateEmail = async (req, res, next) => {
    const secret = jwtStudentConfig.secret_key;
    const { tokenEmail } = req.body;
    const token = tokenEmail;

    try {
        const decoded = jwt.verify(token, secret);
        const userResult = await User.findOne({ where: { id: decoded.user.id } });
        if (userResult) {
            userResult.validate_email = true;
            await userResult.save();
            res.status(200).json({ successful: true, message: 'Email confirmed successfully.' });
        } else {
            res.send({ successful: false, message: 'User Id not found' });
        }
    } catch (err) {
        res.send({ successful: false, message: err });
    }
};
