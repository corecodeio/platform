const { nodeMailerConfig, clientConfig } = require('./../config/index.js');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport(nodeMailerConfig);

module.exports.sendRecoverPassword = ({ tokenRecover, email }) => {
    try {
        const message = {
            from: nodeMailerConfig.auth.user,
            to: email,
            subject: 'Password recovery',
            html: `
            <p>hola en este email encontrara un link para recuperar contraseña<p>
            <a href="${clientConfig.student_url}/reset-password/${tokenRecover}">link</a>
            `
        };
        transport.sendMail(message);
    }
    catch(error) {
        console.log(error);
    }
}