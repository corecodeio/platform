const { nodeMailerConfig, clientConfig, jwtStudentConfig } = require('./../config/index.js');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = ({ id, first_name, last_name, email }) => {
    try {
        const transport = nodemailer.createTransport(nodeMailerConfig);
        const tokenEmail = jwt.sign(
            {
                user: {
                    id
                }
            },
            jwtStudentConfig.secret_key,
            {
                expiresIn: nodeMailerConfig.validateEmailExpiresIn,
                algorithm: jwtStudentConfig.algorithms[0]
            }
        );
        const message = {
            from: nodeMailerConfig.auth.user,
            to: email,
            subject: 'Welcome to Core Code',
            html: `
            <p>hola ${first_name} ${last_name} ya esta registrado en nuestra plataforma<p>
            <a href="${clientConfig.student_url}/validate-email/${tokenEmail}">  
                <button>Validar Email</button>  
            </a>`
        };
        transport.sendMail(message);
    } catch (error) {
        console.log(error);
    }
};
