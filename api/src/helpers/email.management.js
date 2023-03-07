const { nodeMailerConfig, clientConfig } = require('./../config/index.js');
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport(nodeMailerConfig);

module.exports.sendAccountGenerated = ({ first_name, last_name, email, password }) => {
    try {
        const message = {
            from: nodeMailerConfig.auth.user,
            to: email,
            subject: 'Core Code Team',
            html: `
            <p>hola ${first_name} ${last_name} ya esta registrado en nuestra plataforma de administracion<p>
            <h2>tus datos de accesos son:</h2>
            <p>email: ${email}</p>
            <p>password: ${password}</p>
            <a href="${clientConfig.management_url}">enlace</a>`
        };
        transport.sendMail(message);
    } catch (error) {
        console.log(error);
    }
};
