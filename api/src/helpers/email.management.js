const { nodeMailerConfig, clientConfig } = require('./../config/index.js');
const nodemailer = require('nodemailer');
const templateAccountGenerated = require('./../templates/html.accountGenerated');

const transport = nodemailer.createTransport(nodeMailerConfig);

module.exports.sendAccountGenerated = ({ first_name, last_name, email, password }) => {
    try {
        const message = {
            from: nodeMailerConfig.auth.user,
            to: email,
            subject: 'Core Code Team',
            html: templateAccountGenerated({ first_name, last_name, email, password, url:clientConfig.management_url })
        };
        transport.sendMail(message);
    } catch (error) {
        console.log(error);
    }
};
